import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const LoginView: React.FC = () => {
  const { login, loginWithGoogle, setCurrentView, showToast } = useApp();
  const [email, setEmail] = useState('arya.chandra@wealth.id');
  const [password, setPassword] = useState('CapitalFlow2024!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] antialiased min-h-screen flex flex-col justify-between select-none">
      {/* Institutional Top Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#c5c5d3]/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Crest & Identity */}
          <div className="flex items-center gap-3">
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
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-[#c5c5d3]/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[600px]">
          {/* Left Column: Visual Showcase & Brand Trust (5 Cols - Desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1e3a8a] via-[#00236f] to-[#00164e] p-8 sm:p-10 text-white flex-col justify-between relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#316bf3]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header Crest */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-amber-200 mb-6 border border-white/15">
                <span className="material-symbols-outlined text-sm fill-1">auto_awesome</span>
                <span>Kebijaksanaan Finansial</span>
              </div>
              <h2 className="font-bold text-2xl sm:text-3xl text-white leading-tight tracking-tight mb-3">
                Membangun Kebebasan Finansial Sejati
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Kelola arus kas keluarga Anda dengan ketenangan pikiran, presisi, dan perencanaan terstruktur.
              </p>
            </div>

            {/* Financial Quote Card */}
            <div className="my-8 relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 flex flex-col justify-between">
              <div className="text-amber-400 mb-3">
                <span className="material-symbols-outlined text-3xl">format_quote</span>
              </div>
              <blockquote className="text-[14px] font-medium text-white leading-relaxed italic mb-4">
                &ldquo;Bukan tentang seberapa banyak uang yang Anda hasilkan, melainkan seberapa banyak yang Anda pertahankan dan investasikan untuk masa depan.&rdquo;
              </blockquote>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-amber-200">The Psychology of Money</span>
                <span className="text-slate-300">Disiplin &amp; Visi Finansial</span>
              </div>
            </div>

            {/* Bottom Trust Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-base">verified</span>
                <span>Eksklusif &amp; Terproteksi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-300 text-base">lock</span>
                <span>Privasi Maksimal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Form & Authentication (7 Cols) */}
          <div className="col-span-1 lg:col-span-7 p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-white">
            <div className="max-w-md w-full mx-auto my-auto">
              <div className="mb-8">
                <h1 className="font-bold text-2xl sm:text-3xl text-[#00236f] tracking-tight mb-2">
                  Selamat Datang Kembali
                </h1>
                <p className="text-sm text-[#757682]">
                  Masukkan kredensial Anda untuk masuk ke akun Capital Flow.
                </p>
              </div>

              {/* Login Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Username / Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">
                    Username atau Email <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">person</span>
                    </div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Username atau email Anda"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 text-sm font-medium text-[#131b2e] bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[#131b2e]">
                      Kata Sandi <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast('Instruksi pemulihan kata sandi telah dikirim ke email.')}
                      className="text-xs font-semibold text-[#0051d5] hover:underline cursor-pointer"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757682]">
                      <span className="material-symbols-outlined text-lg">lock</span>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi Anda"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#c5c5d3] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 text-sm font-medium text-[#131b2e] bg-white transition-all outline-none"
                    />
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
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0051d5] focus:ring-[#0051d5]/30 border-[#c5c5d3]"
                    />
                    <span className="text-xs text-[#131b2e] font-medium">Ingat Saya</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#00236f] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#0051d5] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:translate-y-px"
                >
                  <span>Masuk</span>
                  <span className="material-symbols-outlined text-lg text-amber-400">arrow_forward</span>
                </button>

                {/* Google Sign In Option */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="border-t border-[#c5c5d3]/50 w-full"></div>
                  <span className="bg-white px-3 text-[11px] text-[#757682] uppercase tracking-wider font-semibold whitespace-nowrap">
                    atau masuk dengan
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
                  <span>Lanjutkan dengan Google</span>
                </button>
              </form>
            </div>

            {/* Prominent Sign Up Option at Bottom */}
            <div className="mt-8 pt-6 border-t border-[#c5c5d3]/30 text-center">
              <p className="text-sm text-[#757682]">
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentView('register')}
                  className="font-semibold text-[#0051d5] hover:underline ml-1 cursor-pointer"
                >
                  Daftar Akun Baru
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
