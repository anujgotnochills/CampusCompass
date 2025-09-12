
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import type { Item } from '@/lib/types';
import type { MatchLostAndFoundOutput } from '@/ai/flows/match-lost-and-found';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MatchResult extends MatchLostAndFoundOutput {
  lostItem: Item;
  foundItem: Item;
}

interface MatchCardProps {
  match: MatchResult;
}

function MiniItemCard({ item, type }: { item: Item; type: 'Lost' | 'Found' }) {
  return (
    <Card className="bg-muted/40 p-4 flex flex-col gap-2 h-full">
      <Badge variant={type === 'Lost' ? 'destructive' : 'secondary'} className="w-fit">{type} Item</Badge>
      <Image
        src={item.image_data_uri || "https://placehold.co/400x300.png"}
        alt={item.title}
        width={400}
        height={300}
        className="rounded-md object-cover aspect-video"
      />
      <h4 className="font-semibold truncate">{item.title}</h4>
      <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{item.description}</p>
      <Button asChild variant="outline" size="sm" className="mt-auto w-full">
        <Link href={`/items/${item.id}`}>
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  const confidencePercent = Math.round(match.matchConfidence * 100);

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card to-muted/20 border-border/50">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-6">
          <MiniItemCard item={match.lostItem} type="Lost" />
          
          <div className="flex flex-col items-center justify-center gap-4 md:gap-4 w-full md:w-48">
             <Separator className="md:hidden" />
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Match Confidence</p>
                <p className="text-2xl font-bold text-primary">{confidencePercent}%</p>
                <Progress value={confidencePercent} className="h-2 mt-1" />
            </div>
            <Separator className="md:hidden" />
          </div>

          <MiniItemCard item={match.foundItem} type="Found" />
        </div>
        <Separator className="my-4 md:my-6"/>
        <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full border border-primary/20">
                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0"/>
                </div>
                <div>
                    <h5 className="font-semibold">AI Analysis</h5>
                    <p className="text-sm text-muted-foreground">{match.reason}</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
