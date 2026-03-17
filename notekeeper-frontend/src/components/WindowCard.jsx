import React, { useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function WindowCard({ title, defaultPosition = { x: 0, y: 0 }, zIndex = 10, onBringToFront, children }) {
  const windowRef = useRef(null);

  const getInitialPosition = () => {
    try {
      const saved = localStorage.getItem(`widget_${title}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load widget position", e);
    }
    return defaultPosition;
  };

  const initPos = getInitialPosition();
  const x = useMotionValue(initPos.x);
  const y = useMotionValue(initPos.y);

  const handleDragEnd = () => {
    localStorage.setItem(`widget_${title}`, JSON.stringify({ x: x.get(), y: y.get() }));
  };

  return (
    <motion.div
      ref={windowRef}
      className={`absolute bg-white/95 backdrop-blur-md rounded-[18px] border border-white shadow-[0_8px_32px_rgba(162,155,254,0.15)] overflow-hidden flex flex-col transition-shadow hover:shadow-[0_8px_32px_rgba(162,155,254,0.25)] ring-1 ring-[var(--theme-outline)]/20`}
      style={{ x, y, zIndex }}
      onPointerDown={onBringToFront}
    >
      {/* Title Bar */}
      <div className="bg-[var(--theme-header)] px-4 py-2 flex items-center justify-between select-none">
        <span className="font-mono text-white tracking-[0.2em] text-xs font-bold pointer-events-none select-none lowercase">
          {title}
        </span>
        <div className="flex items-center gap-1.5 text-white/90 font-mono text-xs mr-0.5 cursor-pointer select-none">
          <span className="hover:text-white transition-colors leading-none pb-1">-</span>
          <span className="hover:text-white transition-colors leading-none">[]</span>
          <span className="hover:text-white transition-colors leading-none">X</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 overflow-auto cursor-auto">
        {children}
      </div>
    </motion.div>
  );
}
