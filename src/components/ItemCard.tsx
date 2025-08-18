
import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Tag, Calendar, CheckCircle } from 'lucide-react';

import type { Item } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES } from '@/lib/constants';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;

  return (
    <Link href={`/items/${item.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative">
            <Image
              src={item.imageDataUri || "https://placehold.co/400x300.png"}
              alt={item.title}
              data-ai-hint="lost item"
              width={400}
              height={300}
              className="object-cover aspect-[4/3] w-full"
            />
            <Badge 
              variant={item.type === 'lost' ? 'destructive' : 'secondary'}
              className="absolute top-2 left-2"
            >
              {item.type === 'lost' ? 'Lost' : 'Found'}
            </Badge>
            {item.isRecovered && (
                <Badge className="absolute top-2 right-2 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3"/>
                    Recovered
                </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <h3 className="font-bold text-lg leading-tight truncate group-hover:text-primary">{item.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <CategoryIcon className="h-4 w-4 mr-2" />
            <span>{item.category}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span>{format(parseISO(item.date), 'MMM d, yyyy')}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
