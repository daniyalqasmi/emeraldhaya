import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ToastContainer } from './components/ToastContainer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQsPage } from './pages/FAQsPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AccountPage } from './pages/AccountPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const MainRouter: React.FC = () => {
  const { activePage, isAdmin } = useStore();

  // Admin routing check: Admin panel is strictly at /admin (#/admin)
  const isAdminRoute = activePage === 'admin';

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#F8F6F0]">
        {isAdmin ? <AdminDashboard /> : <AdminLogin />}
        <ToastContainer />
      </div>
    );
  }

  // Render Public App
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#111111]">
      <Navbar />

      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'product' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'order-success' && <OrderSuccessPage />}
        {activePage === 'track-order' && <TrackOrderPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'faqs' && <FAQsPage />}
        {(activePage === 'privacy' || 
          activePage === 'refund' || 
          activePage === 'terms' || 
          activePage === 'shipping' || 
          activePage === 'policies') && <PoliciesPage />}
        {activePage === 'blog' && <BlogPage />}
        {activePage === 'blog-detail' && <BlogDetailPage />}
        {activePage === 'account' && <AccountPage />}
        {activePage === 'coming-soon' && <ComingSoonPage />}
      </main>

      <Footer />

      {/* Global Modals & Concierge Affordances */}
      <QuickViewModal />
      <WhatsAppFloat />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
