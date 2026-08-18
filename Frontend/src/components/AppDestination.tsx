import React from 'react';
import { ArrowLeft, Shield, Users, Eye, Bell } from 'lucide-react';

interface AppDestinationProps {
  onBack: () => void;
}

export const AppDestination: React.FC<AppDestinationProps> = ({ onBack }) => {
  return (
    <div className="app-destination-container">
      <div className="app-destination-card">
        <div className="app-badge">
          <span>Seva360 Core Engine</span>
        </div>

        <h1 className="app-title">SEVA360 APPLICATION</h1>
        <p className="app-desc">
          Unified 360° Temple Crowd Management & Devotee Safety Platform.
        </p>

        <div className="app-features-grid">
          <div className="feature-pill">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Users size={16} color="var(--color-gold)" />
              <h4>Virtual Queue & E-Pass</h4>
            </div>
            <p>Smart slot allocation with priority routing for elderly & families.</p>
          </div>

          <div className="feature-pill">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Eye size={16} color="var(--color-gold)" />
              <h4>AI Vision Tracking</h4>
            </div>
            <p>Real-time CCTV & drone density heatmaps using YOLOv8 & DeepSORT.</p>
          </div>

          <div className="feature-pill">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Shield size={16} color="var(--color-gold)" />
              <h4>Predictive Safety</h4>
            </div>
            <p>Time-series crowd forecasting & proactive resource deployment.</p>
          </div>

          <div className="feature-pill">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
              <Bell size={16} color="var(--color-gold)" />
              <h4>Instant Emergency SOS</h4>
            </div>
            <p>Automated panic detection & direct dispatch to medical/police teams.</p>
          </div>
        </div>

        <button type="button" className="btn-back-landing" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Return to Cinematic Darshan</span>
        </button>
      </div>
    </div>
  );
};
