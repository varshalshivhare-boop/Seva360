import React, { useState } from 'react';
import { MaterialIcon } from '../common/MaterialIcon';
import { alertService } from '../../services/alertService';

export const SosPanicButton: React.FC = () => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ id: string; eta: string } | null>(null);

  const handleSosTrigger = async () => {
    setIsLoading(true);
    try {
      const res = await alertService.triggerEmergencySos({
        type: 'medical',
        location: 'Devotee Active Location: Mandapa Corridor East',
        description: 'Instant 1-Tap SOS Emergency button triggered by pilgrim app',
        devoteePhone: '+91 98765 43210'
      });
      setIsTriggered(true);
      setAlertInfo({ id: res.alertId, eta: res.estimatedArrival });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: isTriggered ? 'rgba(186, 26, 26, 0.08)' : 'var(--hm-surface-container-lowest)',
        border: isTriggered ? '2px solid var(--hm-error)' : '1px solid var(--hm-outline-variant)',
        borderRadius: '0.75rem',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(186, 26, 26, 0.08)'
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--hm-error)', marginBottom: '0.5rem' }}>
        {isTriggered ? '🚨 EMERGENCY DISPATCH ACTIVE' : 'ONE-TAP EMERGENCY SOS'}
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--hm-on-surface-variant)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
        {isTriggered
          ? `Your SOS signal (${alertInfo?.id}) is broadcasting to Temple Command, Police, and Medical units. Estimated response: ${alertInfo?.eta}.`
          : 'Press and trigger instant high-priority emergency broadcast to the nearest Police and Medical First Responders.'}
      </p>

      {!isTriggered ? (
        <button
          type="button"
          onClick={handleSosTrigger}
          disabled={isLoading}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'var(--hm-error)',
            color: '#ffffff',
            border: '4px solid #ffdad6',
            boxShadow: '0 0 0 10px rgba(186, 26, 26, 0.2), 0 8px 24px rgba(186, 26, 26, 0.4)',
            cursor: 'pointer',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.2rem',
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '0.08em',
            transition: 'transform 0.2s ease'
          }}
          className="ambient-shadow-hover"
        >
          <MaterialIcon name="sos" size={36} />
          <span>{isLoading ? '...' : 'SOS'}</span>
        </button>
      ) : (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--hm-error)', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 700 }}>
          <MaterialIcon name="emergency" size={24} />
          <span>Help is on the way (ETA: {alertInfo?.eta})</span>
        </div>
      )}
    </div>
  );
};
