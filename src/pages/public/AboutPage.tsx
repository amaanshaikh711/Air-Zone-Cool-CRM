import React from 'react';
import {
  Award,
  ShieldCheck,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicAboutPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Mumbai's HVAC Engineering Authority
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          About Air Zone Cool
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Founded in 2012, Air Zone Cool has evolved from a boutique AC service workshop in Andheri into Mumbai's premier certified HVAC maintenance and field service company.
        </p>
      </div>

      {/* Story & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Engineering Excellence Over Guesswork</h2>
          <p>
            Modern Inverter and VRV/VRF air conditioners are sophisticated electronic and thermodynamic systems. A simple mistake—like using local gas blends or skipping vacuum evacuation—can permanently ruin an inverter compressor.
          </p>
          <p>
            At Air Zone Cool, every field technician is OEM-certified and equipped with digital manifold gauges, nitrogen pressure rigs, and calibrated vacuum gauges. We never cut corners.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="font-mono text-xl font-bold text-blue-600">12+ Years</div>
              <div className="text-[11px] text-slate-500">In Mumbai Market</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="font-mono text-xl font-bold text-emerald-600">18,500+</div>
              <div className="text-[11px] text-slate-500">AC Units Serviced</div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <h3 className="text-lg font-bold text-cyan-400">Our Quality Charter</h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>100% Genuine OEM Spares:</strong> Direct procurement from Daikin, Mitsubishi & Samsung supply chains.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Pure Refrigerants:</strong> Zero adulteration. Certified virgin R32, R410A, and R134A refrigerants.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Transparent Digital Billing:</strong> Itemized GST invoices and upfront fixed-rate estimates.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
