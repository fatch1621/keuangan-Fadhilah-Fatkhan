import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageView, Transaction, BudgetEnvelope, Member, Session, FinancialCategory } from '../types';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  onAuthStateChanged,
  handleFirestoreError,
  OperationType,
  type User,
} from '../firebase';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';

interface AppContextType {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  isLoggedIn: boolean;
  currentUser: User | null;
  login: () => void;
  loginWithGoogle: () => Promise<void>;
  logout: (allDevices?: boolean) => void;
  privacyMode: boolean;
  setPrivacyMode: (value: boolean) => void;
  totalBalance: number;
  formatRupiah: (amount: number, forceShow?: boolean) => string;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  clearTransactionsByType: (type: 'inflow' | 'outflow') => void;
  envelopes: BudgetEnvelope[];
  updateEnvelope: (id: string, additionalAmount: number) => void;
  members: Member[];
  addMember: (member: Omit<Member, 'id'>) => void;
  deleteMember: (id: string) => void;
  sessions: Session[];
  terminateSession: (id: string) => void;
  terminateOtherSessions: () => void;
  categories: FinancialCategory[];
  addCategory: (cat: Omit<FinancialCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
  showNewTransactionModal: boolean;
  setShowNewTransactionModal: (show: boolean) => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  logoutAllDevices: boolean;
  setLogoutAllDevices: (value: boolean) => void;
  showInviteModal: boolean;
  setShowInviteModal: (show: boolean) => void;
  showQuickAdjusterModal: boolean;
  setShowQuickAdjusterModal: (show: boolean) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  quickToast: string | null;
  showToast: (msg: string) => void;
}

const initialTransactions: Transaction[] = [
  {
    id: 'TRX-202410-091',
    type: 'inflow',
    date: '28 Okt 2024',
    time: '14:22 WIB',
    description: 'Dividen Saham BBCA',
    notes: 'RDI Mandiri Sekuritas / Kupon Portofolio Q3',
    category: 'Investasi',
    planEnvelope: 'Portofolio Saham',
    account: 'BCA Wealth Priority',
    amount: 7000000,
    status: 'Tercapai',
  },
  {
    id: 'TRX-202410-088',
    type: 'outflow',
    date: '26 Okt 2024',
    time: '20:14 WIB',
    description: 'Fine Dining Hermitage Lounge',
    notes: 'Keluarga & Dinner anniversary',
    category: 'Gaya Hidup',
    planEnvelope: 'Gaya Hidup & Hiburan',
    account: 'Kartu Kredit Mandiri',
    amount: 1850000,
    status: 'Warning',
  },
  {
    id: 'TRX-202410-082',
    type: 'inflow',
    date: '25 Okt 2024',
    time: '09:15 WIB',
    description: 'Gaji Pokok & Retainer Konsultasi',
    notes: 'Payroll PT Finansial Utama',
    category: 'Gaji & Upah',
    planEnvelope: 'Tabungan Rumah',
    account: 'Mandiri Corporate Pay',
    amount: 24000000,
    status: 'Tercapai',
  },
  {
    id: 'TRX-202410-079',
    type: 'outflow',
    date: '23 Okt 2024',
    time: '11:30 WIB',
    description: 'Belanja Mingguan Supermarket GrandLucky',
    notes: 'Kartu Debit BCA Prioritas - Stok bahan pangan segar',
    category: 'Kebutuhan Pokok',
    planEnvelope: 'Kebutuhan Pokok',
    account: 'Debit BCA',
    amount: 1450000,
    status: 'Sesuai Budget',
  },
  {
    id: 'TRX-202410-078',
    type: 'outflow',
    date: '21 Okt 2024',
    time: '08:15 WIB',
    description: 'Tagihan Listrik PLN & Internet Fiber',
    notes: 'Token Rumah + Biznet 150Mbps',
    category: 'Utilitas Rumah',
    planEnvelope: 'Kebutuhan Pokok',
    account: 'Auto-Debet BCA',
    amount: 1100000,
    status: 'Sesuai Budget',
  },
  {
    id: 'TRX-202410-071',
    type: 'outflow',
    date: '15 Okt 2024',
    time: '16:30 WIB',
    description: 'Angsuran Pokok Pembiayaan Properti',
    notes: 'KPR Unit Kemang Bulan ke-42',
    category: 'Cicilan & Utang',
    planEnvelope: 'Cicilan & Utang',
    account: 'BSI Hasanah Priority',
    amount: 3000000,
    status: 'Sesuai Budget',
  },
  {
    id: 'TRX-202410-065',
    type: 'outflow',
    date: '12 Okt 2024',
    time: '17:45 WIB',
    description: 'Bensin Shell V-Power & Toll',
    notes: 'Bensin mingguan + Flazz top-up',
    category: 'Transportasi',
    planEnvelope: 'Kebutuhan Pokok',
    account: 'QRIS Livin',
    amount: 420000,
    status: 'Sesuai Budget',
  },
  {
    id: 'TRX-202410-050',
    type: 'inflow',
    date: '03 Okt 2024',
    time: '17:30 WIB',
    description: 'Bonus Performance KPI',
    notes: 'Apresiasi Kuartal II',
    category: 'Bonus & Tunjangan',
    planEnvelope: 'Operasional Harian',
    account: 'Mandiri Prioritas',
    amount: 11000000,
    status: 'Tercapai',
  },
];

const initialEnvelopes: BudgetEnvelope[] = [
  {
    id: 'env-1',
    name: 'Kebutuhan Pokok',
    subtitle: 'Dapur, Logistik, Utility',
    icon: 'shopping_cart',
    color: 'bg-primary',
    target: 8000000,
    spent: 6100000,
    badge: '76%',
    badgeType: 'info',
    note: 'Status Saldo: Terkendali',
  },
  {
    id: 'env-2',
    name: 'Tabungan & Investasi',
    subtitle: 'SBN, Reksadana, Saham',
    icon: 'trending_up',
    color: 'bg-emerald-600',
    target: 7500000,
    spent: 7500000,
    badge: 'Penuh 100%',
    badgeType: 'success',
    note: '✓ Selesai Teralokasi',
  },
  {
    id: 'env-3',
    name: 'Cicilan & Utang',
    subtitle: 'KPR & Fasilitas Modal',
    icon: 'credit_card',
    color: 'bg-primary-container',
    target: 4000000,
    spent: 4000000,
    badge: 'Tuntas',
    badgeType: 'success',
    note: 'Jatuh tempo tuntas',
  },
  {
    id: 'env-4',
    name: 'Dana Darurat',
    subtitle: 'Rekening Likuid Cadangan',
    icon: 'health_and_safety',
    color: 'bg-secondary',
    target: 2500000,
    spent: 2500000,
    badge: '100%',
    badgeType: 'info',
    note: 'Ambang 6x biaya bulanan',
  },
  {
    id: 'env-5',
    name: 'Gaya Hidup & Hiburan',
    subtitle: 'Cafe, Hobi, Rekreasi',
    icon: 'sports_esports',
    color: 'bg-amber-500',
    target: 2000000,
    spent: 1850000,
    badge: 'Warning 92%',
    badgeType: 'warning',
    note: 'Menipis (Sisa Rp 150.000)',
  },
];

const initialMembers: Member[] = [
  {
    id: 'mem-1',
    name: 'Arya Chandra',
    email: 'arya.chandra@wealth.id',
    role: 'Super Admin',
    isCurrentUser: true,
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcX8fBQEMTMHnvjjeXyiOhMPaGhpe-LOJ38IuVuKIgqxv0zoq4cj2UNsZzFlBtXyBTacBmU5Z3Y-2BZtqsLjbQY51y4RgFgZoKy0E5cbUOLFyHSvVpy2RvuqKNgFPC7UGLdaEyP-7xOfy0sLKkBhSmkGPEpNAaS7oj4OXzoEh6e23nS-PU62pz_2SUt2OEJvTCRTDYMvM0XMpa6XpuBw3Tq8lhCLodiExqmg-ezFMWDlkuQfRKgfxzEQ',
    status: 'Online Sekarang',
    isOnline: true,
    device: 'Mac Studio (Chrome)',
    location: 'Jakarta, ID',
    ip: '103.119.24.12',
    accessLevel: 'Penuh (Owner)',
  },
  {
    id: 'mem-2',
    name: 'Nadia Salsabila',
    email: 'nadia.s@family.id',
    role: 'Finance Editor',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhz9VBx9_tUzzwGeZgcnemg4BGvOeQiuoQyg_NQ-vGABEUuQZfKNBeuS33BccqVGy9LqXc1QD5TAZYoRkkumG59wR9cYh2Ir6lr3TOS5B00XNfzsjsmgwvEZKPvaxHqlvIyqCDG37l0yluQuAtYrkohvowlBxF5tz9g3DRugxdweOXvKqE1f6m3T7XaMt-Zzb7sK46sIzZoBhQs8aQHN-Bp235xwPgkSl-iMASaiD0l3bjLQBMNfA06g',
    status: 'Online (Baru saja input Belanja Rumah)',
    isOnline: true,
    device: 'iPhone 15 Pro (Safari)',
    location: 'Jakarta, ID',
    ip: '182.253.90.44',
    accessLevel: 'Input & Rekonsiliasi',
  },
  {
    id: 'mem-3',
    name: 'Rizky Ramadhan',
    email: 'rizky.r@family.id',
    role: 'Contributor',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfZGwRzht0cMBmPmS6oDce_0yTxoFT5Bz3_PfK3JHAxlSCa3RACu2YiZ3cC63CJIHotLt75Mb8N63aBA4UUicEx6CWlHs6_B2Copd44eX9MS0qkFuzpluqO6hMjkEhJFbPGYcC7cE8bFAUaKgoe3ucIzUYvJazl1uK6Tjxa2ZMgESDy19W4OLB1bUqt32JIxNmY3XBZWF9zSupLaudlvlCtZNMCnqSxpiXADvcS5MhGNUZQGfrHwdC7A',
    status: 'Aktif 15m lalu',
    isOnline: false,
    device: 'Windows PC (Brave)',
    location: 'Bandung, ID',
    ip: '36.88.12.19',
    accessLevel: 'Input Transaksi Terbatas',
  },
  {
    id: 'mem-4',
    name: 'Citra Lestari, CFP®',
    email: 'citra.l@invest.co',
    role: 'Financial Advisor / Auditor',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDl-33bqXZ3AAwVS_4JzuNSdbjYlxv0uE_ZfhenDUm8JLyQ5IiYqGkJbgHMu3wKWJb4_2DMQqLL1I41dNd0EjfEOnofRf4SSEKv-wpBkSgI6DyNtdON5NKsB7pnHAFq-kgHCapMnHRNpS8qwgHludw15o8b5VFdyZpQ6i6soEP6KwFqNjie_VH7SkEiqkaKkP3334r-Aanh5QLacU_u4qLB7bI3LqF5B5n6z31fW4nv8Rbwd3BK_Hkdaw',
    status: 'Offline (2 hari lalu)',
    isOnline: false,
    device: 'iPad Pro (Chrome iOS)',
    location: 'Surabaya, ID',
    ip: '114.122.5.87',
    accessLevel: 'Read-only & Audit Report',
  },
  {
    id: 'mem-5',
    name: 'Dimas Pratama',
    email: 'dimas.p@family.id',
    role: 'Viewer',
    status: 'Undangan Menunggu Konfirmasi',
    isOnline: false,
    device: 'Belum ada perangkat terdaftar',
    location: '-',
    ip: '-',
    accessLevel: 'Hanya Lihat Grafik & Saldo',
    isPending: true,
  },
];

const initialSessions: Session[] = [
  {
    id: 'sess-1',
    device: 'Mac Studio 2023',
    browser: 'Google Chrome 124',
    isCurrent: true,
    user: 'Arya Chandra (Super Admin)',
    role: 'Super Admin',
    ip: '103.119.24.12',
    location: 'Jakarta Selatan, ID',
    encryption: 'Enkripsi TLS 1.3 Aktif',
    lastActive: 'Sedang Digunakan',
    loginTime: 'Hari ini, 08:30 WIB',
    icon: 'desktop_mac',
  },
  {
    id: 'sess-2',
    device: 'Apple iPhone 15 Pro',
    browser: 'Safari iOS 17.5',
    isCurrent: false,
    user: 'Nadia Salsabila (Finance Editor)',
    role: 'Finance Editor',
    ip: '182.253.90.44',
    location: 'Jakarta Barat, ID',
    encryption: 'Enkripsi TLS 1.3 Aktif',
    lastActive: 'Aktif 4 menit yang lalu',
    loginTime: 'Hari ini, 11:15 WIB',
    icon: 'smartphone',
  },
  {
    id: 'sess-3',
    device: 'Windows 11 Workstation',
    browser: 'Brave Browser',
    isCurrent: false,
    user: 'Rizky Ramadhan (Contributor)',
    role: 'Contributor',
    ip: '36.88.12.19',
    location: 'Bandung, Jawa Barat',
    encryption: 'Enkripsi TLS 1.3 Aktif',
    lastActive: 'Aktif 15 menit yang lalu',
    loginTime: 'Kemarin, 21:04 WIB',
    icon: 'laptop_chromebook',
  },
];

const initialCategories: FinancialCategory[] = [
  {
    id: 'cat-in-1',
    name: 'Gaji & Upah',
    type: 'inflow',
    icon: 'work',
    color: 'emerald',
    monthlyAverageOrLimit: 35000000,
    subtitle: 'Pemasukan Rutin • Terhubung Planing',
    tag: 'Pemasukan Rutin',
    bindingEnvelope: 'Tabungan Rumah',
  },
  {
    id: 'cat-in-2',
    name: 'Dividen & Bunga Investasi',
    type: 'inflow',
    icon: 'trending_up',
    color: 'blue',
    monthlyAverageOrLimit: 7000000,
    subtitle: 'Pemasukan Pasif • Portofolio Saham/Obligasi',
    tag: 'Pemasukan Pasif',
    bindingEnvelope: 'Portofolio Saham',
  },
  {
    id: 'cat-in-3',
    name: 'Side Hustle & Freelance UI/UX',
    type: 'inflow',
    icon: 'laptop_mac',
    color: 'purple',
    monthlyAverageOrLimit: 4500000,
    subtitle: 'Pemasukan Fleksibel • Klien Luar Negeri',
    tag: 'Pemasukan Fleksibel',
    bindingEnvelope: 'Dana Darurat',
  },
  {
    id: 'cat-in-4',
    name: 'Bonus & Insentif Performa',
    type: 'inflow',
    icon: 'emoji_events',
    color: 'amber',
    monthlyAverageOrLimit: 15000000,
    subtitle: 'Insidental • Bonus Tahunan/Kuartal',
    tag: 'Insidental',
    bindingEnvelope: 'Operasional Harian',
  },
  {
    id: 'cat-out-1',
    name: 'Kebutuhan Pokok & Logistik',
    type: 'outflow',
    icon: 'shopping_basket',
    color: 'blue',
    monthlyAverageOrLimit: 8000000,
    subtitle: '3 Sub-kategori: Groceries, Utility, Gas',
    tag: 'Esensial',
    bindingEnvelope: 'Kebutuhan Pokok',
    subcategories: ['Bahan Makanan', 'Makan Luar', 'Kopi/Snack'],
  },
  {
    id: 'cat-out-2',
    name: 'Tabungan & Investasi',
    type: 'outflow',
    icon: 'query_stats',
    color: 'emerald',
    monthlyAverageOrLimit: 7500000,
    subtitle: 'Alokasi Reksadana & ETF S&P500',
    tag: 'Investasi',
    bindingEnvelope: 'Tabungan & Investasi',
  },
  {
    id: 'cat-out-3',
    name: 'Cicilan & Beban Properti',
    type: 'outflow',
    icon: 'home_work',
    color: 'teal',
    monthlyAverageOrLimit: 4000000,
    subtitle: 'KPR & Maintenance Cluster',
    tag: 'Cicilan',
    bindingEnvelope: 'Cicilan & Utang',
  },
  {
    id: 'cat-out-4',
    name: 'Gaya Hidup, Hobi & Hiburan',
    type: 'outflow',
    icon: 'sports_esports',
    color: 'amber',
    monthlyAverageOrLimit: 2000000,
    subtitle: 'Cafe, Hobi, Rekreasi (Mendekati plafon)',
    tag: 'Fleksibel',
    bindingEnvelope: 'Gaya Hidup & Hiburan',
    isWarning: true,
  },
  {
    id: 'cat-out-5',
    name: 'Dana Darurat & Proteksi',
    type: 'outflow',
    icon: 'health_and_safety',
    color: 'indigo',
    monthlyAverageOrLimit: 2500000,
    subtitle: 'Asuransi Jiwa & Simpanan Likuid',
    tag: 'Proteksi',
    bindingEnvelope: 'Dana Darurat',
  },
  {
    id: 'cat-out-6',
    name: 'Transportasi & Bensin',
    type: 'outflow',
    icon: 'directions_car',
    color: 'slate',
    monthlyAverageOrLimit: 1500000,
    subtitle: 'Bahan Bakar, Tol, & Servis Rutin',
    tag: 'Operasional',
    bindingEnvelope: 'Kebutuhan Pokok',
  },
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<PageView>('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [privacyMode, setPrivacyMode] = useState<boolean>(false);
  const [totalBalance, setTotalBalance] = useState<number>(142500000);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [envelopes, setEnvelopes] = useState<BudgetEnvelope[]>(initialEnvelopes);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [categories, setCategories] = useState<FinancialCategory[]>(initialCategories);

  // Modals
  const [showNewTransactionModal, setShowNewTransactionModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutAllDevices, setLogoutAllDevices] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showQuickAdjusterModal, setShowQuickAdjusterModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Synchronize with Firebase Auth and Firestore in Real Time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsLoggedIn(true);

        const txPath = `users/${user.uid}/transactions`;
        const envPath = `users/${user.uid}/envelopes`;
        const catPath = `users/${user.uid}/categories`;
        const profilePath = `users/${user.uid}/profile/settings`;

        // 1. Transactions Listener
        const unsubTx = onSnapshot(
          collection(db, 'users', user.uid, 'transactions'),
          (snapshot) => {
            if (!snapshot.empty) {
              const loaded: Transaction[] = [];
              snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loaded.push({
                  id: docSnap.id,
                  type: data.type || 'outflow',
                  date: data.date || 'Hari ini',
                  time: data.time || '12:00 WIB',
                  description: data.description || '',
                  notes: data.notes || '',
                  category: data.category || 'Umum',
                  planEnvelope: data.planEnvelope || 'Umum',
                  account: data.account || 'Kas Utama',
                  amount: data.amount || 0,
                  status: data.status || 'Sesuai Budget',
                });
              });
              setTransactions(loaded);
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, txPath);
          }
        );

