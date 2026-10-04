import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Phone, 
  LogOut, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { orders, wishlistIds, formatPrice, navigateTo, settings } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20 min-h-[75vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="bg-white border border-[#D4AF37]/40 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#006B5B] text-[#D4AF37] flex items-center justify-center font-serif text-2xl font-bold border border-[#D4AF37]">
              EH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                  Private Client Lounge
                </h1>
                <span className="text-[10px] bg-[#01453D] text-[#D4AF37] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  VIP Privileges
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Access your bespoke haute couture order history and sizing preferences.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>WhatsApp Stylist</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 mb-8 gap-6 text-xs uppercase tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'orders' ? 'border-[#006B5B] text-[#006B5B]' : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Atelier Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile' ? 'border-[#006B5B] text-[#006B5B]' : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Client Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'addresses' ? 'border-[#006B5B] text-[#006B5B]' : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Destinations</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white border border-neutral-200 rounded-sm p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-neutral-900">
                        Order #{ord.orderNumber}
                      </span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-500">
                      Placed on {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {ord.items.length} bespoke garments
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      {ord.items.slice(0, 3).map((it, idx) => (
                        <img
                          key={idx}
                          src={it.image}
                          alt=""
                          className="w-10 h-12 object-cover rounded bg-neutral-100"
                        />
                      ))}
                      {ord.items.length > 3 && (
                        <span className="text-xs text-neutral-400 font-mono">
                          +{ord.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end justify-between gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-neutral-100">
                    <div className="text-sm font-bold text-[#006B5B] font-mono">
                      {formatPrice(ord.total)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('order-success', ord.id)}
                        className="px-4 py-2 border border-neutral-300 hover:border-black text-xs font-semibold uppercase tracking-wider rounded"
                      >
                        View Receipt
                      </button>
                      <button
                        onClick={() => navigateTo('track-order', ord.orderNumber)}
                        className="px-4 py-2 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-semibold uppercase tracking-wider rounded shadow"
                      >
                        Track Dispatch
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center">
                <Package className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  No Order History Yet
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  When you complete an order via WhatsApp checkout, it will be automatically recorded here.
                </p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="mt-6 px-6 py-2.5 bg-[#006B5B] text-white text-xs font-semibold uppercase tracking-wider rounded shadow"
                >
                  Explore Boutique
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white border border-neutral-200 rounded-sm p-8 max-w-xl shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">
              Private Client Credentials
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-500 block mb-1">Client Status</label>
                <div className="p-2.5 bg-[#FDFBF7] rounded border border-neutral-200 font-semibold text-neutral-900">
                  Emerald Haya Private Connoisseur
                </div>
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">Standard Tailoring Length</label>
                <div className="p-2.5 bg-[#FDFBF7] rounded border border-neutral-200 font-mono text-neutral-900">
                  54 Inches (Standard Gulf Cut)
                </div>
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">Concierge VIP Perks</label>
                <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 font-medium">
                  Complimentary Silk Sheila with every order · Direct atelier WhatsApp access
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="bg-white border border-neutral-200 rounded-sm p-8 max-w-xl shadow-sm">
            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">
              Default Atelier Destination
            </h3>
            <div className="p-4 border border-[#006B5B]/30 rounded bg-[#FDFBF7] text-xs space-y-1">
              <span className="font-bold text-neutral-900 block">Primary Residence</span>
              <p className="text-neutral-600">Al Wasl Road, Jumeirah 2, Dubai, United Arab Emirates</p>
              <span className="text-emerald-700 font-medium block pt-1">Verified for Express 24h Courier</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
