
"use client";

import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { Tag, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import type { Item } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";

interface ItemRowProps {
    item: Item;
}

export function ItemRow({ item }: ItemRowProps) {
    const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;

    return (
         <div className="grid grid-cols-5 items-center px-6 py-3 hover:bg-accent transition-colors -mx-6">
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
