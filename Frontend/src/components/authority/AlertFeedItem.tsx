import React from 'react';
import { SafetyAlert } from '../../data/mockAlerts';
import { MaterialIcon } from '../common/MaterialIcon';

interface AlertFeedItemProps {
  alert: SafetyAlert;
  onDispatch?: (alertId: string) => void;
}

export const AlertFeedItem: React.FC<AlertFeedItemProps> = ({ alert, onDispatch }) => {
  const isCritical = alert.type === 'critical';
  const isMedical = alert.type === 'medical';
  const isResolved = alert.status === 'resolved';

  const icon = isMedical ? 'local_hospital' : isCritical ? 'warning' : 'info';
  const badgeColor = isCritical ? '#ef4444' : isMedical ? '#3b82f6' : '#f59e0b';

  return (
    <div
      style={{
        backgroundColor: '#14131a',
        border: isCritical ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid #2d2938',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '0.75rem',
        opacity: isResolved ? 0.6 : 1
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.15)' : 'rgba(229,195,120,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: badgeColor
            }}
          >
            <MaterialIcon name={icon} size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>{alert.title}</div>
            <div style={{ fontSize: '0.75rem', color: '#9d98a8' }}>{alert.location} ({alert.zone})</div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.72rem', color: '#7a7585', display: 'block' }}>{alert.timeAgo}</span>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: isResolved ? '#10b981' : '#f59e0b',
              textTransform: 'uppercase'
            }}
          >
            {alert.status}
          </span>
        </div>
      </div>

      {alert.actionRequired && (
        <div style={{ fontSize: '0.8rem', color: '#c4bfcf', backgroundColor: '#1a1822', padding: '0.5rem 0.75rem', borderRadius: '4px', marginTop: '0.5rem' }}>
          <strong style={{ color: '#e5c378' }}>Action: </strong> {alert.actionRequired}
        </div>
      )}

      {alert.assignedTeam && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#9d98a8' }}>
          <span>Team: {alert.assignedTeam}</span>
          {!isResolved && onDispatch && (
            <button
              type="button"
              onClick={() => onDispatch(alert.id)}
              style={{
                backgroundColor: 'rgba(229, 195, 120, 0.15)',
                border: '1px solid rgba(229, 195, 120, 0.4)',
                color: '#e5c378',
                borderRadius: '3px',
                padding: '0.25rem 0.6rem',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Dispatch Unit
            </button>
          )}
        </div>
      )}
    </div>
  );
};
