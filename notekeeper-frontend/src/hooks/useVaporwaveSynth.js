import { useEffect, useRef } from 'react';

export function useVaporwaveSynth(isPlaying) {
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const masterGainRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 4-chord dreamy vaporwave progression
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Amin7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [155.56, 196.00, 246.94, 311.13]  // Ebmaj7 (dreamy borrowing)
      ];
      
      let step = 0;

      const playChord = () => {
        if (ctx.state !== 'running') return;

        const chord = chords[step % chords.length];
        const now = ctx.currentTime;
        
        // Master gain with very soft volume (0.05)
        const masterGain = ctx.createGain();
        masterGainRef.current = masterGain;
        masterGain.gain.setValueAtTime(0.04, now);
        
        // Lo-fi filter (cuts off high frequencies for a muffled 'cassette tape' sound)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now); // Muffled cutoff
        
        // Tape wobble (LFO modulating the filter cutoff slightly)
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.5; // Slow wobble
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 100;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start(now);
        lfo.stop(now + 4);

        masterGain.connect(filter);
        filter.connect(ctx.destination);

        chord.forEach((freq, index) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          
          // Mix sine (warmth) and triangle (classic analog edge)
          osc.type = index % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          
          // Constant slight random detune for analog VHS flutter
          osc.detune.setValueAtTime((Math.random() - 0.5) * 15, now);

          // ADSR Volume Envelope (Pad style: slow attack, slow release)
          oscGain.gain.setValueAtTime(0, now);
          // Gently swell up
          oscGain.gain.linearRampToValueAtTime(0.3, now + 1.5); 
          // Hold the chord
          oscGain.gain.setValueAtTime(0.3, now + 2.5);
          // Fade out smoothly
          oscGain.gain.linearRampToValueAtTime(0, now + 4); 
          
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          
          osc.start(now);
          osc.stop(now + 4.5); // Ensure it overlaps smoothly before stopping
        });

        step++;
      };

      // Play immediately, then loop every 3.8 seconds for lush overlap
      playChord();
      intervalRef.current = setInterval(playChord, 3800);

    } else {
      clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        // Suspend context to pause the music instantly without harsh clicks
        audioCtxRef.current.suspend();
      }
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);
}
