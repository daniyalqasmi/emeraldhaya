import React from 'react';
import { useStore } from '../context/StoreContext';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customImageSrc?: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md',
  customImageSrc,
  className = ''
}) => {
  let storeLogoUrl: string | undefined;
  try {
    const store = useStore();
    storeLogoUrl = store.settings?.logoUrl;
  } catch {
    // Graceful fallback if rendered outside of StoreProvider
  }

  // Responsive dimensions for the pure logo image (no text)
  const sizeClasses = {
    sm: 'h-9 w-9 sm:h-10 sm:w-10',
    md: 'h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14',
    lg: 'h-16 w-16 sm:h-20 sm:w-20',
    xl: 'h-24 w-24 sm:h-28 sm:w-28'
  }[size];

  // Primary image source: custom passed prop -> store settings logoUrl -> local luxury SVG asset
  const logoImageSrc = customImageSrc || storeLogoUrl || '/src/assets/logo.svg';

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      {/* Pure Logo Image without any text as requested */}
      <img
        src={logoImageSrc}
        alt="Brand Logo"
        className={`${sizeClasses} object-contain transition-transform duration-300 hover:scale-105 drop-shadow-sm cursor-pointer`}
      />
    </div>
  );
};
