"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Item, Profile } from '@/lib/types';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface AppContextType {
  items: Item[];
  profile: Profile;
  addItem: (item: Omit<Item, 'id' | 'postedAt' | 'isRecovered'>) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  markAsRecovered: (item: Item) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<Item[]>('campus-compass-items', []);
  const [profile, setProfile] = useLocalStorage<Profile>('campus-compass-profile', { rewardPoints: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const addItem = (itemData: Omit<Item, 'id' | 'postedAt' | 'isRecovered'>) => {
    const newItem: Item = {
      ...itemData,
      id: uuidv4(),
      postedAt: Date.now(),
      isRecovered: false,
    };
    setItems([...items, newItem].sort((a, b) => b.postedAt - a.postedAt));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map(item => (item.id === id ? { ...item, ...updates } : item)));
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
    markAsRecovered,
    isLoading,
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
