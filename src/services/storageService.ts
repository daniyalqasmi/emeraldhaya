import { 
  Product, 
  Category, 
  Order, 
  Coupon, 
  StoreSettings, 
  HeroSlide, 
  Review, 
  ContactMessage 
} from '../types';
import { 
  SEED_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_COUPONS, 
  INITIAL_SETTINGS, 
  INITIAL_HERO_SLIDES, 
  INITIAL_REVIEWS 
} from './seedData';
import { db } from './firebaseConfig';
import { 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc,
  collection, 
  getDocs, 
  writeBatch 
} from 'firebase/firestore';

const STORAGE_KEYS = {
  PRODUCTS: 'emerald_haya_products_v1',
  CATEGORIES: 'emerald_haya_categories_v1',
  ORDERS: 'emerald_haya_orders_v1',
  COUPONS: 'emerald_haya_coupons_v1',
  SETTINGS: 'emerald_haya_settings_v1',
  HERO_SLIDES: 'emerald_haya_hero_slides_v1',
  REVIEWS: 'emerald_haya_reviews_v1',
  MESSAGES: 'emerald_haya_messages_v1',
  NEWSLETTER: 'emerald_haya_newsletter_v1',
  CART: 'emerald_haya_cart_v1',
  WISHLIST: 'emerald_haya_wishlist_v1',
  ADMIN_AUTH: 'emerald_haya_admin_session_v1',
  LAST_FIREBASE_SYNC: 'emerald_haya_last_firebase_sync'
};

