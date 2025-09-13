
"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Item, Profile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type SupabaseContextType = {
  supabase: SupabaseClient;
  session: Session | null;
  profile: Profile | null;
  items: Item[];
  isInitialLoading: boolean;
  addItem: (itemData: Omit<Item, 'id' | 'created_at' | 'is_recovered' | 'user_id' | 'locker_number'> & {date: Date}) => Promise<Item | null>;
  markAsRecovered: (item: Item) => Promise<void>;
  updateProfile: (newData: { name: string }) => Promise<void>;
  updatePreferences: (prefs: { match_notifications_enabled: boolean; weekly_summary_enabled: boolean }) => Promise<void>;
};

const AppContext = createContext<SupabaseContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createClientComponentClient());
  const router = useRouter();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      const currentPath = window.location.pathname;
      if (newSession && !session) {
        if (currentPath === '/login' || currentPath === '/signup' || currentPath === '/') {
          router.push('/dashboard');
        }
      }
      
      if (!newSession && session) {
         setProfile(null);
         setItems([]);
         router.push('/');
      }

      setSession(newSession);

    });

    return () => {
        subscription.unsubscribe();
    };
  }, [supabase, router, session]);

  useEffect(() => {
    if (!session) {
      setIsInitialLoading(false);
      return;
    };

    setIsInitialLoading(true);

    const fetchInitialData = async () => {
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
        
        if (profileError) {
            console.error("Error fetching profile:", profileError);
        } else {
            setProfile(profileData);
        }
        
        setIsInitialLoading(false);

        const { data: itemsData, error: itemsError } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (itemsError) {
            console.error("Error fetching items:", itemsError);
        } else {
            setItems(itemsData || []);
        }
    };
    
    fetchInitialData();

    const profileChannel = supabase
      .channel('profile-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` }, (payload) => {
         setProfile(payload.new as Profile);
      })
      .subscribe();
      
    const itemsChannel = supabase
      .channel('items-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'items' }, async (payload) => {
         const { data: itemsData, error: itemsError } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (itemsError) console.error("Error re-fetching items:", itemsError);
        else setItems(itemsData || []);
      })
      .subscribe()

    return () => {
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(itemsChannel);
    }
  }, [supabase, session]);


  const addItem = async (itemData: Omit<Item, 'id' | 'created_at' | 'is_recovered' | 'user_id' | 'locker_number'> & {date: Date}) => {
    if (!session || !supabase) {
        toast({ variant: 'destructive', title: 'Not authenticated' });
        return null;
    }

    const newItemData = {
        ...itemData,
        date: new Date(itemData.date).toISOString(),
        user_id: session.user.id,
        locker_number: itemData.type === 'found' ? Math.floor(Math.random() * 100) + 1 : undefined,
    };
    
    const { data: newItem, error } = await supabase
        .from('items')
        .insert(newItemData)
        .select()
        .single();
    
    if (error) {
        console.error("Error adding item:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not report the item." });
        return null;
    }
    
    return newItem as Item;
  }

  const markAsRecovered = async (itemToRecover: Item) => {
      if (!session || !profile || !supabase) {
        toast({ variant: 'destructive', title: 'Not authenticated' });
        return;
      }
      if (itemToRecover.is_recovered) return;

      const { error: updateError } = await supabase
        .from('items')
        .update({ is_recovered: true })
        .eq('id', itemToRecover.id);
    
      if (updateError) {
         toast({ variant: "destructive", title: "Error", description: "Could not mark item as recovered." });
         return;
      }

      if (itemToRecover.type === 'found' && itemToRecover.user_id === session.user.id) {
          const newPoints = (profile.reward_points || 0) + 10;
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ reward_points: newPoints })
            .eq('id', profile.id);
          
          if(profileError) {
              toast({ variant: "destructive", title: "Error", description: "Could not award points." });
          }
      }
  };
  
  const updateProfile = async (newData: { name: string }) => {
    if (!session || !supabase) {
      toast({ variant: 'destructive', title: 'Not authenticated' });
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ name: newData.name, updated_at: new Date().toISOString() })
      .eq('id', session.user.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error updating profile',
        description: error.message,
      });
    } else {
      toast({
        title: 'Profile Updated',
        description: 'Your information has been successfully saved.',
      });
    }
  };

  const updatePreferences = async (prefs: { match_notifications_enabled: boolean; weekly_summary_enabled: boolean }) => {
    if (!session || !supabase) {
      toast({ variant: 'destructive', title: 'Not authenticated' });
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ ...prefs, updated_at: new Date().toISOString() })
      .eq('id', session.user.id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error updating preferences',
        description: error.message,
      });
    } else {
      toast({
        title: 'Preferences Updated',
        description: 'Your settings have been successfully saved.',
      });
    }
  };


  const value = {
    supabase,
    session,
    profile,
    items,
    isInitialLoading,
    addItem,
    markAsRecovered,
    updateProfile,
    updatePreferences
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
