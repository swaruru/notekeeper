import React from 'react';
import { motion } from 'framer-motion';

export default function StickersTray() {
  const stickers = [
    { id: 1, icon: '☁️', label: 'Cloud' },
    { id: 2, icon: '🌙', label: 'Moon' },
    { id: 3, icon: '⭐', label: 'Star' },
    { id: 4, icon: '💖', label: 'Heart' },
    { id: 5, icon: '✨', label: 'Sparkles' },
    { id: 6, icon: '🕊️', label: 'Bird' },
    { id: 7, icon: '🌈', label: 'Rainbow' },
    { id: 8, icon: '🫧', label: 'Bubble' }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-2 bg-sticker-tray/30 rounded-xl">
      {stickers.map((sticker, idx) => (
        <motion.div
          key={sticker.id}
          className="w-12 h-12 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-lg border-2 border-white cursor-grab active:cursor-grabbing hover:bg-white"
          whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
          whileTap={{ scale: 0.9 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
        >
          <span className="text-2xl drop-shadow-sm pointer-events-none">{sticker.icon}</span>
        </motion.div>
      ))}
    </div>
  );
}
