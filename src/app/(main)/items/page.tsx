
"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/contexts/AppContext";
import type { Category, Item } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { ItemCard } from "@/components/ItemCard";
import { EmptyState } from "@/components/EmptyState";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function ItemsPage() {
  const { items } = useAppContext();
  const [typeFilter, setTypeFilter] = useState<"all" | "lost" | "found">("all");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => (typeFilter === "all" ? true : item.type === typeFilter))
      .filter((item) => (categoryFilter === "all" ? true : item.category === categoryFilter))
  }, [items, typeFilter, categoryFilter]);

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">All Reported Items</h1>
          <p className="text-muted-foreground">Browse and filter through all lost and found items</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <Select
            onValueChange={(value) => setCategoryFilter(value as Category | "all")}
            defaultValue="all"
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(({ name, icon: Icon }) => (
                <SelectItem key={name} value={name}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs
            defaultValue="all"
            onValueChange={(value) => setTypeFilter(value as "all" | "lost" | "found")}
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-3 min-w-[200px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {filteredItems.length > 0 ? (
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-16">
            <EmptyState
                icon={Search}
                title="No Items Found"
                description="No items match your current filters. Try a different combination or report an item."
            >
                <div className="flex gap-4">
                    <Link href="/report?type=lost">
                        <Button variant="outline">Report Lost Item</Button>
                    </Link>
                    <Link href="/report?type=found">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Report Found Item
                        </Button>
                    </Link>
                </div>
            </EmptyState>
        </div>
      )}
    </div>
  );
}
