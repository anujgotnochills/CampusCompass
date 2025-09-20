
"use client";

import { useState, useMemo, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { findMatchingItems } from '@/ai/flows/find-matching-items';
import type { Item } from '@/lib/types';
import { MatchCard } from '@/components/MatchCard';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
import { HeartHandshake, Search, Bot, Loader2, Bell, Settings, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from '@/components/UserNav';
import { PlusCircle } from 'lucide-react';

interface MatchResult {
  lostItem: Item;
  foundItem: Item;
  matchConfidence: number;
  reason: string;
}

const MATCH_CONFIDENCE_THRESHOLD = 0.5;

export default function MatchesPage() {
  const { items, profile } = useAppContext();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const { myLostItems, foundItems, allItemsById } = useMemo(() => {
    const activeItems = items.filter(item => !item.is_recovered);
    const allItemsByIdMap = new Map(items.map(item => [item.id, item]));
    return {
      myLostItems: activeItems.filter(item => item.type === 'lost' && item.user_id === profile?.id),
      foundItems: activeItems.filter(item => item.type === 'found'),
      allItemsById: allItemsByIdMap,
    };
  }, [items, profile]);
  
  const findMatches = useCallback(async () => {
    setIsSearching(true);
    setHasSearched(true);
    setError(null);
    setMatches([]);
    
    if (myLostItems.length === 0 || foundItems.length === 0) {
      setIsSearching(false);
      return;
    }

    try {
      const matchPromises = myLostItems.map(lostItem =>
        findMatchingItems({
          lostItem: {
            id: lostItem.id,
            description: lostItem.description,
            image_data_uri: lostItem.image_data_uri,
          },
          foundItems: foundItems.map(f => ({
            id: f.id,
            description: f.description,
            image_data_uri: f.image_data_uri,
          })),
        })
      );

      const results = await Promise.all(matchPromises);
      
      const allFoundMatches = results.flatMap((result, index) => {
        const lostItem = myLostItems[index];
        return result.matches.map(match => {
          const foundItem = allItemsById.get(match.foundItemId);
          if (!foundItem) return null;
          return {
            lostItem,
            foundItem,
            matchConfidence: match.matchConfidence,
            reason: match.reason,
          };
        }).filter((m): m is MatchResult => m !== null);
      });

      const highConfidenceMatches = allFoundMatches
        .filter(result => result.matchConfidence >= MATCH_CONFIDENCE_THRESHOLD)
        .sort((a, b) => b.matchConfidence - a.matchConfidence);
      
      setMatches(highConfidenceMatches);
    } catch (e) {
      console.error("Failed to find matches:", e);
      setError("Could not load matches due to an error. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  }, [myLostItems, foundItems, allItemsById]);


  const renderContent = () => {
    if (isSearching) {
      return (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                <Skeleton className="h-40 w-full" />
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-20 w-full md:w-48" />
                </div>
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
       return (
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
       )
    }

    if (!hasSearched) {
      return (
        <EmptyState
          icon={Bot}
          title="Ready to Find Your Items?"
          description="Click the button to let our AI search for potential matches for your lost items."
        >
          <Button onClick={findMatches} size="lg" disabled={isSearching || myLostItems.length === 0}>
            {isSearching ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
            Find My Matches
          </Button>
        </EmptyState>
      );
    }

    if (myLostItems.length === 0) {
        return (
            <EmptyState 
                icon={Search} 
                title="No Lost Items to Match" 
                description="You haven't reported any lost items yet. Report a lost item to see potential matches."
            >
                <Link href="/report?type=lost">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Report a Lost Item
                    </Button>
                </Link>
            </EmptyState>
        );
    }
    
    if (foundItems.length === 0) {
      return <EmptyState icon={Search} title="No Found Items to Match" description="There are currently no found items in the system to match against your lost items." />;
    }

    if (matches.length === 0) {
      return (
        <EmptyState 
            icon={HeartHandshake} 
            title="No Matches Found" 
            description="We didn't find any high-confidence matches for your items. We'll keep checking as new items are reported."
        >
             <Button onClick={findMatches} variant="outline" disabled={isSearching}>
                {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Search Again
            </Button>
        </EmptyState>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-end">
             <Button onClick={findMatches} variant="outline" disabled={isSearching}>
                {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Refresh Matches
            </Button>
        </div>
        {matches.map((match, index) => (
          <MatchCard key={`${match.lostItem.id}-${match.foundItem.id}-${index}`} match={match} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 md:gap-4 border-b bg-background/80 px-4 md:px-6 backdrop-blur-lg">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Matches</h1>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-4">
          <form className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search items..."
                className="pl-8 w-full bg-background"
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <Link href="/report?type=lost">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Report Lost
              </Button>
            </Link>
            <Link href="/report?type=found">
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Report Found
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <UserNav />
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
          <UserNav />
        </div>
      </div>

      {/* Mobile Search Bar (when expanded) */}
      <div className="md:hidden px-4 py-2 border-b bg-background/80 backdrop-blur-lg">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              className="pl-8 w-full bg-background"
            />
          </div>
        </form>
      </div>

      {/* Mobile Action Buttons */}
      <div className="md:hidden px-4 py-3 border-b bg-background/80 backdrop-blur-lg">
        <div className="flex gap-2">
          <Link href="/report?type=lost" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Report Lost
            </Button>
          </Link>
          <Link href="/report?type=found" className="flex-1">
            <Button size="sm" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" />
              Report Found
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <p className="text-muted-foreground">AI-powered matching for your lost items</p>
          </div>
        </div>
        <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>Your Personal AI Matchmaker</AlertTitle>
              <AlertDescription>
                  This page is just for you. We only search for matches for items that you have personally reported as lost.
              </AlertDescription>
          </Alert>
        {renderContent()}
      </div>
    </div>
  );
}
