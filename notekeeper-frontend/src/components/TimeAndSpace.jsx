import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TimeAndSpace() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-4 p-2 items-center">
      
      {/* Clock Section */}
      <div className="relative flex flex-col items-center justify-center p-6 bg-white rounded-xl border-4 border-[#e8e4f9] w-full shadow-[0_4px_0_0_#d9cff6]">
        <motion.div 
          className="absolute -top-4 -right-4 w-12 h-12 bg-[#ffeaa7] shadow-[0_4px_10px_rgba(255,234,167,0.8)] border-2 border-white rounded-full"
          animate={{ scale: [1, 1.1, 1], y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <h2 className="text-3xl font-black text-[#8E86C6] tracking-widest font-mono">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
        </h2>
        <p className="text-[10px] font-mono tracking-widest font-bold text-[#b4a0e5] mt-2 uppercase">
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Network Status Section */}
      <div className="w-full bg-[#fcf8ff] p-4 rounded-xl border-[3px] border-[#e8e4f9] flex flex-col gap-2 shadow-[inset_0_0_0_2px_white]">
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#e8e4f9] pb-2">
          <span className="text-[10px] font-mono font-bold text-[#a29bfe] uppercase tracking-widest">Sky Status</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#d1fae5] rounded-sm border border-[#34d399]">
            <span className="w-2 h-2 rounded-sm bg-[#10b981] animate-pulse" />
            <span className="text-[8px] font-mono font-bold text-[#047857] tracking-wider">ONLINE</span>
          </div>
        </div>
        
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-[10px] font-mono font-bold text-[#b4a0e5]">
            <span>NETWORK</span>
            <span className="text-[#a29bfe]">Stellar Testnet</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono font-bold text-[#b4a0e5]">
            <span>WEATHER</span>
            <span className="text-[#ffb8d1] flex items-center gap-1">☁️ Peaceful</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono font-bold text-[#b4a0e5]">
            <span>UPLINK</span>
            <span className="text-[#8fb8f9]">Stable (14ms)</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
