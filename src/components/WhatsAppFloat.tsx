import React, { useState } from 'react';
import { Phone, MessageCircle, X, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloat: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const quickQuestions = [
    { title: 'Check Abaya Sizing & Fit', msg: 'Salaam Emerald Haya! Could you please help me pick the right abaya size for my height and frame?' },
    { title: 'Bespoke / Custom Hemming', msg: 'Salaam! I would like to inquire about bespoke alterations and custom sleeve lengths for my order.' },
    { title: 'Track Existing Order', msg: 'Salaam! I placed an order with Emerald Haya and would like to track the dispatch timeline.' }
  ];

  const handleSendWhatsApp = (customMsg?: string) => {
    const defaultMsg = 'Salaam Emerald Haya! I am shopping on your website and would like assistance from your fashion concierge.';
    const text = encodeURIComponent(customMsg || defaultMsg);
    window.open(`https://wa.me/${cleanNum}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-[#D4AF37]/40 shadow-2xl rounded-sm p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#006B5B] text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                EH
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Emerald Haya Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online · Dubai Atelier</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-black p-1"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
            Welcome to Emerald Haya. Speak directly with our master stylists for sizing guidance, fabric close-ups, or instant WhatsApp orders.
          </p>

          <div className="mt-3 space-y-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendWhatsApp(q.msg)}
                className="w-full text-left text-xs p-2 rounded bg-[#F8F6F0] hover:bg-emerald-50 text-neutral-800 flex items-center justify-between transition-colors border border-black/5"
              >
                <span>{q.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#006B5B]" />
              </button>
            ))}
          </div>

          <div className="mt-3 pt-2">
            <button
              onClick={() => handleSendWhatsApp()}
              className="w-full py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              Open WhatsApp Chat
            </button>
          </div>
        </div>
      )}

      {/* Trigger floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-4 py-3 bg-[#006B5B] hover:bg-[#01453D] text-white rounded-full shadow-2xl border-2 border-[#D4AF37] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contact concierge on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]" />
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide uppercase">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
};
