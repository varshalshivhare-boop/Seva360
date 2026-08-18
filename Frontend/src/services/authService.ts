import { UserProfile, UserRole, MOCK_DEVOTEE_USER, MOCK_AUTHORITY_USER } from '../data/mockUser';

/**
 * Authentication Service Interface
 * Backend developers can replace mock resolvers with actual Firebase / JWT / OAuth endpoints.
 */
export const authService = {
  async login(emailOrPhone: string, _password?: string, role: UserRole = 'DEVOTEE'): Promise<UserProfile> {
    // Simulated network delay
    await new Promise((res) => setTimeout(res, 300));

    if (role === 'AUTHORITY' || emailOrPhone.includes('admin') || emailOrPhone.includes('police')) {
      return { ...MOCK_AUTHORITY_USER, email: emailOrPhone };
    }
    return { ...MOCK_DEVOTEE_USER, email: emailOrPhone };
  },

  async signup(data: { name: string; email: string; phone: string; password?: string }): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 400));
    return {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'DEVOTEE',
      preferredLanguage: 'English'
    };
  },

  async requestPasswordReset(emailOrPhone: string): Promise<{ success: boolean; message: string }> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      message: `Password reset instructions sent to ${emailOrPhone}`
    };
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    return MOCK_DEVOTEE_USER;
  },

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
  }
};
