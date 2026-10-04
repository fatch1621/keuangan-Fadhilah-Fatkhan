import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Member } from '../../types';

export const InviteMemberModal: React.FC = () => {
  const { showInviteModal, setShowInviteModal, addMember } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Member['role']>('Finance Editor');

  if (!showInviteModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addMember({
      name,
      email,
      role,
      status: 'Undangan Menunggu Konfirmasi',
      isOnline: false,
      device: 'Belum ada perangkat terdaftar',
      location: '-',
      ip: '-',
      accessLevel: role === 'Finance Editor' ? 'Input & Rekonsiliasi' : role === 'Contributor' ? 'Input Transaksi Terbatas' : role === 'Viewer' ? 'Hanya Lihat Grafik & Saldo' : 'Read-only & Audit',
      isPending: true,
    });

    setName('');
    setEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl border border-[#c5c5d3] space-y-5 sm:space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#c5c5d3]/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-2xl">person_add</span>
            <h3 className="text-[18px] font-bold text-[#00236f]">Undang Member Baru</h3>
          </div>
          <button
            onClick={() => setShowInviteModal(false)}
            className="p-1 rounded-lg text-[#757682] hover:text-[#131b2e] cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
              Nama Lengkap Anggota <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="misal: Siti Khadijah"
              required
              className="w-full h-11 px-3 rounded-lg border border-[#c5c5d3] text-[13px] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
              Alamat Email Aktif <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anggota@keluarga.id"
              required
              className="w-full h-11 px-3 rounded-lg border border-[#c5c5d3] text-[13px] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
              Peran (Role) &amp; Otoritas Akses
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Member['role'])}
              className="w-full h-11 px-3 rounded-lg border border-[#c5c5d3] text-[13px] focus:border-[#0051d5] outline-none cursor-pointer"
            >
              <option value="Finance Editor">Finance Editor (Bisa Tambah &amp; Edit Pengeluaran/Pemasukan)</option>
              <option value="Contributor">Contributor (Bisa Input Catatan Keuangan)</option>
              <option value="Financial Advisor / Auditor">Financial Advisor / Auditor (Hanya Lihat Laporan Keuangan)</option>
              <option value="Viewer">Viewer (Hanya Melihat Ringkasan Dashboard)</option>
              <option value="Super Admin">Super Admin (Akses Penuh Pengelolaan)</option>
            </select>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-lg text-[12px] text-[#444651] flex items-start gap-2">
            <span className="material-symbols-outlined text-[#0051d5] text-lg mt-0.5">mail</span>
            <span>
              Undangan link aktivasi dengan token unik akan dikirimkan ke email anggota yang bersangkutan. Link berlaku 48 jam.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#c5c5d3]/30">
            <button
              type="button"
              onClick={() => setShowInviteModal(false)}
              className="px-4 py-2.5 rounded-lg border border-[#c5c5d3] text-[#131b2e] font-medium hover:bg-[#f2f3ff] text-[13px] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-[#131b2e] font-semibold text-[13px] shadow-xs cursor-pointer"
            >
              Kirim Undangan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
