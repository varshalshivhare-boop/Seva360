import React from 'react';
import { MaterialIcon } from './MaterialIcon';

export interface PriorityBadgeProps {
  category: 'Standard' | 'Senior Citizen' | 'Differently Abled' | 'Family with Infant' | 'VIP' | string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ category }) => {
  let icon = 'person';
  if (category.toLowerCase().includes('senior')) icon = 'elderly';
  else if (category.toLowerCase().includes('abled') || category.toLowerCase().includes('accessible')) icon = 'accessible';
  else if (category.toLowerCase().includes('infant') || category.toLowerCase().includes('family')) icon = 'child_care';
  else if (category.toLowerCase().includes('vip')) icon = 'workspace_premium';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.3rem 0.75rem',
        borderRadius: '0.375rem',
        backgroundColor: 'var(--hm-surface-container)',
        border: '1px solid var(--hm-outline-variant)',
        color: 'var(--hm-primary)',
        fontSize: '0.8rem',
        fontWeight: 600
      }}
    >
      <MaterialIcon name={icon} size={16} />
      <span>{category}</span>
    </div>
  );
};
