import React from 'react';
import { motion } from 'framer-motion';

export default function HydrationWidget() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border-[3px] border-pink-100 rounded-[20px] shadow-[inset_0_0_0_2px_#fbcfe8] gap-4 w-[200px]">
      <span className="text-[13px] font-bold text-pink-300 tracking-[0.2em] uppercase mt-2">stay hydrated</span>
      <button 
        className="w-[100px] py-1.5 bg-pink-300 hover:bg-pink-400 text-white font-sans font-bold tracking-widest rounded-lg shadow-[0_2px_0px_0px_#f9a8d4] active:translate-y-[2px] active:shadow-none transition-all text-xs"
        onClick={(e) => {
          const btn = e.currentTarget;
          btn.innerText = 'glug...';
          setTimeout(() => btn.innerText = 'OK', 1500);
        }}
      >
        OK
      </button>
    </div>
  );
}
