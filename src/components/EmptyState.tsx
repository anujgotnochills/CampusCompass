
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, children, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-muted/50", className)}>
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Icon className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
      {children}
    </div>
  );
}
