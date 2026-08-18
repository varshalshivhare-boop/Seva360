import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../components/common/MaterialIcon';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/routes';

export const DevoteeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { label: 'Dashboard', path: ROUTES.DEVOTEE.DASHBOARD, icon: 'dashboard' },
    { label: 'Book Darshan', path: ROUTES.DEVOTEE.BOOK_DARSHAN, icon: 'event_available' },
    { label: 'Virtual Queue', path: ROUTES.DEVOTEE.VIRTUAL_QUEUE, icon: 'schedule' },
    { label: 'Temples & Sevas', path: ROUTES.DEVOTEE.TEMPLES, icon: 'temple_hindu' },
  ];

  return (
    <div className="heritage-app">
      {/* Top Main Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--hm-surface-container-lowest)',
          borderBottom: '1px solid var(--hm-surface-container-high)',
          boxShadow: '0 2px 12px rgba(87, 0, 0, 0.04)'
        }}
      >
        <div
          className="hm-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px'
          }}
        >
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link
              to={ROUTES.DEVOTEE.DASHBOARD}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: 'var(--hm-primary)'
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--hm-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <MaterialIcon name="temple_hindu" size={24} />
              </div>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    letterSpacing: '-0.02em',
                    display: 'block',
                    lineHeight: 1
                  }}
                >
                  DARSHAN360
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--hm-secondary)',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}
                >
                  Smart Pilgrimage
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              className="desktop-nav"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '0.375rem',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--hm-primary)' : 'var(--hm-on-surface-variant)',
                    backgroundColor: isActive ? 'var(--hm-surface-container)' : 'transparent',
                    borderBottom: isActive ? '2px solid var(--hm-primary)' : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  })}
                >
                  <MaterialIcon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right Action Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Emergency SOS Quick Button */}
            <Link
              to={ROUTES.EMERGENCY}
              className="btn-hm-danger"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.82rem',
                letterSpacing: '0.04em'
              }}
            >
              <MaterialIcon name="emergency" size={18} />
              <span>SOS Help</span>
            </Link>

            {/* Switch to Authority View Quick Action */}
            <button
              type="button"
              onClick={() => {
                switchRole('AUTHORITY');
                navigate(ROUTES.AUTHORITY.DASHBOARD);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.85rem',
                backgroundColor: 'var(--hm-surface-container-low)',
                border: '1px solid var(--hm-outline-variant)',
                borderRadius: '0.375rem',
                color: 'var(--hm-primary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Switch to Authority Command Center"
            >
              <MaterialIcon name="shield" size={16} />
              <span className="hide-mobile">Authority View</span>
            </button>

            {/* User Profile dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--hm-surface-container)',
                    border: '1px solid var(--hm-outline-variant)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--hm-primary)'
                  }}
                >
                  <MaterialIcon name="person" size={20} />
                </div>
              </button>

              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '220px',
                    backgroundColor: 'var(--hm-surface-container-lowest)',
                    border: '1px solid var(--hm-outline-variant)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 8px 24px rgba(87, 0, 0, 0.12)',
                    padding: '0.75rem',
                    zIndex: 200
                  }}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--hm-surface-container-high)', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--hm-on-surface)' }}>{user?.name || 'Devotee'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--hm-on-surface-variant)' }}>{user?.email || 'arjun@example.com'}</div>
                  </div>
                  <Link
                    to={ROUTES.LANDING}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--hm-on-surface)',
                      textDecoration: 'none',
                      borderRadius: '0.25rem'
                    }}
                  >
                    <MaterialIcon name="auto_awesome" size={16} />
                    <span>Cinematic Journey</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--hm-error)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '0.25rem',
                      textAlign: 'left'
                    }}
                  >
                    <MaterialIcon name="logout" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'none',
                border: '1px solid var(--hm-outline-variant)',
                borderRadius: '0.375rem',
                color: 'var(--hm-primary)',
                cursor: 'pointer'
              }}
            >
              <MaterialIcon name={mobileMenuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--hm-surface-container-lowest)',
              borderBottom: '1px solid var(--hm-outline-variant)',
              padding: '1rem'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--hm-primary)' : 'var(--hm-on-surface)',
                  backgroundColor: isActive ? 'var(--hm-surface-container)' : 'transparent',
                  marginBottom: '0.25rem'
                })}
              >
                <MaterialIcon name={item.icon} size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Main Devotee Content */}
      <main style={{ flex: 1, padding: '2rem 0 4rem' }}>{children}</main>

      {/* Application Footer */}
      <footer
        style={{
          backgroundColor: 'var(--hm-surface-container-low)',
          borderTop: '1px solid var(--hm-surface-container-high)',
          padding: '2.5rem 0'
        }}
      >
        <div
          className="hm-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, color: 'var(--hm-primary)', fontSize: '1rem', marginBottom: '0.25rem' }}>
              DARSHAN360 / SEVA360
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--hm-on-surface-variant)' }}>
              Next-Generation Temple Pilgrimage & Intelligent Crowd Management System.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem' }}>
            <Link to={ROUTES.LANDING} style={{ color: 'var(--hm-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Cinematic Experience
            </Link>
            <Link to={ROUTES.EMERGENCY} style={{ color: 'var(--hm-error)', textDecoration: 'none', fontWeight: 600 }}>
              Emergency Helpline: 112
            </Link>
            <span style={{ color: 'var(--hm-on-surface-variant)' }}>Toll Free: 1800-SEVA-360</span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};
