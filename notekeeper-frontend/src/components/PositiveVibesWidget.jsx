import React from 'react';

export default function PositiveVibesWidget() {
  return (
    <div className="flex flex-col items-center p-5 bg-[#bfd4fa] border-4 border-white rounded-[20px] gap-5 w-[300px]">
      <span className="text-sm font-mono text-white tracking-widest drop-shadow-sm mt-1">just happy you're here.</span>
      <div className="flex items-center justify-between w-full gap-4 px-2">
        <button className="flex-1 py-1.5 bg-[#9fafed] hover:bg-[#8e9ce0] text-white rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] border border-[#8e9ce0]/50 flex items-center justify-center gap-1 active:scale-95 transition-transform">
          <span className="text-[10px] tracking-[4px]">🤍🤍🤍</span>
        </button>
        <button className="w-16 py-1.5 bg-[#9fafed] hover:bg-[#8e9ce0] text-white rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] border border-[#8e9ce0]/50 font-mono font-bold text-xs active:scale-95 flex items-center justify-center transition-transform">
          :)
        </button>
      </div>
    </div>
  );
}
