import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicSamsungPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Brand Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Samsung Certified HVAC Specialists</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Samsung WindFree AC Repair & Service Mumbai
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Specialized in Samsung 23,000 micro-hole WindFree still-air cooling units, Digital Inverter 8-Pole compressors, Triple Protector Plus circuits, and DVM S central VRF.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="tel:+919820145890"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Samsung Service: +91 98201 45890</span>
          </a>
          <button
            onClick={() => setCurrentRoute('public-contact')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm"
          >
            Book Inspection
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Samsung WindFree Micro-Hole Cleaning</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Specialized ultrasonic mesh cleaning to unclog 23,000 micro-holes without damaging the airflow damper mechanisms.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Digital Inverter 8-Pole Compression</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Torque fluctuation damping, IPM inverter driver circuit diagnostics, and power factor correction coil testing.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">SmartThings AI & WiFi Diagnostics</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Troubleshooting WiFi module communication errors, SmartThings app pairing, and geo-fencing cooling schedule configuration.
          </p>
        </div>
      </div>
    </div>
  );
};
