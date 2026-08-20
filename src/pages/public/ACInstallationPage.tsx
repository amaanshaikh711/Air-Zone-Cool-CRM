import React from 'react';
import {
  Wrench,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicACInstallationPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Professional HVAC Fitting
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Precision AC Installation & Copper Piping
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Improper installation causes 80% of premature AC compressor failures. We follow manufacturer-specified vacuum evacuation, pure Mandovi copper tubing, and vibration damping.
        </p>
      </div>

      {/* Installation Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">1</div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">100% Pure Copper Piping</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We use high-grade 0.8mm wall thickness copper tubes with thick elastomeric nitrile foam insulation to prevent cooling loss and sweating.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">2</div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Dual-Stage Vacuum Evacuation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every system is vacuum-pumped down to 500 microns before opening the refrigerant valves to eliminate moisture and non-condensables.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">3</div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Heavy-Duty Powder Brackets</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Anti-rust galvanized outdoor stands anchored with 10mm high-tensile fasteners and rubber anti-vibration isolation pads.
          </p>
        </div>
      </div>

      {/* Pricing table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Installation & Piping Rate Card</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Standard Split Installation</span>
            <div className="text-lg font-mono font-bold text-blue-600">₹1,499</div>
            <p className="text-slate-500">Includes core hole, indoor & outdoor mounting, wiring connection.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">Extra Copper Piping (per foot)</span>
            <div className="text-lg font-mono font-bold text-blue-600">₹280 / ft</div>
            <p className="text-slate-500">Includes copper tubes, insulation sleeve, and electrical cable.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">AC Safe Uninstallation</span>
            <div className="text-lg font-mono font-bold text-blue-600">₹799</div>
            <p className="text-slate-500">Includes refrigerant pump down safeguard and tube sealing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
