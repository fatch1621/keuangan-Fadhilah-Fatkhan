import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const DashboardView: React.FC = () => {
  const {
    totalBalance,
    formatRupiah,
    setCurrentView,
    setShowNewTransactionModal,
    setShowInviteModal,
    setShowQuickAdjusterModal,
    transactions,
    members,
    showToast,
  } = useApp();

  const [activeMonthFilter, setActiveMonthFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedTxFilter, setSelectedTxFilter] = useState<'all' | 'inflow' | 'outflow'>('all');

  // Filtered transactions for the table
  const displayedTx = transactions
    .filter((tx) => (selectedTxFilter === 'all' ? true : tx.type === selectedTxFilter))
    .slice(0, 4);

  return (
    <div className="space-y-8 max-w-[1440px] w-full mx-auto">
      {/* SECTION 1: GLOBAL BALANCE & METRIC CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Metric 1: Total Saldo Likuid (Hero Gradient Card) */}
        <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-[#00236f] via-[#1e3a8a] to-[#0051d5] text-white shadow-md flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[13px] text-[#dae2fd] tracking-wide uppercase font-semibold">
                Total Saldo Likuid
              </span>
              <span className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white">
                <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[32px] lg:text-[36px] font-bold tracking-tight text-white tabular-nums font-mono">
                {formatRupiah(totalBalance)}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[12px]">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
              <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
              +12.4%
            </span>
            <span className="text-white/80">vs bulan lalu</span>
          </div>
        </div>

        {/* Metric 2: Pemasukan Bulan Ini */}
        <div
          onClick={() => setCurrentView('pemasukan')}
          className="rounded-xl p-6 bg-white border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between hover:border-[#0051d5]/50 transition-all cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[13px] text-[#444651] font-medium group-hover:text-[#00236f] transition-colors">
                Pemasukan Bulan Ini
              </span>
              <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <span className="material-symbols-outlined text-xl">arrow_downward</span>
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[24px] font-bold text-[#131b2e] tabular-nums font-mono">
                {formatRupiah(28500000)}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Surplus Arus Kas
            </span>
            <span className="text-[11px] text-[#444651] font-medium">8 Transaksi Masuk</span>
          </div>
        </div>

        {/* Metric 3: Pengeluaran Bulan Ini */}
        <div
          onClick={() => setCurrentView('pengeluaran')}
          className="rounded-xl p-6 bg-white border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between hover:border-[#ba1a1a]/40 transition-all cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[13px] text-[#444651] font-medium group-hover:text-[#ba1a1a] transition-colors">
                Pengeluaran Bulan Ini
              </span>
              <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <span className="material-symbols-outlined text-xl">arrow_upward</span>
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[24px] font-bold text-[#131b2e] tabular-nums font-mono">
                {formatRupiah(14250000)}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Terkontrol
            </span>
            <span className="text-[11px] text-[#444651] font-medium">50.0% dari Income</span>
          </div>
        </div>

        {/* Metric 4: Realisasi Planing / Budget */}
        <div
          onClick={() => setCurrentView('planing')}
          className="rounded-xl p-6 bg-white border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between hover:border-[#316bf3]/50 transition-all cursor-pointer group"
        >
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[13px] text-[#444651] font-medium group-hover:text-[#0051d5] transition-colors">
                Realisasi Planing / Budget
              </span>
              <span className="p-2 rounded-lg bg-[#dbe1ff]/60 text-[#0051d5]">
                <span className="material-symbols-outlined text-xl">donut_large</span>
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-[24px] font-bold text-[#131b2e] tabular-nums font-mono">58%</p>
              <span className="text-[12px] text-[#757682]">Batas: {formatRupiah(24000000)}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#eaedff]">
            <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#316bf3] to-[#00236f] h-full rounded-full transition-all duration-500"
                style={{ width: '58%' }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-[#444651]">
              <span>Sisa {formatRupiah(9750000)}</span>
              <span className="text-emerald-700 font-semibold">Aman</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK ACTIONS BAR */}
      <section className="p-4 bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0">
            <span className="material-symbols-outlined text-xl">flash_on</span>
          </div>
          <div>
            <h2 className="text-[15px] sm:text-[16px] font-bold text-[#131b2e]">Aksi Cepat Finansial</h2>
            <p className="text-[11px] sm:text-[12px] text-[#757682]">Kelola pencatatan dan perencanaan tanpa navigasi berulang</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          {/* + Catat Pemasukan */}
          <button
            onClick={() => setCurrentView('pemasukan')}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[12px] sm:text-[13px] shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ Pemasukan</span>
          </button>

          {/* + Catat Pengeluaran */}
          <button
            onClick={() => setCurrentView('pengeluaran')}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#ba1a1a] hover:bg-red-700 text-white font-medium text-[12px] sm:text-[13px] shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">remove_circle</span>
            <span>+ Pengeluaran</span>
          </button>

          {/* Buat Plan Baru */}
          <button
            onClick={() => setShowQuickAdjusterModal(true)}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[12px] sm:text-[13px] shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">account_tree</span>
            <span>Planing Budget</span>
          </button>

          {/* Download Laporan */}
          <button
            onClick={() => setCurrentView('laporan')}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white border border-[#c5c5d3] hover:bg-[#f2f3ff] text-[#131b2e] font-medium text-[12px] sm:text-[13px] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#757682]">bar_chart</span>
            <span>Laporan</span>
          </button>
        </div>
      </section>

      {/* SECTION 3 & 4: CASH FLOW & PLANING PROGRESS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cash Flow Overview (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#c5c5d3]/70 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#eaedff]">
            <div>
              <h2 className="text-[18px] font-bold text-[#131b2e]">Grafik Aliran Kas</h2>
              <p className="text-[12px] text-[#757682]">Perbandingan Pemasukan vs Pengeluaran 6 Bulan Terakhir</p>
            </div>
            {/* Chart Legend & Timeframe */}
            <div className="flex items-center gap-4 text-[12px]">
              <button
                onClick={() => setActiveMonthFilter(activeMonthFilter === 'income' ? 'all' : 'income')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${activeMonthFilter === 'income' ? 'bg-[#dce1ff]' : ''}`}
              >
                <span className="w-3 h-3 rounded-xs bg-[#00236f]"></span>
                <span className="text-[#444651] font-medium">Income</span>
              </button>
              <button
                onClick={() => setActiveMonthFilter(activeMonthFilter === 'expense' ? 'all' : 'expense')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${activeMonthFilter === 'expense' ? 'bg-amber-100' : ''}`}
              >
                <span className="w-3 h-3 rounded-xs bg-amber-400"></span>
                <span className="text-[#444651] font-medium">Expense</span>
              </button>
              <div className="px-2.5 py-1 rounded-md bg-[#eaedff] border border-[#c5c5d3]/40 text-[#00236f] font-semibold text-[11px]">
                Mei - Okt 2024
              </div>
            </div>
          </div>

          {/* Interactive FinTech Bar Chart Canvas */}
          <div className="py-6">
            <div className="h-64 w-full flex items-end justify-between gap-4 pt-6 px-2 border-b border-[#eaedff] relative">
              {/* Background grid guides */}
              <div className="absolute inset-x-0 top-6 border-t border-dashed border-[#c5c5d3]/30 flex justify-between text-[11px] text-[#757682]">
                <span>Rp 30M</span>
              </div>
              <div className="absolute inset-x-0 top-24 border-t border-dashed border-[#c5c5d3]/30 flex justify-between text-[11px] text-[#757682]">
                <span>Rp 20M</span>
              </div>
              <div className="absolute inset-x-0 top-44 border-t border-dashed border-[#c5c5d3]/30 flex justify-between text-[11px] text-[#757682]">
                <span>Rp 10M</span>
              </div>

              {/* Month 1: Mei */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                <div className="flex items-end gap-1.5 h-full w-full justify-center max-w-[56px]">
                  <div
                    title="Mei Income: Rp 19.500.000"
                    className={`w-1/2 bg-[#00236f]/80 group-hover:bg-[#00236f] transition-all rounded-t-xs ${activeMonthFilter === 'expense' ? 'opacity-30' : ''}`}
                    style={{ height: '65%' }}
                  ></div>
                  <div
                    title="Mei Expense: Rp 13.500.000"
                    className={`w-1/2 bg-amber-400/80 group-hover:bg-amber-400 transition-all rounded-t-xs ${activeMonthFilter === 'income' ? 'opacity-30' : ''}`}
                    style={{ height: '45%' }}
                  ></div>
                </div>
                <span className="text-[12px] text-[#757682]">Mei</span>
              </div>

              {/* Month 2: Jun */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                <div className="flex items-end gap-1.5 h-full w-full justify-center max-w-[56px]">
                  <div
                    title="Jun Income: Rp 21.600.000"
                    className={`w-1/2 bg-[#00236f]/80 group-hover:bg-[#00236f] transition-all rounded-t-xs ${activeMonthFilter === 'expense' ? 'opacity-30' : ''}`}
                    style={{ height: '72%' }}
                  ></div>
                  <div
                    title="Jun Expense: Rp 15.600.000"
                    className={`w-1/2 bg-amber-400/80 group-hover:bg-amber-400 transition-all rounded-t-xs ${activeMonthFilter === 'income' ? 'opacity-30' : ''}`}
                    style={{ height: '52%' }}
                  ></div>
                </div>
                <span className="text-[12px] text-[#757682]">Jun</span>
              </div>

              {/* Month 3: Jul */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                <div className="flex items-end gap-1.5 h-full w-full justify-center max-w-[56px]">
                  <div
                    title="Jul Income: Rp 20.400.000"
                    className={`w-1/2 bg-[#00236f]/80 group-hover:bg-[#00236f] transition-all rounded-t-xs ${activeMonthFilter === 'expense' ? 'opacity-30' : ''}`}
                    style={{ height: '68%' }}
                  ></div>
                  <div
                    title="Jul Expense: Rp 17.400.000"
                    className={`w-1/2 bg-amber-400/80 group-hover:bg-amber-400 transition-all rounded-t-xs ${activeMonthFilter === 'income' ? 'opacity-30' : ''}`}
                    style={{ height: '58%' }}
                  ></div>
                </div>
                <span className="text-[12px] text-[#757682]">Jul</span>
              </div>

              {/* Month 4: Agu */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                <div className="flex items-end gap-1.5 h-full w-full justify-center max-w-[56px]">
                  <div
                    title="Agu Income: Rp 25.500.000"
                    className={`w-1/2 bg-[#00236f]/80 group-hover:bg-[#00236f] transition-all rounded-t-xs ${activeMonthFilter === 'expense' ? 'opacity-30' : ''}`}
                    style={{ height: '85%' }}
                  ></div>
                  <div
                    title="Agu Expense: Rp 15.000.000"
                    className={`w-1/2 bg-amber-400/80 group-hover:bg-amber-400 transition-all rounded-t-xs ${activeMonthFilter === 'income' ? 'opacity-30' : ''}`}
                    style={{ height: '50%' }}
                  ></div>
                </div>
                <span className="text-[12px] text-[#757682]">Agu</span>
              </div>

              {/* Month 5: Sep */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                <div className="flex items-end gap-1.5 h-full w-full justify-center max-w-[56px]">
                  <div
                    title="Sep Income: Rp 23.400.000"
                    className={`w-1/2 bg-[#00236f]/80 group-hover:bg-[#00236f] transition-all rounded-t-xs ${activeMonthFilter === 'expense' ? 'opacity-30' : ''}`}
                    style={{ height: '78%' }}
                  ></div>
                  <div
                    title="Sep Expense: Rp 14.400.000"
                    className={`w-1/2 bg-amber-400/80 group-hover:bg-amber-400 transition-all rounded-t-xs ${activeMonthFilter === 'income' ? 'opacity-30' : ''}`}
                    style={{ height: '48%' }}
                  ></div>
                </div>
                <span className="text-[12px] text-[#757682]">Sep</span>
              </div>

              {/* Month 6: Okt (Active) */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end z-10 group">
                <div className="flex items-end gap-1.5 h-full w-full justify-center max-w-[56px]">
                  <div
                    title="Okt Income: Rp 28.500.000"
                    className="w-1/2 bg-[#00236f] shadow-sm rounded-t-xs ring-2 ring-[#00236f]/30"
                    style={{ height: '94%' }}
                  ></div>
                  <div
                    title="Okt Expense: Rp 14.250.000"
                    className="w-1/2 bg-amber-500 shadow-sm rounded-t-xs ring-2 ring-amber-300/40"
                    style={{ height: '47%' }}
                  ></div>
                </div>
                <span className="text-[12px] font-bold text-[#00236f]">Okt (Aktif)</span>
              </div>
            </div>
          </div>

          {/* Bottom summary banner inside cash flow card */}
          <div className="mt-2 p-3.5 bg-[#f2f3ff] rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#0051d5]">insights</span>
              <span className="text-[13px] text-[#131b2e]">
                Rasio tabungan bersih bulan ini mencapai{' '}
                <strong className="text-[#00236f] font-bold">50.0%</strong> dari total pemasukan.
              </span>
            </div>
            <button
              onClick={() => setCurrentView('laporan')}
              className="text-[12px] font-semibold text-[#0051d5] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Analisis Detail</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Progres Planing Keuangan Widget (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#c5c5d3]/70 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h2 className="text-[18px] font-bold text-[#131b2e]">Progres Planing</h2>
                <p className="text-[12px] text-[#757682]">Batas Penggunaan Budget</p>
              </div>
              <button
                onClick={() => setCurrentView('planing')}
                className="text-[12px] text-[#0051d5] font-semibold hover:underline cursor-pointer"
              >
                Kelola
              </button>
            </div>

            {/* Categories progress items */}
            <div className="mt-6 space-y-5">
              {/* Item 1: Makan & Minum (75%) */}
              <div>
                <div className="flex justify-between items-center text-[13px] mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-medium text-[#131b2e]">Makan & Minum</span>
                  </div>
                  <span className="font-bold tabular-nums text-[#131b2e]">75%</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#757682] mt-1 font-mono">
                  <span>Terpakai: {formatRupiah(4500000)}</span>
                  <span>Batas: {formatRupiah(6000000)}</span>
                </div>
              </div>

              {/* Item 2: Tabungan & Investasi (90%) */}
              <div>
                <div className="flex justify-between items-center text-[13px] mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00236f]"></span>
                    <span className="font-medium text-[#131b2e]">Tabungan & Investasi</span>
                  </div>
                  <span className="font-bold tabular-nums text-[#00236f]">90%</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00236f] h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#757682] mt-1 font-mono">
                  <span>Tercapai: {formatRupiah(9000000)}</span>
                  <span>Target: {formatRupiah(10000000)}</span>
                </div>
              </div>

              {/* Item 3: Cicilan & Tagihan (100% Lunas) */}
              <div>
                <div className="flex justify-between items-center text-[13px] mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-medium text-[#131b2e]">Cicilan & Tagihan</span>
                  </div>
                  <span className="font-bold tabular-nums text-emerald-700">100% (Lunas)</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#757682] mt-1 font-mono">
                  <span>Terbayar: {formatRupiah(4250000)}</span>
                  <span className="text-emerald-700 font-medium">Bebas Tunggakan</span>
                </div>
              </div>

              {/* Item 4: Hiburan & Lifestyle (45%) */}
              <div>
                <div className="flex justify-between items-center text-[13px] mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0051d5]"></span>
                    <span className="font-medium text-[#131b2e]">Hiburan & Lifestyle</span>
                  </div>
                  <span className="font-bold tabular-nums text-[#131b2e]">45%</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0051d5] h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#757682] mt-1 font-mono">
                  <span>Terpakai: {formatRupiah(900000)}</span>
                  <span>Batas: {formatRupiah(2000000)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#eaedff]">
            <button
              onClick={() => setCurrentView('kategori')}
              className="w-full py-2 px-3 rounded-lg border border-[#c5c5d3] hover:bg-[#eaedff] text-[#131b2e] text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">tune</span>
              <span>Atur Alokasi Kategori</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6: TRANSACTIONS & SIDE WIDGETS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table: Transaksi Terakhir (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#eaedff] flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#131b2e]">Ringkasan Transaksi Terakhir</h2>
              <p className="text-[12px] text-[#757682]">Catatan mutasi riil akun perbankan dan portofolio</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSelectedTxFilter((prev) => (prev === 'all' ? 'inflow' : prev === 'inflow' ? 'outflow' : 'all'))
                }
                className="px-3 py-1.5 rounded-lg border border-[#c5c5d3] text-[12px] font-medium hover:bg-[#eaedff] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>Filter: {selectedTxFilter === 'all' ? 'Semua' : selectedTxFilter === 'inflow' ? 'Pemasukan' : 'Pengeluaran'}</span>
              </button>
              <button
                onClick={() => setCurrentView('laporan')}
                className="text-[12px] font-semibold text-[#0051d5] hover:underline ml-2 cursor-pointer"
              >
                Lihat Semua
              </button>
            </div>
          </div>

          {/* Mobile Card Feed (Mobile View) */}
          <div className="sm:hidden divide-y divide-[#eaedff]">
            {displayedTx.map((tx) => (
              <div key={tx.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#faf8ff] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'inflow' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#ba1a1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {tx.type === 'inflow' ? 'payments' : 'shopping_cart'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="block font-semibold text-[13px] text-[#131b2e] truncate">{tx.description}</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#757682] mt-0.5">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#eaedff] text-[#00236f] text-[10px] font-medium">{tx.category}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`block font-bold text-[13px] tabular-nums font-mono ${
                      tx.type === 'inflow' ? 'text-emerald-600' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {tx.type === 'inflow' ? '+' : '-'}
                    {formatRupiah(tx.amount)}
                  </span>
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold mt-0.5 ${
                      tx.status === 'Tercapai'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-blue-50 text-[#0051d5]'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Data Table */}
          <div className="hidden sm:block overflow-x-auto custom-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f3ff] text-[11px] font-semibold text-[#757682] uppercase tracking-wider border-b border-[#c5c5d3]/40">
                  <th className="py-3.5 px-6">Tanggal</th>
                  <th className="py-3.5 px-6">Deskripsi</th>
                  <th className="py-3.5 px-6">Kategori</th>
                  <th className="py-3.5 px-6">Status Planing</th>
                  <th className="py-3.5 px-6 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaedff] text-[13px]">
                {displayedTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#faf8ff] transition-colors">
                    <td className="py-4 px-6 text-[#757682] text-[12px] whitespace-nowrap">
                      {tx.date}
                    </td>
                    <td className="py-4 px-6 font-medium text-[#131b2e] whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            tx.type === 'inflow' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#ba1a1a]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">
                            {tx.type === 'inflow' ? 'payments' : 'shopping_cart'}
                          </span>
                        </div>
                        <div>
                          <span className="block font-semibold">{tx.description}</span>
                          <p className="text-[11px] text-[#757682]">{tx.notes}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#eaedff] text-[#131b2e] font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          tx.status === 'Tercapai'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : tx.status === 'Sesuai Budget'
                            ? 'bg-blue-50 text-[#0051d5] border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-bold tabular-nums whitespace-nowrap font-mono ${
                        tx.type === 'inflow' ? 'text-emerald-600' : 'text-[#ba1a1a]'
                      }`}
                    >
                      {tx.type === 'inflow' ? '+' : '-'}
                      {formatRupiah(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Widgets: AI Advisor & Member Online (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mini Card AI Finansial */}
          <div className="rounded-xl border border-[#b4c5ff] bg-gradient-to-br from-[#eaedff]/60 via-white to-[#dae2fd]/30 p-5 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#0051d5]/10 rounded-full blur-lg pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00236f] to-[#0051d5] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[#00236f]">Insight AI Finansial</h3>
                <span className="text-[11px] text-[#757682]">Audit Otomatis Portofolio</span>
              </div>
            </div>
            <p className="text-[13px] text-[#131b2e] leading-relaxed">
              &ldquo;Status keuangan Anda <strong className="text-emerald-700 font-semibold">sangat sehat</strong> bulan ini. Pengeluaran terkendali pada rasio 50%, membuka potensi tabungan surplus{' '}
              <strong className="text-[#00236f] font-semibold">+15%</strong> untuk diinjeksi ke instrumen reksadana pasar uang.&rdquo;
            </p>
            <div className="mt-4 pt-3 border-t border-[#c5c5d3]/40 flex items-center justify-between">
              <span className="text-[12px] text-[#757682]">
                Skor Kesehatan: <strong className="text-[#131b2e]">94/100</strong>
              </span>
              <button
                onClick={() => {
                  showToast('Saran alokasi diterapkan ke Planing Tabungan.');
                  setCurrentView('planing');
                }}
                className="text-[12px] font-semibold text-[#0051d5] hover:text-[#00236f] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Terapkan Saran</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Mini Card Anggota Aktif (Member Online) */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0051d5]">group</span>
                <h3 className="text-[13px] font-bold text-[#131b2e]">Anggota Aktif (Keluarga)</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                3 Online
              </span>
            </div>
            <p className="text-[12px] text-[#757682] mt-2 mb-4">
              Kolaborator yang sedang mencatat &amp; meninjau arus kas bersama secara real-time.
            </p>
            <div className="space-y-3">
              {/* Member 1: Nadia */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhz9VBx9_tUzzwGeZgcnemg4BGvOeQiuoQyg_NQ-vGABEUuQZfKNBeuS33BccqVGy9LqXc1QD5TAZYoRkkumG59wR9cYh2Ir6lr3TOS5B00XNfzsjsmgwvEZKPvaxHqlvIyqCDG37l0yluQuAtYrkohvowlBxF5tz9g3DRugxdweOXvKqE1f6m3T7XaMt-Zzb7sK46sIzZoBhQs8aQHN-Bp235xwPgkSl-iMASaiD0l3bjLQBMNfA06g"
                      alt="Nadia"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#131b2e]">Nadia Salsabila</h4>
                    <p className="text-[11px] text-[#757682]">Input: Belanja Rumah</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#757682]">Baru saja</span>
              </div>

              {/* Member 2: Rizky */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfZGwRzht0cMBmPmS6oDce_0yTxoFT5Bz3_PfK3JHAxlSCa3RACu2YiZ3cC63CJIHotLt75Mb8N63aBA4UUicEx6CWlHs6_B2Copd44eX9MS0qkFuzpluqO6hMjkEhJFbPGYcC7cE8bFAUaKgoe3ucIzUYvJazl1uK6Tjxa2ZMgESDy19W4OLB1bUqt32JIxNmY3XBZWF9zSupLaudlvlCtZNMCnqSxpiXADvcS5MhGNUZQGfrHwdC7A"
                      alt="Rizky"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#131b2e]">Rizky Ramadhan</h4>
                    <p className="text-[11px] text-[#757682]">Review: Tagihan Listrik</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#757682]">5m lalu</span>
              </div>

              {/* Member 3: Citra */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl-33bqXZ3AAwVS_4JzuNSdbjYlxv0uE_ZfhenDUm8JLyQ5IiYqGkJbgHMu3wKWJb4_2DMQqLL1I41dNd0EjfEOnofRf4SSEKv-wpBkSgI6DyNtdON5NKsB7pnHAFq-kgHCapMnHRNpS8qwgHludw15o8b5VFdyZpQ6i6soEP6KwFqNjie_VH7SkEiqkaKkP3334r-Aanh5QLacU_u4qLB7bI3LqF5B5n6z31fW4nv8Rbwd3BK_Hkdaw"
                      alt="Citra"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-[#131b2e]">Citra Lestari</h4>
                    <p className="text-[11px] text-[#757682]">Sync: Portofolio Reksadana</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#757682]">12m lalu</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eaedff]">
              <button
                onClick={() => setShowInviteModal(true)}
                className="w-full py-2 px-3 rounded-lg border border-dashed border-[#c5c5d3] hover:border-[#0051d5] hover:text-[#0051d5] text-[#444651] text-[12px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">person_add</span>
                <span>Undang Anggota Keluarga</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer watermark & Status */}
      <footer className="pt-4 border-t border-[#c5c5d3]/40 text-[#757682] flex flex-wrap items-center justify-between text-[12px]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#00236f]">Capital Flow Platform</span>
          <span>• Bank-Grade End-to-End Encryption 256-bit</span>
        </div>
        <div>
          <span>Terakhir sinkronisasi: Hari ini pukul 14:32 WIB</span>
        </div>
      </footer>
    </div>
  );
};
