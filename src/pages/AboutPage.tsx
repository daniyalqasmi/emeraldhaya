import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Scissors, Globe } from 'lucide-react';
import { HERO_IMAGE, ATELIER_IMAGE, DUBAI_IMAGE } from '../services/seedData';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 bg-[#01453D] text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.25em] block mb-2">
            Haute Couture Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
            The Emerald Haya Story
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Born in Downtown Dubai, Emerald Haya was established to bridge timeless Arabian modesty with the peerless precision of European haute couture.
          </p>
        </div>
      </section>

      {/* Main Narrative with Atelier Photo */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.2em] block mb-2">
              Our Founding Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] leading-tight">
              An Ode to Dignity, Grace & Exceptional Needlecraft
            </h2>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              In an era dominated by fast fashion and synthetic polyester blends, Emerald Haya stands as a sanctuary for traditional textile reverence. We believe that wearing an abaya is an expression of royal dignity, quiet confidence, and cultural pride.
            </p>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              Every single piece in our collection is hand-drafted by seasoned pattern masters. Our atelier cutters understand the subtle physics of Korean Nida silk—how it cascades along the shoulder line, how it moves with every step, and how it shields with effortless grace.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
              <div>
                <span className="font-serif text-3xl font-bold text-[#006B5B]">14+</span>
                <div className="text-xs font-semibold uppercase text-neutral-900 mt-1">Bespoke Collections</div>
                <p className="text-[11px] text-neutral-500">From Dubai gold brocades to Tokyo kimonos</p>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#006B5B]">48 Hours</span>
                <div className="text-xs font-semibold uppercase text-neutral-900 mt-1">Atelier Dispatch</div>
                <p className="text-[11px] text-neutral-500">Fast express delivery across GCC & globally</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-[#D4AF37]/40">
            <img
              src={ATELIER_IMAGE}
              alt="Emerald Haya Atelier Embroidery"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.2em]">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] mt-1">
              The Four Pillars of Emerald Haya
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-[#FDFBF7] rounded border border-neutral-200">
              <Award className="w-8 h-8 text-[#006B5B] mb-3" />
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">100% Genuine Nida</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Directly imported Grade-A micro-filament Korean Nida with breathable, cooling weave and wrinkle-resistant longevity.
              </p>
            </div>

            <div className="p-6 bg-[#FDFBF7] rounded border border-neutral-200">
              <Scissors className="w-8 h-8 text-[#006B5B] mb-3" />
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Artisanal Tailoring</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Hand-cut hems and bespoke sleeve adjustments ensuring the garment never drags or clings uncomfortably.
              </p>
            </div>

            <div className="p-6 bg-[#FDFBF7] rounded border border-neutral-200">
              <Sparkles className="w-8 h-8 text-[#006B5B] mb-3" />
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Zardozi & Crystals</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                24K gold bullion metallic filigree, hand-sewn Swarovski crystal facets, and subtle French lace inlays.
              </p>
            </div>

            <div className="p-6 bg-[#FDFBF7] rounded border border-neutral-200">
              <Globe className="w-8 h-8 text-[#006B5B] mb-3" />
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-2">Concierge Care</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Personalized sizing consultations, bespoke length adjustments, and direct WhatsApp client support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-light text-neutral-900">
          Experience Bespoke Modest Luxury
        </h2>
        <p className="text-xs text-neutral-600 mt-2">
          Discover our 150+ designs across Dubai, Saudi, and Haute Couture collections.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 px-8 py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-lg"
        >
          Explore Catalog Now
        </button>
      </section>
    </div>
  );
};
