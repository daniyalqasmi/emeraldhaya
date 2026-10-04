import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Phone, 
  Printer, 
  Truck, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from '../components/BrandLogo';

export const OrderSuccessPage: React.FC = () => {
  const { pageParam, orders, formatPrice, navigateTo, settings } = useStore();

  const currentOrder = orders.find((o) => o.id === pageParam) || orders[0];

  useEffect(() => {
    // Launch celebratory luxury gold and emerald confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006B5B', '#D4AF37', '#01453D', '#FFFFFF']
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  if (!currentOrder) {
    return (
      <div className="w-full bg-[#FDFBF7] py-20 text-center">
        <h2 className="font-serif text-2xl font-bold">No Recent Order Found</h2>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-6 py-2.5 bg-[#006B5B] text-white text-xs uppercase font-semibold rounded"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleReopenWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Salaam Emerald Haya! Following up on Order Ref: #${currentOrder.orderNumber} for ${currentOrder.customerName}. Please confirm dispatch timeline.`
    );
    window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
  };

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Banner Card */}
        <div className="bg-white border border-[#D4AF37]/50 rounded-sm p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden print:border-none print:shadow-none">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#006B5B] flex items-center justify-center mx-auto mb-4 border border-[#006B5B]/30">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.25em] block">
            Haute Couture Order Received
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mt-2">
            Shukran, {currentOrder.customerName}
          </h1>

          <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
            Your bespoke order has been recorded in our atelier systems. Our concierge has received your WhatsApp inquiry and will verify custom hemming and delivery tracking.
          </p>

          {/* Reference Pill */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-[#01453D] text-[#D4AF37] rounded font-mono text-sm font-bold border border-[#D4AF37]/40">
            <span>Order Reference: #{currentOrder.orderNumber}</span>
          </div>

          {/* Order Details Receipt Box */}
          <div className="mt-10 text-left border border-neutral-200 rounded p-6 bg-[#FDFBF7] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 text-xs">
              <div>
                <span className="text-neutral-500 block">Date of Request:</span>
                <span className="font-bold text-neutral-900 font-mono">
                  {new Date(currentOrder.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="text-neutral-500 block">Current Atelier Status:</span>
                <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[11px] font-bold uppercase tracking-wider">
                  {currentOrder.status}
                </span>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="text-xs text-neutral-700 space-y-1 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2 font-bold text-neutral-900">
                <MapPin className="w-3.5 h-3.5 text-[#006B5B]" />
                <span>Delivery Address:</span>
              </div>
              <p className="text-neutral-600 pl-5">
                {currentOrder.address}, {currentOrder.city} {currentOrder.postalCode}, {currentOrder.country}
              </p>
              <p className="text-neutral-600 pl-5">
                WhatsApp Phone: <span className="font-mono">{currentOrder.phone}</span> · Email: {currentOrder.email}
              </p>
              {currentOrder.orderNotes && (
                <p className="text-neutral-600 pl-5 italic text-[11px]">
                  Notes: "{currentOrder.orderNotes}"
                </p>
              )}
            </div>

            {/* Ordered Items List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                Bespoke Garments ({currentOrder.items.length})
              </span>
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-10 h-12 object-cover rounded bg-neutral-100" />
                    <div>
                      <div className="font-semibold text-neutral-900">{item.productName}</div>
                      <div className="text-neutral-500 font-mono text-[11px]">
                        Size: {item.selectedSize}" | Color: {item.selectedColor} | Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-4 border-t border-neutral-200 text-xs space-y-1.5 text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-neutral-900">{formatPrice(currentOrder.subtotal)}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promotional Discount:</span>
                  <span className="font-mono">-{formatPrice(currentOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Freight:</span>
                <span className="font-mono text-neutral-900">
                  {currentOrder.shipping === 0 ? 'Complimentary' : formatPrice(currentOrder.shipping)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                <span>Total Payable:</span>
                <span className="font-mono text-lg text-[#006B5B]">{formatPrice(currentOrder.total)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs (Print, Reopen WhatsApp, Track, Continue) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <button
              onClick={handleReopenWhatsApp}
              className="px-6 py-3 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Message Concierge on WhatsApp</span>
            </button>

            <button
              onClick={handlePrintInvoice}
              className="px-5 py-3 bg-white border border-neutral-300 hover:border-black text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>

            <button
              onClick={() => navigateTo('track-order', currentOrder.orderNumber)}
              className="px-5 py-3 bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              <span>Track Live Dispatch</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-100 text-center print:hidden">
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs text-[#006B5B] hover:underline font-semibold"
            >
              ← Return to Boutique Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
