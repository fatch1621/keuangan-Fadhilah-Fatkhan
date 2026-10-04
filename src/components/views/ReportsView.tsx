import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { transactions, formatRupiah, showToast } = useApp();
  const [reportPeriod, setReportPeriod] = useState<'month' | 'quarter' | 'custom'>('month');
  const [searchQuery, setSearchQuery] = useState('');

  const auditTx = transactions.filter(
    (tx) =>
      searchQuery === '' ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1440px] w-full mx-auto">
      {/* 1. Header Laporan & Action Toolbar Export */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl border border-[#c5c5d3]/70 shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5] text-[26px]">analytics</span>
            <h2 className="text-[24px] font-bold text-[#00236f]">Laporan Arus Kas &amp; Analisis Keuangan</h2>
          </div>
          <p className="text-[14px] text-[#757682]">Periode audit terkonsolidasi per 1 – 31 Oktober 2024</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Rentang Waktu */}
          <div className="inline-flex rounded-lg border border-[#c5c5d3] p-0.5 bg-[#f2f3ff] text-[13px]">
            <button
              onClick={() => setReportPeriod('month')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                reportPeriod === 'month' ? 'bg-white text-[#00236f] shadow-xs' : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => setReportPeriod('quarter')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                reportPeriod === 'quarter' ? 'bg-white text-[#00236f] shadow-xs' : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Kuartal
            </button>
            <button
              onClick={() => setReportPeriod('custom')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                reportPeriod === 'custom' ? 'bg-white text-[#00236f] shadow-xs' : 'text-[#444651] hover:text-[#131b2e]'
              }`}
            >
              Custom
            </button>
          </div>

          <div className="h-6 w-[1px] bg-[#c5c5d3] hidden sm:block"></div>

          {/* Export Buttons Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Mengekspor Laporan Arus Kas ke format Excel (.XLSX)...')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#c5c5d3] hover:border-[#0051d5] hover:bg-[#faf8ff] text-[#131b2e] text-[13px] font-medium transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-emerald-600">table_chart</span>
              <span>Export ke Excel (.XLSX)</span>
            </button>

            <button
              onClick={() => showToast('Mengunduh Laporan Keuangan resmi format PDF (.PDF)...')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#c5c5d3] hover:border-[#0051d5] hover:bg-[#faf8ff] text-[#131b2e] text-[13px] font-medium transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">picture_as_pdf</span>
              <span>Export ke PDF (.PDF)</span>
            </button>

            <button
              onClick={() => showToast('Laporan ringkasan dikirimkan ke arya.chandra@wealth.id')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00236f] text-white hover:bg-[#0051d5] text-[13px] font-medium transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
              <span>Kirim ke Email</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Executive Financial Note & AI Insight */}
      <section className="relative overflow-hidden rounded-xl border-2 border-[#00236f]/20 bg-gradient-to-r from-[#dce1ff]/40 via-white to-[#ffddb8]/30 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0051d5] to-[#00236f] text-white flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[28px] text-amber-300">lightbulb</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  AI Financial Insight
                </span>
                <h3 className="text-[18px] font-bold text-[#00236f]">Tanggapan &amp; Rekomendasi Aliran Kas Bulanan</h3>
              </div>
              <p className="text-[14px] text-[#444651] max-w-4xl leading-relaxed">
                Rasio tabungan berjalan pada posisi sehat sebesar <span className="font-bold text-emerald-700">32%</span> (standar aman &gt; 20%). Catatan khusus: pos pengeluaran kategori hiburan &amp; gaya hidup mendekati batas pagu bulanan (mencapai 92% limit), direkomendasikan efisiensi minimal <strong>10%</strong> untuk minggu mendatang. Terdapat estimasi potensi surplus kas bebas sebesar <span className="font-bold text-[#00236f]">Rp 6.250.000</span> yang sangat disarankan untuk dialokasikan pada instrumen Reksadana Pasar Uang atau Obligasi Negara.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
            <button
              onClick={() => showToast('Membuka modul alokasi instrumen portofolio.')}
              className="px-4 py-2 bg-white border border-[#c5c5d3] hover:border-[#00236f] text-[#00236f] rounded-lg text-[13px] font-semibold transition-all cursor-pointer shadow-xs"
            >
              Lihat Rekomendasi Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* 3. Rangkuman Arus Kas (Executive Metric Bento) */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[13px] font-medium">Saldo Awal Bulan</span>
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
          </div>
          <div className="mt-3">
            <span className="text-[22px] font-bold text-[#00236f] font-mono">Rp 127.250.000</span>
            <p className="text-[12px] text-[#757682] mt-1">Status: Terverifikasi pada 1 Okt</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[13px] font-medium">Total Kas Masuk (Inflow)</span>
            <span className="material-symbols-outlined text-[20px] text-emerald-600">arrow_circle_down</span>
          </div>
          <div className="mt-3">
            <span className="text-[22px] font-bold text-emerald-700 tabular-nums font-mono">Rp 42.000.000</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">+14.2%</span>
              <span className="text-[12px] text-[#757682]">vs bulan sebelumnya</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[13px] font-medium">Total Kas Keluar (Outflow)</span>
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">arrow_circle_up</span>
          </div>
          <div className="mt-3">
            <span className="text-[22px] font-bold text-[#ba1a1a] tabular-nums font-mono">Rp 26.750.000</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[11px] text-[#ba1a1a] bg-rose-50 px-2 py-0.5 rounded-full font-bold">-3.1%</span>
              <span className="text-[12px] text-[#757682]">efisiensi pengeluaran</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#00236f] text-white p-5 rounded-xl shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#dce1ff]">
            <span className="text-[13px] font-medium">Net Cash Flow (Surplus)</span>
            <span className="material-symbols-outlined text-[20px] text-amber-300">trending_up</span>
          </div>
          <div className="mt-3">
            <span className="text-[22px] font-bold text-white tabular-nums font-mono">+Rp 15.250.000</span>
            <div className="flex items-center justify-between pt-2 border-t border-[#1e3a8a] mt-2">
              <span className="text-[11px] text-[#90a8ff]">Saldo Akhir Berjalan:</span>
              <span className="text-[13px] font-bold text-white tabular-nums font-mono">Rp 142.500.000</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cash Flow Statement Breakdown Table & Visual Composition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Arus Kas Statement Structure (8 Cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <div>
              <h3 className="text-[18px] font-bold text-[#00236f]">Ikhtisar Laporan Arus Kas (Cash Flow Statement)</h3>
              <p className="text-[12px] text-[#757682]">Klasifikasi aktivitas operasional, investasi, dan pendanaan</p>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444651] bg-[#eaedff] px-2.5 py-1 rounded">
              Mata Uang: IDR (Rp)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#eaedff] text-[11px] text-[#757682] uppercase tracking-wider">
                  <th className="py-2.5 font-semibold">Komponen Aktivitas Kas</th>
                  <th className="py-2.5 font-semibold text-right">Debit (Masuk)</th>
                  <th className="py-2.5 font-semibold text-right">Kredit (Keluar)</th>
                  <th className="py-2.5 font-semibold text-right">Net Posisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaedff]">
                {/* Kas Operasional */}
                <tr className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3 font-medium text-[#00236f] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0051d5]"></span>
                    Kas Bersih dari Aktivitas Operasional
                  </td>
                  <td className="py-3 text-right tabular-nums text-emerald-700 font-mono">Rp 35.000.000</td>
                  <td className="py-3 text-right tabular-nums text-[#ba1a1a] font-mono">Rp 18.250.000</td>
                  <td className="py-3 text-right tabular-nums font-semibold text-[#00236f] font-mono">+Rp 16.750.000</td>
                </tr>

                {/* Kas Investasi */}
                <tr className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3 font-medium text-[#00236f] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Kas Bersih dari Aktivitas Investasi &amp; Dividen
                  </td>
                  <td className="py-3 text-right tabular-nums text-emerald-700 font-mono">Rp 7.000.000</td>
                  <td className="py-3 text-right tabular-nums text-[#ba1a1a] font-mono">Rp 5.500.000</td>
                  <td className="py-3 text-right tabular-nums font-semibold text-[#00236f] font-mono">+Rp 1.500.000</td>
                </tr>

                {/* Kas Pendanaan */}
                <tr className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3 font-medium text-[#00236f] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Kas Bersih dari Pembiayaan &amp; Cicilan Pokok
                  </td>
                  <td className="py-3 text-right tabular-nums text-[#757682] font-mono">Rp 0</td>
                  <td className="py-3 text-right tabular-nums text-[#ba1a1a] font-mono">Rp 3.000.000</td>
                  <td className="py-3 text-right tabular-nums font-semibold text-[#ba1a1a] font-mono">-Rp 3.000.000</td>
                </tr>

                {/* Total Net Flow */}
                <tr className="bg-[#eaedff] font-semibold">
                  <td className="py-3.5 text-[#00236f]">Kenaikan / (Penurunan) Kas Bersih Bulanan</td>
                  <td className="py-3.5 text-right tabular-nums text-emerald-800 font-mono">Rp 42.000.000</td>
                  <td className="py-3.5 text-right tabular-nums text-rose-800 font-mono">Rp 26.750.000</td>
                  <td className="py-3.5 text-right tabular-nums text-[#00236f] font-bold text-[16px] font-mono">
                    +Rp 15.250.000
                  </td>
                </tr>

                {/* Saldo Kas Akhir Periode */}
                <tr className="bg-[#dae2fd]/50 font-bold">
                  <td className="py-3 text-[#00236f]" colSpan={3}>
                    Saldo Kas dan Setara Kas Akhir Periode
                  </td>
                  <td className="py-3 text-right tabular-nums text-[#00236f] text-[18px] font-mono">
                    Rp 142.500.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Komposisi (Donut & Breakdown) (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <h3 className="text-[18px] font-bold text-[#00236f]">Komposisi Aliran Kas</h3>
              <span className="text-[12px] text-[#757682]">Proporsi</span>
            </div>

            {/* Donut Graphic Representation */}
            <div className="flex items-center justify-center my-6">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-[#eaedff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4.5"
                  ></path>
                  {/* Segment Pemasukan (Secondary 61%) */}
                  <path
                    className="text-[#0051d5]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="61, 100"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  ></path>
                  {/* Segment Pengeluaran (Yellow/Amber 39%) */}
                  <path
                    className="text-amber-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="39, 100"
                    strokeDashoffset="-61"
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  ></path>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] text-[#757682]">Rasio Sehat</span>
                  <span className="text-[22px] font-bold text-[#00236f] font-mono">61%</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Kas Bebas</span>
                </div>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0051d5]"></span>
                  <span>Pemasukan Terkonsolidasi</span>
                </div>
                <span className="font-bold text-[#00236f] tabular-nums font-mono">Rp 42.000.000 (61%)</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span>Pengeluaran Kebutuhan Rutin</span>
                </div>
                <span className="font-bold text-[#00236f] tabular-nums font-mono">Rp 19.500.000 (28%)</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ba1a1a]"></span>
                  <span>Gaya Hidup &amp; Hiburan (Alert)</span>
                </div>
                <span className="font-bold text-[#00236f] tabular-nums font-mono">Rp 7.250.000 (11%)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#eaedff]">
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#757682]">Batas Toleransi Deviasi:</span>
              <span className="font-semibold text-emerald-700">Aman (&lt; 15%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Detail Ledger Transaksi yang Siap Diexport */}
      <section className="bg-white p-6 rounded-xl border border-[#c5c5d3]/70 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[18px] font-bold text-[#00236f]">Buku Besar &amp; Log Transaksi Audit</h3>
            <p className="text-[12px] text-[#757682]">Daftar entri mutasi terverifikasi siap cetak dan pelaporan pajak</p>
          </div>

          {/* Search & Ledger Filters */}
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#757682]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari transaksi, tag, atau ID..."
                className="w-full pl-9 pr-4 py-2 bg-[#f2f3ff] border border-[#c5c5d3] rounded-lg text-[13px] text-[#131b2e] focus:outline-none focus:border-[#0051d5]"
              />
            </div>
            <button
              onClick={() => showToast('Filter buku besar diaktifkan.')}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#f2f3ff] border border-[#c5c5d3] rounded-lg text-[13px] font-medium text-[#131b2e] hover:bg-[#eaedff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#c5c5d3]/60 text-[11px] font-semibold text-[#757682] uppercase bg-[#f2f3ff]/60 tracking-wider">
                <th className="py-3 px-4">ID / Tanggal</th>
                <th className="py-3 px-4">Deskripsi &amp; Pihak Terkait</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Metode / Akun</th>
                <th className="py-3 px-4 text-right">Nominal</th>
                <th className="py-3 px-4 text-center">Status Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c5d3]/40">
              {auditTx.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#f2f3ff] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#00236f] block font-mono">{tx.id}</span>
                    <span className="text-[11px] text-[#757682]">
                      {tx.date} • {tx.time}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#131b2e] block">{tx.description}</span>
                    <span className="text-[11px] text-[#757682]">{tx.notes}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                        tx.type === 'inflow'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#131b2e]">{tx.account}</td>
                  <td
                    className={`py-3.5 px-4 text-right tabular-nums font-bold font-mono ${
                      tx.type === 'inflow' ? 'text-emerald-700' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {tx.type === 'inflow' ? '+' : '-'}
                    {formatRupiah(tx.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[12px] text-emerald-700 font-semibold">
                      <span className="material-symbols-outlined text-[16px]">verified</span> Terverifikasi
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="flex items-center justify-between pt-3 border-t border-[#c5c5d3]/60 text-[12px]">
          <span className="text-[#757682]">
            Menampilkan <span className="font-semibold text-[#00236f]">{auditTx.length}</span> entri mutasi
          </span>
          <div className="flex items-center gap-1">
            <button disabled className="p-1.5 rounded-md border border-[#c5c5d3] text-[#757682] bg-white disabled:opacity-50">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded-md bg-[#00236f] text-white font-semibold">1</button>
            <button className="px-3 py-1 rounded-md border border-[#c5c5d3] text-[#131b2e] bg-white">2</button>
            <button className="px-3 py-1 rounded-md border border-[#c5c5d3] text-[#131b2e] bg-white">3</button>
            <button className="p-1.5 rounded-md border border-[#c5c5d3] text-[#131b2e] bg-white">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
