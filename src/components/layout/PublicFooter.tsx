import React from 'react';
import { Wind, Phone, Mail, MapPin, ShieldCheck, Star, Award, CheckCircle2 } from 'lucide-react';
import { useApp, CRMRoute } from '../../context/AppContext';

export const PublicFooter: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleNav = (route: CRMRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight">AIR ZONE COOL</span>
                <span className="block text-[10px] font-bold text-cyan-400 tracking-wider">HVAC SPECIALISTS MUMBAI</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Mumbai's premier authorized HVAC engineering and certified service partner. Specializing in Daikin, Mitsubishi Electric, and Samsung Inverter & VRV/VRF cooling systems for residential and commercial spaces.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/60">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9★ (480+ Google Reviews)
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/60">
                <Award className="w-3.5 h-3.5" /> OEM Certified
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Services</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleNav('public-ac-repair')} className="hover:text-cyan-400 transition-colors">AC Repair & Diagnostics</button></li>
              <li><button onClick={() => handleNav('public-ac-installation')} className="hover:text-cyan-400 transition-colors">Installation & Piping</button></li>
              <li><button onClick={() => handleNav('public-services')} className="hover:text-cyan-400 transition-colors">Deep Hydro Jet Cleaning</button></li>
              <li><button onClick={() => handleNav('public-services')} className="hover:text-cyan-400 transition-colors">Gas Leakage & Charging</button></li>
              <li><button onClick={() => handleNav('public-services')} className="hover:text-cyan-400 transition-colors">Inverter PCB Repair</button></li>
              <li><button onClick={() => handleNav('public-amc')} className="hover:text-cyan-400 transition-colors">Annual Maintenance Plans</button></li>
            </ul>
          </div>

          {/* Col 3: Certified Brands */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Brand Centers</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => handleNav('public-daikin')} className="hover:text-cyan-400 transition-colors">Daikin AC Specialists</button></li>
              <li><button onClick={() => handleNav('public-mitsubishi')} className="hover:text-cyan-400 transition-colors">Mitsubishi Electric Service</button></li>
              <li><button onClick={() => handleNav('public-samsung')} className="hover:text-cyan-400 transition-colors">Samsung WindFree Service</button></li>
              <li><button onClick={() => handleNav('public-services')} className="hover:text-cyan-400 transition-colors">VRV / VRF Central Systems</button></li>
              <li><button onClick={() => handleNav('public-services')} className="hover:text-cyan-400 transition-colors">Ductable Commercial ACs</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Coverage */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Direct Dispatch</div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Shop 4, Greenfield Plaza, Link Road, Andheri West, Mumbai - 400053</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+919820145890" className="hover:text-white font-mono font-semibold">+91 98201 45890</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:service@airzonecool.com" className="hover:text-white">service@airzonecool.com</a>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Coverage: Bandra, Andheri, Juhu, Powai, Malad, Borivali, BKC, Worli, South Mumbai.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Air Zone Cool Air Conditioning & Refrigeration. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('public-about')} className="hover:text-slate-300">About Us</button>
            <button onClick={() => handleNav('public-contact')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => handleNav('public-contact')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => handleNav('dashboard')} className="text-cyan-400 hover:text-cyan-300 font-semibold font-mono">
              Staff Portal Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
