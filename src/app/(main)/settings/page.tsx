"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/contexts/AppContext";
import { Search, Bell, Settings, FileText, PlusCircle, User, Shield, Palette, Globe } from "lucide-react";
import { UserNav } from "@/components/UserNav";
import Link from "next/link";

export default function SettingsPage() {
  const { profile, updateProfile, updatePreferences } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    matchNotifications: profile?.match_notifications_enabled ?? true,
    weeklySummary: profile?.weekly_summary_enabled ?? true,
  });

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await updateProfile({ name: formData.name });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      await updatePreferences({
        match_notifications_enabled: formData.matchNotifications,
        weekly_summary_enabled: formData.weeklySummary,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-6 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <div className="flex items-center gap-4">
          <form className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search items..."
                className="pl-8 w-full bg-background"
              />
            </div>
          </form>
          <div className="flex items-center gap-2">
            <Link href="/report?type=lost">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Report Lost
              </Button>
            </Link>
            <Link href="/report?type=found">
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Report Found
              </Button>
            </Link>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <UserNav />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-8 max-w-4xl mx-auto w-full">
        <div className="space-y-2">
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and display preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your display name"
              />
            </div>
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={profile?.id || ""} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Your unique user identifier cannot be changed.</p>
            </div>
            <Button onClick={handleSaveProfile} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how and when you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Match Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when potential matches are found for your lost items.
                </p>
              </div>
              <Switch
                checked={formData.matchNotifications}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, matchNotifications: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of campus lost and found activity.
                </p>
              </div>
              <Switch
                checked={formData.weeklySummary}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, weeklySummary: checked })
                }
              />
            </div>
            <Button onClick={handleSavePreferences} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your privacy settings and account security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Your reported items are visible to all campus users to help with matching. Personal information like your name and contact details are only shared when you choose to connect with someone about a match.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Account Security</Label>
              <p className="text-sm text-muted-foreground">
                Your account is secured through your institution's authentication system. Contact your IT department for password or account issues.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              App Preferences
            </CardTitle>
            <CardDescription>
              Customize your app experience and interface.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                The app automatically adapts to your system's light or dark mode preference.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <p className="text-sm text-muted-foreground">
                Currently available in English. More languages coming soon.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              About Campus Compass
            </CardTitle>
            <CardDescription>
              Information about the application and support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Version</Label>
              <p className="text-sm text-muted-foreground">Campus Compass v1.0.0</p>
            </div>
            <div className="space-y-2">
              <Label>Support</Label>
              <p className="text-sm text-muted-foreground">
                Need help? Contact your campus IT support or visit our help center.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Privacy Policy</Label>
              <p className="text-sm text-muted-foreground">
                Learn how we protect your data and privacy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
