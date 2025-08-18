
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
import { useAppContext } from "@/contexts/AppContext"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters."}),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function SignupPage() {
    const { signup } = useAppContext();
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const success = signup(values.email, values.password);
        if (success) {
            toast({
                title: "Account Created!",
                description: "You have been successfully signed up. Please log in.",
            });
            router.push('/login');
        } else {
            toast({
                variant: 'destructive',
                title: 'Sign Up Failed',
                description: 'An account with this email already exists.',
            });
        }
    }

  return (
    <>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
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
            <Button type="submit" className="w-full">Create account</Button>
            </form>
        </Form>
        </CardContent>
        <CardFooter className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline ml-1">
            Sign in
        </Link>
      </CardFooter>
    </>
  )
}
