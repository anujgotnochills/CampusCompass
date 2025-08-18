export type Category = 'Wallet' | 'ID' | 'Phone' | 'Bag' | 'Keys' | 'Clothing' | 'Other';

export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string;
  imageUrl?: string;
  isRecovered: boolean;
  postedAt: number;
  lockerNumber?: number;
}

export interface Profile {
  rewardPoints: number;
}
