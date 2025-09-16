
import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Tag, Calendar, CheckCircle, ArrowRight, MoreVertical, Trash2 } from 'lucide-react';

import type { Item } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';
import placeholderImages from '@/lib/placeholder-images.json';
import { useAppContext } from '@/contexts/AppContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const { profile, deleteItem } = useAppContext();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;
  const placeholderImage = placeholderImages.item;
  
  const isOwner = profile?.id === item.user_id;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteItem(item.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div className="group relative">
        <Link href={`/items/${item.id}`}>
          <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 bg-card">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={item.image_data_uri || placeholderImage.src}
                  alt={item.title}
                  data-ai-hint="lost item"
                  width={placeholderImage.width}
                  height={placeholderImage.height}
                  className="object-cover aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <Badge 
                  variant={item.type === 'lost' ? 'destructive' : 'secondary'}
                  className="absolute top-3 left-3"
                >
                  {item.type === 'lost' ? 'Lost' : 'Found'}
                </Badge>
                 <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm p-2 rounded-full">
                    <ArrowRight className="h-5 w-5 text-foreground" />
                 </div>
                {item.is_recovered && (
                    <Badge className="absolute top-3 right-3 flex items-center gap-1 bg-green-600 text-white border-green-700">
                        <CheckCircle className="h-3 w-3"/>
                        Recovered
                    </Badge>
                )}
                {isOwner && (
                  <div className="absolute top-3 right-3" onClick={handleDropdownClick}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/items/${item.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Mark as Recovered</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowDeleteDialog(true);
                          }}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Item
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <CategoryIcon className="h-4 w-4 mr-2" />
                <span>{item.category}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight truncate group-hover:text-primary transition-colors">{item.title}</h3>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1.5" />
                <span>{format(parseISO(item.date), 'MMM d, yyyy')}</span>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{item.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
