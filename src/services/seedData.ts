import { Product, Category, HeroSlide, Coupon, StoreSettings, BlogPost, Review } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_abaya_1791077080316.jpg';
export const DUBAI_IMAGE = '/src/assets/images/category_dubai_silk_1791077094623.jpg';
export const KIMONO_IMAGE = '/src/assets/images/category_open_kimono_1791077109151.jpg';
export const ATELIER_IMAGE = '/src/assets/images/brand_craftsmanship_1791077128183.jpg';

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: 'Emerald Haya',
  tagline: 'Haute Couture Islamic Abayas & Modest Elegance',
  logoUrl: '/src/assets/logo.svg',
  whatsappNumber: '971501234567', // Standard UAE concierge number (admin can change in dashboard)
  storeEmail: 'concierge@emeraldhaya.com',
  storePhone: '+971 4 388 9200',
  address: 'Unit 402, Fashion Avenue, Downtown Dubai, United Arab Emirates',
  freeShippingThreshold: 250,
  currency: 'USD',
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_Example/viewform?embedded=true',
  announcementText: 'Complimentary Silk Sheila Hijab with every Dubai Haute Couture order · Worldwide Express Delivery',
  instagramUrl: 'https://instagram.com/emeraldhayaofficial'
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'The Royal Emerald Collection',
    subtitle: 'Dubai Haute Couture 2026',
    tagline: 'Hand-woven Korean Nida silk embellished with 24K gold metallic filigree embroidery.',
    ctaText: 'Explore Haute Couture',
    categoryFilter: 'Dubai Collection',
    image: HERO_IMAGE,
    isActive: true
  },
  {
    id: 'slide-2',
    title: 'Minimalist Open Kimono Edit',
    subtitle: 'Contemporary Modesty',
    tagline: 'Tailored from heavyweight Japanese matte crepe for graceful silhouettes and timeless fluidity.',
    ctaText: 'Discover Kimono Abayas',
    categoryFilter: 'Kimono Abayas',
    image: KIMONO_IMAGE,
    isActive: true
  },
  {
    id: 'slide-3',
    title: 'Artisanal Atelier Craftsmanship',
    subtitle: 'Bespoke Gulf Heritage',
    tagline: 'Each abaya requires up to 48 hours of master hand-sewn crystal beadwork and needlecraft.',
    ctaText: 'Shop Luxury Collection',
    categoryFilter: 'Luxury Collection',
    image: ATELIER_IMAGE,
    isActive: true
  },
  {
    id: 'slide-4',
    title: 'The Saudi Royal Farasha',
    subtitle: 'Regal Flow & Opulence',
    tagline: 'Graceful butterfly drape cut from featherlight crepe with delicate French Chantilly lace.',
    ctaText: 'View Farasha Abayas',
    categoryFilter: 'Farasha Abayas',
    image: DUBAI_IMAGE,
    isActive: true
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-dubai', name: 'Dubai Collection', slug: 'dubai-collection', description: 'Gilded Dubai silk crepe, bespoke cuts & hand-embroidered royal hems.', image: DUBAI_IMAGE, productCount: 16 },
  { id: 'cat-saudi', name: 'Saudi Collection', slug: 'saudi-collection', description: 'Traditional Najdi & Hijazi silhouettes in rich obsidian Nida fabric.', image: HERO_IMAGE, productCount: 14 },
  { id: 'cat-luxury', name: 'Luxury Collection', slug: 'luxury-collection', description: 'Haute couture pieces with genuine Swarovski crystal and gold bullion thread.', image: ATELIER_IMAGE, productCount: 14 },
  { id: 'cat-open', name: 'Open Abayas', slug: 'open-abayas', description: 'Versatile front-open robes crafted for elegant layering day and evening.', image: KIMONO_IMAGE, productCount: 12 },
  { id: 'cat-kimono', name: 'Kimono Abayas', slug: 'kimono-abayas', description: 'Modern Japanese silhouette influences with wide statement sleeves.', image: KIMONO_IMAGE, productCount: 12 },
  { id: 'cat-farasha', name: 'Farasha Abayas', slug: 'farasha-abayas', description: 'Butterfly draping inspired by regal Arabian desert grandeur.', image: DUBAI_IMAGE, productCount: 10 },
  { id: 'cat-nida', name: 'Nida Abayas', slug: 'nida-abayas', description: 'Crafted from authentic Grade-A Korean Nida for effortless drape & breathability.', image: HERO_IMAGE, productCount: 14 },
  { id: 'cat-butterfly', name: 'Butterfly Abayas', slug: 'butterfly-abayas', description: 'Ultra-wide billowing wings with tailored inner cuffs for pure comfort.', image: DUBAI_IMAGE, productCount: 10 },
  { id: 'cat-printed', name: 'Printed Abayas', slug: 'printed-abayas', description: 'Artisanal floral, geometric arabesque and luxury marble prints.', image: ATELIER_IMAGE, productCount: 10 },
  { id: 'cat-party', name: 'Party Wear', slug: 'party-wear', description: 'Glamorous evening abayas designed for weddings, Eid, and celebrations.', image: DUBAI_IMAGE, productCount: 12 },
  { id: 'cat-casual', name: 'Casual Wear', slug: 'casual-wear', description: 'Lightweight linen, cotton-blend & wrinkle-resistant daily luxury.', image: KIMONO_IMAGE, productCount: 12 },
  { id: 'cat-prayer', name: 'Prayer Abayas', slug: 'prayer-abayas', description: 'One-piece breathable modal & rayon abayas with attached head coverings.', image: HERO_IMAGE, productCount: 10 },
  { id: 'cat-premium', name: 'Premium Collection', slug: 'premium-collection', description: 'Curated limited-edition drops made from imported Italian silk blends.', image: ATELIER_IMAGE, productCount: 14 },
  { id: 'cat-deals', name: 'Abaya & Stole Combo Deals', slug: 'combo-deals', description: 'Complete 3-piece luxury bundle deals including Abaya, Medina silk stole, and gold magnetic pin with special savings.', image: DUBAI_IMAGE, productCount: 10 },
  { id: 'cat-stoles', name: 'Stoles & Sheilas', slug: 'stoles-sheilas', description: 'Maxi Medina silk, Turkish chiffon, and crinkle georgette luxury stoles & wraps.', image: HERO_IMAGE, productCount: 12 },
  { id: 'cat-pins', name: 'Magnetic Pins & Brooches', slug: 'magnetic-pins', description: 'Ultra-hold no-snag magnetic hijab fasteners, crystal clasps and artisan 24K brooches.', image: ATELIER_IMAGE, productCount: 10 },
  { id: 'cat-hijabs', name: 'Hijabs & Accessories', slug: 'hijabs-accessories', description: 'Handmade Chiffon sheilas, Medina silk scarves, and magnetized abaya pins.', image: DUBAI_IMAGE, productCount: 12 }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'EMERALD20', discountPercent: 20, minSpend: 150, isActive: true, description: '20% OFF on all luxury abayas for orders above $150' },
  { code: 'WELCOME10', discountPercent: 10, minSpend: 80, isActive: true, description: '10% OFF for new Emerald Haya connoisseurs' },
  { code: 'RAMADAN25', discountPercent: 25, minSpend: 300, isActive: true, description: '25% OFF exclusive Festive Haute Couture collection' }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Art of Korean Nida: Why It Defines High-End Abayas',
    slug: 'art-of-korean-nida-silk',
    excerpt: 'Explore the textile science behind authentic 100% Korean Nida fabric, celebrated for its buttery feel, cooling breathability, and wrinkle-resistant longevity.',
    content: `When selecting a luxury abaya, the fabric represents more than just a surface: it dictates how the garment drapes, breathes under Gulf temperatures, and sustains its deep obsidian hue over years of wear. 

Pure Korean Nida is widely revered across Dubai, Doha, and Riyadh as the gold standard of abaya textiles. Unlike blended synthetic polyesters that trap warmth and exhibit an unnatural synthetic shine, premium Korean Nida is woven from micro-filament threads that impart a subtle matte luster, a cool hand-feel, and a heavy, graceful cascade that falls effortlessly to the floor.

At Emerald Haya, each bolt of Nida is inspected for thread density and dye depth before our master pattern cutters begin precision tailoring.`,
    coverImage: ATELIER_IMAGE,
    author: 'Amina Al-Mansoor',
    date: 'March 14, 2026',
    readTime: '5 min read',
    category: 'Textile Heritage'
  },
  {
    id: 'blog-2',
    title: 'How to Style Open Front Kimono Abayas for Evening & Day',
    slug: 'styling-open-front-kimono-abayas',
    excerpt: 'From tailored linen slip dresses to wide-leg silk trousers, master the layered look of contemporary modest couture.',
    content: `The open-front kimono abaya has redefined contemporary modest wear, bridging the gap between modest tradition and cosmopolitan elegance. Its flowing silhouette enables limitless versatile pairings.

For daytime meetings, pair a forest green or sand-hued open abaya with an ecru cotton slip dress and leather slides. When transitioning to evening banquets, layer a midnight black satin-trimmed kimono abaya over tailored raw silk trousers and metallic heels, accentuating the look with a contrasting hand-tied silk belt.`,
    coverImage: KIMONO_IMAGE,
    author: 'Layla El-Sayed',
    date: 'February 28, 2026',
    readTime: '4 min read',
    category: 'Styling Guide'
  },
  {
    id: 'blog-3',
    title: 'Behind the Seams: 48 Hours of Gold Bullion Threadwork',
    slug: 'behind-the-seams-gold-bullion-threadwork',
    excerpt: 'Step inside our Dubai design studio to witness how traditional Zardozi artisans craft our signature sleeve borders.',
    content: `Every bespoke abaya in the Emerald Haya Royal Collection passes through the hands of three distinct artisans. First, the pattern is chalked onto high-density Nida. Second, master embroiderers hand-guide metallic gold thread alongside micro-faceted crystal seed beads. Finally, our finishing tailors line every cuff with soft modal so the embroidery never chafes the wrists.`,
    coverImage: HERO_IMAGE,
    author: 'Zahra Qureshi',
    date: 'January 19, 2026',
    readTime: '6 min read',
    category: 'Atelier Stories'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'EH-DB-001',
    customerName: 'Fatima Al-Nuaimi',
    customerCity: 'Dubai, UAE',
    rating: 5,
    comment: 'The quality of the Korean Nida is extraordinary. The gold embroidery on the cuffs catches the light with subtle sophistication without looking overstated. Delivered within 48 hours in luxury scented packaging.',
    date: 'March 24, 2026',
    isVerified: true,
    isApproved: true
  },
  {
    id: 'rev-2',
    productId: 'EH-DB-001',
    customerName: 'Sarah K.',
    customerCity: 'London, UK',
    rating: 5,
    comment: 'I ordered size 56 and the length is immaculate. The weight of the drape is heavy and modest, exactly as described. WhatsApp concierge was so helpful in confirming my measurements!',
    date: 'March 18, 2026',
    isVerified: true,
    isApproved: true
  },
  {
    id: 'rev-3',
    productId: 'EH-KM-021',
    customerName: 'Maryam Al-Sabah',
    customerCity: 'Kuwait City, Kuwait',
    rating: 5,
    comment: 'The kimono sleeves are so beautifully cut. I receive compliments every time I wear it to formal family dinners. Emerald Haya has become my definitive abaya brand.',
    date: 'March 10, 2026',
    isVerified: true,
    isApproved: true
  }
];

