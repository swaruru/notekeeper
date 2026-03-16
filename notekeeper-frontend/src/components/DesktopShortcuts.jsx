import React from 'react';
import { motion } from 'framer-motion';
import WindowCard from './WindowCard';

export default function DesktopShortcuts() {
  const folders = [
    { id: 'f1', label: 'peace', icon: '📁', x: 30, y: 240 },
    { id: 'f2', label: 'joy', icon: '📁', x: 30, y: 350 },
    { id: 'f3', label: 'mail', icon: '💌', x: 30, y: 640 },
    { id: 'f4', label: 'love', icon: '💖', x: 30, y: 740 },
    { id: 'f5', label: 'calm', icon: '☁️', x: window.innerWidth - 80, y: 700 },
    { id: 'f6', label: 'chat', icon: '💬', x: window.innerWidth - 80, y: 800 },
  ];

  return (
    <>
      {/* Folders and text shortcuts */}
      {folders.map((f, i) => (
        <WindowCard 
          key={f.id} 
          title="" 
          defaultPosition={{ x: f.x || 30, y: f.y }} 
          zIndex={5} // Keep them glued to the desktop
          hideTitleBar
        >
          <motion.div 
            className="flex flex-col items-center gap-1 cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-4xl drop-shadow-md group-hover:drop-shadow-xl transition-all">
              {f.icon}
            </span>
            <span className="text-[10px] sm:text-xs font-bold font-sans text-dreamy-text px-2 py-0.5 bg-white/40 backdrop-blur rounded-full">
              {f.label}
            </span>
          </motion.div>
        </WindowCard>
      ))}
    </>
  );
}
