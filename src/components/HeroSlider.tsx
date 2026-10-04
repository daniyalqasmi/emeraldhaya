import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSlider: React.FC = () => {
  const { heroSlides, navigateTo, setSelectedCategoryFilter } = useStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeSlides = heroSlides.filter((s) => s.isActive);

  // Autoplay
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentSlideIndex];

  const handleCtaClick = () => {
    if (currentSlide.categoryFilter) {
      setSelectedCategoryFilter(currentSlide.categoryFilter);
    }
    navigateTo('shop');
  };

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] bg-[#111111] overflow-hidden select-none">
      {/* Background Slides */}
      {activeSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Dark Vignette Scrim for WCAG AA readability */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            referrerPolicy="no-referrer"
          />
          {/* Luxury Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        </div>
      ))}

      {/* Content Container (Center-Aligned Haute Couture Lockup) */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-12 sm:pb-20">
        <div className="max-w-2xl sm:max-w-3xl">
          {/* Subtitle / Kicker */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-6 sm:w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[#D4AF37] font-semibold text-xs sm:text-sm tracking-wider uppercase">
              {currentSlide.subtitle}
            </span>
          </div>

          {/* Main Display Headline with clean responsive sizing without word stretching */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight break-words">
            {currentSlide.title}
          </h1>

          {/* Tagline */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-200 font-light max-w-xl leading-relaxed">
            {currentSlide.tagline}
          </p>

          {/* Dual Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={handleCtaClick}
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm transition-all shadow-xl flex items-center gap-2 border border-[#D4AF37]/50 active:scale-95"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>

            <button
              onClick={() => {
                setSelectedCategoryFilter('All');
                navigateTo('shop');
              }}
              className="px-5 sm:px-8 py-2.5 sm:py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm transition-colors border border-white/25 active:scale-95"
            >
              View All 150+ Designs
            </button>
          </div>
        </div>
      </div>

      {/* Slider Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1))
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm transition-colors border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm transition-colors border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-6 right-8 z-30 flex items-center gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlideIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
