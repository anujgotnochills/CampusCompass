
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Profile } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface EditProfileDialogProps {
  profile: Profile | null;
}

export function EditProfileDialog({ profile }: EditProfileDialogProps) {
  const { toast } = useToast();
  const { supabase, session } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name || "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session) return;
    setIsLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({ name: values.name, updated_at: new Date().toISOString() })
      .eq('id', session.user.id)

    if (error) {
       toast({
        variant: 'destructive',
        title: "Error updating profile",
        description: error.message,
      });
    } else {
        toast({
        title: "Profile Updated",
        description: "Your information has been successfully saved.",
      });
      // The dialog will close automatically if we can find the DialogClose button
      document.getElementById('edit-profile-close')?.click();
    }
    setIsLoading(false);
  };

  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save changes
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
  );
}
