import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../components/common/MaterialIcon';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

export const AuthorityLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, switchRole, logout } = useAuth();
  const [time, setTime] = useState<string>('');
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
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        {/* Left: Command Identity & Live Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                backgroundColor: 'var(--hm-primary)',
                border: '1px solid rgba(229,195,120,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e5c378'
              }}
            >
              <MaterialIcon name="shield" size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em', color: '#fbf8f2' }}>
                SEVA360 COMMAND CENTER
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9d98a8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Unified Temple & Crowd Intelligence
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(27, 109, 59, 0.2)',
              border: '1px solid rgba(27, 109, 59, 0.5)',
              color: '#4ade80',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ade80', animation: 'pulse 1.5s infinite' }} />
            LIVE CCTV / DRONE ACTIVE
          </div>
        </div>

        {/* Right: Department Selector, Clock, Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Department Role Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.85rem',
              backgroundColor: '#22202a',
              borderRadius: '0.375rem',
              border: '1px solid #363242',
              fontSize: '0.8rem'
            }}
          >
            <MaterialIcon name="badge" size={16} style={{ color: '#e5c378' }} />
            <span style={{ fontWeight: 600 }}>{user?.role || 'AUTHORITY'}</span>
            <span style={{ color: '#7a7585' }}>|</span>
            <span style={{ color: '#a09ba8' }}>{user?.name || 'Officer Verma'}</span>
          </div>

          {/* Real-time Clock */}
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '0.88rem',
              color: '#e5c378',
              backgroundColor: '#0a0a0d',
              padding: '0.4rem 0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #2d2938'
            }}
          >
            {time || '11:30:00 PM'}
          </div>

          {/* Switch to Devotee Portal */}
          <button
            type="button"
            onClick={() => {
              switchRole('DEVOTEE');
              navigate(ROUTES.DEVOTEE.DASHBOARD);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              backgroundColor: '#2b1b22',
              border: '1px solid #5a313d',
              borderRadius: '0.375rem',
              color: '#f8b4c0',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <MaterialIcon name="person" size={16} />
            <span>Devotee View</span>
          </button>

          {/* Landing page link */}
          <Link
            to={ROUTES.LANDING}
            style={{
              color: '#a09ba8',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem'
            }}
          >
            <MaterialIcon name="auto_awesome" size={16} />
            <span>Cinematic</span>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate(ROUTES.LOGIN);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#f87171',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem'
            }}
          >
            <MaterialIcon name="logout" size={16} />
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Main Command Center Content */}
      <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#0d0d11' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>{children}</div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
