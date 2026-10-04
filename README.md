# Emerald Haya — Luxury Islamic Abaya Haute Couture

**Emerald Haya** is a 100% production-ready, bespoke luxury e-commerce platform tailored for an elite modest fashion house based in Downtown Dubai.

---

## 💎 Brand Identity & Visual Language

- **Primary Colors:**
  - Emerald Green (`#006B5B`)
  - Dark Emerald (`#01453D`)
  - Luxury Gold (`#D4AF37`)
  - Noir Obsidian (`#111111`)
  - Soft Travertine & Cream (`#FDFBF7`, `#F8F6F0`)
- **Typography:** *Cormorant Garamond* (haute couture serif headlines) paired with *Plus Jakarta Sans* (refined body typography) and monospace tabular numbers.
- **Visual Design:** Zero-pill metadata discipline, WCAG AA compliance, and responsive multi-column layouts.

---

## 🚀 Key Features

### 1. 150+ Bespoke Abaya Catalog
- Curated across 14 collections:
  - **Dubai Collection** (Hand-embroidered gold bullion thread on pure Korean Nida)
  - **Saudi Collection** (Classic Najdi and Hijazi modest robes)
  - **Luxury Haute Couture** (Swarovski crystal waterfalls & Italian silk organza)
  - **Open Front Abayas**
  - **Kimono Abayas** (Modern Japanese silhouettes)
  - **Farasha & Butterfly Abayas** (Regal Arabian wings)
  - **Pure Korean Nida Abayas** (High-filament breathability)
  - **Printed & Embroidered Abayas**
  - **Party & Wedding Wear**
  - **Casual & Linen Travel Wear**
  - **Prayer Abayas**
  - **Premium Drops**
  - **Medina Silk Hijabs & Accessories**
- Multi-faceted filtering by collection, length (50" to 60"), color shade, textile weave, price range slider, and customer ratings.

### 2. WhatsApp Concierge Checkout Flow
- Zero friction: No online payment barrier.
- Customer provides name, delivery destination, and WhatsApp phone number.
- Clicking **"Place Order via WhatsApp Concierge"**:
  1. Generates a unique Atelier Reference Code (e.g. `#EH-94821`).
  2. Saves the order record into the persistent database.
  3. Formats an itemized receipt message with product names, SKU codes, lengths, and totals.
  4. Automatically opens WhatsApp to connect directly with the Dubai concierge.
  5. Redirects the client to an interactive Order Success page with confetti and printable invoice receipt.

### 3. Dispatch Tracking
- Clients can track consignment status anytime via `/track-order` by entering their Order Reference Number or WhatsApp telephone number.
- Visual step-by-step progress tracking: *Order Registered → Measurements Verified → Hand-Tailoring Atelier → In Freight Transit → Delivered*.

### 4. Admin Management Console (`/admin`)
- **Security:** The Admin Panel is strictly isolated and hidden from public navigation bars. Accessible exclusively at `/admin`.
- **Pre-configured Credentials:**
  - **Email:** `admin@emeraldhaya.com`
  - **Password:** `emerald2026!`
  - Quick 1-click access button provided.
- **Admin Capabilities:**
  - **Dashboard Overview:** Metric cards (Gross Revenue, Total Orders, Active Catalog, Low Stock warnings) and recent orders stream.
  - **Products CRUD:** Add new abaya designs, edit prices, update inventory stock, set flash sale badges, and delete items.
  - **Orders Management:** Update order status (`pending`, `confirmed`, `processing`, `shipped`, `delivered`), view customer notes, and trigger direct WhatsApp messages to clients.
  - **Promotional Coupons:** Create voucher codes (`EMERALD20`, `RAMADAN25`), set percentage discounts, and minimum spends.
  - **Hero Slider & Banners:** Customize homepage campaign headlines and call-to-action destinations.
  - **Reviews Moderation:** Approve or hide client feedback.
  - **Store Settings:** Configure the live WhatsApp receiving phone number, default currency, free shipping threshold, and Google Form consultation embed.
  - **One-Click Catalog Restore:** Instantly restore the entire 150+ product database.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + `@tailwindcss/vite`
- **Icons:** Lucide React
- **Animations & Effects:** Motion + Canvas Confetti
- **Backend Persistence:** Firebase Firestore + LocalStorage Unified Sync Layer
- **Rules & Schemas:** `firebase-blueprint.json` & `firestore.rules`

---

## 📦 Deployment Instructions

### Deploy to Vercel
1. Push repository to your GitHub account.
2. Log into [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Set build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Configure environment variables matching `.env.example`.
6. Click **Deploy**.

### Deploy to Firebase
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Initialize hosting: `firebase init hosting`
   - Choose existing Firebase Project
   - Set public directory to `dist`
   - Configure as single-page app: `Yes`
4. Build: `npm run build`
5. Deploy: `firebase deploy`
6. Deploy security rules: `firebase deploy --only firestore:rules`
