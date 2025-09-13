
"use client";

import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { Tag } from "lucide-react";
import type { Item } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { Badge } from "./ui/badge";

interface ItemRowProps {
    item: Item;
}

export function ItemRow({ item }: ItemRowProps) {
    const CategoryIcon = CATEGORIES.find(c => c.name === item.category)?.icon || Tag;

    return (
        <Link href={`/items/${item.id}`} className="block">
            <div className="flex items-center p-3 -mx-3 rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <div className="h-10 w-10 mr-4 rounded-lg bg-muted flex items-center justify-center">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-grow">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                        {item.is_recovered ? 'Recovered' : (item.type === 'lost' ? 'Lost' : 'Found')} on {format(parseISO(item.date), 'MMM d')}
                    </p>
                </div>
                <Badge variant={item.type === 'lost' ? 'destructive' : 'secondary'} className="ml-4 capitalize">
                    {item.type}
                </Badge>
            </div>
        </Link>
    )
}
