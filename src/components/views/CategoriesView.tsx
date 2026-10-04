import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const CategoriesView: React.FC = () => {
  const { categories, addCategory, deleteCategory, formatRupiah, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'inflow' | 'outflow'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [catType, setCatType] = useState<'inflow' | 'outflow'>('outflow');
  const [catName, setCatName] = useState('Konsumsi & F&B Harian');
  const [selectedIcon, setSelectedIcon] = useState('restaurant');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [bindingEnvelope, setBindingEnvelope] = useState('Kebutuhan Pokok');
  const [defaultLimit, setDefaultLimit] = useState('3500000');
  const [tags, setTags] = useState<string[]>(['Bahan Makanan', 'Makan Luar', 'Kopi/Snack']);
  const [newTagInput, setNewTagInput] = useState('');

  const iconsList = [
    'shopping_bag',
    'restaurant',
    'home',
    'work',
    'trending_up',
    'health_and_safety',
    'school',
    'flight',
    'directions_car',
    'sports_esports',
    'payment',
    'savings',
  ];

  const colorsList = [
    { id: 'blue', bg: 'bg-blue-600', ring: 'ring-blue-600', title: 'Biru Safir' },
    { id: 'amber', bg: 'bg-amber-500', ring: 'ring-amber-500', title: 'Amber Emas' },
    { id: 'emerald', bg: 'bg-emerald-600', ring: 'ring-emerald-600', title: 'Hijau Emerald' },
    { id: 'purple', bg: 'bg-purple-600', ring: 'ring-purple-600', title: 'Ungu Royal' },
    { id: 'rose', bg: 'bg-rose-500', ring: 'ring-rose-500', title: 'Merah Coral' },
    { id: 'teal', bg: 'bg-teal-500', ring: 'ring-teal-500', title: 'Toska Cyan' },
    { id: 'indigo', bg: 'bg-indigo-600', ring: 'ring-indigo-600', title: 'Deep Indigo' },
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(newTagInput.trim())) {
        setTags([...tags, newTagInput.trim()]);
      }
      setNewTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      showToast('Masukkan nama kategori.');
      return;
    }

    addCategory({
      name: catName,
      type: catType,
      icon: selectedIcon,
      color: selectedColor,
      monthlyAverageOrLimit: parseInt(defaultLimit, 10) || 1000000,
      subtitle: `${tags.length} Sub-kategori: ${tags.join(', ')}`,
      tag: catType === 'inflow' ? 'Pemasukan' : 'Pengeluaran',
      bindingEnvelope,
      subcategories: tags,
    });

    setCatName('');
    showToast(`Kategori "${catName}" berhasil disimpan.`);
  };

  const filteredCategories = categories.filter((cat) => {
    const matchesTab = activeTab === 'all' || cat.type === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const inflowCats = filteredCategories.filter((c) => c.type === 'inflow');
  const outflowCats = filteredCategories.filter((c) => c.type === 'outflow');

  return (
    <div className="space-y-6 max-w-[1440px] w-full mx-auto">
      {/* Page Title & Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#c5c5d3]/70 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-[26px] font-bold text-[#00236f] tracking-tight">Kategori Transaksi &amp; Pos Anggaran</h1>
            <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#eaedff] text-[#0051d5] border border-[#dce1ff]">
              Live Sync
            </span>
          </div>
          <p className="text-[14px] text-[#757682] max-w-2xl">
            Kelola klasifikasi pos pemasukan dan alokasi pengeluaran untuk otomasi pencatatan dan sinkronisasi amplop anggaran keluarga Anda secara presisi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => showToast('Template kategori standar OJK/CFP berhasil diterapkan.')}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#c5c5d3] hover:border-[#0051d5] hover:bg-[#faf8ff] text-[#131b2e] text-[13px] font-medium flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#757682]">file_download</span>
            <span>Import / Template Standar</span>
          </button>
          <button
            onClick={() => showToast('Mode atur ulang prioritas drag-and-drop aktif.')}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#c5c5d3] hover:border-[#0051d5] hover:bg-[#faf8ff] text-[#131b2e] text-[13px] font-medium flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base text-[#757682]">swap_vert</span>
            <span>Atur Ulang Prioritas</span>
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('category-name');
              el?.focus();
              showToast('Silakan isi formulir di panel sebelah kiri.');
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-[13px] font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Tambah Kategori Baru</span>
          </button>
        </div>
      </div>

      {/* Segmented View Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#c5c5d3]/50 pb-3 gap-3">
        <div className="flex items-center gap-2 bg-[#f2f3ff] p-1 rounded-xl border border-[#c5c5d3]/50 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'all' ? 'bg-white text-[#00236f] shadow-sm' : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            <span>Semua Kategori</span>
            <span className="px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#00236f] text-xs font-bold font-mono">
              {categories.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('inflow')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'inflow' ? 'bg-white text-[#00236f] shadow-sm font-semibold' : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            <span>Kategori Pemasukan</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
              {categories.filter((c) => c.type === 'inflow').length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('outflow')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-[13px] font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'outflow' ? 'bg-white text-[#00236f] shadow-sm font-semibold' : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            <span>Kategori Pengeluaran</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-[#ba1a1a] text-xs font-bold font-mono">
              {categories.filter((c) => c.type === 'outflow').length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-[#757682]">
          <span className="material-symbols-outlined text-base text-[#0051d5]">sync</span>
          <span>Status Otomasi: Real-Time Active</span>
        </div>
      </div>

      {/* 2-COLUMN MAIN CONTENT GRID */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM INPUT / TAMBAH KATEGORI (4 Cols) */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <div className="bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm overflow-hidden sticky top-24">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#1e3a8a] to-[#0051d5] p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-xl">tune</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold tracking-tight">Tambah / Edit Kategori</h3>
                    <p className="text-[12px] text-[#dae2fd]">Atur parameter pos dan integrasi anggaran</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-white/15 text-[11px] font-mono font-medium tracking-wide">
                  CONFIG-ID #{categories.length + 1}
                </span>
              </div>
            </div>

            {/* Form Body */}
            <form className="p-6 space-y-5" onSubmit={handleFormSubmit}>
              {/* Tipe Kategori Toggle Switch */}
              <div>
                <label className="block text-[11px] text-[#757682] font-semibold mb-2 uppercase tracking-wider">
                  TIPE ALOKASI TRANSAKSI
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#f2f3ff] rounded-lg border border-[#c5c5d3]/50">
                  <button
                    type="button"
                    onClick={() => setCatType('inflow')}
                    className={`py-2 px-3 rounded-md text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      catType === 'inflow'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                        : 'text-[#444651] hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base text-emerald-600">arrow_downward</span>
                    <span>Pemasukan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatType('outflow')}
                    className={`py-2 px-3 rounded-md text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      catType === 'outflow'
                        ? 'bg-rose-50 text-rose-800 border border-rose-300 shadow-xs'
                        : 'text-[#444651] hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base text-rose-600">arrow_upward</span>
                    <span>Pengeluaran</span>
                  </button>
                </div>
              </div>

              {/* Nama Kategori */}
              <div>
                <label className="block text-[11px] text-[#131b2e] font-semibold mb-1.5 uppercase" htmlFor="category-name">
                  NAMA KATEGORI <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  id="category-name"
                  type="text"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="misal: Konsumsi & F&B, Side Hustle, Dividen"
                  required
                  className="w-full h-11 px-3.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] focus:ring-2 focus:ring-[#0051d5]/20 outline-none transition-all"
                />
              </div>

              {/* Pilihan Ikon Material Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] text-[#131b2e] font-semibold uppercase">PILIH IKON KATEGORI</label>
                  <span className="text-xs text-[#0051d5] font-medium">Terpilih: {selectedIcon}</span>
                </div>
                <div className="grid grid-cols-6 gap-2 p-3 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3]/50">
                  {iconsList.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                        selectedIcon === icon
                          ? 'bg-[#316bf3] text-white border border-[#0051d5] shadow-xs'
                          : 'text-[#444651] hover:bg-white hover:text-[#131b2e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Palette Aksen Warna */}
              <div>
                <label className="block text-[11px] text-[#131b2e] font-semibold mb-2 uppercase">PALETTE AKSEN WARNA</label>
                <div className="flex items-center justify-between p-2.5 bg-[#f2f3ff] rounded-xl border border-[#c5c5d3]/50">
                  {colorsList.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color.id)}
                      title={color.title}
                      className={`w-7 h-7 rounded-full ${color.bg} transition-transform cursor-pointer ${
                        selectedColor === color.id ? 'ring-2 ring-offset-2 scale-110 shadow-xs' : 'hover:scale-105'
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Hubungkan Default ke Planing Bulanan */}
              <div>
                <label className="block text-[11px] text-[#131b2e] font-semibold mb-1.5 uppercase" htmlFor="binding-envelope">
                  SINKRONISASI PLANING BULANAN (ENVELOPE BINDING)
                </label>
                <div className="relative">
                  <select
                    id="binding-envelope"
                    value={bindingEnvelope}
                    onChange={(e) => setBindingEnvelope(e.target.value)}
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] text-[13px] focus:border-[#0051d5] outline-none appearance-none cursor-pointer"
                  >
                    <option value="Kebutuhan Pokok">Kebutuhan Pokok (Amplop Rutin)</option>
                    <option value="Tabungan & Investasi">Tabungan &amp; Investasi</option>
                    <option value="Cicilan & Utang">Cicilan &amp; Utang</option>
                    <option value="Dana Darurat">Dana Darurat</option>
                    <option value="Gaya Hidup & Hiburan">Gaya Hidup &amp; Hiburan</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-[#757682] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Batasan Default Anggaran Bulanan */}
              <div>
                <label className="block text-[11px] text-[#131b2e] font-semibold mb-1.5 uppercase" htmlFor="budget-limit">
                  BATASAN DEFAULT ANGGARAN BULANAN
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-0 pl-3.5 flex items-center pointer-events-none text-[#757682] font-bold text-[13px]">
                    IDR / Rp
                  </div>
                  <input
                    id="budget-limit"
                    type="text"
                    value={defaultLimit}
                    onChange={(e) => setDefaultLimit(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full h-11 pl-20 pr-3.5 rounded-lg border border-[#c5c5d3] bg-white text-[#131b2e] font-semibold text-[16px] focus:border-[#0051d5] outline-none tabular-nums font-mono transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#757682] mt-1">Nilai alokasi rekomendasi saat pembuatan anggaran bulan berikutnya.</p>
              </div>

              {/* Sub-kategori Pos (Tags) */}
              <div>
                <label className="block text-[11px] text-[#131b2e] font-semibold mb-1.5 uppercase">
                  SUB-KATEGORI POS (TAGS)
                </label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-lg border border-[#c5c5d3] bg-white min-h-[44px]">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#eaedff] text-[#131b2e] text-xs font-medium"
                    >
                      {tag}
                      <span
                        onClick={() => removeTag(tag)}
                        className="material-symbols-outlined text-xs cursor-pointer hover:text-[#ba1a1a]"
                      >
                        close
                      </span>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="+ Tambah tag..."
                    className="border-0 p-1 text-xs outline-none text-[#757682] bg-transparent w-24"
                  />
                </div>
              </div>

              {/* Tombol Aksi Form */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">save</span>
                  <span>Simpan Kategori</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCatName('');
                    setTags([]);
                    showToast('Form direset.');
                  }}
                  className="py-3 px-4 rounded-lg border border-[#c5c5d3] bg-white hover:bg-[#f2f3ff] text-[#444651] text-[13px] font-medium transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Micro Banner / Tip Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#f2f3ff] to-[#dae2fd]/40 border border-[#c5c5d3]/60 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#0051d5] text-2xl">lightbulb</span>
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#131b2e]">Tips Alokasi Sovereign Wealth:</span>
              <p className="text-[#444651] leading-relaxed">
                Gunakan pembagian 50/30/20 otomatis: 50% Pos Kebutuhan Pokok, 30% Gaya Hidup &amp; Opsional, 20% Investasi &amp; Dana Cadangan Darurat.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DAFTAR & MANAJEMEN KATEGORI (8 Cols) */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          {/* Quick Metric Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metric 1: Total Pos */}
            <div className="p-5 bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#757682]">
                <span className="text-[11px] uppercase font-semibold">TOTAL POS KATEGORI AKTIF</span>
                <span className="material-symbols-outlined text-[#0051d5] text-xl">apps</span>
              </div>
              <div className="mt-3">
                <div className="text-[28px] font-bold text-[#00236f] font-mono">
                  {categories.length} <span className="text-[14px] font-normal text-[#757682]">Kategori</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    {categories.filter((c) => c.type === 'inflow').length} Pemasukan
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                    {categories.filter((c) => c.type === 'outflow').length} Pengeluaran
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 2: Pengeluaran Terbesar */}
            <div className="p-5 bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#757682]">
                <span className="text-[11px] uppercase font-semibold">PENGELUARAN TERBESAR</span>
                <span className="material-symbols-outlined text-[#ba1a1a] text-xl">trending_down</span>
              </div>
              <div className="mt-3">
                <div className="text-[16px] font-bold text-[#131b2e]">Kebutuhan Pokok</div>
                <div className="mt-1 flex items-baseline justify-between font-mono">
                  <span className="text-[20px] font-bold text-[#00236f] tracking-tight">Rp 8.000.000</span>
                  <span className="text-[11px] text-[#757682]">/ bulan</span>
                </div>
                <div className="mt-2 text-xs text-rose-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                  Porsi 42% dari total pengeluaran
                </div>
              </div>
            </div>

            {/* Metric 3: Pemasukan Dominan */}
            <div className="p-5 bg-white rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#757682]">
                <span className="text-[11px] uppercase font-semibold">PEMASUKAN DOMINAN</span>
                <span className="material-symbols-outlined text-emerald-600 text-xl">account_balance_wallet</span>
              </div>
              <div className="mt-3">
                <div className="text-[16px] font-bold text-[#131b2e]">Gaji &amp; Upah Eksekutif</div>
                <div className="mt-1 flex items-baseline justify-between font-mono">
                  <span className="text-[20px] font-bold text-[#00236f] tracking-tight">65%</span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Kontribusi Utama
                  </span>
                </div>
                <div className="mt-2 text-xs text-[#757682]">Rata-rata: Rp 35.000.000 / bln</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-[#c5c5d3]/70 shadow-xs">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#757682] text-xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama kategori, subpos, atau kode..."
                className="w-full h-10 pl-11 pr-4 rounded-lg bg-[#f2f3ff] border border-transparent focus:border-[#0051d5] focus:bg-white text-[13px] outline-none transition-all"
              />
            </div>
          </div>

          {/* GRUP 1: KATEGORI PEMASUKAN */}
          {(activeTab === 'all' || activeTab === 'inflow') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h2 className="text-[18px] font-bold text-[#131b2e] tracking-tight">
                    Kategori Pemasukan (Inflow Streams)
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {inflowCats.length} Pos Terdaftar
                  </span>
                </div>
                <span className="text-[12px] text-[#757682] font-medium">Subtotal Estimasi: Rp 46.500.000 / bln</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {inflowCats.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white p-4 rounded-xl border border-[#c5c5d3]/70 hover:border-[#0051d5]/40 shadow-xs hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#131b2e] text-[15px] group-hover:text-[#0051d5] transition-colors">
                            {cat.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {cat.tag}
                            </span>
                            <span className="text-xs text-[#757682]">• {cat.bindingEnvelope}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={() => showToast(`Edit kategori ${cat.name}`)}
                          className="p-1 rounded hover:bg-[#eaedff] text-[#757682] hover:text-[#00236f] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="p-1 rounded hover:bg-[#eaedff] text-[#757682] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-baseline justify-between font-mono">
                      <span className="text-xs text-[#757682]">Rata-rata Masuk Bulanan:</span>
                      <span className="text-[16px] font-bold text-emerald-700 tabular-nums">
                        {formatRupiah(cat.monthlyAverageOrLimit)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GRUP 2: KATEGORI PENGELUARAN */}
          {(activeTab === 'all' || activeTab === 'outflow') && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                  <h2 className="text-[18px] font-bold text-[#131b2e] tracking-tight">
                    Kategori Pengeluaran (Outflow &amp; Budget Allocations)
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#ba1a1a] text-xs font-bold border border-rose-200">
                    {outflowCats.length} Pos Terkelola
                  </span>
                </div>
                <span className="text-[12px] text-[#757682] font-medium">Batas Maksimal: Rp 25.000.000 / bln</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {outflowCats.map((cat) => (
                  <div
                    key={cat.id}
                    className={`bg-white p-4 rounded-xl border shadow-xs hover:shadow-md transition-all group relative overflow-hidden ${
                      cat.isWarning ? 'border-amber-300' : 'border-[#c5c5d3]/70 hover:border-[#0051d5]/40'
                    }`}
                  >
                    {cat.isWarning && (
                      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                        <div className="bg-amber-500 text-white text-[9px] font-bold py-0.5 px-4 transform rotate-45 translate-x-3 translate-y-2 shadow-xs text-center">
                          WARN
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-blue-100 text-[#00236f] flex items-center justify-center shadow-xs">
                          <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#131b2e] text-[15px] group-hover:text-[#0051d5] transition-colors">
                            {cat.name}
                          </h4>
                          <p className="text-xs text-[#757682]">{cat.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 pr-4">
                        <button
                          onClick={() => showToast(`Edit kategori ${cat.name}`)}
                          className="p-1 rounded hover:bg-[#eaedff] text-[#757682] hover:text-[#00236f] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="p-1 rounded hover:bg-[#eaedff] text-[#757682] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1.5 font-mono">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[#444651]">
                          Alokasi Plafon: <strong className="text-[#131b2e]">{formatRupiah(cat.monthlyAverageOrLimit)}</strong>
                        </span>
                        <span className="text-[#0051d5] font-semibold">{cat.bindingEnvelope}</span>
                      </div>
                      <div className="w-full bg-[#eaedff] rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${cat.isWarning ? 'bg-amber-500' : 'bg-blue-600'}`}
                          style={{ width: cat.isWarning ? '92%' : '76%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Info Integrasi Cerdas */}
          <div className="p-4 rounded-xl bg-white border border-[#c5c5d3]/70 flex items-center gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#0051d5]/10 flex items-center justify-center text-[#0051d5] shrink-0">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
            </div>
            <p className="text-[13px] text-[#444651] leading-tight">
              <strong>Integrasi Otomatis Aktif:</strong> Semua perubahan kategori dan sub-pos akan otomatis tersinkronisasi ke form Pemasukan, Pengeluaran, dan Pos Amplop Planing secara instan tanpa perlu reload data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
