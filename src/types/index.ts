export type PageView =
  | 'dashboard'
  | 'pemasukan'
  | 'pengeluaran'
  | 'planing'
  | 'laporan'
  | 'kategori'
  | 'member'
  | 'profil'
  | 'login'
  | 'register';

export interface Transaction {
  id: string;
  type: 'inflow' | 'outflow';
  date: string;
  time: string;
  description: string;
  notes?: string;
  category: string;
  planEnvelope?: string;
  account: string;
  amount: number;
  status: 'Tercapai' | 'Sesuai Budget' | 'Mendekati Batas' | 'Terverifikasi' | 'Warning';
}

export interface BudgetEnvelope {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  target: number;
  spent: number;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'info';
  note: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Finance Editor' | 'Contributor' | 'Financial Advisor / Auditor' | 'Viewer';
  isCurrentUser?: boolean;
  avatarUrl?: string;
  status: string;
  isOnline: boolean;
  device: string;
  location: string;
  ip: string;
  accessLevel: string;
  isPending?: boolean;
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  isCurrent: boolean;
  user: string;
  role: string;
  ip: string;
  location: string;
  encryption: string;
  lastActive: string;
  loginTime: string;
  icon: string;
}

export interface FinancialCategory {
  id: string;
  name: string;
  type: 'inflow' | 'outflow';
  icon: string;
  color: string;
  monthlyAverageOrLimit: number;
  subtitle: string;
  tag: string;
  bindingEnvelope: string;
  isWarning?: boolean;
  subcategories?: string[];
  defaultLimit?: number;
  tags?: string[];
}
