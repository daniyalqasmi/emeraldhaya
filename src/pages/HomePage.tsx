import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Flame, Scissors, Star, ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { OfferSection } from '../components/OfferSection';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { CustomerReviews } from '../components/CustomerReviews';
import { InstagramFeed } from '../components/InstagramFeed';
import { useStore } from '../context/StoreContext';
import { ATELIER_IMAGE } from '../services/seedData';

export const HomePage: React.FC = () => {
  const { products, navigateTo, setSelectedCategoryFilter, settings } = useStore();

  const [activeHomeTab, setActiveHomeTab] = useState<string>('All');

  const homeTabs = [
    { label: 'All Designs (150+)', category: 'All' },
    { label: 'Combo Deals (Save 20%)', category: 'Abaya & Stole Combo Deals' },
    { label: 'Stoles & Sheilas', category: 'Stoles & Sheilas' },
    { label: 'Magnetic Pins', category: 'Magnetic Pins & Brooches' },
    { label: 'Dubai Collection', category: 'Dubai Collection' },
    { label: 'Saudi Heritage', category: 'Saudi Collection' },
    { label: 'Open Front', category: 'Open Abayas' },
    { label: 'Kimono Cuts', category: 'Kimono Abayas' },
    { label: 'Farasha Silks', category: 'Farasha Abayas' },
    { label: 'Korean Nida', category: 'Nida Abayas' },
    { label: 'Haute Luxury', category: 'Luxury Collection' }
  ];

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured);
  const displayedFeatured = (activeHomeTab === 'All'
    ? featuredProducts
    : products.filter((p) => p.category === activeHomeTab)
  ).slice(0, 6);

  const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 4);
  const comboProducts = products.filter((p) => p.isComboDeal || p.category === 'Stoles & Sheilas' || p.category === 'Magnetic Pins & Brooches').slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Hero Luxury Slider */}
      <HeroSlider />

      {/* 2. Offer Section Guarantee Cards */}
      <OfferSection />

      {/* 3. Category Grid Showcase */}
      <CategoryGrid />

      {/* 4. Featured Haute Couture Collection */}
      <section className="py-16 sm:py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-[#006B5B] text-xs font-semibold tracking-wider uppercase">
                Handpicked Masterpieces
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] mt-1.5 break-words">
                Featured Haute Couture
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                navigateTo('shop');
              }}
              className="text-xs uppercase tracking-wider text-[#006B5B] hover:text-[#01453D] font-semibold flex items-center gap-1 group self-start md:self-auto"
            >
              <span>Explore Entire Boutique (150+)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Curated Collection Filter Tabs with Left & Right Arrows */}
          <div className="mb-8 flex items-center gap-2 bg-[#FAF7F0] p-2 rounded-xl border border-neutral-200 shadow-sm">
            <button
              onClick={() => {
                const el = document.getElementById('home-featured-tabs');
                el?.scrollBy({ left: -220, behavior: 'smooth' });
              }}
              className="p-1.5 sm:p-2 rounded-full bg-white border border-[#D4AF37] text-neutral-800 hover:bg-[#006B5B] hover:text-white transition-all shadow-sm shrink-0 flex items-center justify-center cursor-pointer"
              aria-label="Previous tabs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              id="home-featured-tabs"
              className="flex items-center gap-2 overflow-x-auto scroll-smooth scrollbar-none py-1 flex-1"
            >
              {homeTabs.map((tab) => {
                const isSelected = activeHomeTab === tab.category;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveHomeTab(tab.category)}
                    className={`text-xs uppercase tracking-wider font-semibold whitespace-nowrap px-4 py-2 rounded-full border transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#006B5B] text-white border-[#D4AF37] shadow-sm font-bold ring-1 ring-[#D4AF37]'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#006B5B] hover:text-[#006B5B]'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('home-featured-tabs');
                el?.scrollBy({ left: 220, behavior: 'smooth' });
              }}
              className="p-1.5 sm:p-2 rounded-full bg-white border border-[#D4AF37] text-neutral-800 hover:bg-[#006B5B] hover:text-white transition-all shadow-sm shrink-0 flex items-center justify-center cursor-pointer"
              aria-label="Next tabs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Flash Sale with Live Countdown */}
      <section className="py-14 sm:py-20 bg-[#01453D] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Flame className="w-4 h-4" />
                <span>Limited Atelier Window</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white break-words">
                Exclusive Flash Sale Edition
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-lg leading-relaxed">
                Complimentary matching Silk Sheila hijab and 20% off selected Dubai and Saudi signature pieces.
              </p>
            </div>

            {/* Countdown Boxes */}
            <div className="flex items-center gap-2 sm:gap-3 font-mono">
              <div className="flex flex-col items-center bg-black/40 border border-[#D4AF37]/40 px-3 sm:px-4 py-2 sm:py-3 rounded min-w-[60px] sm:min-w-[70px]">
                <span className="text-xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase text-neutral-300 font-sans tracking-wider mt-0.5">Hours</span>
              </div>
              <span className="text-xl sm:text-2xl text-[#D4AF37] font-bold">:</span>
              <div className="flex flex-col items-center bg-black/40 border border-[#D4AF37]/40 px-3 sm:px-4 py-2 sm:py-3 rounded min-w-[60px] sm:min-w-[70px]">
                <span className="text-xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase text-neutral-300 font-sans tracking-wider mt-0.5">Mins</span>
              </div>
              <span className="text-xl sm:text-2xl text-[#D4AF37] font-bold">:</span>
              <div className="flex flex-col items-center bg-black/40 border border-[#D4AF37]/40 px-3 sm:px-4 py-2 sm:py-3 rounded min-w-[60px] sm:min-w-[70px]">
                <span className="text-xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase text-neutral-300 font-sans tracking-wider mt-0.5">Secs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 Stoles, Magnetic Pins & Abaya Combo Deals Showcase */}
      <section className="py-14 sm:py-20 bg-[#FAF7F0] border-y border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#006B5B] text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Curated Accessories & Complete Sets</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] break-words">
                Abaya & Stole Deals, Pins & Accessories
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl leading-relaxed">
                Elevate your modest ensemble with authentic Medina silk stoles, no-snag magnetic hijab pins, and pre-styled 3-piece combo bundles with up to 20% savings.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategoryFilter('Abaya & Stole Combo Deals');
                navigateTo('shop');
              }}
              className="px-5 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs uppercase tracking-wider font-semibold rounded shadow flex items-center gap-1.5 self-start md:self-auto shrink-0"
            >
              <span>Explore All Combo Deals</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comboProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Atelier Craftsmanship Heritage Banner */}
      <section className="py-20 sm:py-28 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Atelier Photo */}
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-[#D4AF37]/40">
              <img
                src={ATELIER_IMAGE}
                alt="Artisan hands embroidering gold bullion thread on Korean Nida"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                  Atelier Dubai Heritage
                </span>
                <p className="font-serif text-lg mt-1">
                  Over 40 hours of hand needlework in every bespoke bridal & luxury piece.
                </p>
              </div>
            </div>

            {/* Textual Narrative */}
            <div className="flex flex-col justify-center">
              <span className="text-[#006B5B] text-xs font-semibold tracking-wider uppercase">
                Artisanal Integrity
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] mt-1.5 leading-snug break-words">
                Where Modesty Meets Master Tailoring
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Founded in Dubai, <strong>Emerald Haya</strong> was conceived with a solitary ambition: to elevate traditional Islamic abaya wear to the standards of Parisian and Milanese haute couture.
              </p>
              <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We shun mass factory shortcuts. We source exclusively authentic Grade-A Korean Nida, Japanese matte crepe, and Italian organza. Our pattern masters cut each piece with an intentional A-line sweep that drapes with majestic fluidity.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 border-t border-neutral-200 pt-6">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#006B5B]">100%</span>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mt-1">Pure Korean Nida</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">High filament, wrinkle-proof & breathable</p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#006B5B]">48h</span>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mt-1">Direct WhatsApp Delivery</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Fast GCC & worldwide concierge courier</p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => navigateTo('about')}
                  className="px-6 sm:px-8 py-3 bg-[#111111] hover:bg-[#006B5B] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors self-start"
                >
                  Discover The Atelier Story →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5 Coming Soon Collection Exclusive VIP Preview Section */}
      <section className="py-12 sm:py-16 bg-[#01453D] text-[#FDFBF7] relative overflow-hidden border-y border-[#D4AF37]/40">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-[#01453D]/90 to-black/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 sm:mb-3 animate-pulseGold">
              <Crown className="w-3.5 h-3.5" />
              <span>Coming Soon · Ramadan & Eid 2026 Collection Reveal</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-snug break-words">
              The Imperial Sovereign Robes & Hand-Cut Farashas
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
              An exclusive preview of 25 limited-edition masterpieces crafted from Grade-AAA raw silk, 24K Zardozi needlework, and Austrian crystal brooches. VIP private clients receive 48-hour early priority access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={() => navigateTo('coming-soon')}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b8952b] text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <span>Explore VIP Coming Soon Preview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals & Trending Edits */}
      <section className="py-14 sm:py-20 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="text-[#006B5B] text-xs font-semibold tracking-wider uppercase">
                Runway & Atelier Releases
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] mt-1.5 break-words">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                navigateTo('shop');
              }}
              className="text-xs uppercase tracking-wider text-[#006B5B] hover:text-[#01453D] font-semibold self-start md:self-auto"
            >
              Shop All New Pieces →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Best Sellers */}
      <section className="py-14 sm:py-20 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <span className="text-[#006B5B] text-xs font-semibold tracking-wider uppercase">
                Treasured Classics
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111111] mt-1.5 break-words">
                Atelier Best Sellers
              </h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                navigateTo('shop');
              }}
              className="text-xs uppercase tracking-wider text-[#006B5B] hover:text-[#01453D] font-semibold self-start md:self-auto"
            >
              View Best Sellers →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials */}
      <CustomerReviews />

      {/* 10. Google Form Custom Consultation Section (Admin Editable URL) */}
      <section className="py-14 sm:py-16 bg-white border-b border-black/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[#006B5B] text-xs font-semibold tracking-wider uppercase">
            Bespoke Atelier Request
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111] mt-1.5 break-words">
            Custom Sizing & Bridal Consultation Form
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-xl mx-auto leading-relaxed">
            Need a custom length, special bridal embellishment, or private VIP fitting? Fill out our bespoke consultation form below or reach our master tailors on WhatsApp.
          </p>

          <div className="mt-8 border border-[#D4AF37]/30 rounded-sm p-4 bg-[#FDFBF7] shadow-inner overflow-hidden">
            {settings.googleFormUrl ? (
              <div className="w-full flex flex-col items-center">
                <iframe
                  src={settings.googleFormUrl}
                  width="100%"
                  height="450"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Emerald Haya Custom Consultation"
                  className="rounded bg-white shadow-sm"
                >
                  Loading consultation form...
                </iframe>
                <span className="text-[10px] text-neutral-400 mt-2">
                  Powered by Emerald Haya Dubai Client Services (Admin configurable via /admin)
                </span>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-neutral-500">
                Google Form URL not set. Configurable in Admin Settings.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 11. Instagram Feed */}
      <InstagramFeed />
    </div>
  );
};
