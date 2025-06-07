import React, { useState, useEffect } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import AdminLayout from '../../layouts/AdminLayout';

const ThanksManagement: React.FC = () => {
  const { weddingData, updateThanksSettings } = useWedding();
  const { thanksSettings } = weddingData;
  
  const [formData, setFormData] = useState({
    headerTitle: thanksSettings.headerTitle,
    coupleNames: thanksSettings.coupleNames,
    mainMessage: thanksSettings.mainMessage
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData({
      headerTitle: thanksSettings.headerTitle,
      coupleNames: thanksSettings.coupleNames,
      mainMessage: thanksSettings.mainMessage
    });
  }, [thanksSettings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateThanksSettings(formData);
    setMessage('Pengaturan Thanks berhasil disimpan!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto" style={{ fontFamily: 'Ovo, serif' }}>
        <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-xl border border-amber-200">
          <div className="border-b border-amber-200 px-8 py-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-2xl">
            <div className="flex items-center">
              <i className="fas fa-hands-praying text-amber-600 text-3xl mr-4"></i>
              <div>
                <h1 className="text-3xl font-bold text-amber-800">Thanks Page</h1>
                <p className="text-amber-700 mt-1">Manage thank you page content</p>
              </div>
            </div>
          </div>

          {message && (
            <div className="mx-8 mt-6 p-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 shadow-sm">
              <div className="flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                {message}
              </div>
            </div>
          )}

          <div className="p-8 space-y-8">
            {/* Essential Fields Only */}
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-heading text-amber-600 mr-3"></i>
                <h3 className="text-xl font-semibold text-amber-800">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-amber-800 mb-3">
                    <i className="fas fa-font mr-2"></i>
                    Main Title
                  </label>
                  <input
                    type="text"
                    name="headerTitle"
                    value={formData.headerTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/70 text-amber-900"
                    placeholder="Thank You"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-medium text-amber-800 mb-3">
                    <i className="fas fa-heart mr-2"></i>
                    Couple Names
                  </label>
                  <input
                    type="text"
                    name="coupleNames"
                    value={formData.coupleNames}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/70 text-amber-900"
                    placeholder="Wira & Sofi"
                  />
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <i className="fas fa-comment-dots text-amber-600 mr-3"></i>
                <h3 className="text-xl font-semibold text-amber-800">Thank You Message</h3>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-amber-800 mb-3">
                  <i className="fas fa-message mr-2"></i>
                  Main Message
                </label>
                <textarea
                  name="mainMessage"
                  value={formData.mainMessage}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/70 text-amber-900 resize-none"
                  placeholder="Your heartfelt thank you message..."
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-8 border-t border-amber-200">
              <button
                onClick={handleSave}
                className="px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-[#644F44] rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium text-lg flex items-center"
              >
                <i className="fas fa-save mr-3"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ThanksManagement;
