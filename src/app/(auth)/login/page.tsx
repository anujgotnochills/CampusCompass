
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useAppContext } from "@/contexts/AppContext"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export default function LoginPage() {
    const { login } = useAppContext();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const success = login(values.email, values.password);
        if (!success) {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: 'Invalid email or password. Please try again.',
            })
            form.setValue('password', '');
        }
    }

  return (
    <div className="space-y-6 rounded-lg bg-card p-6 shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Please Sign In</h1>
        <p className="text-muted-foreground">Enter your account details for a personalized experience.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="marion.angela@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="********" 
                      {...field}
                      className="pr-10"
                    />
                  </FormControl>
                  <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute inset-y-0 right-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full !mt-6" size="lg">Sign In</Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or Sign in with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.78 18.69,8.42L21.23,6.58C19.32,4.75 16.07,3.5 12.19,3.5C6.54,3.5 2,8.19 2,12.5C2,16.81 6.54,21.5 12.19,21.5C18.36,21.5 22,17.25 22,11.54C22,11.33 21.69,11.1 21.35,11.1V11.1Z"></path></svg>
            Google
        </Button>
        <Button variant="outline">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2.24C10.15,2.24 8.24,3.53 7.63,5.43C5.7,5.13 4.14,6.74 4.14,8.69C4.14,10.25 5.09,11.23 6.05,11.66C6.05,11.72 6.05,11.79 6.05,11.85C6.05,14.63 8.16,16.1 10.33,16.1C11.1,16.1 11.87,15.82 12.5,15.42C13.13,15.82 13.9,16.1 14.67,16.1C16.84,16.1 18.95,14.63 18.95,11.85C18.95,11.79 18.95,11.72 18.95,11.66C19.91,11.23 20.86,10.25 20.86,8.69C20.86,6.74 19.3,5.13 17.37,5.43C16.76,3.53 14.85,2.24 13,2.24C12.67,2.24 12.34,2.27 12,2.34C11.66,2.27 11.33,2.24 11,2.24M12,2.24L12,2.24Z"></path></svg>
            Apple
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
          </Link>
      </div>
    </div>
  )
}
