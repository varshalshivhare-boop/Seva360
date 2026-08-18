import React from 'react';
import { LiveQueueData } from '../../data/mockQueue';
import { MaterialIcon } from '../common/MaterialIcon';

export const QueueProgressCard: React.FC<{ queue: LiveQueueData }> = ({ queue }) => {
  return (
    <div className="ambient-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      {/* Top Banner with Token & Wait Time */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--hm-surface-container-high)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hm-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Active Virtual Queue Token
          </span>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--hm-primary)', lineHeight: 1.1 }}>
            {queue.tokenNumber}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)', marginTop: '0.2rem' }}>
            Pass ID: <span style={{ fontWeight: 600 }}>{queue.passId}</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            backgroundColor: 'var(--hm-surface-container-low)',
            padding: '0.85rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--hm-outline-variant)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--hm-on-surface-variant)', display: 'block' }}>Estimated Wait</span>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--hm-primary)' }}>
              {queue.estimatedWaitMinutes} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>mins</span>
            </span>
          </div>
          <div style={{ width: '1px', backgroundColor: 'var(--hm-outline-variant)' }} />
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--hm-on-surface-variant)', display: 'block' }}>Your Position</span>
            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--hm-secondary)' }}>
              #{queue.currentPosition} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>of {queue.totalInQueue}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Gate & Slot Info */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          padding: '1rem 0',
          fontSize: '0.88rem',
          color: 'var(--hm-on-surface)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MaterialIcon name="door_front" size={18} style={{ color: 'var(--hm-primary)' }} />
          <span>{queue.gateNumber}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MaterialIcon name="schedule" size={18} style={{ color: 'var(--hm-secondary)' }} />
          <span>Slot: {queue.slotTime}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MaterialIcon name="group" size={18} style={{ color: 'var(--hm-primary)' }} />
          <span>{queue.totalGroupMembers} Devotees</span>
        </div>
      </div>

      {/* Step Progress Checklist */}
      <div style={{ marginTop: '0.75rem' }}>
        <h4 style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--hm-on-surface)', marginBottom: '1rem' }}>
          Live Checkpoint Progress
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {queue.checkpoints.map((cp, idx) => {
            const isDone = cp.status === 'completed';
            const isCurrent = cp.status === 'current';

            return (
              <div
                key={cp.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: isCurrent ? 'var(--hm-surface-container)' : isDone ? 'var(--hm-surface-container-low)' : 'transparent',
                  border: isCurrent ? '1px solid var(--hm-primary)' : '1px solid var(--hm-surface-container-high)'
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? 'var(--hm-primary)' : isCurrent ? 'var(--hm-secondary-container)' : 'var(--hm-surface-container-high)',
                    color: isDone ? '#ffffff' : isCurrent ? 'var(--hm-on-secondary-container)' : 'var(--hm-on-surface-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  {isDone ? <MaterialIcon name="check" size={16} /> : idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--hm-primary)' : 'var(--hm-on-surface)' }}>
                    {cp.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--hm-on-surface-variant)' }}>{cp.zone}</div>
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isCurrent ? 'var(--hm-secondary)' : 'var(--hm-on-surface-variant)' }}>
                  {cp.estimatedTime}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
