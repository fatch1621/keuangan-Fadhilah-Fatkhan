import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { privacyMode, setPrivacyMode, setCurrentView, showToast } = useApp();

  // Personal Info Form State
  const [fullName, setFullName] = useState('Arya Chandra Prasetya');
  const [username, setUsername] = useState('@aryachandra.cf');
  const [email, setEmail] = useState('arya.chandra@wealth.id');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [location, setLocation] = useState('Jakarta Selatan, Indonesia');
  const [occupation, setOccupation] = useState('Tech Executive & Private Investor');

  // Preferences
  const [currency, setCurrency] = useState('IDR (Indonesian Rupiah - Rp)');
  const [numberFormat, setNumberFormat] = useState('Rp 1.000.000,00 (Standar Indonesia)');
  const [cycleDate, setCycleDate] = useState<'1' | '25'>('25');
  const [guardThreshold, setGuardThreshold] = useState(90);

  // Notifications
  const [pushNotif, setPushNotif] = useState(true);
  const [waNotif, setWaNotif] = useState(true);
  const [emailSummary, setEmailSummary] = useState(true);
  const [aiAdvisory, setAiAdvisory] = useState(true);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('CapitalFlow2024!');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    showToast('Semua pengaturan profil dan preferensi berhasil disimpan.');
  };

  const handleReset = () => {
    setFullName('Arya Chandra Prasetya');
    setUsername('@aryachandra.cf');
    setEmail('arya.chandra@wealth.id');
    setPhone('+62 812-3456-7890');
    setLocation('Jakarta Selatan, Indonesia');
    setOccupation('Tech Executive & Private Investor');
    setGuardThreshold(90);
    showToast('Perubahan telah direset ke nilai awal.');
  };

  return (
    <div className="space-y-6 max-w-7xl w-full mx-auto">
      {/* 1. Header & Actions Section */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#c5c5d3]/50">
        <div>
          <div className="flex items-center gap-2 text-[12px] text-[#757682] mb-1">
            <span
              onClick={() => setCurrentView('dashboard')}
              className="hover:text-[#00236f] cursor-pointer transition-colors"
            >
              Capital Flow
            </span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#00236f] font-semibold">Pengaturan Profil</span>
          </div>
          <h2 className="text-[28px] font-bold text-[#131b2e] tracking-tight">Profil Pengguna &amp; Preferensi Akun</h2>
          <p className="text-[14px] text-[#757682] mt-1 max-w-3xl">
            Kelola informasi pribadi, preferensi mata uang, notifikasi limit belanja, dan keamanan autentikasi akun Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg border border-[#c5c5d3] bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-[13px] font-medium transition-all shadow-xs cursor-pointer"
          >
            Reset Perubahan
          </button>
          <button
            onClick={() => handleSaveAll()}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-[13px] font-semibold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </section>

      {/* 2. Two-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN (~35% -> 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Identity Card */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#1e3a8a] via-[#0051d5] to-[#1e3a8a] opacity-95"></div>
            <div className="relative pt-6 flex flex-col items-center text-center">
              {/* Avatar with Verified Ring */}
              <div className="relative mb-3">
                <img
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcX8fBQEMTMHnvjjeXyiOhMPaGhpe-LOJ38IuVuKIgqxv0zoq4cj2UNsZzFlBtXyBTacBmU5Z3Y-2BZtqsLjbQY51y4RgFgZoKy0E5cbUOLFyHSvVpy2RvuqKNgFPC7UGLdaEyP-7xOfy0sLKkBhSmkGPEpNAaS7oj4OXzoEh6e23nS-PU62pz_2SUt2OEJvTCRTDYMvM0XMpa6XpuBw3Tq8lhCLodiExqmg-ezFMWDlkuQfRKgfxzEQ"
                  alt="Arya Chandra"
                />
                <span
                  className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white"
                  title="Terverifikasi"
                >
                  <span className="material-symbols-outlined text-xs fill-1">verified</span>
                </span>
              </div>

              {/* Change Photo CTA */}
              <button
                onClick={() => showToast('Pilih foto profil baru (PNG/JPG maks 2MB).')}
                className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#444651] text-[11px] border border-[#c5c5d3] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs">photo_camera</span>
                <span>Edit Foto</span>
              </button>

              <h3 className="text-[20px] font-bold text-[#131b2e]">Arya Chandra</h3>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#eaedff] text-[#00236f] font-semibold">
                  Super Admin &amp; Account Owner
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#757682]">
                <span className="material-symbols-outlined text-sm">mail</span>
                <span>arya.chandra@wealth.id</span>
                <span className="material-symbols-outlined text-xs text-emerald-600 fill-1">check_circle</span>
              </div>

              {/* Sovereign Tier Pill */}
              <div className="mt-4 w-full p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 fill-1">workspace_premium</span>
                  <div className="text-left">
                    <p className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">Tier Hak Akses</p>
                    <p className="text-[13px] text-amber-950 font-semibold">Sovereign Private Tier</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-amber-600 text-sm">shield</span>
              </div>

              <p className="mt-4 text-[11px] text-[#757682]">
                Bergabung sejak Januari 2023 (1 thn 10 bln)
              </p>
            </div>
          </div>

          {/* Ringkasan Keamanan & Snapshot Status */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h4 className="text-[16px] font-bold text-[#131b2e]">Snapshot Keamanan</h4>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Aman 100%
              </span>
            </div>

            {/* 2FA Status */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#0051d5] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-lg">verified_user</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#131b2e]">Autentikasi 2FA</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Aktif</span>
                </div>
                <p className="text-[12px] text-[#757682]">Google Authenticator App</p>
              </div>
            </div>

            {/* Password Age */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-lg">lock_clock</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#131b2e]">Kata Sandi</span>
                  <span className="text-[11px] text-[#757682]">Diperbarui</span>
                </div>
                <p className="text-[12px] text-[#757682]">Terakhir diubah 45 hari yang lalu</p>
              </div>
            </div>

            {/* Backup Vault */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-lg">cloud_sync</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#131b2e]">Cadangan Data</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Otomatis</span>
                </div>
                <p className="text-[12px] text-[#757682]">Harian ke Capital Vault Enkripsi</p>
              </div>
            </div>
          </div>

          {/* Aksi Cepat Akun */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-6 shadow-sm space-y-3">
            <h4 className="text-[16px] font-bold text-[#131b2e] mb-2">Aksi Cepat Akun</h4>
            <button
              onClick={() => {
                const el = document.getElementById('new-pass-input');
                el?.focus();
                showToast('Arahkan ke bagian ganti kata sandi di kanan.');
              }}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-[#c5c5d3]/70 hover:bg-[#f2f3ff] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00236f] group-hover:text-[#0051d5]">key</span>
                <span className="text-[13px] text-[#131b2e] font-medium">Ubah Kata Sandi</span>
              </div>
              <span className="material-symbols-outlined text-[#757682] group-hover:translate-x-0.5 transition-transform text-sm">
                arrow_forward_ios
              </span>
            </button>
            <button
              onClick={() => setCurrentView('member')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-[#c5c5d3]/70 hover:bg-[#f2f3ff] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00236f] group-hover:text-[#0051d5]">devices</span>
                <span className="text-[13px] text-[#131b2e] font-medium">Kelola Sesi Login (Tautkan ke Member)</span>
              </div>
              <span className="material-symbols-outlined text-[#757682] group-hover:translate-x-0.5 transition-transform text-sm">
                arrow_forward_ios
              </span>
            </button>
            <button
              onClick={() => showToast('Mengekspor berkas data keuangan terenkripsi (JSON)...')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-[#c5c5d3]/70 hover:bg-[#f2f3ff] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#00236f] group-hover:text-[#0051d5]">
                  download_for_offline
                </span>
                <span className="text-[13px] text-[#131b2e] font-medium">Unduh Salinan Data Pribadi (JSON/CSV)</span>
              </div>
              <span className="material-symbols-outlined text-[#757682] group-hover:translate-x-0.5 transition-transform text-sm">
                arrow_forward_ios
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (~65% -> 8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Card 1: Informasi Pribadi & Kontak */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f]">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#131b2e]">Informasi Pribadi &amp; Kontak</h3>
                  <p className="text-[12px] text-[#757682]">Data legalitas profil yang digunakan dalam laporan fiskal keluarga &amp; portofolio</p>
                </div>
              </div>
              <span
                onClick={() => showToast('Mode edit profil aktif.')}
                className="text-[12px] text-[#0051d5] font-semibold cursor-pointer hover:underline"
              >
                Edit Langsung
              </span>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Nama Lengkap</label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#757682] text-lg">person</span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Username / ID Finansial</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#757682] text-lg">
                    alternate_email
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Alamat Email Utama</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-emerald-600 text-lg">
                    check_circle
                  </span>
                </div>
                <p className="text-[11px] text-[#757682] mt-1">Digunakan untuk notifikasi transaksi &amp; laporan bulanan</p>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Nomor WhatsApp / SMS Peringatan</label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-emerald-600 text-lg">
                    verified
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">done</span> Terverifikasi untuk Alert OTP &amp; Budget Guard
                </p>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Alamat / Domisili</label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#757682] text-lg">
                    location_on
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Pekerjaan / Sumber Utama</label>
                <div className="relative">
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#757682] text-lg">work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Preferensi Finansial & Mata Uang */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-7 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-[#eaedff] mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f]">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#131b2e]">Preferensi Finansial &amp; Mata Uang</h3>
                <p className="text-[12px] text-[#757682]">
                  Konfigurasi visualisasi nominal, batas budget amplop, dan siklus gaji bulanan
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Mata Uang Utama</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none cursor-pointer"
                  >
                    <option>IDR (Indonesian Rupiah - Rp)</option>
                    <option>USD (US Dollar - $)</option>
                    <option>SGD (Singapore Dollar - S$)</option>
                    <option>EUR (Euro - €)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Format Angka &amp; Titik Desimal</label>
                  <select
                    value={numberFormat}
                    onChange={(e) => setNumberFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none cursor-pointer"
                  >
                    <option>Rp 1.000.000,00 (Standar Indonesia)</option>
                    <option>Rp 1,000,000.00 (Standar Internasional)</option>
                    <option>Rp 1.000.000 (Tanpa Desimal)</option>
                  </select>
                </div>
              </div>

              {/* Awal Siklus Anggaran Bulanan */}
              <div>
                <label className="block text-[13px] text-[#131b2e] mb-2 font-medium">Awal Siklus Anggaran Bulanan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    onClick={() => setCycleDate('1')}
                    className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      cycleDate === '1' ? 'border-2 border-[#0051d5] bg-[#f2f3ff]' : 'border-[#c5c5d3]/70 hover:border-[#c5c5d3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cycle_date"
                      checked={cycleDate === '1'}
                      onChange={() => setCycleDate('1')}
                      className="text-[#0051d5] focus:ring-[#0051d5]"
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-[#131b2e]">Tanggal 1 Setiap Bulan</div>
                      <div className="text-[11px] text-[#757682]">Kalender standar konvensional (1 - 31)</div>
                    </div>
                  </label>

                  <label
                    onClick={() => setCycleDate('25')}
                    className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      cycleDate === '25' ? 'border-2 border-[#0051d5] bg-[#f2f3ff]' : 'border-[#c5c5d3]/70 hover:border-[#c5c5d3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cycle_date"
                      checked={cycleDate === '25'}
                      onChange={() => setCycleDate('25')}
                      className="text-[#0051d5] focus:ring-[#0051d5]"
                    />
                    <div>
                      <div className="text-[13px] font-semibold text-[#00236f]">Tanggal 25 Setiap Bulan (Payroll)</div>
                      <div className="text-[11px] text-[#444651]">Siklus disinkronkan dengan hari gajian</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Ambang Peringatan Budget Guard */}
              <div className="p-4 rounded-lg bg-[#f2f3ff] border border-[#c5c5d3]/60">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[13px] font-semibold text-[#131b2e]">Ambang Peringatan Budget Guard</span>
                    <p className="text-[12px] text-[#757682]">Beri sinyal peringatan dini saat pengeluaran mendekati kuota batas</p>
                  </div>
                  <span className="text-[18px] font-bold text-[#00236f] font-mono tabular-nums">{guardThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={guardThreshold}
                  onChange={(e) => setGuardThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-[#dce1ff] rounded-lg appearance-none cursor-pointer accent-[#0051d5]"
                />
                <div className="flex justify-between text-[11px] text-[#757682] mt-1.5 font-medium">
                  <span>50% (Sangat Ketat)</span>
                  <span>75% (Moderat)</span>
                  <span className="font-semibold text-[#00236f]">90% (Rekomendasi Sovereign)</span>
                </div>
              </div>

              {/* Privacy Mode Toggle */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-[13px] font-semibold text-[#131b2e]">Tampilan Saldo Sensitif (Privacy Mode)</div>
                  <div className="text-[12px] text-[#757682]">
                    Sembunyikan nominal saldo (••••••) di layar utama jika terdeteksi aktivitas publik
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyMode}
                    onChange={(e) => {
                      setPrivacyMode(e.target.checked);
                      showToast(e.target.checked ? 'Privacy Mode diaktifkan.' : 'Privacy Mode dinonaktifkan.');
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Card 3: Notifikasi & Peringatan Pintar */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-7 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-[#eaedff] mb-6">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f]">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#131b2e]">Notifikasi &amp; Peringatan Pintar</h3>
                <p className="text-[12px] text-[#757682]">Kendalikan kanal push notification dan frekuensi laporan ringkasan otomatis</p>
              </div>
            </div>

            <div className="divide-y divide-[#eaedff]">
              {/* Item 1 */}
              <div className="flex items-center justify-between py-3.5">
                <div>
                  <div className="text-[13px] font-semibold text-[#131b2e]">Push Notification Transaksi Baru</div>
                  <div className="text-[12px] text-[#757682]">Pemberitahuan instan saat ada pengeluaran atau pemasukan baru yang tercatat</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={pushNotif}
                    onChange={(e) => setPushNotif(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between py-3.5">
                <div>
                  <div className="text-[13px] font-semibold text-[#131b2e]">Notifikasi Limit Anggaran / WhatsApp Alert</div>
                  <div className="text-[12px] text-[#757682]">Pesan peringatan langsung ke nomor WhatsApp terverifikasi (+62 812-3456-7890)</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={waNotif}
                    onChange={(e) => setWaNotif(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between py-3.5">
                <div>
                  <div className="text-[13px] font-semibold text-[#131b2e]">Laporan Rekap Mingguan via Email</div>
                  <div className="text-[12px] text-[#757682]">Ringkasan arus kas setiap hari Minggu pukul 20:00 WIB ke arya.chandra@wealth.id</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={emailSummary}
                    onChange={(e) => setEmailSummary(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-between py-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-[#131b2e]">AI Financial Advisory Insight Bulanan</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-100 text-amber-900 font-semibold border border-amber-300">
                      Pro Sovereign
                    </span>
                  </div>
                  <div className="text-[12px] text-[#757682]">
                    Analisis prediktif peluang penghematan dan rebalancing alokasi portofolio investasi
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                  <input
                    type="checkbox"
                    checked={aiAdvisory}
                    onChange={(e) => setAiAdvisory(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Card 4: Zona Keamanan Akun & Ganti Password */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-7 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#eaedff]">
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f]">
                <span className="material-symbols-outlined">lock_reset</span>
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#131b2e]">Zona Keamanan Akun</h3>
                <p className="text-[12px] text-[#757682]">Perbarui kata sandi secara berkala untuk menjaga kekebalan akses brankas finansial Anda</p>
              </div>
            </div>

            {/* Password Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Sandi Saat Ini</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    title={showCurrentPass ? 'Sembunyikan kata sandi' : 'Perlihatkan kata sandi'}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#757682] hover:text-[#0051d5] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showCurrentPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Sandi Baru</label>
                <div className="relative">
                  <input
                    id="new-pass-input"
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 12 karakter"
                    className="w-full pl-3.5 pr-10 py-2 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    title={showNewPass ? 'Sembunyikan kata sandi' : 'Perlihatkan kata sandi'}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#757682] hover:text-[#0051d5] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showNewPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-[#131b2e] mb-1.5 font-medium">Konfirmasi Sandi Baru</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi sandi baru"
                    className="w-full pl-3.5 pr-10 py-2 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    title={showConfirmPass ? 'Sembunyikan kata sandi' : 'Perlihatkan kata sandi'}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#757682] hover:text-[#0051d5] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showConfirmPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Bar */}
            <div className="p-3.5 rounded-lg bg-[#f2f3ff] border border-[#c5c5d3]/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                <span className="text-[13px] text-[#131b2e]">Kekuatan Sandi yang Disarankan:</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Sangat Kuat
                </span>
              </div>
              <div className="w-full md:w-48 bg-[#dce1ff] h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-4/5 rounded-full"></div>
              </div>
            </div>

            {/* Danger Zone Section */}
            <div className="pt-6 mt-6 border-t border-red-200">
              <div className="rounded-xl border border-red-200 bg-red-50/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#ba1a1a] text-[16px] font-bold">
                    <span className="material-symbols-outlined">warning</span>
                    <span>Zona Bahaya: Deaktivasi atau Hapus Akun</span>
                  </div>
                  <p className="text-[12px] text-[#757682] mt-1">
                    Menghapus vault akan melenyapkan seluruh riwayat transaksi, catatan anggaran, dan pembagian laporan member secara permanen.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('APAKAH ANDA YAKIN? Tindakan ini akan mengosongkan seluruh brankas finansial secara permanen.')) {
                      showToast('Permintaan deaktivasi vault dibatalkan demi keamanan.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-lg bg-white border border-[#ba1a1a]/50 text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white text-[13px] font-semibold transition-all shrink-0 shadow-2xs cursor-pointer"
                >
                  Deaktivasi Vault
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Floating Save Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <span className="text-[12px] text-[#757682] mr-2">Semua perubahan otomatis tersimpan sebagai draft</span>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg border border-[#c5c5d3] bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-[13px] font-medium transition-colors shadow-xs cursor-pointer"
            >
              Batalkan
            </button>
            <button
              onClick={() => handleSaveAll()}
              className="px-6 py-2.5 rounded-lg bg-[#00236f] hover:bg-[#0051d5] text-white text-[13px] font-semibold shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Simpan Semua Pengaturan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Copyright Note */}
      <footer className="mt-auto py-6 border-t border-[#c5c5d3]/40 bg-white text-center text-[12px] text-[#757682]">
        © 2024 Capital Flow Wealth Management. Hak cipta dilindungi undang-undang. Enkripsi AES-256 Terverifikasi.
      </footer>
    </div>
  );
};
