import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const SideNavBar: React.FC = () => {
  const { currentView, setCurrentView, setShowNewTransactionModal, setShowLogoutModal, setLogoutAllDevices } = useApp();

  const navItems: { view: PageView; label: string; icon: string }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { view: 'pemasukan', label: 'Pemasukan', icon: 'arrow_downward' },
    { view: 'pengeluaran', label: 'Pengeluaran', icon: 'arrow_upward' },
    { view: 'planing', label: 'Planing', icon: 'savings' },
    { view: 'laporan', label: 'Laporan Keuangan', icon: 'bar_chart' },
    { view: 'kategori', label: 'Kategori', icon: 'category' },
    { view: 'member', label: 'Member', icon: 'group' },
  ];

  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 border-r border-[#c5c5d3]/70 bg-white shadow-sm z-30 flex-col justify-between p-4 shrink-0 select-none">
      <div className="flex flex-col gap-6">
        {/* Brand Crest & Identity */}
        <div
          className="flex items-center gap-3 px-2 pt-2 cursor-pointer group"
          onClick={() => setCurrentView('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1e3a8a] to-[#0051d5] flex items-center justify-center text-white shadow-md shadow-[#00236f]/20">
            <span className="material-symbols-outlined text-2xl fill-1">account_balance</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-[#00236f] tracking-tight leading-tight group-hover:text-[#0051d5] transition-colors">
              Capital Flow
            </span>
            <span className="text-[11px] text-[#757682] font-medium tracking-wide">
              Wealth Management
            </span>
          </div>
        </div>

        {/* Quick CTA Button: New Transaction */}
        <div>
          <button
            onClick={() => setShowNewTransactionModal(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#00236f] hover:bg-[#0051d5] text-white rounded-lg text-[13px] font-semibold transition-all duration-150 shadow-sm shadow-[#00236f]/20 active:translate-y-px cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Transaction</span>
          </button>
        </div>

        {/* Main Navigation Menu */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#316bf3] text-white font-semibold shadow-sm'
                    : 'text-[#444651] hover:bg-[#eaedff] hover:text-[#131b2e]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? 'fill-1' : ''
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation (Profil, Logout) */}
      <div className="pt-3 border-t border-[#c5c5d3]/50 flex flex-col gap-1">
        <button
          onClick={() => setCurrentView('profil')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] transition-all duration-150 text-left cursor-pointer ${
            currentView === 'profil'
              ? 'bg-[#316bf3] text-white font-semibold shadow-sm'
              : 'text-[#444651] hover:bg-[#eaedff] hover:text-[#131b2e] font-medium'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${currentView === 'profil' ? 'fill-1' : ''}`}>
            account_circle
          </span>
          <span>Profil</span>
        </button>

        <button
          onClick={() => {
            setLogoutAllDevices(false);
            setShowLogoutModal(true);
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[#ba1a1a] rounded-lg transition-colors hover:bg-[#ffdad6]/60 text-[13px] font-medium text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
