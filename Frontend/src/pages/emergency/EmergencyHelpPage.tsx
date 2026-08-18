import React, { useState } from 'react';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { SosPanicButton } from '../../components/emergency/EmergencyComponents';
import { alertService } from '../../services/alertService';

export const EmergencyHelpPage: React.FC = () => {
  const [incidentType, setIncidentType] = useState<'medical' | 'police' | 'general' | 'lost_child'>('medical');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await alertService.triggerEmergencySos({
        type: incidentType,
        location: location || 'Holding Courtyard Zone 3',
        description,
        devoteePhone: phone
      });
      setIsReportSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const emergencyContacts = [
    { title: 'National Emergency', number: '112', icon: 'local_police', desc: 'Unified Police, Fire & Disaster Helpline' },
    { title: 'Medical Ambulance', number: '108', icon: 'local_hospital', desc: 'Rapid Emergency Medical First Aid' },
    { title: 'Temple Control Room', number: '1800-SEVA-360', icon: 'shield', desc: 'Dedicated Temple Security & Lost & Found' }
  ];

  return (
    <div className="hm-container">
      {/* Title */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--hm-error)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Safety & Rapid Response
        </span>
        <h1 className="hm-header-title" style={{ color: 'var(--hm-error)' }}>Emergency Help & SOS</h1>
        <p className="hm-subtext">Immediate on-ground dispatch for medical, security, and child assistance.</p>
      </div>

      {/* 1-Tap SOS Button */}
      <SosPanicButton />

      {/* Direct Call Helplines Grid */}
      <h3 className="hm-section-title" style={{ marginBottom: '1rem' }}>Instant Emergency Call Lines</h3>
      <div className="hm-grid-3" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
        {emergencyContacts.map((c) => (
          <a
            key={c.number}
            href={`tel:${c.number.replace(/[^0-9]/g, '')}`}
            className="ambient-card ambient-shadow-hover"
            style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(186,26,26,0.2)' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--hm-error-container)', color: 'var(--hm-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MaterialIcon name={c.icon} size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--hm-on-surface)' }}>{c.title}</div>
              <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--hm-error)' }}>
                {c.number}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--hm-on-surface-variant)' }}>{c.desc}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Incident Report Form & Help Centers Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', alignItems: 'flex-start' }} className="incident-grid">
        {/* Report Form */}
        <div className="ambient-card" style={{ padding: '1.75rem' }}>
          <h3 className="hm-section-title" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MaterialIcon name="report" size={22} style={{ color: 'var(--hm-error)' }} />
            <span>Report an Incident / Hazard</span>
          </h3>

          {!isReportSubmitted ? (
            <form onSubmit={handleReportSubmit}>
              <div className="hm-input-group">
                <label className="hm-label">Incident Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  {[
                    { key: 'medical', label: 'Medical Aid / Injury', icon: 'local_hospital' },
                    { key: 'police', label: 'Security / Overcrowding', icon: 'security' },
                    { key: 'lost_child', label: 'Lost Child / Missing Person', icon: 'child_care' },
                    { key: 'general', label: 'Water / Sanitation', icon: 'info' }
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setIncidentType(cat.key as any)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '0.375rem',
                        border: incidentType === cat.key ? '2px solid var(--hm-error)' : '1px solid var(--hm-outline-variant)',
                        backgroundColor: incidentType === cat.key ? 'var(--hm-error-container)' : '#fff',
                        color: incidentType === cat.key ? 'var(--hm-error)' : 'var(--hm-on-surface)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      <MaterialIcon name={cat.icon} size={16} />
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="hm-input-group">
                <label className="hm-label">Your Current Location / Nearest Landmark</label>
                <div className="hm-input-with-icon">
                  <MaterialIcon name="location_on" size={20} className="input-icon" />
                  <input
                    type="text"
                    className="hm-input"
                    placeholder="e.g. East Gopuram Gate 2, near Shoe Stand 4"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="hm-input-group">
                <label className="hm-label">Contact Mobile Number</label>
                <div className="hm-input-with-icon">
                  <MaterialIcon name="call" size={20} className="input-icon" />
                  <input
                    type="tel"
                    className="hm-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="hm-input-group">
                <label className="hm-label">Description / Details</label>
                <textarea
                  className="hm-input"
                  rows={3}
                  placeholder="Describe the situation so the response team arrives with proper equipment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-hm-danger"
                disabled={isSubmitting}
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <span>{isSubmitting ? 'Transmitting Alert...' : 'Submit Priority Incident Report'}</span>
                <MaterialIcon name="send" size={18} />
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <MaterialIcon name="check_circle" size={48} style={{ color: 'var(--hm-success)', marginBottom: '0.75rem' }} />
              <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--hm-on-surface)', marginBottom: '0.25rem' }}>
                Incident Logged & Unit Dispatched
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--hm-on-surface-variant)', marginBottom: '1.5rem' }}>
                Temple Marshals and First Responders have been notified of your location. Stay where you are.
              </p>
              <button
                type="button"
                className="btn-hm-secondary"
                onClick={() => setIsReportSubmitted(false)}
              >
                Log Another Update
              </button>
            </div>
          )}
        </div>

        {/* Nearest Physical Help Centers */}
        <div className="ambient-card" style={{ padding: '1.75rem' }}>
          <h3 className="hm-section-title" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MaterialIcon name="place" size={22} style={{ color: 'var(--hm-primary)' }} />
            <span>Nearest Help Desks on Campus</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--hm-surface-container-low)', borderRadius: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--hm-primary)' }}>Medical Post 1 (ICU & First Aid)</div>
              <div style={{ color: 'var(--hm-on-surface-variant)', margin: '0.2rem 0' }}>Behind East Gopuram Turnstiles</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hm-success)', fontWeight: 600 }}>Doctor On Duty • 2 Ambulances Stationed</div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--hm-surface-container-low)', borderRadius: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--hm-secondary)' }}>Lost & Found / Child Safety Booth</div>
              <div style={{ color: 'var(--hm-on-surface-variant)', margin: '0.2rem 0' }}>Mandapa Queue Complex - Counter 3</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hm-primary)', fontWeight: 600 }}>Public Address Announcer Available</div>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--hm-surface-container-low)', borderRadius: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--hm-on-surface)' }}>Police Assistance Booth</div>
              <div style={{ color: 'var(--hm-on-surface-variant)', margin: '0.2rem 0' }}>Main Temple Plaza (Near Parking Bay 1)</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--hm-secondary)', fontWeight: 600 }}>24/7 Rapid Patrol Unit</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .incident-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
