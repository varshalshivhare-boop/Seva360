import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../config/routes';

export const SignUpPage: React.FC = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [idType, setIdType] = useState('Aadhaar');
  const [idNumber, setIdNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup({ name, email, phone, password });
      navigate(ROUTES.DEVOTEE.DASHBOARD);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="heritage-app" style={{ justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem' }}>
      <div className="ambient-card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem 2rem', margin: '0 auto' }}>
        {/* Brand Icon & Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--hm-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <MaterialIcon name="temple_hindu" size={28} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--hm-primary)', marginBottom: '0.25rem' }}>
            Create an Account
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)' }}>
            Register once for priority virtual passes across all sacred temples.
          </p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="hm-input-group">
            <label className="hm-label">Full Name (as on Government ID)</label>
            <div className="hm-input-with-icon">
              <MaterialIcon name="person" size={20} className="input-icon" />
              <input
                type="text"
                className="hm-input"
                placeholder="e.g. Arjun Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="hm-input-group">
            <label className="hm-label">Mobile Number (for SMS Passes)</label>
            <div className="hm-input-with-icon">
              <MaterialIcon name="call" size={20} className="input-icon" />
              <input
                type="tel"
                className="hm-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="hm-input-group">
            <label className="hm-label">Email Address</label>
            <div className="hm-input-with-icon">
              <MaterialIcon name="mail" size={20} className="input-icon" />
              <input
                type="email"
                className="hm-input"
                placeholder="arjun@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '0.75rem' }}>
            <div className="hm-input-group">
              <label className="hm-label">ID Type</label>
              <select
                className="hm-input"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                style={{ padding: '0.75rem' }}
              >
                <option value="Aadhaar">Aadhaar</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID">Voter ID</option>
              </select>
            </div>
            <div className="hm-input-group">
              <label className="hm-label">ID Number</label>
              <input
                type="text"
                className="hm-input"
                placeholder="XXXX-XXXX-1234"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="hm-input-group">
            <label className="hm-label">Password</label>
            <div className="hm-input-with-icon">
              <MaterialIcon name="lock" size={20} className="input-icon" />
              <input
                type="password"
                className="hm-input"
                placeholder="Create secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-hm-primary" disabled={isLoading} style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
            <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
            <MaterialIcon name="arrow_forward" size={18} />
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)' }}>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} style={{ color: 'var(--hm-primary)', fontWeight: 700, textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
