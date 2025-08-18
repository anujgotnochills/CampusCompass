import type { Category } from './types';
import { Wallet, Fingerprint, Smartphone, Briefcase, KeyRound, Shirt, MoreHorizontal } from 'lucide-react';

export const CATEGORIES: { name: Category; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { name: 'Wallet', icon: Wallet },
  { name: 'ID', icon: Fingerprint },
  { name: 'Phone', icon: Smartphone },
  { name: 'Bag', icon: Briefcase },
  { name: 'Keys', icon: KeyRound },
  { name: 'Clothing', icon: Shirt },
  { name: 'Other', icon: MoreHorizontal },
];
