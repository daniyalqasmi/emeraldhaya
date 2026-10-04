import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

export const TrackOrderPage: React.FC = () => {
  const { pageParam, getOrderById, formatPrice, navigateTo, settings } = useStore();

  const [searchQuery, setSearchQuery] = useState(pageParam || '');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (pageParam) {
      const found = getOrderById(pageParam);
      if (found) {
        setSearchedOrder(found);
        setHasSearched(true);
      }
    }
  }, [pageParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = getOrderById(searchQuery);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    { status: 'pending', label: 'Order Registered', desc: 'WhatsApp order received and awaiting concierge review' },
    { status: 'confirmed', label: 'Measurements Verified', desc: 'Atelier confirmed sizing, fabric yardage and hemming requirements' },
    { status: 'processing', label: 'Hand-Tailoring Atelier', desc: 'Master artisans cutting Korean Nida & hand-finishing sleeve borders' },
    { status: 'shipped', label: 'In Freight Transit', desc: 'Dispatched with international express courier with tracking ID' },
    { status: 'delivered', label: 'Delivered', desc: 'Package hand-delivered in luxury Emerald Haya scented garment packaging' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    const map: Record<OrderStatus, number> = {
      pending: 0,
      confirmed: 1,
      processing: 2,
      shipped: 3,
      delivered: 4,
      cancelled: -1
    };
    return map[status] ?? 0;
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.status) : 2;

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.25em] block mb-1">
            Dispatch Tracking
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
            Track Your Haute Couture Order
          </h1>
          <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
            Enter your Order Reference Number (e.g. <strong>#EH-84920</strong>) or the WhatsApp phone number used during checkout.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 max-w-lg mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order # or WhatsApp phone number..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#006B5B]/30 rounded focus:outline-none focus:border-[#006B5B] shadow-sm font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Search Results Display */}
        {hasSearched && !searchedOrder && (
          <div className="p-8 bg-white border border-neutral-200 rounded-sm text-center shadow-sm">
            <p className="text-sm font-bold text-neutral-800">
              No matching order record found for "{searchQuery}"
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Kindly verify the reference code or message our Dubai concierge on WhatsApp for manual tracking.
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs text-[#006B5B] font-bold uppercase tracking-wider underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Concierge Directly</span>
            </a>
          </div>
        )}

        {searchedOrder && (
          <div className="bg-white border border-[#D4AF37]/40 rounded-sm p-6 sm:p-10 shadow-lg space-y-8">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-100 gap-4">
              <div>
                <span className="text-[10px] text-[#006B5B] uppercase tracking-widest font-semibold block">
                  Bespoke Order Confirmed
                </span>
                <h2 className="font-serif text-2xl font-bold text-neutral-900 mt-0.5">
                  Order #{searchedOrder.orderNumber}
                </h2>
                <div className="text-xs text-neutral-500 font-mono mt-1">
                  Recipient: <strong>{searchedOrder.customerName}</strong> ({searchedOrder.city}, {searchedOrder.country})
                </div>
              </div>

              <div className="flex sm:flex-col items-end justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  {new Date(searchedOrder.createdAt).toLocaleDateString()}
                </span>
                <span className="mt-1 px-3 py-1 bg-[#01453D] text-[#D4AF37] rounded text-xs font-bold uppercase tracking-wider font-mono">
                  Status: {searchedOrder.status}
                </span>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-6">
                Atelier Progress Timeline
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={step.status} className="relative flex items-start gap-4">
                      {/* Step Circle Indicator */}
                      <div
                        className={`absolute -left-6 sm:-left-8 w-5 sm:w-7 h-5 sm:h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                          isCompleted
                            ? 'bg-[#006B5B] text-white ring-4 ring-emerald-50'
                            : 'bg-neutral-200 text-neutral-400'
                        } ${isCurrent ? 'ring-[#D4AF37] ring-2 animate-pulse' : ''}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#D4AF37]" />
                        ) : (
                          <span className="font-mono text-[10px]">{idx + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="pt-0.5">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-serif text-base font-bold ${
                              isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                            }`}
                          >
                            {step.label}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ordered Items Summary */}
            <div className="pt-6 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-4">
                Garments in this Consignment
              </h3>
              <div className="space-y-3">
                {searchedOrder.items.map((it: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-neutral-50 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt="" className="w-10 h-12 object-cover rounded bg-neutral-100" />
                      <div>
                        <div className="font-bold text-neutral-900">{it.productName}</div>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          Size {it.selectedSize}" | {it.selectedColor} | Qty: {it.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-neutral-900">
                      {formatPrice(it.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct WhatsApp Follow-up */}
            <div className="p-4 bg-[#F8F6F0] rounded flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-700">
                <span className="font-bold block">Need alteration updates or courier redirection?</span>
                <span className="text-neutral-500">Our concierge team is standing by 24/7 on WhatsApp.</span>
              </div>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Salaam! Following up on Order Ref: #${searchedOrder.orderNumber}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shrink-0 shadow"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Message Concierge</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
