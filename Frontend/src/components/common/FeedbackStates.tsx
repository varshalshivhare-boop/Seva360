import React from 'react';
import { MaterialIcon } from './MaterialIcon';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading spiritual updates...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', minHeight: '200px' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid var(--hm-outline-variant)',
          borderTopColor: 'var(--hm-primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}
      />
      <p style={{ color: 'var(--hm-on-surface-variant)', fontSize: '0.9rem' }}>{message}</p>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search_off',
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
        backgroundColor: 'var(--hm-surface-container-lowest)',
        borderRadius: '0.75rem',
        border: '1px dashed var(--hm-outline-variant)'
      }}
    >
      <MaterialIcon name={icon} size={48} style={{ color: 'var(--hm-outline)', marginBottom: '1rem' }} />
      <h3 style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--hm-on-surface)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--hm-on-surface-variant)', fontSize: '0.9rem', maxWidth: '400px', marginBottom: actionText ? '1.5rem' : 0 }}>
        {description}
      </p>
      {actionText && onAction && (
        <button type="button" className="btn-hm-primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 28, 24, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: 'var(--hm-surface-container-lowest)',
          borderRadius: '0.75rem',
          boxShadow: '0 20px 48px rgba(87, 0, 0, 0.2)',
          border: '1px solid var(--hm-outline-variant)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--hm-surface-container-high)',
            backgroundColor: 'var(--hm-surface-container-low)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--hm-primary)', fontSize: '1.15rem', fontWeight: 700 }}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--hm-on-surface-variant)' }}
          >
            <MaterialIcon name="close" size={20} />
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
};
