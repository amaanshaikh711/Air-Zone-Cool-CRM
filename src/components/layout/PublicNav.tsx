import React, { useState, useRef, useEffect } from 'react';
import {
  Wind,
  Phone,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Star,
  Moon,
  Sun,
  ChevronDown,
  Wrench,
  Sparkles,
  Shield,
  Layers,
  LayoutDashboard,
  ExternalLink
} from 'lucide-react';
import { CRMRoute, useApp, ROUTE_PATH_MAP } from '../../context/AppContext';

export const PublicNav: React.FC = () => {
  const { currentRoute, setCurrentRoute, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);

  const servicesTimeoutRef = useRef<any>(null);
  const brandsTimeoutRef = useRef<any>(null);

  const handleNav = (r: CRMRoute, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentRoute(r);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setBrandsDropdownOpen(false);
  };

  const isServicesActive = [
    'public-services',
    'public-ac-repair',
    'public-ac-installation',
    'public-amc',
  ].includes(currentRoute);

  const isBrandsActive = [
    'public-daikin',
    'public-mitsubishi',
    'public-samsung',
  ].includes(currentRoute);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setServicesDropdownOpen(false);
      setBrandsDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Top Notification / Trust Banner */}
      <div className="bg-slate-950 text-white text-[11px] py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Certified Partner: <strong className="text-white font-semibold">Daikin • Mitsubishi Electric • Samsung</strong></span>
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="hidden lg:flex items-center gap-1 text-amber-400 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 shrink-0" /> 4.9★ Google Rating (480+ Reviews)
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={ROUTE_PATH_MAP['dashboard']}
              onClick={(e) => handleNav('dashboard', e)}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors font-mono cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Staff CRM Portal ↗</span>
            </a>
            <a
              href="tel:+919820145890"
              className="flex items-center gap-1 text-slate-200 hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span className="font-mono">+91 98201 45890</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <a
            href={ROUTE_PATH_MAP['public-home']}
            onClick={(e) => handleNav('public-home', e)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none flex items-center gap-1.5">
                AIR ZONE COOL
              </div>
              <div className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 tracking-wider mt-0.5">
                HVAC SALES & CERTIFIED SERVICE
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <a
              href={ROUTE_PATH_MAP['public-home']}
              onClick={(e) => handleNav('public-home', e)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                currentRoute === 'public-home'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(servicesTimeoutRef.current);
                setServicesDropdownOpen(true);
              }}
              onMouseLeave={() => {
                servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 200);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isServicesActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Our HVAC Capabilities
                  </div>
                  <div className="space-y-0.5">
                    <a
                      href={ROUTE_PATH_MAP['public-services']}
                      onClick={(e) => handleNav('public-services', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-services' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">All Services Overview</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Complete HVAC repair, installation & care</div>
                      </div>
                    </a>

                    <a
                      href={ROUTE_PATH_MAP['public-ac-repair']}
                      onClick={(e) => handleNav('public-ac-repair', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-ac-repair' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Wrench className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">AC Repair & Diagnostics</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Rapid fault fix, gas charging & PCB</div>
                      </div>
                    </a>

                    <a
                      href={ROUTE_PATH_MAP['public-ac-installation']}
                      onClick={(e) => handleNav('public-ac-installation', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-ac-installation' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Installation & Piping</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Certified copper piping & mounting</div>
                      </div>
                    </a>

                    <a
                      href={ROUTE_PATH_MAP['public-amc']}
                      onClick={(e) => handleNav('public-amc', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-amc' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <Shield className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">AMC Maintenance Plans</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Residential & commercial annual care</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Brands Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(brandsTimeoutRef.current);
                setBrandsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                brandsTimeoutRef.current = setTimeout(() => setBrandsDropdownOpen(false), 200);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isBrandsActive
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Authorized Brands</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${brandsDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {brandsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Certified OEM Support
                  </div>
                  <div className="space-y-0.5">
                    <a
                      href={ROUTE_PATH_MAP['public-daikin']}
                      onClick={(e) => handleNav('public-daikin', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-daikin' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        D
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Daikin AC Specialists</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Inverter, VRV & Cassette systems</div>
                      </div>
                    </a>

                    <a
                      href={ROUTE_PATH_MAP['public-mitsubishi']}
                      onClick={(e) => handleNav('public-mitsubishi', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-mitsubishi' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-rose-600/10 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        M
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Mitsubishi Electric</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Mr. Slim & Heavy Duty engineering</div>
                      </div>
                    </a>

                    <a
                      href={ROUTE_PATH_MAP['public-samsung']}
                      onClick={(e) => handleNav('public-samsung', e)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentRoute === 'public-samsung' ? 'bg-blue-50 dark:bg-blue-950/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-cyan-600/10 text-cyan-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        S
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Samsung WindFree™</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Smart Inverter & Multi-Split ACs</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* About Us */}
            <a
              href={ROUTE_PATH_MAP['public-about']}
              onClick={(e) => handleNav('public-about', e)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                currentRoute === 'public-about'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              About Us
            </a>

            {/* Contact */}
            <a
              href={ROUTE_PATH_MAP['public-contact']}
              onClick={(e) => handleNav('public-contact', e)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                currentRoute === 'public-contact'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              Contact
            </a>
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Direct Dashboard Link Button */}
            <a
              href={ROUTE_PATH_MAP['dashboard']}
              onClick={(e) => handleNav('dashboard', e)}
              title="Go to CRM Operations Dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Dashboard</span>
            </a>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer group"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* WhatsApp Chat CTA */}
            <a
              href={ROUTE_PATH_MAP['whatsapp-bot']}
              onClick={(e) => handleNav('whatsapp-bot', e)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800/80 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xl:inline">WhatsApp Chat</span>
              <span className="xl:hidden">Chat</span>
            </a>

            {/* Primary Book Service CTA */}
            <a
              href={ROUTE_PATH_MAP['public-contact']}
              onClick={(e) => handleNav('public-contact', e)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer hover:shadow-lg"
            >
              <span>Book Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* Main Links */}
          <div className="space-y-1">
            <a
              href={ROUTE_PATH_MAP['dashboard']}
              onClick={(e) => handleNav('dashboard', e)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mb-2 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to CRM Operations Dashboard</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={ROUTE_PATH_MAP['public-home']}
              onClick={(e) => handleNav('public-home', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                currentRoute === 'public-home' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Home
            </a>

            <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              HVAC Services
            </div>
            <a
              href={ROUTE_PATH_MAP['public-services']}
              onClick={(e) => handleNav('public-services', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-services' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              All Services Overview
            </a>
            <a
              href={ROUTE_PATH_MAP['public-ac-repair']}
              onClick={(e) => handleNav('public-ac-repair', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-ac-repair' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              AC Repair & Diagnostics
            </a>
            <a
              href={ROUTE_PATH_MAP['public-ac-installation']}
              onClick={(e) => handleNav('public-ac-installation', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-ac-installation' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              AC Installation & Piping
            </a>
            <a
              href={ROUTE_PATH_MAP['public-amc']}
              onClick={(e) => handleNav('public-amc', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-amc' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Annual AMC Maintenance Plans
            </a>

            <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Authorized Brands
            </div>
            <a
              href={ROUTE_PATH_MAP['public-daikin']}
              onClick={(e) => handleNav('public-daikin', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-daikin' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Daikin AC Specialists
            </a>
            <a
              href={ROUTE_PATH_MAP['public-mitsubishi']}
              onClick={(e) => handleNav('public-mitsubishi', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-mitsubishi' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Mitsubishi Electric
            </a>
            <a
              href={ROUTE_PATH_MAP['public-samsung']}
              onClick={(e) => handleNav('public-samsung', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-samsung' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Samsung WindFree™
            </a>

            <div className="pt-2 pb-1 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Company
            </div>
            <a
              href={ROUTE_PATH_MAP['public-about']}
              onClick={(e) => handleNav('public-about', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-about' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              About Us
            </a>
            <a
              href={ROUTE_PATH_MAP['public-contact']}
              onClick={(e) => handleNav('public-contact', e)}
              className={`w-full block text-left px-3 py-2 rounded-xl text-xs font-medium ${
                currentRoute === 'public-contact' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Contact & Support
            </a>
          </div>

          {/* Action CTAs in Mobile */}
          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href={ROUTE_PATH_MAP['public-contact']}
              onClick={(e) => handleNav('public-contact', e)}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow cursor-pointer block"
            >
              Book Service / Free Quote
            </a>
            <button
              onClick={toggleTheme}
              className="w-full py-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer"
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
