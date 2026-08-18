import React from 'react';
import { Temple } from '../../data/mockTemples';
import { MaterialIcon } from '../common/MaterialIcon';
import { StatusPill } from '../common/StatusPill';

interface TempleCardProps {
  temple: Temple;
  onSelect: (temple: Temple) => void;
}

export const TempleCard: React.FC<TempleCardProps> = ({ temple, onSelect }) => {
  return (
    <div
      className="ambient-card ambient-shadow-hover"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Temple Image with Live Crowd Overlay */}
      <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: 'var(--hm-surface-container-high)' }}>
        <img
          src={temple.imageUrl}
          alt={temple.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <StatusPill level={temple.crowdLevel} label={`${temple.crowdLevel} Crowd (${temple.crowdPercentage}%)`} />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            padding: '1rem',
            background: 'linear-gradient(to top, rgba(28, 28, 24, 0.85) 0%, transparent 100%)',
            color: '#ffffff'
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#ffdcc2', fontWeight: 600 }}>{temple.deity}</div>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.2 }}>
            {temple.name}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Location & Rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--hm-on-surface-variant)' }}>
              <MaterialIcon name="location_on" size={16} style={{ color: 'var(--hm-primary)' }} />
              <span>{temple.location}, {temple.state}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#b06000', fontWeight: 600 }}>
              <MaterialIcon name="star" size={16} fill style={{ color: '#e5a50a' }} />
              <span>{temple.rating}</span>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)', lineHeight: 1.4, marginBottom: '1rem' }}>
            {temple.description}
          </p>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: 'var(--hm-surface-container-low)',
              padding: '0.6rem 0.85rem',
              borderRadius: '0.375rem',
              fontSize: '0.78rem',
              marginBottom: '1rem'
            }}
          >
            <div>
              <span style={{ color: 'var(--hm-on-surface-variant)', display: 'block' }}>Avg Wait Time</span>
              <span style={{ fontWeight: 700, color: 'var(--hm-primary)' }}>~{temple.waitTimeMinutes} mins</span>
            </div>
            <div>
              <span style={{ color: 'var(--hm-on-surface-variant)', display: 'block' }}>Daily Timings</span>
              <span style={{ fontWeight: 600, color: 'var(--hm-on-surface)' }}>{temple.darshanTimings.split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="btn-hm-primary"
          onClick={() => onSelect(temple)}
          style={{ width: '100%', fontSize: '0.88rem', padding: '0.65rem' }}
        >
          <span>Book Darshan / Seva</span>
          <MaterialIcon name="arrow_forward" size={16} />
        </button>
      </div>
    </div>
  );
};
