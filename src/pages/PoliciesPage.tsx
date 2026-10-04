import React, { useState } from 'react';
import { Shield, Truck, RotateCcw, FileText } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PoliciesPage: React.FC = () => {
  const { activePage } = useStore();

  const [activeTab, setActiveTab] = useState<'shipping' | 'refund' | 'privacy' | 'terms'>(
    activePage === 'privacy'
      ? 'privacy'
      : activePage === 'refund'
      ? 'refund'
      : activePage === 'terms'
      ? 'terms'
      : 'shipping'
  );

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20 min-h-[75vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.25em] block mb-1">
            Boutique Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
            Policies & Client Guarantees
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-neutral-200 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'shipping'
                ? 'border-[#006B5B] text-[#006B5B] bg-white'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Shipping Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'refund'
                ? 'border-[#006B5B] text-[#006B5B] bg-white'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refund & Exchange</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'privacy'
                ? 'border-[#006B5B] text-[#006B5B] bg-white'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'terms'
                ? 'border-[#006B5B] text-[#006B5B] bg-white'
                : 'border-transparent text-neutral-500 hover:text-black'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>
        </div>

        {/* Policy Content Body */}
        <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-10 shadow-sm leading-relaxed text-xs sm:text-sm text-neutral-700 space-y-6">
          {activeTab === 'shipping' && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                Worldwide Express Shipping & Courier Protocol
              </h2>
              <p>
                At Emerald Haya, every abaya is freshly hand-pressed, scented with our signature Arabian oud mist, and packaged in a custom branded dust garment bag before dispatch from our central Dubai atelier.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Freight Rates & Thresholds</h3>
              <p>
                • Orders exceeding $250 (or equivalent in AED, SAR, GBP, PKR) qualify for complimentary door-to-door express courier.
                <br />
                • Standard international express shipping fee of $25 is applied to orders below the complimentary threshold.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Transit Times</h3>
              <p>
                • <strong>United Arab Emirates:</strong> Next-day delivery (within 24-48 hours).
                <br />
                • <strong>Gulf Cooperation Council (KSA, Qatar, Kuwait, Oman, Bahrain):</strong> 2 to 3 business days via express courier.
                <br />
                • <strong>United Kingdom, Europe, North America:</strong> 3 to 5 business days via DHL Express Air.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                Refund, Alterations & Exchange Guarantee
              </h2>
              <p>
                We strive for absolute perfection in every stitch. If your abaya requires size alterations or exchange, we accommodate requests within 14 days of receipt.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Complimentary Size Alterations</h3>
              <p>
                If the garment length requires minor hem adjustment or sleeve alteration, you may ship the item back to our atelier and our master tailors will alter it free of charge.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Conditions for Returns</h3>
              <p>
                • Garment must be unworn, unwashed, and retaining all original tags and security ribbons.
                <br />
                • Complimentary Sheila hijabs and accessories must be returned in complete set.
                <br />
                • Bespoke bridal orders with customized initials or non-standard measurements are final sale but eligible for tailoring modifications.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                Client Privacy & Data Confidentiality
              </h2>
              <p>
                Emerald Haya honors the privacy and security of our royal and international clientele. We enforce strict data encryption and zero-third-party disclosure policies.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Information Collection</h3>
              <p>
                We collect your recipient name, WhatsApp telephone number, email, and physical shipping address strictly for order processing, custom hemming verification, and courier dispatch.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Payment & Banking Security</h3>
              <p>
                We do not store credit card credentials on our servers. WhatsApp checkout guarantees that payments are transacted either via Cash on Delivery or verified bank transfer.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">
                Terms of Service & Atelier Governance
              </h2>
              <p>
                By placing an order via our boutique platform or through our WhatsApp concierge service, you agree to these atelier service conditions.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Craftsmanship Disclaimers</h3>
              <p>
                Each piece in our luxury collection involves manual hand embroidery and Zardozi beadwork. Minor natural variations in stitch geometry are hallmarks of genuine haute couture craftsmanship, not defects.
              </p>
              <h3 className="font-bold text-neutral-900 mt-4 text-base">Intellectual Property</h3>
              <p>
                All photographs, trademarks, abaya silhouettes, embroidery patterns, and content are the sole property of Emerald Haya Haute Couture Dubai.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
