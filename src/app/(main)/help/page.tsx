
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HelpPage() {
  const router = useRouter();

  const faqs = [
    {
      question: "How do I report a lost item?",
      answer:
        "Navigate to the 'Report' page using the main navigation. Select 'Report Lost Item', fill in the details about your item including a description, category, last known location, and optionally upload a photo. The more detail you provide, the better our AI can find a match.",
    },
    {
      question: "What happens after I report a found item?",
      answer:
        "When you report a found item, you'll be assigned a locker number. Please drop the item off at the designated campus security office, and they will place it in the locker. This keeps the item secure until the owner can claim it.",
    },
    {
      question: "How does the matching system work?",
      answer:
        "Our system uses AI to compare the descriptions and images of lost and found items. On the 'Matches' page, you can run the AI process, which will analyze all active items and show you potential matches with a confidence score. You can then review these matches to see if one is yours.",
    },
    {
      question: "What are reward points?",
      answer:
        "You earn reward points every time you report a found item that is successfully returned to its owner. It's our way of saying thank you for helping the campus community! These points are displayed on your profile.",
    },
    {
        question: "How do I mark my item as recovered?",
        answer: "When viewing your reported item on the item detail page, there will be a 'Mark as Recovered' button. Clicking this will update the item's status. If you are recovering a lost item that was found, the page will show you the locker number where you can pick it up."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      <div className="text-center">
        <h1 className="text-4xl font-bold">Help Center</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to your questions or get in touch with our support team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
           <CardDescription>Here are some of the most common questions we get.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
           <CardDescription>Can't find the answer you're looking for? We're here to help.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50">
                <Mail className="h-8 w-8 text-primary mt-1"/>
                <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-sm text-muted-foreground mb-2">Get help with any issue, big or small.</p>
                    <a href="mailto:support@campuscompass.app" className="text-sm text-primary font-medium hover:underline">support@campuscompass.app</a>
                </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50">
                <MessageCircle className="h-8 w-8 text-primary mt-1"/>
                <div>
                    <h3 className="font-semibold">Feedback Forum</h3>
                    <p className="text-sm text-muted-foreground mb-2">Have a suggestion? Let us know!</p>
                    <a href="#" className="text-sm text-primary font-medium hover:underline">Go to forum</a>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
