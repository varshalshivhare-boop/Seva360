export interface SafetyAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'medical' | 'police';
  title: string;
  location: string;
  zone: string;
  timestamp: string;
  timeAgo: string;
  status: 'active' | 'in_progress' | 'resolved';
  assignedTeam?: string;
  actionRequired?: string;
}

export const MOCK_ALERTS: SafetyAlert[] = [
  {
    id: 'ALT-1092',
    type: 'critical',
    title: 'Surge Warning: Zone 4 Flow',
    location: 'Gate 2 to Mandapa Corridor',
    zone: 'Zone 4',
    timestamp: '2026-08-17 23:14',
    timeAgo: '2m ago',
    status: 'active',
    assignedTeam: 'Rapid Response Bravo (4 personnel)',
    actionRequired: 'Slow intake rate at Turnstile B'
  },
  {
    id: 'ALT-1091',
    type: 'warning',
    title: 'High Density Detected in South Corridor',
    location: 'South Mandapa Walkway',
    zone: 'Zone 3',
    timestamp: '2026-08-17 23:02',
    timeAgo: '14m ago',
    status: 'in_progress',
    assignedTeam: 'Temple Marshal Unit 2',
    actionRequired: 'Deploy dynamic barricades to divert flow'
  },
  {
    id: 'ALT-1088',
    type: 'medical',
    title: 'Medical Assistance Request - Dehydration',
    location: 'Holding Area 2 (Shade Canopy)',
    zone: 'Zone 2',
    timestamp: '2026-08-17 22:45',
    timeAgo: '31m ago',
    status: 'resolved',
    assignedTeam: 'Red Cross First Aid Mobile Unit',
    actionRequired: 'Patient assisted, glucose administered'
  },
  {
    id: 'ALT-1085',
    type: 'info',
    title: 'Scheduled Mangala Aarti Transition Completed',
    location: 'Garbhagriha Sanctum',
    zone: 'Zone 1',
    timestamp: '2026-08-17 22:15',
    timeAgo: '1h ago',
    status: 'resolved',
    assignedTeam: 'Pujari Council & Security Lead'
  }
];
