
"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Item, Profile, User, StoredUser } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useRouter } from 'next/navigation';

interface AppContextType {
  items: Item[];
  profile: Profile;
  addItem: (item: Omit<Item, 'id' | 'postedAt' | 'isRecovered'>) => Item;
  updateItem: (id: string, updates: Partial<Item>) => void;
  markAsRecovered: (item: Item) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [items, setItems] = useLocalStorage<Item[]>('campus-compass-items', []);
  const [profile, setProfile] = useLocalStorage<Profile>('campus-compass-profile', { rewardPoints: 0 });
  const [user, setUser] = useLocalStorage<User | null>('campus-compass-user', null);
  const [storedUsers, setStoredUsers] = useLocalStorage<StoredUser[]>('campus-compass-users', []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const signup = (email: string, password: string): boolean => {
    const existingUser = storedUsers.find(u => u.email === email);
    if (existingUser) {
        return false; // User already exists
    }
    const newUser: StoredUser = { email, password };
    setStoredUsers([...storedUsers, newUser]);
    return true;
  };


  const login = (email: string, password: string): boolean => {
    const storedUser = storedUsers.find(u => u.email === email && u.password === password);

    if (storedUser) {
        const name = email.split('@')[0];
        setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) });
        router.push('/dashboard');
        return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  const addItem = (itemData: Omit<Item, 'id' | 'postedAt' | 'isRecovered'>) => {
    const newItem: Item = {
      ...itemData,
      id: uuidv4(),
      postedAt: Date.now(),
      isRecovered: false,
      lockerNumber: itemData.type === 'found' ? Math.floor(Math.random() * 100) + 1 : undefined,
    };
    setItems([...items, newItem].sort((a, b) => b.postedAt - a.postedAt));
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map(item => (item.id === id ? { ...item, ...updates } : item)));
  };
  
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const markAsRecovered = (itemToRecover: Item) => {
    if (itemToRecover.isRecovered) return;

    updateItem(itemToRecover.id, { isRecovered: true });

    if (itemToRecover.type === 'found') {
      setProfile(prevProfile => ({
        ...prevProfile,
        rewardPoints: prevProfile.rewardPoints + 10,
      }));
    }
  };

  const value = {
    items,
    profile,
    addItem,
    updateItem,
    updateUser,
    markAsRecovered,
    isLoading,
    isAuthenticated: !!user,
    user,
    login,
    signup,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
