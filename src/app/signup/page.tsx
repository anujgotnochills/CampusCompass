
"use client";

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card';
import { Compass } from 'lucide-react';
import { SignupForm } from '@/components/SignupForm';

export default function SignupPage() {
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background/10 backdrop-blur-sm p-4">
       <div className="absolute top-8 left-8 flex items-center gap-2 font-bold text-lg text-primary">
            <Link href="/" className="flex items-center gap-2">
                <Compass className="h-6 w-6" />
                <span className="font-outfit font-bold text-2xl text-white">Campus Compass</span>
            </Link>
        </div>
      <Card className="w-full max-w-md p-6">
        <CardContent className="p-0">
           <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}

