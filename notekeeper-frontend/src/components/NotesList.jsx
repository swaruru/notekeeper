import React from 'react';
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

export default function NotesList({ notes, isLoading, error, onRetry }) {
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

      {!isLoading && !error && notes.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 bg-[#fcf8ff] rounded-xl border-4 border-dashed border-[#d9cff6] text-center mt-4 h-full min-h-[200px]">
          <div className="text-4xl mb-3 drop-shadow-sm">📄</div>
          <h3 className="text-sm font-mono tracking-widest font-bold text-[#a29bfe] mb-2 uppercase">NO DREAMS FOUND</h3>
          <p className="text-xs font-mono text-[#b4a0e5] max-w-[200px] leading-relaxed">Connect your wallet to upload data to the sky.</p>
        </div>
      )}

      {!isLoading && notes.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pb-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {notes.map((note, i) => (
            <NoteCard key={i} note={note} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
