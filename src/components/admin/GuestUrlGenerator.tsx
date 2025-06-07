import React, { useState } from 'react';
import { useGuestName } from '../../hooks/useGuestName';

interface GuestUrlGeneratorProps {
  guestName?: string;
  className?: string;
}

const GuestUrlGenerator: React.FC<GuestUrlGeneratorProps> = ({ 
  guestName: propGuestName, 
  className = '' 
}) => {
  const { generateGuestUrl, encodeGuestName } = useGuestName();
  const [inputGuestName, setInputGuestName] = useState(propGuestName || '');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const generateUrls = (name: string) => {
    if (!name.trim()) return {};

    const baseUrl = window.location.origin;
    return {
      intro: `${baseUrl}${generateGuestUrl(name, '/intro')}`,
      main: `${baseUrl}${generateGuestUrl(name, '/main')}`,
      rsvp: `${baseUrl}${generateGuestUrl(name, '/rsvp')}`,
      thanks: `${baseUrl}${generateGuestUrl(name, '/thanks')}`
    };
  };

  const urls = generateUrls(inputGuestName);

  const copyToClipboard = async (url: string, type: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <i className="fas fa-link text-blue-500 mr-2"></i>
          Generator URL Personal
        </h3>
        <p className="text-sm text-gray-600">
          Buat URL personal untuk setiap tamu undangan dengan nama mereka
        </p>
      </div>

      {/* Input Guest Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Tamu
        </label>
        <input
          type="text"
          value={inputGuestName}
          onChange={(e) => setInputGuestName(e.target.value)}
          placeholder="Masukkan nama tamu (contoh: John Doe)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {inputGuestName && (
          <p className="mt-1 text-xs text-gray-500">
            URL akan menggunakan format: {encodeGuestName(inputGuestName)}
          </p>
        )}
      </div>

      {/* Generated URLs */}
      {inputGuestName.trim() && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800 mb-3">URL Personal untuk "{inputGuestName}":</h4>

          {/* Intro Page URL */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                <i className="fas fa-door-open text-purple-500 mr-2"></i>
                Halaman Intro
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(urls.intro!, 'intro')}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === urls.intro ? (
                    <><i className="fas fa-check mr-1"></i>Copied!</>
                  ) : (
                    <><i className="fas fa-copy mr-1"></i>Copy</>
                  )}
                </button>
                <button
                  onClick={() => openUrl(urls.intro!)}
                  className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  title="Open URL"
                >
                  <i className="fas fa-external-link-alt mr-1"></i>Open
                </button>
              </div>
            </div>
            <code className="text-xs text-gray-600 break-all">{urls.intro}</code>
          </div>

          {/* Main Page URL */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                <i className="fas fa-home text-green-500 mr-2"></i>
                Halaman Utama
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(urls.main!, 'main')}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === urls.main ? (
                    <><i className="fas fa-check mr-1"></i>Copied!</>
                  ) : (
                    <><i className="fas fa-copy mr-1"></i>Copy</>
                  )}
                </button>
                <button
                  onClick={() => openUrl(urls.main!)}
                  className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  title="Open URL"
                >
                  <i className="fas fa-external-link-alt mr-1"></i>Open
                </button>
              </div>
            </div>
            <code className="text-xs text-gray-600 break-all">{urls.main}</code>
          </div>

          {/* RSVP URL */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                <i className="fas fa-envelope text-blue-500 mr-2"></i>
                Halaman RSVP
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(urls.rsvp!, 'rsvp')}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === urls.rsvp ? (
                    <><i className="fas fa-check mr-1"></i>Copied!</>
                  ) : (
                    <><i className="fas fa-copy mr-1"></i>Copy</>
                  )}
                </button>
                <button
                  onClick={() => openUrl(urls.rsvp!)}
                  className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  title="Open URL"
                >
                  <i className="fas fa-external-link-alt mr-1"></i>Open
                </button>
              </div>
            </div>
            <code className="text-xs text-gray-600 break-all">{urls.rsvp}</code>
          </div>

          {/* Thanks URL */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                <i className="fas fa-heart text-red-500 mr-2"></i>
                Halaman Thanks
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(urls.thanks!, 'thanks')}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  title="Copy URL"
                >
                  {copiedUrl === urls.thanks ? (
                    <><i className="fas fa-check mr-1"></i>Copied!</>
                  ) : (
                    <><i className="fas fa-copy mr-1"></i>Copy</>
                  )}
                </button>
                <button
                  onClick={() => openUrl(urls.thanks!)}
                  className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  title="Open URL"
                >
                  <i className="fas fa-external-link-alt mr-1"></i>Open
                </button>
              </div>
            </div>
            <code className="text-xs text-gray-600 break-all">{urls.thanks}</code>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h5 className="text-sm font-medium text-blue-800 mb-2">
          <i className="fas fa-info-circle mr-2"></i>
          Cara Penggunaan:
        </h5>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Masukkan nama tamu untuk generate URL personal</li>
          <li>• Setiap URL akan menampilkan nama tamu secara otomatis</li>
          <li>• Copy URL dan kirim ke tamu melalui WhatsApp/Email</li>
          <li>• Tamu akan melihat nama mereka di undangan</li>
          <li>• Format URL: /main/Nama-Tamu, /rsvp/Nama-Tamu, dll</li>
        </ul>
      </div>

      {/* Quick Actions */}
      {inputGuestName.trim() && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              const message = `Halo ${inputGuestName}! Anda diundang ke pernikahan kami. Silakan buka undangan personal Anda: ${urls.intro}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="text-xs bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
          >
            <i className="fab fa-whatsapp mr-1"></i>
            Share via WhatsApp
          </button>
          <button
            onClick={() => {
              const subject = 'Undangan Pernikahan';
              const body = `Halo ${inputGuestName}!\n\nAnda diundang ke pernikahan kami.\n\nSilakan buka undangan personal Anda di:\n${urls.intro}\n\nHalaman Utama: ${urls.main}\nUntuk RSVP: ${urls.rsvp}\n\nTerima kasih!`;
              window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
            }}
            className="text-xs bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <i className="fas fa-envelope mr-1"></i>
            Share via Email
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestUrlGenerator;
