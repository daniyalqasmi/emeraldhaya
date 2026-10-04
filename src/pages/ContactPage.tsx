import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { StorageService } from '../services/storageService';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Order Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    StorageService.saveMessage({
      id: `msg-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      createdAt: new Date().toISOString(),
      isRead: false
    });

    setSubmitted(true);
    showToast('Your message has been delivered to our Dubai Atelier Concierge');
    setForm({ name: '', email: '', phone: '', subject: 'Bespoke Order Inquiry', message: '' });
  };

  const cleanWhatsapp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="w-full bg-[#FDFBF7] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#006B5B] text-xs font-semibold uppercase tracking-[0.25em] block mb-1">
            Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
            Contact Our Dubai Atelier
          </h1>
          <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
            Whether inquiring about bespoke sizing, wedding abaya consultations, or courier tracking, our master stylists are at your service.
          </p>
        </div>

        {/* 2 Columns: Contact Form (Left) + Contact Cards & Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#006B5B]/15 rounded-sm p-6 sm:p-10 shadow-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-neutral-100 mb-6">
              <MessageCircle className="w-5 h-5 text-[#006B5B]" />
              <h2 className="font-serif text-2xl font-bold text-neutral-900">
                Send an Atelier Inquiry
              </h2>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#FDFBF7] border border-[#006B5B]/30 rounded text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#006B5B] flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  Message Successfully Dispatched
                </h3>
                <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto">
                  Our private client concierge will review your message and reply via email or WhatsApp within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-[#006B5B] text-white text-xs font-semibold uppercase rounded"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Fatima Al-Zahra"
                      required
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="client@emeraldhaya.com"
                      required
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                    >
                      <option value="Bespoke Order Inquiry">Bespoke Order Inquiry</option>
                      <option value="Sizing & Alteration Request">Sizing & Alteration Request</option>
                      <option value="Bridal Haute Couture Consultation">Bridal Haute Couture Consultation</option>
                      <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                      <option value="Wholesale & Boutique Partnerships">Wholesale & Boutique Partnerships</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700 block mb-1">
                    Your Message / Custom Measurements *
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details about desired abaya cut, preferred length, event dates..."
                    required
                    className="w-full text-xs p-3 bg-[#FDFBF7] border border-neutral-300 rounded focus:outline-none focus:border-[#006B5B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-[0.16em] rounded-sm transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Transmit Inquiry to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Details & WhatsApp CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Direct Highlight Box */}
            <div className="bg-[#01453D] text-white p-6 sm:p-8 rounded-sm border border-[#D4AF37]/50 shadow-xl">
              <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] block mb-1">
                Instant Response
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Chat Directly on WhatsApp
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Skip form queues. Connect with our Dubai fashion advisors directly for instantaneous sizing validation, close-up fabric videos, and custom quotes.
              </p>
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 bg-[#006B5B] hover:bg-[#005246] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow border border-[#D4AF37]/50"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Open WhatsApp ({settings.whatsappNumber})</span>
              </a>
            </div>

            {/* Atelier Location & Contact Info */}
            <div className="bg-white border border-neutral-200 rounded-sm p-6 space-y-4 text-xs text-neutral-700">
              <h4 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
                Atelier Location & Hours
              </h4>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900">Emerald Haya Flagship Atelier</strong>
                  <span>{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900">Concierge Operating Hours</strong>
                  <span>Sunday – Thursday: 9:00 AM – 9:00 PM (GST)</span>
                  <br />
                  <span>Friday – Saturday: 1:00 PM – 10:00 PM (GST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900">Direct Email</strong>
                  <span>{settings.storeEmail}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#006B5B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-neutral-900">Telephone / International Desk</strong>
                  <span>{settings.storePhone}</span>
                </div>
              </div>
            </div>

            {/* Google Form Embed Preview */}
            {settings.googleFormUrl && (
              <div className="bg-white border border-[#D4AF37]/30 rounded-sm p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#006B5B] mb-2 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>VIP Google Form Portal</span>
                </div>
                <iframe
                  src={settings.googleFormUrl}
                  width="100%"
                  height="260"
                  frameBorder="0"
                  title="Emerald Haya Custom Form"
                  className="rounded border border-neutral-200"
                >
                  Loading form...
                </iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
