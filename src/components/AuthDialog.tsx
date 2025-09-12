
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useState } from "react";

interface AuthDialogProps {
    children: React.ReactNode;
    initialView?: 'login' | 'signup';
}

export function AuthDialog({ children, initialView = 'login' }: AuthDialogProps) {
    const [view, setView] = useState<'login' | 'signup'>(initialView);
    const [isOpen, setIsOpen] = useState(false);

    const toggleView = () => {
        setView(prev => prev === 'login' ? 'signup' : 'login');
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div onClick={() => setIsOpen(true)}>
                 {children}
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">{view === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
                    <DialogDescription>
                        {view === 'login' 
                            ? "Enter your email below to login to your account" 
                            : "Create an account to start finding and reporting items."}
                    </DialogDescription>
                </DialogHeader>
                {view === 'login' ? (
                    <LoginForm onSwitch={toggleView} onLoginSuccess={() => setIsOpen(false)} />
                ) : (
                    <SignupForm onSwitch={toggleView} onSignupSuccess={() => setIsOpen(false)} />
                )}
            </DialogContent>
        </Dialog>
    )
}
