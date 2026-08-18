import React from 'react';
import { ArrowRight } from 'lucide-react';
import { APP_ROUTE } from '../config/routes';

interface FinalCTAProps {
  progress: number;
  onNavigate: (route: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ progress, onNavigate }) => {
  // Fade in between 0.90 and 0.96, fully visible up to 1.00
  const isTriggered = progress >= 0.90;
  const opacity = Math.max(0, Math.min(1, (progress - 0.90) / 0.07));
  const translateY = (1 - opacity) * 20; // Subtle slide up

  if (opacity <= 0.01) return null;

  return (
    <div
      className={`final-cta-overlay ${isTriggered ? 'active' : ''}`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      <div className="cta-content-card">
        <span className="cta-brand-tag">Seva360 Platform</span>
        <h2 className="cta-headline">Divine Darshan, Reimagined</h2>
        <p className="cta-tagline">
          Experience sacred pilgrimage with smart virtual queuing, predictive crowd safety, and peaceful Darshan.
        </p>

        <div className="cta-button-group">
          <button
            type="button"
            className="btn-enter-seva"
            onClick={() => onNavigate(APP_ROUTE)}
            aria-label="Enter Seva360 Application"
          >
            <span>Enter Seva360</span>
            <ArrowRight className="btn-icon-arrow" size={18} />
          </button>
          <span className="cta-secondary-note">Next-Gen Pilgrimage Crowd Management</span>
        </div>
      </div>
    </div>
  );
};
