import React, { useState } from 'react';
import {
  Wind,
  ShieldCheck,
  Star,
  CheckCircle2,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Zap,
  Wrench,
  Sparkles,
  MapPin,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { useApp, CRMRoute } from '../../context/AppContext';

export const PublicHomePage: React.FC = () => {
  const { setCurrentRoute, openQuickCreate, addLead, showToast } = useApp();

  // Instant Quote Estimator State
  const [calcBrand, setCalcBrand] = useState('Daikin');
  const [calcService, setCalcService] = useState('Deep Hydro Jet Cleaning');
  const [calcTonnage, setCalcTonnage] = useState('1.5 Ton');
  const [calcUnits, setCalcUnits] = useState(1);

  // Booking quick form state
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookArea, setBookArea] = useState('Andheri West');

  const estimatedPrice = React.useMemo(() => {
    let base = 699;
    if (calcService === 'AC Repair & Diagnostics') base = 499;
    if (calcService === 'Deep Hydro Jet Cleaning') base = 899;
    if (calcService === 'Gas Leakage & Charging') base = 2499;
    if (calcService === 'AC Installation & Piping') base = 1499;
    if (calcService === 'Inverter PCB Board Repair') base = 2800;

    if (calcTonnage === '2.0 Ton' || calcTonnage === 'Cassette') base *= 1.25;
    return Math.round(base * calcUnits);
  }, [calcService, calcTonnage, calcUnits]);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookPhone) return;

    addLead({
      name: bookName,
      phone: bookPhone,
      email: `${bookName.toLowerCase().replace(/\s+/g, '')}@client.com`,
      service: calcService,
      acBrand: calcBrand as any,
      acUnits: calcUnits,
      location: bookArea,
      status: 'New',
      priority: 'Urgent',
      source: 'Website Booking Form',
      estimatedValue: estimatedPrice,
      notes: `Instant Quote Booked: ${calcUnits}x ${calcTonnage} ${calcBrand} - ${calcService}`,
    });

    showToast('success', 'Booking Confirmed!', 'Our certified HVAC technician has been dispatched.');
    setBookName('');
    setBookPhone('');
  };

  const navTo = (r: CRMRoute) => {
    setCurrentRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>OEM Certified HVAC Engineering Partner • Mumbai</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Precision AC Repair & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  Certified Maintenance
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Specialized in <strong className="text-white">Daikin, Mitsubishi Electric & Samsung</strong> Inverter & VRV cooling systems. 2-Hour guaranteed technician arrival with genuine OEM parts and 90-day warranty.
              </p>

              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>2-Hour Rapid Arrival</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9★ (480+ Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>90-Day Parts Guarantee</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="tel:+919820145890"
                  className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Emergency Dispatch: +91 98201 45890</span>
                </a>
                <button
                  onClick={() => navTo('public-amc')}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5"
                >
                  <span>Explore AMC Plans</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hero Right: Instant Estimator Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Instant AC Price Calculator</h3>
                    <p className="text-[11px] text-slate-500">Transparent OEM pricing</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Zero Hidden Costs
                </span>
              </div>

              <form onSubmit={handleQuickBook} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">AC Brand</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Daikin', 'Mitsubishi', 'Samsung'].map(b => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setCalcBrand(b)}
                        className={`py-2 px-1 rounded-xl text-center font-bold text-xs transition-all ${
                          calcBrand === b
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Service Needed</label>
                  <select
                    value={calcService}
                    onChange={e => setCalcService(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Deep Hydro Jet Cleaning">Deep Hydro Jet Cleaning (Indoor + Outdoor)</option>
                    <option value="AC Repair & Diagnostics">Comprehensive Diagnostic & Inspection</option>
                    <option value="Gas Leakage & Charging">Gas Leakage Detection & R32/R410A Refill</option>
                    <option value="Inverter PCB Board Repair">Inverter PCB Board Fault Repair</option>
                    <option value="AC Installation & Piping">Complete Split AC Installation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Capacity</label>
                    <select
                      value={calcTonnage}
                      onChange={e => setCalcTonnage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    >
                      <option value="1.0 Ton">1.0 Ton</option>
                      <option value="1.5 Ton">1.5 Ton</option>
                      <option value="2.0 Ton">2.0 Ton</option>
                      <option value="Cassette">Cassette / VRV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Units</label>
                    <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setCalcUnits(Math.max(1, calcUnits - 1))}
                        className="px-2 py-0.5 text-slate-600 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-bold text-xs">{calcUnits}</span>
                      <button
                        type="button"
                        onClick={() => setCalcUnits(calcUnits + 1)}
                        className="px-2 py-0.5 text-slate-600 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-3 bg-blue-50 rounded-2xl flex items-center justify-between border border-blue-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600">Estimated Price</span>
                    <div className="text-xl font-mono font-extrabold text-blue-950">₹{estimatedPrice.toLocaleString('en-IN')}</div>
                  </div>
                  <span className="text-[10px] text-blue-600 font-medium">Incl. standard warranty</span>
                </div>

                {/* Direct Booking fields */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={bookName}
                    onChange={e => setBookName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (10 Digits)"
                    value={bookPhone}
                    onChange={e => setBookPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Book Technician Now (2-Hr Arrival)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND SPECIALIZATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Certified Brand Centers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Factory Authorized OEM Service Excellence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Our engineers receive direct OEM factory training with specialized diagnostic tools and authentic replacement components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daikin */}
          <div
            onClick={() => navTo('public-daikin')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 cursor-pointer transition-all space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center font-black text-xl">
                D
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Daikin AC Service Center
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Specialized in Daikin Inverter splits, VRV Home, and Cassette units. Advanced PCB diagnostics and genuine Daikin fan motors and compressors.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Explore Daikin Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Mitsubishi */}
          <div
            onClick={() => navTo('public-mitsubishi')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-rose-500 cursor-pointer transition-all space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-black text-xl">
                M
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 group-hover:text-rose-600 transition-colors">
                Mitsubishi Electric Service
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Certified support for Mitsubishi Kirigamine and Heavy Industries series. Precision copper leak testing and ultra-quiet motor calibration.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
              <span>Explore Mitsubishi Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Samsung */}
          <div
            onClick={() => navTo('public-samsung')}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-600 cursor-pointer transition-all space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-black text-xl">
                S
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Samsung WindFree Specialist
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Expert maintenance for Samsung WindFree micro-hole cooling and Digital Inverter 8-pole compressors. SmartThings connectivity setup.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Explore Samsung Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Complete HVAC Solutions Catalog
            </h2>
          </div>
          <button
            onClick={() => navTo('public-services')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline self-start sm:self-auto"
          >
            <span>View Full Service Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'AC Repair & Diagnostics',
              desc: 'Troubleshooting cooling loss, strange noises, PCB errors & sensor faults.',
              price: '₹499',
              route: 'public-ac-repair',
            },
            {
              title: 'Deep Hydro Jet Cleaning',
              desc: '140-bar high-pressure jet wash removes 99% mold, dust & allergens.',
              price: '₹899',
              route: 'public-services',
            },
            {
              title: 'Gas Leakage & Refill',
              desc: 'Nitrogen pressure testing, brazing leak repair & 100% pure R32/R410A gas.',
              price: '₹2,499',
              route: 'public-services',
            },
            {
              title: 'Installation & Piping',
              desc: 'Pure copper piping, vacuum evacuation & vibration-free outdoor mounting.',
              price: '₹1,499',
              route: 'public-ac-installation',
            },
          ].map(s => (
            <div
              key={s.title}
              onClick={() => navTo(s.route as any)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md cursor-pointer transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{s.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">From {s.price}</span>
                <span className="text-[11px] font-semibold text-slate-400">Book &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE AIR ZONE COOL */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Mumbai Trusts Air Zone Cool
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Setting the gold standard in HVAC service reliability, transparency, and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <Clock className="w-8 h-8 text-cyan-400" />
              <h3 className="font-bold text-sm">2-Hour Rapid Response</h3>
              <p className="text-xs text-slate-400">Guaranteed on-time arrival across Western & South Mumbai territories.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <Award className="w-8 h-8 text-amber-400" />
              <h3 className="font-bold text-sm">100% Genuine OEM Spares</h3>
              <p className="text-xs text-slate-400">Authentic Daikin, Mitsubishi & Samsung parts directly from manufacturers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="font-bold text-sm">90-Day Service Guarantee</h3>
              <p className="text-xs text-slate-400">Complete warranty on all replaced parts, gas charging, and workmanship.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              <h3 className="font-bold text-sm">4.9★ Top Rated</h3>
              <p className="text-xs text-slate-400">Over 480 verified 5-star Google Reviews from homeowners and businesses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Need AC Service Today?</h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg">
              Speak directly with our technical dispatch controller or schedule an instant home appointment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919820145890"
              className="px-6 py-3.5 bg-white text-blue-900 hover:bg-slate-100 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-colors"
            >
              +91 98201 45890
            </a>
            <button
              onClick={() => navTo('public-contact')}
              className="px-6 py-3.5 bg-blue-950/40 hover:bg-blue-950/60 border border-white/20 text-white rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              Book Online &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
