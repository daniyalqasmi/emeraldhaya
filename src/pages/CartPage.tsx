import React, { useState } from 'react';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  Check, 
  ArrowLeft,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartGrandTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    formatPrice, 
    navigateTo,
    settings 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / settings.freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#FDFBF7] py-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#006B5B]/10 text-[#006B5B] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-light text-[#111111]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Discover our bespoke Dubai Haute Couture abayas and find your signature modest piece.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-6 px-8 py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow"
          >
            Explore 150+ Designs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FDFBF7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.2em]">
              Boutique Order
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] mt-1">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="hidden sm:flex items-center gap-1 text-xs text-[#006B5B] hover:underline uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Browsing</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="mb-8 p-4 bg-white border border-[#D4AF37]/30 rounded-sm shadow-sm">
          <div className="flex items-center justify-between text-xs text-neutral-700 font-medium mb-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#006B5B]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#006B5B] font-bold">
                  Congratulations! You unlocked complimentary worldwide express courier.
                </span>
              ) : (
                <span>
                  Add <strong className="font-mono text-[#006B5B]">{formatPrice(remainingForFreeShipping)}</strong> more to unlock <strong>Complimentary Worldwide Freight</strong>
                </span>
              )}
            </div>
            <span className="font-mono text-xs">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#006B5B] to-[#D4AF37] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Cart Grid: Items (Left) + Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Table / List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                className="p-4 sm:p-5 bg-white border border-[#006B5B]/15 rounded-sm shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top rounded bg-neutral-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-[10px] text-[#006B5B] uppercase tracking-wider font-semibold block">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1 font-mono">
                      <span>Length: <strong>{item.selectedSize}"</strong></span>
                      <span>·</span>
                      <span>Shade: <strong>{item.selectedColor}</strong></span>
                    </div>
                    <div className="text-sm font-bold text-neutral-900 font-mono mt-2 sm:hidden">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>

                {/* Stepper & Price & Delete */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-300 rounded bg-[#FDFBF7]">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                      }
                      className="px-2.5 py-1 text-sm text-neutral-600 hover:bg-neutral-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-bold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                      }
                      className="px-2.5 py-1 text-sm text-neutral-600 hover:bg-neutral-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="hidden sm:block text-right min-w-[90px]">
                    <div className="text-sm font-bold text-neutral-900 font-mono">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {formatPrice(item.product.price)} each
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Card (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#D4AF37]/30 rounded-sm p-6 shadow-sm sticky top-28 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#111111] pb-3 border-b border-neutral-100">
                Order Summary
              </h3>

              {/* Coupon Code Section */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1.5">
                  Promotional Coupon
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded text-xs">
                    <div className="flex items-center gap-1.5 text-[#006B5B] font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. EMERALD20"
                      className="flex-1 text-xs p-2.5 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B] uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#111111] hover:bg-[#006B5B] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-xs text-rose-600 mt-1">{couponError}</p>}
                <p className="text-[10px] text-neutral-400 mt-1">Try: EMERALD20 or WELCOME10</p>
              </div>

              {/* Line Item Totals */}
              <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal:</span>
                  <span className="font-mono font-medium text-neutral-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Savings:</span>
                    <span className="font-mono">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Freight:</span>
                  <span className="font-mono font-medium text-neutral-900">
                    {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                  <span>Total Amount:</span>
                  <span className="font-mono text-xl text-[#006B5B]">{formatPrice(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigateTo('checkout')}
                className="w-full py-4 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xl border border-[#D4AF37]/50"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006B5B]" />
                <span>Zero Online Payment Friction · Verified via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
