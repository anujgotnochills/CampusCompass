
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PreferencesDialogProps {
  children: React.ReactNode;
}

export function PreferencesDialog({ children }: PreferencesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
        title: "Preferences Saved",
        description: "Your notification settings have been updated.",
    });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Manage your notification settings here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="match-notifications" className="text-base">
                        New Match Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Receive an email when a potential match is found.
                    </p>
                </div>
                <Switch
                    id="match-notifications"
                    aria-label="Toggle new match notifications"
                />
            </div>
             <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="weekly-summary" className="text-base">
                        Weekly Summary
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Get a weekly summary of activities and new items.
                    </p>
                </div>
                <Switch
                    id="weekly-summary"
                    aria-label="Toggle weekly summary notifications"
                />
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
