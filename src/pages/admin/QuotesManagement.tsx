import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { Quote } from '../../types/wedding';
import AdminLayout from '../../layouts/AdminLayout';
import ImageUpload from '../../components/ImageUpload';

const QuotesManagement = () => {
  const { weddingData, updateQuotesSettings } = useWedding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(weddingData.quotesSettings);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuoteChange = (index: number, field: keyof Quote, value: string | boolean) => {
    const updatedQuotes = [...formData.quotes];
    updatedQuotes[index] = {
      ...updatedQuotes[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      quotes: updatedQuotes
    }));
  };

  const addNewQuote = () => {
    const newQuote: Quote = {
      id: Date.now().toString(),
      text: '',
      author: '',
      isActive: true
    };
    setFormData(prev => ({
      ...prev,
      quotes: [...prev.quotes, newQuote]
    }));
  };

  const deleteQuote = (index: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus quote ini?')) {
      const updatedQuotes = formData.quotes.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        quotes: updatedQuotes
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      updateQuotesSettings(formData);
      setMessage('Quotes berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Terjadi kesalahan saat menyimpan quotes.');
      console.error('Error saving quotes:', error);
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
              <i className="fas fa-quote-left text-amber-600 text-3xl mr-4"></i>
              <div>
                <h1 className="text-3xl font-bold text-amber-800">Quotes Management</h1>
                <p className="text-amber-700 mt-1">Manage wedding quotes and love messages</p>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Settings */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Pengaturan Header</h2>
              <div className="grid md:grid-cols-2 gap-6">
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
                    placeholder="Words of Love"
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
                    placeholder="Kata-kata indah tentang cinta dan pernikahan"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan Bawah
                  </label>
                  <input
                    type="text"
                    name="bottomMessage"
                    value={formData.bottomMessage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Love is the bridge between two hearts"
                  />
                </div>
                <div className="md:col-span-2">
                  <ImageUpload
                    currentImage={formData.quotesImage}
                    onImageChange={(url) => setFormData(prev => ({ ...prev, quotesImage: url }))}
                    label="Quotes Background Image"
                    placeholder="Upload quotes background image or enter URL"
                    maxSizeKB={1024}
                  />
                </div>
              </div>
            </div>

            {/* Quotes Management */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Daftar Quotes</h2>
                <button
                  type="button"
                  onClick={addNewQuote}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  + Tambah Quote Baru
                </button>
              </div>

              <div className="space-y-6">
                {formData.quotes.map((quote, index) => (
                  <div key={quote.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Quote #{index + 1}</h3>
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={quote.isActive}
                            onChange={(e) => handleQuoteChange(index, 'isActive', e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-600">Aktif</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => deleteQuote(index)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teks Quote
                        </label>
                        <textarea
                          value={quote.text}
                          onChange={(e) => handleQuoteChange(index, 'text', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Masukkan teks quote..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Penulis/Sumber
                        </label>
                        <input
                          type="text"
                          value={quote.author}
                          onChange={(e) => handleQuoteChange(index, 'author', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nama penulis atau sumber quote"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {formData.quotes.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">Belum ada quotes</p>
                  <p className="text-sm mt-2">Klik tombol "Tambah Quote Baru" untuk menambahkan quote pertama</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-md font-medium text-white ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                } transition-colors duration-200`}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Preview</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-light mb-2" style={{ color: "#644F44" }}>
                {formData.headerTitle}
              </h3>
              <p className="text-sm opacity-70" style={{ color: "#644F44" }}>
                {formData.headerSubtitle}
              </p>
            </div>
            
            {formData.quotes.filter(q => q.isActive).length > 0 && (
              <div className="bg-white rounded-lg p-6 mb-4">
                <blockquote className="text-lg italic mb-4" style={{ color: "#644F44" }}>
                  "{formData.quotes.filter(q => q.isActive)[0]?.text}"
                </blockquote>
                <cite className="text-sm font-medium" style={{ color: "#644F44" }}>
                  — {formData.quotes.filter(q => q.isActive)[0]?.author}
                </cite>
              </div>
            )}
            
            <div className="text-center">
              <p className="text-sm opacity-60" style={{ color: "#644F44" }}>
                {formData.bottomMessage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuotesManagement;
