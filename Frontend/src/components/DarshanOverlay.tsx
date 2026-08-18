import React from 'react';

interface DarshanOverlayProps {
  progress: number;
}

export const DarshanOverlay: React.FC<DarshanOverlayProps> = ({ progress }) => {
  // 1. Entering Garbhagriha transition (around 0.48 - 0.53)
  let midText = '';
  let midOpacity = 0;

  if (progress >= 0.46 && progress <= 0.54) {
    midText = 'Approaching the Sanctum';
    if (progress < 0.50) {
      midOpacity = (progress - 0.46) / 0.04;
    } else {
      midOpacity = (0.54 - progress) / 0.04;
    }
  } else if (progress >= 0.82 && progress <= 0.90) {
    midText = 'Darshan, without the rush.';
    if (progress < 0.86) {
      midOpacity = (progress - 0.82) / 0.04;
    } else {
      midOpacity = (0.90 - progress) / 0.04;
    }
  }

  if (midOpacity <= 0.02 || !midText) return null;

  return (
    <div className="micro-overlay" style={{ opacity: midOpacity }}>
      <div className="micro-text">{midText}</div>
    </div>
  );
};
