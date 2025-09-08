
"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Item, Profile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type SupabaseContextType = {
  supabase: SupabaseClient | null;
  session: Session | null;
  profile: Profile | null;
  items: Item[];
  isLoading: boolean;
  addItem: (itemData: Omit<Item, 'id' | 'created_at' | 'is_recovered' | 'user_id' | 'locker_number' | 'postedAt'> & {date: Date}) => Promise<Item | null>;
  markAsRecovered: (item: Item) => Promise<void>;
};

const AppContext = createContext<SupabaseContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabaseClient = createClientComponentClient();
    setSupabase(supabaseClient);
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const getInitialData = async () => {
        setIsLoading(true);
        // Check if a user session exists
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);

        if (session) {
            // If the user is logged in, fetch their profile from the 'profiles' table.
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            
            if (profileError) console.error("Error fetching profile:", profileError);
            else setProfile(profileData);

            // Fetch all lost/found reports from the 'items' table.
            const { data: itemsData, error: itemsError } = await supabase
                .from('items')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (itemsError) console.error("Error fetching items:", itemsError);
            else setItems(itemsData || []);
        }
        setIsLoading(false);
    };
    
    getInitialData();

    // This listener handles authentication changes (login/logout).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setProfile(null);
        setItems([]);
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/') {
            router.push('/login');
        }
      } else {
        // If a new user logs in, fetch their data.
        getInitialData();
        router.refresh();
      }
    });

    return () => {
        subscription.unsubscribe();
    };
  }, [supabase, router]);

  useEffect(() => {
    if (!session || !supabase) return;

    // This is the REAL-TIME connection. It listens for any updates to the user's profile.
    const profileChannel = supabase
      .channel('profile-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` }, (payload) => {
         console.log('Change received on profile!', payload);
         setProfile(payload.new as Profile);
      })
      .subscribe();
      
    // This listens for any new items being added, updated, or deleted in real-time.
    const itemsChannel = supabase
      .channel('items-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'items' }, (payload) => {
        console.log('Change received on items!', payload)
        // Refetch all items to keep the UI perfectly in sync with the database.
        supabase.from('items').select('*').order('created_at', { ascending: false }).then(({ data }) => {
            setItems(data || []);
        });
      })
      .subscribe()

    return () => {
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(itemsChannel);
    }
  }, [supabase, session]);


  const addItem = async (itemData: Omit<Item, 'id' | 'created_at' | 'is_recovered' | 'user_id' | 'locker_number' | 'postedAt'> & {date: Date}) => {
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


  const value = {
    supabase,
    session,
    profile,
    items,
    isLoading: isLoading || !supabase,
    addItem,
    markAsRecovered
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
