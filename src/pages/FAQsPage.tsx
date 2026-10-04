import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQsPage: React.FC = () => {
  const { settings } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const faqs: FAQItem[] = [
    {
      category: 'Sizing & Length',
      question: 'How do I choose the correct abaya length?',
      answer: 'Abayas are sized according to garment length in inches from the highest shoulder point straight to the floor. Standard sizes range from 50" (for heights around 4\'10" - 5\'0") up to 60" (for heights 5\'9" - 6\'0"). If you frequently wear high heels, we recommend ordering one size longer. Check our interactive Size Guide on any product page for exact height-to-length ratios.'
    },
    {
      category: 'Sizing & Length',
      question: 'Can I request bespoke or custom hemming?',
      answer: 'Yes! Our Dubai ateliers provide complimentary custom sleeve tapering and length adjustments. Simply include your exact shoulder-to-floor measurement in the Order Notes at checkout or mention it when finalizing your order on WhatsApp.'
    },
    {
      category: 'Fabrics & Care',
      question: 'What is authentic Korean Nida fabric and why is it superior?',
      answer: 'Korean Nida is widely revered as the gold standard of abaya textiles. It is woven from ultra-fine filament threads that yield a heavy, fluid drape that falls smoothly without clinging. It is wrinkle-resistant, breathable under warm weather, and retains its deep obsidian dye depth after repeated washes.'
    },
    {
      category: 'Fabrics & Care',
      question: 'How should I wash and care for hand-embroidered abayas?',
      answer: 'For pieces adorned with hand-stitched gold bullion embroidery, crystals, or French lace, we strongly advise professional dry cleaning. For daily unembellished Korean Nida or crepe abayas, gentle hand washing in cool water with mild silk detergent is recommended. Never wring or tumble dry; dry flat or on a padded hanger in the shade.'
    },
    {
      category: 'Ordering & WhatsApp',
      question: 'How does WhatsApp checkout work?',
      answer: 'At Emerald Haya, we eliminate the impersonal friction of online forms. When you place an order, your complete order summary, items, sizes, and shipping address are formatted into a WhatsApp message and sent directly to our Dubai concierge desk. A fashion advisor confirms stock availability and coordinates your delivery directly.'
    },
    {
      category: 'Ordering & WhatsApp',
      question: 'Which payment methods are accepted?',
      answer: 'We accept Cash on Delivery (COD) across the UAE and GCC, direct bank transfer, and secure payment links sent via WhatsApp for international clients.'
    },
    {
      category: 'Shipping & Delivery',
      question: 'What are your delivery timelines and courier partners?',
      answer: 'Orders within the UAE are delivered within 24–48 hours. Orders to Saudi Arabia, Qatar, Kuwait, Oman, and Bahrain are delivered in 2–3 business days via express courier. International consignments to the UK, USA, Europe, and Asia arrive in 3–5 business days via DHL Express.'
    },
    {
      category: 'Returns & Alterations',
      question: 'What is your return and exchange policy?',
      answer: 'We want you to be completely enamored with your modest couture piece. We offer complimentary size exchanges and alterations within 14 days of delivery. For hygiene reasons, custom bespoke hemming and Sheila hijabs must remain unworn and in original condition.'
    }
  ];

  const categories = ['All', 'Sizing & Length', 'Fabrics & Care', 'Ordering & WhatsApp', 'Shipping & Delivery', 'Returns & Alterations'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.25em] block mb-1">
            Assistance & Guidance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto">
            Everything you need to know regarding Gulf abaya sizing, Korean Nida textiles, and WhatsApp ordering.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#006B5B] text-white shadow-sm'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FDFBF7] transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-neutral-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#006B5B] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-[#01453D] text-white rounded-sm text-center border border-[#D4AF37]/50 shadow-xl">
          <h3 className="font-serif text-2xl font-bold text-white mb-2">
            Have a Specific Sizing or Custom Atelier Question?
          </h3>
          <p className="text-xs text-neutral-300 max-w-lg mx-auto mb-6">
            Our master tailors and fashion stylists are standing by to inspect fabric swatches and verify your measurements via WhatsApp.
          </p>
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#006B5B] hover:bg-[#005246] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow border border-[#D4AF37]/40"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>Chat with Concierge Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
