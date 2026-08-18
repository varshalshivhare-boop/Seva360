export interface QueueCheckpoint {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  estimatedTime: string;
  zone: string;
}

export interface LiveQueueData {
  passId: string;
  tokenNumber: string;
  templeName: string;
  devoteeName: string;
  totalGroupMembers: number;
  currentPosition: number;
  totalInQueue: number;
  estimatedWaitMinutes: number;
  gateNumber: string;
  slotTime: string;
  priorityCategory: 'Standard' | 'Senior Citizen' | 'Differently Abled' | 'Family with Infant';
  qrCodeUrl: string;
  checkpoints: QueueCheckpoint[];
}

export const MOCK_LIVE_QUEUE: LiveQueueData = {
  passId: 'SEVA-2026-8942',
  tokenNumber: 'A-104',
  templeName: 'Sri Venkateswara Swamy Temple (Tirumala)',
  devoteeName: 'Arjun Sharma',
  totalGroupMembers: 3,
  currentPosition: 18,
  totalInQueue: 142,
  estimatedWaitMinutes: 24,
  gateNumber: 'Gate 4 - Vaikuntham Q-Complex',
  slotTime: '08:30 AM - 09:30 AM',
  priorityCategory: 'Senior Citizen',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=SEVA360-PASS-8942-A104',
  checkpoints: [
    { id: 'cp-1', name: 'Outer Security & Smart Luggage Scan', status: 'completed', estimatedTime: '08:15 AM', zone: 'Zone A' },
    { id: 'cp-2', name: 'Virtual Queue Token Verification', status: 'completed', estimatedTime: '08:25 AM', zone: 'Zone B' },
    { id: 'cp-3', name: 'Vaikuntham Mandapa Holding Area', status: 'current', estimatedTime: '08:45 AM', zone: 'Zone C (Mandapa)' },
    { id: 'cp-4', name: 'Golden Dhwajasthambham Entry', status: 'upcoming', estimatedTime: '09:05 AM', zone: 'Zone D' },
    { id: 'cp-5', name: 'Sanctum Sanctorum (Garbhagriha Darshan)', status: 'upcoming', estimatedTime: '09:15 AM', zone: 'Zone E (Sanctum)' }
  ]
};
