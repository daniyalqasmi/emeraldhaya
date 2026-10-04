import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Sparkles, 
  Check, 
  RotateCcw,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    categories, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    formatPrice 
  } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popularity'>('newest');

  // Filter Bar Drawer state for mobile/advanced
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Filter option presets
  const allSizes = ['All', '50', '52', '54', '56', '58', '60', 'One Size (Maxi)'];
  const allColors = ['All', 'Noir Black', 'Emerald Green', 'Deep Olive', 'Midnight Navy', 'Champagne Gold', 'Dusty Rose', 'Charcoal Slate', 'Matte Gold'];
  const allMaterials = ['All', 'Pure Korean Nida', 'Japanese Silk Crepe', 'Pure Medina Silk', 'Turkish Chiffon', 'Italian Silk Organza', 'Grade-A Saudi Crepe', 'Matte Silk Wool Blend', 'Pre-Washed Pure Linen', 'Neodymium Ultra-Hold Magnets'];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) {
          return false;
        }
        // Search
        if (
          searchFilter.trim() &&
          !p.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchFilter.toLowerCase()) &&
          !p.material.toLowerCase().includes(searchFilter.toLowerCase()) &&
          !p.sku.toLowerCase().includes(searchFilter.toLowerCase())
        ) {
          return false;
        }
        // Price
        if (p.price > maxPrice) return false;
        // Size
        if (selectedSize !== 'All' && !p.size.includes(selectedSize)) return false;
        // Color
        if (selectedColor !== 'All' && !p.availableColors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase()))) {
          return false;
        }
        // Material
        if (selectedMaterial !== 'All' && !p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
        // Rating
        if (minRating > 0 && p.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'popularity') return b.reviewsCount - a.reviewsCount;
        return b.id.localeCompare(a.id);
      });
  }, [products, selectedCategoryFilter, searchFilter, maxPrice, selectedSize, selectedColor, selectedMaterial, minRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategoryFilter('All');
    setSearchFilter('');
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedMaterial('All');
    setMaxPrice(600);
    setMinRating(0);
    setSortBy('newest');
  };

  const hasActiveFilters = 
    selectedCategoryFilter !== 'All' || 
    searchFilter.trim() !== '' || 
    selectedSize !== 'All' || 
    selectedColor !== 'All' || 
    selectedMaterial !== 'All' || 
    maxPrice < 600 || 
    minRating > 0;

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs & Title */}
        <div className="mb-6">
          <div className="text-[11px] text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-2">
            <span>Emerald Haya</span>
            <span>/</span>
            <span>Boutique Catalog</span>
            {selectedCategoryFilter !== 'All' && (
              <>
                <span>/</span>
                <span className="text-[#006B5B] font-semibold">{selectedCategoryFilter}</span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111]">
                {selectedCategoryFilter === 'All' ? 'Haute Couture Collections' : selectedCategoryFilter}
              </h1>
              <p className="text-xs text-neutral-600 mt-1 font-mono">
                Presenting {filteredProducts.length} bespoke modest garments
              </p>
            </div>

            {/* Quick Reset Button if active */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="self-start sm:self-auto text-xs text-[#006B5B] hover:text-[#01453D] font-bold uppercase tracking-wider flex items-center gap-1.5 underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 1. TOP HORIZONTAL CATEGORY SELECTOR BAR WITH SCROLL ARROWS */}
        <div className="bg-[#FAF7F0] border border-[#006B5B]/20 rounded-xl p-2 sm:p-2.5 mb-6 shadow-sm flex items-center relative gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              const el = document.getElementById('shop-categories-scroll');
              el?.scrollBy({ left: -260, behavior: 'smooth' });
            }}
            className="p-1.5 sm:p-2 rounded-full bg-white border border-[#D4AF37] text-neutral-800 hover:border-[#006B5B] hover:bg-[#006B5B] hover:text-white transition-all shrink-0 z-10 shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Scroll left"
            title="Previous categories"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          <div
            id="shop-categories-scroll"
            className="flex items-center gap-2 overflow-x-auto pb-1 scroll-smooth scrollbar-none flex-1 py-1"
          >
            <button
              onClick={() => setSelectedCategoryFilter('All')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-sm shrink-0 ${
                selectedCategoryFilter === 'All'
                  ? 'bg-[#006B5B] text-white font-bold ring-2 ring-[#D4AF37]/50 border border-[#D4AF37]'
                  : 'bg-white text-neutral-700 hover:bg-emerald-50 hover:text-[#006B5B] border border-neutral-200'
              }`}
            >
              <span>All Collections</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${selectedCategoryFilter === 'All' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-neutral-100 text-neutral-600'}`}>
                {products.length}
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 shadow-sm shrink-0 ${
                  selectedCategoryFilter === cat.name
                    ? 'bg-[#006B5B] text-white font-bold ring-2 ring-[#D4AF37]/50 border border-[#D4AF37]'
                    : 'bg-white text-neutral-700 hover:bg-emerald-50 hover:text-[#006B5B] border border-neutral-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${selectedCategoryFilter === cat.name ? 'bg-[#D4AF37] text-black font-bold' : 'bg-neutral-100 text-neutral-600'}`}>
                  {cat.productCount}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('shop-categories-scroll');
              el?.scrollBy({ left: 260, behavior: 'smooth' });
            }}
            className="p-1.5 sm:p-2 rounded-full bg-white border border-[#D4AF37] text-neutral-800 hover:border-[#006B5B] hover:bg-[#006B5B] hover:text-white transition-all shrink-0 z-10 shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Scroll right"
            title="Next categories"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* 2. RESPONSIVE HORIZONTAL TOOLBAR & FILTERS (Search, Size, Color, Price, Sort) */}
        <div className="bg-white border border-[#006B5B]/15 rounded-sm p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
            {/* Search Input */}
            <div className="sm:col-span-2 relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by name, fabric, SKU..."
                className="w-full pl-8 pr-8 py-2 text-xs bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
              />
              {searchFilter && (
                <button 
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Length / Size Filter */}
            <div>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full text-xs p-2 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B] font-medium"
              >
                <option value="All">All Lengths (50"-60")</option>
                {allSizes.filter(s => s !== 'All').map((sz) => (
                  <option key={sz} value={sz}>Length {sz}"</option>
                ))}
              </select>
            </div>

            {/* Shade / Color Filter */}
            <div>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full text-xs p-2 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B] font-medium"
              >
                <option value="All">All Shades</option>
                {allColors.filter(c => c !== 'All').map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>

            {/* Textile Weave Filter */}
            <div>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full text-xs p-2 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B] font-medium"
              >
                <option value="All">All Fabrics</option>
                {allMaterials.filter(m => m !== 'All').map((mat) => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full text-xs p-2 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B] font-semibold text-neutral-900"
              >
                <option value="newest">Newest Editions</option>
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Quick Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-neutral-100 text-xs">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold">Active:</span>

              {selectedCategoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#006B5B] px-2.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {selectedCategoryFilter}
                  <button onClick={() => setSelectedCategoryFilter('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedSize !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#006B5B] px-2.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                  Length: {selectedSize}"
                  <button onClick={() => setSelectedSize('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedColor !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#006B5B] px-2.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {selectedColor}
                  <button onClick={() => setSelectedColor('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedMaterial !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#006B5B] px-2.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {selectedMaterial}
                  <button onClick={() => setSelectedMaterial('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {searchFilter && (
                <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded border border-neutral-300 text-[11px]">
                  "{searchFilter}"
                  <button onClick={() => setSearchFilter('')}><X className="w-3 h-3" /></button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#006B5B] hover:underline font-bold ml-auto"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* 3. FULL-WIDTH RESPONSIVE PRODUCT GRID (No sidebar - full 4 columns!) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-sm p-12 text-center my-8 shadow-sm">
            <Sparkles className="w-8 h-8 text-[#006B5B] mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-neutral-900">
              No matching haute couture abayas found
            </h3>
            <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
              We couldn't find pieces matching your exact combination. Try clearing your size, color, or collection filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 bg-[#006B5B] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#01453D] transition-colors shadow"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
