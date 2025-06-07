import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import AdminLayout from '../../layouts/AdminLayout';
import ImageUpload from '../../components/ImageUpload';

const BrideGroomManagement = () => {
  const { weddingData, updateBrideGroomSettings } = useWedding();
  const [formData, setFormData] = useState(weddingData.brideGroomSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (section: 'brideSettings' | 'groomSettings', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      updateBrideGroomSettings(formData);
      setMessage('Pengaturan Bride & Groom berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Terjadi kesalahan saat menyimpan data.');
      console.error('Error saving bride groom settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto" style={{ fontFamily: 'Ovo, serif' }}>
        <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-xl border border-amber-200">
          <div className="border-b border-amber-200 px-8 py-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-2xl">
            <div className="flex items-center">
              <i className="fas fa-ring text-amber-600 text-3xl mr-4"></i>
              <div>
                <h1 className="text-3xl font-bold text-amber-800">Bride & Groom Pages</h1>
                <p className="text-amber-700 mt-1">Manage bride and groom profile pages</p>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl border shadow-sm flex items-center ${
              message.includes('berhasil')
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300'
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300'
            }`}>
              <i className={`fas ${message.includes('berhasil') ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-3`}></i>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-12">
            {/* Bride Settings */}
            <div className="border border-pink-300 rounded-2xl p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 shadow-lg">
              <div className="flex items-center mb-8">
                <i className="fas fa-female text-pink-600 text-3xl mr-4"></i>
                <div>
                  <h2 className="text-2xl font-bold text-pink-800">Bride Profile</h2>
                  <p className="text-pink-700">Manage bride page content</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Header Title
                  </label>
                  <input
                    type="text"
                    value={formData.brideSettings.headerTitle}
                    onChange={(e) => handleInputChange('brideSettings', 'headerTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="The Bride"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Header Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.brideSettings.headerSubtitle}
                    onChange={(e) => handleInputChange('brideSettings', 'headerSubtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="A beautiful soul with a heart full of love"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Pengantin
                  </label>
                  <input
                    type="text"
                    value={formData.brideSettings.label}
                    onChange={(e) => handleInputChange('brideSettings', 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Calon Pengantin Wanita"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Orang Tua
                  </label>
                  <input
                    type="text"
                    value={formData.brideSettings.parentLabel}
                    onChange={(e) => handleInputChange('brideSettings', 'parentLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Putri dari"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    value={formData.brideSettings.fatherName}
                    onChange={(e) => handleInputChange('brideSettings', 'fatherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Bapak Adit"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    value={formData.brideSettings.motherName}
                    onChange={(e) => handleInputChange('brideSettings', 'motherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Ibu Shikimori"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <ImageUpload
                    currentImage={formData.brideSettings.photo}
                    onImageChange={(url) => handleInputChange('brideSettings', 'photo', url)}
                    label="Bride Photo"
                    placeholder="Upload bride photo or enter URL"
                    maxSizeKB={1024}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quote Bride
                  </label>
                  <textarea
                    value={formData.brideSettings.quote}
                    onChange={(e) => handleInputChange('brideSettings', 'quote', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Cinta sejati dimulai ketika tidak ada yang diharapkan sebagai balasan"
                  />
                </div>
              </div>
            </div>

            {/* Groom Settings */}
            <div className="border border-blue-300 rounded-2xl p-8 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 shadow-lg">
              <div className="flex items-center mb-8">
                <i className="fas fa-male text-blue-600 text-3xl mr-4"></i>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800">Groom Profile</h2>
                  <p className="text-blue-700">Manage groom page content</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Header Title
                  </label>
                  <input
                    type="text"
                    value={formData.groomSettings.headerTitle}
                    onChange={(e) => handleInputChange('groomSettings', 'headerTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="The Groom"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Header Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.groomSettings.headerSubtitle}
                    onChange={(e) => handleInputChange('groomSettings', 'headerSubtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="A gentle soul with strength and devotion"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Pengantin
                  </label>
                  <input
                    type="text"
                    value={formData.groomSettings.label}
                    onChange={(e) => handleInputChange('groomSettings', 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Calon Pengantin Pria"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label Orang Tua
                  </label>
                  <input
                    type="text"
                    value={formData.groomSettings.parentLabel}
                    onChange={(e) => handleInputChange('groomSettings', 'parentLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Putra dari"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    value={formData.groomSettings.fatherName}
                    onChange={(e) => handleInputChange('groomSettings', 'fatherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bapak Agata"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    value={formData.groomSettings.motherName}
                    onChange={(e) => handleInputChange('groomSettings', 'motherName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ibu Ayaka"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <ImageUpload
                    currentImage={formData.groomSettings.photo}
                    onImageChange={(url) => handleInputChange('groomSettings', 'photo', url)}
                    label="Groom Photo"
                    placeholder="Upload groom photo or enter URL"
                    maxSizeKB={1024}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quote Groom
                  </label>
                  <textarea
                    value={formData.groomSettings.quote}
                    onChange={(e) => handleInputChange('groomSettings', 'quote', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cinta sejati adalah ketika kamu menemukan seseorang yang membuatmu menjadi versi terbaik dari dirimu"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8 border-t border-amber-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-2xl font-medium text-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                }`}
              >
                <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-save'} mr-3`}></i>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Bride Preview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-pink-800 mb-4 flex items-center">
              <span className="mr-2">👰</span>
              Preview Bride
            </h3>
            <div className="bg-pink-50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-medium text-pink-700">{formData.brideSettings.headerTitle}</h4>
                <p className="text-sm text-gray-600 italic">"{formData.brideSettings.headerSubtitle}"</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">{formData.brideSettings.label}</span>
                <p className="font-semibold">{weddingData.couple.brideFirstName} {weddingData.couple.brideLastName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">{formData.brideSettings.parentLabel}</span>
                <p className="text-sm">{formData.brideSettings.fatherName} & {formData.brideSettings.motherName}</p>
              </div>
              <div>
                <p className="text-sm italic text-gray-600">"{formData.brideSettings.quote}"</p>
              </div>
            </div>
          </div>

          {/* Groom Preview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">🤵</span>
              Preview Groom
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-medium text-blue-700">{formData.groomSettings.headerTitle}</h4>
                <p className="text-sm text-gray-600 italic">"{formData.groomSettings.headerSubtitle}"</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">{formData.groomSettings.label}</span>
                <p className="font-semibold">{weddingData.couple.groomFirstName} {weddingData.couple.groomLastName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">{formData.groomSettings.parentLabel}</span>
                <p className="text-sm">{formData.groomSettings.fatherName} & {formData.groomSettings.motherName}</p>
              </div>
              <div>
                <p className="text-sm italic text-gray-600">"{formData.groomSettings.quote}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BrideGroomManagement;
