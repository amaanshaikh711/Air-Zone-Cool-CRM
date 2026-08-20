import React from 'react';
import {
  Wrench,
  ShieldCheck,
  Zap,
  Droplets,
  Wind,
  CheckCircle2,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicServicesPage: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const services = [
    {
      title: 'AC Diagnostic & Inspection',
      price: '₹499',
      duration: '45 Mins',
      desc: 'Complete 21-point check: compressor amp draw, PCB circuit codes, thermistor calibration, refrigerant pressures, and fan capacitor ratings.',
      features: ['21-Point Electrical & Mechanical Audit', 'Digital Manifold Pressure Testing', 'Detailed Inspection Report', 'No Service Charge if Repaired'],
    },
    {
      title: 'Deep Hydro Jet Foam Cleaning',
      price: '₹899',
      duration: '60 Mins',
      desc: '140-bar high pressure jet wash with anti-bacterial foam treatment. Cleans evaporator coil, blower fan, and outdoor condenser.',
      features: ['Anti-Bacterial Coil Foam Wash', '140-Bar Jet Machine Cleaning', 'Blower Wheel Disassembly & De-molding', 'Drain Tray Deep Sanitization'],
    },
    {
      title: 'Precision Gas Leakage & Charging',
      price: '₹2,499',
      duration: '90 Mins',
      desc: 'Nitrogen leak detection, copper brazing repair, dual-stage deep vacuum dehydration, and 100% pure R32/R410A refrigerant charging by weight.',
      features: ['Nitrogen 350 PSI Leak Test', 'Copper Brazing Leak Sealing', 'Digital Micron Gauge Vacuuming', '90-Day Cooling & Gas Warranty'],
    },
    {
      title: 'Inverter PCB Board Diagnostics & Repair',
      price: '₹2,800',
      duration: '24-48 Hours',
      desc: 'Micro-soldering repair for Daikin, Mitsubishi, and Samsung IPM modules, microcontroller chips, and surge protectors.',
      features: ['OEM Component Level Repair', 'IPM Module Replacement', 'Thermal Paste Re-application', '6-Month Repair Warranty'],
    },
    {
      title: 'Complete Split AC Installation',
      price: '₹1,499',
      duration: '120 Mins',
      desc: 'Professional wall mounting, vibration-damped outdoor bracket installation, copper flaring, vacuum leak test, and electrical wiring.',
      features: ['Heavy Duty Powder-Coated Brackets', 'Vibration Isolator Bushings', 'Nitrogen & Vacuum Purge', 'Core Drill Hole Sealing'],
    },
    {
      title: 'Safe AC Uninstallation',
      price: '₹799',
      duration: '45 Mins',
      desc: 'Refrigerant pump down into outdoor unit to preserve 100% gas, safe dismounting, and copper tube capping.',
      features: ['Refrigerant Pump Down Safeguard', 'No Gas Wastage Guarantee', 'Clean Pipe Wrapping & Capping', 'Damage-Free Wall Removal'],
    },
  ];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Transparent HVAC Pricing & Services
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Factory-Standard Air Conditioning Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Every service includes OEM-calibrated tooling, background-verified engineers, genuine spare parts, and a 90-day guarantee.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s => (
          <div
            key={s.title}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{s.title}</h3>
                <span className="font-mono font-extrabold text-base text-blue-600 dark:text-blue-400">{s.price}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                {s.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentRoute('public-contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Book Service Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
