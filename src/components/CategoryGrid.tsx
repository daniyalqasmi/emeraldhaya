import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategoryFilter, navigateTo } = useStore();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    navigateTo('shop');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#006B5B] text-xs font-semibold tracking-[0.25em] uppercase">
              Curated Haute Couture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] mt-2">
              Explore Abaya Collections
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategoryFilter('All');
              navigateTo('shop');
            }}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.16em] text-[#006B5B] hover:text-[#01453D] font-semibold flex items-center gap-1 group"
          >
            <span>View All 14 Categories</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative aspect-[4/5] rounded-sm overflow-hidden bg-neutral-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Category Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Category Details at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {cat.productCount} Tailored Designs
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-1 group-hover:text-[#D4AF37] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-neutral-300 mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
              </div>

              {/* Top-Right Arrow badge */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
