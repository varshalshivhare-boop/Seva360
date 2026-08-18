export interface DevoteeMember {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  idType: 'Aadhaar' | 'Passport' | 'Voter ID';
  idNumber: string;
  isSpecialCare?: boolean;
}

export interface Booking {
  bookingId: string;
  templeId: string;
  templeName: string;
  sevaName: string;
  date: string;
  slotTime: string;
  totalMembers: number;
  totalAmount: number;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
  priorityType: 'Standard' | 'Senior' | 'Accessible' | 'VIP';
  qrPassCode: string;
  devotees: DevoteeMember[];
  bookedAt: string;
}

export const MOCK_BOOKINGS: Booking[] = [
  {
    bookingId: 'BK-78901',
    templeId: 'kashi-vishwanath',
    templeName: 'Shri Kashi Vishwanath Temple',
    sevaName: 'Special Sugam Darshan Pass',
    date: '2026-08-20',
    slotTime: '07:00 AM - 08:30 AM',
    totalMembers: 3,
    totalAmount: 900,
    status: 'Confirmed',
    priorityType: 'Senior',
    qrPassCode: 'KASHI-2026-BK78901',
    bookedAt: '2026-08-15 14:30',
    devotees: [
      { id: 'dev-1', name: 'Arjun Sharma', age: 34, gender: 'Male', idType: 'Aadhaar', idNumber: 'XXXX-XXXX-4521' },
      { id: 'dev-2', name: 'Sunita Sharma', age: 62, gender: 'Female', idType: 'Aadhaar', idNumber: 'XXXX-XXXX-8910', isSpecialCare: true },
      { id: 'dev-3', name: 'Ramesh Sharma', age: 66, gender: 'Male', idType: 'Aadhaar', idNumber: 'XXXX-XXXX-7123', isSpecialCare: true }
    ]
  },
  {
    bookingId: 'BK-65421',
    templeId: 'somnath-temple',
    templeName: 'Shree Somnath Jyotirlinga',
    sevaName: 'Someshwar Mahapuja',
    date: '2026-09-05',
    slotTime: '07:00 AM - 08:30 AM',
    totalMembers: 2,
    totalAmount: 1000,
    status: 'Confirmed',
    priorityType: 'Standard',
    qrPassCode: 'SOMNATH-2026-BK65421',
    bookedAt: '2026-08-16 11:20',
    devotees: [
      { id: 'dev-1', name: 'Arjun Sharma', age: 34, gender: 'Male', idType: 'Aadhaar', idNumber: 'XXXX-XXXX-4521' },
      { id: 'dev-4', name: 'Pooja Sharma', age: 31, gender: 'Female', idType: 'Aadhaar', idNumber: 'XXXX-XXXX-3341' }
    ]
  }
];
