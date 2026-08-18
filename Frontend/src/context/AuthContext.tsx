import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, MOCK_DEVOTEE_USER, MOCK_AUTHORITY_USER } from '../data/mockUser';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password?: string, requestedRole?: UserRole) => Promise<UserProfile>;
  signup: (data: { name: string; email: string; phone: string; password?: string }) => Promise<UserProfile>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('seva360_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_DEVOTEE_USER;
      }
    }
    return MOCK_DEVOTEE_USER;
  });

  const [role, setRole] = useState<UserRole>(() => {
    return user?.role || 'DEVOTEE';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('seva360_user', JSON.stringify(user));
      setRole(user.role);
    } else {
      localStorage.removeItem('seva360_user');
    }
  }, [user]);

  const login = async (emailOrPhone: string, password?: string, requestedRole: UserRole = 'DEVOTEE') => {
    const loggedUser = await authService.login(emailOrPhone, password, requestedRole);
    setUser(loggedUser);
    setRole(loggedUser.role);
    return loggedUser;
  };

  const signup = async (data: { name: string; email: string; phone: string; password?: string }) => {
    const newUser = await authService.signup(data);
    setUser(newUser);
    setRole(newUser.role);
    return newUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'AUTHORITY' || newRole === 'POLICE' || newRole === 'MEDICAL') {
      const u: UserProfile = { ...MOCK_AUTHORITY_USER, role: newRole };
      setUser(u);
      setRole(newRole);
    } else {
      setUser(MOCK_DEVOTEE_USER);
      setRole('DEVOTEE');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
