import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Crown,
  ChevronLeft
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { StorageService } from '../services/storageService';
import { HERO_IMAGE, DUBAI_IMAGE, KIMONO_IMAGE, ATELIER_IMAGE } from '../services/seedData';

export const ComingSoonPage: React.FC = () => {
  const { navigateTo, settings, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [registered, setRegistered] = useState(false);

  // Countdown timer to Ramadan & Eid 2026 Collection Reveal
  const [countdown, setCountdown] = useState({
    days: 28,
    hours: 14,
    minutes: 36,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid client email address', 'error');
      return;
    }
    StorageService.subscribeNewsletter(email);
    setRegistered(true);
    showToast('VIP Private Access Invitation Registered');
  };

  const previewPieces = [
    {
      title: 'The Imperial Eid Sovereign Robe',
      material: 'Grade-AAA Japanese Raw Silk & 24K Zardozi',
      edition: 'Limited Edition 25 Pieces Worldwide',
      image: HERO_IMAGE,
      tag: 'Couture Reveal'
    },
    {
      title: 'Nocturne Farasha Silk Silhouette',
      material: 'Midnight Korean Nida with Hand-Dyed Medina Stole',
      edition: 'Private Client Exclusive',
      image: DUBAI_IMAGE,
      tag: 'Hand-Cut Silk'
    },
    {
      title: 'Desert Gold Ottoman Kimono Suite',
      material: 'Crushed Gold Organza & Austrian Crystal Brooch',
      edition: 'Atelier Runway Preview',
      image: ATELIER_IMAGE,
      tag: 'Atelier Gold'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#01453D] text-[#FDFBF7] relative overflow-hidden select-none">
      {/* Background Ambience & Gilded Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#01453D]/90 to-black/95 z-0" />
      
      {/* Subtle arabesque watermark */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#D4AF37]/20 opacity-30 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-[#D4AF37]/20 opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col items-center text-center">
        
        {/* Back navigation pill */}
        <button
          onClick={() => navigateTo('home')}
          className="self-start mb-8 text-xs text-[#D4AF37] hover:text-white uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Boutique Storefront</span>
        </button>

        {/* Crown Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/50 mb-5 backdrop-blur-sm shadow-md">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
            Ramadan & Eid 2026 Haute Couture Drop
          </span>
        </div>

        {/* Main Display Title */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight max-w-3xl break-words">
          The Grand Imperial Collection Is Coming Soon
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-neutral-300 font-light max-w-2xl mt-4 leading-relaxed">
          Our Dubai ateliers are hand-finishing 50 limited-edition bespoke abayas, matching Medina silk stoles, and 24K gold magnetic brooches. Register your private client invitation for early preview access before global release.
        </p>

        {/* Countdown Module */}
        <div className="mt-8 mb-10 grid grid-cols-4 gap-2 sm:gap-4 font-mono max-w-lg w-full">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds }
          ].map((box) => (
            <div 
              key={box.label}
              className="flex flex-col items-center bg-black/60 border border-[#D4AF37]/40 p-2.5 sm:p-4 rounded-lg shadow-xl backdrop-blur-md"
            >
              <span className="text-xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                {String(box.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-wider text-neutral-400 mt-1">
                {box.label}
              </span>
            </div>
          ))}
        </div>

        {/* VIP Early Access Registration Form */}
        <div className="w-full max-w-lg bg-black/50 border border-[#D4AF37]/40 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-16">
          {!registered ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#D4AF37] font-semibold uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Client Pre-Order Register</span>
              </div>
              <p className="text-xs text-neutral-300 text-center mb-3">
                Be the first to access lookbooks and reserve tailor-made sizes.
              </p>

              <div className="space-y-3">
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full px-4 py-3 text-xs bg-white/10 border border-white/20 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your VIP email address"
                  className="w-full px-4 py-3 text-xs bg-white/10 border border-white/20 rounded-md text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#006B5B] to-[#01453D] hover:from-[#01453D] hover:to-[#006B5B] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-md transition-all border border-[#D4AF37]/60 shadow-lg flex items-center justify-center gap-2"
              >
                <span>Request Private Invitation</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-mono mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Encrypted & Protected by Emerald Haya Private Client Protocol</span>
              </div>
            </form>
          ) : (
            <div className="py-6 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-white">Invitation Confirmed</h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                Thank you, {clientName || 'valued patron'}. You will receive private access 24 hours prior to our public launch.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-xs uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 rounded font-semibold"
              >
                Explore Current Collections →
              </button>
            </div>
          )}
        </div>

        {/* Sneak Peek Lookbook Section */}
        <div className="w-full text-left space-y-6">
          <div className="flex items-end justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                Atelier Vault
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
                Upcoming Lookbook Sneak Peeks
              </h2>
            </div>
            <span className="text-xs text-neutral-400 font-mono hidden sm:block">Revealing Eid 2026</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {previewPieces.map((piece, idx) => (
              <div 
                key={idx}
                className="bg-black/40 border border-white/15 rounded-xl overflow-hidden backdrop-blur-md shadow-lg group hover:border-[#D4AF37]/60 transition-all"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  <img 
                    src={piece.image} 
                    alt={piece.title} 
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-black/70 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    {piece.tag}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-mono block">
                      {piece.edition}
                    </span>
                    <h3 className="font-serif text-base font-bold text-white leading-tight mt-0.5">
                      {piece.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-[11px] text-neutral-400">{piece.material}</p>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Emerald Haya Atelier, I would like to inquire about reserving "${piece.title}" from the upcoming Eid collection.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-white/5 hover:bg-[#006B5B] text-[#D4AF37] hover:text-white text-[11px] uppercase tracking-wider font-semibold rounded border border-white/15 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
