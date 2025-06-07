import React, { useState } from 'react';
import { useWedding } from '../../contexts/WeddingContext';
import { GalleryImage } from '../../types/wedding';
import AdminLayout from '../../layouts/AdminLayout';

const GalleryManagement = () => {
  const { weddingData, updateGallerySettings } = useWedding();
  const [formData, setFormData] = useState(weddingData.gallerySettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const deleteImage = (index: number) => {
    if (window.confirm('Hapus gambar ini?')) {
      const updatedImages = formData.images.filter((_, i) => i !== index);

      // Update local state
      setFormData(prev => ({
        ...prev,
        images: updatedImages
      }));

      // Auto-save to context immediately
      const updatedGallerySettings = {
        ...formData,
        images: updatedImages
      };
      updateGallerySettings(updatedGallerySettings);

      setMessage('Gambar berhasil dihapus!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const validateFile = (file: File): string | null => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.';
    }

    if (file.size > maxSize) {
      return 'File terlalu besar. Maksimal 5MB.';
    }

    return null;
  };

  const convertFileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleBulkUpload = async (files: FileList) => {
    setUploading(true);
    const fileArray = Array.from(files);
    let successCount = 0;
    const newImages: GalleryImage[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const validationError = validateFile(file);

      if (validationError) {
        console.warn(`File ${file.name}: ${validationError}`);
        continue;
      }

      try {
        // Convert file to data URL for persistent storage
        const dataUrl = await convertFileToDataURL(file);

        // Create new image entry with data URL
        const timestamp = Date.now() + i;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${file.name.split('.')[0]}_${timestamp}.${fileExtension}`;

        const newImage: GalleryImage = {
          id: `IMG_${timestamp}`,
          src: dataUrl, // Use data URL for persistent storage
          alt: file.name.split('.')[0],
          type: 'square',
          isActive: true
        };

        newImages.push(newImage);
        successCount++;

        // In a real application, you would upload the file to server here:
        // const formData = new FormData();
        // formData.append('file', file);
        // const response = await fetch('/api/upload', { method: 'POST', body: formData });
        // const result = await response.json();
        // newImage.src = result.url; // Update with server URL

      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    // Update formData with all new images
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));

    // Auto-save to context immediately
    const updatedGallerySettings = {
      ...formData,
      images: [...formData.images, ...newImages]
    };
    updateGallerySettings(updatedGallerySettings);

    setUploading(false);
    setMessage(`${successCount} gambar berhasil ditambahkan dan disimpan! Refresh halaman gallery untuk melihat perubahan.`);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleBulkUpload(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      updateGallerySettings(formData);
      setMessage('Gallery settings berhasil disimpan!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Terjadi kesalahan saat menyimpan gallery settings.');
      console.error('Error saving gallery settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto" style={{ fontFamily: 'Ovo, serif' }}>
        <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-xl border border-amber-200">
          <div className="border-b border-amber-200 px-8 py-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-t-2xl">
            <div className="flex items-center">
              <i className="fas fa-images text-amber-600 text-3xl mr-4"></i>
              <div>
                <h1 className="text-3xl font-bold text-amber-800">Gallery Management</h1>
                <p className="text-amber-700 mt-1">Upload and manage wedding gallery photos</p>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl border shadow-sm ${
              message.includes('berhasil')
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300'
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className={`fas ${message.includes('berhasil') ? 'fa-check-circle' : 'fa-exclamation-triangle'} mr-3`}></i>
                  <span>{message}</span>
                </div>
                {message.includes('ditambahkan') && (
                  <a
                    href="/gallery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    View Gallery
                  </a>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quick Settings */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Pengaturan Teks</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Judul Gallery</label>
                  <input
                    type="text"
                    name="headerTitle"
                    value={formData.headerTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Our Gallery"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    name="headerSubtitle"
                    value={formData.headerSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi gallery"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quote Bawah</label>
                  <input
                    type="text"
                    name="bottomQuote"
                    value={formData.bottomQuote}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Quote inspiratif"
                  />
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Upload Foto Gallery</h2>
                <p className="text-gray-500 text-sm">Pilih beberapa foto sekaligus untuk ditambahkan ke gallery</p>
                <div className="mt-2 text-xs text-blue-600 bg-blue-50 rounded-lg p-3">
                  💡 <strong>Tips:</strong> Foto akan langsung tersimpan dan muncul di gallery setelah upload.
                  Klik tombol "Lihat Gallery →" untuk melihat hasilnya.
                </div>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  dragOver
                    ? 'border-green-400 bg-green-50'
                    : uploading
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleBulkUpload(e.target.files);
                      }
                    }}
                    className="hidden"
                    disabled={uploading}
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-blue-600 font-medium">Mengupload foto...</p>
                    </div>
                  ) : dragOver ? (
                    <div className="flex flex-col items-center">
                      <div className="text-6xl mb-4">📤</div>
                      <h3 className="text-xl font-medium text-green-700 mb-2">Drop foto di sini</h3>
                      <p className="text-green-600">Lepaskan untuk mengupload</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-6xl mb-4">📸</div>
                      <h3 className="text-xl font-medium text-gray-700 mb-2">Upload Foto Gallery</h3>
                      <p className="text-gray-500 mb-4">Klik untuk memilih foto atau drag & drop di sini</p>
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Pilih Foto
                      </div>
                      <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP (Max 5MB per file)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Current Images */}
            {formData.images.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Foto Gallery ({formData.images.length})</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <div className={`relative overflow-hidden rounded-lg ${
                        image.type === 'landscape' ? 'aspect-video' : 'aspect-square'
                      } bg-gray-200`}>
                        {image.src ? (
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => deleteImage(index)}
                            className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all"
                            title="Hapus gambar"
                          >
                            🗑️
                          </button>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            image.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {image.isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>

                        {/* Type Badge */}
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {image.type === 'landscape' ? 'L' : 'S'}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 text-center">
                        <p className="text-sm text-gray-600 truncate">{image.alt || 'No title'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Submit Button */}
            <div className="text-center pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium text-white ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors duration-200`}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
              </button>
            </div>
          </form>
        </div>

        {/* Simple Preview */}
        {formData.images.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Preview Gallery</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-center mb-4">
                <h3 className="text-xl font-medium mb-2" style={{ color: "#644F44" }}>
                  {formData.headerTitle}
                </h3>
                <p className="text-sm text-gray-600 italic">
                  "{formData.headerSubtitle}"
                </p>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                {formData.images.filter(img => img.isActive).slice(0, 12).map((image) => (
                  <div key={image.id} className="aspect-square bg-gray-200 rounded overflow-hidden">
                    {image.src ? (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm italic text-gray-600">
                  "{formData.bottomQuote}"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
