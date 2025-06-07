import React, { useState, useEffect } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { RsvpResponse } from '../../types/wedding';
import AdminLayout from '../../layouts/AdminLayout';

const RsvpManagement: React.FC = () => {
  const { weddingData, updateRsvpSettings } = useWedding();
  const { rsvpSettings } = weddingData;
  
  const [formData, setFormData] = useState({
    headerTitle: rsvpSettings.headerTitle,
    headerSubtitle: rsvpSettings.headerSubtitle,
    description: rsvpSettings.description,
    deadlineDate: rsvpSettings.deadlineDate,
    contactPhone: rsvpSettings.contactPhone,
    contactEmail: rsvpSettings.contactEmail,
    ceremonyTime: rsvpSettings.ceremonyTime,
    receptionTime: rsvpSettings.receptionTime,
    isEnabled: rsvpSettings.isEnabled
  });

  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'responses'>('settings');

  useEffect(() => {
    setFormData({
      headerTitle: rsvpSettings.headerTitle,
      headerSubtitle: rsvpSettings.headerSubtitle,
      description: rsvpSettings.description,
      deadlineDate: rsvpSettings.deadlineDate,
      contactPhone: rsvpSettings.contactPhone,
      contactEmail: rsvpSettings.contactEmail,
      ceremonyTime: rsvpSettings.ceremonyTime,
      receptionTime: rsvpSettings.receptionTime,
      isEnabled: rsvpSettings.isEnabled
    });
  }, [rsvpSettings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = () => {
    updateRsvpSettings(formData);
    setMessage('Pengaturan RSVP berhasil disimpan!');
    setTimeout(() => setMessage(''), 3000);
  };

  const updateResponseStatus = (responseId: string, status: 'pending' | 'confirmed' | 'declined') => {
    const updatedResponses = rsvpSettings.responses.map(response =>
      response.id === responseId ? { ...response, status } : response
    );
    updateRsvpSettings({ responses: updatedResponses });
    setMessage(`Status RSVP berhasil diupdate!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteResponse = (responseId: string) => {
    if (window.confirm('Hapus response RSVP ini?')) {
      const updatedResponses = rsvpSettings.responses.filter(response => response.id !== responseId);
      updateRsvpSettings({ responses: updatedResponses });
      setMessage('Response RSVP berhasil dihapus!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800'
    };
    return statusColors[status as keyof typeof statusColors] || statusColors.pending;
  };

  const getAttendanceBadge = (attendance: string) => {
    return attendance === 'yes' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const stats = {
    total: rsvpSettings.responses.length,
    attending: rsvpSettings.responses.filter(r => r.attendance === 'yes').length,
    notAttending: rsvpSettings.responses.filter(r => r.attendance === 'no').length,
    pending: rsvpSettings.responses.filter(r => r.status === 'pending').length,
    confirmed: rsvpSettings.responses.filter(r => r.status === 'confirmed').length
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">RSVP Management</h1>
            <p className="text-gray-600 mt-1">Kelola pengaturan RSVP dan lihat response tamu</p>
          </div>

          {/* Message */}
          {message && (
            <div className="mx-6 mt-6 p-4 rounded-md bg-green-100 text-green-700 border border-green-300">
              {message}
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ⚙️ Pengaturan RSVP
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'responses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📋 Response Tamu ({stats.total})
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* RSVP Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Status RSVP</h3>
                      <p className="text-gray-600">Aktifkan atau nonaktifkan fitur RSVP</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isEnabled"
                        checked={formData.isEnabled}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Header Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Header
                    </label>
                    <input
                      type="text"
                      name="headerTitle"
                      value={formData.headerTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="RSVP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle Header
                    </label>
                    <input
                      type="text"
                      name="headerSubtitle"
                      value={formData.headerSubtitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Subtitle RSVP"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi RSVP"
                  />
                </div>

                {/* Contact & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline RSVP
                    </label>
                    <input
                      type="text"
                      name="deadlineDate"
                      value={formData.deadlineDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="15 Desember 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>

                {/* Email & Event Times */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Kontak
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="wedding@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waktu Akad
                    </label>
                    <input
                      type="text"
                      name="ceremonyTime"
                      value={formData.ceremonyTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Akad Nikah (10:00 WIB)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Waktu Resepsi
                    </label>
                    <input
                      type="text"
                      name="receptionTime"
                      value={formData.receptionTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Resepsi (12:00 - 15:00 WIB)"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    💾 Simpan Pengaturan
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'responses' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-blue-800">Total Response</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
                    <div className="text-sm text-green-800">Hadir</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
                    <div className="text-sm text-red-800">Tidak Hadir</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-yellow-800">Pending</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.confirmed}</div>
                    <div className="text-sm text-purple-800">Confirmed</div>
                  </div>
                </div>

                {/* Responses List */}
                {rsvpSettings.responses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Response</h3>
                    <p className="text-gray-600">Response RSVP dari tamu akan muncul di sini</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rsvpSettings.responses.map((response) => (
                      <div key={response.id} className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-lg font-semibold text-gray-900">{response.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceBadge(response.attendance)}`}>
                                {response.attendance === 'yes' ? '✅ Hadir' : '❌ Tidak Hadir'}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(response.status)}`}>
                                {response.status === 'pending' ? '⏳ Pending' : 
                                 response.status === 'confirmed' ? '✅ Confirmed' : '❌ Declined'}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div>
                                <p><strong>Email:</strong> {response.email}</p>
                                <p><strong>Telepon:</strong> {response.phone}</p>
                                <p><strong>Jumlah Tamu:</strong> {response.guestCount}</p>
                              </div>
                              <div>
                                <p><strong>Akad:</strong> {response.ceremony ? '✅ Ya' : '❌ Tidak'}</p>
                                <p><strong>Resepsi:</strong> {response.reception ? '✅ Ya' : '❌ Tidak'}</p>
                                <p><strong>Tanggal:</strong> {new Date(response.submittedAt).toLocaleDateString('id-ID')}</p>
                              </div>
                            </div>
                            
                            {response.dietaryRestrictions && (
                              <div className="mt-3">
                                <p className="text-sm"><strong>Pantangan Makanan:</strong> {response.dietaryRestrictions}</p>
                              </div>
                            )}
                            
                            {response.message && (
                              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm"><strong>Pesan:</strong> {response.message}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-col space-y-2 ml-4">
                            <select
                              value={response.status}
                              onChange={(e) => updateResponseStatus(response.id, e.target.value as any)}
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="declined">Declined</option>
                            </select>
                            <button
                              onClick={() => deleteResponse(response.id)}
                              className="text-xs text-red-600 hover:text-red-800 px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                            >
                              🗑️ Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RsvpManagement;
