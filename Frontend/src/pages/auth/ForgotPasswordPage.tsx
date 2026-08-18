import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { authService } from '../../services/authService';
import { ROUTES } from '../../config/routes';

export const ForgotPasswordPage: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.requestPasswordReset(emailOrPhone);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="heritage-app" style={{ justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem' }}>
      <div className="ambient-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--hm-surface-container)', color: 'var(--hm-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <MaterialIcon name="lock_reset" size={28} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--hm-primary)', marginBottom: '0.25rem' }}>
            Forgot Password?
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)' }}>
            Enter your registered email or mobile number to receive instant OTP recovery.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="hm-input-group">
              <label className="hm-label">Email or Mobile Number</label>
              <div className="hm-input-with-icon">
                <MaterialIcon name="mail" size={20} className="input-icon" />
                <input
                  type="text"
                  className="hm-input"
                  placeholder="e.g. arjun@example.com"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-hm-primary" disabled={isLoading} style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
              <span>{isLoading ? 'Sending Instructions...' : 'Send Recovery OTP'}</span>
              <MaterialIcon name="arrow_forward" size={18} />
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', backgroundColor: 'var(--hm-surface-container-low)', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <MaterialIcon name="mark_email_read" size={40} style={{ color: 'var(--hm-success)', marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--hm-on-surface)', marginBottom: '0.25rem' }}>OTP Sent Successfully</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--hm-on-surface-variant)' }}>
              Check your SMS / Email for the 6-digit security code.
            </p>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to={ROUTES.LOGIN} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--hm-primary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
            <MaterialIcon name="arrow_back" size={16} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
