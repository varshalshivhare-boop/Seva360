import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/routes';
import { UserRole } from '../../data/mockUser';

export const AuthPortalPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('arjun.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('DEVOTEE');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(emailOrPhone, password, selectedRole);
      if (selectedRole === 'AUTHORITY' || selectedRole === 'POLICE' || selectedRole === 'MEDICAL') {
        navigate(ROUTES.AUTHORITY.DASHBOARD);
      } else {
        navigate(ROUTES.DEVOTEE.DASHBOARD);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchRole(role);
    if (role === 'DEVOTEE') {
      navigate(ROUTES.DEVOTEE.DASHBOARD);
    } else {
      navigate(ROUTES.AUTHORITY.DASHBOARD);
    }
  };

  return (
    <div className="heritage-app" style={{ backgroundColor: 'var(--hm-surface)' }}>
      {/* Top Portal Header */}
      <header style={{ borderBottom: '1px solid var(--hm-surface-container-high)', backgroundColor: 'var(--hm-surface-container-lowest)', padding: '1rem 0' }}>
        <div className="hm-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={ROUTES.LANDING} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'var(--hm-primary)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '6px', backgroundColor: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <MaterialIcon name="temple_hindu" size={22} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.2rem', display: 'block', lineHeight: 1 }}>
                SEVA360
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--hm-secondary)', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
                Seva360 Platform
              </span>
            </div>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to={ROUTES.LANDING} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--hm-on-surface-variant)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
              <MaterialIcon name="auto_awesome" size={16} />
              <span>Cinematic Darshan</span>
            </Link>
            <Link to={ROUTES.SIGNUP} className="btn-hm-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Register E-Pass
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero & Auth Split View */}
      <main style={{ flex: 1, padding: '3.5rem 0' }}>
        <div className="hm-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="portal-grid">
            {/* Left Narrative Column */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', borderRadius: '100px', backgroundColor: 'var(--hm-surface-container)', color: 'var(--hm-secondary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                <MaterialIcon name="verified" size={16} />
                <span>Unified Pilgrimage Ecosystem</span>
              </div>

              <h1 className="hm-header-title" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', marginBottom: '1.25rem' }}>
                Manage your spiritual journey with profound serenity.
              </h1>

              <p className="hm-subtext" style={{ fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '580px' }}>
                Eliminating chaotic queues through AI-driven crowd prediction, real-time virtual slots, instant emergency broadcast, and priority access for elderly and differently-abled devotees.
              </p>

              {/* 4 Feature Pillars */}
              <div className="hm-grid-2" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div className="ambient-card" style={{ padding: '1.25rem' }}>
                  <MaterialIcon name="schedule" size={24} style={{ color: 'var(--hm-primary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    Virtual Queues
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)', lineHeight: 1.4 }}>
                    Live token status & estimated wait times with zero physical standing.
                  </p>
                </div>

                <div className="ambient-card" style={{ padding: '1.25rem' }}>
                  <MaterialIcon name="event_available" size={24} style={{ color: 'var(--hm-primary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    Smart Booking
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)', lineHeight: 1.4 }}>
                    Instant QR E-pass with automatic priority routing for families & seniors.
                  </p>
                </div>

                <div className="ambient-card" style={{ padding: '1.25rem' }}>
                  <MaterialIcon name="medical_services" size={24} style={{ color: 'var(--hm-error)', marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    Emergency SOS
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)', lineHeight: 1.4 }}>
                    1-Tap alert directly to Police & Red Cross First Responders.
                  </p>
                </div>

                <div className="ambient-card" style={{ padding: '1.25rem' }}>
                  <MaterialIcon name="volunteer_activism" size={24} style={{ color: 'var(--hm-secondary)', marginBottom: '0.5rem' }} />
                  <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                    Seva & Annadanam
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--hm-on-surface-variant)', lineHeight: 1.4 }}>
                    Transparent contribution & meal distribution scheduling.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Authentication Card */}
            <div className="ambient-card" style={{ padding: '2.5rem 2rem', boxShadow: '0 12px 40px rgba(87, 0, 0, 0.08)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--hm-secondary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Secure Access Portal
                </span>
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--hm-primary)' }}>
                  Sign In to Seva360
                </h3>
              </div>

              {/* Role Switcher Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', backgroundColor: 'var(--hm-surface-container-low)', padding: '0.35rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('DEVOTEE');
                    setEmailOrPhone('arjun.sharma@example.com');
                  }}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: selectedRole === 'DEVOTEE' ? 'var(--hm-primary)' : 'transparent',
                    color: selectedRole === 'DEVOTEE' ? '#fff' : 'var(--hm-on-surface)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Pilgrim / Devotee
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('AUTHORITY');
                    setEmailOrPhone('rajesh.verma@seva360.gov.in');
                  }}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    backgroundColor: selectedRole === 'AUTHORITY' ? 'var(--hm-primary)' : 'transparent',
                    color: selectedRole === 'AUTHORITY' ? '#fff' : 'var(--hm-on-surface)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Authority / Police
                </button>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="hm-input-group">
                  <label className="hm-label">Email or Mobile Number</label>
                  <div className="hm-input-with-icon">
                    <MaterialIcon name="person" size={20} className="input-icon" />
                    <input
                      type="text"
                      className="hm-input"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="hm-input-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="hm-label">Password / OTP</label>
                    <Link to={ROUTES.FORGOT_PASSWORD} style={{ fontSize: '0.78rem', color: 'var(--hm-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="hm-input-with-icon">
                    <MaterialIcon name="lock" size={20} className="input-icon" />
                    <input
                      type="password"
                      className="hm-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-hm-primary" disabled={isLoading} style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}>
                  <span>{isLoading ? 'Authenticating...' : `Enter as ${selectedRole === 'DEVOTEE' ? 'Devotee' : 'Authority'}`}</span>
                  <MaterialIcon name="arrow_forward" size={18} />
                </button>
              </form>

              {/* Direct Quick Launch Buttons for Testing */}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--hm-surface-container-high)', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--hm-on-surface-variant)', display: 'block', marginBottom: '0.75rem' }}>
                  Instant Interactive Access
                </span>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button type="button" onClick={() => handleQuickDemo('DEVOTEE')} className="btn-hm-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                    Demo Devotee View
                  </button>
                  <button type="button" onClick={() => handleQuickDemo('AUTHORITY')} className="btn-hm-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                    Demo Command Center
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)' }}>
                Don't have an account?{' '}
                <Link to={ROUTES.SIGNUP} style={{ color: 'var(--hm-primary)', fontWeight: 700, textDecoration: 'none' }}>
                  Register E-Pass
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 900px) {
          .portal-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};
