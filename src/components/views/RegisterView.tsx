import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const RegisterView: React.FC = () => {
  const { login, loginWithGoogle, setCurrentView, showToast } = useApp();

  const [fullName, setFullName] = useState('Arya Chandra');
  const [email, setEmail] = useState('arya.chandra@wealth.id');
  const [phone, setPhone] = useState('+62 812-3456-7890');
  const [password, setPassword] = useState('CapitalFlow2024!');
  const [confirmPassword, setConfirmPassword] = useState('CapitalFlow2024!');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  // Password strength calculator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: 'Kosong', color: 'bg-slate-200', textClass: 'text-slate-400' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: 'Lemah', color: 'bg-red-500', textClass: 'text-red-600' };
    if (score === 2) return { score: 2, text: 'Sedang', color: 'bg-amber-500', textClass: 'text-amber-600' };
    if (score === 3) return { score: 3, text: 'Kuat', color: 'bg-blue-600', textClass: 'text-blue-600' };
    return { score: 4, text: 'Sangat Kuat', color: 'bg-emerald-600', textClass: 'text-emerald-700' };
  };

  const strength = getPasswordStrength(password);
  const isPasswordMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast('Harap setujui Syarat & Ketentuan untuk melanjutkan pendaftaran.');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    showToast(`Akun ${fullName} berhasil didaftarkan! Selamat datang di Capital Flow.`);
    login();
    setCurrentView('dashboard');
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] antialiased min-h-screen flex flex-col justify-between select-none">
      {/* Institutional Top Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#c5c5d3]/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Crest & Identity */}
          <div
            onClick={() => setCurrentView('login')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1e3a8a] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-amber-400 text-[24px] fill-1">
                account_balance_wallet
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#00236f] tracking-tight">Capital Flow</span>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                  PRIVATE TIER
                </span>
              </div>
              <p className="text-[12px] text-[#757682] font-medium">Wealth Management Platform</p>
            </div>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#757682] bg-[#f2f3ff] px-3 py-1.5 rounded-full border border-[#c5c5d3]/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium text-emerald-800">Sistem Keamanan TLS 1.3 Aktif</span>
            </div>

            <div className="flex items-center bg-[#f2f3ff] rounded-lg p-1 border border-[#c5c5d3]/40">
              <button
                type="button"
                onClick={() => setLang('ID')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  lang === 'ID' ? 'bg-white text-[#00236f] shadow-2xs' : 'text-[#757682] hover:text-[#131b2e]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  lang === 'EN' ? 'bg-white text-[#00236f] shadow-2xs' : 'text-[#757682] hover:text-[#131b2e]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 flex items-center justify-center py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-[#c5c5d3]/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[640px]">
          {/* Left Column: Visual Showcase & Brand Trust (5 Cols - Desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1e3a8a] via-[#00236f] to-[#00164e] p-8 sm:p-10 text-white flex-col justify-between relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#316bf3]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header Crest */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-amber-200 mb-6 border border-white/15">
                <span className="material-symbols-outlined text-sm fill-1">verified_user</span>
                <span>Pendaftaran Akun Baru</span>
              </div>
              <h2 className="font-bold text-2xl sm:text-3xl text-white leading-tight tracking-tight mb-3">
                Mulai Perjalanan Wealth Management Anda
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Bergabunglah dengan ribuan keluarga terkemuka yang mengamankan masa depan mereka dengan Capital Flow.
              </p>
            </div>

            {/* Feature Highlights Card */}
            <div className="my-6 relative z-10 bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">dashboard_customize</span>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white">Sistem Amplop Digital Cerdas</h4>
                  <p className="text-[11px] text-slate-300">Plotting anggaran bebas defisit dengan real-time warning</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2.5 border-t border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">group</span>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white">Kolaborasi Keluarga Multi-Akun</h4>
                  <p className="text-[11px] text-slate-300">Akses aman dengan kontrol peran dan log audit terpusat</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2.5 border-t border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-blue-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">insights</span>
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-white">Laporan Arus Kas Konsolidasi</h4>
                  <p className="text-[11px] text-slate-300">Analisis surplus kas dan rasio likuiditas otomatis</p>
                </div>
              </div>
            </div>

            {/* Bottom Trust Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-base">verified</span>
                <span>Standar ISO/IEC 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-300 text-base">lock</span>
                <span>Privasi Data Bank-Grade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Register Form (7 Cols) */}
          <div className="col-span-1 lg:col-span-7 p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
            <div className="max-w-md w-full mx-auto my-auto">
              <div className="mb-6">
                <h1 className="font-bold text-2xl sm:text-3xl text-[#00236f] tracking-tight mb-2">
                  Daftar Akun Baru
                </h1>
                <p className="text-sm text-[#757682]">
                  Lengkapi data Anda untuk membuka akses brankas finansial pribadi &amp; keluarga.
                </p>
              </div>

              {/* Registration Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                    Nama Lengkap <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">badge</span>
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Arya Chandra"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 text-sm font-medium text-[#131b2e] bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                    Alamat Email <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">mail</span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@domain.com"
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 text-sm font-medium text-[#131b2e] bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">
                    Nomor WhatsApp / Ponsel
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">phone</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+62 812-3456-7890"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 text-sm font-medium text-[#131b2e] bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password Field with Active Visibility Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#131b2e]">
                      Kata Sandi <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <span className={`text-[11px] font-semibold ${strength.textClass}`}>
                      {strength.text}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">lock</span>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      required
                      className="w-full pl-10 pr-10 py-2 rounded-lg border border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 text-sm font-medium text-[#131b2e] bg-white transition-all outline-none"
                    />
                    {/* Perlihatkan / Sembunyikan Sandi Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Sembunyikan kata sandi' : 'Perlihatkan kata sandi'}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#757682] hover:text-[#0051d5] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                    <div className={`h-1 rounded-full transition-all ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`}></div>
                    <div className={`h-1 rounded-full transition-all ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`}></div>
                    <div className={`h-1 rounded-full transition-all ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`}></div>
                    <div className={`h-1 rounded-full transition-all ${strength.score >= 4 ? strength.color : 'bg-slate-200'}`}></div>
                  </div>
                </div>

                {/* Confirm Password Field with Active Visibility Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#131b2e]">
                      Konfirmasi Kata Sandi <span className="text-[#ba1a1a]">*</span>
                    </label>
                    {confirmPassword && (
                      <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${isPasswordMatch ? 'text-emerald-600' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-xs">
                          {isPasswordMatch ? 'check_circle' : 'cancel'}
                        </span>
                        {isPasswordMatch ? 'Cocok' : 'Tidak Cocok'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">lock_reset</span>
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ketik ulang kata sandi"
                      required
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border text-sm font-medium text-[#131b2e] bg-white transition-all outline-none ${
                        confirmPassword && !isPasswordMatch
                          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20'
                      }`}
                    />
                    {/* Perlihatkan / Sembunyikan Konfirmasi Sandi Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      title={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Perlihatkan kata sandi'}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#757682] hover:text-[#0051d5] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-[#0051d5] focus:ring-[#0051d5]/30 border-[#c5c5d3]"
                    />
                    <span className="text-xs text-[#444651] leading-tight">
                      Saya menyetujui <span className="text-[#0051d5] font-semibold hover:underline">Syarat Layanan</span> dan <span className="text-[#0051d5] font-semibold hover:underline">Kebijakan Privasi Finansial</span> Capital Flow.
                    </span>
                  </label>
                </div>

                {/* Submit Register Button */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#00236f] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0051d5] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:translate-y-px"
                  >
                    <span>Daftar Sekarang</span>
                    <span className="material-symbols-outlined text-lg text-amber-400">how_to_reg</span>
                  </button>

                  {/* Google Sign In Option */}
                  <div className="relative my-2 flex items-center justify-center">
                    <div className="border-t border-[#c5c5d3]/50 w-full"></div>
                    <span className="bg-white px-3 text-[11px] text-[#757682] uppercase tracking-wider font-semibold whitespace-nowrap">
                      atau daftar dengan
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-[13px] text-[#131b2e] bg-white border border-[#c5c5d3] hover:bg-[#f2f3ff] hover:border-[#0051d5]/40 shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Daftar Cepat dengan Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      showToast('Pendaftaran demo cepat berhasil!');
                      login();
                      setCurrentView('dashboard');
                    }}
                    className="w-full py-2 px-4 rounded-xl font-medium text-xs text-[#00236f] bg-[#eaedff] hover:bg-[#dce1ff] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">flash_on</span>
                    <span>Daftar Cepat Akun Demo (1-Klik)</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Back to Login Link */}
            <div className="mt-6 pt-4 border-t border-[#c5c5d3]/30 text-center">
              <p className="text-sm text-[#757682]">
                Sudah memiliki akun terdaftar?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="font-semibold text-[#0051d5] hover:underline ml-1 cursor-pointer"
                >
                  Masuk di Sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Security Footer */}
      <footer className="w-full bg-[#f2f3ff] border-t border-[#c5c5d3]/30 py-4 text-xs text-[#757682]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#0051d5]">verified</span>
            <span>© 2024 Capital Flow Wealth Management. Enkripsi End-to-End TLS 1.3 &amp; Standar Keamanan ISO/IEC 27001.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#00236f] cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-[#00236f] cursor-pointer">Audit Kepatuhan</span>
            <span>•</span>
            <span className="hover:text-[#00236f] cursor-pointer">Status Server</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
