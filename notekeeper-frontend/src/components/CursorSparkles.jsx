import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let lastSpawn = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      // Throttle spawn rate so we don't lag the dom
      if (now - lastSpawn < 50) return;
      lastSpawn = now;

      const newSparkle = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        // Random slight offsets 
        offsetX: (Math.random() - 0.5) * 30,
        offsetY: (Math.random() - 0.5) * 30,
        // Random scale and rotation
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 180
      };

      setSparkles(prev => [...prev.slice(-15), newSparkle]); // Keep max 15 sparkles active
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interval to cleanup old sparkles
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setSparkles(prev => prev.filter(s => now - s.id < 1000));
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0.8, x: s.x, y: s.y, scale: s.scale, rotate: s.rotation }}
            animate={{ 
                opacity: 0, 
                x: s.x + s.offsetX, 
                y: s.y + s.offsetY + 20, // Drift down slightly
                rotate: s.rotation + 90
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute text-dreamy-pink drop-shadow-[0_0_8px_rgba(24bcfe8,0.8)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
