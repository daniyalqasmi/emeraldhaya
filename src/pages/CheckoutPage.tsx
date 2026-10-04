import React, { useState } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  User, 
  Mail, 
  Lock 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartGrandTotal, 
    appliedCoupon, 
    createWhatsAppOrder, 
    navigateTo, 
    formatPrice, 
    showToast,
    settings 
  } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Arab Emirates',
    orderNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="w-full bg-[#FDFBF7] py-20 text-center">
        <h2 className="font-serif text-2xl font-bold">Your Bag is Empty</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-2.5 bg-[#006B5B] text-white text-xs uppercase font-semibold rounded"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim()) {
      showToast('Please complete all required customer fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const { order, whatsappUrl } = createWhatsAppOrder(formData);

      showToast(`Order #${order.orderNumber} initiated! Opening WhatsApp...`);

      // Open WhatsApp in new window/tab
      window.open(whatsappUrl, '_blank');

      // Navigate to order-success page
      navigateTo('order-success', order.id);
    } catch (err) {
      console.error(err);
      showToast('Encountered an issue placing your order. Please retry.', 'error');
      setIsSubmitting(false);
    }
  };

  const countries = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Kuwait',
    'Oman',
    'Bahrain',
    'United Kingdom',
    'United States',
    'Canada',
    'Australia',
    'Pakistan',
    'France',
    'Germany'
  ];

  return (
    <div className="w-full bg-[#FDFBF7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-8">
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-1 text-xs uppercase tracking-wider text-[#006B5B] hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </button>
          <div className="mt-2 flex items-center justify-between">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#111111]">
              Bespoke Atelier Checkout
            </h1>
            <span className="text-xs text-[#006B5B] font-semibold tracking-wider uppercase hidden sm:block">
              Direct WhatsApp Order
            </span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Customer & Shipping Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#006B5B]/15 rounded-sm p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100 mb-6">
                <User className="w-4 h-4 text-[#006B5B]" />
                <h2 className="font-serif text-xl font-bold text-neutral-900">
                  1. Recipient Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sheikha Al-Maktoum"
                    required
                    className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +971 50 123 4567"
                    required
                    className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Our atelier concierge contacts this number for dispatch verification.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. client@emeraldhaya.com"
                    required
                    className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-[#006B5B]/15 rounded-sm p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100 mb-6">
                <MapPin className="w-4 h-4 text-[#006B5B]" />
                <h2 className="font-serif text-xl font-bold text-neutral-900">
                  2. Courier Destination
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Villa / Apartment, Street, Community"
                    required
                    className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Dubai, Riyadh"
                      required
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      Postal / ZIP Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 00000"
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    Special Tailoring Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Specify custom height, gift packaging request, or apartment gate codes..."
                    className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#D4AF37]/40 rounded-sm p-6 sm:p-8 shadow-lg sticky top-28 space-y-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900 pb-3 border-b border-neutral-100">
                Atelier Order Summary
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex items-center gap-3 py-2 border-b border-neutral-100 last:border-b-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-14 object-cover rounded bg-neutral-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-neutral-900 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono">
                        {item.quantity} × {formatPrice(item.product.price)} (Size {item.selectedSize}")
                      </div>
                    </div>
                    <div className="text-xs font-bold font-mono text-neutral-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-neutral-900">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span className="font-mono">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Freight:</span>
                  <span className="font-mono text-neutral-900">
                    {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                  <span>Grand Total:</span>
                  <span className="font-mono text-xl text-[#006B5B]">{formatPrice(cartGrandTotal)}</span>
                </div>
              </div>

              {/* WhatsApp Workflow Notice */}
              <div className="p-3 bg-[#FDFBF7] border border-[#006B5B]/20 rounded text-xs text-neutral-600 space-y-1">
                <div className="flex items-center gap-1.5 text-[#006B5B] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>How WhatsApp Checkout Works:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Upon clicking <strong>Place Order via WhatsApp</strong>, your complete receipt is generated and formatted into WhatsApp. Send the message to connect directly with our Dubai concierge who will confirm measurements and prepare dispatch.
                </p>
              </div>

              {/* Main Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xl border border-[#D4AF37]"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>{isSubmitting ? 'Generating Order...' : 'Place Order via WhatsApp Concierge'}</span>
              </button>

              <div className="text-center text-[10px] text-neutral-400">
                Receiving WhatsApp: <span className="font-mono text-neutral-700">+{settings.whatsappNumber}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
