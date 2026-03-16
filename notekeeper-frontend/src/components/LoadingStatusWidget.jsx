import React, { useState, useEffect } from 'react';

export default function LoadingStatusWidget() {
  const messages = ["Dreams loading...", "Sweet dreams", "Saving your thoughts..."];
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle text every 3 seconds
    const txtInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    // Loop progress bar smoothly
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(txtInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 bg-vapor-bg">
      {/* Cycling Message */}
      <div className="flex items-center gap-3 bg-white p-3 border-2 border-[#d9cff6] shadow-[inset_0_0_0_2px_#fcf5ff]">
        <span className="text-2xl animate-pulse drop-shadow-sm">💤</span>
        <span className="font-mono text-[#a29bfe] text-sm tracking-wider w-40">
          {messages[msgIndex]}
        </span>
      </div>

      {/* Retro Segmented Progress Bar */}
      <div className="w-full">
        <div className="flex justify-between text-[10px] font-mono font-bold text-[#b4a0e5] mb-2 uppercase tracking-widest">
          <span>Dreams loading...</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-5 w-full bg-white border-2 border-[#c1b6f9] p-0.5 flex gap-0.5">
            {/* Generate segmented blocks based on progress */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className={`flex-1 h-full border border-white/50 ${
                  i < (progress / 5) ? 'bg-[#ffb8d1]' : 'bg-transparent'
                } transition-colors duration-75`}
              />
            ))}
        </div>
      </div>

      {/* Retro Sliders (Decorative) */}
      <div className="flex items-center justify-between gap-4 mt-2 px-2">
        <div className="flex flex-col items-center gap-1 w-full">
            <div className="h-16 w-3 bg-[#e8e4f9] border border-[#d2c9f5] relative flex justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                <div className="absolute bottom-4 w-6 h-3 bg-[#ffeaa7] border border-white cursor-ns-resize shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
            </div>
            <span className="text-[8px] font-mono font-bold text-[#b4a0e5] uppercase">Vibe</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 w-full">
            <div className="h-16 w-3 bg-[#e8e4f9] border border-[#d2c9f5] relative flex justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                <div className="absolute top-2 w-6 h-3 bg-[#8fb8f9] border border-white cursor-ns-resize shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
            </div>
            <span className="text-[8px] font-mono font-bold text-[#b4a0e5] uppercase">Aura</span>
        </div>
        
        <div className="flex flex-col items-center gap-1 w-full">
            <div className="h-16 w-3 bg-[#e8e4f9] border border-[#d2c9f5] relative flex justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                <div className="absolute top-8 w-6 h-3 bg-[#ffb8d1] border border-white cursor-ns-resize shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
            </div>
            <span className="text-[8px] font-mono font-bold text-[#b4a0e5] uppercase">Cozy</span>
        </div>
      </div>
    </div>
  );
}
