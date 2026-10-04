import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, products, navigateTo } = useStore();

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="w-full bg-[#FDFBF7] py-20 min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-light text-[#111111]">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Save your favorite bespoke abayas while exploring our Dubai and Saudi collections.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-6 px-8 py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow"
          >
            Discover Haute Couture Pieces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FDFBF7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.2em]">
              Saved Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#111111] mt-1">
              Your Wishlist ({wishlistProducts.length} Items)
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#006B5B] hover:underline uppercase tracking-wider font-semibold"
          >
            Continue Browsing Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
