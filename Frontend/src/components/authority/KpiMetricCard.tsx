import React from 'react';
import { MaterialIcon } from '../common/MaterialIcon';

interface KpiMetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  isIncreasePositive?: boolean;
  icon: string;
  accentColor?: string;
}

export const KpiMetricCard: React.FC<KpiMetricCardProps> = ({
  title,
  value,
  subtext,
  change,
  icon,
  accentColor = '#e5c378'
}) => {
  return (
    <div
      style={{
        backgroundColor: '#18171f',
        border: '1px solid #2d2938',
        borderRadius: '0.6rem',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9d98a8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </span>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: 'rgba(229,195,120,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor
          }}
        >
          <MaterialIcon name={icon} size={18} />
        </div>
      </div>

      <div>
        <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>

        {(subtext || change) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
            {change && (
              <span
                style={{
                  color: change.startsWith('+') ? '#4ade80' : '#f87171',
                  fontWeight: 700,
                  backgroundColor: change.startsWith('+') ? 'rgba(74, 222, 128, 0.12)' : 'rgba(248, 113, 113, 0.12)',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '3px'
                }}
              >
                {change}
              </span>
            )}
            {subtext && <span style={{ color: '#7a7585' }}>{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
