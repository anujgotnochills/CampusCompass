
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/AppContext";
import type { Profile } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface PreferencesDialogProps {
  profile: Profile | null;
  children: React.ReactNode;
}

export function PreferencesDialog({ profile, children }: PreferencesDialogProps) {
  const { updatePreferences } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [matchNotifications, setMatchNotifications] = useState(profile?.match_notifications_enabled ?? true);
  const [weeklySummary, setWeeklySummary] = useState(profile?.weekly_summary_enabled ?? false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && profile) {
      setMatchNotifications(profile.match_notifications_enabled);
      setWeeklySummary(profile.weekly_summary_enabled);
    }
  }

  const handleSaveChanges = async () => {
    setIsLoading(true);
    await updatePreferences({
        match_notifications_enabled: matchNotifications,
        weekly_summary_enabled: weeklySummary,
    });
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                    <Label htmlFor="match-notifications" className="text-base font-normal">
                        New Match Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Receive an email when a potential match is found.
                    </p>
                </div>
                <Switch
                    id="match-notifications"
                    checked={matchNotifications}
                    onCheckedChange={setMatchNotifications}
                    aria-label="Toggle new match notifications"
                />
            </div>
             <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label htmlFor="weekly-summary" className="text-base font-normal">
                        Weekly Summary
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Get a weekly summary of activities and new items.
                    </p>
                </div>
                <Switch
                    id="weekly-summary"
                    checked={weeklySummary}
                    onCheckedChange={setWeeklySummary}
                    aria-label="Toggle weekly summary notifications"
                />
            </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveChanges} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
