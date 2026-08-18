import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { QueueProgressCard } from '../../components/devotee/QueueProgressCard';
import { QREPassCard } from '../../components/devotee/QREPassCard';
import { queueService } from '../../services/queueService';
import { LiveQueueData } from '../../data/mockQueue';
import { ROUTES } from '../../config/routes';

export const VirtualQueuePage: React.FC = () => {
  const [queue, setQueue] = useState<LiveQueueData | null>(null);

  useEffect(() => {
    queueService.getLiveQueueStatus().then(setQueue);
  }, []);

  if (!queue) return null;

  return (
    <div className="hm-container">
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--hm-secondary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Smart Virtual Queue
        </span>
        <h1 className="hm-header-title">Live Queue Status & E-Pass</h1>
        <p className="hm-subtext">Real-time token pacing eliminates physical congestion.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'flex-start' }} className="queue-grid">
        {/* Left Column: Progress Card & What To Do Next */}
        <div>
          <QueueProgressCard queue={queue} />

          {/* Guidance: What to do next */}
          <div className="ambient-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <h3 className="hm-section-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MaterialIcon name="info" size={20} style={{ color: 'var(--hm-secondary)' }} />
              <span>What to do next?</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--hm-primary-fixed)', color: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--hm-on-surface)' }}>
                    Proceed towards {queue.gateNumber}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)' }}>
                    Free electric mobility shuttles run every 3 minutes from Parking Bay 1.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--hm-primary-fixed)', color: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--hm-on-surface)' }}>
                    Keep E-Pass QR code ready on screen
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)' }}>
                    Turnstiles will automatically scan and verify your group e-tokens.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--hm-primary-fixed)', color: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--hm-on-surface)' }}>
                    Priority Access Gate Available
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)' }}>
                    Dedicated wheelchair ramp and seating provided in Mandapa Holding Zone C.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: QR E-Pass Card & Sharing */}
        <div>
          <QREPassCard
            passId={queue.passId}
            tokenNumber={queue.tokenNumber}
            templeName={queue.templeName}
            devoteeName={queue.devoteeName}
            slotTime={queue.slotTime}
            priorityCategory={queue.priorityCategory}
            totalMembers={queue.totalGroupMembers}
            qrCodeUrl={queue.qrCodeUrl}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
            <button
              type="button"
              className="btn-hm-secondary"
              style={{ flex: 1, padding: '0.65rem', fontSize: '0.85rem' }}
              onClick={() => alert('E-Pass downloaded to device!')}
            >
              <MaterialIcon name="download" size={16} />
              <span>Download PDF</span>
            </button>
            <Link
              to={ROUTES.EMERGENCY}
              className="btn-hm-danger"
              style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}
            >
              <MaterialIcon name="sos" size={16} />
              <span>Need Help?</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .queue-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
