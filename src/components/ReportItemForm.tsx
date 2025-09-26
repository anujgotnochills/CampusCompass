
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, Sparkles, Upload, X, Camera, CameraIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Category } from '@/lib/types';
import { generateItemTitle } from '@/ai/flows/generate-item-title';
import { describeImage } from '@/ai/flows/describe-image';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const formSchema = z.object({
  type: z.enum(['lost', 'found']),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  category: z.string().nonempty('Please select a category.'),
  location: z.string().min(3, 'Location must be at least 3 characters.'),
  date: z.date({ required_error: 'A date is required.' }),
  image_data_uri: z.string().optional(),
});

type ReportFormValues = z.infer<typeof formSchema>;

interface ReportItemFormProps {
  type: 'lost' | 'found';
}

export function ReportItemForm({ type }: ReportItemFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { addItem } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: type,
      title: '',
      description: '',
      category: '',
      location: '',
    },
  });

  const imageDataUri = form.watch('image_data_uri');

  const stopCamera = () => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    setIsCameraOpen(false);
  };
  
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  const handleGenerateTitle = async () => {
    const description = form.getValues('description');
    if (!description || description.length < 10) {
      toast({
        variant: 'destructive',
        title: 'Description too short',
        description: 'Please enter a description of at least 10 characters to generate a title.',
      });
      return;
    }
    setIsGeneratingTitle(true);
    try {
      const result = await generateItemTitle({ description });
      form.setValue('title', result.title, { shouldValidate: true });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Title',
        description: 'Could not generate a title. Please enter one manually.',
      });
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const processImageAndGenerateDescription = async (dataUri: string) => {
    form.setValue('image_data_uri', dataUri);
    setIsGeneratingDescription(true);
    try {
        const result = await describeImage({ photoDataUri: dataUri });
        form.setValue('description', result.description, { shouldValidate: true });
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Error Analyzing Image',
            description: 'Could not generate a description. Please enter one manually.',
        });
    } finally {
        setIsGeneratingDescription(false);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        await processImageAndGenerateDescription(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCamera = async () => {
    if (isCameraOpen) {
        stopCamera();
        return;
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        setIsCameraOpen(true);
        streamRef.current = stream;
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
        });
    }
  };
  
  const handleTakePicture = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        await processImageAndGenerateDescription(dataUri);
      }
      stopCamera();
    }
  };


  async function onSubmit(values: ReportFormValues) {
    setIsSubmitting(true);
    
    // Non-blocking navigation
    router.push('/dashboard');
    
    try {
      const newItem = await addItem({
        ...values,
        category: values.category as Category,
      });

      if (newItem) {
         if (newItem.type === 'found') {
            toast({
                title: 'Item Reported!',
                description: `Please drop the item off at Locker #${newItem.locker_number}. Thank you!`,
                duration: 10000,
            });
          } else {
            toast({
                title: 'Item Reported!',
                description: 'Your item has been successfully listed.',
            });
          }
      } else {
        throw new Error("Item creation failed.");
      }
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem submitting your report.',
      });
      // Since we navigated away, we can't easily revert. The user is on the dashboard.
    } finally {
      // This state is local to a component that is now unmounted.
      // But if we didn't navigate away, we would do:
      // setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
            control={form.control}
            name="image_data_uri"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                    <div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {imageDataUri ? (
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                            <Image src={imageDataUri} alt="Uploaded item" fill objectFit="cover" />
                            <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8"
                                onClick={() => form.setValue('image_data_uri', undefined)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                             {isCameraOpen && (
                                <div className='relative'>
                                    <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                                        <Button type="button" onClick={handleTakePicture} size="lg">
                                            <Camera className="mr-2 h-4 w-4"/>
                                            Take Picture
                                        </Button>
                                         <Button type="button" variant="destructive" onClick={stopCamera}>
                                            Close Camera
                                        </Button>
                                    </div>
                                </div>
                            )}

                             {hasCameraPermission === false && (
                                <Alert variant="destructive">
                                    <CameraIcon className="h-4 w-4" />
                                    <AlertTitle>Camera Access Denied</AlertTitle>
                                    <AlertDescription>
                                        Please allow camera access in your browser settings to use this feature.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="flex gap-2">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleOpenCamera}
                                >
                                    <Camera className="mr-2 h-4 w-4" />
                                    {isCameraOpen ? 'Close Camera' : 'Open Camera'}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload an Image
                                </Button>
                            </div>
                        </div>
                    )}
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., A black leather wallet with a student ID for John Doe."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {isGeneratingDescription ? 'AI is generating a description from your image...' : 'Provide details, or upload an image for an AI-generated description.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Title</FormLabel>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerateTitle}
                    disabled={isGeneratingTitle}
                >
                  {isGeneratingTitle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Auto-generate
                </Button>
              </div>
              <FormControl>
                <Input placeholder="e.g., Black Leather Wallet" {...field} />
              </FormControl>
              <FormDescription>
                A concise title for the item.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {CATEGORIES.map(({ name, icon: Icon }) => (
                        <SelectItem key={name} value={name}>
                        <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {name}
                        </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Last Known Location</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Library, 2nd Floor" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date {type === 'lost' ? 'Lost' : 'Found'}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting || isGeneratingDescription}>
          {(isSubmitting || isGeneratingDescription) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Report
        </Button>
      </form>
    </Form>
  );
}

