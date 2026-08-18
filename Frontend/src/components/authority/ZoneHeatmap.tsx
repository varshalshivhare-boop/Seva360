import React from 'react';
import { ZoneMetric } from '../../data/mockAuthority';

export const ZoneHeatmap: React.FC<{ zones: ZoneMetric[] }> = ({ zones }) => {
  return (
    <div
      style={{
        backgroundColor: '#18171f',
        border: '1px solid #2d2938',
        borderRadius: '0.6rem',
        padding: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.05rem', fontWeight: 700, color: '#f3f0ea' }}>
          Zone Density & Crowd Flow Monitoring
        </h3>
        <span style={{ fontSize: '0.75rem', color: '#9d98a8' }}>Updated Live</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {zones.map((zone) => {
          const isCritical = zone.status === 'Critical';
          const isModerate = zone.status === 'Moderate';
          const barColor = isCritical ? '#ef4444' : isModerate ? '#f59e0b' : '#10b981';

          return (
            <div
              key={zone.id}
              style={{
                backgroundColor: '#121118',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: isCritical ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid #252230'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#e5c378', textTransform: 'uppercase', marginRight: '0.5rem' }}>
                    {zone.code}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f3f0ea' }}>
                    {zone.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9d98a8' }}>
                    Flow: <strong style={{ color: '#ffffff' }}>{zone.avgFlowRate}</strong>
                  </span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '3px',
                      backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.2)' : isModerate ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: barColor
                    }}
                  >
                    {zone.densityPercentage}% ({zone.status})
                  </span>
                </div>
              </div>

              {/* Progress Density Bar */}
              <div style={{ width: '100%', height: '6px', backgroundColor: '#252230', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${zone.densityPercentage}%`,
                    height: '100%',
                    backgroundColor: barColor,
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#7a7585', marginTop: '0.35rem' }}>
                <span>Occupancy: {zone.currentCount.toLocaleString()} Devotees</span>
                <span>Max Safe Limit: {zone.maxCapacity.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
