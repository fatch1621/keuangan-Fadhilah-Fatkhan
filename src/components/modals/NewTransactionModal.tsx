import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const NewTransactionModal: React.FC = () => {
  const { showNewTransactionModal, setShowNewTransactionModal, addTransaction, envelopes, formatRupiah, showToast } =
    useApp();

  const [type, setType] = useState<'inflow' | 'outflow'>('outflow');
  const [description, setDescription] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [category, setCategory] = useState('Kebutuhan Pokok');
  const [planEnvelope, setPlanEnvelope] = useState('Kebutuhan Pokok');

  if (!showNewTransactionModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(amountStr.replace(/[^0-9]/g, ''), 10);
    if (!amount || amount <= 0) {
      showToast('Masukkan nominal transaksi yang valid.');
      return;
    }
    if (!description.trim()) {
      showToast('Masukkan deskripsi keperluan transaksi.');
      return;
    }

    addTransaction({
      type,
      date: 'Hari ini',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      description,
      category,
      planEnvelope,
      account: 'Kas Utama',
      amount,
      status: type === 'inflow' ? 'Tercapai' : 'Sesuai Budget',
    });

    setDescription('');
    setAmountStr('');
    setShowNewTransactionModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 shadow-2xl border border-[#c5c5d3] space-y-4 sm:space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#c5c5d3]/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00236f] text-2xl">add_circle</span>
            <h3 className="text-[18px] font-bold text-[#00236f]">Transaksi Baru</h3>
          </div>
          <button
            onClick={() => setShowNewTransactionModal(false)}
            className="p-1 rounded-lg text-[#757682] hover:text-[#131b2e] cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Transaction Type Segmented Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#f2f3ff] rounded-lg border border-[#c5c5d3]/50">
          <button
            type="button"
            onClick={() => {
              setType('outflow');
              setCategory('Kebutuhan Pokok');
            }}
            className={`py-2 px-3 rounded-md text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              type === 'outflow'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">arrow_upward</span>
            <span>Pengeluaran (Outflow)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setType('inflow');
              setCategory('Gaji & Upah');
            }}
            className={`py-2 px-3 rounded-md text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              type === 'inflow'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-[#444651] hover:text-[#131b2e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">arrow_downward</span>
            <span>Pemasukan (Inflow)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
              Nominal Transaksi (IDR / Rp) <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-[#757682] font-semibold text-[13px]">Rp</span>
              <input
                type="text"
                value={amountStr}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setAmountStr(val ? parseInt(val, 10).toLocaleString('id-ID') : '');
                }}
                placeholder="misal: 500.000"
                required
                className="w-full pl-10 pr-3 py-2 border border-[#c5c5d3] rounded-lg text-[15px] font-bold font-mono text-[#131b2e] focus:border-[#0051d5] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
              Deskripsi / Kegunaan <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={type === 'outflow' ? 'misal: Makan Siang Restoran, Tiket Pesawat' : 'misal: Honor Konsultasi, Dividen Kuartal'}
              required
              className="w-full px-3 py-2 border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:border-[#0051d5] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:border-[#0051d5] outline-none cursor-pointer"
              >
                {type === 'outflow' ? (
                  <>
                    <option value="Kebutuhan Pokok">Kebutuhan Pokok</option>
                    <option value="Gaya Hidup">Gaya Hidup &amp; Hiburan</option>
                    <option value="Cicilan & Utang">Cicilan &amp; Utang</option>
                    <option value="Utilitas Rumah">Utilitas Rumah</option>
                    <option value="Transportasi">Transportasi</option>
                  </>
                ) : (
                  <>
                    <option value="Gaji & Upah">Gaji &amp; Upah</option>
                    <option value="Dividen & Bunga">Dividen &amp; Bunga</option>
                    <option value="Side Hustle">Side Hustle</option>
                    <option value="Bonus & Tunjangan">Bonus &amp; Tunjangan</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
                Amplop Planing
              </label>
              <select
                value={planEnvelope}
                onChange={(e) => setPlanEnvelope(e.target.value)}
                className="w-full px-3 py-2 border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:border-[#0051d5] outline-none cursor-pointer"
              >
                {envelopes.map((env) => (
                  <option key={env.id} value={env.name}>
                    {env.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#c5c5d3]/40">
            <button
              type="button"
              onClick={() => setShowNewTransactionModal(false)}
              className="px-4 py-2 rounded-lg border border-[#c5c5d3] text-[#131b2e] font-medium text-[13px] hover:bg-[#f2f3ff] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg text-white font-semibold text-[13px] shadow-xs cursor-pointer transition-all ${
                type === 'outflow' ? 'bg-[#ba1a1a] hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              Simpan Transaksi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
