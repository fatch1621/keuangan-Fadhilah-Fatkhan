import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';

export const MobileDrawer: React.FC = () => {
  const {
    showMobileMenu,
    setShowMobileMenu,
    currentView,
    setCurrentView,
    totalBalance,
    formatRupiah,
    privacyMode,
    setPrivacyMode,
    setShowNewTransactionModal,
    setShowLogoutModal,
    setLogoutAllDevices,
    showToast,
  } = useApp();

  if (!showMobileMenu) return null;

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    setShowMobileMenu(false);
  };

  const navGroups = [
    {
      title: 'Arus Finansial',
      items: [
        { view: 'dashboard' as PageView, label: 'Dashboard Portofolio', icon: 'dashboard', color: 'text-[#0051d5]' },
        { view: 'pemasukan' as PageView, label: 'Pemasukan', icon: 'arrow_downward', color: 'text-emerald-600', badge: 'Arus Masuk' },
        { view: 'pengeluaran' as PageView, label: 'Pengeluaran', icon: 'arrow_upward', color: 'text-[#ba1a1a]', badge: 'Beban Kas' },
        { view: 'planing' as PageView, label: 'Planing Anggaran Bulanan', icon: 'savings', color: 'text-[#316bf3]' },
      ],
    },
    {
      title: 'Audit & Konfigurasi',
      items: [
        { view: 'laporan' as PageView, label: 'Laporan Keuangan', icon: 'bar_chart', color: 'text-[#1e3a8a]' },
        { view: 'kategori' as PageView, label: 'Kategori Finansial', icon: 'category', color: 'text-indigo-600' },
        { view: 'member' as PageView, label: 'Manajemen Member', icon: 'group', color: 'text-violet-600' },
        { view: 'profil' as PageView, label: 'Profil & Keamanan', icon: 'manage_accounts', color: 'text-amber-600' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden flex select-none">
      {/* Backdrop */}
      <div
        onClick={() => setShowMobileMenu(false)}
        className="fixed inset-0 bg-[#00103c]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="relative w-5/6 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-250">
        {/* Top Profile & Header Section */}
        <div>
          {/* Header Brand Bar */}
          <div className="p-4 bg-gradient-to-r from-[#00236f] to-[#1e3a8a] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <span className="material-symbols-outlined text-[20px] text-amber-300 fill-1">account_balance</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[16px] tracking-tight">Capital Flow</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-[#00236f]">
                    PRO
                  </span>
                </div>
                <p className="text-[11px] text-white/80">Sovereign Wealth Management</p>
              </div>
            </div>

            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Tutup Menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* User Account Card */}
          <div className="p-4 bg-[#f8f9ff] border-b border-[#c5c5d3]/40">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1e3a8a] to-[#0051d5] text-white flex items-center justify-center font-bold text-base shadow-sm">
                AC
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[#131b2e] text-[14px] truncate">Arya Chandra</h3>
                  <span className="material-symbols-outlined text-emerald-600 text-[14px] fill-1">verified</span>
                </div>
                <p className="text-[11px] text-[#757682] truncate">arya.chandra@wealth.id</p>
              </div>
            </div>

            {/* Quick Balance Snapshot */}
            <div className="p-3 rounded-xl bg-white border border-[#c5c5d3]/60 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#757682] tracking-wider block">
                  Total Saldo Likuid
                </span>
                <span className="text-[15px] font-bold font-mono text-[#00236f] tabular-nums">
                  {formatRupiah(totalBalance)}
                </span>
              </div>
              <button
                onClick={() => {
                  setPrivacyMode(!privacyMode);
                  showToast(privacyMode ? 'Saldo ditampilkan.' : 'Privacy Mode: Saldo disembunyikan.');
                }}
                className="p-1.5 rounded-lg bg-[#eaedff] text-[#0051d5] hover:bg-[#dce1ff] transition-colors cursor-pointer"
                title={privacyMode ? 'Tampilkan Saldo' : 'Sembunyikan Saldo'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {privacyMode ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="p-3 space-y-4">
            {navGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#757682] px-3 mb-1.5 block">
                  {group.title}
                </span>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = currentView === item.view;
                    return (
                      <button
                        key={item.view}
                        onClick={() => handleNavigate(item.view)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left cursor-pointer ${
                          isActive
                            ? 'bg-[#316bf3] text-white shadow-sm font-semibold'
                            : 'text-[#444651] hover:bg-[#eaedff] hover:text-[#131b2e]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isActive ? 'text-white fill-1' : item.color
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>

                        {item.badge && !isActive && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#00236f]">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-[#c5c5d3]/50 bg-[#faf8ff] space-y-2">
          <button
            onClick={() => {
              setShowMobileMenu(false);
              setShowNewTransactionModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#00236f] hover:bg-[#0051d5] text-white rounded-xl text-[13px] font-semibold transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Catat Transaksi</span>
          </button>

          <button
            onClick={() => {
              setShowMobileMenu(false);
              setLogoutAllDevices(false);
              setShowLogoutModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 text-[#ba1a1a] hover:bg-[#ffdad6]/60 rounded-xl transition-colors text-[13px] font-medium cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Keluar Sesi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
