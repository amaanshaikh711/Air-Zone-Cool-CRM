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

export const PublicMitsubishiPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Brand Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 text-white shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Certified Mitsubishi Electric & Heavy Industries Engineers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Mitsubishi AC Certified Service & Repair Mumbai
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Ultra-quiet cooling optimization, genuine Mitsubishi Poki-Poki motor replacements, Kirigamine 3D i-See Sensor calibration, and City Multi VRF servicing.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="tel:+919820145890"
            className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call Mitsubishi Team: +91 98201 45890</span>
          </a>
          <button
            onClick={() => setCurrentRoute('public-contact')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm"
          >
            Book Diagnostics
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Mitsubishi Inverter MSZ / MSY Series</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Troubleshooting whisper-quiet 19dB operation, Dual Barrier Coating preservation, and electronic thermistor tuning.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Mitsubishi Heavy Industries (SRK/SRC)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Jet air scroll technology servicing, titanium apatite deodorizing filter rejuvenation, and rugged outdoor heat exchanger descaling.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">City Multi VRF Commercial Systems</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Simultaneous cooling and heating 2-pipe R2 series maintenance, BC controller debugging, and long pipe refrigerant recovery.
          </p>
        </div>
      </div>
    </div>
  );
};
