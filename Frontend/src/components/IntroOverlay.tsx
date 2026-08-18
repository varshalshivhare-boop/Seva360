import React from 'react';

interface IntroOverlayProps {
  progress: number;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ progress }) => {
  // Fade out between progress 0.00 and 0.10
  const opacity = Math.max(0, Math.min(1, 1 - progress / 0.10));

  if (opacity <= 0.01) return null;

  return (
    <div className="intro-overlay" style={{ opacity }}>
      <div className="intro-brand">
        <div className="intro-logo-badge">
          <span>◆</span>
          <span>Temple Sanctum</span>
          <span>◆</span>
        </div>
        <h1 className="intro-title">SEVA360</h1>
        <p className="intro-subtitle">A safer way to experience Darshan.</p>
      </div>

      <div className="intro-scroll-hint">
        <span className="scroll-text">Scroll to Begin Journey</span>
        <div className="scroll-line-container">
          <div className="scroll-line-indicator" />
        </div>
      </div>
    </div>
  );
};
