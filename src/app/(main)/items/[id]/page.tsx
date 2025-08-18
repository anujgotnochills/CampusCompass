
"use client";

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
  Award,
  Lock
} from "lucide-react";

import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";


export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { items, markAsRecovered, isLoading } = useAppContext();

  const id = typeof params.id === 'string' ? params.id : '';
  const item = items.find((i) => i.id === id);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!item) {
    return <EmptyState title="Item not found" description="The item you are looking for does not exist or has been removed." />;
  }

  const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;

  const handleRecovery = () => {
    markAsRecovered(item);
    
    let toastDescription = `The item "${item.title}" has been marked as recovered.`;
    if (item.type === 'lost' && item.lockerNumber) {
        toastDescription += ` You can pick it up from Locker #${item.lockerNumber}.`;
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
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to items
        </Button>
        <Card>
            <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6">
                <Image
                    src={item.imageUrl || "https://placehold.co/600x400.png"}
                    alt={item.title}
                    data-ai-hint="lost item"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover aspect-square w-full"
                />
                </div>
                <div className="p-6 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <Badge variant={item.type === 'lost' ? 'destructive' : 'secondary'} className="mb-2">{item.type === 'lost' ? 'Lost Item' : 'Found Item'}</Badge>
                            <h1 className="text-3xl font-bold">{item.title}</h1>
                        </div>
                        <Badge variant={item.isRecovered ? 'default' : 'outline'} className="capitalize flex items-center gap-1">
                            {item.isRecovered ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {item.isRecovered ? 'Recovered' : 'Not Recovered'}
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
                         {item.type === 'found' && item.lockerNumber && (
                           <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                                <Lock className="h-5 w-5 text-secondary-foreground" />
                                <span className="font-medium">Stored in:</span>
                                <span className="font-bold text-lg">Locker #{item.lockerNumber}</span>
                           </div>
                        )}
                    </div>

                    {!item.isRecovered && (
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
                                {item.type === 'lost' && item.lockerNumber && ` The item is in Locker #${item.lockerNumber}.`}
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
