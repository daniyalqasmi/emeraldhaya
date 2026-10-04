import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Phone, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Check, 
  Sparkles,
  ChevronDown,
  Share2,
  Copy,
  Plus
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SizeGuideModal } from '../components/SizeGuideModal';

export const ProductDetailPage: React.FC = () => {
  const { 
    pageParam, 
    products, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo,
    settings,
    reviews,
    addCustomerReview,
    showToast
  } = useStore();

  const product = products.find((p) => p.id === pageParam) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.size[0] || '54');
  const [selectedColor, setSelectedColor] = useState<string>(product.availableColors[0] || product.color);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');

  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Bundle Add-on checkbox states
  const [includeMatchingSheila, setIncludeMatchingSheila] = useState(true);
  const [includeMagneticPins, setIncludeMagneticPins] = useState(false);

  // Related products (from same category or general)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  // Reviews for this specific product
  const productReviews = reviews.filter((r) => r.productId === product.id && r.isApproved);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('cart');
  };

  const handleWhatsAppOrder = () => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Salaam Emerald Haya Concierge! ✨\n\nI would like to place an order for the *${product.name}*:\n• SKU: ${product.sku}\n• Length / Size: ${selectedSize}\n• Color: ${selectedColor}\n• Quantity: ${quantity}\n• Unit Price: ${formatPrice(product.price)}\n• Total: ${formatPrice(product.price * quantity)}\n\nPlease advise regarding stock availability and delivery timeline to my address.`
    );
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  const handleShareProduct = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please enter your name and review comment', 'error');
      return;
    }
    setIsSubmittingReview(true);
    addCustomerReview({
      productId: product.id,
      customerName: reviewerName,
      customerCity: reviewerCity || 'Dubai, UAE',
      rating: reviewRating,
      comment: reviewComment,
      isVerified: true
    });
    setReviewerName('');
    setReviewerCity('');
    setReviewComment('');
    setIsSubmittingReview(false);
  };

  return (
    <div className="w-full bg-[#FDFBF7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-6">
          <button onClick={() => navigateTo('home')} className="hover:text-black">Emerald Haya</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-black">{product.category}</button>
          <span>/</span>
          <span className="text-[#006B5B] font-semibold truncate">{product.name}</span>
        </div>

        {/* Contiguous Purchase Layout: Left Gallery + Right Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Gallery & Thumbnails (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 sm:w-20 aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-[#006B5B] ring-1 ring-[#006B5B]' : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Main Stage Image with Zoom feel */}
            <div className="flex-1 relative aspect-[3/4] bg-[#F8F6F0] rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-md">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                referrerPolicy="no-referrer"
              />

              {product.discount && (
                <span className="absolute top-4 left-4 bg-[#006B5B] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                  {product.discount}% OFF ATELIER
                </span>
              )}

              <button
                onClick={handleShareProduct}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm text-neutral-800 hover:bg-white shadow transition-colors"
                title="Share this design"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-[#006B5B] uppercase tracking-wider font-semibold">
                <span>{product.category}</span>
                <span className="font-mono text-neutral-400">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] mt-2 leading-snug break-words">
                {product.name}
              </h1>

              {/* Ratings and Reviews count */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : 'text-neutral-200'}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-semibold text-neutral-800">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-neutral-400">·</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-[#006B5B] hover:underline"
                >
                  ({productReviews.length + product.reviewsCount} Verified Reviews)
                </button>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-3 mt-4 pb-4 border-b border-neutral-200">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#111111]">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="font-mono text-base text-neutral-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-medium ml-auto flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({product.stock} available)
                </span>
              </div>

              {/* Fabric Specs Summary */}
              <div className="mt-4 p-3 bg-white border border-[#006B5B]/15 rounded text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-medium">Textile:</span>
                  <span className="font-semibold text-neutral-900">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500 font-medium">Atelier Weight:</span>
                  <span className="font-semibold text-neutral-900">{product.weight}</span>
                </div>
              </div>

              {/* Color Shade Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-800">
                  <span>Selected Shade: <strong className="text-[#006B5B]">{selectedColor}</strong></span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.availableColors.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 text-xs rounded border transition-all ${
                        selectedColor === col
                          ? 'border-[#006B5B] bg-[#006B5B] text-white shadow-sm font-semibold'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection with Size Guide Trigger */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                    Abaya Length: <strong className="text-[#006B5B] font-mono">{selectedSize}"</strong>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1 text-xs text-[#006B5B] hover:text-[#01453D] underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size & Height Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {product.size.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-center text-xs font-mono rounded border transition-all ${
                        selectedSize === sz
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
                <div className="flex items-center border border-neutral-300 rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-bold text-neutral-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add To Shopping Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-sm border transition-colors shadow-sm ${
                      isFavorited
                        ? 'border-rose-500 bg-rose-50 text-rose-600'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors text-center active:scale-95"
                >
                  Instant Buy Now →
                </button>

                {/* Direct WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 bg-[#01453D] hover:bg-[#006B5B] text-[#D4AF37] border border-[#D4AF37]/60 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Order via WhatsApp Concierge</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-4 border-t border-neutral-200 grid grid-cols-3 gap-2 text-center text-[10px] text-neutral-600">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#006B5B] mb-1" />
                  <span>100% Genuine Nida</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#006B5B] mb-1" />
                  <span>Express Worldwide</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#006B5B] mb-1" />
                  <span>Easy Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="mt-16 p-6 sm:p-8 bg-white border border-[#D4AF37]/30 rounded-sm shadow-sm">
          <div className="flex items-center gap-2 text-[#006B5B] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Complete Your Modest Ensemble</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#111111] mb-6">
            Frequently Paired Together
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Product 1: The Abaya */}
              <div className="flex items-center gap-3">
                <img src={product.images[0]} alt="" className="w-16 h-20 object-cover rounded bg-neutral-100" />
                <div>
                  <div className="text-xs font-bold text-neutral-900">{product.name}</div>
                  <div className="text-xs text-neutral-500 font-mono">{formatPrice(product.price)}</div>
                </div>
              </div>

              <Plus className="w-5 h-5 text-neutral-400" />

              {/* Product 2: Matching Medina Silk Sheila */}
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-neutral-50 border border-neutral-200">
                <input
                  type="checkbox"
                  checked={includeMatchingSheila}
                  onChange={(e) => setIncludeMatchingSheila(e.target.checked)}
                  className="accent-[#006B5B]"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-900">Complimentary Silk Sheila Hijab</div>
                  <div className="text-xs text-emerald-700 font-semibold font-mono">FREE ($45 Value)</div>
                </div>
              </label>

              <Plus className="w-5 h-5 text-neutral-400" />

              {/* Product 3: Magnetic Pins */}
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-neutral-50 border border-neutral-200">
                <input
                  type="checkbox"
                  checked={includeMagneticPins}
                  onChange={(e) => setIncludeMagneticPins(e.target.checked)}
                  className="accent-[#006B5B]"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-900">Gold Magnetic Abaya Pins (4-Pack)</div>
                  <div className="text-xs text-neutral-500 font-mono">+ {formatPrice(25)}</div>
                </div>
              </label>
            </div>

            {/* Bundle Total CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-neutral-500 block">Bundle Price:</span>
                <span className="font-mono text-xl font-bold text-[#006B5B]">
                  {formatPrice(product.price + (includeMagneticPins ? 25 : 0))}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(product, selectedSize, selectedColor, 1);
                  showToast('Added complete couture ensemble to bag');
                }}
                className="px-6 py-3 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow"
              >
                Add 3-Piece Bundle to Bag
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Reviews, Shipping */}
        <div className="mt-16 bg-white border border-neutral-200 rounded-sm overflow-hidden">
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-4 text-center text-xs uppercase tracking-wider font-semibold transition-colors ${
                activeTab === 'details' ? 'border-b-2 border-[#006B5B] text-[#006B5B] bg-[#FDFBF7]' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Haute Couture Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 text-center text-xs uppercase tracking-wider font-semibold transition-colors ${
                activeTab === 'reviews' ? 'border-b-2 border-[#006B5B] text-[#006B5B] bg-[#FDFBF7]' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Customer Reviews ({productReviews.length + product.reviewsCount})
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`flex-1 py-4 text-center text-xs uppercase tracking-wider font-semibold transition-colors ${
                activeTab === 'shipping' ? 'border-b-2 border-[#006B5B] text-[#006B5B] bg-[#FDFBF7]' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#111111] mb-2">Garment Description</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="font-serif text-lg font-bold text-[#111111] mb-3">Atelier Specifications</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-700">
                    {product.detailsList?.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#006B5B] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-10">
                {/* Submit New Review Form */}
                <form onSubmit={handleReviewSubmit} className="p-6 bg-[#FDFBF7] border border-[#D4AF37]/30 rounded-sm">
                  <h4 className="font-serif text-lg font-bold text-[#111111] mb-1">
                    Write a Client Review
                  </h4>
                  <p className="text-xs text-neutral-500 mb-4">
                    Share your experience regarding fabric weight, length, and craftsmanship.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Maryam Al-Hashemi"
                        className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">City & Country</label>
                      <input
                        type="text"
                        value={reviewerCity}
                        onChange={(e) => setReviewerCity(e.target.value)}
                        placeholder="e.g. Riyadh, Saudi Arabia"
                        className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`px-3 py-1.5 text-xs rounded border flex items-center gap-1 ${
                            reviewRating === star
                              ? 'bg-[#006B5B] text-white border-[#006B5B]'
                              : 'bg-white text-neutral-700 border-neutral-200'
                          }`}
                        >
                          <span>{star}</span>
                          <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Review Commentary</label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Comment on the Korean Nida texture, fall of the hem, and delivery..."
                      className="w-full text-xs p-2.5 bg-white border border-neutral-300 rounded"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-6 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </form>

                {/* Existing Reviews List */}
                <div className="space-y-4">
                  {productReviews.length > 0 ? (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-[#FDFBF7] rounded border border-neutral-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">{rev.customerName}</span>
                            {rev.customerCity && <span className="text-xs text-neutral-500">· {rev.customerCity}</span>}
                            {rev.isVerified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-400 font-mono">{rev.date}</span>
                        </div>
                        <div className="flex text-[#D4AF37] mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#D4AF37]' : 'text-neutral-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-neutral-500">
                      Be the first to review this bespoke piece!
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs text-neutral-700 leading-relaxed max-w-2xl">
                <p>
                  <strong>Worldwide Express Freight:</strong> All orders are dispatched directly from our central atelier in Downtown Dubai via DHL Express and Aramex. Tracking links are provided via WhatsApp and email.
                </p>
                <p>
                  <strong>Delivery Timelines:</strong>
                  <br />• UAE & GCC: 24 - 48 Hours
                  <br />• United Kingdom, Europe & USA: 3 - 5 Business Days
                  <br />• Rest of the World: 5 - 7 Business Days
                </p>
                <p>
                  <strong>Complimentary Shipping:</strong> Orders exceeding ${settings.freeShippingThreshold} qualify for complimentary express courier.
                </p>
                <p>
                  <strong>Returns & Alterations:</strong> We provide complimentary size alterations within 14 days of delivery.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.2em]">
                You May Also Admire
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#111111] mt-1">
                Related Haute Couture Designs
              </h3>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs uppercase tracking-wider text-[#006B5B] font-semibold hover:underline"
            >
              View Entire Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
    </div>
  );
};