export const StorageService = {
  // Products
  getProducts(): Product[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading products from storage:', e);
    }
    // Seed initial products
    this.saveProducts(SEED_PRODUCTS);
    return SEED_PRODUCTS;
  },

  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      // Asynchronously sync index to Firebase Firestore
      this.syncProductsToFirestore(products).catch((err) => {
        console.warn('Firestore products sync notice:', err?.message || err);
      });
    } catch (e) {
      console.error('Error saving products:', e);
    }
  },

  async saveSingleProductToFirestore(product: Product): Promise<void> {
    if (!db) return;
    try {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      localStorage.setItem(STORAGE_KEYS.LAST_FIREBASE_SYNC, new Date().toISOString());
    } catch (e) {
      console.warn('Firebase Firestore single product sync notice:', e);
    }
  },

  async deleteProductFromFirestore(id: string): Promise<void> {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      localStorage.setItem(STORAGE_KEYS.LAST_FIREBASE_SYNC, new Date().toISOString());
    } catch (e) {
      console.warn('Firebase Firestore delete product notice:', e);
    }
  },

  async syncProductsToFirestore(products: Product[]): Promise<void> {
    if (!db) return;
    try {
      // Save top products and catalog index document (without oversized payload)
      const sanitized = products.slice(0, 100).map(p => ({
        ...p,
        // If image is a local data url, keep it, but ensure doc doesn't explode
        images: p.images.slice(0, 2)
      }));

      await setDoc(doc(db, 'catalog', 'all_products'), {
        updatedAt: new Date().toISOString(),
        count: products.length,
        items: sanitized
      }, { merge: true });

      localStorage.setItem(STORAGE_KEYS.LAST_FIREBASE_SYNC, new Date().toISOString());
    } catch (e) {
      console.warn('Firebase Firestore product sync notice:', e);
    }
  },

  resetProductsToDefault(): Product[] {
    this.saveProducts(SEED_PRODUCTS);
    return SEED_PRODUCTS;
  },

  // Categories
  getCategories(): Category[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_CATEGORIES.length) return parsed;
      }
    } catch (e) {
      console.error('Error reading categories:', e);
    }
    this.saveCategories(INITIAL_CATEGORIES);
    return INITIAL_CATEGORIES;
  },

  saveCategories(categories: Category[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      if (db) {
        setDoc(doc(db, 'content', 'categories'), {
          categories,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  },

  // Orders
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading orders:', e);
    }
    return [];
  },

  saveOrder(order: Order): void {
    try {
      const current = this.getOrders();
      const updated = [order, ...current];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

      // Asynchronously persist to Firebase Firestore
      if (db) {
        setDoc(doc(db, 'orders', order.id), {
          ...order,
          savedAt: new Date().toISOString()
        }, { merge: true }).catch((err) => {
          console.warn('Firestore order sync notice:', err);
        });
      }
    } catch (e) {
      console.error('Error saving order:', e);
    }
  },

  updateOrderStatus(orderId: string, status: Order['status']): Order[] {
    const orders = this.getOrders();
    const updated = orders.map(ord => ord.id === orderId ? { ...ord, status } : ord);
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      if (db) {
        setDoc(doc(db, 'orders', orderId), { status, updatedAt: new Date().toISOString() }, { merge: true }).catch(() => {});
      }
    } catch (e) {
      console.error('Error updating order status:', e);
    }
    return updated;
  },

  // Coupons
  getCoupons(): Coupon[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COUPONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading coupons:', e);
    }
    this.saveCoupons(INITIAL_COUPONS);
    return INITIAL_COUPONS;
  },

  saveCoupons(coupons: Coupon[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
      if (db) {
        setDoc(doc(db, 'content', 'coupons'), {
          coupons,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving coupons:', e);
    }
  },

  // Settings
  getSettings(): StoreSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading settings:', e);
    }
    this.saveSettings(INITIAL_SETTINGS);
    return INITIAL_SETTINGS;
  },

  saveSettings(settings: StoreSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      // Asynchronously sync to Firebase Firestore across both config documents
      if (db) {
        const payload = {
          ...settings,
          updatedAt: new Date().toISOString()
        };
        Promise.all([
          setDoc(doc(db, 'settings', 'general'), payload, { merge: true }),
          setDoc(doc(db, 'settings', 'store'), payload, { merge: true })
        ]).then(() => {
          localStorage.setItem(STORAGE_KEYS.LAST_FIREBASE_SYNC, new Date().toISOString());
        }).catch((err) => {
          console.warn('Firestore settings sync notice:', err);
        });
      }
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  },

  // Hero Slides
  getHeroSlides(): HeroSlide[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading hero slides:', e);
    }
    this.saveHeroSlides(INITIAL_HERO_SLIDES);
    return INITIAL_HERO_SLIDES;
  },

  saveHeroSlides(slides: HeroSlide[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(slides));
      // Asynchronously sync to Firebase Firestore
      if (db) {
        setDoc(doc(db, 'content', 'heroSlides'), {
          slides,
          updatedAt: new Date().toISOString()
        }, { merge: true }).then(() => {
          localStorage.setItem(STORAGE_KEYS.LAST_FIREBASE_SYNC, new Date().toISOString());
        }).catch((err) => {
          console.warn('Firestore hero slides sync notice:', err);
        });
      }
    } catch (e) {
      console.error('Error saving hero slides:', e);
    }
  },

  // Reviews
  getReviews(): Review[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading reviews:', e);
    }
    this.saveReviews(INITIAL_REVIEWS);
    return INITIAL_REVIEWS;
  },

  saveReviews(reviews: Review[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
      if (db) {
        setDoc(doc(db, 'content', 'reviews'), {
          reviews,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving reviews:', e);
    }
  },

  addReview(review: Review): Review[] {
    const reviews = this.getReviews();
    const updated = [review, ...reviews];
    this.saveReviews(updated);
    return updated;
  },

  // Contact messages
  getMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading messages:', e);
    }
    return [];
  },

  saveMessage(msg: ContactMessage): void {
    try {
      const msgs = this.getMessages();
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([msg, ...msgs]));
      if (db) {
        setDoc(doc(db, 'messages', msg.id), {
          ...msg,
          receivedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }
    } catch (e) {
      console.error('Error saving message:', e);
    }
  },

  // Newsletter
  subscribeNewsletter(email: string): boolean {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
      }
      if (db) {
        const subscriberId = email.replace(/[^a-zA-Z0-9]/g, '_');
        setDoc(doc(db, 'newsletter_subscribers', subscriberId), {
          email,
          subscribedAt: new Date().toISOString()
        }, { merge: true }).catch(() => {});
      }
      return true;
    } catch (e) {
      console.error('Error subscribing to newsletter:', e);
      return false;
    }
  },

  getNewsletterSubscribers(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  // Full manual or triggered backup to Firebase
  async pushAllToFirestore(payload: {
    products?: Product[];
    settings?: StoreSettings;
    slides?: HeroSlide[];
    categories?: Category[];
  }): Promise<{ success: boolean; message: string }> {
    if (!db) {
      return { success: false, message: 'Firebase is not initialized' };
    }
    try {
      const operations: Promise<any>[] = [];

      if (payload.settings) {
        operations.push(setDoc(doc(db, 'settings', 'general'), {
          ...payload.settings,
          updatedAt: new Date().toISOString()
        }, { merge: true }));
        operations.push(setDoc(doc(db, 'settings', 'store'), {
          ...payload.settings,
          updatedAt: new Date().toISOString()
        }, { merge: true }));
      }

      if (payload.slides && payload.slides.length > 0) {
        operations.push(setDoc(doc(db, 'content', 'heroSlides'), {
          slides: payload.slides,
          updatedAt: new Date().toISOString()
        }, { merge: true }));
      }

      if (payload.products && payload.products.length > 0) {
        // Save catalog index
        operations.push(setDoc(doc(db, 'catalog', 'all_products'), {
          updatedAt: new Date().toISOString(),
          count: payload.products.length,
          items: payload.products.slice(0, 100)
        }, { merge: true }));

        // Save top 20 custom / modified products to individual docs
        payload.products.slice(0, 30).forEach((p) => {
          operations.push(setDoc(doc(db, 'products', p.id), {
            ...p,
            updatedAt: new Date().toISOString()
          }, { merge: true }));
        });
      }

      await Promise.all(operations);
      const timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.LAST_FIREBASE_SYNC, timestamp);
      return { success: true, message: `Successfully synced all boutique data to Firebase Firestore at ${new Date().toLocaleTimeString()}` };
    } catch (e: any) {
      console.error('Firebase full push error:', e);
      return { success: false, message: e?.message || 'Failed to sync with Firebase' };
    }
  },

  // Try fetching any remotely updated Firestore data on initialization
  async initFirestoreSync(): Promise<{
    settings?: StoreSettings;
    slides?: HeroSlide[];
    products?: Product[];
  }> {
    if (!db) return {};
    try {
      const [settingsSnap, storeSettingsSnap, slidesSnap, catalogSnap] = await Promise.all([
        getDoc(doc(db, 'settings', 'general')).catch(() => null),
        getDoc(doc(db, 'settings', 'store')).catch(() => null),
        getDoc(doc(db, 'content', 'heroSlides')).catch(() => null),
        getDoc(doc(db, 'catalog', 'all_products')).catch(() => null)
      ]);

      const result: {
        settings?: StoreSettings;
        slides?: HeroSlide[];
        products?: Product[];
      } = {};

      const activeSettingsSnap = storeSettingsSnap?.exists() ? storeSettingsSnap : settingsSnap;
      if (activeSettingsSnap && activeSettingsSnap.exists()) {
        const remoteSettings = activeSettingsSnap.data() as StoreSettings;
        if (remoteSettings.brandName) {
          result.settings = remoteSettings;
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(remoteSettings));
        }
      }

      if (slidesSnap && slidesSnap.exists()) {
        const remoteSlides = slidesSnap.data()?.slides as HeroSlide[];
        if (Array.isArray(remoteSlides) && remoteSlides.length > 0) {
          result.slides = remoteSlides;
          localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(remoteSlides));
        }
      }

      // Check if individual products collection has entries
      try {
        const productsColSnap = await getDocs(collection(db, 'products'));
        if (!productsColSnap.empty) {
          const remoteColProducts: Product[] = [];
          productsColSnap.forEach(d => {
            const data = d.data() as Product;
            if (data && data.name && data.price) {
              remoteColProducts.push(data);
            }
          });

          if (remoteColProducts.length > 0) {
            const local = this.getProducts();
            const map = new Map<string, Product>();
            local.forEach(p => map.set(p.id, p));
            remoteColProducts.forEach(p => map.set(p.id, p));
            const merged = Array.from(map.values());
            result.products = merged;
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(merged));
          }
        } else if (catalogSnap && catalogSnap.exists()) {
          const remoteProducts = catalogSnap.data()?.items as Product[];
          if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
            result.products = remoteProducts;
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(remoteProducts));
          }
        }
      } catch (e) {
        // Fallback to catalog doc
        if (catalogSnap && catalogSnap.exists()) {
          const remoteProducts = catalogSnap.data()?.items as Product[];
          if (Array.isArray(remoteProducts) && remoteProducts.length > 0) {
            result.products = remoteProducts;
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(remoteProducts));
          }
        }
      }

      return result;
    } catch (e) {
      console.warn('Firestore initial sync notice:', e);
      return {};
    }
  },

  getLastFirebaseSync(): string | null {
    return localStorage.getItem(STORAGE_KEYS.LAST_FIREBASE_SYNC);
  },

  // Admin Session
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  },

  setAdminLoggedIn(value: boolean): void {
    if (value) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  }
};
