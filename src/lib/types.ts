
export type Category = 'Wallet' | 'ID' | 'Phone' | 'Bag' | 'Keys' | 'Clothing' | 'Other';

export interface Item {
  id: string;
  user_id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string; // ISO String
  image_data_uri?: string;
  is_recovered: boolean;
  locker_number?: number;
  created_at: string; // ISO String
}

export interface Profile {
  id: string;
  name: string;
  reward_points: number;
  updated_at: string; // ISO string
  match_notifications_enabled: boolean;
  weekly_summary_enabled: boolean;
}
