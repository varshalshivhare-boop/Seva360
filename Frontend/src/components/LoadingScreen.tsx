import React from 'react';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, isReady }) => {
  return (
    <div className={`loading-screen ${isReady ? 'hidden' : ''}`} aria-hidden={isReady}>
      <div className="loading-center-content">
        <svg className="loading-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L15 8H9L12 2Z" stroke="currentColor" />
          <path d="M12 8V22" stroke="currentColor" />
          <path d="M5 22H19" stroke="currentColor" />
          <circle cx="12" cy="14" r="3" stroke="currentColor" />
        </svg>

        <h1 className="loading-brand">SEVA360</h1>
        <p className="loading-message">Preparing your sacred Darshan journey...</p>

        <div className="loading-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <span className="loading-percentage">{progress}%</span>
      </div>
    </div>
  );
};
