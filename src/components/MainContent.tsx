
"use client";

import { usePathname } from "next/navigation";
import { useAppContext } from "@/contexts/AppContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAppContext();
  
  if (isLoading) {
    return (
        <div className="flex flex-1 items-center justify-center min-h-[calc(100vh-4rem)]">
            <LoadingSpinner />
        </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 pb-20 md:pb-6">
       {children}
    </main>
  );
}
