import React from 'react';

export type StatusLevel = 'Low' | 'Moderate' | 'High' | 'Critical' | 'Normal' | 'Active' | 'Resolved' | 'Confirmed';

interface StatusPillProps {
  level: StatusLevel | string;
  label?: string;
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ level, label, className = '' }) => {
  const displayLabel = label || level;

  let pillClass = 'status-pill-primary';
  const lower = level.toLowerCase();

  if (lower === 'low' || lower === 'normal' || lower === 'resolved' || lower === 'confirmed') {
    pillClass = 'status-pill-low';
  } else if (lower === 'moderate' || lower === 'medium' || lower === 'warning') {
    pillClass = 'status-pill-moderate';
  } else if (lower === 'high' || lower === 'critical' || lower === 'active') {
    pillClass = 'status-pill-high';
  }

  return (
    <span className={`status-pill ${pillClass} ${className}`}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', display: 'inline-block' }} />
      {displayLabel}
    </span>
  );
};
