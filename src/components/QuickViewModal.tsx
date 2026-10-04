import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Phone, Check, Ruler, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SizeGuideModal } from './SizeGuideModal';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    navigateTo,
    settings 
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.size[0] || '54';
  const currentColor = selectedColor || quickViewProduct.availableColors[0] || quickViewProduct.color;
  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, currentColor, quantity);
    setQuickViewProduct(null);
  };

  const handleWhatsAppOrder = () => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Salaam Emerald Haya! I would like to order:\n\n*${quickViewProduct.name}*\n• SKU: ${quickViewProduct.sku}\n• Size: ${currentSize}\n• Color: ${currentColor}\n• Quantity: ${quantity}\n• Total: ${formatPrice(quickViewProduct.price * quantity)}\n\nPlease assist with order confirmation and dispatch.`
    );
    window.open(`https://wa.me/${cleanNum}?text=${text}`, '_blank');
    setQuickViewProduct(null);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={() => setQuickViewProduct(null)}
      >
        <div 
          className="relative w-full max-w-4xl bg-white border border-[#D4AF37]/30 shadow-2xl rounded-sm overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Modal Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-black transition-colors bg-white/80 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Images Gallery */}
          <div className="w-full md:w-1/2 p-6 bg-[#F8F6F0] flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-white shadow-inner">
              <img
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              {quickViewProduct.discount && (
                <span className="absolute top-3 left-3 bg-[#006B5B] text-white text-xs font-semibold px-2 py-0.5 uppercase tracking-wider">
                  {quickViewProduct.discount}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 rounded overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-[#006B5B] ring-1 ring-[#006B5B]' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-[#006B5B] uppercase tracking-wider font-semibold">
                <span>{quickViewProduct.category}</span>
                <span className="font-mono text-neutral-500">SKU: {quickViewProduct.sku}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#111111] mt-1">
                {quickViewProduct.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pb-3 border-b border-neutral-100">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xl font-bold text-[#111111]">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="font-mono text-sm text-neutral-400 line-through">
                      {formatPrice(quickViewProduct.oldPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-[#D4AF37]' : 'text-neutral-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-mono">({quickViewProduct.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Description preview */}
              <p className="text-xs text-neutral-600 mt-4 leading-relaxed line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Material & Fabric */}
              <div className="mt-4 p-3 bg-[#FDFBF7] border border-[#006B5B]/15 rounded text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-medium">Textile / Weave:</span>
                  <span className="font-semibold text-neutral-900">{quickViewProduct.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-medium">Atelier Weight:</span>
                  <span className="font-semibold text-neutral-900">{quickViewProduct.weight}</span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                  Shade: <span className="text-[#006B5B] font-medium">{currentColor}</span>
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickViewProduct.availableColors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 text-xs border rounded transition-all ${
                        currentColor === col
                          ? 'border-[#006B5B] bg-[#006B5B] text-white shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with Size Guide trigger */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    Abaya Length (Inches)
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1 text-[11px] text-[#006B5B] hover:text-[#01453D] underline"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2 mt-2">
                  {quickViewProduct.size.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-center text-xs font-mono font-medium border rounded transition-all ${
                        currentSize === sz
                          ? 'border-[#006B5B] bg-[#006B5B] text-white font-bold'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-mono font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  Total: {formatPrice(quickViewProduct.price * quantity)}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Shopping Bag
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 border rounded transition-colors ${
                    isFavorited ? 'border-rose-500 text-rose-600 bg-rose-50' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Instant Checkout */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 bg-[#01453D] hover:bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                Direct WhatsApp Order
              </button>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigateTo('product', quickViewProduct.id);
                }}
                className="text-center text-xs text-[#006B5B] hover:underline pt-1"
              >
                View Complete Haute Couture Specification & Customer Reviews →
              </button>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </>
  );
};
