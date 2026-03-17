import React, { useState, useEffect } from 'react';
import { useWallet } from './hooks/useWallet';
import { useRetroClick } from './hooks/useRetroClick';
import { fetchNotes, submitNote } from './lib/stellar';
import WalletConnect from './components/WalletConnect';
import AddNoteForm from './components/AddNoteForm';
import NotesList from './components/NotesList';
import AnimatedSkyBackground from './components/AnimatedSkyBackground';
import WindowCard from './components/WindowCard';
import TimeAndSpace from './components/TimeAndSpace';
import CursorSparkles from './components/CursorSparkles';
import HydrationWidget from './components/HydrationWidget';
import PositiveVibesWidget from './components/PositiveVibesWidget';
import VibesPlayer from './components/VibesPlayer';

export default function App() {
  useRetroClick();
  const { address, isConnected, isConnecting, error: walletError, connect, disconnect } = useWallet();
  const [notes, setNotes] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // --- FEATURES STATE ---
  const [theme, setTheme] = useState('dreamy'); // 'dreamy' | 'peach'
  const [bgMode, setBgMode] = useState('cloud'); // 'cloud' | 'starry' | 'lofi'
  
  // Local Data Overlay for edits, pins, tags, deletes
  const [noteOverrides, setNoteOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('notekeeper_overrides');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Apply CSS theme to document
  useEffect(() => {
    if (theme === 'peach') document.documentElement.setAttribute('data-theme', 'peach');
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);

  // Persist Local Data Overlay changes
  useEffect(() => {
    localStorage.setItem('notekeeper_overrides', JSON.stringify(noteOverrides));
  }, [noteOverrides]);

  // Manage Z-index for windows
  const [boxesZIndex, setBoxesZIndex] = useState({
    wallet: 15,
    addNote: 20,
    notes: 10,
    stickers: 12,
    vibes: 11,
    time: 13,
    hydration: 14,
    positivity: 16,
    loading: 17
  });

  const [topZ, setTopZ] = useState(20);

  const bringToFront = (key) => {
    setTopZ(prev => prev + 1);
    setBoxesZIndex(prev => ({ ...prev, [key]: topZ + 1 }));
  };

  const handleFetchNotes = async () => {
    setIsLoadingNotes(true);
    setFetchError(null);
    try {
      const data = await fetchNotes();
      setNotes(data);
      setFetchError(null);
    } catch (err) {
      console.error("Fetch notes error:", err);
      setFetchError(err.message || 'Failed to fetch notes.');
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleAddNote = async (content) => {
    if (!isConnected || !address) throw new Error("Wallet not connected");
    await submitNote(address, content);
    await handleFetchNotes();
  };

  // Fetch notes on mount
  useEffect(() => {
    handleFetchNotes();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden relative selection:bg-[var(--theme-pink)] selection:text-[var(--theme-text)] font-sans cursor-default transition-colors duration-500 bg-[var(--theme-bg)]">
      <AnimatedSkyBackground mode={bgMode} />
      <CursorSparkles />

      {/* Retro Floating Header / Wallet Connect */}
      <WindowCard 
        title="NOTEKEEPER.EXE" 
        defaultPosition={{ x: 400, y: 550 }} 
        zIndex={boxesZIndex.wallet} 
        onBringToFront={() => bringToFront('wallet')}
      >
        <div className="flex flex-col gap-4 min-w-[300px]">
          <h1 className="text-sm font-mono tracking-widest text-[#a29bfe] text-center font-bold">WELCOME_DREAMER ✨</h1>
          <WalletConnect
            address={address}
            isConnected={isConnected}
            isConnecting={isConnecting}
            error={walletError}
            connect={connect}
            disconnect={disconnect}
          />
        </div>
      </WindowCard>

      {/* Main Form Window */}
      <WindowCard 
        title="NEW_DREAM.TXT" 
        defaultPosition={{ x: 50, y: 50 }} 
        zIndex={boxesZIndex.addNote} 
        onBringToFront={() => bringToFront('addNote')}
      >
        <div className="w-[350px]">
           <AddNoteForm isConnected={isConnected} onSubmit={handleAddNote} />
        </div>
      </WindowCard>

      {/* Notes Gallery Window */}
      <WindowCard 
        title="SAVED_DREAMS.DIR" 
        defaultPosition={{ x: 500, y: 50 }} 
        zIndex={boxesZIndex.notes} 
        onBringToFront={() => bringToFront('notes')}
      >
        <div className="w-[450px] h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 z-10 border-b-2 border-dashed border-[#e8e4f9]">
             <h2 className="text-xs font-mono font-bold tracking-widest text-[var(--theme-text)] uppercase">Network Drive: Dreams</h2>
          </div>
           <NotesList
              notes={notes}
              isLoading={isLoadingNotes}
              error={fetchError}
              onRetry={handleFetchNotes}
              noteOverrides={noteOverrides}
              setNoteOverrides={setNoteOverrides}
            />
        </div>
      </WindowCard>



      {/* Hydration Reminder */}
      <WindowCard 
        title="daily.exe" 
        defaultPosition={{ x: 1050, y: 430 }} 
        zIndex={boxesZIndex.hydration} 
        onBringToFront={() => bringToFront('hydration')}
      >
        <HydrationWidget />
      </WindowCard>

      {/* Positivity Message */}
      <WindowCard 
        title="affirmations.txt" 
        defaultPosition={{ x: 750, y: 530 }} 
        zIndex={boxesZIndex.positivity} 
        onBringToFront={() => bringToFront('positivity')}
      >
        <PositiveVibesWidget />
      </WindowCard>

      {/* Time & Space Clock/Status */}
      <WindowCard 
        title="SYS_CLOCK.EXE" 
        defaultPosition={{ x: 1050, y: 50 }} 
        zIndex={boxesZIndex.time} 
        onBringToFront={() => bringToFront('time')}
      >
        <div className="w-[300px]">
           <TimeAndSpace />
        </div>
      </WindowCard>

      {/* Vibes Player */}
      <WindowCard 
        title="VIBES_PLAYER.EXE" 
        defaultPosition={{ x: 40, y: 440 }} 
        zIndex={boxesZIndex.vibes} 
        onBringToFront={() => bringToFront('vibes')}
      >
        <div className="w-[300px]">
           <VibesPlayer 
             theme={theme} 
             setTheme={setTheme} 
             bgMode={bgMode} 
             setBgMode={setBgMode} 
           />
        </div>
      </WindowCard>



    </div>
  );
}
