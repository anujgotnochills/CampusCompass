
"use client";

import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { Tag, CheckCircle, XCircle, MoreVertical, Trash2 } from "lucide-react";
import type { Item } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ItemRowProps {
    item: Item;
}

export function ItemRow({ item }: ItemRowProps) {
    const { profile, deleteItem } = useAppContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;
    
    const isOwner = profile?.id === item.user_id;

    const handleDelete = async () => {
        try {
            await deleteItem(item.id);
            setShowDeleteDialog(false);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    return (
        <>
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-5 items-center px-6 py-3 hover:bg-accent transition-colors -mx-6">
                <div className="col-span-2 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="font-medium truncate">
                        <Link href={`/items/${item.id}`} className="hover:underline">{item.title}</Link>
                    </div>
                </div>
                <div>
                     <Badge variant={item.is_recovered ? 'default' : 'outline'} className="capitalize flex items-center gap-1 w-fit bg-opacity-50">
                        {item.is_recovered ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {item.is_recovered ? 'Recovered' : 'Open'}
                    </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                    {format(parseISO(item.date), 'MMM d, yyyy')}
                </div>
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                               <Link href={`/items/${item.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Mark as Recovered</DropdownMenuItem>
                            {isOwner && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={() => setShowDeleteDialog(true)}
                                        className="text-destructive focus:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Item
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden px-4 py-3 hover:bg-accent transition-colors -mx-4">
                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <Link href={`/items/${item.id}`} className="font-medium hover:underline block truncate">
                                    {item.title}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant={item.is_recovered ? 'default' : 'outline'} className="capitalize flex items-center gap-1 w-fit bg-opacity-50 text-xs">
                                        {item.is_recovered ? <CheckCircle className="h-2.5 w-2.5" /> : <XCircle className="h-2.5 w-2.5" />}
                                        {item.is_recovered ? 'Recovered' : 'Open'}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {format(parseISO(item.date), 'MMM d')}
                                    </span>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                       <Link href={`/items/${item.id}`}>View Details</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Recovered</DropdownMenuItem>
                                    {isOwner && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                                onClick={() => setShowDeleteDialog(true)}
                                                className="text-destructive focus:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete Item
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
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
    )
}
