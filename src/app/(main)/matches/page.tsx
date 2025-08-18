
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { matchLostAndFound } from '@/ai/flows/match-lost-and-found';
import type { Item } from '@/lib/types';
import type { MatchLostAndFoundOutput } from '@/ai/flows/match-lost-and-found';
import { MatchCard } from '@/components/MatchCard';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
import { HeartHandshake } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

interface MatchResult extends MatchLostAndFoundOutput {
  lostItem: Item;
  foundItem: Item;
}

const MATCH_CONFIDENCE_THRESHOLD = 0.5;

export default function MatchesPage() {
  const { items } = useAppContext();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { lostItems, foundItems } = useMemo(() => {
    const activeItems = items.filter(item => !item.isRecovered);
    return {
      lostItems: activeItems.filter(item => item.type === 'lost'),
      foundItems: activeItems.filter(item => item.type === 'found'),
    };
  }, [items]);

  useEffect(() => {
    const findMatches = async () => {
      if (lostItems.length === 0 || foundItems.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const matchPromises = lostItems.flatMap(lostItem =>
          foundItems.map(foundItem =>
            matchLostAndFound({
              lostItemDescription: lostItem.description,
              foundItemDescription: foundItem.description,
            }).then(result => ({ ...result, lostItem, foundItem }))
          )
        );

        const results = await Promise.all(matchPromises);
        const highConfidenceMatches = results
          .filter(result => result.matchConfidence >= MATCH_CONFIDENCE_THRESHOLD)
          .sort((a, b) => b.matchConfidence - a.matchConfidence);
        
        setMatches(highConfidenceMatches);
      } catch (e) {
        console.error("Failed to find matches:", e);
        setError("Could not load matches due to an error. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    findMatches();
  }, [lostItems, foundItems]);

  const renderContent = () => {
    if (isLoading) {
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

    if (lostItems.length === 0) {
      return <EmptyState title="No Lost Items to Match" description="You haven't reported any lost items yet. Report a lost item to see potential matches." />;
    }
    
    if (foundItems.length === 0) {
      return <EmptyState title="No Found Items to Match" description="There are currently no found items in the system to match against your lost items." />;
    }

    if (matches.length === 0) {
      return <EmptyState icon={HeartHandshake} title="No Matches Found" description="We didn't find any high-confidence matches for your items right now. We'll keep checking as new items are reported." />;
    }

    return (
      <div className="space-y-6">
        {matches.map((match, index) => (
          <MatchCard key={`${match.lostItem.id}-${match.foundItem.id}-${index}`} match={match} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Potential Matches</h1>
      </div>
      {renderContent()}
    </div>
  );
}
