
export type Category = 'Wallet' | 'ID' | 'Phone' | 'Bag' | 'Keys' | 'Clothing' | 'Other';

export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string;
  imageDataUri?: string;
  isRecovered: boolean;
  postedAt: number;
  lockerNumber?: number;
}

export interface Profile {
  rewardPoints: number;
}

export interface User {
    email: string;
    name: string;
}

export interface StoredUser {
    email: string;
    password: string; // In a real app, this would be a hash
}
