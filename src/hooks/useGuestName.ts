import { useParams } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';

export const useGuestName = () => {
  const { guestName: urlGuestName } = useParams<{ guestName?: string }>();
  const { weddingData } = useWedding();

  // Function to decode URL-encoded guest name
  const decodeGuestName = (encodedName: string): string => {
    try {
      // Replace hyphens with spaces and decode URI component
      const decodedName = decodeURIComponent(encodedName.replace(/-/g, ' '));
      return decodedName;
    } catch (error) {
      console.warn('Error decoding guest name:', error);
      return encodedName.replace(/-/g, ' ');
    }
  };

  // Function to encode guest name for URL
  const encodeGuestName = (name: string): string => {
    try {
      // Replace spaces with hyphens and encode URI component
      const encodedName = encodeURIComponent(name.replace(/\s+/g, '-'));
      return encodedName;
    } catch (error) {
      console.warn('Error encoding guest name:', error);
      return name.replace(/\s+/g, '-');
    }
  };

  // Get guest name from URL parameter or fallback to default
  const getGuestName = (): string => {
    if (urlGuestName) {
      return decodeGuestName(urlGuestName);
    }
    
    // Fallback to default guest name from wedding data
    return weddingData?.defaultGuestName || 'Tamu Undangan';
  };

  // Get display name with proper formatting
  const getDisplayName = (): string => {
    const guestName = getGuestName();
    
    // Capitalize each word
    return guestName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Check if guest name is from URL parameter
  const isFromUrlParameter = (): boolean => {
    return !!urlGuestName;
  };

  // Generate URL for specific guest
  const generateGuestUrl = (guestName: string, path: string = '/main'): string => {
    const encodedName = encodeGuestName(guestName);
    return `${path}/${encodedName}`;
  };

  // Get current URL with guest parameter
  const getCurrentGuestUrl = (path: string = '/main'): string => {
    const currentGuestName = getGuestName();
    return generateGuestUrl(currentGuestName, path);
  };

  return {
    guestName: getGuestName(),
    displayName: getDisplayName(),
    isFromUrlParameter: isFromUrlParameter(),
    encodeGuestName,
    decodeGuestName,
    generateGuestUrl,
    getCurrentGuestUrl,
    urlGuestName
  };
};
