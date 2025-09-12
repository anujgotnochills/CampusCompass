"use client";

import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            {children}
            <Toaster />
        </AppProvider>
    );
}
