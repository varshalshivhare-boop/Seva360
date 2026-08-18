import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../components/common/MaterialIcon';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

export const AuthorityLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, switchRole, logout } = useAuth();
  const [time, setTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#101014', color: '#f3f0ea', display: 'flex', flexDirection: 'column' }}>
      {/* Top Command Bar */}
      <header
        style={{
          backgroundColor: '#18171d',
          borderBottom: '1px solid #2d2938',
          padding: '0.75rem 1rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        {/* Primary Row — always visible */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Logo + Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                minWidth: '32px',
                borderRadius: '6px',
                backgroundColor: 'var(--hm-primary)',
                border: '1px solid rgba(229,195,120,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e5c378'
              }}
            >
              <MaterialIcon name="shield" size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: 'clamp(0.75rem, 2.5vw, 1.1rem)', letterSpacing: '0.05em', color: '#fbf8f2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                SEVA360 COMMAND CENTER
              </div>
              <div className="auth-subtitle" style={{ fontSize: '0.65rem', color: '#9d98a8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Unified Temple & Crowd Intelligence
              </div>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="auth-desktop-controls" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(27, 109, 59, 0.2)',
                border: '1px solid rgba(27, 109, 59, 0.5)',
                color: '#4ade80',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.05em'
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', animation: 'pulse 1.5s infinite' }} />
              LIVE
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 0.7rem',
                backgroundColor: '#22202a',
                borderRadius: '0.375rem',
                border: '1px solid #363242',
                fontSize: '0.78rem'
              }}
            >
              <MaterialIcon name="badge" size={14} style={{ color: '#e5c378' }} />
              <span style={{ fontWeight: 600 }}>{user?.role || 'AUTHORITY'}</span>
              <span style={{ color: '#7a7585' }}>|</span>
              <span style={{ color: '#a09ba8' }}>{user?.name || 'Officer Verma'}</span>
            </div>

            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                color: '#e5c378',
                backgroundColor: '#0a0a0d',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.375rem',
                border: '1px solid #2d2938'
              }}
            >
              {time || '—'}
            </div>

            <button
              type="button"
              onClick={() => { switchRole('DEVOTEE'); navigate(ROUTES.DEVOTEE.DASHBOARD); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.4rem 0.75rem', backgroundColor: '#2b1b22',
                border: '1px solid #5a313d', borderRadius: '0.375rem',
                color: '#f8b4c0', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer'
              }}
            >
              <MaterialIcon name="person" size={14} />
              <span>Devotee View</span>
            </button>

            <Link to={ROUTES.LANDING} style={{ color: '#a09ba8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}>
              <MaterialIcon name="auto_awesome" size={14} />
              <span>Cinematic</span>
            </Link>

            <button
              type="button"
              onClick={async () => { await logout(); navigate(ROUTES.LOGIN); }}
              style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem' }}
            >
              <MaterialIcon name="logout" size={14} />
              <span>Exit</span>
            </button>
          </div>

          {/* Mobile: Time + Hamburger */}
          <div className="auth-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#e5c378', backgroundColor: '#0a0a0d', padding: '0.25rem 0.45rem', borderRadius: '0.25rem', border: '1px solid #2d2938' }}>
              {time || '—'}
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: '1px solid #363242', borderRadius: '6px', padding: '0.3rem', color: '#e5c378', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <MaterialIcon name={mobileMenuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="auth-mobile-dropdown"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '0.5rem',
              marginTop: '0.75rem',
              padding: '0.75rem',
              backgroundColor: '#1e1d25',
              borderRadius: '0.5rem',
              border: '1px solid #2d2938'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', animation: 'pulse 1.5s infinite' }} />
              <span style={{ color: '#4ade80', fontSize: '0.75rem', fontWeight: 700 }}>LIVE CCTV / DRONE ACTIVE</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: '#22202a', borderRadius: '0.375rem' }}>
              <MaterialIcon name="badge" size={16} style={{ color: '#e5c378' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{user?.role || 'AUTHORITY'}</span>
              <span style={{ color: '#7a7585' }}>|</span>
              <span style={{ color: '#a09ba8', fontSize: '0.8rem' }}>{user?.name || 'Officer Verma'}</span>
            </div>

            <button
              type="button"
              onClick={() => { switchRole('DEVOTEE'); navigate(ROUTES.DEVOTEE.DASHBOARD); setMobileMenuOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.75rem', backgroundColor: '#2b1b22', border: '1px solid #5a313d', borderRadius: '0.375rem', color: '#f8b4c0', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', width: '100%' }}
            >
              <MaterialIcon name="person" size={16} />
              <span>Switch to Devotee View</span>
            </button>

            <Link
              to={ROUTES.LANDING}
              onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.75rem', color: '#a09ba8', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, backgroundColor: '#22202a', borderRadius: '0.375rem', border: '1px solid #363242' }}
            >
              <MaterialIcon name="auto_awesome" size={16} />
              <span>Cinematic Experience</span>
            </Link>

            <button
              type="button"
              onClick={async () => { await logout(); navigate(ROUTES.LOGIN); setMobileMenuOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 0.75rem', background: 'none', border: '1px solid #5a2222', borderRadius: '0.375rem', color: '#f87171', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, width: '100%' }}
            >
              <MaterialIcon name="logout" size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Command Center Content */}
      <main style={{ flex: 1, padding: 'clamp(0.75rem, 3vw, 1.5rem)', backgroundColor: '#0d0d11' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>{children}</div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (min-width: 861px) {
          .auth-desktop-controls { display: flex !important; }
          .auth-mobile-controls { display: none !important; }
          .auth-mobile-dropdown { display: none !important; }
        }
        @media (max-width: 860px) {
          .auth-desktop-controls { display: none !important; }
          .auth-mobile-controls { display: flex !important; }
          .auth-mobile-dropdown { display: flex !important; }
          .auth-subtitle { display: none; }
        }
      `}</style>
    </div>
  );
};
