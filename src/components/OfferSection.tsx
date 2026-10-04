import React from 'react';
import { Sparkles, Globe, ShieldCheck, Scissors, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OfferSection: React.FC = () => {
  const { settings } = useStore();

  const offers = [
    {
      icon: Sparkles,
      title: '20% OFF First Order',
      description: 'Use atelier code EMERALD20 at bag checkout or on WhatsApp.',
      highlight: 'Exclusive Welcome'
    },
    {
      icon: Globe,
      title: 'Worldwide Express Freight',
      description: `Complimentary door-to-door courier on orders above $${settings.freeShippingThreshold}.`,
      highlight: 'Direct from Dubai'
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Concierge',
      description: 'Instant sizing verification, real fabric videos & bespoke styling.',
      highlight: 'Dedicated Stylist'
    },
    {
      icon: ShieldCheck,
      title: 'Authentic Gulf Textiles',
      description: '100% genuine Grade-A Korean Nida, Japanese Crepe & Medina Silk.',
      highlight: 'Certified Quality'
    },
    {
      icon: Scissors,
      title: 'Bespoke Atelier Tailoring',
      description: 'Custom sleeve adjustments and hem lengths made to your measurements.',
      highlight: 'Perfect Fit'
    }
  ];

  return (
    <section className="bg-[#01453D] text-[#FDFBF7] py-10 px-4 sm:px-6 lg:px-8 border-y border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-sm bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-[#006B5B] text-[#D4AF37] mb-3 shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-1">
                  {offer.highlight}
                </span>
                <h4 className="font-serif text-base font-semibold text-white mb-1.5">
                  {offer.title}
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {offer.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
