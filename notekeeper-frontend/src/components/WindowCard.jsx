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
      className="absolute bg-vapor-bg rounded-xl border-4 border-white shadow-[0_0_0_2px_var(--color-vapor-outline),4px_6px_15px_rgba(162,155,254,0.3)] overflow-hidden flex flex-col transition-shadow hover:shadow-[0_0_0_2px_var(--color-vapor-outline),6px_10px_20px_rgba(162,155,254,0.4)]"
      style={{ x, y, zIndex }}
      onPointerDown={onBringToFront}
    >
      {/* Title Bar - Vaporwave OS Style */}
      <div className="bg-vapor-header px-3 py-1.5 flex items-center justify-between border-b-2 border-white select-none">
        <span className="font-mono text-white tracking-widest text-md pointer-events-none select-none lowercase ml-1">
          {title}
        </span>
        <div className="flex items-center gap-3 text-white font-mono text-sm mr-1 cursor-pointer select-none">
          <span className="hover:text-vapor-pink transition-colors leading-none pb-1">_</span>
          <span className="hover:text-vapor-pink transition-colors leading-none">[]</span>
          <span className="hover:text-vapor-pink transition-colors leading-none">X</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 overflow-auto cursor-auto">
        {children}
      </div>
    </motion.div>
  );
}
