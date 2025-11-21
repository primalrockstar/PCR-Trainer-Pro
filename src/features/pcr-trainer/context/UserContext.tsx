import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, UserPreferences, UserStats } from '../types';

interface UserContextType {
  user: User | null;
  login: (role?: UserRole) => void;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  isAuthenticated: boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  uiMode: 'glass',
  notifications: {
    email: true,
    push: true,
    feedback: true,
    reminders: true
  },
  privacy: {
    shareProgress: true,
    allowPeerReview: true
  },
  studySettings: {
    dailyGoal: 30,
    cardsPerSession: 10,
    spacedRepetition: true
  }
};

const defaultStats: UserStats = {
  streakDays: 5,
  totalStudyTime: 1240, // minutes
  cardsMastered: 45,
  scenariosCompleted: 12,
  averageAccuracy: 88.5,
  lastStudySession: new Date()
};

const mockUser: User = {
  id: 'user-123',
  email: 'john.doe@promedix.edu',
  firstName: 'John',
  lastName: 'Doe',
  role: 'student',
  institutionId: 'inst-001',
  createdAt: new Date('2023-01-15'),
  lastLoginAt: new Date(),
  preferences: defaultPreferences,
  stats: defaultStats
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulate auto-login for demo purposes
  useEffect(() => {
    const storedUser = localStorage.getItem('pcr_trainer_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Restore Date objects
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        if (parsedUser.lastLoginAt) parsedUser.lastLoginAt = new Date(parsedUser.lastLoginAt);
        parsedUser.stats.lastStudySession = new Date(parsedUser.stats.lastStudySession);
        setUser(parsedUser);
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    } else {
      // Default to logged in for demo
      setUser(mockUser);
    }
  }, []);

  const login = (role: UserRole = 'student') => {
    const newUser = { ...mockUser, role };
    setUser(newUser);
    localStorage.setItem('pcr_trainer_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pcr_trainer_user');
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...prefs }
    };
    
    setUser(updatedUser);
    localStorage.setItem('pcr_trainer_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updatePreferences, isAuthenticated: !!user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