// Helper to generate the 150+ realistic luxury demo products across all collections
function generate150Products(): Product[] {
  const products: Product[] = [];

  const categoryConfigs: {
    category: string;
    prefix: string;
    count: number;
    basePrice: number;
    materials: string[];
    colors: string[];
    titles: string[];
  }[] = [
    {
      category: 'Dubai Collection',
      prefix: 'EH-DB',
      count: 16,
      basePrice: 280,
      materials: ['Pure Korean Nida', 'Japanese Silk Crepe', 'Embossed Royal Chiffon', 'Medina Silk'],
      colors: ['Emerald Green', 'Obsidian Black', 'Desert Champagne', 'Midnight Navy', 'Pewter Grey'],
      titles: [
        'Sultana Royal Embroidered Dubai Abaya',
        'Al-Maha Gold Threaded Silk Abaya',
        'Burj Minimalist Crepe Robe',
        'Jumeirah Layered Organza Abaya',
        'Zomorrod Emerald Haute Abaya',
        'Noor Crystal Embellished Nida Abaya',
        'Deira Heritage Filigree Abaya',
        'Palm Royal French Lace Abaya',
        'Marina Sleek Flared Dubai Coat',
        'Al-Andalus Arabesque Silk Abaya',
        'Hadeel Hand-Stitched Pearl Abaya',
        'Reem Cascading Pleated Dubai Abaya',
        'Meydan Structured Velvet Abaya',
        'Sahara Golden Hour Crepe Abaya',
        'Zubaida Royal Court Abaya',
        'Firdous Pure Silk Dubai Sheila Set'
      ]
    },
    {
      category: 'Saudi Collection',
      prefix: 'EH-SD',
      count: 14,
      basePrice: 240,
      materials: ['Grade-A Saudi Crepe', 'Korean Nida Obsidian', 'Matte Silk Wool Blend', 'Crinkled Georgette'],
      colors: ['Noir Black', 'Deep Olive', 'Midnight Navy', 'Charcoal Slate'],
      titles: [
        'Riyadh Traditional Classic Black Abaya',
        'Najdi Flared High-Neck Abaya',
        'Hijaz Embroidered Bisht Abaya',
        'Diriyah Heritage Gold Border Abaya',
        'Asir Hand-Woven Accent Abaya',
        'Khobar Modern Minimalist Saudi Abaya',
        'Jeddah Breeze Textured Linen Abaya',
        'Qassim Traditional Closed Front Abaya',
        'Al-Ula Sandstone Toned Crepe Abaya',
        'Taif Rose Embellished Saudi Abaya',
        'Rawdah Structured Shoulder Abaya',
        'Bayan Pure Wool Winter Saudi Abaya',
        'Murabba Royal Velvet Trim Abaya',
        'Safwa Pristine Jet Black Nida Abaya'
      ]
    },
    {
      category: 'Luxury Collection',
      prefix: 'EH-LX',
      count: 14,
      basePrice: 420,
      materials: ['Italian Silk Organza', 'Korean Heavyweight Nida', 'French Chantilly Lace', 'Pure Raw Silk'],
      colors: ['Deep Emerald', 'Noir Jet', 'Champagne Gold', 'Royal Amethyst', 'Antique Rose'],
      titles: [
        'The Sovereign 24K Gold Embroidered Abaya',
        'Couture Crystal Waterfall Evening Abaya',
        'Imperial Emerald Velvet Trimmed Abaya',
        'Grand Palais Silk Organza Layered Abaya',
        'Chantilly Heirloom Lace Overlay Abaya',
        'Opulence Hand-Beaded Pearl Couture Abaya',
        'Verona Metallic Brocade Luxury Abaya',
        'Majestic Swan Featherlight Silk Abaya',
        'Diva Zardozi Masterwork Bridal Abaya',
        'Versailles Gilded Filigree Abaya',
        'Elysian Pure Mulberry Silk Abaya',
        'Symphony Pleated Metallic Silk Abaya',
        'Celestial Crystal Starscape Abaya',
        'The Empress Diamond-Cut Beadwork Abaya'
      ]
    },
    {
      category: 'Open Abayas',
      prefix: 'EH-OP',
      count: 12,
      basePrice: 195,
      materials: ['Japanese Crepe', 'Lightweight Korean Nida', 'Matte Twill', 'Bamboo Viscose'],
      colors: ['Sage Green', 'Dusty Rose', 'Charcoal Black', 'Soft Taupe', 'Navy Blue'],
      titles: [
        'Lina Fluid Drape Open Front Abaya',
        'Ayah Reversible Two-Tone Open Abaya',
        'Soraya Minimalist Collarless Open Robe',
        'Hala Ribbed Texture Open Duster Abaya',
        'Talia Raw Edge Linen Blend Open Abaya',
        'Salma Kimono-Cut Open Front Abaya',
        'Dania Gold Edge Contrast Open Abaya',
        'Kenza Puffed Cuff Open Abaya',
        'Maha Split-Hem Relaxed Open Abaya',
        'Lubna Textured Satin Open Abaya',
        'Nadine Cascading Lapel Open Abaya',
        'Rawan Tailored Trench Style Open Abaya'
      ]
    },
    {
      category: 'Kimono Abayas',
      prefix: 'EH-KM',
      count: 12,
      basePrice: 210,
      materials: ['Japanese Peach Skin Fabric', 'Korean Matte Nida', 'Crepe de Chine', 'Washed Cupro'],
      colors: ['Olive Drab', 'Earthy Terracotta', 'Obsidian Black', 'Sand Beige', 'Emerald Tint'],
      titles: [
        'Kyoto Fluid Wide Sleeve Kimono Abaya',
        'Tokyo Contemporary Oversized Kimono Abaya',
        'Zara Dropped Shoulder Kimono Robe',
        'Nara Contrast Cuff Kimono Abaya',
        'Sora Minimalist Sash Kimono Abaya',
        'Kimi Japanese Satin Finish Abaya',
        'Amari Wide Bell Sleeve Kimono Abaya',
        'Hana Floral Brocade Kimono Abaya',
        'Rin Crisp Linen Kimono Abaya',
        'Mei Architectural Cut Kimono Abaya',
        'Sakura Delicate Blossom Trim Kimono',
        'Kenzo Tailored Wrap Kimono Abaya'
      ]
    },
    {
      category: 'Farasha Abayas',
      prefix: 'EH-FR',
      count: 10,
      basePrice: 230,
      materials: ['Korean Chiffon Poly', 'Silky Nida', 'Georgette Crepe'],
      colors: ['Midnight Black', 'Deep Maroon', 'Forest Green', 'Royal Plum', 'Espresso Brown'],
      titles: [
        'Sultana Billowing Farasha Abaya',
        'Qamar Crescent Embroidered Butterfly Abaya',
        'Layali Desert Night Farasha Abaya',
        'Wardah Rose Gold Cuffed Farasha',
        'Ghazal Fluid Silhouette Farasha Abaya',
        'Samar Golden Border Butterfly Abaya',
        'Najwa Pleated Farasha Evening Gown',
        'Tasneem Crystal Neckline Farasha Abaya',
        'Jawaher Royal Drape Farasha Abaya',
        'Badriya Lightweight Summer Farasha'
      ]
    },
    {
      category: 'Nida Abayas',
      prefix: 'EH-ND',
      count: 14,
      basePrice: 185,
      materials: ['100% Authentic Korean Nida', 'Korean Micro-Nida', 'Peach Nida Premium'],
      colors: ['Classic Jet Black', 'Deep Teal', 'Charcoal', 'Navy Blue', 'Coffee Brown'],
      titles: [
        'Al-Aseel Everyday Pure Korean Nida Abaya',
        'Mithaq Clean Line Tailored Nida Abaya',
        'Salsabil Elasticated Cuff Nida Abaya',
        'Yusra Hidden Zipper Front Nida Abaya',
        'Arwa Double Breasted Nida Abaya',
        'Basma Soft Collar Everyday Nida Robe',
        'Ghadir Flared Sweep Korean Nida Abaya',
        'Hikma Premium Heavyweight Nida Abaya',
        'Kawthar Mandarin Collar Nida Abaya',
        'Manal Wrinkle-Free Workwear Nida Abaya',
        'Nawal Delicate Pearl Studded Nida Abaya',
        'Ruba Tiered Hem Korean Nida Abaya',
        'Shams Lightweight Breathable Nida Abaya',
        'Tamara Classic Umrah & Hajj Nida Abaya'
      ]
    },
    {
      category: 'Butterfly Abayas',
      prefix: 'EH-BT',
      count: 10,
      basePrice: 215,
      materials: ['Flowing Crepe', 'Korean Silk Georgette', 'Featherlight Nida'],
      colors: ['Noir Black', 'Burgundy', 'Pine Green', 'Charcoal Grey'],
      titles: [
        'Mona Cascading Butterfly Wing Abaya',
        'Dina Inner-Belt Fitted Butterfly Abaya',
        'Isra Crystal Sprinkled Butterfly Abaya',
        'Jana Soft Silhouette Butterfly Abaya',
        'Ranya Wide Sleeve Modest Butterfly Abaya',
        'Wafa Gathered Cuff Butterfly Abaya',
        'Yara Arabian Princess Butterfly Abaya',
        'Zeina Royal Purple Butterfly Abaya',
        'Ghaida Graceful Draped Butterfly Abaya',
        'Aseel Featherlight Butterfly Robe'
      ]
    },
    {
      category: 'Printed Abayas',
      prefix: 'EH-PR',
      count: 10,
      basePrice: 205,
      materials: ['Digital Printed Satin Crepe', 'Printed Silk Georgette', 'Viscose Twill'],
      colors: ['Floral Emerald', 'Monochrome Arabesque', 'Marbled Gold & Black', 'Indigo Paisley'],
      titles: [
        'Arabesque Geometric Print Silk Abaya',
        'Damascene Botanical Watercolor Abaya',
        'Golden Palm Digital Print Abaya',
        'Ottoman Tile Motif Linen Abaya',
        'Verdant Garden Chiffon Overlay Abaya',
        'Celestial Constellation Print Abaya',
        'Mirage Abstract Sand Dune Abaya',
        'Jasmine Blossom Monochrome Abaya',
        'Moroccan Mosaic Trim Print Abaya',
        'Andalusian Baroque Silk Print Abaya'
      ]
    },
    {
      category: 'Party Wear',
      prefix: 'EH-PW',
      count: 12,
      basePrice: 320,
      materials: ['Metallic Brocade', 'Sequin Embroidered Mesh', 'Crushed Velvet', 'Heavy Satin'],
      colors: ['Gilded Gold', 'Emerald Glitter', 'Midnight Onyx', 'Burgundy Wine', 'Champagne Pearl'],
      titles: [
        'Zahra Sequined Galore Evening Abaya',
        'Laylaty Metallic Thread Gala Abaya',
        'Soraya Mirrorwork Wedding Abaya',
        'Lulu Crystal Fringe Glamour Abaya',
        'Rabab Velvet Bodice Celebration Abaya',
        'Nourhane Shimmer Mesh Luxury Abaya',
        'Balqis Embroidered Cape Abaya',
        'Shahd Golden Brocade Festive Abaya',
        'Inaya Silver Leaf Threadwork Abaya',
        'Farah Crystal Bordered Banquet Abaya',
        'Afnan Beaded Flare Formal Abaya',
        'Jumana Royal Reception Satin Abaya'
      ]
    },
    {
      category: 'Casual Wear',
      prefix: 'EH-CW',
      count: 12,
      basePrice: 155,
      materials: ['Pre-Washed Pure Linen', 'Cotton Crepe', 'Rayon Twill', 'Bamboo Modal'],
      colors: ['Warm Oatmeal', 'Moss Green', 'Jet Black', 'Denim Blue', 'Soft Khaki'],
      titles: [
        'Saba Pocket Everyday Utility Abaya',
        'Huda Breathable Pure Linen Abaya',
        'Marwa Easy-Iron Button Front Abaya',
        'Lamia Raglan Sleeve Campus Abaya',
        'Suhair Relaxed Fit Travel Abaya',
        'Mayar Drawstring Waist Casual Abaya',
        'Baraah Soft Cotton Daily Abaya',
        'Camilia Two-Pocket Minimal Abaya',
        'Dhuha Lightweight Summer Morning Abaya',
        'Enas Stretchy Ribbed Jersey Abaya',
        'Fedaa Sporty Zip-Through Abaya',
        'Ghadah Slub Cotton Casual Abaya'
      ]
    },
    {
      category: 'Prayer Abayas',
      prefix: 'EH-PA',
      count: 10,
      basePrice: 95,
      materials: ['Organic Cotton Rayon', 'Cooling Modal', 'Breathable Jersey'],
      colors: ['Ivory Cream', 'Sage Whisper', 'Muted Rose', 'Pure White', 'Charcoal'],
      titles: [
        'Sakina Integrated Sheila Prayer Abaya',
        'Khushoo One-Piece Zipper Prayer Gown',
        'Taqwa Extra-Wide Sweep Prayer Dress',
        'Rahmah Soft Cotton Voile Prayer Set',
        'Iman Attached Hijab Travel Prayer Abaya',
        'Dua Breathable Cooling Modal Abaya',
        'Zikr Elasticated Face Frame Prayer Dress',
        'Ihsan Embroidered Lace Hem Prayer Set',
        'Barakah Roomy Cut Prayer Gown',
        'Hidayah Lightweight Modal Prayer Abaya'
      ]
    },
    {
      category: 'Premium Collection',
      prefix: 'EH-PM',
      count: 14,
      basePrice: 340,
      materials: ['Italian Matte Silk', 'Heavyweight Dubai Crepe', 'Raw Silk Weave'],
      colors: ['Emerald Forest', 'Smoky Quartz', 'Midnight Ink', 'Desert Camel', 'Dusty Lavender'],
      titles: [
        'The Heritage Atelier Tailored Abaya',
        'Al-Karam Hand-Loomed Border Abaya',
        'The Signature Emerald Lapel Abaya',
        'Diplomat Structured Belted Abaya',
        'Riviera Fluid Silk Crepe Abaya',
        'Montparnasse Trench Style Modest Coat',
        'Amalfi Lightweight Silk Blend Abaya',
        'Vienna Pleated Back Couture Abaya',
        'Monaco Gilded Cuff Executive Abaya',
        'Santorini Crisp Linen-Silk Blend Abaya',
        'Capri Two-Tone Reversible Luxury Abaya',
        'Geneva Minimalist Architectural Abaya',
        'Kyiv Delicate White Needlework Abaya',
        'Milano Pure Wool Winter Abaya Coat'
      ]
    },
    {
      category: 'Hijabs & Accessories',
      prefix: 'EH-AC',
      count: 12,
      basePrice: 45,
      materials: ['Medina Silk', 'Luxury Chiffon Georgette', 'Modal Jersey', '24K Gold Plated Alloy'],
      colors: ['Emerald Match', 'Champagne Nude', 'Jet Black', 'Dusty Rose', 'Pearl Off-White'],
      titles: [
        'Royal Medina Silk Sheila Hijab',
        'Crystal Embellished Chiffon Evening Sheila',
        'Emerald Haya Magnetic Luxury Pin Set (4-Pack)',
        'Heavy Crepe Breathable Sheila Hijab',
        'Pleated Ombré Silk Chiffon Hijab',
        'Undercap Bamboo Modal Breathable Tube',
        'Gilded Velvet Abaya Belt & Sash',
        'Handmade Tassel Abaya Cords (Pair)',
        'Matte Satin Silk Formal Hijab',
        'Crinkled Viscose Maxi Everyday Sheila',
        'Swarovski Crystal Edge Wedding Sheila',
        'Luxury Scented Abaya Storage Garment Bag'
      ]
    },
    {
      category: 'Abaya & Stole Combo Deals',
      prefix: 'EH-DL',
      count: 10,
      basePrice: 320,
      materials: ['Pure Korean Nida & Medina Silk', 'Dubai Silk Crepe & Chiffon', 'Saudi Crepe & Organza'],
      colors: ['Emerald & Champagne Duo', 'Obsidian Noir & Gold', 'Desert Rose & Taupe', 'Midnight Navy & Silver'],
      titles: [
        'The Royal Sultana 3-Piece Deal (Abaya + Stole + Gold Pin)',
        'Al-Maha Heritage Deal (Embroidered Abaya + Silk Sheila + Crystal Pin)',
        'Minimalist Kimono Suite (Kimono + Pleated Stole + Matte Pin)',
        'Farasha Butterfly Luxury Bundle (Farasha Abaya + Ombré Stole + Brooch)',
        'Eid Haute Couture Trio (24K Gold Abaya + Medina Silk Stole + Pins)',
        'Najdi Royal Bisht Combo (Bisht Abaya + Chiffon Stole + Magnet Pair)',
        'Korean Nida Everyday Elegance Set (Nida Abaya + Bamboo Stole + Clip)',
        'Velvet Trim Evening Trio (Velvet Abaya + Satin Stole + Emerald Brooch)',
        'Summer Breeze Travel Suite (Linen Abaya + Breathable Stole + Pin)',
        'Grand Imperial Bridal Bundle (Crystal Abaya + French Lace Stole + Pins)'
      ]
    },
    {
      category: 'Stoles & Sheilas',
      prefix: 'EH-ST',
      count: 12,
      basePrice: 55,
      materials: ['Pure Medina Silk', 'Turkish Chiffon', 'Crinkled Georgette', 'Bamboo Modal', 'Raw Silk Blend'],
      colors: ['Desert Sand', 'Emerald Royale', 'Obsidian Black', 'Dusty Rose', 'Champagne Glow', 'Pewter Slate'],
      titles: [
        'Medina Silk Maxi Luxury Stole (85cm x 195cm)',
        'Turkish Featherlight Chiffon Sheila Stole',
        'Crinkle Georgette Hand-Dyed Desert Stole',
        'Gold Threaded Evening Gilded Stole',
        'Pleated Ombré Royal Silk Stole',
        'Raw Silk Hand-Fringed Atelier Stole',
        'Bamboo Modal Breathable Everyday Stole',
        'Satin Luster Formal Wedding Stole',
        'Pearl Embellished Border Sheila Stole',
        'Two-Tone Reversible Modest Stole',
        'Chantilly Lace Edge Bridal Stole',
        'Heavyweight Winter Cashmere-Touch Stole'
      ]
    },
    {
      category: 'Magnetic Pins & Brooches',
      prefix: 'EH-PN',
      count: 10,
      basePrice: 28,
      materials: ['Neodymium Ultra-Hold Magnets', '24K Gold Plated Alloy', 'Austrian Crystal', 'Enamel Jewel'],
      colors: ['Matte Gold', 'Rose Gold', 'Emerald Green', 'Platinum Silver', 'Jet Obsidian'],
      titles: [
        'No-Snag Matte Gold Magnetic Hijab Pins (4-Pack)',
        'Austrian Crystal Diamond Magnetic Clasps (Duo)',
        'Royal Emerald Cut Gemstone Magnetic Brooch Pair',
        'Minimalist Sphere Matte Obsidian Magnetic Pins',
        'Ottoman Filigree 24K Gold Plated Safety Brooch',
        'Rose Gold Shimmer No-Hole Magnetic Clips (4-Pack)',
        'Celestial Star & Crescent Magnetic Brooch Set',
        'Delicate Pearl Cluster Magnetic Hijab Fastener',
        'Heavy-Duty Windproof Velvet Abaya Magnetic Pins',
        'Signature Emerald Haya Emblem Magnetic Pin Box'
      ]
    }
  ];

  // Distribute image assets across items
  const imagePool = [
    DUBAI_IMAGE,
    HERO_IMAGE,
    KIMONO_IMAGE,
    ATELIER_IMAGE
  ];

  let idCounter = 1;

  for (const conf of categoryConfigs) {
    for (let i = 0; i < conf.count; i++) {
      const title = conf.titles[i] || `${conf.category} Abaya Edition ${i + 1}`;
      const sku = `${conf.prefix}-${String(i + 1).padStart(3, '0')}`;
      const priceOffset = (i * 7) % 65;
      const price = conf.basePrice + priceOffset;
      const hasDiscount = (i % 3 === 0) || i === 1;
      const discount = hasDiscount ? (i % 2 === 0 ? 20 : 15) : undefined;
      const oldPrice = discount ? Math.round(price * (1 + discount / 100)) : undefined;

      const imgIndex = (idCounter + i) % imagePool.length;
      const primaryImg = imagePool[imgIndex];
      const secondaryImg = imagePool[(imgIndex + 1) % imagePool.length];
      const tertiaryImg = imagePool[(imgIndex + 2) % imagePool.length];

      const material = conf.materials[i % conf.materials.length];
      const mainColor = conf.colors[i % conf.colors.length];
      const stock = 12 + ((i * 5) % 28);
      const rating = Number((4.6 + ((i * 3) % 5) / 10).toFixed(1));
      const reviewsCount = 8 + ((i * 7) % 55);

      const isFlashSale = (idCounter % 5 === 0);
      const isNewArrival = (idCounter % 4 === 1);
      const isTrending = (idCounter % 3 === 0);
      const isBestSeller = (idCounter % 6 === 2);
      const isFeatured = (idCounter % 7 === 1);

      const isComboDeal = conf.category === 'Abaya & Stole Combo Deals';
      const isStoleOrPin = conf.category === 'Stoles & Sheilas' || conf.category === 'Magnetic Pins & Brooches' || conf.category.includes('Hijabs');

      products.push({
        id: `prod-${idCounter}`,
        name: title,
        category: conf.category,
        brand: 'Emerald Haya',
        sku,
        description: isComboDeal
          ? `Complete 3-Piece Luxury Haute Couture Bundle: Includes the handcrafted ${title.split('(')[0].trim()}, a complimentary matching pure Medina Silk Stole, and an ultra-hold no-snag magnetic pin set. Handcrafted in our Dubai atelier with an exclusive bundle saving.`
          : isStoleOrPin
          ? `Elevate your modest attire with this authentic ${title}. Crafted from imported premium ${material}, designed with delicate hand-finished seams to protect delicate Nida and silk fabrics.`
          : `Indulge in the regal comfort and timeless grace of the ${title}. Tailored meticulously from bespoke ${material}, this piece boasts an exquisite drape, breathable touch, and artisan-finished edges. Perfect for formal gatherings, festive occasions, and refined everyday modest wear. Includes a matching complimentary Sheila hijab.`,
        price,
        discount,
        oldPrice,
        stock,
        images: [primaryImg, secondaryImg, tertiaryImg],
        gallery: [primaryImg, secondaryImg, tertiaryImg],
        color: mainColor,
        availableColors: [mainColor, 'Noir Black', 'Emerald Green', 'Champagne Gold'],
        size: isStoleOrPin 
          ? ['One Size (Maxi)'] 
          : ['50', '52', '54', '56', '58', '60'],
        material,
        weight: isStoleOrPin ? '0.25 kg' : '0.85 kg',
        reviewsCount,
        rating: Math.min(5.0, rating),
        tags: [conf.category, 'Modest Fashion', 'Luxury Abaya', 'Dubai Couture', mainColor, ...(isComboDeal ? ['Combo Deal', 'Bundle Offer'] : [])],
        isFlashSale,
        isNewArrival,
        isTrending,
        isBestSeller,
        isFeatured,
        isComboDeal,
        isStoleOrPin,
        bundleItems: isComboDeal ? [
          'Handcrafted Gulf Abaya Robe',
          'Matching 85cm x 195cm Medina Silk Stole',
          'Ultra-Hold No-Snag Magnetic Pin Pair'
        ] : undefined,
        detailsList: isComboDeal ? [
          'Bundle Includes: 1x Designer Abaya, 1x Luxury Silk Stole, 1x Magnetic Pin Set',
          `Fabric: ${material}`,
          'Savings: 20% compared to purchasing items separately',
          'Packaging: Shipped in scented Emerald Haya luxury gift box'
        ] : isStoleOrPin ? [
          `Material: Authentic ${material}`,
          'Dimensions: Full modest coverage (approx 85cm x 195cm)',
          'Finishing: Micro-stitched baby rolled hems',
          'Fabric Protection: Non-snagging, pin-friendly texture'
        ] : [
          `Fabric: ${material}`,
          'Cut: Classic Gulf modest silhouette with graceful drape',
          'Sleeves: Finished with interior anti-slip micro-lining',
          'Sheila: Includes matching complimentary 28" x 75" luxury hijab',
          'Care: Dry clean recommended or delicate hand wash in cold water'
        ]
      });

      idCounter++;
    }
  }

  return products;
}

export const SEED_PRODUCTS = generate150Products();
