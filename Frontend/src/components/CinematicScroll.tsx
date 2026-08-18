import React, { useEffect, useRef, useState } from 'react';
import { FrameCanvas } from './FrameCanvas';
import { IntroOverlay } from './IntroOverlay';
import { DarshanOverlay } from './DarshanOverlay';
import { FinalCTA } from './FinalCTA';
import { Volume2, VolumeX } from 'lucide-react';
import { templeAudio } from '../utils/audio';

interface CinematicScrollProps {
  onNavigate: (route: string) => void;
}

export const CinematicScroll: React.FC<CinematicScrollProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<number>(0);
  const [uiProgress, setUiProgress] = useState<number>(0);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const lastChimeZoneRef = useRef<number>(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const totalScrollable = (containerRef.current?.offsetHeight || document.documentElement.scrollHeight) - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress strictly from 0.00 to 1.00
      const rawProgress = Math.max(0, Math.min(1, scrollTop / totalScrollable));

      progressRef.current = rawProgress;

      // Bell chime on reaching deity reveal
      if (rawProgress >= 0.85 && lastChimeZoneRef.current < 0.85) {
        templeAudio.playGentleBell(260);
      }
      lastChimeZoneRef.current = rawProgress;

      if (!ticking) {
        requestAnimationFrame(() => {
          setUiProgress(rawProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    const active = templeAudio.toggleMute();
    setIsAudioActive(active);
  };

  return (
    <div ref={containerRef} className="cinematic-container">
      {/* Ambient Audio Toggle */}
      <div className="ambient-controls">
        <button
          type="button"
          className="btn-ambient"
          onClick={handleAudioToggle}
          aria-label={isAudioActive ? 'Mute Sacred Ambient Sound' : 'Enable Sacred Ambient Sound'}
          title={isAudioActive ? 'Mute Sound' : 'Enable Temple Chimes'}
        >
          {isAudioActive ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Fixed Fullscreen Canvas Viewport — locked to screen */}
      <div className="fixed-viewport">
        <FrameCanvas progressRef={progressRef} />
        
        {/* Subtle Atmospheric Layers */}
        <div className="cinematic-vignette" />
        <div className="cinematic-subtle-glow" />

        {/* Dynamic Overlays scrubbed with scroll */}
        <IntroOverlay progress={uiProgress} />
        <DarshanOverlay progress={uiProgress} />
        <FinalCTA progress={uiProgress} onNavigate={onNavigate} />
      </div>
    </div>
  );
};
