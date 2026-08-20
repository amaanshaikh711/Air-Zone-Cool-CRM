import React, { useState } from 'react';
import { Wind, Phone, MessageSquare, Menu, X, ArrowRight, ShieldCheck, Star, Moon, Sun } from 'lucide-react';
import { CRMRoute, useApp } from '../../context/AppContext';

export const PublicNav: React.FC = () => {
  const { currentRoute, setCurrentRoute, settings, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links: Array<{ route: CRMRoute; label: string }> = [
    { route: 'public-home', label: 'Home' },
    { route: 'public-services', label: 'Services' },
    { route: 'public-ac-repair', label: 'AC Repair' },
    { route: 'public-ac-installation', label: 'Installation' },
    { route: 'public-amc', label: 'AMC Plans' },
    { route: 'public-daikin', label: 'Daikin' },
    { route: 'public-mitsubishi', label: 'Mitsubishi' },
    { route: 'public-samsung', label: 'Samsung' },
    { route: 'public-about', label: 'About Us' },
    { route: 'public-contact', label: 'Contact' },
  ];

  const handleNav = (r: CRMRoute) => {
    setCurrentRoute(r);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Certified Partner: Daikin • Mitsubishi Electric • Samsung
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" /> 4.9★ Google Rating (480+ Reviews)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentRoute('dashboard')}
              className="font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1"
            >
              Staff CRM Portal ↗
            </button>
            <a
              href="tel:+919820145890"
              className="flex items-center gap-1 text-white hover:text-blue-300 font-semibold"
            >
              <Phone className="w-3 h-3 text-cyan-400" /> +91 98201 45890
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => handleNav('public-home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-tight">
                AIR ZONE COOL
              </div>
              <div className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 tracking-wider">
                HVAC SALES & CERTIFIED SERVICE
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {links.map(l => {
              const active = currentRoute === l.route;
              return (
                <button
                  key={l.route}
                  onClick={() => handleNav(l.route)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <button
              onClick={() => handleNav('public-contact')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors"
            >
              <span>Book Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentRoute('whatsapp-bot')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Chat</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 xl:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {links.map(l => (
            <button
              key={l.route}
              onClick={() => handleNav(l.route)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentRoute === l.route
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {l.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => handleNav('public-contact')}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-blue-600 rounded-xl shadow"
            >
              Book Service / Free Quote
            </button>
            <button
              onClick={() => setCurrentRoute('dashboard')}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              Open Staff CRM Operations Dashboard
            </button>
            <button
              onClick={toggleTheme}
              className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
