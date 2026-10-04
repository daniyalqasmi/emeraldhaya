import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../../components/BrandLogo';

export const AdminLogin: React.FC = () => {
  const { setAdminStatus, navigateTo, showToast } = useStore();

  const [email, setEmail] = useState('admin@emeraldhaya.com');
  const [password, setPassword] = useState('emerald2026!');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Instant verification for admin portal
    setTimeout(() => {
      if (email.trim() && password.length >= 6) {
        setAdminStatus(true);
        showToast('Authenticated successfully as Atelier Administrator');
        navigateTo('admin');
      } else {
        setError('Invalid credentials. Password must be at least 6 characters.');
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickDemoAccess = () => {
    setEmail('admin@emeraldhaya.com');
    setPassword('emerald2026!');
    setAdminStatus(true);
    showToast('Authenticated via Administrator Credentials');
    navigateTo('admin');
  };

  return (
    <div className="w-full min-h-screen bg-[#111111] text-[#FDFBF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-[#D4AF37]/40 shadow-2xl rounded-sm p-8 sm:p-10 relative overflow-hidden">
        {/* Subtle decorative gold line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006B5B] via-[#D4AF37] to-[#01453D]" />

        {/* Brand Logo */}
        <div className="flex flex-col items-center justify-center mb-8">
          <BrandLogo variant="light" size="lg" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mt-3 font-semibold">
            Restricted Atelier Console (/admin)
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-950 border border-rose-800 text-rose-200 text-xs rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block mb-1.5">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@emeraldhaya.com"
                required
                className="w-full pl-10 pr-3 py-3 text-xs bg-neutral-800 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link dispatched to master admin email')}
                className="text-[11px] text-[#D4AF37] hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-3 py-3 text-xs bg-neutral-800 border border-neutral-700 text-white rounded focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#006B5B]"
              />
              <span>Remember session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#006B5B] hover:bg-[#01453D] text-white text-xs font-bold uppercase tracking-[0.16em] rounded transition-colors flex items-center justify-center gap-2 shadow border border-[#D4AF37]/50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Console'}</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </form>

        {/* Instant 1-Click Demo Admin Button */}
        <div className="mt-8 pt-6 border-t border-neutral-800">
          <button
            type="button"
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 border border-neutral-600"
          >
            <Key className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>1-Click Master Admin Access</span>
          </button>
          <span className="text-[10px] text-neutral-500 text-center block mt-2">
            Default credentials prefilled: admin@emeraldhaya.com / emerald2026!
          </span>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-neutral-400 hover:text-white"
          >
            ← Return to Public Boutique
          </button>
        </div>
      </div>
    </div>
  );
};
