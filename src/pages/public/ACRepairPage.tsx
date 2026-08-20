import React from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicACRepairPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const commonFaults = [
    {
      symptom: 'AC Running but Not Cooling',
      cause: 'Low refrigerant, dirty coils, or faulty capacitor.',
      fix: 'Nitrogen leak test, gas recharge, or coil hydro jet cleaning.',
      price: 'From ₹499',
    },
    {
      symptom: 'Water Leakage Indoors',
      cause: 'Blocked drain tray, cracked drain pipe, or ice defrosting.',
      fix: 'High-pressure drain flush, slope alignment & tray sanitation.',
      price: 'From ₹599',
    },
    {
      symptom: 'Strange Grinding or Rattling Noise',
      cause: 'Damaged blower wheel bearing or loose outdoor fan motor.',
      fix: 'OEM bushing lubrication, motor alignment or replacement.',
      price: 'From ₹699',
    },
    {
      symptom: 'PCB Blinking Error Code / Tripping MCB',
      cause: 'Voltage surge, burnt IPM inverter module, or compressor short.',
      fix: 'Electronic circuit repair, component soldering, surge protector.',
      price: 'From ₹1,800',
    },
  ];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Fast Emergency Diagnostics
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Mumbai AC Repair & Troubleshooting
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Our certified technicians carry advanced digital manifold gauges, multimeters, and genuine OEM parts to resolve 92% of AC issues on the very first visit.
        </p>
      </div>

      {/* Faults Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Common AC Symptoms We Fix Daily</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonFaults.map(f => (
            <div
              key={f.symptom}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{f.symptom}</span>
                </h3>
                <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{f.price}</span>
              </div>
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <p><strong className="text-slate-800 dark:text-slate-200">Root Cause:</strong> {f.cause}</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Our Fix:</strong> {f.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency CTA */}
      <div className="p-8 rounded-3xl bg-blue-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Have an AC Emergency in Mumbai?</h3>
          <p className="text-xs text-blue-200">Our mobile repair fleet is stationed across Western & South Mumbai.</p>
        </div>
        <a
          href="tel:+919820145890"
          className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow"
        >
          <Phone className="w-4 h-4" />
          <span>Call Dispatch: +91 98201 45890</span>
        </a>
      </div>
    </div>
  );
};
