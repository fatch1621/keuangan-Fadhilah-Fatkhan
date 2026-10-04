import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const BottomNavBar: React.FC = () => {
  const { currentView, setCurrentView, setShowNewTransactionModal, showMobileMenu, setShowMobileMenu } = useApp();

  const isMenuSection = ['planing', 'laporan', 'kategori', 'member', 'profil'].includes(currentView);

  const handleNav = (view: PageView) => {
    setShowMobileMenu(false);
    setCurrentView(view);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#c5c5d3]/50 shadow-[0_-4px_20px_rgba(19,27,46,0.08)] px-2 py-1 safe-area-bottom select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Tab 1: Beranda / Dashboard */}
        <button
          onClick={() => handleNav('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'dashboard' && !showMobileMenu
              ? 'text-[#0051d5] font-semibold'
              : 'text-[#757682] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                currentView === 'dashboard' && !showMobileMenu ? 'scale-110 fill-1' : ''
              }`}
            >
              dashboard
            </span>
            {currentView === 'dashboard' && !showMobileMenu && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0051d5] rounded-full"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Beranda</span>
        </button>

        {/* Tab 2: Pemasukan */}
        <button
          onClick={() => handleNav('pemasukan')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'pemasukan' && !showMobileMenu
              ? 'text-emerald-600 font-semibold'
              : 'text-[#757682] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                currentView === 'pemasukan' && !showMobileMenu ? 'scale-110 font-bold' : ''
              }`}
            >
              arrow_downward
            </span>
            {currentView === 'pemasukan' && !showMobileMenu && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Pemasukan</span>
        </button>

        {/* Center Floating Action Button: Quick Add Transaction */}
        <div className="relative -mt-5 flex flex-col items-center justify-center">
          <button
            onClick={() => setShowNewTransactionModal(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00236f] via-[#1e3a8a] to-[#0051d5] text-white flex items-center justify-center shadow-lg shadow-[#00236f]/30 border-2 border-white active:scale-90 transition-all cursor-pointer group"
            title="Catat Transaksi Baru"
          >
            <span className="material-symbols-outlined text-[24px] group-hover:rotate-90 transition-transform duration-200">
              add
            </span>
          </button>
          <span className="text-[10px] font-semibold text-[#00236f] mt-0.5">Catat</span>
        </div>

        {/* Tab 3: Pengeluaran */}
        <button
          onClick={() => handleNav('pengeluaran')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentView === 'pengeluaran' && !showMobileMenu
              ? 'text-[#ba1a1a] font-semibold'
              : 'text-[#757682] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                currentView === 'pengeluaran' && !showMobileMenu ? 'scale-110 font-bold' : ''
              }`}
            >
              arrow_upward
            </span>
            {currentView === 'pengeluaran' && !showMobileMenu && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#ba1a1a] rounded-full"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Pengeluaran</span>
        </button>

        {/* Tab 4: Menu / Drawer */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            showMobileMenu || isMenuSection
              ? 'text-[#0051d5] font-semibold'
              : 'text-[#757682] hover:text-[#131b2e]'
          }`}
        >
          <div className="relative">
            <span
              className={`material-symbols-outlined text-[22px] transition-transform ${
                showMobileMenu || isMenuSection ? 'scale-110 fill-1' : ''
              }`}
            >
              grid_view
            </span>
            {(showMobileMenu || isMenuSection) && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0051d5] rounded-full"></span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
        </button>
      </div>
    </nav>
  );
};
