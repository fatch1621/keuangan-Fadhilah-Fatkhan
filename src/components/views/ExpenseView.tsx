import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Transaction } from '../../types';

export const ExpenseView: React.FC = () => {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    clearTransactionsByType,
    formatRupiah,
    envelopes,
    setCurrentView,
    showToast,
  } = useApp();

  // Interactive Calculator State
  const [calcDisplay, setCalcDisplay] = useState('750000');
  const [calcExpression, setCalcExpression] = useState('750000');
  const [isCalculated, setIsCalculated] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('Belanja Bulanan Supermarket GrandLucky');
  const [category, setCategory] = useState('Kebutuhan Pokok');
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState('env-1');
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori');

  // Deletion modals state
  const [showClearModal, setShowClearModal] = useState(false);
  const [deleteConfirmTx, setDeleteConfirmTx] = useState<Transaction | null>(null);

  // Find active envelope
  const currentEnvelope = envelopes.find((e) => e.id === selectedEnvelopeId) || envelopes[0];
  const expenseAmount = parseInt(calcDisplay, 10) || 0;
  const currentRemaining = Math.max(0, currentEnvelope.target - currentEnvelope.spent);
  const remainingAfterTx = Math.max(0, currentRemaining - expenseAmount);

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
    if (!expenseAmount || expenseAmount <= 0) {
      showToast('Masukkan nominal pengeluaran yang valid.');
      return;
    }

    addTransaction({
      type: 'outflow',
      date: 'Hari ini',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      description: title || 'Pengeluaran Baru',
      notes: notes || 'Pengeluaran operasional',
      category,
      planEnvelope: currentEnvelope.name,
      account: 'Kas Utama',
      amount: expenseAmount,
      status: 'Sesuai Budget',
    });

    setNotes('');
  };

  // Filtered expense transactions
  const allExpenses = transactions.filter((tx) => tx.type === 'outflow');
  const totalExpenseSum = allExpenses.reduce((acc, tx) => acc + tx.amount, 0);

  const expenseTx = transactions.filter((tx) => {
    if (tx.type !== 'outflow') return false;
    const matchesCategory = categoryFilter === 'Semua Kategori' || tx.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.notes && tx.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-[1440px] w-full mx-auto">
      {/* 1. Header Halaman */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#c5c5d3]/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 text-[#ba1a1a] rounded-xl border border-red-100 flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-2xl fill-1">arrow_circle_up</span>
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-[#00236f] tracking-tight">Input &amp; Kelola Pengeluaran</h1>
            <p className="text-[14px] text-[#757682] mt-0.5">
              Catat belanja dan potong langsung dari amplop planning anggaran yang telah disiapkan.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Periode Selector */}
          <div className="relative inline-flex items-center">
            <select className="appearance-none bg-white border border-[#c5c5d3] rounded-lg py-2 pl-3.5 pr-9 text-[13px] text-[#131b2e] font-medium hover:border-[#0051d5] focus:outline-none shadow-xs cursor-pointer">
              <option value="okt24">Oktober 2024 (Bulan Ini)</option>
              <option value="sep24">September 2024</option>
              <option value="agu24">Agustus 2024</option>
              <option value="jul24">Juli 2024</option>
            </select>
            <span className="material-symbols-outlined text-[#757682] pointer-events-none absolute right-2.5 text-base">
              expand_more
            </span>
          </div>

          <button
            onClick={() => showToast('Filter pengeluaran disesuaikan.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#c5c5d3] hover:bg-[#f2f3ff] rounded-lg text-[13px] text-[#131b2e] transition-colors shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Filter</span>
          </button>
          <button
            onClick={() => showToast('Mengekspor laporan mutasi belanja ke Excel (.CSV)...')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#c5c5d3] hover:border-[#0051d5] hover:text-[#0051d5] rounded-lg text-[13px] font-semibold text-[#00236f] transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Ekspor (.CSV / Excel)</span>
          </button>
        </div>
      </section>

      {/* 2. Main 2-Column Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM INPUT & KALKULATOR (5 Cols) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#c5c5d3]/80 shadow-sm overflow-hidden sticky top-24">
            {/* Header Card Form */}
            <div className="p-5 bg-gradient-to-r from-[#1e3a8a] to-[#0051d5] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-xl">calculate</span>
                <span className="text-[18px] font-semibold tracking-tight">Form Input Pengeluaran</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-md border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Live Budget Deduction
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Interactive Nominal Display Area */}
              <div className="bg-[#f2f3ff] rounded-xl p-4 border border-[#c5c5d3]/60 focus-within:border-[#0051d5] transition-all">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-[#757682] tracking-wider font-bold">NOMINAL PENGELUARAN</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#0051d5]/10 text-[#0051d5] border border-[#0051d5]/20">
                    Mode Kalkulator Aktif
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[20px] text-[#757682] font-medium">IDR</span>
                  <div className="text-right">
                    <span className="text-[32px] font-bold text-[#00236f] tabular-nums tracking-tight font-mono">
                      {(parseInt(calcDisplay, 10) || 0).toLocaleString('id-ID')}
                    </span>
                    <span className="text-[12px] text-[#757682] block mt-0.5">
                      Tujuh ratus lima puluh ribu rupiah
                    </span>
                  </div>
                </div>
              </div>

              {/* Shortcut Chips Bar */}
              <div className="space-y-2">
                <span className="text-[12px] text-[#444651] font-semibold">Shortcut Cepat Nominal</span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(50000)}
                    className="py-1.5 px-2 bg-[#eaedff] rounded-lg border border-[#c5c5d3]/60 text-[13px] font-semibold text-[#00236f] hover:bg-[#316bf3] hover:text-white transition-all text-center cursor-pointer"
                  >
                    +50rb
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(100000)}
                    className="py-1.5 px-2 bg-[#eaedff] rounded-lg border border-[#c5c5d3]/60 text-[13px] font-semibold text-[#00236f] hover:bg-[#316bf3] hover:text-white transition-all text-center cursor-pointer"
                  >
                    +100rb
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(500000)}
                    className="py-1.5 px-2 bg-[#eaedff] rounded-lg border border-[#c5c5d3]/60 text-[13px] font-semibold text-[#00236f] hover:bg-[#316bf3] hover:text-white transition-all text-center cursor-pointer"
                  >
                    +500rb
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickShortcut(1000000)}
                    className="py-1.5 px-2 bg-[#eaedff] rounded-lg border border-[#c5c5d3]/60 text-[13px] font-semibold text-[#00236f] hover:bg-[#316bf3] hover:text-white transition-all text-center cursor-pointer"
                  >
                    +1jt
                  </button>
                </div>
              </div>

              {/* Numpad Kalkulator */}
              <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3]/50">
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCalcInput('7')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    7
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('8')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    8
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('9')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    9
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcOp('+')}
                    className="h-11 rounded-lg bg-[#eaedff] text-[#0051d5] font-bold text-lg hover:bg-[#0051d5]/15 border border-[#c5c5d3]/50 active:scale-95 transition-all cursor-pointer"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCalcInput('4')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('5')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    5
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('6')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    6
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcOp('-')}
                    className="h-11 rounded-lg bg-[#eaedff] text-[#0051d5] font-bold text-lg hover:bg-[#0051d5]/15 border border-[#c5c5d3]/50 active:scale-95 transition-all cursor-pointer"
                  >
                    -
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCalcInput('1')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('2')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('3')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcOp('*')}
                    className="h-11 rounded-lg bg-[#eaedff] text-[#0051d5] font-bold text-lg hover:bg-[#0051d5]/15 border border-[#c5c5d3]/50 active:scale-95 transition-all cursor-pointer"
                  >
                    ×
                  </button>

                  <button
                    type="button"
                    onClick={handleCalcClear}
                    className="h-11 rounded-lg bg-[#ffdad6]/50 text-[#ba1a1a] font-bold text-base hover:bg-[#ffdad6] border border-[#ba1a1a]/30 active:scale-95 transition-all cursor-pointer"
                  >
                    C
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('0')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-lg hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalcInput('000')}
                    className="h-11 rounded-lg bg-white text-[#00236f] font-bold text-sm hover:bg-[#dae2fd]/70 border border-[#c5c5d3]/50 shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    000
                  </button>
                  <button
                    type="button"
                    onClick={handleCalcEquals}
                    className="h-11 rounded-lg bg-amber-500 text-amber-950 font-bold text-lg hover:bg-amber-400 border border-amber-600/30 active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    =
                  </button>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="space-y-4">
                {/* 1. Kegunaan / Keperluan Pengeluaran */}
                <div>
                  <label className="block text-[13px] text-[#131b2e] font-semibold mb-1.5">
                    Kegunaan / Keperluan Pengeluaran <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#757682] text-lg">
                      shopping_bag
                    </span>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Contoh: Belanja Bulanan Supermarket / Tagihan Listrik"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#c5c5d3] bg-white text-[13px] text-[#131b2e] placeholder:text-[#757682] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 transition-all"
                    />
                  </div>
                </div>

                {/* 2. Kategori Pengeluaran */}
                <div>
                  <label className="block text-[13px] text-[#131b2e] font-semibold mb-1.5">
                    Kategori Pengeluaran <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#757682] text-lg">
                      category
                    </span>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-10 pr-9 py-2.5 appearance-none rounded-lg border border-[#c5c5d3] bg-white text-[13px] text-[#131b2e] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 transition-all cursor-pointer"
                    >
                      <option value="Kebutuhan Pokok">Kebutuhan Pokok</option>
                      <option value="Gaya Hidup">Gaya Hidup &amp; Hiburan</option>
                      <option value="Cicilan & Utang">Cicilan &amp; Utang</option>
                      <option value="Utilitas Rumah">Tagihan &amp; Utilitas</option>
                      <option value="Kesehatan">Kesehatan</option>
                      <option value="Transportasi">Transportasi</option>
                    </select>
                    <span className="material-symbols-outlined text-[#757682] pointer-events-none absolute right-3 top-3 text-base">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* 3. Hubungkan ke Planing (Budget Envelope) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[13px] text-[#131b2e] font-semibold">
                      Hubungkan ke Planing (Budget Envelope) <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCurrentView('planing')}
                      className="text-[11px] text-[#0051d5] font-semibold hover:underline cursor-pointer"
                    >
                      Kelola Amplop
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#757682] text-lg">
                      savings
                    </span>
                    <select
                      value={selectedEnvelopeId}
                      onChange={(e) => setSelectedEnvelopeId(e.target.value)}
                      className="w-full pl-10 pr-9 py-2.5 appearance-none rounded-lg border border-[#0051d5]/40 bg-white text-[13px] text-[#131b2e] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 transition-all font-medium cursor-pointer"
                    >
                      {envelopes.map((env) => (
                        <option key={env.id} value={env.id}>
                          {env.name} (Sisa Kuota: {formatRupiah(Math.max(0, env.target - env.spent))})
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined text-[#757682] pointer-events-none absolute right-3 top-3 text-base">
                      expand_more
                    </span>
                  </div>
                  <p className="text-[11px] text-[#757682] mt-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-amber-500">info</span>
                      Sisa amplop setelah transaksi ini akan menjadi:
                    </span>
                    <strong className="text-[#00236f] font-mono tabular-nums">
                      {formatRupiah(remainingAfterTx)}
                    </strong>
                  </p>
                </div>

                {/* Deskripsi / Catatan Tambahan */}
                <div>
                  <label className="block text-[13px] text-[#131b2e] font-semibold mb-1.5">
                    Deskripsi / Catatan Tambahan
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Rincian kwitansi, nomor resi, atau rekanan vendor..."
                    rows={2}
                    className="w-full p-3 rounded-lg border border-[#c5c5d3] bg-white text-[13px] text-[#131b2e] placeholder:text-[#757682] focus:border-[#0051d5] transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button with Amber/Orange Accent */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-base shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">trending_down</span>
                    <span>Catat Pengeluaran</span>
                  </button>
                  <p className="text-center text-[11px] text-[#757682] mt-2.5">
                    Pengeluaran akan langsung memotong sisa kuota amplop pada laman Planing
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: STATISTIK & RIWAYAT PENGELUARAN (7 Cols) */}
        <div className="xl:col-span-7 space-y-6">
          {/* 3 Ringkasan Statistik Pengeluaran Atas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1 */}
            <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#757682] font-semibold uppercase">Total Pengeluaran</span>
                <span className="p-1.5 bg-red-50 text-[#ba1a1a] rounded-lg">
                  <span className="material-symbols-outlined text-base">payments</span>
                </span>
              </div>
              <div className="text-[22px] font-bold text-[#00236f] tabular-nums font-mono">
                {formatRupiah(14250000)}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                  <span className="material-symbols-outlined text-xs mr-0.5">trending_down</span>
                  -3.1%
                </span>
                <span className="text-[11px] text-[#757682]">efisien vs bulan lalu</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#757682] font-semibold uppercase">Rata-rata Harian</span>
                <span className="p-1.5 bg-blue-50 text-[#0051d5] rounded-lg">
                  <span className="material-symbols-outlined text-base">calendar_view_day</span>
                </span>
              </div>
              <div className="text-[22px] font-bold text-[#00236f] tabular-nums font-mono">
                {formatRupiah(475000)} <span className="text-xs font-normal text-[#757682]">/ hari</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                  Terkontrol
                </span>
                <span className="text-[11px] text-[#757682]">Batas: Rp 600rb</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/80 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#757682] font-semibold uppercase">Beban Terbesar</span>
                <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                  <span className="material-symbols-outlined text-base">pie_chart</span>
                </span>
              </div>
              <div className="text-[16px] font-bold text-[#00236f] truncate">
                Cicilan Properti
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[13px] font-bold text-[#131b2e] tabular-nums font-mono">
                  {formatRupiah(4000000)}
                </span>
                <span className="text-[11px] font-semibold text-[#757682]">28% belanja</span>
              </div>
            </div>
          </div>

          {/* Card Tabel Riwayat Transaksi Keluar */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/80 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#c5c5d3]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-[16px] font-bold text-[#00236f]">Riwayat Transaksi Keluar</h3>
                <p className="text-[12px] text-[#757682]">Mutasi riil dan pemotongan amplop alokasi</p>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                {/* Search bar */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#757682] text-sm">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari transaksi..."
                    className="pl-8 pr-3 py-1.5 text-[12px] rounded-lg border border-[#c5c5d3] bg-[#f2f3ff] focus:border-[#0051d5] focus:outline-none w-44"
                  />
                </div>
                {/* Category dropdown filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="py-1.5 pl-2.5 pr-7 text-[12px] rounded-lg border border-[#c5c5d3] bg-[#f2f3ff] text-[#131b2e] focus:outline-none cursor-pointer"
                >
                  <option>Semua Kategori</option>
                  <option>Kebutuhan Pokok</option>
                  <option>Gaya Hidup</option>
                  <option>Cicilan &amp; Utang</option>
                  <option>Utilitas Rumah</option>
                  <option>Transportasi</option>
                </select>

                {/* Tombol Hapus Semua Pengeluaran */}
                <button
                  type="button"
                  onClick={() => setShowClearModal(true)}
                  disabled={allExpenses.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:hover:bg-red-50 text-[#ba1a1a] border border-red-200 rounded-lg text-[12px] font-semibold transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                  title="Hapus seluruh riwayat transaksi pengeluaran"
                >
                  <span className="material-symbols-outlined text-base">delete_sweep</span>
                  <span>Hapus Semua</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto custom-scroll">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f2f3ff]/70 border-b border-[#c5c5d3]/70 text-[11px] font-bold text-[#757682] uppercase tracking-wider">
                    <th className="py-3 px-4">TANGGAL &amp; WAKTU</th>
                    <th className="py-3 px-4">KEGUNAAN &amp; CATATAN</th>
                    <th className="py-3 px-4">KATEGORI</th>
                    <th className="py-3 px-4">POTONGAN PLANING</th>
                    <th className="py-3 px-4 text-right">NOMINAL KELUAR</th>
                    <th className="py-3 px-4 text-center w-20">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c5d3]/40 text-[13px]">
                  {expenseTx.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#f2f3ff]/40 transition-colors">
                      <td className="py-3.5 px-4 tabular-nums">
                        <span className="font-medium text-[#131b2e] block">{tx.date}</span>
                        <span className="text-[11px] text-[#757682]">{tx.time}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#131b2e]">{tx.description}</div>
                        <span className="text-[11px] text-[#757682]">{tx.notes}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                            tx.category.includes('Gaya Hidup')
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : tx.category.includes('Pokok')
                              ? 'bg-blue-50 text-[#0051d5] border-blue-200'
                              : tx.category.includes('Cicilan')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#131b2e] font-medium">{tx.planEnvelope || 'Amplop Pokok'}</span>
                          {tx.status === 'Warning' && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-[#ba1a1a]">
                              Warning 92%
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums font-bold text-[#ba1a1a] font-mono">
                        -{formatRupiah(tx.amount)}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmTx(tx)}
                            className="p-1.5 text-[#757682] hover:text-[#ba1a1a] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Hapus transaksi pengeluaran ini"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {expenseTx.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-[#757682]">
                        Tidak ada transaksi pengeluaran yang cocok dengan kriteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 bg-[#f2f3ff]/40 border-t border-[#c5c5d3]/60 flex items-center justify-between text-[12px]">
              <span className="text-[#757682]">
                Menampilkan <strong className="text-[#00236f] font-semibold">{expenseTx.length}</strong> transaksi
              </span>
              <div className="flex items-center gap-1.5">
                <button disabled className="px-2.5 py-1 text-[11px] text-[#757682] rounded border border-[#c5c5d3] bg-white disabled:opacity-50">
                  Prev
                </button>
                <button className="px-2.5 py-1 text-[11px] bg-[#00236f] text-white rounded font-semibold">
                  1
                </button>
                <button className="px-2.5 py-1 text-[11px] text-[#131b2e] rounded border border-[#c5c5d3] bg-white">
                  2
                </button>
                <button className="px-2.5 py-1 text-[11px] text-[#131b2e] rounded border border-[#c5c5d3] bg-white">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Banner Peringatan Anggaran Cerdas (Budget Guard) */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-amber-500 text-white rounded-lg shadow-xs shrink-0">
                <span className="material-symbols-outlined text-2xl">shield</span>
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-amber-950">Peringatan Anggaran Cerdas (Budget Guard)</h4>
                <p className="text-[13px] text-amber-900/80 mt-0.5">
                  Pos <strong>Gaya Hidup &amp; Hiburan</strong> telah mencapai <strong>92%</strong> dari batas plotting. Disarankan pengetatan alokasi selama 5 hari ke depan agar arus kas surplus tetap aman.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('planing')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-[13px] font-semibold rounded-lg shadow-xs whitespace-nowrap transition-colors cursor-pointer"
            >
              <span>Review Alokasi Planing</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: Konfirmasi Hapus Transaksi Tunggal */}
      {deleteConfirmTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c5c5d3] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">delete_forever</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#131b2e]">Hapus Transaksi Pengeluaran?</h3>
                <p className="text-[13px] text-[#757682] mt-1">
                  Transaksi berikut akan dihapus dan nominal belanja akan dikembalikan ke saldo likuid serta amplop alokasi:
                </p>
                <div className="mt-3 p-3 bg-[#f2f3ff] rounded-lg border border-[#c5c5d3]/60 space-y-1">
                  <div className="font-semibold text-[#131b2e] text-[14px]">{deleteConfirmTx.description}</div>
                  <div className="flex items-center justify-between text-[12px] text-[#757682]">
                    <span>{deleteConfirmTx.date} • {deleteConfirmTx.category}</span>
                    <span className="font-bold text-[#ba1a1a] font-mono">
                      -{formatRupiah(deleteConfirmTx.amount, true)}
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

      {/* MODAL 2: Konfirmasi Hapus Semua Pengeluaran */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-red-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#131b2e]">Hapus Semua Riwayat Pengeluaran?</h3>
                <p className="text-[13px] text-[#757682] mt-1.5 leading-relaxed">
                  Tindakan ini akan menghapus seluruh <strong>{allExpenses.length} transaksi</strong> pengeluaran dengan total nilai <strong className="text-[#ba1a1a]">{formatRupiah(totalExpenseSum, true)}</strong>.
                </p>
                <div className="mt-3 p-3.5 bg-red-50/80 rounded-xl border border-red-200 text-[12px] text-red-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#ba1a1a]">
                    <span className="material-symbols-outlined text-base">info</span>
                    <span>Dampak Pemulihan Otomatis:</span>
                  </div>
                  <ul className="list-disc list-inside text-[11.5px] text-red-800/90 space-y-0.5 pl-1">
                    <li>Seluruh dana pengeluaran akan dikreditkan kembali ke Saldo Likuid.</li>
                    <li>Sisa kuota amplop pada laman Planing Anggaran akan dipulihkan.</li>
                    <li>Tindakan ini tidak dapat dibatalkan.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#c5c5d3]/50">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 text-[13px] font-semibold text-[#444651] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  clearTransactionsByType('outflow');
                  setShowClearModal(false);
                }}
                className="px-4 py-2 text-[13px] font-semibold bg-[#ba1a1a] hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                <span>Ya, Hapus Semua Pengeluaran</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
