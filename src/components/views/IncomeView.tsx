import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const IncomeView: React.FC = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    clearTransactionsByType,
    formatRupiah,
    showToast,
  } = useApp();

  // Interactive Calculator State
  const [calcDisplay, setCalcDisplay] = useState('15000000');
  const [calcExpression, setCalcExpression] = useState('15000000');
  const [isCalculated, setIsCalculated] = useState(false);

  // Form Fields
  const [source, setSource] = useState('Gaji Pokok');
  const [category, setCategory] = useState('Gaji & Upah');
  const [planEnvelope, setPlanEnvelope] = useState('Tabungan Rumah');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState<'this-month' | 'last-month' | 'this-year'>('this-month');

  // Deletion modals state
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [deleteConfirmTx, setDeleteConfirmTx] = useState<Transaction | null>(null);

  // Incomes calculations
  const allIncomes = transactions.filter((tx) => tx.type === 'inflow');
  const totalIncomeSum = allIncomes.reduce((acc, tx) => acc + tx.amount, 0);

  // Filtered income transactions
  const incomeTx = transactions.filter(
    (tx) =>
      tx.type === 'inflow' &&
      (searchQuery === '' ||
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tx.notes && tx.notes.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Calculator logic
  const handleCalcInput = (char: string) => {
    if (isCalculated) {
      setCalcDisplay(char);
      setCalcExpression(char);
      setIsCalculated(false);
      return;
    }
    if (calcDisplay === '0' && char !== '.') {
      setCalcDisplay(char);
      setCalcExpression(char);
    } else {
      setCalcDisplay((prev) => prev + char);
      setCalcExpression((prev) => prev + char);
    }
  };

  const handleCalcOp = (op: string) => {
    setIsCalculated(false);
    try {
      // Safe arithmetic evaluation
      const safeExpr = calcExpression.replace(/[^0-9+\-*/.]/g, '');
      const result = Function('"use strict";return (' + safeExpr + ')')();
      setCalcDisplay(String(result));
      setCalcExpression(String(result) + op);
    } catch {
      setCalcExpression((prev) => prev + op);
    }
  };

  const handleCalcEquals = () => {
    try {
      const safeExpr = calcExpression.replace(/[^0-9+\-*/.]/g, '');
      const result = Function('"use strict";return (' + safeExpr + ')')();
      const rounded = Math.round(Number(result));
      setCalcDisplay(String(rounded));
      setCalcExpression(String(rounded));
      setIsCalculated(true);
    } catch {
      setCalcDisplay('0');
      setCalcExpression('0');
    }
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcExpression('0');
    setIsCalculated(false);
  };

  const handleQuickShortcut = (amount: number) => {
    const currentNum = parseInt(calcDisplay, 10) || 0;
    const nextVal = currentNum + amount;
    setCalcDisplay(String(nextVal));
    setCalcExpression(String(nextVal));
    setIsCalculated(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(calcDisplay, 10);
    if (!parsedAmount || parsedAmount <= 0) {
      showToast('Masukkan nominal pemasukan yang valid.');
      return;
    }

    addTransaction({
      type: 'inflow',
      date: 'Hari ini',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      description: source || 'Pemasukan Baru',
      notes: description || `Alokasi ${category}`,
      category,
      planEnvelope,
      account: 'BCA Wealth Priority',
      amount: parsedAmount,
      status: 'Tercapai',
    });

    // Reset some form parts
    setDescription('');
  };

  const formatDisplayAmount = (str: string) => {
    const num = parseInt(str, 10);
    if (isNaN(num)) return 'Rp 0';
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  return (
    <div className="space-y-6 max-w-[1440px] w-full mx-auto">
      {/* 1. Header Halaman */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl border border-[#c5c5d3]/70 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#0051d5]/10 text-[#0051d5]">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </span>
            <h1 className="text-[28px] font-bold text-[#00236f] tracking-tight">Input &amp; Kelola Pemasukan</h1>
          </div>
          <p className="text-[13px] text-[#757682] mt-1">
            Catat dan hubungkan setiap pemasukan dengan rencana keuangan keluarga Anda
          </p>
        </div>

        {/* Filter Periode & Ekspor */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="inline-flex rounded-lg border border-[#c5c5d3] bg-white p-1 shadow-xs">
            <button
              onClick={() => setPeriodFilter('this-month')}
              className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-md transition-all cursor-pointer ${
                periodFilter === 'this-month' ? 'bg-[#0051d5] text-white shadow-xs' : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => setPeriodFilter('last-month')}
              className={`px-3.5 py-1.5 text-[12px] font-medium rounded-md transition-all cursor-pointer ${
                periodFilter === 'last-month' ? 'bg-[#0051d5] text-white shadow-xs' : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Bulan Lalu
            </button>
            <button
              onClick={() => setPeriodFilter('this-year')}
              className={`px-3.5 py-1.5 text-[12px] font-medium rounded-md transition-all cursor-pointer ${
                periodFilter === 'this-year' ? 'bg-[#0051d5] text-white shadow-xs' : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Tahun 2024
            </button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-[#f2f3ff] border border-[#c5c5d3] text-[#131b2e] text-[13px] font-medium rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-[#0051d5] transition-all cursor-pointer">
              <option value="okt-2024">Oktober 2024</option>
              <option value="sep-2024">September 2024</option>
              <option value="agt-2024">Agustus 2024</option>
              <option value="jul-2024">Juli 2024</option>
            </select>
            <span className="material-symbols-outlined text-[#757682] pointer-events-none absolute right-2 top-2.5 text-lg">
              arrow_drop_down
            </span>
          </div>

          <button
            onClick={() => showToast('Ekspor CSV sedang diunduh...')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#c5c5d3] bg-white hover:bg-[#f2f3ff] text-[#444651] text-[13px] font-medium transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">file_download</span>
            <span>Ekspor CSV</span>
          </button>
        </div>
      </section>

      {/* 2. Dual Column Layout: Left Form + Right Ledger */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* KOLOM KIRI: Form Input dengan Built-in Kalkulator (5 Columns) */}
        <section className="xl:col-span-5 bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm overflow-hidden sticky top-24">
          {/* Card Header Banner */}
          <div className="p-5 bg-gradient-to-r from-[#00236f] via-[#1e3a8a] to-[#0051d5] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/10 rounded-md backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl text-amber-300">add_card</span>
              </div>
              <h2 className="text-[18px] font-semibold text-white">Form Input Pemasukan</h2>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
              Live Allocation
            </span>
          </div>

          <form className="p-6 space-y-5" onSubmit={handleSubmit}>
            {/* Nominal Display Card */}
            <div className="p-4 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3]/60 relative overflow-hidden group">
              <div className="flex items-center justify-between text-[#757682] text-[11px] uppercase tracking-wider font-semibold mb-1">
                <span>Nominal Pemasukan</span>
                <span className="text-[#0051d5] flex items-center gap-1 font-semibold text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Mode Kalkulator Aktif
                </span>
              </div>

              {/* Big Digital Amount Readout */}
              <div className="flex items-baseline justify-between">
                <span className="text-[16px] text-[#757682] font-bold">IDR</span>
                <div className="text-[32px] font-bold text-[#00236f] tracking-tight tabular-nums select-all font-mono">
                  {formatDisplayAmount(calcDisplay)}
                </div>
              </div>

              {/* Quick Shortcut Pills */}
              <div className="mt-3 pt-3 border-t border-[#c5c5d3]/50 flex items-center justify-between gap-1.5">
                <span className="text-[11px] text-[#757682]">Shortcut:</span>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(500000)}
                    className="px-2 py-1 bg-white hover:bg-[#dbe1ff] text-[#00236f] text-[11px] font-semibold rounded border border-[#c5c5d3] shadow-2xs transition-colors cursor-pointer"
                  >
                    +500rb
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(1000000)}
                    className="px-2 py-1 bg-white hover:bg-[#dbe1ff] text-[#00236f] text-[11px] font-semibold rounded border border-[#c5c5d3] shadow-2xs transition-colors cursor-pointer"
                  >
                    +1jt
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(5000000)}
                    className="px-2 py-1 bg-white hover:bg-[#dbe1ff] text-[#00236f] text-[11px] font-semibold rounded border border-[#c5c5d3] shadow-2xs transition-colors cursor-pointer"
                  >
                    +5jt
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(10000000)}
                    className="px-2 py-1 bg-white hover:bg-[#dbe1ff] text-[#00236f] text-[11px] font-semibold rounded border border-[#c5c5d3] shadow-2xs transition-colors cursor-pointer"
                  >
                    +10jt
                  </button>
                </div>
              </div>
            </div>

            {/* Built-in Numpad Calculator */}
            <div className="p-3 bg-[#eaedff]/50 rounded-xl border border-[#c5c5d3]/50">
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <button
                  type="button"
                  onClick={() => handleCalcInput('7')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  7
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('8')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  8
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('9')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  9
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcOp('+')}
                  className="h-10 rounded-lg bg-[#e2e7ff] hover:bg-[#0051d5] hover:text-white text-[#00236f] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  +
                </button>

                {/* Row 2 */}
                <button
                  type="button"
                  onClick={() => handleCalcInput('4')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('5')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  5
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('6')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  6
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcOp('-')}
                  className="h-10 rounded-lg bg-[#e2e7ff] hover:bg-[#0051d5] hover:text-white text-[#00236f] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  -
                </button>

                {/* Row 3 */}
                <button
                  type="button"
                  onClick={() => handleCalcInput('1')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('2')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('3')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcOp('*')}
                  className="h-10 rounded-lg bg-[#e2e7ff] hover:bg-[#0051d5] hover:text-white text-[#00236f] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-all cursor-pointer"
                >
                  ×
                </button>

                {/* Row 4 */}
                <button
                  type="button"
                  onClick={handleCalcClear}
                  className="h-10 rounded-lg bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#ba1a1a] font-semibold text-sm border border-[#ba1a1a]/30 shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  C
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('0')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-sm border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => handleCalcInput('000')}
                  className="h-10 rounded-lg bg-white hover:bg-[#eaedff] text-[#131b2e] font-semibold text-xs border border-[#c5c5d3] shadow-2xs active:scale-95 transition-transform cursor-pointer"
                >
                  000
                </button>
                <button
                  type="button"
                  onClick={handleCalcEquals}
                  className="h-10 rounded-lg bg-[#ef9900] hover:bg-amber-600 text-white font-bold text-base shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  =
                </button>
              </div>
            </div>

            {/* Field: Sumber Pemasukan */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#131b2e]">
                Sumber Pemasukan <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#757682] text-lg">domain</span>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Contoh: Gaji Pokok, Freelance Project, Dividen"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 transition-all"
                />
              </div>
            </div>

            {/* Grid 2 Kolom: Kategori & Planing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field: Kategori */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-[#131b2e]">
                  Kategori <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#757682] text-lg">category</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-white border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5] appearance-none transition-all cursor-pointer"
                  >
                    <option value="Gaji & Upah">Gaji &amp; Upah</option>
                    <option value="Side Hustle">Side Hustle</option>
                    <option value="Dividen & Bunga">Dividen &amp; Bunga</option>
                    <option value="Bonus & Tunjangan">Bonus &amp; Tunjangan</option>
                    <option value="Bisnis / Penjualan">Bisnis / Penjualan</option>
                  </select>
                  <span className="material-symbols-outlined text-[#757682] pointer-events-none absolute right-2.5 top-3 text-lg">
                    unfold_more
                  </span>
                </div>
              </div>

              {/* Field: Hubungkan ke Planing */}
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-[#131b2e]">
                  Hubungkan ke Planing <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#ef9900] text-lg">flag</span>
                  <select
                    value={planEnvelope}
                    onChange={(e) => setPlanEnvelope(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 bg-white border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5] appearance-none transition-all cursor-pointer"
                  >
                    <option value="Tabungan Rumah">Tabungan Rumah</option>
                    <option value="Dana Darurat">Dana Darurat</option>
                    <option value="Portofolio Saham">Portofolio Saham</option>
                    <option value="Operasional Harian">Operasional Harian</option>
                    <option value="Liburan Akhir Tahun">Liburan Akhir Tahun</option>
                  </select>
                  <span className="material-symbols-outlined text-[#757682] pointer-events-none absolute right-2.5 top-3 text-lg">
                    unfold_more
                  </span>
                </div>
              </div>
            </div>

            {/* Field: Deskripsi */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#131b2e]">
                Deskripsi / Catatan Transaksi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Catatan tambahan alokasi atau penerimaan dana..."
                rows={2}
                className="w-full p-3 bg-white border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5] transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-lg text-white font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-[#00236f] via-[#0051d5] to-[#ef9900] hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">check_circle</span>
              <span>Simpan Pemasukan</span>
            </button>
            <p className="text-center text-[11px] text-[#757682]">
              Data tersimpan otomatis dan memperbarui ledger neraca Anda.
            </p>
          </form>
        </section>

        {/* KOLOM KANAN: Statistik & Riwayat Pemasukan (7 Columns) */}
        <section className="xl:col-span-7 space-y-6">
          {/* Kartu Statistik Mini (3 Cards Bento Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1: Total Terverifikasi */}
            <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/70 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-[#757682] text-[11px] font-semibold uppercase">
                <span>Total Terverifikasi</span>
                <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
                  <span className="material-symbols-outlined text-base">verified</span>
                </span>
              </div>
              <div className="mt-2 text-[22px] font-bold text-[#00236f] tabular-nums font-mono">
                {formatRupiah(48750000)}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                  <span className="material-symbols-outlined text-xs mr-0.5">trending_up</span> +14.2%
                </span>
                <span className="text-[11px] text-[#757682]">vs bulan lalu</span>
              </div>
            </div>

            {/* Card 2: Rata-Rata Harian */}
            <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/70 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-[#757682] text-[11px] font-semibold uppercase">
                <span>Rata-Rata Harian</span>
                <span className="p-1 rounded-md bg-[#0051d5]/10 text-[#0051d5]">
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                </span>
              </div>
              <div className="mt-2 text-[22px] font-bold text-[#00236f] tabular-nums font-mono">
                {formatRupiah(1625000)}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#444651]">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Proyeksi stabil 30 hari</span>
              </div>
            </div>

            {/* Card 3: Sumber Terbesar */}
            <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/70 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between text-[#757682] text-[11px] font-semibold uppercase">
                <span>Sumber Terbesar</span>
                <span className="p-1 rounded-md bg-amber-50 text-[#ef9900]">
                  <span className="material-symbols-outlined text-base">award_star</span>
                </span>
              </div>
              <div className="mt-2 text-[22px] font-bold text-[#00236f] truncate">
                Gaji Pokok
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                  61.5%
                </span>
                <span className="text-[11px] text-[#757682]">dari total kas</span>
              </div>
            </div>
          </div>

          {/* Tabel Riwayat Pemasukan */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#c5c5d3]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-[#eaedff] text-[#00236f]">
                  <span className="material-symbols-outlined text-xl">history</span>
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#00236f]">Riwayat Transaksi Masuk</h3>
                  <p className="text-[12px] text-[#757682]">Daftar transaksi terintegrasi dengan rencana finansial</p>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                {/* Search filter table */}
                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari transaksi..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#f2f3ff] border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5]"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#757682] text-base">
                    search
                  </span>
                </div>

                {/* Tombol Hapus Semua Pemasukan */}
                <button
                  type="button"
                  onClick={() => setShowClearAllModal(true)}
                  disabled={allIncomes.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:hover:bg-red-50 text-[#ba1a1a] border border-red-200 rounded-lg text-[12px] font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                  title="Hapus seluruh riwayat transaksi pemasukan"
                >
                  <span className="material-symbols-outlined text-base">delete_sweep</span>
                  <span>Hapus Semua</span>
                </button>
              </div>
            </div>

            {/* Table Responsive Container */}
            <div className="overflow-x-auto custom-scroll">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="h-10 bg-[#f2f3ff]/70 border-b border-[#c5c5d3]/50 text-[#757682] text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-semibold">Tanggal</th>
                    <th className="py-2.5 px-4 font-semibold">Sumber &amp; Catatan</th>
                    <th className="py-2.5 px-4 font-semibold">Kategori</th>
                    <th className="py-2.5 px-4 font-semibold">Alokasi Plan</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Nominal</th>
                    <th className="py-2.5 px-4 font-semibold text-center w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c5d3]/30 text-[13px]">
                  {incomeTx.map((tx) => (
                    <tr key={tx.id} className="h-14 hover:bg-[#eaedff]/40 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-[#444651] font-medium text-[12px]">
                        {tx.date}
                        <span className="block text-[#757682] text-[11px]">{tx.time}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#131b2e]">{tx.description}</div>
                        <div className="text-[11px] text-[#757682]">{tx.notes}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-[#0051d5] border border-blue-200">
                          {tx.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="material-symbols-outlined text-xs text-amber-600">flag</span>
                          {tx.planEnvelope || 'Umum'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap tabular-nums font-semibold text-emerald-700 font-mono">
                        +{formatRupiah(tx.amount)}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => showToast(`Edit transaksi ${tx.id}`)}
                            className="p-1.5 text-[#757682] hover:text-[#0051d5] hover:bg-[#eaedff] rounded-md transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmTx(tx)}
                            className="p-1.5 text-[#757682] hover:text-[#ba1a1a] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Hapus transaksi pemasukan ini"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {incomeTx.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#757682]">
                        Tidak ada transaksi pemasukan yang cocok dengan pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Pagination / Footer Summary */}
            <div className="p-4 border-t border-[#c5c5d3]/40 bg-[#f2f3ff]/40 flex items-center justify-between text-[12px] text-[#757682]">
              <div>
                Menampilkan <span className="font-semibold text-[#131b2e]">{incomeTx.length}</span> transaksi bulan ini
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="p-1 rounded border border-[#c5c5d3] bg-white text-[#131b2e] disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <span className="px-2.5 py-0.5 rounded bg-[#0051d5] text-white font-semibold">1</span>
                <button
                  disabled
                  className="p-1 rounded border border-[#c5c5d3] bg-white text-[#131b2e] disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Banner Alokasi Otomatis Smart Planning */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#eaedff] to-[#dae2fd] border border-[#0051d5]/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0051d5] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-[14px] font-semibold text-[#00236f]">Smart Auto-Allocation Aktif</h4>
                <p className="text-[12px] text-[#444651]">
                  Setiap transaksi otomatis diteruskan ke pos rekening sub-akun sesuai target Planing.
                </p>
              </div>
            </div>
            <button
              onClick={() => showToast('Sinkronisasi alokasi otomatis telah diperbarui.')}
              className="px-3.5 py-1.5 text-[12px] font-semibold text-[#0051d5] hover:text-white hover:bg-[#0051d5] border border-[#0051d5]/40 rounded-lg transition-all whitespace-nowrap cursor-pointer"
            >
              Kelola Alokasi
            </button>
          </div>
        </section>
      </div>

      {/* MODAL 1: Konfirmasi Hapus Transaksi Masuk Tunggal */}
      {deleteConfirmTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c5c5d3] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">delete_forever</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#131b2e]">Hapus Transaksi Pemasukan?</h3>
                <p className="text-[13px] text-[#757682] mt-1">
                  Transaksi berikut akan dihapus dan nominal kas masuk akan dipotong dari saldo likuid:
                </p>
                <div className="mt-3 p-3 bg-[#f2f3ff] rounded-lg border border-[#c5c5d3]/60 space-y-1">
                  <div className="font-semibold text-[#131b2e] text-[14px]">{deleteConfirmTx.description}</div>
                  <div className="flex items-center justify-between text-[12px] text-[#757682]">
                    <span>{deleteConfirmTx.date} • {deleteConfirmTx.category}</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      +{formatRupiah(deleteConfirmTx.amount, true)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#c5c5d3]/50">
              <button
                type="button"
                onClick={() => setDeleteConfirmTx(null)}
                className="px-4 py-2 text-[13px] font-semibold text-[#444651] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTransaction(deleteConfirmTx.id);
                  setDeleteConfirmTx(null);
                }}
                className="px-4 py-2 text-[13px] font-semibold bg-[#ba1a1a] hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>Hapus Transaksi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Konfirmasi Hapus Semua Pemasukan */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-red-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#131b2e]">Hapus Semua Riwayat Pemasukan?</h3>
                <p className="text-[13px] text-[#757682] mt-1.5 leading-relaxed">
                  Tindakan ini akan menghapus seluruh <strong>{allIncomes.length} transaksi</strong> pemasukan dengan total nilai <strong className="text-emerald-700">+{formatRupiah(totalIncomeSum, true)}</strong>.
                </p>
                <div className="mt-3 p-3.5 bg-red-50/80 rounded-xl border border-red-200 text-[12px] text-red-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>Perhatian:</span>
                  </div>
                  <ul className="list-disc list-inside text-[11.5px] text-red-800/90 space-y-0.5 pl-1">
                    <li>Total saldo likuid akan dikurangi sebesar total nominal pemasukan yang dihapus.</li>
                    <li>Semua histori pencatatan kas masuk akan dibersihkan dari buku kas.</li>
                    <li>Tindakan ini tidak dapat dibatalkan.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#c5c5d3]/50">
              <button
                type="button"
                onClick={() => setShowClearAllModal(false)}
                className="px-4 py-2 text-[13px] font-semibold text-[#444651] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  clearTransactionsByType('inflow');
                  setShowClearAllModal(false);
                }}
                className="px-4 py-2 text-[13px] font-semibold bg-[#ba1a1a] hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                <span>Ya, Hapus Semua Pemasukan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
