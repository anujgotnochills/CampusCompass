
"use client";

import { Compass } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="animate-spin">
      <Compass className="h-12 w-12 text-primary" />
    </div>
    <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
  </div>
);
