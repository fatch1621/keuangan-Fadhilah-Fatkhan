import React from 'react';
import { useApp } from '../../context/AppContext';

export const PlaningView: React.FC = () => {
  const { envelopes, formatRupiah, setShowQuickAdjusterModal, showToast } = useApp();

  return (
    <div className="space-y-8 max-w-[1440px] w-full mx-auto">
      {/* SECTION 1: HEADER & PERIOD ACTIONS */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-[#dae2fd] text-[#00236f]">
              Anggaran Presisi
            </span>
            <span className="text-[12px] text-[#757682]">• Siklus Finansial Q4</span>
          </div>
          <h1 className="text-[28px] font-bold text-[#131b2e] tracking-tight">Perencanaan Keuangan Bulanan</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Periode Selector Dropdown */}
          <div className="relative flex items-center bg-white border border-[#c5c5d3] rounded-lg px-3 py-2 shadow-xs text-[13px] text-[#131b2e]">
            <span className="material-symbols-outlined text-[#00236f] mr-2 text-[20px]">calendar_month</span>
            <span className="font-semibold mr-2">Bulan Ini (Oktober 2024)</span>
            <span className="material-symbols-outlined text-[#757682] text-[18px]">expand_more</span>
          </div>

          {/* Duplikat Plan Lalu */}
          <button
            onClick={() => showToast('Rencana keuangan bulan September berhasil diduplikasi.')}
            className="flex items-center gap-2 bg-white border border-[#c5c5d3] text-[#131b2e] px-4 py-2 rounded-lg text-[13px] font-medium hover:bg-[#f2f3ff] transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            <span>Duplikat Plan Lalu</span>
          </button>

          {/* + Buat Rencana Baru */}
          <button
            onClick={() => setShowQuickAdjusterModal(true)}
            className="flex items-center gap-2 bg-[#1e3a8a] text-white px-5 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#0051d5] transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Buat Rencana Baru</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: PLOTTING METRICS HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Allocation Card (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#c5c5d3]/70 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#eaedff] gap-2">
            <div>
              <span className="text-[11px] text-[#757682] uppercase tracking-wider font-semibold">
                Distribusi Komitmen Kas
              </span>
              <p className="text-[22px] font-bold text-[#131b2e]">Total Dana Terplot</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                90% Terencana Aman
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="space-y-1">
              <p className="text-[13px] text-[#757682]">Realisasi Ploting Anggaran</p>
              <div className="text-[32px] font-bold text-[#00236f] tracking-tight font-mono">
                {formatRupiah(24000000)}
              </div>
              <p className="text-[12px] text-[#757682]">
                Dari estimasi pendapatan <span className="font-semibold text-[#131b2e]">{formatRupiah(28500000)}</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-[#444651]">Rasio Alokasi (Plotting Ratio)</span>
                <span className="font-bold text-[#00236f] font-mono">84.2%</span>
              </div>
              {/* Multi-segment progress indicator */}
              <div className="w-full h-3 bg-[#eaedff] rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-[#00236f]" style={{ width: '33%' }} title="Kebutuhan Pokok: Rp 8.0M"></div>
                <div className="h-full bg-[#0051d5]" style={{ width: '31%' }} title="Tabungan & Investasi: Rp 7.5M"></div>
                <div className="h-full bg-[#1e3a8a]" style={{ width: '17%' }} title="Cicilan: Rp 4.0M"></div>
                <div className="h-full bg-[#316bf3]" style={{ width: '10%' }} title="Darurat: Rp 2.5M"></div>
                <div className="h-full bg-amber-500" style={{ width: '9%' }} title="Gaya Hidup: Rp 2.0M"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#757682]">
                <span>Rp 0</span>
                <span>Batas Aman: {formatRupiah(28500000)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Micro-legend */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#eaedff] text-[12px] text-[#444651]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#00236f]"></span> Pokok
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#0051d5]"></span> Investasi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#1e3a8a]"></span> Utang
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#316bf3]"></span> Darurat
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span> Gaya Hidup
            </span>
          </div>
        </div>

        {/* Unallocated Surplus Card (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-amber-500/10 via-white to-white border border-amber-300 rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                ★ SURPLUS BERSIH
              </span>
              <span className="material-symbols-outlined text-amber-600 text-[24px]">account_balance_wallet</span>
            </div>
            <div className="mt-4">
              <h3 className="text-[14px] text-[#444651] font-medium">Sisa Dana Siap Diplot (Unallocated Surplus)</h3>
              <div className="text-[32px] font-bold text-amber-950 mt-1 font-mono">
                {formatRupiah(4500000)}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60">
            <p className="text-[12px] text-[#757682] mb-3 leading-relaxed">
              Dana likuid mengambang tanpa komitmen belanja. Disarankan dialokasikan ke portofolio likuid atau tabungan pensiun.
            </p>
            <button
              onClick={() => setShowQuickAdjusterModal(true)}
              className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-[#131b2e] font-semibold text-[13px] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Plotkan Dana Sekarang</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: BUDGET ENVELOPES GRID (Amplop Anggaran) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] text-[#131b2e] font-bold">Kategori &amp; Amplop Anggaran (Budget Envelopes)</h2>
            <p className="text-[13px] text-[#757682]">Disiplin partisi kas per pos pengeluaran bulan ini.</p>
          </div>
          <span className="text-[12px] text-[#757682] font-semibold">{envelopes.length} Amplop Aktif</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {envelopes.map((env) => {
            const ratio = Math.min(100, Math.round((env.spent / env.target) * 100));
            const remaining = Math.max(0, env.target - env.spent);

            return (
              <div
                key={env.id}
                className={`bg-white border rounded-xl p-5 shadow-xs hover:border-[#0051d5] transition-all ${
                  env.badgeType === 'warning' ? 'border-amber-300' : 'border-[#c5c5d3]/70'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        env.name.includes('Pokok')
                          ? 'bg-blue-50 text-[#00236f]'
                          : env.name.includes('Investasi')
                          ? 'bg-emerald-50 text-emerald-700'
                          : env.name.includes('Cicilan')
                          ? 'bg-indigo-50 text-[#1e3a8a]'
                          : env.name.includes('Darurat')
                          ? 'bg-blue-50 text-[#0051d5]'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{env.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-[#131b2e]">{env.name}</h3>
                      <span className="text-[11px] text-[#757682]">{env.subtitle}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      env.badgeType === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : env.badgeType === 'success'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {env.badge || `${ratio}%`}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[12px] text-[#757682]">
                      {env.name.includes('Investasi') ? 'Terisi Penuh' : env.name.includes('Cicilan') ? 'Terbayar Sempurna' : 'Terpakai'}
                    </span>
                    <span
                      className={`text-[13px] font-bold font-mono ${
                        env.badgeType === 'warning'
                          ? 'text-amber-700'
                          : env.name.includes('Investasi')
                          ? 'text-emerald-700'
                          : 'text-[#131b2e]'
                      }`}
                    >
                      {formatRupiah(env.spent)}
                    </span>
                  </div>

                  <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        env.badgeType === 'warning'
                          ? 'bg-amber-500'
                          : env.name.includes('Investasi')
                          ? 'bg-emerald-600'
                          : env.name.includes('Cicilan')
                          ? 'bg-[#1e3a8a]'
                          : env.name.includes('Darurat')
                          ? 'bg-[#316bf3]'
                          : 'bg-[#00236f]'
                      }`}
                      style={{ width: `${ratio}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-[#757682]">Target: {formatRupiah(env.target)}</span>
                    <span className={remaining > 0 ? 'text-emerald-700 font-semibold' : 'text-[#757682]'}>
                      {remaining > 0 ? `Sisa: ${formatRupiah(remaining)}` : 'Target Tercapai'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-center justify-between text-[12px] text-[#757682]">
                  <span className={env.badgeType === 'warning' ? 'text-amber-700 font-medium' : ''}>
                    {env.note}
                  </span>
                  <button
                    onClick={() => setShowQuickAdjusterModal(true)}
                    className="text-[#0051d5] font-semibold hover:underline cursor-pointer"
                  >
                    {env.badgeType === 'warning' ? '+ Tambah Ploting' : 'Ubah Ploting'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add New Envelope Card Button */}
          <div
            onClick={() => setShowQuickAdjusterModal(true)}
            className="cursor-pointer border-2 border-dashed border-[#c5c5d3] hover:border-[#0051d5] rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all bg-[#faf8ff] hover:bg-[#f2f3ff] min-h-[190px] group"
          >
            <div className="w-12 h-12 rounded-full bg-[#eaedff] group-hover:bg-[#dce1ff] flex items-center justify-center text-[#00236f] mb-3 transition-colors">
              <span className="material-symbols-outlined text-[24px]">add</span>
            </div>
            <p className="text-[13px] font-bold text-[#00236f]">Buat Amplop Baru</p>
            <p className="text-[11px] text-[#757682] mt-1">Pisahkan pos pengeluaran spesifik lain</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: FORECAST / SIMULASI KEUANGAN (Next 30 Days Cashflow Runway) */}
      <section className="bg-white border border-[#c5c5d3]/70 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#eaedff] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-bold text-[#131b2e]">Forecast &amp; Simulasi Keuangan 1 Bulan ke Depan</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Runway Safe Indicator: 4.8 Bulan
              </span>
            </div>
            <p className="text-[13px] text-[#757682] mt-1">
              Proyeksi saldo akhir siklus Oktober berdasarkan laju pengeluaran historis (burn rate harian: ~Rp 774.000).
            </p>
          </div>

          <div className="flex items-center gap-4 text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00236f]"></span>
              <span className="text-[#131b2e]">Proyeksi Saldo Optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="text-[#131b2e]">Estimasi Terburuk (Over-budget)</span>
            </div>
          </div>
        </div>

        {/* Metric Summary Chips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="p-4 rounded-lg bg-[#faf8ff] border border-[#c5c5d3]/60">
            <span className="text-[11px] text-[#757682]">Estimasi Saldo Akhir Bulan</span>
            <p className="text-[20px] font-bold text-[#00236f] mt-1 font-mono">Rp 122.500.000</p>
            <span className="text-[11px] text-emerald-700 font-medium">↗ Stabil (+Rp 4.5M Surplus Bersih)</span>
          </div>
          <div className="p-4 rounded-lg bg-[#faf8ff] border border-[#c5c5d3]/60">
            <span className="text-[11px] text-[#757682]">Laju Belanja Harian (Burn-rate)</span>
            <p className="text-[20px] font-bold text-[#131b2e] mt-1 font-mono">Rp 774.193 / hari</p>
            <span className="text-[11px] text-[#757682]">Di bawah limit maksimum (Rp 900.000)</span>
          </div>
          <div className="p-4 rounded-lg bg-[#faf8ff] border border-[#c5c5d3]/60">
            <span className="text-[11px] text-[#757682]">Ketahanan Kas Likuid</span>
            <p className="text-[20px] font-bold text-[#131b2e] mt-1 font-mono">145 Hari</p>
            <span className="text-[11px] text-emerald-700 font-medium">Zona Hijau Tanpa Risiko Likuiditas</span>
          </div>
        </div>

        {/* Financial Simulation Runway Chart */}
        <div className="relative w-full h-64 mt-2 bg-gradient-to-b from-[#f2f3ff]/40 to-transparent rounded-lg p-2 flex flex-col justify-end">
          <svg className="w-full h-48 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
            {/* Grid Lines */}
            <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="40" y2="40"></line>
            <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="90" y2="90"></line>
            <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="1000" y1="140" y2="140"></line>

            {/* Area Fill Gradient */}
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#00236f" stopOpacity="0.15"></stop>
                <stop offset="100%" stopColor="#00236f" stopOpacity="0"></stop>
              </linearGradient>
            </defs>

            {/* Projected Area Fill */}
            <polygon
              fill="url(#chartGradient)"
              points="0,60 160,75 320,80 500,105 700,118 850,122 1000,130 1000,200 0,200"
            ></polygon>

            {/* Over-budget Worst Case Line (Dotted Amber) */}
            <polyline
              fill="none"
              points="0,60 160,82 320,98 500,130 700,155 850,175 1000,190"
              stroke="#f59e0b"
              strokeDasharray="5 5"
              strokeWidth="2"
            ></polyline>

            {/* Projected Safe Line (Solid Blue Royal) */}
            <polyline
              fill="none"
              points="0,60 160,75 320,80 500,105 700,118 850,122 1000,130"
              stroke="#00236f"
              strokeWidth="3"
            ></polyline>

            {/* Points along the primary forecast path */}
            <circle cx="0" cy="60" fill="#00236f" r="4"></circle>
            <circle cx="320" cy="80" fill="#00236f" r="4"></circle>
            <circle cx="500" cy="105" fill="#00236f" r="4"></circle>
            <circle cx="700" cy="118" fill="#00236f" r="4"></circle>
            <circle cx="1000" cy="130" fill="#316bf3" r="5" stroke="#ffffff" strokeWidth="2"></circle>
          </svg>

          {/* Timeline X-Axis Labels */}
          <div className="flex justify-between items-center text-[11px] text-[#757682] pt-3 border-t border-[#c5c5d3]/40 px-1 font-medium">
            <span>01 Okt (Hari Ini)</span>
            <span>07 Okt</span>
            <span>15 Okt (Tengah Bulan)</span>
            <span>22 Okt</span>
            <span>31 Okt (Saldo Proyeksi: Rp 122.5M)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
