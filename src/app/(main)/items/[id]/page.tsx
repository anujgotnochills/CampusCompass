
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from 'date-fns';
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Tag,
  CheckCircle,
  XCircle,
  Lock,
  Search
} from "lucide-react";

import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import type { Item } from "@/lib/types";


export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { items, markAsRecovered, isInitialLoading, profile } = useAppContext();
  
  const id = typeof params.id === 'string' ? params.id : '';
  const [item, setItem] = useState<Item | undefined | null>(undefined);

  useEffect(() => {
    if (!isInitialLoading) {
      const foundItem = items.find((i) => i.id === id);
      setItem(foundItem || null);
    }
  }, [id, items, isInitialLoading]);

  if (isInitialLoading || item === undefined) {
    return (
        <div className="max-w-4xl mx-auto space-y-4">
             <Skeleton className="h-10 w-32" />
             <Card>
                <CardContent className="p-0 md:p-6">
                    <div className="grid md:grid-cols-2 gap-0 md:gap-6">
                        <div className="p-0 md:p-6">
                             <Skeleton className="rounded-t-lg md:rounded-lg aspect-video md:aspect-square w-full" />
                        </div>
                         <div className="p-6 flex flex-col justify-center space-y-4">
                              <Skeleton className="h-8 w-3/4" />
                              <Skeleton className="h-20 w-full" />
                              <Skeleton className="h-6 w-1/2" />
                              <Skeleton className="h-6 w-1/2" />
                              <Skeleton className="h-6 w-1/2" />
                              <Skeleton className="h-12 w-full mt-4" />
                         </div>
                    </div>
                </CardContent>
             </Card>
        </div>
    )
  }

  if (item === null) {
    return <EmptyState icon={Search} title="Item not found" description="The item you are looking for does not exist or has been removed." />;
  }

  const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;
  const isOwner = profile?.id === item.user_id;

  const handleRecovery = async () => {
    if (!item) return;
    await markAsRecovered(item);
    
    // Optimistically update local state
    setItem({ ...item, is_recovered: true });
    
    let toastDescription = `The item "${item.title}" has been marked as recovered.`;
    if (item.type === 'lost' && item.locker_number) {
        toastDescription += ` You can pick it up from Locker #${item.locker_number}.`;
    }

    toast({
      title: "Item Recovered!",
      description: toastDescription,
    });

    if (item.type === 'found') {
        toast({
            title: "Points Awarded!",
            description: "You've earned 10 reward points for helping out!",
            variant: "default",
        })
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 -ml-4 hidden md:inline-flex">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
        <Card>
            <CardContent className="p-0 md:p-6">
            <div className="grid md:grid-cols-2 gap-0 md:gap-6">
                <div className="md:p-6">
                <Image
                    src={item.image_data_uri || "https://placehold.co/600x400.png"}
                    alt={item.title}
                    data-ai-hint="lost item"
                    width={600}
                    height={400}
                    className="rounded-t-lg md:rounded-lg object-cover aspect-video md:aspect-square w-full"
                />
                </div>
                <div className="p-6 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <Badge variant={item.type === 'lost' ? 'destructive' : 'secondary'} className="mb-2">{item.type === 'lost' ? 'Lost Item' : 'Found Item'}</Badge>
                            <h1 className="text-2xl md:text-3xl font-bold">{item.title}</h1>
                        </div>
                        <Badge variant={item.is_recovered ? 'default' : 'outline'} className="capitalize flex items-center gap-1">
                            {item.is_recovered ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {item.is_recovered ? 'Recovered' : 'Not Recovered'}
                        </Badge>
                    </div>

                    <p className="text-muted-foreground mb-6">{item.description}</p>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Category:</span>
                        <span>{item.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Location:</span>
                        <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                        <CalendarDays className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.type === 'lost' ? 'Date Lost:' : 'Date Found:'}</span>
                        <span>{format(parseISO(item.date), 'MMMM d, yyyy')}</span>
                        </div>
                         {item.type === 'found' && item.locker_number && (
                           <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                                <Lock className="h-5 w-5 text-secondary-foreground" />
                                <span className="font-medium">Stored in:</span>
                                <span className="font-bold text-lg">Locker #{item.locker_number}</span>
                           </div>
                        )}
                    </div>

                    {!item.is_recovered && isOwner && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="lg" className="mt-8 w-full">Mark as Recovered</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action will mark the item as recovered. 
                                {item.type === 'found' && " You will be awarded 10 points."}
                                {item.type === 'lost' && item.locker_number && ` The item is in Locker #${item.locker_number}.`}
                                This cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleRecovery}>Confirm Recovery</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    )}
                </div>
            </div>
            </CardContent>
        </Card>
    </div>
  );
}
