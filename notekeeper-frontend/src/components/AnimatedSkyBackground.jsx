import React from 'react';
import { motion } from 'framer-motion';

const CLOUD_VARIANTS = {
  animate1: { x: [0, 100, 0], transition: { duration: 120, repeat: Infinity, ease: 'linear' } },
  animate2: { x: [0, -80, 0], transition: { duration: 150, repeat: Infinity, ease: 'linear' } },
  animate3: { x: [0, 150, 0], transition: { duration: 180, repeat: Infinity, ease: 'linear' } },
};

const STAR_VARIANTS = {
  twinkle: {
    opacity: [0.6, 1, 0.6],
    scale: [0.9, 1.1, 0.9],
    transition: { duration: 4, repeat: Infinity, ease: 'linear' }
  }
};

const HEART_VARIANTS = {
  float: {
    y: [0, -200],
    x: [-20, 20, -20, 20],
    opacity: [0, 0.8, 0],
    rotate: [-10, 10, -10],
    transition: { duration: 15, repeat: Infinity, ease: 'linear' }
  }
};

export default function AnimatedSkyBackground() {
  const stars = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  const hearts = Array.from({ length: 6 }).map((_, i) => ({
    id: `h${i}`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    size: Math.random() * 15 + 15
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-[#c4e0f5] via-[#e5d9f2] to-[#ffcce6]">
      
      {/* 4-Point Retro Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{ top: star.top, left: star.left }}
          variants={STAR_VARIANTS}
          animate="twinkle"
          custom={star.delay}
          transition={{ ...STAR_VARIANTS.twinkle.transition, delay: star.delay }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L57 43L100 50L57 57L50 100L43 57L0 50L43 43L50 0Z" fill="white" />
          </svg>
        </motion.div>
      ))}

      {/* Primary Solid Crescent Moon */}
      <motion.div 
        className="absolute top-[15%] left-[8%]"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="220" height="220" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10C68.618 10 84.328 22.844 88.665 40.231C80.334 33.401 69.845 29.352 58.5 29.352C31.714 29.352 10 51.066 10 77.852C10 81.366 10.375 84.792 11.085 88.086C16.892 93.993 25.045 97.648 34 97.648C60.51 97.648 82 76.158 82 49.648C82 45.474 81.467 41.42 80.463 37.537C92.007 46.545 99.352 61.189 99.352 77.852C99.352 105.101 77.265 127.204 50 127.204C22.735 127.204 0.648 105.101 0.648 77.852C0.648 50.603 22.735 28.5 50 28.5V10Z" fill="#ffebd2" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Floating Tiny Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%]"
          style={{ left: heart.left }}
          variants={HEART_VARIANTS}
          animate="float"
          custom={heart.delay}
          transition={{ ...HEART_VARIANTS.float.transition, delay: heart.delay }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#f9a8d4" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {/* Hard-Outline Solid Clouds */}
      <motion.div
        className="absolute top-[35%] left-[-5%]"
        variants={CLOUD_VARIANTS}
        animate="animate1"
      >
        <svg width="340" height="150" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 45C11.1929 45 0 33.8071 0 20C0 6.19288 11.1929 -5 25 -5C34.4093 -5 42.6039 0.230752 46.887 7.72477C49.9702 5.00843 54.062 3.33333 58.5 3.33333C68.6259 3.33333 76.8333 11.5408 76.8333 21.6667C76.8333 22.1385 76.8155 22.6062 76.7806 23.0691C78.4716 22.0911 80.4357 21.5333 82.5 21.5333C89.4036 21.5333 95 27.1298 95 34.0333C95 40.9369 89.4036 46.5333 82.5 46.5333C78.3308 46.5333 74.637 44.4921 72.378 41.3482C68.8028 43.619 64.5559 45 60 45H25Z" fill="#a4bbf9" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[5%] right-[10%]"
        variants={CLOUD_VARIANTS}
        animate="animate2"
      >
        <svg width="400" height="200" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M25 45C11.1929 45 0 33.8071 0 20C0 6.19288 11.1929 -5 25 -5C34.4093 -5 42.6039 0.230752 46.887 7.72477C49.9702 5.00843 54.062 3.33333 58.5 3.33333C68.6259 3.33333 76.8333 11.5408 76.8333 21.6667C76.8333 22.1385 76.8155 22.6062 76.7806 23.0691C78.4716 22.0911 80.4357 21.5333 82.5 21.5333C89.4036 21.5333 95 27.1298 95 34.0333C95 40.9369 89.4036 46.5333 82.5 46.5333C78.3308 46.5333 74.637 44.4921 72.378 41.3482C68.8028 43.619 64.5559 45 60 45H25Z" fill="#ffcce6" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[30%]"
        variants={CLOUD_VARIANTS}
        animate="animate3"
      >
        <svg width="250" height="120" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M25 45C11.1929 45 0 33.8071 0 20C0 6.19288 11.1929 -5 25 -5C34.4093 -5 42.6039 0.230752 46.887 7.72477C49.9702 5.00843 54.062 3.33333 58.5 3.33333C68.6259 3.33333 76.8333 11.5408 76.8333 21.6667C76.8333 22.1385 76.8155 22.6062 76.7806 23.0691C78.4716 22.0911 80.4357 21.5333 82.5 21.5333C89.4036 21.5333 95 27.1298 95 34.0333C95 40.9369 89.4036 46.5333 82.5 46.5333C78.3308 46.5333 74.637 44.4921 72.378 41.3482C68.8028 43.619 64.5559 45 60 45H25Z" fill="#d9cff6" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[15%] right-[-10%]"
        variants={CLOUD_VARIANTS}
        animate="animate1"
      >
        <svg width="200" height="100" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M25 45C11.1929 45 0 33.8071 0 20C0 6.19288 11.1929 -5 25 -5C34.4093 -5 42.6039 0.230752 46.887 7.72477C49.9702 5.00843 54.062 3.33333 58.5 3.33333C68.6259 3.33333 76.8333 11.5408 76.8333 21.6667C76.8333 22.1385 76.8155 22.6062 76.7806 23.0691C78.4716 22.0911 80.4357 21.5333 82.5 21.5333C89.4036 21.5333 95 27.1298 95 34.0333C95 40.9369 89.4036 46.5333 82.5 46.5333C78.3308 46.5333 74.637 44.4921 72.378 41.3482C68.8028 43.619 64.5559 45 60 45H25Z" fill="#a4bbf9" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      {/* Decorative Floral Assets (Static borders) */}
      <div className="absolute right-0 top-[20%] w-[350px] opacity-90 drop-shadow-md">
         {/* Custom Floral SVG cluster imitating the hyacinths in the reference image */}
         <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stems */}
            <path d="M100 400 Q80 200 120 100" stroke="#7193f4" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <path d="M120 400 Q150 250 140 150" stroke="#7193f4" strokeWidth="6" fill="none" strokeLinecap="round"/>
            
            {/* Leaves */}
            <path d="M100 300 Q60 250 80 200 Q110 250 100 300" fill="#99ccee" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
            <path d="M110 350 Q160 300 150 250 Q130 300 110 350" fill="#99ccee" stroke="white" strokeWidth="4" strokeLinejoin="round"/>
            <path d="M120 280 Q180 230 170 180 Q140 230 120 280" fill="#99ccee" stroke="white" strokeWidth="4" strokeLinejoin="round"/>

            {/* Flowers */}
            <circle cx="120" cy="100" r="20" fill="#a29bfe" stroke="white" strokeWidth="4"/>
            <circle cx="100" cy="130" r="22" fill="#a29bfe" stroke="white" strokeWidth="4"/>
            <circle cx="140" cy="120" r="18" fill="#a29bfe" stroke="white" strokeWidth="4"/>
            <circle cx="125" cy="150" r="24" fill="#a29bfe" stroke="white" strokeWidth="4"/>
            <circle cx="95" cy="165" r="19" fill="#a29bfe" stroke="white" strokeWidth="4"/>
            <circle cx="145" cy="180" r="21" fill="#a29bfe" stroke="white" strokeWidth="4"/>
            <circle cx="115" cy="195" r="25" fill="#c4b5fd" stroke="white" strokeWidth="4"/>
            <circle cx="150" cy="145" r="15" fill="#c4b5fd" stroke="white" strokeWidth="4"/>
            
            {/* Flower centers */}
            <circle cx="120" cy="100" r="4" fill="#ffebd2" />
            <circle cx="100" cy="130" r="4" fill="#ffebd2" />
            <circle cx="125" cy="150" r="4" fill="#ffebd2" />
            <circle cx="115" cy="195" r="4" fill="#ffebd2" />
         </svg>
      </div>

      <div className="absolute left-[-20px] bottom-0 w-[300px] opacity-90 drop-shadow-md">
         {/* Custom Floral SVG cluster imitating the pink peonies in the reference image */}
         <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 300 Q120 200 80 100" stroke="#8cb2eb" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M100 300 Q150 200 160 150" stroke="#8cb2eb" strokeWidth="6" fill="none" strokeLinecap="round"/>
            
            <circle cx="80" cy="100" r="30" fill="#ffb8d1" stroke="white" strokeWidth="4"/>
            <path d="M60 90 Q80 70 100 90 Q80 110 60 90" fill="#f9a8d4" stroke="white" strokeWidth="2"/>
            
            <circle cx="130" cy="120" r="25" fill="#ffb8d1" stroke="white" strokeWidth="4"/>
            <path d="M115 110 Q130 95 145 110 Q130 125 115 110" fill="#f9a8d4" stroke="white" strokeWidth="2"/>
            
            <circle cx="160" cy="150" r="20" fill="#ffcce6" stroke="white" strokeWidth="4"/>
            <circle cx="70" cy="150" r="35" fill="#ffb8d1" stroke="white" strokeWidth="4"/>
            <path d="M45 140 Q70 115 95 140 Q70 165 45 140" fill="#f9a8d4" stroke="white" strokeWidth="2"/>
         </svg>
      </div>

      <div className="absolute left-[30%] top-[-50px] w-[200px] opacity-80 drop-shadow-md rotate-[120deg]">
         {/* Additional scattered pastel flowers falling from sky */}
         <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 200 Q120 100 80 50" stroke="#a29bfe" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <circle cx="80" cy="50" r="20" fill="#fff" stroke="#d9cff6" strokeWidth="4"/>
            <circle cx="60" cy="60" r="15" fill="#ffb8d1" stroke="white" strokeWidth="3"/>
            <circle cx="95" cy="70" r="22" fill="#ffeaa7" stroke="white" strokeWidth="3"/>
         </svg>
      </div>

    </div>
  );
}
