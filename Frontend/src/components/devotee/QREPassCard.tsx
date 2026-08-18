import React from 'react';
import { MaterialIcon } from '../common/MaterialIcon';
import { PriorityBadge } from '../common/PriorityBadge';

interface QREPassCardProps {
  passId: string;
  tokenNumber: string;
  templeName: string;
  devoteeName: string;
  slotTime: string;
  priorityCategory: string;
  totalMembers: number;
  qrCodeUrl: string;
}

export const QREPassCard: React.FC<QREPassCardProps> = ({
  passId,
  tokenNumber,
  templeName,
  devoteeName,
  slotTime,
  priorityCategory,
  totalMembers,
  qrCodeUrl
}) => {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        border: '1px solid var(--hm-outline-variant)',
        boxShadow: '0 8px 32px rgba(87, 0, 0, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          backgroundColor: 'var(--hm-primary)',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85 }}>
            Official Darshan Pass
          </span>
          <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1.1rem' }}>{templeName}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.65rem', opacity: 0.85, display: 'block' }}>TOKEN</span>
          <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.5rem', fontWeight: 800, color: '#ffdcc2' }}>
            {tokenNumber}
          </span>
        </div>
      </div>

      {/* QR Code & Details Body */}
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.75rem',
            backgroundColor: '#ffffff',
            border: '2px solid var(--hm-primary)',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <img
            src={qrCodeUrl}
            alt="Darshan QR Pass"
            style={{ width: '160px', height: '160px', display: 'block', margin: '0 auto' }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <PriorityBadge category={priorityCategory} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            textAlign: 'left',
            backgroundColor: 'var(--hm-surface-container-low)',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.85rem'
          }}
        >
          <div>
            <span style={{ color: 'var(--hm-on-surface-variant)', fontSize: '0.72rem', display: 'block' }}>Primary Devotee</span>
            <span style={{ fontWeight: 600, color: 'var(--hm-on-surface)' }}>{devoteeName}</span>
          </div>
          <div>
            <span style={{ color: 'var(--hm-on-surface-variant)', fontSize: '0.72rem', display: 'block' }}>Devotee Count</span>
            <span style={{ fontWeight: 600, color: 'var(--hm-on-surface)' }}>{totalMembers} Persons</span>
          </div>
          <div>
            <span style={{ color: 'var(--hm-on-surface-variant)', fontSize: '0.72rem', display: 'block' }}>Slot Timing</span>
            <span style={{ fontWeight: 600, color: 'var(--hm-primary)' }}>{slotTime}</span>
          </div>
          <div>
            <span style={{ color: 'var(--hm-on-surface-variant)', fontSize: '0.72rem', display: 'block' }}>Pass Reference</span>
            <span style={{ fontWeight: 600, color: 'var(--hm-on-surface)' }}>{passId}</span>
          </div>
        </div>

        {/* Scan notice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', color: 'var(--hm-on-surface-variant)', fontSize: '0.75rem' }}>
          <MaterialIcon name="qr_code_scanner" size={16} />
          <span>Present this QR code at Turnstile / Gate Scanner</span>
        </div>
      </div>
    </div>
  );
};
