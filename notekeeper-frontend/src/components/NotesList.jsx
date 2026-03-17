import React, { useState } from 'react';
import { Search } from 'lucide-react';
import NoteCard from './NoteCard';

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-window-border/50 animate-pulse">
      <div className="h-4 bg-window-border/30 rounded w-full" />
      <div className="h-4 bg-window-border/30 rounded w-5/6" />
      <div className="h-4 bg-window-border/30 rounded w-1/2" />
      <div className="h-3 bg-window-border/30 rounded w-1/4 mt-auto pt-4" />
    </div>
  );
}

export default function NotesList({ notes, isLoading, error, onRetry, noteOverrides = {}, setNoteOverrides }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState(null);

  const handleUpdateOverride = (noteId, updates) => {
    setNoteOverrides(prev => {
      const existing = prev[noteId] || {};
      return {
        ...prev,
        [noteId]: { ...existing, ...updates }
      };
    });
  };

  // 1. Process notes with overrides
  let processedNotes = notes.map((note) => {
    // Base64 hash of content + owner as stable ID
    const noteId = btoa(unescape(encodeURIComponent(note.content + note.owner))).substring(0, 32);
    const override = noteOverrides[noteId] || {};
    return {
      ...note,
      id: noteId,
      content: override.editedContent ?? note.content,
      isPinned: !!override.pinned,
      isDeleted: !!override.deleted,
      tags: override.tags || []
    };
  });

  // 2. Filter out deleted
  processedNotes = processedNotes.filter(n => !n.isDeleted);

  // 3. Extract unique tags from remaining valid notes
  const allTags = [...new Set(processedNotes.flatMap(n => n.tags))].sort();

  // 4. Filter by search query and active tag
  if (searchQuery.trim()) {
    const lowerQ = searchQuery.toLowerCase();
    processedNotes = processedNotes.filter(n => 
      n.content.toLowerCase().includes(lowerQ) || 
      n.tags.some(t => t.includes(lowerQ))
    );
  }
  if (activeTag) {
    processedNotes = processedNotes.filter(n => n.tags.includes(activeTag));
  }

  // 5. Sort by pinned
  processedNotes.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="flex items-center gap-2 text-[#a29bfe] font-mono tracking-widest font-bold m-0 border-none pb-0 uppercase">
          <span className="text-xl drop-shadow-sm">⭐</span>
          Dreams
          {!isLoading && notes.length > 0 && (
            <span className="text-[10px] text-[#b4a0e5] font-medium ml-1">
              [{notes.length}]
            </span>
          )}
        </h2>
        {!isLoading && (
          <button 
            className="flex items-center gap-1.5 px-3 py-1 bg-[#a29bfe] text-white rounded-md text-[10px] font-mono tracking-wider font-bold border-2 border-white shadow-[0_2px_0px_0px_rgba(162,155,254,0.6)] active:translate-y-[2px] active:shadow-none transition-all" 
            onClick={onRetry} 
            id="refresh-notes"
          >
            🔄 RELOAD
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      {(!isLoading && notes.length > 0) && (
        <div className="flex flex-col gap-2 mb-4 bg-white/60 p-2 rounded-xl border-[3px] border-[#e8e4f9] shadow-sm">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--theme-header)]" />
            <input 
              type="text" 
              placeholder="Search dreams..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono text-[var(--theme-text)] bg-white border-2 border-[var(--theme-outline)] rounded-lg outline-none focus:border-[var(--theme-pink)] transition-colors"
            />
          </div>
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
               <button 
                 onClick={() => setActiveTag(null)}
                 className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${!activeTag ? 'bg-[var(--theme-pink)] text-white border-[var(--theme-pink)] shadow-sm' : 'bg-white text-[var(--theme-header)] border-[#e8e4f9] hover:border-[var(--theme-outline)]'}`}
               >
                 all
               </button>
               {allTags.map(t => (
                 <button 
                   key={t}
                   onClick={() => setActiveTag(t)}
                   className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${activeTag === t ? 'bg-[var(--theme-pink)] text-white border-[var(--theme-pink)] shadow-sm' : 'bg-white text-[var(--theme-header)] border-[#e8e4f9] hover:border-[var(--theme-outline)]'}`}
                 >
                   #{t}
                 </button>
               ))}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100/80 border-2 border-red-300 rounded-xl flex items-center gap-3">
          <span className="text-lg">⚠️</span>
          <span className="flex-1 text-sm font-bold text-red-700">{error}</span>
          <button className="px-3 py-1 bg-white/50 hover:bg-white rounded-full text-xs font-bold text-red-700 border-2 border-transparent hover:border-red-300 transition-all" onClick={onRetry}>Retry</button>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 pb-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!isLoading && !error && processedNotes.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 bg-[#fcf8ff] rounded-xl border-4 border-dashed border-[#d9cff6] text-center mt-4 h-full min-h-[200px]">
          <div className="text-4xl mb-3 drop-shadow-sm">📄</div>
          <h3 className="text-sm font-mono tracking-widest font-bold text-[var(--theme-header)] mb-2 uppercase">NO DREAMS FOUND</h3>
          <p className="text-xs font-mono text-[var(--theme-text)] opacity-70 max-w-[200px] leading-relaxed">Connect your wallet to upload data, or clear deleted notes.</p>
        </div>
      )}

      {!isLoading && processedNotes.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pb-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {processedNotes.map((note, i) => (
            <NoteCard 
              key={note.id || i} 
              note={note} 
              index={i} 
              onOverride={(updates) => handleUpdateOverride(note.id, updates)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
