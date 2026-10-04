import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Phone,
  User,
  Compass,
  ArrowRight,
  Crown,
  Flame,
  Tag,
  Scissors
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { CurrencyCode } from '../types';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    cartTotalCount, 
    wishlistIds, 
    currency, 
    setCurrency, 
    settings,
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  // Desktop active dropdown menu
  const [activeDropdown, setActiveDropdown] = useState<'collections' | 'deals' | 'atelier' | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile accordions state
  const [mobileAccordions, setMobileAccordions] = useState({
    collections: true,
    deals: false,
    atelier: false
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input on toggle
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleMouseEnterDropdown = (key: 'collections' | 'deals' | 'atelier') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const searchResults = searchQuery.trim().length > 1
    ? products
        .filter((p) => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSelectSearchResult = (productId: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigateTo('product', productId);
  };

  const currencies: CurrencyCode[] = ['USD', 'AED', 'SAR', 'GBP', 'PKR'];

  const collectionsDropdownItems = [
    { label: 'Dubai Collection', category: 'Dubai Collection', desc: 'Bespoke cuts & gold embroidered royal hems' },
    { label: 'Saudi Heritage', category: 'Saudi Collection', desc: 'Traditional Najdi & Hijazi silhouettes' },
    { label: 'Open Front Abayas', category: 'Open Abayas', desc: 'Versatile luxury layering robes' },
    { label: 'Kimono Cuts', category: 'Kimono Abayas', desc: 'Modern Japanese silhouette statement sleeves' },
    { label: 'Farasha & Butterfly', category: 'Farasha Abayas', desc: 'Regal billowing silk desert drapes' },
    { label: 'Pure Korean Nida', category: 'Nida Abayas', desc: 'Grade-A breathable wrinkle-resistant Nida' },
    { label: 'Haute Luxury Evening', category: 'Luxury Collection', desc: 'Swarovski crystals & 24K bullion thread' }
  ];

  const dealsDropdownItems = [
    { label: 'Abaya & Stole Combo Deals', category: 'Abaya & Stole Combo Deals', desc: 'Curated 3-piece sets with 20% bundle savings', highlight: true },
    { label: 'Medina Silk Stoles (Stalers)', category: 'Stoles & Sheilas', desc: 'Maxi Turkish chiffon & pure Medina silk wraps' },
    { label: 'Magnetic Hijab Pins & Brooches', category: 'Magnetic Pins & Brooches', desc: 'Ultra-hold no-snag magnetic fasteners' },
    { label: 'Flash Sale Limited Window', category: 'All', page: 'shop', desc: 'Complimentary matching Sheila on select pieces', isFlash: true }
  ];

  const atelierDropdownItems = [
    { label: 'Coming Soon (Eid 2026)', page: 'coming-soon', desc: 'Private preview of the upcoming Imperial collection', isComingSoon: true },
    { label: 'Atelier Stories & Silk Science', page: 'blog', desc: 'Behind the craftsmanship of authentic Korean Nida' },
    { label: 'Heritage & Atelier Craft', page: 'about', desc: 'The legacy of Arabian haute couture excellence' },
    { label: 'Frequent Inquiries (FAQ)', page: 'faqs', desc: 'Tailoring, alterations, and shipping details' },
    { label: 'Contact & Private Salon', page: 'contact', desc: 'Book a bespoke appointment in Downtown Dubai' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Luxury Gold & Emerald Announcement Bar */}
      <div className="bg-[#01453D] text-[#F8F6F0] text-[11px] py-1.5 px-3 sm:px-6 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Announcement headline */}
          <div className="hidden md:flex items-center gap-2 text-emerald-100 truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="font-light tracking-wide truncate">{settings.announcementText}</span>
          </div>

          {/* Quick Concierge & Currency Actions */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3 sm:gap-6 uppercase tracking-wider text-[10px] sm:text-[11px]">
            {/* Direct WhatsApp Concierge */}
            <a 
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-100 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span>Dubai Atelier WhatsApp</span>
            </a>

            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors font-medium bg-black/20 px-2 py-0.5 rounded border border-white/10"
              >
                <span>{currency}</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#D4AF37]" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-[#111111] border border-[#D4AF37]/40 shadow-2xl rounded py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#006B5B] transition-colors ${
                        currency === curr ? 'text-[#D4AF37] font-bold' : 'text-[#F8F6F0]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Track Order Direct */}
            <button 
              onClick={() => navigateTo('track-order')}
              className="hover:text-[#D4AF37] transition-colors font-medium"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Unified Navbar with Luxury Dropdowns (ONE Single Bar) */}
      <nav 
        className={`w-full transition-all duration-300 border-b relative ${
          isScrolled 
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-[#006B5B]/15 shadow-md py-2.5' 
            : 'bg-[#FDFBF7] border-black/10 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Mobile Nav Toggle Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors border ${
                  mobileMenuOpen 
                    ? 'bg-[#006B5B] text-white border-[#006B5B]' 
                    : 'text-[#111111] hover:text-[#006B5B] hover:bg-emerald-50 border-neutral-200'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Brand Logo - Pure Image without text */}
            <div 
              className="cursor-pointer shrink-0 flex items-center justify-center"
              onClick={() => navigateTo('home')}
              title="Emerald Haya"
            >
              <BrandLogo size="md" />
            </div>

            {/* Center: Single Unified Desktop Navigation Menu with Luxury Dropdowns */}
            <div className="hidden lg:flex items-center justify-center gap-x-6 xl:gap-x-8">
              
              {/* Home */}
              <button
                onClick={() => navigateTo('home')}
                className={`text-[12.5px] xl:text-[13px] tracking-wider uppercase font-semibold transition-colors relative py-1.5 hover:text-[#006B5B] whitespace-nowrap ${
                  activePage === 'home' ? 'text-[#006B5B]' : 'text-[#111111]/85'
                }`}
              >
                Home
                {activePage === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#006B5B] rounded-full" />
                )}
              </button>

              {/* Collections DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnterDropdown('collections')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    navigateTo('shop');
                  }}
                  className={`text-[12.5px] xl:text-[13px] tracking-wider uppercase font-semibold transition-colors flex items-center gap-1 py-1.5 hover:text-[#006B5B] whitespace-nowrap ${
                    activePage === 'shop' && !['Abaya & Stole Combo Deals', 'Stoles & Sheilas', 'Magnetic Pins & Brooches'].includes(selectedCategoryFilter)
                      ? 'text-[#006B5B]' 
                      : 'text-[#111111]/85'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'collections' ? 'rotate-180 text-[#006B5B]' : 'text-neutral-400'}`} />
                </button>

                {/* Collections Dropdown Menu Card */}
                {activeDropdown === 'collections' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-80 bg-white border border-[#D4AF37]/40 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#006B5B] border-b border-neutral-100 flex items-center justify-between">
                      <span>Haute Couture Lines</span>
                      <span className="font-mono text-neutral-400">150+ Designs</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {collectionsDropdownItems.map((item) => (
                        <div
                          key={item.label}
                          onClick={() => {
                            setSelectedCategoryFilter(item.category);
                            navigateTo('shop');
                            setActiveDropdown(null);
                          }}
                          className="p-2.5 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors group"
                        >
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-[#006B5B] flex items-center justify-between">
                            <span>{item.label}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#006B5B]" />
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                      <div 
                        onClick={() => {
                          setSelectedCategoryFilter('All');
                          navigateTo('shop');
                          setActiveDropdown(null);
                        }}
                        className="p-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#006B5B] hover:bg-emerald-50/80 rounded-lg cursor-pointer border-t border-neutral-100 mt-1"
                      >
                        Explore Complete Boutique Catalog →
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stoles, Pins & Deals DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnterDropdown('deals')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Abaya & Stole Combo Deals');
                    navigateTo('shop');
                  }}
                  className={`text-[12.5px] xl:text-[13px] tracking-wider uppercase font-semibold transition-colors flex items-center gap-1.5 py-1.5 hover:text-[#006B5B] whitespace-nowrap ${
                    ['Abaya & Stole Combo Deals', 'Stoles & Sheilas', 'Magnetic Pins & Brooches'].includes(selectedCategoryFilter)
                      ? 'text-[#006B5B]' 
                      : 'text-[#111111]/85'
                  }`}
                >
                  <span>Stoles & Deals</span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#D4AF37] text-neutral-950 font-bold rounded-sm uppercase tracking-wider">
                    New
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'deals' ? 'rotate-180 text-[#006B5B]' : 'text-neutral-400'}`} />
                </button>

                {/* Stoles & Deals Dropdown Menu Card */}
                {activeDropdown === 'deals' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-84 bg-white border border-[#D4AF37]/40 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#006B5B] border-b border-neutral-100 flex items-center justify-between">
                      <span>Curated Accessories & Bundles</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <div className="mt-2 space-y-1">
                      {dealsDropdownItems.map((item) => (
                        <div
                          key={item.label}
                          onClick={() => {
                            if (item.category) setSelectedCategoryFilter(item.category);
                            navigateTo(item.page || 'shop');
                            setActiveDropdown(null);
                          }}
                          className={`p-2.5 rounded-lg cursor-pointer transition-colors group ${
                            item.highlight ? 'bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200/50' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-[#006B5B] flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              {item.isFlash && <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />}
                              {item.label}
                            </span>
                            {item.highlight && (
                              <span className="text-[9px] bg-[#006B5B] text-white px-1.5 py-0.5 rounded font-bold uppercase">
                                Save 20%
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Shop All Direct */}
              <button
                onClick={() => {
                  setSelectedCategoryFilter('All');
                  navigateTo('shop');
                }}
                className={`text-[12.5px] xl:text-[13px] tracking-wider uppercase font-semibold transition-colors relative py-1.5 hover:text-[#006B5B] whitespace-nowrap ${
                  activePage === 'shop' && selectedCategoryFilter === 'All' ? 'text-[#006B5B]' : 'text-[#111111]/85'
                }`}
              >
                Shop All
              </button>

              {/* Coming Soon Standalone Highlight */}
              <button
                onClick={() => navigateTo('coming-soon')}
                className={`text-[12px] xl:text-[12.5px] tracking-wider uppercase font-semibold transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full border border-[#D4AF37]/50 hover:bg-[#006B5B] hover:text-white whitespace-nowrap ${
                  activePage === 'coming-soon' 
                    ? 'bg-[#006B5B] text-white border-[#006B5B]' 
                    : 'bg-[#FAF7F0] text-neutral-800'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Coming Soon</span>
              </button>

              {/* Atelier & Heritage DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => handleMouseEnterDropdown('atelier')}
                onMouseLeave={handleMouseLeaveDropdown}
              >
                <button
                  className={`text-[12.5px] xl:text-[13px] tracking-wider uppercase font-semibold transition-colors flex items-center gap-1 py-1.5 hover:text-[#006B5B] whitespace-nowrap ${
                    ['blog', 'about', 'faqs', 'contact', 'coming-soon'].includes(activePage)
                      ? 'text-[#006B5B]' 
                      : 'text-[#111111]/85'
                  }`}
                >
                  <span>Atelier & Brand</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'atelier' ? 'rotate-180 text-[#006B5B]' : 'text-neutral-400'}`} />
                </button>

                {/* Atelier Dropdown Menu Card */}
                {activeDropdown === 'atelier' && (
                  <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-[#D4AF37]/40 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#006B5B] border-b border-neutral-100 flex items-center justify-between">
                      <span>The Atelier House</span>
                      <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </div>
                    <div className="mt-2 space-y-1">
                      {atelierDropdownItems.map((item) => (
                        <div
                          key={item.label}
                          onClick={() => {
                            navigateTo(item.page);
                            setActiveDropdown(null);
                          }}
                          className={`p-2.5 rounded-lg hover:bg-emerald-50 cursor-pointer transition-colors group ${
                            item.isComingSoon ? 'bg-[#FAF7F0]' : ''
                          }`}
                        >
                          <div className="text-xs font-bold text-neutral-900 group-hover:text-[#006B5B] flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              {item.isComingSoon && <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />}
                              {item.label}
                            </span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#006B5B]" />
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <button
                onClick={() => navigateTo('contact')}
                className={`text-[12.5px] xl:text-[13px] tracking-wider uppercase font-semibold transition-colors relative py-1.5 hover:text-[#006B5B] whitespace-nowrap ${
                  activePage === 'contact' ? 'text-[#006B5B]' : 'text-[#111111]/85'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Right: Actions (Search, Wishlist, Bag, Account) */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  searchOpen ? 'bg-[#006B5B] text-white' : 'text-[#111111] hover:text-[#006B5B] hover:bg-neutral-100'
                }`}
                aria-label="Search abayas"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigateTo('wishlist')}
                className="p-2 text-[#111111] hover:text-[#006B5B] hover:bg-neutral-100 rounded-full transition-colors relative"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#006B5B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={() => navigateTo('cart')}
                className="p-2 text-[#111111] hover:text-[#006B5B] hover:bg-neutral-100 rounded-full transition-colors relative"
                aria-label="Shopping bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-[#D4AF37] text-[#111111] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                    {cartTotalCount}
                  </span>
                )}
              </button>

              {/* Account Link */}
              <button
                onClick={() => navigateTo('account')}
                className="p-2 text-[#111111] hover:text-[#006B5B] hover:bg-neutral-100 rounded-full transition-colors hidden sm:block"
                aria-label="My account"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Drawer Inline */}
          {searchOpen && (
            <div className="mt-3 pb-2 border-t border-black/5 pt-3 relative animate-fadeIn">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 150+ abayas, Medina silk stoles, magnetic pins, or combo deals..."
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#006B5B]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#006B5B] shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 text-neutral-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#D4AF37]/30 shadow-2xl rounded-lg overflow-hidden z-50">
                  <div className="p-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider bg-[#F8F6F0]">
                    Suggested Haute Couture Pieces ({searchResults.length})
                  </div>
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSearchResult(item.id)}
                      className="flex items-center gap-3 p-3 hover:bg-emerald-50/50 cursor-pointer border-b border-neutral-100 last:border-b-0 transition-colors"
                    >
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-12 h-14 object-cover rounded bg-neutral-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-[#006B5B] uppercase tracking-wider font-semibold">{item.category}</div>
                        <div className="text-sm font-medium text-neutral-900 truncate">{item.name}</div>
                        <div className="text-xs text-neutral-500 font-mono">${item.price} USD</div>
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={() => {
                      setSelectedCategoryFilter('All');
                      navigateTo('shop');
                      setSearchOpen(false);
                    }}
                    className="p-2 text-center text-xs text-[#006B5B] font-bold bg-[#FDFBF7] hover:bg-emerald-50 cursor-pointer transition-colors uppercase tracking-wider"
                  >
                    View All Results in Boutique Catalog →
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Responsive Inline Navigation Menu for Mobile & Tablet with Accordions */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-neutral-200 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 mb-2 space-y-3">
              
              {/* Top Quick Links */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    navigateTo('home');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-wider p-2.5 rounded font-semibold bg-[#FDFBF7] border border-neutral-200"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    navigateTo('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs uppercase tracking-wider p-2.5 rounded font-semibold bg-[#006B5B] text-white"
                >
                  Shop All (150+)
                </button>
              </div>

              {/* Accordion 1: Collections */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setMobileAccordions(prev => ({ ...prev, collections: !prev.collections }))}
                  className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider bg-[#FAF7F0] text-neutral-900"
                >
                  <span>Haute Collections</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordions.collections ? 'rotate-180 text-[#006B5B]' : ''}`} />
                </button>
                {mobileAccordions.collections && (
                  <div className="p-2 space-y-1 bg-white">
                    {collectionsDropdownItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setSelectedCategoryFilter(item.category);
                          navigateTo('shop');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-xs p-2 rounded hover:bg-emerald-50 text-neutral-800 flex justify-between"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-[#006B5B]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 2: Stoles, Pins & Deals */}
              <div className="border border-[#D4AF37]/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setMobileAccordions(prev => ({ ...prev, deals: !prev.deals }))}
                  className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider bg-emerald-50 text-[#006B5B]"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Stoles, Pins & Deals</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordions.deals ? 'rotate-180 text-[#006B5B]' : ''}`} />
                </button>
                {mobileAccordions.deals && (
                  <div className="p-2 space-y-1 bg-white">
                    {dealsDropdownItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.category) setSelectedCategoryFilter(item.category);
                          navigateTo(item.page || 'shop');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-xs p-2 rounded hover:bg-emerald-50 text-neutral-800 flex justify-between items-center"
                      >
                        <span className="font-semibold">{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-[#006B5B]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 3: Atelier & Heritage */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setMobileAccordions(prev => ({ ...prev, atelier: !prev.atelier }))}
                  className="w-full flex items-center justify-between p-3 text-xs uppercase font-bold tracking-wider bg-[#FAF7F0] text-neutral-900"
                >
                  <span>Atelier & Heritage</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordions.atelier ? 'rotate-180 text-[#006B5B]' : ''}`} />
                </button>
                {mobileAccordions.atelier && (
                  <div className="p-2 space-y-1 bg-white">
                    {atelierDropdownItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => {
                          navigateTo(item.page);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-xs p-2 rounded hover:bg-emerald-50 text-neutral-800 flex justify-between items-center"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3 h-3 text-[#006B5B]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Concierge Buttons */}
              <div className="pt-2 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => {
                    navigateTo('coming-soon');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-[#006B5B] font-bold"
                >
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                  <span>Coming Soon Drop</span>
                </button>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#006B5B] font-bold"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
