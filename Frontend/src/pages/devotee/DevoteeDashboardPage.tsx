import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { QueueProgressCard } from '../../components/devotee/QueueProgressCard';
import { QREPassCard } from '../../components/devotee/QREPassCard';
import { Modal } from '../../components/common/FeedbackStates';
import { queueService } from '../../services/queueService';
import { LiveQueueData } from '../../data/mockQueue';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/routes';

export const DevoteeDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [queue, setQueue] = useState<LiveQueueData | null>(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    queueService.getLiveQueueStatus().then(setQueue);
  }, []);

  return (
    <div className="hm-container">
      {/* Devotee Greeting Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--hm-secondary)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Pilgrim Portal
          </span>
          <h1 className="hm-header-title">Namaskaram, {user?.name?.split(' ')[0] || 'Arjun'}</h1>
          <p className="hm-subtext">May your Darshan be filled with peace and divine grace.</p>
        </div>

        {/* Live Weather / Aarti Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'var(--hm-surface-container-lowest)',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--hm-outline-variant)'
          }}
        >
          <MaterialIcon name="partly_cloudy_day" size={24} style={{ color: 'var(--hm-secondary)' }} />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--hm-on-surface)' }}>27°C • Clear Skies</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--hm-on-surface-variant)' }}>Next Aarti: Sandhya (06:30 PM)</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Queue Status & Quick Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem', alignItems: 'flex-start' }} className="dashboard-grid">
        {/* Left Column: Active Queue Card & Today's Schedule */}
        <div>
          {queue ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 className="hm-section-title">Today's Active Pilgrimage</h3>
                <button
                  type="button"
                  onClick={() => setIsPassModalOpen(true)}
                  className="btn-hm-secondary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem' }}
                >
                  <MaterialIcon name="qr_code_scanner" size={16} />
                  <span>View E-Pass QR</span>
                </button>
              </div>

              <QueueProgressCard queue={queue} />
            </div>
          ) : null}

          {/* Quick Action Navigation Grid */}
          <h3 className="hm-section-title" style={{ marginBottom: '1rem' }}>Quick Actions</h3>
          <div className="hm-grid-2" style={{ gap: '1rem' }}>
            <Link
              to={ROUTES.DEVOTEE.BOOK_DARSHAN}
              className="ambient-card ambient-shadow-hover"
              style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--hm-primary-fixed)', color: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcon name="event_available" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--hm-primary)' }}>Book New Darshan</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--hm-on-surface-variant)' }}>Select sacred slot & seva pass</div>
              </div>
            </Link>

            <Link
              to={ROUTES.DEVOTEE.VIRTUAL_QUEUE}
              className="ambient-card ambient-shadow-hover"
              style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--hm-secondary-container)', color: 'var(--hm-on-secondary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcon name="schedule" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--hm-secondary)' }}>Live Queue Tracker</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--hm-on-surface-variant)' }}>Track position & turnstiles</div>
              </div>
            </Link>

            <Link
              to={ROUTES.DEVOTEE.TEMPLES}
              className="ambient-card ambient-shadow-hover"
              style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--hm-surface-container)', color: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcon name="temple_hindu" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--hm-on-surface)' }}>Explore Temples</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--hm-on-surface-variant)' }}>Live crowd & timings</div>
              </div>
            </Link>

            <Link
              to={ROUTES.EMERGENCY}
              className="ambient-card ambient-shadow-hover"
              style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(186,26,26,0.3)' }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'var(--hm-error-container)', color: 'var(--hm-error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcon name="sos" size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--hm-error)' }}>Emergency SOS</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--hm-on-surface-variant)' }}>Instant medical & police aid</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: E-Pass Preview & Temple Announcements */}
        <div>
          {queue && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="hm-section-title" style={{ marginBottom: '0.75rem' }}>Your Active E-Pass</h3>
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
            </div>
          )}

          {/* Announcements Card */}
          <div className="ambient-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <MaterialIcon name="campaign" size={20} style={{ color: 'var(--hm-secondary)' }} />
              <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.95rem' }}>
                Temple Authority Bulletins
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--hm-surface-container-low)' }}>
                <span style={{ fontWeight: 700, color: 'var(--hm-primary)', display: 'block', marginBottom: '0.15rem' }}>
                  Special Senior Citizen Shuttle
                </span>
                <span style={{ color: 'var(--hm-on-surface-variant)' }}>
                  Complimentary electric carts operating every 5 mins from Parking Lot C to East Gopuram.
                </span>
              </div>

              <div style={{ padding: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--hm-surface-container-low)' }}>
                <span style={{ fontWeight: 700, color: 'var(--hm-secondary)', display: 'block', marginBottom: '0.15rem' }}>
                  Annadanam Mahaprasad
                </span>
                <span style={{ color: 'var(--hm-on-surface-variant)' }}>
                  Continuous fresh sanctified meals available at Dining Hall 2 from 11:00 AM to 03:30 PM.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for full size E-Pass QR */}
      <Modal isOpen={isPassModalOpen} onClose={() => setIsPassModalOpen(false)} title="Official Darshan E-Pass">
        {queue && (
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
        )}
      </Modal>

      <style>{`
        @media (max-width: 960px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
