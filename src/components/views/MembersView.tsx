import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const MembersView: React.FC = () => {
  const {
    members,
    deleteMember,
    sessions,
    terminateSession,
    terminateOtherSessions,
    setShowInviteModal,
    setShowLogoutModal,
    setLogoutAllDevices,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('Semua Role');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  // Security Toggles
  const [require2FA, setRequire2FA] = useState(true);
  const [newLoginAlert, setNewLoginAlert] = useState(true);
  const [autoLogout, setAutoLogout] = useState(true);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'Semua Role' || m.role === roleFilter;
    const matchesStatus =
      statusFilter === 'Semua Status' ||
      (statusFilter === 'Aktif / Online' && m.isOnline) ||
      (statusFilter === 'Tertunda (Pending)' && m.isPending) ||
      (statusFilter === 'Non-Aktif' && !m.isOnline && !m.isPending);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-[1440px] w-full mx-auto">
      {/* 1. Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-[#c5c5d3]/40">
        <div>
          <h1 className="text-[28px] font-bold text-[#00236f] tracking-tight">Manajemen Member &amp; Sesi Akses</h1>
          <p className="text-[14px] text-[#757682] mt-1 max-w-3xl">
            Pantau kolaborator aktif, hak akses peran (Role &amp; Permissions), riwayat perangkat login, dan manajemen keamanan akun keluarga/tim.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => showToast('Audit keamanan selesai: Sistem terlindungi TLS 1.3 & tidak ada kebocoran kredensial.')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#c5c5d3] text-[#131b2e] rounded-lg text-[13px] font-medium hover:bg-[#eaedff] transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined">shield</span>
            <span>Audit Keamanan &amp; Sesi</span>
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-[#131b2e] font-semibold rounded-lg text-[13px] transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <span className="material-symbols-outlined">person_add</span>
            <span>Undang Member Baru</span>
          </button>
        </div>
      </div>

      {/* 2. Stat Cards / Metrik Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Member */}
        <div className="p-5 rounded-xl bg-white border border-[#c5c5d3]/60 shadow-xs relative overflow-hidden group hover:border-[#0051d5]/40 transition-all">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Member</span>
            <span className="p-2 rounded-lg bg-[#eaedff] text-[#00236f] material-symbols-outlined">badge</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#00236f] tracking-tight font-mono">{members.length}</span>
            <span className="text-[12px] font-medium text-[#757682]">Anggota Terdaftar</span>
          </div>
          <p className="mt-2 text-[12px] text-[#757682]">1 Admin • 3 Editor/Family • 1 Viewer</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00236f] to-[#0051d5] opacity-80"></div>
        </div>

        {/* Card 2: Sesi Aktif Real-Time */}
        <div className="p-5 rounded-xl bg-white border border-[#c5c5d3]/60 shadow-xs relative overflow-hidden group hover:border-[#0051d5]/40 transition-all">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sesi Aktif Saat Ini</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#00236f] tracking-tight font-mono">{sessions.length}</span>
            <span className="text-[12px] font-medium text-emerald-700 font-semibold">Pengguna Online</span>
          </div>
          <p className="mt-2 text-[12px] text-[#757682]">Mac Studio, iPhone 15 Pro, Win PC</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"></div>
        </div>

        {/* Card 3: Keamanan & 2FA */}
        <div className="p-5 rounded-xl bg-white border border-[#c5c5d3]/60 shadow-xs relative overflow-hidden group hover:border-[#0051d5]/40 transition-all">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Keamanan &amp; 2FA</span>
            <span className="p-2 rounded-lg bg-[#eaedff] text-[#0051d5] material-symbols-outlined">verified_user</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#00236f] tracking-tight font-mono">0</span>
            <span className="text-[12px] font-medium text-emerald-700 font-semibold">Insiden / Percobaan Ilegal</span>
          </div>
          <p className="mt-2 text-[12px] text-[#757682]">2FA Terverifikasi Aktif 100%</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0051d5]"></div>
        </div>

        {/* Card 4: Kuota Kursi Tim/Keluarga */}
        <div className="p-5 rounded-xl bg-white border border-[#c5c5d3]/60 shadow-xs relative overflow-hidden group hover:border-[#0051d5]/40 transition-all">
          <div className="flex items-center justify-between text-[#757682]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Kuota Kursi Akun</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-800 material-symbols-outlined">chair</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-[#00236f] tracking-tight font-mono">{members.length} / 8</span>
            <span className="text-[12px] font-medium text-[#757682]">Kursi Terpakai</span>
          </div>
          <div className="mt-3 w-full bg-[#eaedff] rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(members.length / 8) * 100}%` }}></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </div>
      </div>

      {/* 3. Bagian 1: Daftar Member & Hak Akses */}
      <div className="bg-white rounded-xl border border-[#c5c5d3]/60 shadow-sm overflow-hidden">
        {/* Table Header Bar & Filter Controls */}
        <div className="p-5 border-b border-[#c5c5d3]/40 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#00236f]">Daftar Member &amp; Izin Akses</h2>
            <p className="text-[12px] text-[#757682]">
              Kelola kolaborator yang memiliki akses ke buku kas dan modul perencanaan keuangan.
            </p>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#757682] text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, email, atau role..."
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#c5c5d3] text-[13px] focus:border-[#0051d5] bg-[#f2f3ff]/40 outline-none"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-10 px-3 pr-8 rounded-lg border border-[#c5c5d3] text-[13px] text-[#131b2e] bg-[#f2f3ff]/40 focus:border-[#0051d5]"
            >
              <option>Semua Role</option>
              <option>Super Admin</option>
              <option>Finance Editor</option>
              <option>Contributor</option>
              <option>Financial Advisor / Auditor</option>
              <option>Viewer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 pr-8 rounded-lg border border-[#c5c5d3] text-[13px] text-[#131b2e] bg-[#f2f3ff]/40 focus:border-[#0051d5]"
            >
              <option>Semua Status</option>
              <option>Aktif / Online</option>
              <option>Tertunda (Pending)</option>
              <option>Non-Aktif</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f3ff]/60 border-b border-[#c5c5d3]/50 text-[11px] font-bold text-[#757682] uppercase tracking-wider">
                <th className="py-3 px-5">Member &amp; Profil</th>
                <th className="py-3 px-5">Role &amp; Izin</th>
                <th className="py-3 px-5">Status Aktivitas</th>
                <th className="py-3 px-5">Perangkat &amp; Lokasi</th>
                <th className="py-3 px-5">Akses Akun</th>
                <th className="py-3 px-5 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c5d3]/40 text-[13px]">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#f2f3ff]/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#c5c5d3]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#eaedff] flex items-center justify-center text-[#757682] font-bold border border-dashed border-[#757682]">
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                        )}
                        {member.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold text-[#131b2e]">
                          <span>{member.name}</span>
                          {member.isCurrentUser && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#dbe1ff] text-[#00236f] font-bold">
                              Anda
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-[#757682]">{member.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        member.role === 'Super Admin'
                          ? 'bg-[#1e3a8a] text-white'
                          : member.role === 'Finance Editor'
                          ? 'bg-emerald-100 text-emerald-800'
                          : member.role === 'Contributor'
                          ? 'bg-indigo-100 text-indigo-800'
                          : member.role.includes('Auditor')
                          ? 'bg-amber-100 text-amber-900 border border-amber-300/60'
                          : 'bg-[#eaedff] text-[#444651]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {member.role === 'Super Admin'
                          ? 'military_tech'
                          : member.role === 'Finance Editor'
                          ? 'edit_note'
                          : member.role === 'Contributor'
                          ? 'person'
                          : member.role.includes('Auditor')
                          ? 'find_in_page'
                          : 'visibility'}
                      </span>
                      {member.role}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    {member.isOnline ? (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-700 font-semibold text-[12px]">{member.status}</span>
                      </div>
                    ) : member.isPending ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                        <span className="material-symbols-outlined text-xs">hourglass_top</span>
                        Undangan Menunggu Konfirmasi
                      </span>
                    ) : (
                      <span className="text-[12px] text-[#757682] font-medium">{member.status}</span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    {member.isPending ? (
                      <span className="text-[12px] text-[#757682] italic">Belum ada perangkat terdaftar</span>
                    ) : (
                      <div className="flex flex-col text-[12px]">
                        <span className="font-medium text-[#131b2e] flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">
                            {member.device.includes('iPhone')
                              ? 'smartphone'
                              : member.device.includes('iPad')
                              ? 'tablet_mac'
                              : member.device.includes('Mac')
                              ? 'desktop_mac'
                              : 'laptop_chromebook'}
                          </span>
                          {member.device}
                        </span>
                        <span className="text-[#757682] text-[11px]">
                          {member.location} • IP: {member.ip}
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <span className="text-[12px] text-[#131b2e] font-medium">{member.accessLevel}</span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    {member.isCurrentUser ? (
                      <span className="text-[12px] text-[#757682] italic">Akun Utama</span>
                    ) : member.isPending ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => showToast(`Undangan untuk ${member.email} dikirim ulang!`)}
                          className="px-2.5 py-1 text-[11px] font-medium bg-[#eaedff] hover:bg-[#dce1ff] rounded text-[#00236f] transition-colors cursor-pointer"
                        >
                          Kirim Ulang
                        </button>
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="p-1 rounded text-[#757682] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                          title="Batalkan Undangan"
                        >
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => showToast(`Edit izin peran untuk ${member.name}`)}
                          className="p-1.5 rounded-lg text-[#757682] hover:text-[#00236f] hover:bg-[#eaedff] transition-colors cursor-pointer"
                          title="Edit Role"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Cabut akses sesi untuk ${member.name}?`)) {
                              showToast(`Akses sesi untuk ${member.name} telah dicabut.`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-[#757682] hover:text-[#ba1a1a] hover:bg-red-50 transition-colors cursor-pointer"
                          title="Cabut Akses Sesi"
                        >
                          <span className="material-symbols-outlined text-lg">link_off</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="p-4 border-t border-[#c5c5d3]/40 flex items-center justify-between text-[12px] text-[#757682]">
          <span>
            Menampilkan <strong>{filteredMembers.length}</strong> dari <strong>{members.length}</strong> anggota keluarga &amp; staf auditor
          </span>
          <div className="flex items-center gap-2">
            <button disabled className="px-3 py-1.5 rounded border border-[#c5c5d3]/60 bg-white disabled:opacity-40">
              Sebelumnya
            </button>
            <button className="px-3 py-1.5 rounded bg-[#00236f] text-white font-medium">1</button>
            <button disabled className="px-3 py-1.5 rounded border border-[#c5c5d3]/60 bg-white disabled:opacity-40">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* 4. Grid Asimetris: Sesi Aktif & Keamanan Global */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Sesi Aktif & Log Perangkat (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#c5c5d3]/60 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#c5c5d3]/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00236f]">devices</span>
                <h2 className="text-[18px] font-bold text-[#00236f]">Log Perangkat &amp; Sesi Terbuka</h2>
              </div>
              <p className="text-[12px] text-[#757682] mt-1">
                Daftar browser dan aplikasi resmi yang saat ini sedang aktif mengakses database keluarga Anda.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('Putuskan paksa semua sesi di perangkat lain?')) {
                  terminateOtherSessions();
                }
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#ffdad6] text-[#93000a] hover:bg-[#ba1a1a] hover:text-white transition-colors rounded-lg text-[13px] font-semibold shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">lock_reset</span>
              <span>Putuskan Semua Sesi Lain</span>
            </button>
          </div>

          {/* Session Cards Stack */}
          <div className="space-y-3.5">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  sess.isCurrent
                    ? 'border-2 border-[#316bf3]/50 bg-[#f2f3ff]/40'
                    : 'border border-[#c5c5d3]/60 bg-white hover:border-[#316bf3]/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      sess.isCurrent ? 'bg-[#1e3a8a] text-white' : 'bg-[#eaedff] text-[#00236f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{sess.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-[#131b2e]">
                        {sess.device} • {sess.browser}
                      </h3>
                      {sess.isCurrent ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Sesi Ini (Device Saat Ini)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaedff] text-[#757682]">
                          Sesi Lain
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#757682] mt-1">
                      User: <span className="font-semibold text-[#131b2e]">{sess.user}</span> • IP: {sess.ip} • Lokasi: {sess.location}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-[#757682] font-medium">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-emerald-600">lock</span>
                        {sess.encryption}
                      </span>
                      <span>Login: {sess.loginTime}</span>
                      {!sess.isCurrent && <span className="text-emerald-700 font-semibold">● {sess.lastActive}</span>}
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  {sess.isCurrent ? (
                    <span className="inline-block px-3 py-1 bg-[#eaedff] rounded text-[11px] font-semibold text-[#444651]">
                      Sedang Digunakan
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        if (confirm(`Putuskan akses untuk ${sess.device}?`)) {
                          terminateSession(sess.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg border border-[#ba1a1a]/40 text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white text-[13px] font-medium transition-colors cursor-pointer"
                    >
                      Paksa Logout
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#f2f3ff] rounded-lg flex items-center gap-3 text-[12px] text-[#757682]">
            <span className="material-symbols-outlined text-[#0051d5]">info</span>
            <span>Sistem akan mendeteksi otomatis jika ada login dari IP Address atau negara asing yang tidak lazim.</span>
          </div>
        </div>

        {/* RIGHT: Kebijakan Keamanan & Quick Switch Panels (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Panel 1: Kebijakan Akses */}
          <div className="bg-white rounded-xl border border-[#c5c5d3]/60 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#c5c5d3]/40">
              <span className="material-symbols-outlined text-[#00236f]">security</span>
              <h2 className="text-[16px] font-bold text-[#00236f]">Kebijakan Akses &amp; 2FA</h2>
            </div>

            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] font-semibold text-[#131b2e]">Wajibkan 2FA Semua Member</p>
                  <p className="text-[12px] text-[#757682]">Autentikasi via Google/Apple Authenticator.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={require2FA}
                    onChange={(e) => setRequire2FA(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#c5c5d3]/30">
                <div>
                  <p className="text-[13px] font-semibold text-[#131b2e]">Notifikasi Login Baru</p>
                  <p className="text-[12px] text-[#757682]">Kirim peringatan via Email &amp; Push Telegram.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newLoginAlert}
                    onChange={(e) => setNewLoginAlert(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#c5c5d3]/30">
                <div>
                  <p className="text-[13px] font-semibold text-[#131b2e]">Auto-Logout Tidak Aktif</p>
                  <p className="text-[12px] text-[#757682]">Sesi otomatis berakhir setelah 30 menit idle.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoLogout}
                    onChange={(e) => setAutoLogout(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#c5c5d3] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0051d5]"></div>
                </label>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => showToast('Konfigurasi kebijakan akses & 2FA berhasil disimpan.')}
                className="w-full py-2 bg-[#eaedff] hover:bg-[#dce1ff] text-[#00236f] font-semibold text-[13px] rounded-lg transition-colors cursor-pointer"
              >
                Simpan Konfigurasi Kebijakan
              </button>
            </div>
          </div>

          {/* Panel 2: Akses Cepat Keluar */}
          <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0051d5] text-white rounded-xl shadow-md p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-300">lock</span>
              <h3 className="text-[16px] font-bold">Akses Cepat Keluar (Logout)</h3>
            </div>
            <p className="text-[12px] opacity-90 leading-relaxed">
              Ingin mengakhiri sesi kerja Anda saat ini atau mengamankan seluruh akun keluarga dalam satu klik?
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setLogoutAllDevices(false);
                  setShowLogoutModal(true);
                }}
                className="w-full py-2.5 px-4 bg-white text-[#00236f] hover:bg-[#faf8ff] font-semibold rounded-lg text-[13px] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span>Keluar dari Perangkat Ini</span>
              </button>
              <button
                onClick={() => {
                  setLogoutAllDevices(true);
                  setShowLogoutModal(true);
                }}
                className="w-full py-2.5 px-4 bg-[#00236f]/40 hover:bg-[#ba1a1a] hover:text-white border border-white/20 text-white font-medium rounded-lg text-[12px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">warning</span>
                <span>Logout dari Seluruh Perangkat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
