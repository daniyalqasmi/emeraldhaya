import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Phone, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    navigateTo, 
    formatPrice, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    addToCart,
    settings 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to the first available size or standard 54
    const defaultSize = product.size[0] || '54';
    const defaultColor = product.availableColors[0] || product.color;
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Salaam Emerald Haya! I am interested in ordering the *${product.name}* (SKU: ${product.sku}, Price: ${formatPrice(product.price)}). Could you please verify availability in my size?`
    );
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-[#006B5B]/10 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
      onClick={() => navigateTo('product', product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container (65%-75% of card height) */}
      <div className="relative aspect-[3/4] w-full bg-[#F8F6F0] overflow-hidden">
        {!imageError ? (
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#F8F6F0] to-[#EAE6DD] text-neutral-400 p-4 text-center">
            <span className="font-serif text-lg text-[#006B5B] font-bold">Emerald Haya</span>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] mt-1">Haute Couture</span>
          </div>
        )}

        {/* Single Subtle Promotional Tag */}
        {product.isComboDeal ? (
          <span className="absolute top-3 left-3 bg-[#D4AF37] text-neutral-950 text-[10px] sm:text-[11px] font-bold tracking-wider px-2 py-0.5 uppercase shadow-md flex items-center gap-1">
            <span>★ 3-Piece Bundle Deal</span>
          </span>
        ) : product.category === 'Stoles & Sheilas' ? (
          <span className="absolute top-3 left-3 bg-[#006B5B] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider px-2 py-0.5 uppercase">
            Luxury Stole
          </span>
        ) : product.category === 'Magnetic Pins & Brooches' ? (
          <span className="absolute top-3 left-3 bg-[#01453D] text-[#D4AF37] text-[10px] sm:text-[11px] font-semibold tracking-wider px-2 py-0.5 uppercase border border-[#D4AF37]/40">
            No-Snag Pin
          </span>
        ) : product.discount ? (
          <span className="absolute top-3 left-3 bg-[#006B5B] text-white text-[11px] font-semibold tracking-wider px-2 py-0.5 uppercase">
            {product.discount}% OFF
          </span>
        ) : product.isNewArrival ? (
          <span className="absolute top-3 left-3 bg-[#111111] text-[#D4AF37] text-[11px] font-semibold tracking-wider px-2 py-0.5 uppercase">
            New Edition
          </span>
        ) : product.isBestSeller ? (
          <span className="absolute top-3 left-3 bg-[#01453D] text-[#F8F6F0] text-[11px] font-semibold tracking-wider px-2 py-0.5 uppercase">
            Atelier Best Seller
          </span>
        ) : null}

        {/* Wishlist Button (Always accessible top-right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors shadow-sm ${
            isFavorited 
              ? 'bg-white text-rose-600' 
              : 'bg-white/80 backdrop-blur-sm text-neutral-700 hover:text-black hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-2 bottom-3 hidden sm:flex items-center justify-center gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-sm hover:bg-[#006B5B] hover:text-white text-neutral-900 text-xs font-medium tracking-wide uppercase transition-colors rounded-sm shadow flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="p-2 bg-white/95 backdrop-blur-sm hover:bg-[#006B5B] hover:text-white text-neutral-900 transition-colors rounded-sm shadow"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

          <button
            onClick={handleWhatsAppInquiry}
            className="p-2 bg-[#006B5B] hover:bg-[#01453D] text-white transition-colors rounded-sm shadow"
            title="Inquire via WhatsApp"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* Card Metadata Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Material in clean unboxed metadata */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider mb-1">
            <span className="text-[#006B5B] font-semibold truncate max-w-[70%]">{product.category}</span>
            <span className="truncate">{product.material.split(' ')[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-[15px] sm:text-[17px] font-semibold text-[#111111] leading-snug line-clamp-1 group-hover:text-[#006B5B] transition-colors">
            {product.name}
          </h3>

          {/* Subtle Rating line */}
          <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs text-neutral-500">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 sm:w-3 h-2.5 sm:h-3 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : 'text-neutral-300'}`}
                />
              ))}
            </div>
            <span className="font-mono tabular-nums text-[10px] sm:text-[11px] text-neutral-600">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Stock info */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono tabular-nums text-sm sm:text-base font-bold text-[#111111]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="font-mono tabular-nums text-[11px] text-neutral-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-800 font-medium hidden sm:inline">
              In Stock ({product.stock})
            </span>
          </div>

          {/* Mobile-Only Action Buttons (Quick View & WhatsApp) */}
          <div className="mt-2 pt-2 border-t border-neutral-100 flex sm:hidden items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="flex-1 py-1.5 px-2 bg-[#F8F6F0] hover:bg-[#006B5B] hover:text-white text-neutral-800 text-[10px] font-semibold uppercase tracking-wider rounded text-center transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleWhatsAppInquiry}
              className="p-1.5 bg-[#006B5B] text-white rounded"
              title="WhatsApp inquiry"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
