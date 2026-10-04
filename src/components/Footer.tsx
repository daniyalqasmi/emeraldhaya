import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Sparkles, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';
import { StorageService } from '../services/storageService';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategoryFilter, settings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address', 'error');
      return;
    }
    StorageService.subscribeNewsletter(newsletterEmail);
    setSubscribed(true);
    showToast('Welcome to Emerald Haya Private Client Privileges');
    setNewsletterEmail('');
  };

  const categoryLinks = [
    { label: 'Abaya & Stole Combo Deals', cat: 'Abaya & Stole Combo Deals' },
    { label: 'Medina Silk Stoles & Sheilas', cat: 'Stoles & Sheilas' },
    { label: 'Magnetic Hijab Pins & Brooches', cat: 'Magnetic Pins & Brooches' },
    { label: 'Dubai Collection', cat: 'Dubai Collection' },
    { label: 'Saudi Collection', cat: 'Saudi Collection' },
    { label: 'Open Front Abayas', cat: 'Open Abayas' },
    { label: 'Kimono Cuts', cat: 'Kimono Abayas' },
    { label: 'Farasha Silks', cat: 'Farasha Abayas' },
    { label: 'Pure Korean Nida', cat: 'Nida Abayas' },
    { label: 'Haute Luxury Evening', cat: 'Luxury Collection' }
  ];

  const customerCareLinks = [
    { label: 'Coming Soon (Eid 2026 Preview)', page: 'coming-soon' },
    { label: 'Track Your Order', page: 'track-order' },
    { label: 'Boutique Shopping Bag', page: 'cart' },
    { label: 'Wishlist & Favorites', page: 'wishlist' },
    { label: 'Frequent Inquiries (FAQ)', page: 'faqs' },
    { label: 'Bespoke Atelier Stories', page: 'blog' },
    { label: 'Contact & Atelier Visit', page: 'contact' }
  ];

  const policyLinks = [
    { label: 'Shipping & Delivery', page: 'shipping' },
    { label: 'Refund & Alteration Policy', page: 'refund' },
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' }
  ];

  return (
    <footer className="bg-[#111111] text-[#FDFBF7] pt-16 pb-12 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement Banner */}
        <div className="pb-14 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.25em] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Private Client Register
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
              Receive Invitations to Limited Haute Couture Editions & Private Sales
            </h3>
            <p className="text-xs text-neutral-400 mt-2">
              Subscribers receive complimentary shipping and early access to Ramadan & Eid runway releases.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-sm text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#006B5B] w-full sm:w-80"
              disabled={subscribed}
            />
            <button
              type="submit"
              disabled={subscribed}
              className="px-6 py-3 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 border border-[#D4AF37]/40 shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Join Privileges</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* 4 Columns Navigation Section */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <BrandLogo variant="light" size="lg" />
            <p className="text-xs text-neutral-400 leading-relaxed mt-4 max-w-sm">
              Emerald Haya embodies the summit of Arabian modest haute couture. Each garment is meticulously cut and hand-finished in our Dubai ateliers using authentic Korean Nida, Japanese crepe, and 24K gold bullion embroidery.
            </p>

            <div className="mt-6 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#006B5B] shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#006B5B] shrink-0" />
                <span>{settings.storePhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#006B5B] shrink-0" />
                <span>{settings.storeEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-4">
              Haute Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter(item.cat);
                      navigateTo('shop');
                    }}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {customerCareLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors text-emerald-400 font-medium"
                >
                  Direct WhatsApp Assistance →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Policies */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37] mb-4">
              Boutique Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-neutral-900/80 rounded border border-[#006B5B]/30">
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block font-semibold">
                Guaranteed Authenticity
              </span>
              <span className="text-[11px] text-neutral-400 block mt-1">
                Every abaya includes an Atelier Certificate of Authenticity & Care Guide.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Payment Methods */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Emerald Haya Haute Couture Ltd. All Rights Reserved.</span>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={() => navigateTo('admin')}
              className="text-neutral-400 hover:text-[#D4AF37] transition-colors underline"
              title="Access Atelier Management Console"
            >
              Atelier Console (/admin)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-400">
            <span>Direct WhatsApp Atelier Ordering</span>
            <span>·</span>
            <span>Cash on Delivery (GCC & Global)</span>
            <span>·</span>
            <span>Bespoke Hand Finishing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
