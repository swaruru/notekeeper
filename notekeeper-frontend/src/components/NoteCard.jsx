import React, { useState } from 'react';

export default function NoteCard({ note, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note.owner);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const ownerStr = note.owner ? note.owner.toString() : 'Unknown';
  const truncatedOwner = note.owner ? `${ownerStr.slice(0, 4)}…${ownerStr.slice(-4)}` : 'Unknown';

  return (
    <div 
      className="flex flex-col p-4 bg-white rounded-xl border-[3px] border-[#e8e4f9] shadow-[0_4px_0_0_#d9cff6] hover:-translate-y-1 hover:shadow-[0_6px_0_0_#c1b6f9] transition-all" 
      style={{ animation: `fadeIn 0.5s ease-out ${0.05 * (index ?? 0)}s both` }}
    >
      <p className="text-[#8E86C6] font-mono flex-grow break-words text-sm mb-4 leading-relaxed">
        {note.content}
      </p>
      
      <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-[#e8e4f9] mt-auto gap-2">
        <button 
          className="flex items-center gap-1.5 px-3 py-1 bg-[#fcf8ff] rounded-md text-[10px] font-mono tracking-widest font-bold text-[#b4a0e5] border border-[#d9cff6] hover:bg-[#e8e4f9] hover:text-[#a29bfe] transition-colors cursor-pointer"
          onClick={handleCopy} 
          title={`Click to copy: ${ownerStr}`}
        >
          {copied ? <span className="text-[#ffb8d1]">COPIED!</span> : `>${truncatedOwner}`}
        </button>
        <span className="text-[10px] font-mono tracking-widest font-bold px-2 py-1 bg-[#a29bfe] text-white rounded-md shadow-[0_2px_0_0_rgba(162,155,254,0.6)]">
          ON-CHAIN
        </span>
      </div>
    </div>
  );
}
