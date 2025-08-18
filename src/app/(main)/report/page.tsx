
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ReportItemForm } from '@/components/ReportItemForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function ReportPageContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') === 'found' ? 'found' : 'lost';

  return (
    <div className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    {type === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}
                </CardTitle>
                <CardDescription>
                    {type === 'lost'
                    ? "Provide as much detail as possible to help others identify your item."
                    : "Thank you for helping our community! Please describe the item you found."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ReportItemForm type={type} />
            </CardContent>
        </Card>
    </div>
  );
}

export default function ReportPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportPageContent />
        </Suspense>
    )
}
