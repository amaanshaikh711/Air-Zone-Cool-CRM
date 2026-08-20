import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PublicContactPage: React.FC = () => {
  const { addLead, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: 'Daikin',
    service: 'AC Repair & Diagnostics',
    location: 'Andheri West',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@client.com`,
      service: formData.service,
      acBrand: formData.brand as any,
      acUnits: 1,
      location: formData.location,
      status: 'New',
      priority: 'Urgent',
      source: 'Contact Page Form',
      estimatedValue: 2000,
      notes: formData.notes || 'Inquiry via Contact page form',
    });

    setSubmitted(true);
    showToast('success', 'Inquiry Registered', 'Technician dispatch will contact you shortly.');
  };

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          We Are Here For You
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Book AC Service or Contact Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Connect with our 24/7 technical dispatch team or request an on-site HVAC inspection anywhere in Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Direct Lines */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
            <h3 className="font-bold text-lg text-cyan-400">Direct Dispatch Lines</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Emergency Dispatch Hotline</div>
                  <a href="tel:+919820145890" className="text-slate-300 font-mono text-sm hover:text-white font-semibold">
                    +91 98201 45890
                  </a>
                  <div className="text-[10px] text-slate-400 mt-0.5">2-Hour Arrival Guarantee (8 AM - 10 PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">WhatsApp Fast Booking</div>
                  <a
                    href="https://wa.me/919820145890?text=Hi%20Air%20Zone%20Cool,%20I%20need%20AC%20service"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 hover:text-emerald-200 font-semibold"
                  >
                    Click to Chat on WhatsApp &rarr;
                  </a>
                  <div className="text-[10px] text-slate-400 mt-0.5">Instant automated chatbot response</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Official Email</div>
                  <a href="mailto:service@airzonecool.com" className="text-slate-300 hover:text-white">
                    service@airzonecool.com
                  </a>
                  <div className="text-[10px] text-slate-400">For quotations & corporate AMC inquiries</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Main Office & Workshop</div>
                  <div className="text-slate-300 leading-relaxed">
                    Shop 4, Greenfield Plaza, Link Road, Andheri West, Mumbai - 400053
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Territory Service Coverage</h4>
            <p className="text-slate-500 leading-relaxed">
              Andheri (East/West), Bandra, Juhu, Khar, Santacruz, Goregaon, Malad, Kandivali, Borivali, Powai, BKC, Lower Parel, Worli, and South Mumbai.
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">Schedule Service Visit</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. 9820145890"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. vikram@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Mumbai Area / Locality</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Bandra West, Pali Hill"
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">AC Brand</label>
                  <select
                    value={formData.brand}
                    onChange={e => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Daikin">Daikin</option>
                    <option value="Mitsubishi">Mitsubishi Electric</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Service Type</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="AC Repair & Diagnostics">AC Repair & Diagnostics</option>
                    <option value="Deep Hydro Jet Cleaning">Deep Hydro Jet Cleaning</option>
                    <option value="Gas Leakage & Charging">Gas Leakage & Charging</option>
                    <option value="AC Installation & Piping">AC Installation & Piping</option>
                    <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Problem Description or Special Instructions</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Describe cooling issues, noises, or error codes..."
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Service Booking</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Service Request Received!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. We have logged your request in our live dispatch queue. Our certified technician will arrive at <strong>{formData.location}</strong> within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Book Another Service
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
