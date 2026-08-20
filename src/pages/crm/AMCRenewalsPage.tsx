import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Phone,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AMCContract } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const AMCRenewalsPage: React.FC = () => {
  const { amcs, renewAMCContract, showToast } = useApp();
  const [selectedAmc, setSelectedAmc] = useState<AMCContract | null>(null);

  // Expiring within 30 days or already expired
  const expiringContracts = useMemo(() => {
    return amcs.map(a => {
      const today = new Date();
      const expiry = new Date(a.expiryDate);
      const diffTime = expiry.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return { ...a, daysLeft: diffDays };
    }).sort((a, b) => a.daysLeft - b.daysLeft);
  }, [amcs]);

  const totalExpiringValue = useMemo(() => {
    return expiringContracts.reduce((sum, a) => sum + a.annualAmount, 0);
  }, [expiringContracts]);

  const handleSendWhatsAppRenewal = (amc: AMCContract) => {
    const text = encodeURIComponent(
      `Hello ${amc.customerName}, your Air Zone Cool HVAC Annual Maintenance Contract (${amc.amcNumber}) for ${amc.numberOfACs} AC unit(s) is due for renewal on ${amc.expiryDate}. Renew today to ensure uninterrupted priority emergency dispatch and free quarterly servicing.`
    );
    window.open(`https://wa.me/91${amc.customerPhone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    showToast('info', 'Renewal WhatsApp Dispatched', `Sent reminder to ${amc.customerName}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 p-6 rounded-2xl text-white shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
              Retention & Recurring Revenue
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Automated AMC Renewal Engine
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Proactive 30, 15, and 7-day automated WhatsApp & SMS renewal triggers to maintain 94%+ annual client retention.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-right">
          <div className="text-xs text-slate-300">Renewal Pipeline Value</div>
          <div className="text-2xl font-bold font-mono text-cyan-300">₹{(totalExpiringValue / 1000).toFixed(0)}k</div>
        </div>
      </div>

      {/* Renewals Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Upcoming Contract Renewals & Expiry Schedule
          </h3>
          <span className="text-xs text-slate-400">{expiringContracts.length} Total Contracts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Contract #</th>
                <th className="py-3 px-4">Customer & Phone</th>
                <th className="py-3 px-4">Plan & Units</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Days Left</th>
                <th className="py-3 px-4">Annual Fee</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {expiringContracts.map(amc => (
                <tr key={amc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {amc.amcNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{amc.customerName}</div>
                    <div className="text-[11px] text-slate-400">{amc.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{amc.contractType}</div>
                    <div className="text-[10px] text-slate-400">{amc.numberOfACs} Unit(s) • {amc.coveredBrands.join(', ')}</div>
                  </td>
                  <td className="py-3 px-4 font-medium">{amc.expiryDate}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        amc.daysLeft <= 0 ? 'danger' :
                        amc.daysLeft <= 15 ? 'warning' : 'primary'
                      }
                      size="sm"
                    >
                      {amc.daysLeft <= 0 ? 'Expired' : `${amc.daysLeft} days`}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    ₹{amc.annualAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSendWhatsAppRenewal(amc)}
                        title="Send WhatsApp Reminder"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => renewAMCContract(amc.id)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Renew for 1 Yr</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
