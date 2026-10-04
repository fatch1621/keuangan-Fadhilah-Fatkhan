import React from 'react';
import { useApp } from '../../context/AppContext';

export const LogoutModal: React.FC = () => {
  const { showLogoutModal, setShowLogoutModal, logoutAllDevices, logout } = useApp();

  if (!showLogoutModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c5c5d3] space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-2xl">logout</span>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-[18px] font-bold text-[#00236f]">
            {logoutAllDevices ? 'Logout Dari Seluruh Perangkat' : 'Konfirmasi Keluar Sesi'}
          </h3>
          <p className="text-[13px] text-[#757682]">
            {logoutAllDevices
              ? 'Tindakan ini akan mengakhiri semua sesi aktif di Mac Studio, iPhone 15 Pro, dan PC lain secara seketika. Anda harus login ulang.'
              : (
                <>
                  Apakah Anda yakin ingin keluar dari akun <strong className="text-[#131b2e]">Arya Chandra</strong> pada perangkat Mac Studio ini?
                </>
              )}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="py-2.5 px-4 rounded-lg border border-[#c5c5d3] text-[#131b2e] font-semibold text-[13px] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={() => logout(logoutAllDevices)}
            className="py-2.5 px-4 rounded-lg bg-[#ba1a1a] text-white font-semibold text-[13px] hover:bg-red-700 transition-colors shadow-xs cursor-pointer"
          >
            Ya, Logout
          </button>
        </div>
      </div>
    </div>
  );
};
