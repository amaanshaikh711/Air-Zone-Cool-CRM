import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicAMCPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleSelectPlan = (plan: string) => {
    setCurrentRoute('public-contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Year-Round Peace of Mind
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Annual Maintenance Contracts (AMC)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Keep your Daikin, Mitsubishi, and Samsung air conditioners running at peak efficiency, lower electricity bills by up to 25%, and prevent unexpected breakdown costs.
        </p>
      </div>

      {/* Plan Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Non-Comprehensive Plan */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Protection</span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Non-Comprehensive AMC</h3>
              <p className="text-xs text-slate-500">Preventive care & priority emergency support</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">₹2,499</span>
              <span className="text-xs text-slate-400">/ unit / year</span>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>4 Quarterly Deep Hydro Jet Cleanings</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unlimited Free Emergency Breakdown Visits</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>2-Hour Guaranteed Priority Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>15% Discount on Replaced Spare Parts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Free Gas Charging Not Included</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Free PCB Replacement Not Included</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSelectPlan('Non-Comprehensive')}
            className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
          >
            Select Non-Comprehensive Plan
          </button>
        </div>

        {/* Comprehensive Plan */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-900 to-indigo-950 text-white shadow-2xl space-y-6 flex flex-col justify-between relative border-2 border-cyan-400/40">
          <div className="absolute -top-3 right-6 px-3 py-1 bg-cyan-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow">
            Most Popular Choice
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Zero-Expense Care</span>
              <h3 className="text-xl font-extrabold text-white">Comprehensive AMC (Parts + Gas)</h3>
              <p className="text-xs text-blue-200">100% total coverage of all spares, gas & labor</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold font-mono text-white">₹5,499</span>
              <span className="text-xs text-blue-200">/ unit / year</span>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-blue-800 text-xs">
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span><strong>4 Quarterly Deep Hydro Jet Cleanings</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span><strong>100% Free Gas Leakage Repair & Refilling</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span><strong>Free Inverter PCB Board & Capacitor Replacements</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span><strong>Free Fan Motors, Sensors & Thermistors</strong></span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                <span>VIP 1-Hour Emergency Technician Dispatch</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSelectPlan('Comprehensive')}
            className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl text-xs font-extrabold shadow-lg transition-all"
          >
            Get Comprehensive Protection &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
