import { useState, useEffect } from 'react';
import { Play, Pause, Disc3, Settings2 } from 'lucide-react';

export default function VibesPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fake progress simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col gap-4 items-center bg-[#fcf8ff] p-2 rounded-xl border-4 border-[#e8e4f9] shadow-[inset_0_0_0_2px_white] w-full">
      {/* Visualizer bars */}
      <div className="flex items-end justify-center h-16 w-full gap-1 border-b-2 border-dashed border-[#d9cff6] pb-2">
        {[...Array(12)].map((_, i) => {
          const height = isPlaying 
            ? `${Math.max(20, Math.random() * 100)}%` 
            : '15%';
          return (
            <div 
              key={i}
              className={`w-3 border-2 border-white transition-all duration-300 ease-in-out ${i % 2 === 0 ? 'bg-[#ffb8d1]' : 'bg-[#a29bfe]'}`}
              style={{ height }}
            />
          );
        })}
      </div>

      {/* Track Info */}
      <div className="flex items-center gap-3 w-full p-2 bg-white rounded-xl border-2 border-[#d9cff6] shadow-[0_2px_0_0_#e8e4f9]">
        <div className={`w-12 h-12 rounded-lg bg-[#a29bfe] border-2 border-white flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <Disc3 className="text-white" size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono font-bold text-[#8E86C6] uppercase tracking-widest truncate w-[160px]">lofi beats to study</span>
          <span className="text-[10px] font-mono text-[#b4a0e5] uppercase tracking-wider">Dreamy FM</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full px-1">
        <div className="h-4 w-full bg-white border-2 border-[#d9cff6] p-0.5">
          <div 
            className="h-full bg-[#ffb8d1] transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full mt-1">
          <span className="text-[10px] text-[#b4a0e5] font-mono font-bold">
            {`0${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(2, '0')}`}
          </span>
          <span className="text-[10px] text-[#b4a0e5] font-mono font-bold">4:20</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-1">
        <button className="text-[#a29bfe] hover:text-[#ffb8d1] transition-colors cursor-pointer active:scale-95">
          <Settings2 size={20} />
        </button>
        <button 
          className="w-14 h-14 bg-[#ffb8d1] border-2 border-white rounded-xl flex items-center justify-center text-white shadow-[0_3px_0_0_#f9a8d4] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button className="text-[#a29bfe] hover:text-[#ffb8d1] transition-colors cursor-pointer active:scale-95">
          <Disc3 size={20} />
        </button>
      </div>
    </div>
  );
}
