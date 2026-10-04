import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const TopNavBar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    totalBalance,
    formatRupiah,
    privacyMode,
    setPrivacyMode,
    showToast,
    setShowMobileMenu,
  } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumb = () => {
    switch (currentView) {
      case 'dashboard':
        return { parent: 'Capital Flow', current: 'Dashboard Portofolio', tag: 'Bulan Ini (Oktober 2024)' };
      case 'pemasukan':
        return { parent: 'Capital Flow', current: 'Manajemen Arus Kas', tag: 'Input & Kelola Pemasukan' };
      case 'pengeluaran':
        return { parent: 'Capital Flow', current: 'Manajemen Beban & Belanja', tag: 'Input & Kelola Pengeluaran' };
      case 'planing':
        return { parent: 'Capital Flow', current: 'Planing Anggaran Bulanan', tag: 'Amplop Kas' };
      case 'laporan':
        return { parent: 'Capital Flow', current: 'Laporan Keuangan & Audit', tag: 'Audit & Reports Mode' };
      case 'kategori':
        return { parent: 'Capital Flow', current: 'Manajemen Kategori Finansial', tag: 'Pos Anggaran' };
      case 'member':
        return { parent: 'Capital Flow', current: 'Manajemen Anggota & Sesi', tag: 'Audit Real-Time' };
      case 'profil':
        return { parent: 'Capital Flow', current: 'Pengaturan Profil & Akun', tag: 'Sovereign Tier' };
      default:
        return { parent: 'Capital Flow', current: 'Platform', tag: 'Live' };
    }
  };

  const breadcrumb = getBreadcrumb();

  return (
    <header className="sticky top-0 right-0 z-40 w-full border-b border-[#c5c5d3]/70 bg-white/95 backdrop-blur-md shadow-xs flex justify-between items-center h-14 md:h-16 px-3.5 sm:px-6 md:px-8 ml-0 md:ml-64 max-w-full md:max-w-[calc(100%-16rem)] select-none">
      {/* MOBILE LEFT: Hamburger button & Brand Logo */}
      <div className="flex md:hidden items-center gap-2.5">
        <button
          onClick={() => setShowMobileMenu(true)}
          className="p-1.5 rounded-lg text-[#00236f] hover:bg-[#eaedff] active:scale-95 transition-all cursor-pointer"
          title="Buka Menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <div
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1e3a8a] to-[#0051d5] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[18px] text-amber-300 fill-1">account_balance</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#00236f] tracking-tight leading-tight">
              Capital Flow
            </span>
            <span className="text-[9px] text-[#757682] font-semibold tracking-wide">
              WEALTH ID
            </span>
          </div>
        </div>
      </div>

      {/* DESKTOP LEFT: Breadcrumb & Contextual Identity */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-2 text-[13px]">
          <span
            className="text-[#444651] font-medium hover:text-[#00236f] cursor-pointer transition-colors"
            onClick={() => setCurrentView('dashboard')}
          >
            {breadcrumb.parent}
          </span>
          <span className="text-[#c5c5d3]">/</span>
          <span className="text-[#00236f] font-semibold">{breadcrumb.current}</span>
        </div>

        <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#00236f] font-medium text-[12px] border border-[#dce1ff]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {breadcrumb.tag}
        </span>
      </div>

      {/* RIGHT UTILITIES: Balance, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
        {/* Desktop Month Filter Selector */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[#f2f3ff] border border-[#c5c5d3]/60 rounded-lg text-[13px] font-medium text-[#131b2e]">
          <span className="material-symbols-outlined text-[#757682] text-[18px]">calendar_month</span>
          <span>Bulan Ini (Okt 2024)</span>
        </div>

        {/* Total Balance Pill (Mobile compact & Desktop full) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#eaedff] text-[#00236f] font-medium border border-[#316bf3]/20 shadow-xs">
          <span className="hidden sm:inline text-[12px] text-[#444651]">Total Balance:</span>
          <span className="text-[12px] sm:text-[14px] font-bold font-mono tracking-tight text-[#00236f] tabular-nums">
            {formatRupiah(totalBalance)}
          </span>
          <button
            onClick={() => {
              setPrivacyMode(!privacyMode);
              showToast(privacyMode ? 'Saldo ditampilkan.' : 'Privacy Mode: Saldo disembunyikan.');
            }}
            title={privacyMode ? 'Tampilkan Saldo' : 'Sembunyikan Saldo'}
            className="p-0.5 rounded hover:bg-white text-[#757682] hover:text-[#00236f] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">
              {privacyMode ? 'visibility' : 'visibility_off'}
            </span>
          </button>
        </div>

        {/* Notification Bell Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 sm:p-2 rounded-lg text-[#444651] hover:bg-[#eaedff] transition-colors cursor-pointer"
            title="Notifikasi Sistem"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">notifications</span>
            <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-[#c5c5d3] p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-[#c5c5d3]/40">
                <span className="text-[13px] font-bold text-[#00236f]">Notifikasi Finansial</span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">2 Baru</span>
              </div>
              <div className="space-y-3 mt-3">
                <div className="p-2.5 rounded-lg bg-[#f2f3ff] text-[12px] text-[#131b2e]">
                  <p className="font-semibold text-[#ba1a1a] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">warning</span> Budget Alert
                  </p>
                  <p className="text-[#444651] mt-0.5">Pos Gaya Hidup mencapai 92% plafon bulanan.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-50 text-[12px] text-emerald-900">
                  <p className="font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span> Dividen Masuk
                  </p>
                  <p className="text-emerald-700 mt-0.5">Dividen BBCA Rp 7.000.000 berhasil diverifikasi.</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-full mt-3 py-1.5 text-center text-[12px] text-[#0051d5] font-semibold hover:underline"
              >
                Tutup
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:block h-6 w-px bg-[#c5c5d3]/60"></div>

        {/* User Profile Pill / Avatar */}
        <div
          onClick={() => setCurrentView('profil')}
          className="flex items-center gap-2 sm:gap-3 pl-0 sm:pl-1 cursor-pointer group"
          title="Pengaturan Profil"
        >
          <div className="relative">
            <img
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-[#316bf3]/30 group-hover:ring-[#0051d5] transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcX8fBQEMTMHnvjjeXyiOhMPaGhpe-LOJ38IuVuKIgqxv0zoq4cj2UNsZzFlBtXyBTacBmU5Z3Y-2BZtqsLjbQY51y4RgFgZoKy0E5cbUOLFyHSvVpy2RvuqKNgFPC7UGLdaEyP-7xOfy0sLKkBhSmkGPEpNAaS7oj4OXzoEh6e23nS-PU62pz_2SUt2OEJvTCRTDYMvM0XMpa6XpuBw3Tq8lhCLodiExqmg-ezFMWDlkuQfRKgfxzEQ"
              alt="Arya Chandra"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1e3a8a] text-white hidden items-center justify-center font-bold text-xs ring-2 ring-[#316bf3]/30">
              AC
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-[13px] font-semibold text-[#131b2e] leading-tight group-hover:text-[#0051d5] transition-colors">
              Arya Chandra
            </span>
            <span className="text-[11px] text-[#757682] font-medium">
              Super Admin (Owner)
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
