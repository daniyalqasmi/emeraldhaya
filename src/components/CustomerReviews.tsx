import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerReviews: React.FC = () => {
  const { reviews } = useStore();

  const approvedReviews = reviews.filter((r) => r.isApproved).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#F8F6F0] border-y border-[#006B5B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#006B5B] text-xs font-semibold tracking-[0.25em] uppercase">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#111111] mt-2">
            Praised by Discerning Women Worldwide
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
            ))}
            <span className="text-xs text-neutral-600 font-medium ml-2 font-mono">
              4.9/5 Average Rating (1,480+ Orders)
            </span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="relative p-8 bg-white border border-[#D4AF37]/30 rounded-sm shadow-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#006B5B]/20 mb-4" />
                <div className="flex text-[#D4AF37] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#D4AF37]' : 'text-neutral-200'}`}
                    />
                  ))}
                </div>
                <p className="text-neutral-700 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#111111]">{rev.customerName}</h4>
                  {rev.customerCity && (
                    <span className="text-xs text-neutral-400">{rev.customerCity}</span>
                  )}
                </div>
                {rev.isVerified && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#006B5B]" />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
