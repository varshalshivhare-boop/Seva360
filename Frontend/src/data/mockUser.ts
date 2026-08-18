export type UserRole = 'DEVOTEE' | 'AUTHORITY' | 'POLICE' | 'MEDICAL';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  preferredLanguage: string;
  badgeNumber?: string;
  department?: string;
}

export const MOCK_DEVOTEE_USER: UserProfile = {
  id: 'usr-dev-01',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@example.com',
  phone: '+91 98765 43210',
  role: 'DEVOTEE',
  preferredLanguage: 'English'
};

export const MOCK_AUTHORITY_USER: UserProfile = {
  id: 'usr-auth-01',
  name: 'Officer Rajesh Verma',
  email: 'rajesh.verma@seva360.gov.in',
  phone: '+91 98111 22334',
  role: 'AUTHORITY',
  badgeNumber: 'POL-CMD-778',
  department: 'Pilgrimage Command & Safety Unit',
  preferredLanguage: 'English'
};