        // 2. Envelopes Listener
        const unsubEnv = onSnapshot(
          collection(db, 'users', user.uid, 'envelopes'),
          (snapshot) => {
            if (!snapshot.empty) {
              const loaded: BudgetEnvelope[] = [];
              snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loaded.push({
                  id: docSnap.id,
                  name: data.name || '',
                  subtitle: data.subtitle || '',
                  icon: data.icon || 'payments',
                  color: data.color || 'blue',
                  target: data.target || 0,
                  spent: data.spent || 0,
                  badge: data.badge || '',
                  badgeType: data.badgeType || 'info',
                  note: data.note || '',
                });
              });
              setEnvelopes(loaded);
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, envPath);
          }
        );

        // 3. Categories Listener
        const unsubCat = onSnapshot(
          collection(db, 'users', user.uid, 'categories'),
          (snapshot) => {
            if (!snapshot.empty) {
              const loaded: FinancialCategory[] = [];
              snapshot.forEach((docSnap) => {
                const data = docSnap.data();
                loaded.push({
                  id: docSnap.id,
                  name: data.name || '',
                  icon: data.icon || 'category',
                  color: data.color || 'blue',
                  type: data.type || 'outflow',
                  monthlyAverageOrLimit: data.monthlyAverageOrLimit || data.defaultLimit || 0,
                  subtitle: data.subtitle || '',
                  tag: data.tag || 'Pos Anggaran',
                  bindingEnvelope: data.bindingEnvelope || 'Umum',
                  defaultLimit: data.defaultLimit || 0,
                  tags: data.tags || [],
                });
              });
              setCategories(loaded);
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, catPath);
          }
        );

        // 4. User Profile Settings Listener
        const unsubProfile = onSnapshot(
          doc(db, 'users', user.uid, 'profile', 'settings'),
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (typeof data.totalBalance === 'number') {
                setTotalBalance(data.totalBalance);
              }
              if (typeof data.privacyMode === 'boolean') {
                setPrivacyMode(data.privacyMode);
              }
            }
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, profilePath);
          }
        );

        return () => {
          unsubTx();
          unsubEnv();
          unsubCat();
          unsubProfile();
        };
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setCurrentUser(res.user);
      setIsLoggedIn(true);
      setCurrentView('dashboard');
      showToast(`Selamat datang, ${res.user.displayName || 'Pengguna'}!`);
    } catch (err: unknown) {
      console.error('Google Sign In failed:', err);
      showToast('Gagal masuk dengan Google.');
    }
  };

  const showToast = (msg: string) => {
    setQuickToast(msg);
    setTimeout(() => {
      setQuickToast((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const formatRupiah = (amount: number, forceShow: boolean = false): string => {
    if (privacyMode && !forceShow) {
      return 'Rp ••••••••';
    }
    return 'Rp ' + amount.toLocaleString('id-ID');
  };

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const id = `TRX-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(100 + Math.random() * 900))}`;
    const transaction: Transaction = { ...newTx, id };
    setTransactions((prev) => [transaction, ...prev]);

    // Update balance
    const newBal = transaction.type === 'inflow' ? totalBalance + transaction.amount : totalBalance - transaction.amount;
    if (transaction.type === 'inflow') {
      setTotalBalance(newBal);
      showToast(`Pemasukan ${formatRupiah(transaction.amount, true)} berhasil dicatat.`);
    } else {
      setTotalBalance(newBal);
      // Deduct from envelope if matching
      if (transaction.planEnvelope) {
        setEnvelopes((prev) =>
          prev.map((env) => {
            if (
              env.name.toLowerCase().includes(transaction.planEnvelope!.toLowerCase()) ||
              transaction.planEnvelope!.toLowerCase().includes(env.name.toLowerCase())
            ) {
              const newSpent = env.spent + transaction.amount;
              const ratio = Math.round((newSpent / env.target) * 100);
              return {
                ...env,
                spent: newSpent,
                badge: `${ratio}%`,
                badgeType: ratio > 90 ? 'warning' : 'info',
              };
            }
            return env;
          })
        );
      }
      showToast(`Pengeluaran ${formatRupiah(transaction.amount, true)} berhasil dipotong.`);
    }

    // Persist to Firestore if user is logged in
    if (auth.currentUser) {
      const txPath = `users/${auth.currentUser.uid}/transactions/${id}`;
      setDoc(doc(db, 'users', auth.currentUser.uid, 'transactions', id), {
        ...transaction,
        userId: auth.currentUser.uid,
      }).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, txPath);
      });

      const profilePath = `users/${auth.currentUser.uid}/profile/settings`;
      setDoc(
        doc(db, 'users', auth.currentUser.uid, 'profile', 'settings'),
        {
          fullName: auth.currentUser.displayName || 'Arya Chandra',
          email: auth.currentUser.email || 'user@wealth.id',
          totalBalance: newBal,
        },
        { merge: true }
      ).catch((err) => {
        handleFirestoreError(err, OperationType.UPDATE, profilePath);
      });
    }
  };

  const deleteTransaction = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (tx) {
      const newBal = tx.type === 'inflow' ? Math.max(0, totalBalance - tx.amount) : totalBalance + tx.amount;
      if (tx.type === 'inflow') {
        setTotalBalance(newBal);
      } else {
        setTotalBalance(newBal);
        // Restore envelope spent
        if (tx.planEnvelope) {
          setEnvelopes((prev) =>
            prev.map((env) => {
              if (
                env.name.toLowerCase().includes(tx.planEnvelope!.toLowerCase()) ||
                tx.planEnvelope!.toLowerCase().includes(env.name.toLowerCase())
              ) {
                const newSpent = Math.max(0, env.spent - tx.amount);
                const ratio = env.target > 0 ? Math.round((newSpent / env.target) * 100) : 0;
                return {
                  ...env,
                  spent: newSpent,
                  badge: `${ratio}%`,
                  badgeType: ratio > 90 ? 'warning' : 'info',
                };
              }
              return env;
            })
          );
        }
      }
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      showToast('Transaksi berhasil dihapus.');

      if (auth.currentUser) {
        const txPath = `users/${auth.currentUser.uid}/transactions/${id}`;
        deleteDoc(doc(db, 'users', auth.currentUser.uid, 'transactions', id)).catch((err) => {
          handleFirestoreError(err, OperationType.DELETE, txPath);
        });

        const profilePath = `users/${auth.currentUser.uid}/profile/settings`;
        setDoc(
          doc(db, 'users', auth.currentUser.uid, 'profile', 'settings'),
          {
            fullName: auth.currentUser.displayName || 'Arya Chandra',
            email: auth.currentUser.email || 'user@wealth.id',
            totalBalance: newBal,
          },
          { merge: true }
        ).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, profilePath);
        });
      }
    }
  };

  const clearTransactionsByType = (type: 'inflow' | 'outflow') => {
    const targets = transactions.filter((t) => t.type === type);
    if (targets.length === 0) {
      showToast(`Tidak ada data ${type === 'inflow' ? 'pemasukan' : 'pengeluaran'} untuk dihapus.`);
      return;
    }
    const totalSum = targets.reduce((acc, t) => acc + t.amount, 0);

    if (type === 'inflow') {
      setTotalBalance((prev) => Math.max(0, prev - totalSum));
    } else {
      setTotalBalance((prev) => prev + totalSum);
      // Restore envelopes spent amounts
      setEnvelopes((prev) =>
        prev.map((env) => {
          const spentForThisEnv = targets
            .filter(
              (t) =>
                t.planEnvelope &&
                (env.name.toLowerCase().includes(t.planEnvelope.toLowerCase()) ||
                  t.planEnvelope.toLowerCase().includes(env.name.toLowerCase()))
            )
            .reduce((acc, t) => acc + t.amount, 0);
          const newSpent = Math.max(0, env.spent - spentForThisEnv);
          const ratio = env.target > 0 ? Math.round((newSpent / env.target) * 100) : 0;
          return {
            ...env,
            spent: newSpent,
            badge: `${ratio}%`,
            badgeType: ratio > 90 ? 'warning' : 'info',
          };
        })
      );
    }

    setTransactions((prev) => prev.filter((t) => t.type !== type));
    showToast(`Semua riwayat ${type === 'inflow' ? 'pemasukan' : 'pengeluaran'} (${targets.length} transaksi) berhasil dibersihkan.`);

    if (auth.currentUser) {
      targets.forEach((t) => {
        const txPath = `users/${auth.currentUser!.uid}/transactions/${t.id}`;
        deleteDoc(doc(db, 'users', auth.currentUser!.uid, 'transactions', t.id)).catch((err) => {
          handleFirestoreError(err, OperationType.DELETE, txPath);
        });
      });
    }
  };

  const updateEnvelope = (id: string, additionalAmount: number) => {
    setEnvelopes((prev) =>
      prev.map((env) => {
        if (env.id === id) {
          const newTarget = env.target + additionalAmount;
          return {
            ...env,
            target: newTarget,
            badge: `${Math.round((env.spent / newTarget) * 100)}%`,
          };
        }
        return env;
      })
    );
    showToast(`Ploting anggaran berhasil disesuaikan.`);

    if (auth.currentUser) {
      const envPath = `users/${auth.currentUser.uid}/envelopes/${id}`;
      const targetEnv = envelopes.find((e) => e.id === id);
      if (targetEnv) {
        setDoc(
          doc(db, 'users', auth.currentUser.uid, 'envelopes', id),
          {
            ...targetEnv,
            target: targetEnv.target + additionalAmount,
            userId: auth.currentUser.uid,
          },
          { merge: true }
        ).catch((err) => {
          handleFirestoreError(err, OperationType.UPDATE, envPath);
        });
      }
    }
  };

  const addMember = (memberData: Omit<Member, 'id'>) => {
    const id = `mem-${Date.now()}`;
    setMembers((prev) => [...prev, { ...memberData, id }]);
    showToast(`Undangan untuk ${memberData.name} telah dikirim.`);
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast('Anggota berhasil dihapus dari daftar kolaborator.');
  };

  const terminateSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    showToast('Sesi perangkat berhasil diputuskan.');
  };

  const terminateOtherSessions = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
    showToast('Semua sesi perangkat lain telah diputuskan paksa!');
  };

  const addCategory = (catData: Omit<FinancialCategory, 'id'>) => {
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [...prev, { ...catData, id }]);
    showToast(`Kategori "${catData.name}" berhasil ditambahkan.`);

    if (auth.currentUser) {
      const catPath = `users/${auth.currentUser.uid}/categories/${id}`;
      setDoc(doc(db, 'users', auth.currentUser.uid, 'categories', id), {
        ...catData,
        id,
        userId: auth.currentUser.uid,
      }).catch((err) => {
        handleFirestoreError(err, OperationType.CREATE, catPath);
      });
    }
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Kategori berhasil dihapus.');

    if (auth.currentUser) {
      const catPath = `users/${auth.currentUser.uid}/categories/${id}`;
      deleteDoc(doc(db, 'users', auth.currentUser.uid, 'categories', id)).catch((err) => {
        handleFirestoreError(err, OperationType.DELETE, catPath);
      });
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    showToast('Selamat datang kembali, Arya Chandra.');
  };

  const logout = async (allDevices: boolean = false) => {
    if (allDevices) {
      setSessions((prev) => prev.filter((s) => s.isCurrent));
    }
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.error('Firebase signOut error:', e);
    }
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('login');
    setShowLogoutModal(false);
    showToast('Anda telah keluar dari sesi.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        isLoggedIn,
        currentUser,
        login,
        loginWithGoogle,
        logout,
        privacyMode,
        setPrivacyMode,
        totalBalance,
        formatRupiah,
        transactions,
        addTransaction,
        deleteTransaction,
        clearTransactionsByType,
        envelopes,
        updateEnvelope,
        members,
        addMember,
        deleteMember,
        sessions,
        terminateSession,
        terminateOtherSessions,
        categories,
        addCategory,
        deleteCategory,
        showNewTransactionModal,
        setShowNewTransactionModal,
        showLogoutModal,
        setShowLogoutModal,
        logoutAllDevices,
        setLogoutAllDevices,
        showInviteModal,
        setShowInviteModal,
        showQuickAdjusterModal,
        setShowQuickAdjusterModal,
        showMobileMenu,
        setShowMobileMenu,
        quickToast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
