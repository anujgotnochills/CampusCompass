
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useState, useEffect } from "react";

export type AuthDialogView = 'login' | 'signup';

interface AuthDialogProps {
    children: React.ReactNode;
    initialView?: AuthDialogView;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onViewChange?: (view: AuthDialogView) => void;
}

export function AuthDialog({ children, initialView = 'login', open, onOpenChange, onViewChange }: AuthDialogProps) {
    const [internalView, setInternalView] = useState<AuthDialogView>(initialView);
    const [isInternalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined && onOpenChange !== undefined;
    const isOpen = isControlled ? open : isInternalOpen;
    const setIsOpen = isControlled ? onOpenChange : setInternalOpen;
    
    const view = onViewChange ? initialView : internalView;
    const setView = onViewChange || setInternalView;

    useEffect(() => {
        if(initialView) {
            setView(initialView);
        }
    }, [initialView, setView])

    const toggleView = () => {
        setView(prev => prev === 'login' ? 'signup' : 'login');
    }

    const handleSuccess = () => {
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
             {!isControlled && (
                <div onClick={() => setIsOpen(true)}>
                    {children}
                </div>
            )}
            {isControlled && children}

            <DialogContent className="border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {view === 'login' ? 'Login' : 'Sign Up'}
                    </DialogTitle>
                    <DialogDescription>
                        {view === 'login' 
                            ? "Enter your email below to login to your account" 
                            : "Create an account to start finding and reporting items."}
                    </DialogDescription>
                </DialogHeader>
                {view === 'login' ? (
                    <LoginForm onSwitch={toggleView} onLoginSuccess={handleSuccess} />
                ) : (
                    <SignupForm onSwitch={toggleView} onSignupSuccess={handleSuccess} />
                )}
            </DialogContent>
        </Dialog>
    )
}
