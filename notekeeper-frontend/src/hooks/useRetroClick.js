import { useEffect } from 'react';

export function useRetroClick() {
  useEffect(() => {
    let audioCtx;
    
    const playClickSound = () => {
      // Initialize AudioContext on first user interaction
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return; // Browser doesn't support Web Audio API
        audioCtx = new AudioContext();
      }
      
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Create oscillator for a tiny, soft retro "tick" sound
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Vaporwave retro UI tick parameters
      oscillator.type = 'sine'; 
      oscillator.frequency.setValueAtTime(900, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05); 

      // Very soft volume (0.15) quickly fading out
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05); 

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.05);
    };

    const handleGlobalClick = (e) => {
      // Fire sound if clicking on anything explicitly interactive
      const isInteractive = e.target.closest('button, a, input, textarea, [role="button"], .cursor-pointer');
      
      // Or if the vaporwave desktop needs it, we can just play it on ANY click for extreme retro feel.
      // But adhering to the closest interactive element is cleaner for UX.
      if (isInteractive) {
        playClickSound();
      }
    };

    // Use mousedown so it feels instantly responsive upon clicking (before mouseup)
    document.addEventListener('mousedown', handleGlobalClick);

    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, []);
}
