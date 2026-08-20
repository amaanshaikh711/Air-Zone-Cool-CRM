import React, { useState } from 'react';
import {
  Settings,
  Building,
  Save,
  RotateCcw,
  Download,
  Upload,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  FileSpreadsheet,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';

export const SettingsPage: React.FC = () => {
  const { resetToSeedData, showToast, theme, setTheme } = useApp();

  const [companyData, setCompanyData] = useState({
    name: 'Air Zone Cool Air Conditioning & Refrigeration',
    phone: '+91 98201 45890',
    email: 'service@airzonecool.com',
    gst: '27AABCA1234F1Z8',
    address: 'Shop 4, Greenfield Plaza, Link Road, Andheri West, Mumbai - 400053',
    authorizedBrands: 'Daikin, Mitsubishi Electric, Samsung',
    taxRate: '18',
  });

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Settings Saved', 'Company profile and invoicing settings updated.');
  };

  const handleExportJSON = () => {
    const allData = {
      customers: JSON.parse(localStorage.getItem('azc_customers') || '[]'),
      leads: JSON.parse(localStorage.getItem('azc_leads') || '[]'),
      jobs: JSON.parse(localStorage.getItem('azc_jobs') || '[]'),
      technicians: JSON.parse(localStorage.getItem('azc_technicians') || '[]'),
      quotations: JSON.parse(localStorage.getItem('azc_quotations') || '[]'),
      amcs: JSON.parse(localStorage.getItem('azc_amcs') || '[]'),
      payments: JSON.parse(localStorage.getItem('azc_payments') || '[]'),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `air_zone_cool_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('info', 'Backup Downloaded', 'CRM LocalStorage snapshot exported.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all CRM data back to initial seed data? This will restore realistic demo data.')) {
      resetToSeedData();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          System Administration & Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Company branding, GST tax configuration, service catalog defaults & LocalStorage database management
        </p>
      </div>

      {/* Company Profile Form */}
      <form onSubmit={handleSaveCompany} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-600" />
          <span>HVAC Company Profile & GSTIN</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Company Legal Name</label>
            <input
              type="text"
              value={companyData.name}
              onChange={e => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">GSTIN Number</label>
            <input
              type="text"
              value={companyData.gst}
              onChange={e => setCompanyData(prev => ({ ...prev, gst: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Primary Dispatch Phone</label>
            <input
              type="text"
              value={companyData.phone}
              onChange={e => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Billing & Support Email</label>
            <input
              type="email"
              value={companyData.email}
              onChange={e => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Workshop & Headquarters Address</label>
            <input
              type="text"
              value={companyData.address}
              onChange={e => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>

      {/* Appearance & Theme Selection */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Interface Appearance & Theme</span>
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Choose between our high-contrast, professional Light Mode optimized for daytime dispatch operations, or Dark Mode for reduced eye strain during evening shifts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Light Mode Option */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-slate-300'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white shadow-2xs border border-slate-200 text-amber-500 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>Professional Light Mode</span>
                {theme === 'light' && <Badge variant="primary" size="sm">Active</Badge>}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Crisp enterprise layout with crisp contrast, clean borders, and soft slate neutral tones.
              </p>
            </div>
          </button>

          {/* Dark Mode Option */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-slate-300'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-slate-900 shadow-2xs border border-slate-800 text-cyan-400 shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>Field Dark Mode</span>
                {theme === 'dark' && <Badge variant="primary" size="sm">Active</Badge>}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Deep slate navy aesthetic with vivid neon accent highlights for night and field dispatching.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Database & LocalStorage Tools */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>LocalStorage Database & Backup Engine</span>
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed">
          Air Zone Cool CRM operates directly in browser LocalStorage for ultra-fast, zero-latency persistence across sessions.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Database Backup</span>
          </button>

          <button
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold border border-rose-200 dark:border-rose-800"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
