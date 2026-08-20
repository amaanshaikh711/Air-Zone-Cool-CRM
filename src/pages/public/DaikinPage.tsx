import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
  Wrench,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicDaikinPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Brand Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 text-white shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Factory Trained Daikin HVAC Engineers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Daikin AC Authorized Service Center Mumbai
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Comprehensive diagnostic, genuine spare parts replacement, and annual maintenance for all Daikin Inverter split systems, VRV IV-X Central ACs, and Ceiling Mounted Cassettes.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="tel:+919820145890"
            className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Daikin Support: +91 98201 45890</span>
          </a>
          <button
            onClick={() => setCurrentRoute('public-contact')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm"
          >
            Book Online
          </button>
        </div>
      </div>

      {/* Daikin Specializations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Daikin Inverter Split Systems</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Troubleshooting FTKF, FTHT, and Streamer series. Inverter PCB board diagnosis and high-efficiency neo-swing compressor calibration.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Daikin VRV Home & VRV X</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Multi-zone central VRV system servicing for luxury apartments and offices. Refnet branch joint testing, electronic expansion valve calibration.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Daikin Cassette & Ductable Units</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Drain lift pump repair, 360-degree airflow louvre motor replacement, and false ceiling filter maintenance.
          </p>
        </div>
      </div>
    </div>
  );
};
