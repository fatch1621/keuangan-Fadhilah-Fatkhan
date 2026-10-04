import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const QuickAdjusterModal: React.FC = () => {
  const { showQuickAdjusterModal, setShowQuickAdjusterModal, envelopes, updateEnvelope, formatRupiah, showToast } =
    useApp();

  const [selectedEnvId, setSelectedEnvId] = useState(envelopes[0]?.id || 'env-1');
  const [amountStr, setAmountStr] = useState('1000000');
  const [rationale, setRationale] = useState('');

  if (!showQuickAdjusterModal) return null;

  const currentSurplus = 4500000;
  const numAmount = parseInt(amountStr, 10) || 0;
  const remainingSurplus = Math.max(0, currentSurplus - numAmount);

  const handleApply = () => {
    if (numAmount <= 0) {
      showToast('Masukkan nominal ploting tambahan.');
      return;
    }
    updateEnvelope(selectedEnvId, numAmount);
    setShowQuickAdjusterModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#c5c5d3] p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Modal Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00236f] text-[24px]">tune</span>
              <h3 className="text-[18px] font-bold text-[#131b2e]">Quick Adjuster Ploting</h3>
            </div>
            <button
              onClick={() => setShowQuickAdjusterModal(false)}
              className="p-1 rounded-lg hover:bg-[#eaedff] text-[#444651] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <p className="text-[13px] text-[#444651] mt-3">
            Tentukan atau sesuaikan nominal amplop anggaran. Surplus belum terplot saat ini:{' '}
            <span className="font-bold text-amber-700 font-mono">{formatRupiah(currentSurplus)}</span>
          </p>

          {/* Form Elements for Fast Plotting */}
          <div className="mt-6 space-y-4">
            {/* Item 1: Pilih Amplop */}
            <div>
              <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
                Pilih Kategori Amplop
              </label>
              <select
                value={selectedEnvId}
                onChange={(e) => setSelectedEnvId(e.target.value)}
                className="w-full bg-white border border-[#c5c5d3] rounded-lg px-3 py-2 text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5] cursor-pointer"
              >
                {envelopes.map((env) => (
                  <option key={env.id} value={env.id}>
                    {env.name} (Tersisa {formatRupiah(Math.max(0, env.target - env.spent))})
                  </option>
                ))}
              </select>
            </div>

            {/* Item 2: Tambah Dana Ploting */}
            <div>
              <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
                Nominal Ploting Tambahan
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-[#757682] font-semibold text-[13px]">Rp</span>
                <input
                  type="text"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full pl-10 pr-3 py-2 border border-[#c5c5d3] rounded-lg text-[13px] font-semibold text-[#131b2e] focus:outline-none focus:border-[#0051d5] font-mono tabular-nums"
                />
              </div>
              <p className="text-[11px] text-[#757682] mt-1 font-mono">
                Mengurangi Surplus menjadi {formatRupiah(remainingSurplus)}
              </p>
            </div>

            {/* Preset Chip Values */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={() => setAmountStr('250000')}
                className="px-2.5 py-1 text-[11px] bg-[#f2f3ff] border border-[#c5c5d3] rounded-md hover:bg-[#eaedff] cursor-pointer font-medium"
              >
                +Rp 250k
              </button>
              <button
                type="button"
                onClick={() => setAmountStr('500000')}
                className="px-2.5 py-1 text-[11px] bg-[#f2f3ff] border border-[#c5c5d3] rounded-md hover:bg-[#eaedff] cursor-pointer font-medium"
              >
                +Rp 500k
              </button>
              <button
                type="button"
                onClick={() => setAmountStr('1000000')}
                className="px-2.5 py-1 text-[11px] bg-[#f2f3ff] border border-[#c5c5d3] rounded-md hover:bg-[#eaedff] cursor-pointer font-medium"
              >
                +Rp 1.000k
              </button>
              <button
                type="button"
                onClick={() => setAmountStr('4500000')}
                className="px-2.5 py-1 text-[11px] bg-amber-100 text-amber-900 border border-amber-300 rounded-md font-semibold cursor-pointer"
              >
                Semua Sisa
              </button>
            </div>

            {/* Catatan / Rationale */}
            <div>
              <label className="block text-[13px] font-semibold text-[#131b2e] mb-1">
                Catatan Ploting (Opsional)
              </label>
              <textarea
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                placeholder="Contoh: Tambahan anggaran dining out weekend atau persiapan voucher belanja keluarga..."
                rows={3}
                className="w-full p-3 border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5] resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Action Confirmation Buttons */}
        <div className="pt-6 border-t border-[#eaedff] flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowQuickAdjusterModal(false)}
            className="w-1/2 py-2.5 px-4 rounded-lg border border-[#c5c5d3] font-semibold text-[#131b2e] text-[13px] hover:bg-[#f2f3ff] cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="w-1/2 py-2.5 px-4 rounded-lg bg-[#00236f] text-white font-semibold text-[13px] hover:bg-[#0051d5] transition-all shadow-xs cursor-pointer"
          >
            Terapkan Plan
          </button>
        </div>
      </div>
    </div>
  );
};
