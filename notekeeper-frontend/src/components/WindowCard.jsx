import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function WindowCard({ title, defaultPosition = { x: 0, y: 0 }, zIndex = 10, onBringToFront, children }) {
  const windowRef = useRef(null);

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-vapor-bg rounded-xl border-4 border-white shadow-[0_0_0_2px_var(--color-vapor-outline),4px_6px_15px_rgba(162,155,254,0.3)] overflow-hidden flex flex-col transition-shadow hover:shadow-[0_0_0_2px_var(--color-vapor-outline),6px_10px_20px_rgba(162,155,254,0.4)]"
      initial={defaultPosition}
      style={{ zIndex }}
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
