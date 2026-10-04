import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Sliders, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  RotateCcw, 
  Star, 
  Sparkles,
  ExternalLink,
  X,
  Eye,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
  LayoutGrid,
  List,
  Cloud,
  RefreshCw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../../components/BrandLogo';
import { Product, Order, OrderStatus, Coupon, HeroSlide, StoreSettings } from '../../types';
import { HERO_IMAGE, DUBAI_IMAGE, KIMONO_IMAGE, ATELIER_IMAGE } from '../../services/seedData';
import { StorageService } from '../../services/storageService';
import { ImageUploadField } from '../../components/ImageUploadField';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    categories, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    coupons,
    addCoupon,
    settings, 
    updateSettings, 
    heroSlides, 
    updateHeroSlides, 
    reviews, 
    toggleReviewApproval, 
    formatPrice, 
    setAdminStatus, 
    navigateTo, 
    showToast,
    syncAllToFirebase,
    lastFirebaseSync
  } = useStore();

  const [isSyncingToFirebase, setIsSyncingToFirebase] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'slides' | 'orders' | 'categories' | 'coupons' | 'reviews' | 'settings'>('overview');

  // Admin tabs scroll ref & arrow state
  const adminTabsRef = useRef<HTMLDivElement>(null);
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false);
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(true);

  // Catalog category scroll ref
  const catalogCategoryScrollRef = useRef<HTMLDivElement>(null);

  // Products CRUD State
  const [productSearch, setProductSearch] = useState('');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('All');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [catalogViewMode, setCatalogViewMode] = useState<'table' | 'grid'>('table');

  // New / Edit Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Dubai Collection',
    sku: `EH-${Math.floor(100 + Math.random() * 900)}`,
    description: '',
    price: 240,
    discount: 0,
    stock: 20,
    material: 'Pure Korean Nida',
    color: 'Noir Black',
    imageUrl: DUBAI_IMAGE,
    imageUrl2: '',
    imageUrl3: '',
    isFlashSale: false,
    isNewArrival: true
  });

  // Hero Banners & Sliders CRUD State
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [slideForm, setSlideForm] = useState<HeroSlide>({
    id: '',
    title: '',
    subtitle: '',
    tagline: '',
    ctaText: 'Explore Collection',
    categoryFilter: 'Dubai Collection',
    image: HERO_IMAGE,
    isActive: true
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);

  // New Coupon Form State
  const [couponCode, setCouponCode] = useState('');
  const [couponPercent, setCouponPercent] = useState(15);
  const [couponMinSpend, setCouponMinSpend] = useState(100);

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Calculations for Overview Dashboard
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter((p) => p.stock < 15);
  const totalReviewsCount = reviews.length;

  // Check scroll positions for admin menu tabs
  const checkAdminTabScroll = () => {
    if (adminTabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = adminTabsRef.current;
      setCanScrollTabsLeft(scrollLeft > 5);
      setCanScrollTabsRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkAdminTabScroll();
    window.addEventListener('resize', checkAdminTabScroll);
    return () => window.removeEventListener('resize', checkAdminTabScroll);
  }, []);

  const scrollAdminTabs = (dir: 'left' | 'right') => {
    if (adminTabsRef.current) {
      const amount = dir === 'left' ? -220 : 220;
      adminTabsRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(checkAdminTabScroll, 250);
    }
  };

  const scrollCatalogCategories = (dir: 'left' | 'right') => {
    if (catalogCategoryScrollRef.current) {
      const amount = dir === 'left' ? -200 : 200;
      catalogCategoryScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setAdminStatus(false);
    showToast('Signed out of Atelier Admin Console');
    navigateTo('home');
  };

  // Product CRUD
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) {
      showToast('Please specify product name', 'error');
      return;
    }

    const discountVal = Number(productForm.discount) || 0;
    const priceVal = Number(productForm.price);
    const oldPriceVal = discountVal > 0 ? Math.round(priceVal * (1 + discountVal / 100)) : undefined;

    const images: string[] = [productForm.imageUrl];
    if (productForm.imageUrl2?.trim()) images.push(productForm.imageUrl2.trim());
    if (productForm.imageUrl3?.trim()) images.push(productForm.imageUrl3.trim());

    if (editingProduct) {
      if (images.length === 1 && editingProduct.images.length > 1) {
        images.push(...editingProduct.images.slice(1));
      }
      updateProduct(editingProduct.id, {
        name: productForm.name,
        category: productForm.category,
        sku: productForm.sku,
        description: productForm.description,
        price: priceVal,
        discount: discountVal > 0 ? discountVal : undefined,
        oldPrice: oldPriceVal,
        stock: Number(productForm.stock),
        material: productForm.material,
        color: productForm.color,
        images,
        gallery: images,
        isFlashSale: productForm.isFlashSale,
        isNewArrival: productForm.isNewArrival
      });
    } else {
      addProduct({
        name: productForm.name,
        category: productForm.category,
        brand: 'Emerald Haya',
        sku: productForm.sku,
        description: productForm.description || `Handcrafted haute couture ${productForm.category} cut from authentic ${productForm.material}.`,
        price: priceVal,
        discount: discountVal > 0 ? discountVal : undefined,
        oldPrice: oldPriceVal,
        stock: Number(productForm.stock),
        images,
        gallery: images,
        color: productForm.color,
        availableColors: [productForm.color, 'Noir Black', 'Emerald Green'],
        size: ['50', '52', '54', '56', '58', '60'],
        material: productForm.material,
        weight: '0.85 kg',
        reviewsCount: 0,
        rating: 5.0,
        tags: [productForm.category, 'Modest Wear', 'Luxury Abaya'],
        isFlashSale: productForm.isFlashSale,
        isNewArrival: productForm.isNewArrival,
        detailsList: [`Fabric: ${productForm.material}`, 'Tailored in Dubai', 'Complimentary matching Sheila']
      });
    }

    setShowAddProductModal(false);
    setProductForm({
      name: '',
      category: 'Dubai Collection',
      sku: `EH-${Math.floor(100 + Math.random() * 900)}`,
      description: '',
      price: 240,
      discount: 0,
      stock: 20,
      material: 'Pure Korean Nida',
      color: 'Noir Black',
      imageUrl: DUBAI_IMAGE,
      imageUrl2: '',
      imageUrl3: '',
      isFlashSale: false,
      isNewArrival: true
    });
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      category: p.category,
      sku: p.sku,
      description: p.description || '',
      price: p.price,
      discount: p.discount || 0,
      stock: p.stock,
      material: p.material,
      color: p.color,
      imageUrl: p.images[0] || DUBAI_IMAGE,
      imageUrl2: p.images[1] || '',
      imageUrl3: p.images[2] || '',
      isFlashSale: !!p.isFlashSale,
      isNewArrival: !!p.isNewArrival
    });
    setShowAddProductModal(true);
  };

  // Hero Banners & Sliders CRUD
  const handleOpenNewSlideModal = () => {
    setEditingSlide(null);
    setSlideForm({
      id: `slide-${Date.now()}`,
      title: 'Haute Couture Gulf Collection',
      subtitle: 'Bespoke Modest Elegance',
      tagline: 'Meticulously crafted from authentic Korean Nida and Japanese crepe.',
      ctaText: 'Explore Collection',
      categoryFilter: 'Dubai Collection',
      image: HERO_IMAGE,
      isActive: true
    });
    setShowSlideModal(true);
  };

  const handleEditSlideClick = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setSlideForm({ ...slide });
    setShowSlideModal(true);
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideForm.title.trim()) {
      showToast('Please provide a banner title', 'error');
      return;
    }

    let updated: HeroSlide[];
    if (editingSlide) {
      updated = heroSlides.map((s) => (s.id === editingSlide.id ? { ...slideForm, id: editingSlide.id } : s));
      showToast('Banner slide updated successfully');
    } else {
      updated = [{ ...slideForm, id: `slide-${Date.now()}` }, ...heroSlides];
      showToast('New hero banner created successfully');
    }

    updateHeroSlides(updated);
    setShowSlideModal(false);
  };

  const handleDeleteSlide = (slideId: string) => {
    if (heroSlides.length <= 1) {
      showToast('You must keep at least 1 hero banner active', 'error');
      return;
    }
    const updated = heroSlides.filter((s) => s.id !== slideId);
    updateHeroSlides(updated);
    showToast('Banner slide removed');
  };

  const handleToggleSlideActive = (slideId: string) => {
    const updated = heroSlides.map((s) => 
      s.id === slideId ? { ...s, isActive: !s.isActive } : s
    );
    updateHeroSlides(updated);
    showToast('Banner status updated');
  };

  // Coupon Creation
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const newCoupon: Coupon = {
      code: couponCode.trim().toUpperCase(),
      discountPercent: Number(couponPercent),
      minSpend: Number(couponMinSpend),
      isActive: true,
      description: `${couponPercent}% off orders above $${couponMinSpend}`
    };

    addCoupon(newCoupon);
    setCouponCode('');
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.material.toLowerCase().includes(productSearch.toLowerCase());
    
    const matchesCategory = selectedCatalogCategory === 'All' || p.category === selectedCatalogCategory;
    return matchesSearch && matchesCategory;
  });

  const bannerPresets = [
    { label: 'Royal Emerald (Editorial)', image: HERO_IMAGE },
    { label: 'Dubai Silk (Studio)', image: DUBAI_IMAGE },
    { label: 'Open Kimono (Minimal)', image: KIMONO_IMAGE },
    { label: 'Atelier Gold Thread (Craft)', image: ATELIER_IMAGE }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8F6F0] flex flex-col">
      {/* 1. Top Admin Header Bar */}
      <header className="bg-[#111111] text-white border-b border-[#D4AF37]/40 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3 sm:gap-4">
          <BrandLogo size="md" />
          <div className="flex flex-col">
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#006B5B] text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold rounded w-fit">
              Atelier Console
            </span>
            <span className="text-[11px] text-neutral-400 font-mono hidden md:block">
              Connected to Live Storefront
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Firebase Real-Time Cloud Sync Indicator & Action Button */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Firebase: Connected</span>
            </div>

            <button
              onClick={async () => {
                setIsSyncingToFirebase(true);
                await syncAllToFirebase();
                setIsSyncingToFirebase(false);
              }}
              disabled={isSyncingToFirebase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-400/50 text-[11px] text-emerald-200 font-semibold shadow transition-all active:scale-95 cursor-pointer"
              title="Force push all products, banners, and settings to Firebase Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${isSyncingToFirebase ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncingToFirebase ? 'Syncing...' : 'Sync to Firebase'}</span>
              <span className="sm:hidden">Firebase</span>
            </button>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="text-xs bg-[#006B5B] hover:bg-[#01453D] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded flex items-center gap-1.5 border border-[#D4AF37]/50 shadow transition-colors font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Exit to Boutique Storefront</span>
            <span className="sm:hidden">Storefront</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* 2. Admin Navigation Menu Strip with Left & Right Arrows (Responsive!) */}
      <div className="w-full bg-white border-b border-neutral-300 py-2 px-2 sm:px-4 sticky top-[61px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 relative">
          
          {/* Left Arrow */}
          <button
            onClick={() => scrollAdminTabs('left')}
            className={`p-1.5 rounded-full border shadow-sm transition-all shrink-0 z-10 flex items-center justify-center ${
              canScrollTabsLeft
                ? 'bg-white border-[#D4AF37] text-neutral-800 hover:bg-[#006B5B] hover:text-white cursor-pointer active:scale-95'
                : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-60'
            }`}
            aria-label="Scroll menu left"
            title="Previous menu items"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Scrollable Tabs Container */}
          <div
            ref={adminTabsRef}
            onScroll={checkAdminTabScroll}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scroll-smooth scrollbar-none py-0.5 flex-1"
          >
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: `Catalog (${products.length})`, icon: Package },
              { id: 'slides', label: `Hero Banners (${heroSlides.length})`, icon: ImageIcon, highlight: true },
              { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
              { id: 'categories', label: `Collections (${categories.length})`, icon: Sliders },
              { id: 'coupons', label: 'Coupons', icon: Tag },
              { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
              { id: 'settings', label: 'Store Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 rounded-full border shrink-0 ${
                    isSelected
                      ? 'bg-[#006B5B] text-white border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]'
                      : 'bg-[#FAF7F0] text-neutral-700 border-neutral-300 hover:border-[#006B5B] hover:text-[#006B5B]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollAdminTabs('right')}
            className={`p-1.5 rounded-full border shadow-sm transition-all shrink-0 z-10 flex items-center justify-center ${
              canScrollTabsRight
                ? 'bg-white border-[#D4AF37] text-neutral-800 hover:bg-[#006B5B] hover:text-white cursor-pointer active:scale-95'
                : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-60'
            }`}
            aria-label="Scroll menu right"
            title="Next menu items"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3. Main Admin Body Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Firebase Cloud Sync Banner */}
            <div className="bg-gradient-to-r from-[#01453D] via-[#006B5B] to-[#01453D] text-white p-4 sm:p-5 rounded-xl border border-[#D4AF37]/50 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/30 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#FDFBF7]">Firebase Firestore Cloud Database</span>
                    <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[10px] font-mono font-bold uppercase rounded-full">
                      Live Auto-Sync
                    </span>
                  </div>
                  <p className="text-xs text-neutral-200 mt-0.5">
                    All abayas, stoles, pins, hero banners, texts, pictures uploaded from PC, settings, and WhatsApp orders are automatically saved to Firebase.
                  </p>
                  {lastFirebaseSync && (
                    <span className="text-[10px] text-emerald-300 font-mono mt-1 block">
                      Last synchronized: {new Date(lastFirebaseSync).toLocaleTimeString()} ({new Date(lastFirebaseSync).toLocaleDateString()})
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={async () => {
                  setIsSyncingToFirebase(true);
                  await syncAllToFirebase();
                  setIsSyncingToFirebase(false);
                }}
                disabled={isSyncingToFirebase}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#b8952b] text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingToFirebase ? 'animate-spin' : ''}`} />
                <span>{isSyncingToFirebase ? 'Syncing...' : 'Sync All to Firebase'}</span>
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#006B5B]/20 shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Order Value</span>
                  <DollarSign className="w-4 h-4 text-[#006B5B]" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#006B5B]">
                  {formatPrice(totalRevenue)}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">From verified WhatsApp checkouts</span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#006B5B]/20 shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Atelier Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#006B5B]" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900">
                  {totalOrdersCount}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Recorded in database</span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#006B5B]/20 shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Boutique Items</span>
                  <Package className="w-4 h-4 text-[#006B5B]" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900">
                  {products.length}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Spanning 14 Gulf collections</span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#006B5B]/20 shadow-sm">
                <div className="flex items-center justify-between text-neutral-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Hero Banners Live</span>
                  <ImageIcon className="w-4 h-4 text-[#006B5B]" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900">
                  {heroSlides.filter(s => s.isActive).length} / {heroSlides.length}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Displayed on homepage slider</span>
              </div>
            </div>

            {/* Quick Actions & Restore */}
            <div className="bg-white border border-[#D4AF37]/40 rounded-lg p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Catalog Health & Quick Actions</h3>
                <p className="text-xs text-neutral-500">Manage products, change homepage hero banners, or restore the 150+ demo items.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowAddProductModal(true);
                  }}
                  className="px-4 py-2 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Abaya</span>
                </button>

                <button
                  onClick={handleOpenNewSlideModal}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#b8952b] text-neutral-900 text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow font-bold"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>New Hero Banner</span>
                </button>

                <button
                  onClick={resetProductsToDefault}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-[#D4AF37] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 border border-[#D4AF37]/50"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset 150+ Abayas</span>
                </button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white border border-neutral-200 rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4">
                Recent Atelier Orders ({orders.slice(0, 5).length})
              </h3>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8F6F0] text-neutral-700 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3">Order Ref</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-neutral-50">
                          <td className="p-3 font-mono font-bold text-[#006B5B]">#{ord.orderNumber}</td>
                          <td className="p-3 font-medium text-neutral-900">{ord.customerName}</td>
                          <td className="p-3 font-mono text-neutral-600">{ord.phone}</td>
                          <td className="p-3 text-neutral-600">{ord.items.length} garments</td>
                          <td className="p-3 font-mono font-bold text-neutral-900">{formatPrice(ord.total)}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold uppercase tracking-wider text-[10px]">
                              {ord.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setViewingOrder(ord)}
                              className="text-xs text-[#006B5B] hover:underline font-semibold"
                            >
                              Manage Order
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-neutral-500">
                  No orders recorded yet. Place an order through the shopping bag to see it here!
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG (Responsive with Category Arrows!) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Search, Category Bar & Add Product */}
            <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-96">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search 150+ abayas by name, SKU, fabric..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-neutral-300 rounded overflow-hidden">
                    <button
                      onClick={() => setCatalogViewMode('table')}
                      className={`p-2 transition-colors ${catalogViewMode === 'table' ? 'bg-[#006B5B] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
                      title="Table View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCatalogViewMode('grid')}
                      className={`p-2 transition-colors ${catalogViewMode === 'grid' ? 'bg-[#006B5B] text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
                      title="Cards View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setShowAddProductModal(true);
                    }}
                    className="px-4 py-2 bg-[#006B5B] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Abaya</span>
                  </button>
                </div>
              </div>

              {/* Category Quick Filter Strip with Left & Right Arrows */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-200">
                <button
                  onClick={() => scrollCatalogCategories('left')}
                  className="p-1 rounded-full border border-[#D4AF37] text-neutral-700 hover:bg-[#006B5B] hover:text-white shrink-0 bg-white"
                  title="Previous categories"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div
                  ref={catalogCategoryScrollRef}
                  className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 flex-1"
                >
                  <button
                    onClick={() => setSelectedCatalogCategory('All')}
                    className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap transition-all border shrink-0 ${
                      selectedCatalogCategory === 'All'
                        ? 'bg-[#006B5B] text-white border-[#D4AF37] font-bold shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#006B5B]'
                    }`}
                  >
                    All ({products.length})
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCatalogCategory(cat.name)}
                      className={`text-[11px] uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap transition-all border shrink-0 ${
                        selectedCatalogCategory === cat.name
                          ? 'bg-[#006B5B] text-white border-[#D4AF37] font-bold shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#006B5B]'
                      }`}
                    >
                      {cat.name} ({products.filter(p => p.category === cat.name).length})
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollCatalogCategories('right')}
                  className="p-1 rounded-full border border-[#D4AF37] text-neutral-700 hover:bg-[#006B5B] hover:text-white shrink-0 bg-white"
                  title="Next categories"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Catalog Products: Responsive Table View */}
            {catalogViewMode === 'table' ? (
              <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#01453D] text-[#D4AF37] uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3">Garment</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Fabric</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredProducts.slice(0, 50).map((prod) => (
                      <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt=""
                            className="w-10 h-12 object-cover rounded bg-neutral-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-neutral-900 block truncate max-w-xs">{prod.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">{prod.color}</span>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-neutral-600">{prod.sku}</td>
                        <td className="p-3 text-[#006B5B] font-semibold">{prod.category}</td>
                        <td className="p-3 text-neutral-600 truncate max-w-[140px]">{prod.material}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${prod.stock < 10 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-50 text-emerald-800'}`}>
                            {prod.stock} in stock
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-neutral-900">{formatPrice(prod.price)}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleEditClick(prod)}
                            className="p-1.5 text-neutral-600 hover:text-[#006B5B] transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-3 bg-[#FDFBF7] text-center text-xs text-neutral-500 font-mono border-t border-neutral-200">
                  Showing {filteredProducts.length} of {products.length} garments in inventory
                </div>
              </div>
            ) : (
              /* Catalog Products: Responsive Touch Cards Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.slice(0, 48).map((prod) => (
                  <div key={prod.id} className="bg-white border border-neutral-200 rounded-lg p-3 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[3/4] rounded overflow-hidden mb-2 bg-neutral-100">
                        <img src={prod.images[0]} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-black/70 text-[#D4AF37] px-2 py-0.5 text-[10px] font-mono rounded">
                          {prod.sku}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#006B5B] font-bold uppercase tracking-wider block">{prod.category}</span>
                      <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">{prod.name}</h4>
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">{prod.material}</p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-xs text-neutral-900">{formatPrice(prod.price)}</span>
                        <span className="text-[10px] text-neutral-400 block font-mono">Stock: {prod.stock}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 bg-neutral-100 hover:bg-[#006B5B] hover:text-white rounded transition-colors text-neutral-700"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white rounded transition-colors text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HERO BANNERS & SLIDERS MANAGER (Fully Editable as requested!) */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#006B5B]" />
                  <span>Main Website Hero Banners & Sliders</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xl">
                  Customize, reorder, change images, and update headings for all banner slides appearing on the main website homepage. Changes update live immediately!
                </p>
              </div>

              <button
                onClick={handleOpenNewSlideModal}
                className="px-4 py-2.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Hero Banner</span>
              </button>
            </div>

            {/* Banner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroSlides.map((slide, idx) => (
                <div 
                  key={slide.id} 
                  className={`bg-white border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm transition-all ${
                    slide.isActive ? 'border-[#006B5B]/30' : 'border-neutral-200 opacity-70'
                  }`}
                >
                  <div>
                    {/* Banner Image Preview */}
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-neutral-900 shadow-inner group">
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="bg-black/70 text-[#D4AF37] px-2.5 py-0.5 text-[10px] uppercase font-bold rounded border border-[#D4AF37]/30">
                          Banner Slide #{idx + 1}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                          slide.isActive ? 'bg-emerald-600 text-white' : 'bg-neutral-600 text-neutral-200'
                        }`}>
                          {slide.isActive ? 'Active on Storefront' : 'Hidden'}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">{slide.subtitle}</span>
                        <h4 className="text-base font-serif font-bold text-white leading-tight truncate">{slide.title}</h4>
                      </div>
                    </div>

                    {/* Metadata details */}
                    <div className="space-y-1 text-xs">
                      <p className="text-neutral-600 text-[11px] leading-relaxed line-clamp-2">{slide.tagline}</p>
                      <div className="flex items-center justify-between text-[11px] pt-2 text-neutral-500 font-mono">
                        <span>CTA: <strong className="text-[#006B5B]">{slide.ctaText}</strong></span>
                        <span>Links to: <strong className="text-neutral-800">{slide.categoryFilter || 'All'}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleSlideActive(slide.id)}
                      className={`text-xs px-3 py-1.5 rounded font-semibold transition-colors ${
                        slide.isActive 
                          ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200' 
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {slide.isActive ? 'Pause Slide' : 'Activate Slide'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditSlideClick(slide)}
                        className="px-3 py-1.5 bg-[#006B5B] text-white hover:bg-[#01453D] rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Banner</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded transition-colors"
                        title="Delete Banner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-lg p-5 sm:p-6 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-neutral-900 mb-4">
                Atelier Client Consignments ({orders.length})
              </h3>
              {orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#01453D] text-[#D4AF37] uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3">Order Number</th>
                        <th className="p-3">Customer Details</th>
                        <th className="p-3">Address & Destination</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Atelier Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-neutral-50">
                          <td className="p-3 font-mono font-bold text-[#006B5B]">#{ord.orderNumber}</td>
                          <td className="p-3">
                            <span className="font-bold text-neutral-900 block">{ord.customerName}</span>
                            <span className="text-neutral-500 font-mono text-[11px]">{ord.phone}</span>
                          </td>
                          <td className="p-3 text-neutral-600">
                            {ord.city}, {ord.country}
                          </td>
                          <td className="p-3 font-mono text-neutral-600">{ord.items.length} garments</td>
                          <td className="p-3 font-mono font-bold text-neutral-900">{formatPrice(ord.total)}</td>
                          <td className="p-3">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-xs bg-white border border-neutral-300 rounded px-2 py-1 uppercase font-bold"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setViewingOrder(ord)}
                              className="text-xs text-[#006B5B] hover:underline font-semibold"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-xs text-neutral-500">
                  No orders placed yet. As customers checkout with WhatsApp, their orders are saved and managed here!
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: CATEGORIES / COLLECTIONS */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white border border-neutral-200 rounded-lg p-4 flex gap-4 shadow-sm">
                  <img src={cat.image} alt="" className="w-16 h-20 object-cover rounded bg-neutral-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-neutral-900 text-sm truncate">{cat.name}</h4>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{cat.description}</p>
                    <span className="text-[11px] font-mono text-[#006B5B] font-bold block mt-2">
                      {products.filter(p => p.category === cat.name).length} garments in stock
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleCreateCoupon} className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-neutral-900 border-b pb-2">Create Promo Code</h3>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Coupon Code (e.g. DUBAI20)</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="EMERALD30"
                  className="w-full text-xs p-2.5 border rounded uppercase font-mono font-bold"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={couponPercent}
                  onChange={(e) => setCouponPercent(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border rounded font-mono"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Minimum Spend ($)</label>
                <input
                  type="number"
                  min="0"
                  value={couponMinSpend}
                  onChange={(e) => setCouponMinSpend(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border rounded font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#006B5B] text-white text-xs font-bold uppercase tracking-wider rounded"
              >
                Create Promo Code
              </button>
            </form>

            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Active Boutique Coupons</h3>
              {coupons.map((c: Coupon) => (
                <div key={c.code} className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#006B5B]">{c.code}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        {c.discountPercent}% OFF
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 mt-1 block">
                      Min Spend: ${c.minSpend} · {c.description}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-neutral-900">Customer Reviews Moderation</h3>
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-neutral-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-xs">{rev.customerName}</span>
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">"{rev.comment}"</p>
                  <span className="text-[10px] text-neutral-400 font-mono mt-1 block">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReviewApproval(rev.id, !rev.isApproved)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded ${
                      rev.isApproved 
                        ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' 
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    {rev.isApproved ? 'Unpublish' : 'Approve & Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 8: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 max-w-2xl shadow-sm space-y-5">
            <h3 className="font-serif text-xl font-bold text-neutral-900 border-b pb-3">
              Store & WhatsApp Concierge Settings
            </h3>

            {/* Brand Logo Configuration with Direct PC Upload */}
            <div className="bg-[#FAF7F0] p-4 rounded-lg border border-[#D4AF37]/40 mb-2">
              <ImageUploadField
                label="Brand Logo Image (Direct Upload from PC or URL)"
                value={settingsForm.logoUrl || '/src/assets/logo.svg'}
                onChange={(url) => setSettingsForm({ ...settingsForm, logoUrl: url })}
                aspectRatio="square"
                presets={[
                  { label: 'Emerald Emblem (Default)', img: '/src/assets/logo.svg' }
                ]}
                helperText="Upload your custom brand logo from your PC or device (SVG or transparent PNG recommended). Instant sync to Firebase & displayed across storefront."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                WhatsApp Order Receiving Phone Number *
              </label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                placeholder="971501234567"
                className="w-full text-xs p-2.5 border rounded font-mono font-bold"
                required
              />
              <span className="text-[10px] text-neutral-500 mt-1 block">
                Include country code without + or dashes (e.g., 971501234567 for UAE or 923001234567 for PK).
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Announcement Bar Headline
              </label>
              <input
                type="text"
                value={settingsForm.announcementText}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                className="w-full text-xs p-2.5 border rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Complimentary Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  value={settingsForm.freeShippingThreshold}
                  onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 border rounded font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">
                  Default Display Currency
                </label>
                <select
                  value={settingsForm.currency}
                  onChange={(e: any) => setSettingsForm({ ...settingsForm, currency: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded"
                >
                  <option value="USD">USD ($)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="SAR">SAR (ر.س)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (Rs)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">
                Google Form Embedded Consultation URL
              </label>
              <input
                type="text"
                value={settingsForm.googleFormUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, googleFormUrl: e.target.value })}
                placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                className="w-full text-xs p-2.5 border rounded font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Concierge Email</label>
                <input
                  type="email"
                  value={settingsForm.storeEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storeEmail: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Atelier Phone</label>
                <input
                  type="text"
                  value={settingsForm.storePhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, storePhone: e.target.value })}
                  className="w-full text-xs p-2.5 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1">Atelier Physical Address</label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full text-xs p-2.5 border rounded"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-wider rounded shadow"
            >
              Save Website Settings
            </button>
          </form>
        )}
      </div>

      {/* MODAL 1: Add / Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-[#D4AF37]/50 shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                {editingProduct ? 'Edit Couture Abaya' : 'Add New Couture Abaya'}
              </h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-neutral-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Garment Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Royal Gilded Dubai Kimono"
                  className="w-full p-2.5 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Collection / Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2.5 border rounded"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">SKU Number</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full p-2.5 border rounded font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Price ($ USD) *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Discount (% OFF)</label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={productForm.discount}
                    onChange={(e) => setProductForm({ ...productForm, discount: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full p-2.5 border rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full p-2.5 border rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Garment Description / Narrative</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Bespoke haute couture crafted from authentic fabrics with master tailoring..."
                  className="w-full p-2.5 border rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Textile / Fabric</label>
                  <input
                    type="text"
                    value={productForm.material}
                    onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                    className="w-full p-2.5 border rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Primary Color</label>
                  <input
                    type="text"
                    value={productForm.color}
                    onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                    className="w-full p-2.5 border rounded"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-[#FAF7F0] p-3 rounded-lg border border-neutral-200">
                <div className="font-semibold text-neutral-800 text-xs flex items-center justify-between">
                  <span>Product Photography (Direct Upload from PC or URL)</span>
                  <span className="text-[10px] text-[#006B5B] font-mono">Synced to Firebase</span>
                </div>

                <ImageUploadField
                  label="1. Primary Front Photo (Required)"
                  value={productForm.imageUrl}
                  onChange={(url) => setProductForm({ ...productForm, imageUrl: url })}
                  aspectRatio="portrait"
                  presets={[
                    { label: 'Dubai Silk', img: DUBAI_IMAGE },
                    { label: 'Saudi Obsidian', img: HERO_IMAGE },
                    { label: 'Kimono Crepe', img: KIMONO_IMAGE },
                    { label: 'Atelier Gold', img: ATELIER_IMAGE }
                  ]}
                  helperText="Upload main garment photo directly from your PC or select a preset."
                />

                <ImageUploadField
                  label="2. Back Angle / Silhouette (Optional)"
                  value={productForm.imageUrl2}
                  onChange={(url) => setProductForm({ ...productForm, imageUrl2: url })}
                  aspectRatio="portrait"
                  helperText="Upload rear or alternate angle directly from your PC."
                />

                <ImageUploadField
                  label="3. Fabric Texture / Embroidered Detail (Optional)"
                  value={productForm.imageUrl3}
                  onChange={(url) => setProductForm({ ...productForm, imageUrl3: url })}
                  aspectRatio="portrait"
                  helperText="Upload close-up fabric texture or sleeve embroidery directly from your PC."
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFlashSale}
                    onChange={(e) => setProductForm({ ...productForm, isFlashSale: e.target.checked })}
                    className="accent-[#006B5B]"
                  />
                  <span className="text-xs text-neutral-800 font-medium">Highlight in Flash Sale</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                    className="accent-[#006B5B]"
                  />
                  <span className="text-xs text-neutral-800 font-medium">New Arrival Badge</span>
                </label>
              </div>

              <div className="pt-4 border-t flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-2.5 border rounded font-semibold text-neutral-700 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#006B5B] text-white rounded font-bold uppercase shadow"
                >
                  {editingProduct ? 'Save Changes' : 'Create Abaya'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Hero Banner Slide Editor (Add / Edit Banner as requested!) */}
      {showSlideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-[#D4AF37]/50 shadow-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#006B5B]" />
                <span>{editingSlide ? 'Edit Homepage Hero Banner' : 'Create New Homepage Banner'}</span>
              </h3>
              <button onClick={() => setShowSlideModal(false)} className="text-neutral-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="mt-4 space-y-4 text-xs">
              {/* Live Banner Preview Box */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Live Banner Visual Preview</label>
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-neutral-900 shadow-md">
                  <img src={slideForm.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-0.5">
                      {slideForm.subtitle || 'Kicker Subtitle'}
                    </span>
                    <h2 className="text-lg sm:text-xl font-serif font-light text-white leading-tight">
                      {slideForm.title || 'Display Headline'}
                    </h2>
                    <p className="text-[11px] text-neutral-300 mt-1 line-clamp-1">{slideForm.tagline}</p>
                    <button type="button" className="mt-2 px-3 py-1 bg-[#006B5B] text-white text-[10px] font-bold rounded uppercase">
                      {slideForm.ctaText || 'Button CTA'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Headline Title *</label>
                  <input
                    type="text"
                    value={slideForm.title}
                    onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                    placeholder="e.g. The Royal Emerald Collection"
                    className="w-full p-2.5 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Kicker Subtitle</label>
                  <input
                    type="text"
                    value={slideForm.subtitle}
                    onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                    placeholder="e.g. Bespoke Gulf Heritage"
                    className="w-full p-2.5 border rounded"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Description / Tagline</label>
                <textarea
                  rows={2}
                  value={slideForm.tagline}
                  onChange={(e) => setSlideForm({ ...slideForm, tagline: e.target.value })}
                  placeholder="Describe this collection or highlight fabric details..."
                  className="w-full p-2.5 border rounded"
                />
              </div>

              {/* Button text & Category link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Button CTA Text</label>
                  <input
                    type="text"
                    value={slideForm.ctaText}
                    onChange={(e) => setSlideForm({ ...slideForm, ctaText: e.target.value })}
                    placeholder="e.g. Shop Dubai Collection"
                    className="w-full p-2.5 border rounded"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Target Category Filter</label>
                  <select
                    value={slideForm.categoryFilter}
                    onChange={(e) => setSlideForm({ ...slideForm, categoryFilter: e.target.value })}
                    className="w-full p-2.5 border rounded"
                  >
                    <option value="">All Collections</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload from PC or URL */}
              <ImageUploadField
                label="Banner Background Image (Direct Upload from PC or URL)"
                value={slideForm.image}
                onChange={(url) => setSlideForm({ ...slideForm, image: url })}
                aspectRatio="landscape"
                presets={bannerPresets.map(p => ({ label: p.label, img: p.image }))}
                helperText="Upload any landscape photo directly from your PC (16:9 ratio recommended). Persisted directly to Firebase."
              />

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={slideForm.isActive}
                    onChange={(e) => setSlideForm({ ...slideForm, isActive: e.target.checked })}
                    className="accent-[#006B5B] w-4 h-4"
                  />
                  <span className="font-semibold text-neutral-800">Publish & Show on Storefront Hero Slider</span>
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSlideModal(false)}
                  className="flex-1 py-2.5 border rounded font-semibold text-neutral-700 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#006B5B] text-white rounded font-bold uppercase shadow"
                >
                  {editingSlide ? 'Save Banner Changes' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: View Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-[#D4AF37]/50 shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#006B5B]">Atelier Client Consignment</span>
                <h3 className="font-serif text-lg font-bold text-neutral-900">Order #{viewingOrder.orderNumber}</h3>
              </div>
              <button onClick={() => setViewingOrder(null)} className="text-neutral-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="bg-neutral-50 p-3 rounded space-y-1">
                <div><strong>Client Name:</strong> {viewingOrder.customerName}</div>
                <div><strong>Phone / WhatsApp:</strong> {viewingOrder.phone}</div>
                <div><strong>Email:</strong> {viewingOrder.email}</div>
                <div><strong>Delivery Address:</strong> {viewingOrder.address}, {viewingOrder.city}, {viewingOrder.country}</div>
                {viewingOrder.orderNotes && <div><strong>Client Notes:</strong> {viewingOrder.orderNotes}</div>}
              </div>

              <div>
                <strong className="block mb-2 font-bold uppercase tracking-wider text-neutral-700">Order Items ({viewingOrder.items.length})</strong>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {viewingOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 border rounded bg-white">
                      <img src={it.image} alt="" className="w-10 h-12 object-cover rounded shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-neutral-900 truncate">{it.productName}</div>
                        <div className="text-[11px] text-neutral-500">Size: {it.selectedSize} · Color: {it.selectedColor} · Qty: {it.quantity}</div>
                      </div>
                      <div className="font-mono font-bold text-neutral-800">{formatPrice(it.price * it.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 space-y-1 font-mono text-neutral-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(viewingOrder.subtotal)}</span>
                </div>
                {viewingOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>-{formatPrice(viewingOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{viewingOrder.shipping === 0 ? 'Complimentary' : formatPrice(viewingOrder.shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#006B5B] pt-2 border-t">
                  <span>Total Amount:</span>
                  <span>{formatPrice(viewingOrder.total)}</span>
                </div>
              </div>

              <div className="pt-3 border-t flex gap-2">
                <a
                  href={`https://wa.me/${viewingOrder.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-[#006B5B] text-white rounded text-center font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Reply on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setViewingOrder(null)}
                  className="px-4 py-2.5 border rounded font-semibold text-neutral-700 uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
