import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Order, 
  Coupon, 
  StoreSettings, 
  HeroSlide, 
  Review, 
  CurrencyCode, 
  OrderStatus 
} from '../types';
import { StorageService } from '../services/storageService';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation & Page State
  activePage: string;
  pageParam: string | null;
  navigateTo: (page: string, param?: string) => void;

  // Products
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartGrandTotal: number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, size: string, color: string) => void;

  // Coupon
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders & WhatsApp Checkout
  orders: Order[];
  createWhatsAppOrder: (orderData: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    orderNotes?: string;
  }) => { order: Order; whatsappUrl: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;

  // Settings & Configuration
  settings: StoreSettings;
  updateSettings: (newSettings: StoreSettings) => void;

  // Hero Slides
  heroSlides: HeroSlide[];
  updateHeroSlides: (slides: HeroSlide[]) => void;

  // Reviews
  reviews: Review[];
  addCustomerReview: (reviewData: Omit<Review, 'id' | 'date' | 'isApproved'>) => void;
  toggleReviewApproval: (reviewId: string, isApproved: boolean) => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usdPrice: number) => string;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Admin Auth
  isAdmin: boolean;
  setAdminStatus: (status: boolean) => void;

  // Filter & Search shortcuts
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CURRENCY_RATES: Record<CurrencyCode, { rate: number; symbol: string; position: 'prefix' | 'suffix' }> = {
  USD: { rate: 1.0, symbol: '$', position: 'prefix' },
  AED: { rate: 3.67, symbol: ' AED', position: 'suffix' },
  SAR: { rate: 3.75, symbol: ' SAR', position: 'suffix' },
  GBP: { rate: 0.79, symbol: '£', position: 'prefix' },
  PKR: { rate: 278.0, symbol: 'Rs. ', position: 'prefix' }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | null>(null);

  // Entities
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(StorageService.getSettings());
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('emerald_haya_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('emerald_haya_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(StorageService.isAdminLoggedIn());

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Load Initial Entities from StorageService & Sync with Firebase Firestore
  useEffect(() => {
    setProducts(StorageService.getProducts());
    setCategories(StorageService.getCategories());
    setOrders(StorageService.getOrders());
    setCoupons(StorageService.getCoupons());
    setHeroSlides(StorageService.getHeroSlides());
    setReviews(StorageService.getReviews());

    // Background Firestore cloud check
    StorageService.initFirestoreSync().then((cloudData) => {
      if (cloudData.settings) setSettings(cloudData.settings);
      if (cloudData.slides && cloudData.slides.length > 0) setHeroSlides(cloudData.slides);
      if (cloudData.products && cloudData.products.length > 0) setProducts(cloudData.products);
    }).catch(() => {});
  }, []);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('emerald_haya_cart_v1', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart:', e);
    }
  }, [cart]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('emerald_haya_wishlist_v1', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to sync wishlist:', e);
    }
  }, [wishlistIds]);

  // Handle URL pathname and hash changes for deep linking (e.g. /admin, #/admin, /shop, etc.)
  useEffect(() => {
    const handleRoute = () => {
      const pathname = window.location.pathname.replace(/^\//, '');
      const hash = window.location.hash.replace(/^#\/?/, '');

      // Check admin path first
      if (pathname === 'admin' || pathname.startsWith('admin/') || hash === 'admin' || hash.startsWith('admin/')) {
        setActivePage('admin');
        const param = pathname.startsWith('admin/') ? pathname.replace('admin/', '') : hash.replace('admin/', '');
        setPageParam(param || null);
        return;
      }

      // Check other routes from hash or pathname
      const route = hash || pathname;
      if (route) {
        const [page, ...rest] = route.split('/');
        setActivePage(page || 'home');
        setPageParam(rest.join('/') || null);
      } else {
        setActivePage('home');
        setPageParam(null);
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Dynamic SEO title & description synchronization per page
  useEffect(() => {
    let title = `${settings.brandName} | Luxury Islamic Abayas, Stoles & Haute Couture`;
    let desc = "Discover Emerald Haya – bespoke Dubai and Saudi abayas, authentic Korean Nida, Medina silk stoles, magnetic hijab pins, and luxury modest couture.";

    if (activePage === 'shop') {
      title = `Haute Couture Boutique (${products.length}+ Pieces) | ${settings.brandName}`;
      desc = "Browse our full modest fashion collection of Dubai abayas, Saudi robes, Medina silk stoles, magnetic hijab pins, and exclusive bundle deals.";
    } else if (activePage === 'coming-soon') {
      title = `Ramadan & Eid 2026 Collection Reveal | VIP Preview · ${settings.brandName}`;
      desc = "Exclusive private preview of the upcoming Imperial Sovereign Abayas, hand-cut Farasha silks, and Austrian crystal accessories.";
    } else if (activePage === 'product' && pageParam) {
      const prod = products.find((p) => p.id === pageParam);
      if (prod) {
        title = `${prod.name} | ${settings.brandName} Dubai`;
        desc = `${prod.name} - ${prod.category} crafted from ${prod.material}. Order direct with WhatsApp Concierge delivery.`;
      }
    } else if (activePage === 'cart') {
      title = `Shopping Bag (${cart.length}) | ${settings.brandName}`;
    } else if (activePage === 'about') {
      title = `Atelier Heritage & Craftsmanship | ${settings.brandName} Dubai`;
    } else if (activePage === 'contact') {
      title = `Client Concierge & Bespoke Salon | ${settings.brandName}`;
    } else if (activePage === 'admin') {
      title = `Atelier Management Console | ${settings.brandName}`;
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
  }, [activePage, pageParam, products, settings.brandName, cart.length]);

  const navigateTo = (page: string, param?: string) => {
    setActivePage(page);
    setPageParam(param || null);
    
    // Update both history pathname and hash so /admin and all routes work flawlessly
    const cleanPath = page === 'home' ? '/' : `/${page}${param ? `/${param}` : ''}`;
    try {
      window.history.pushState(null, '', cleanPath);
    } catch {
      // Safe fallback in sandboxed iframes
    }
    window.location.hash = page === 'home' ? '' : `#/${page}${param ? `/${param}` : ''}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = { ...productData, id: newId };
    const updated = [newProduct, ...products];
    setProducts(updated);
    StorageService.saveProducts(updated);
    showToast(`Added "${newProduct.name}" to boutique catalog`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    StorageService.saveProducts(updated);
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    StorageService.saveProducts(updated);
    showToast('Product removed from catalog', 'info');
  };

  const resetProductsToDefault = () => {
    const defaults = StorageService.resetProductsToDefault();
    setProducts(defaults);
    showToast('Catalog restored to 150+ original luxury items');
  };

  // Cart Management
  const addToCart = (product: Product, size: string, color: string, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });

    showToast(`Added ${quantity} × ${product.name} (Size ${size}) to Cart`);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const cartShipping =
    cartSubtotal === 0 || cartSubtotal >= settings.freeShippingThreshold ? 0 : 25;

  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from your Wishlist', 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Added to your Wishlist');
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const moveToCartFromWishlist = (product: Product, size: string, color: string) => {
    addToCart(product, size, color, 1);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Coupon System
  const addCoupon = (newCoupon: Coupon) => {
    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    StorageService.saveCoupons(updated);
    showToast(`Promotion code "${newCoupon.code}" created`);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired promotional code' };
    }

    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Requires minimum spend of ${formatPrice(found.minSpend)}`
      };
    }

    setAppliedCoupon(found);
    showToast(`Code "${found.code}" applied! (${found.discountPercent}% OFF)`);
    return { success: true, message: `Applied ${found.discountPercent}% discount!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promotion code removed', 'info');
  };

  // WhatsApp Order Creation
  const createWhatsAppOrder = (customerData: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    orderNotes?: string;
  }) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `EH-${randomSuffix}`;
    const orderId = `order-${Date.now()}`;

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      price: item.product.price,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      quantity: item.quantity,
      image: item.product.images[0]
    }));

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerName: customerData.customerName,
      phone: customerData.phone,
      email: customerData.email,
      address: customerData.address,
      city: customerData.city,
      postalCode: customerData.postalCode,
      country: customerData.country,
      orderNotes: customerData.orderNotes,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartGrandTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
      whatsappMessageSent: true
    };

    // Save order
    StorageService.saveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

    // Format WhatsApp Message
    const itemsFormatted = orderItems
      .map(
        (it, idx) =>
          `${idx + 1}. *${it.productName}*\n   SKU: ${it.sku}\n   Size: ${it.selectedSize} | Color: ${it.selectedColor}\n   Qty: ${it.quantity} × ${formatPrice(it.price)}`
      )
      .join('\n\n');

    const discountLine = cartDiscount > 0 ? `\n• Discount (${appliedCoupon?.code}): -${formatPrice(cartDiscount)}` : '';
    const shippingLine = cartShipping === 0 ? 'Complimentary VIP Shipping' : formatPrice(cartShipping);

    const rawMessage = `✨ *EMERALD HAYA — LUXURY ORDER* ✨
━━━━━━━━━━━━━━━━━━━━
*Order Ref:* #${orderNumber}
*Date:* ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

👤 *CUSTOMER DETAILS:*
• Name: ${customerData.customerName}
• Phone: ${customerData.phone}
• Email: ${customerData.email}
• Address: ${customerData.address}, ${customerData.city} ${customerData.postalCode}, ${customerData.country}
${customerData.orderNotes ? `• Notes: ${customerData.orderNotes}\n` : ''}
🛍️ *ORDERED ITEMS:*
${itemsFormatted}

━━━━━━━━━━━━━━━━━━━━
💰 *FINANCIAL SUMMARY:*
• Subtotal: ${formatPrice(cartSubtotal)}${discountLine}
• Delivery: ${shippingLine}
• *Grand Total: ${formatPrice(cartGrandTotal)}*
• Payment: Cash on Delivery / Bank Transfer upon confirmation

Kindly confirm availability and atelier dispatch timeline. Thank you!`;

    // Construct WhatsApp link
    const cleanWhatsappNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodedText}`;

    // Clear cart after placing order
    clearCart();

    return { order: newOrder, whatsappUrl };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = StorageService.updateOrderStatus(orderId, status);
    setOrders(updated);
    showToast(`Order status updated to "${status.toUpperCase()}"`);
  };

  const getOrderById = (orderIdOrNumber: string) => {
    const clean = orderIdOrNumber.trim().toUpperCase().replace('#', '');
    return orders.find(
      (o) => o.id === orderIdOrNumber || o.orderNumber.toUpperCase().replace('#', '') === clean || o.phone.includes(clean)
    );
  };

  // Settings
  const updateSettings = (newSettings: StoreSettings) => {
    StorageService.saveSettings(newSettings);
    setSettings(newSettings);
    showToast('Store settings and WhatsApp configuration updated');
  };

  // Hero Slides
  const updateHeroSlides = (slides: HeroSlide[]) => {
    StorageService.saveHeroSlides(slides);
    setHeroSlides(slides);
    showToast('Hero sliders updated');
  };

  // Reviews
  const addCustomerReview = (reviewData: Omit<Review, 'id' | 'date' | 'isApproved'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isApproved: true // Auto-approved for instant satisfaction, admin can moderate
    };
    const updated = StorageService.addReview(newRev);
    setReviews(updated);
    showToast('Thank you! Your verified review has been published.');
  };

  const toggleReviewApproval = (reviewId: string, isApproved: boolean) => {
    const updated = reviews.map((r) => (r.id === reviewId ? { ...r, isApproved } : r));
    setReviews(updated);
    StorageService.saveReviews(updated);
    showToast(`Review ${isApproved ? 'Approved' : 'Hidden'}`);
  };

  // Currency Converter & Formatter
  const formatPrice = (usdAmount: number): string => {
    const curr = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = Math.round(usdAmount * curr.rate);
    if (curr.position === 'prefix') {
      return `${curr.symbol}${converted.toLocaleString()}`;
    }
    return `${converted.toLocaleString()}${curr.symbol}`;
  };

  // Admin Session
  const setAdminStatus = (status: boolean) => {
    StorageService.setAdminLoggedIn(status);
    setIsAdmin(status);
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        pageParam,
        navigateTo,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartGrandTotal,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        coupons,
        addCoupon,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createWhatsAppOrder,
        updateOrderStatus,
        getOrderById,
        settings,
        updateSettings,
        heroSlides,
        updateHeroSlides,
        reviews,
        addCustomerReview,
        toggleReviewApproval,
        currency,
        setCurrency,
        formatPrice,
        toasts,
        showToast,
        removeToast,
        isAdmin,
        setAdminStatus,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
