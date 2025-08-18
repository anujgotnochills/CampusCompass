
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
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

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
    <>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </Link>
                    </div>
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
            <Button type="submit" className="w-full">Login</Button>
            <Button variant="outline" className="w-full">Login with Google</Button>
            </form>
        </Form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline ml-1">
            Sign up
        </Link>
      </CardFooter>
    </>
  )
}
