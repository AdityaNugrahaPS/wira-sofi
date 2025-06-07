import React from 'react';

interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  guestCount: number;
  rsvpStatus: 'pending' | 'attending' | 'not_attending';
  invitationCode: string;
  invitationLinks: {
    intro: string;
    main: string;
    rsvp: string;
    thanks: string;
  };
  createdAt: string;
  updatedAt?: string;
}

interface GuestTableProps {
  guests: Guest[];
  onDeleteGuest: (guestId: string) => void;
  onCopyLink: (text: string, type: string) => void;
  onBulkCopy: (linkType: 'intro' | 'main' | 'rsvp' | 'thanks') => void;
  onExport: () => void;
}

const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  onDeleteGuest,
  onCopyLink,
  onBulkCopy,
  onExport
}) => {
  const getRsvpStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: 'fa-clock', text: 'Pending' },
      attending: { color: 'bg-green-100 text-green-800', icon: 'fa-check', text: 'Hadir' },
      not_attending: { color: 'bg-red-100 text-red-800', icon: 'fa-times', text: 'Tidak Hadir' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <i className={`fas ${config.icon} mr-1`}></i>
        {config.text}
      </span>
    );
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  const shareViaWhatsApp = (guest: Guest) => {
    const message = `Halo ${guest.name}! Anda diundang ke pernikahan kami. Silakan buka undangan personal Anda: ${guest.invitationLinks.main}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = (guest: Guest) => {
    const subject = 'Undangan Pernikahan';
    const body = `Halo ${guest.name}!\n\nAnda diundang ke pernikahan kami.\n\nSilakan buka undangan personal Anda di:\n${guest.invitationLinks.main}\n\nUntuk RSVP: ${guest.invitationLinks.rsvp}\n\nTerima kasih!`;
    window.open(`mailto:${guest.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  if (guests.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <i className="fas fa-users text-4xl mb-4 text-gray-300"></i>
        <p className="text-lg">Belum ada tamu yang ditambahkan</p>
        <p className="text-sm mt-2">Tambahkan tamu pertama Anda di atas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            <i className="fas fa-users mr-1"></i>
            {guests.length} tamu total
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-600">
            {guests.filter(g => g.rsvpStatus === 'attending').length} hadir
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-600">
            {guests.filter(g => g.rsvpStatus === 'pending').length} pending
          </span>
        </div>
        <div className="flex flex-wrap items-center space-x-2">
          <button
            onClick={() => onBulkCopy('intro')}
            className="text-xs bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors"
            title="Copy semua link intro"
          >
            <i className="fas fa-copy mr-1"></i>
            Copy All Intro
          </button>
          <button
            onClick={() => onBulkCopy('main')}
            className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
            title="Copy semua link utama"
          >
            <i className="fas fa-copy mr-1"></i>
            Copy All Main
          </button>
          <button
            onClick={() => onBulkCopy('rsvp')}
            className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
            title="Copy semua link RSVP"
          >
            <i className="fas fa-copy mr-1"></i>
            Copy All RSVP
          </button>
          <button
            onClick={onExport}
            className="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors"
            title="Export ke CSV"
          >
            <i className="fas fa-download mr-1"></i>
            Export CSV
          </button>
        </div>
      </div>

      {/* Guest Cards - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {guests.map((guest) => (
          <div key={guest.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Guest Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{guest.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getRsvpStatusBadge(guest.rsvpStatus)}
                  <span className="text-xs text-gray-500">
                    {guest.guestCount} orang
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => shareViaWhatsApp(guest)}
                  className="text-green-600 hover:text-green-700 p-1"
                  title="Share via WhatsApp"
                >
                  <i className="fab fa-whatsapp text-sm"></i>
                </button>
                {guest.email && (
                  <button
                    onClick={() => shareViaEmail(guest)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Share via Email"
                  >
                    <i className="fas fa-envelope text-sm"></i>
                  </button>
                )}
                <button
                  onClick={() => onDeleteGuest(guest.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                  title="Hapus tamu"
                >
                  <i className="fas fa-trash text-sm"></i>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            {(guest.email || guest.phone) && (
              <div className="mb-3 space-y-1">
                {guest.email && (
                  <div className="text-xs text-gray-600 flex items-center">
                    <i className="fas fa-envelope mr-2 w-3"></i>
                    {guest.email}
                  </div>
                )}
                {guest.phone && (
                  <div className="text-xs text-gray-600 flex items-center">
                    <i className="fas fa-phone mr-2 w-3"></i>
                    {guest.phone}
                  </div>
                )}
              </div>
            )}

            {/* Invitation Code */}
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Kode Undangan:</div>
              <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {guest.invitationCode}
              </div>
            </div>

            {/* URL Links */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-700 mb-2">URL Personal:</div>

              {/* Intro Link */}
              <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-purple-700">Halaman Intro</div>
                  <div className="text-xs text-purple-600 truncate">
                    {guest.invitationLinks?.intro?.replace(window.location.origin, '') || '/intro/' + guest.name.replace(/\s+/g, '-')}
                  </div>
                </div>
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => onCopyLink(guest.invitationLinks?.intro || `${window.location.origin}/intro/${guest.name.replace(/\s+/g, '-')}`, 'intro')}
                    className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    title="Copy link"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    onClick={() => openUrl(guest.invitationLinks?.intro || `${window.location.origin}/intro/${guest.name.replace(/\s+/g, '-')}`)}
                    className="text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                    title="Open link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>

              {/* Main Link */}
              <div className="flex items-center justify-between bg-blue-50 p-2 rounded">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-blue-700">Halaman Utama</div>
                  <div className="text-xs text-blue-600 truncate">
                    {guest.invitationLinks?.main?.replace(window.location.origin, '') || '/main/' + guest.name.replace(/\s+/g, '-')}
                  </div>
                </div>
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => onCopyLink(guest.invitationLinks?.main || `${window.location.origin}/main/${guest.name.replace(/\s+/g, '-')}`, 'utama')}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    title="Copy link"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    onClick={() => openUrl(guest.invitationLinks?.main || `${window.location.origin}/main/${guest.name.replace(/\s+/g, '-')}`)}
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    title="Open link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>

              {/* RSVP Link */}
              <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-green-700">RSVP</div>
                  <div className="text-xs text-green-600 truncate">
                    {guest.invitationLinks?.rsvp?.replace(window.location.origin, '') || '/rsvp/' + guest.name.replace(/\s+/g, '-')}
                  </div>
                </div>
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => onCopyLink(guest.invitationLinks?.rsvp || `${window.location.origin}/rsvp/${guest.name.replace(/\s+/g, '-')}`, 'RSVP')}
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    title="Copy link"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    onClick={() => openUrl(guest.invitationLinks?.rsvp || `${window.location.origin}/rsvp/${guest.name.replace(/\s+/g, '-')}`)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    title="Open link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>

              {/* Thanks Link */}
              <div className="flex items-center justify-between bg-purple-50 p-2 rounded">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-purple-700">Thanks</div>
                  <div className="text-xs text-purple-600 truncate">
                    {guest.invitationLinks?.thanks?.replace(window.location.origin, '') || '/thanks/' + guest.name.replace(/\s+/g, '-')}
                  </div>
                </div>
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => onCopyLink(guest.invitationLinks?.thanks || `${window.location.origin}/thanks/${guest.name.replace(/\s+/g, '-')}`, 'thanks')}
                    className="text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                    title="Copy link"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button
                    onClick={() => openUrl(guest.invitationLinks?.thanks || `${window.location.origin}/thanks/${guest.name.replace(/\s+/g, '-')}`)}
                    className="text-xs bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600"
                    title="Open link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Created Date */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                <i className="fas fa-calendar mr-1"></i>
                Dibuat: {new Date(guest.createdAt).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestTable;
