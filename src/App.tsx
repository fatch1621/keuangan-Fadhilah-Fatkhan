import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SideNavBar } from './components/layout/SideNavBar';
import { TopNavBar } from './components/layout/TopNavBar';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { DashboardView } from './components/views/DashboardView';
import { IncomeView } from './components/views/IncomeView';
import { ExpenseView } from './components/views/ExpenseView';
import { PlaningView } from './components/views/PlaningView';
import { ReportsView } from './components/views/ReportsView';
import { CategoriesView } from './components/views/CategoriesView';
import { MembersView } from './components/views/MembersView';
import { ProfileView } from './components/views/ProfileView';
import { LoginView } from './components/views/LoginView';
import { RegisterView } from './components/views/RegisterView';
import { LogoutModal } from './components/modals/LogoutModal';
import { InviteMemberModal } from './components/modals/InviteMemberModal';
import { QuickAdjusterModal } from './components/modals/QuickAdjusterModal';
import { NewTransactionModal } from './components/modals/NewTransactionModal';

const AppContent: React.FC = () => {
  const { currentView, isLoggedIn, quickToast } = useApp();

  if (!isLoggedIn || currentView === 'login' || currentView === 'register') {
    if (currentView === 'register') {
      return <RegisterView />;
    }
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'pemasukan':
        return <IncomeView />;
      case 'pengeluaran':
        return <ExpenseView />;
      case 'planing':
        return <PlaningView />;
      case 'laporan':
        return <ReportsView />;
      case 'kategori':
        return <CategoriesView />;
      case 'member':
        return <MembersView />;
      case 'profil':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased selection:bg-[#316bf3] selection:text-white">
      {/* Fixed Sidebar (Desktop only) */}
      <SideNavBar />

      {/* Mobile Slide-over Drawer (Mobile only) */}
      <MobileDrawer />

      {/* Main Content Area Offset for Desktop */}
      <div className="flex-1 flex flex-col ml-0 min-w-0">
        <TopNavBar />
        <main className="ml-0 md:ml-64 p-3.5 sm:p-5 md:p-8 flex-1 bg-[#faf8ff] w-full md:max-w-[calc(100%-16rem)] min-w-0 pb-28 md:pb-8">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Mobile only) */}
      <BottomNavBar />

      {/* Global Modals */}
      <LogoutModal />
      <InviteMemberModal />
      <QuickAdjusterModal />
      <NewTransactionModal />

      {/* Toast Notification */}
      {quickToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00236f] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#316bf3]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="material-symbols-outlined text-amber-400 text-xl fill-1">info</span>
          <span className="text-[13px] font-medium">{quickToast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
