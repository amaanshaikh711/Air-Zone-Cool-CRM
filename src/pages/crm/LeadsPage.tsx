import React, { useState, useMemo } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Trash2,
  Edit2,
  MessageSquare,
  Sparkles,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus, ACBrand, ServiceType, Priority } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

const STATUS_COLUMNS: LeadStatus[] = ['New', 'Contacted', 'Site Survey Scheduled', 'Quote Sent', 'Won', 'Lost'];

export const LeadsPage: React.FC = () => {
  const {
    leads,
    addLead,
    updateLead,
    deleteLead,
    convertLeadToCustomer,
    selectedLeadId,
    setSelectedLeadId,
    openQuickCreate,
    showToast,
  } = useApp();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  // Selected lead for detail modal
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  // Sync with selectedLeadId from AppContext if navigated here
  React.useEffect(() => {
    if (selectedLeadId) {
      const found = leads.find(l => l.id === selectedLeadId);
      if (found) setActiveLead(found);
      setSelectedLeadId(null);
    }
  }, [selectedLeadId, leads, setSelectedLeadId]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchQuery =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.phone.includes(searchQuery) ||
        l.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'all' || l.status === statusFilter;
      const matchBrand = brandFilter === 'all' || l.acBrand === brandFilter;

      return matchQuery && matchStatus && matchBrand;
    });
  }, [leads, searchQuery, statusFilter, brandFilter]);

  // Total Pipeline Value
  const totalPipelineValue = useMemo(() => {
    return filteredLeads
      .filter(l => l.status !== 'Lost')
      .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
  }, [filteredLeads]);

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateLead(leadId, { status: newStatus });
  };

  const handleSendWhatsApp = (lead: Lead) => {
    const text = encodeURIComponent(
      `Hello ${lead.name}, this is Air Zone Cool HVAC Mumbai. We received your inquiry regarding ${lead.service} for your ${lead.acBrand} unit. When is a good time for a technician visit?`
    );
    window.open(`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    showToast('info', 'WhatsApp Opened', `Prepared message for ${lead.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Leads & Opportunity Pipeline
            </h1>
            <Badge variant="primary" size="sm">{filteredLeads.length} Leads</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active pipeline value: <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">₹{totalPipelineValue.toLocaleString('en-IN')}</span> across residential & commercial inquiries
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Table View
            </button>
          </div>

          <button
            onClick={() => openQuickCreate('lead')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search leads by customer name, phone, service, company..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Stages</option>
            {STATUS_COLUMNS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Brands</option>
            <option value="Daikin">Daikin</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Samsung">Samsung</option>
          </select>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4 items-start">
          {STATUS_COLUMNS.map(status => {
            const columnLeads = filteredLeads.filter(l => l.status === status);
            const columnTotal = columnLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

            return (
              <div
                key={status}
                className="bg-slate-50/70 dark:bg-slate-900/50 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-800 flex flex-col w-[260px] shrink-0"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{status}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                      {columnLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    ₹{(columnTotal / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Lead Cards */}
                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
                  {columnLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setActiveLead(lead)}
                      className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-md cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {lead.name}
                        </div>
                        <Badge
                          variant={
                            lead.priority === 'Urgent' ? 'danger' :
                            lead.priority === 'High' ? 'amber' : 'default'
                          }
                          size="sm"
                        >
                          {lead.priority}
                        </Badge>
                      </div>

                      {lead.company && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {lead.company}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                        {lead.service}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                          ₹{lead.estimatedValue.toLocaleString('en-IN')}
                        </span>
                        <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">
                          {lead.acBrand}
                        </span>
                      </div>
                    </div>
                  ))}

                  {columnLeads.length === 0 && (
                    <div className="py-8 text-center text-slate-400 text-xs italic">
                      No leads in {status}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Contact / Name</th>
                  <th className="py-3 px-4">Brand & Service</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Est. Value</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredLeads.map(lead => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    onClick={() => setActiveLead(lead)}
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.phone} {lead.company ? `• ${lead.company}` : ''}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{lead.service}</div>
                      <div className="text-[10px] text-slate-400">{lead.acBrand} • {lead.acUnits} unit(s)</div>
                    </td>
                    <td className="py-3 px-4">{lead.location}</td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      ₹{lead.estimatedValue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold focus:outline-none border-0"
                      >
                        {STATUS_COLUMNS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={lead.priority === 'Urgent' ? 'danger' : lead.priority === 'High' ? 'amber' : 'default'}
                        size="sm"
                      >
                        {lead.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleSendWhatsApp(lead)}
                          title="WhatsApp Followup"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        {lead.status !== 'Won' && (
                          <button
                            onClick={() => convertLeadToCustomer(lead.id)}
                            title="Convert to Customer"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteLead(lead.id)}
                          title="Delete"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL & CONVERSION MODAL */}
      {activeLead && (
        <Modal
          isOpen={!!activeLead}
          onClose={() => setActiveLead(null)}
          title={`Lead: ${activeLead.name}`}
          subtitle={`Registered: ${new Date(activeLead.createdAt).toLocaleDateString()} • Source: ${activeLead.source}`}
          maxWidth="2xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  deleteLead(activeLead.id);
                  setActiveLead(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl transition-colors"
              >
                Delete Lead
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendWhatsApp(activeLead)}
                  className="flex items-center gap-1 px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow hover:bg-emerald-700"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </button>
                {activeLead.status !== 'Won' && (
                  <button
                    onClick={() => {
                      convertLeadToCustomer(activeLead.id);
                      setActiveLead(null);
                    }}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow hover:bg-blue-700"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Convert to Customer</span>
                  </button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Contact Details</span>
                <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-1">{activeLead.name}</div>
                {activeLead.company && <div className="text-slate-500">{activeLead.company}</div>}
                <div className="text-slate-600 dark:text-slate-300 mt-1">{activeLead.phone}</div>
                <div className="text-slate-500">{activeLead.email}</div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">HVAC Requirement</span>
                <div className="font-semibold text-slate-800 dark:text-slate-200 mt-1">{activeLead.service}</div>
                <div className="text-slate-500 mt-0.5">{activeLead.acBrand} • {activeLead.acUnits} AC Unit(s)</div>
                <div className="text-slate-500">{activeLead.location}</div>
                <div className="font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">
                  Est: ₹{activeLead.estimatedValue.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Stage Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Change Pipeline Stage</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {STATUS_COLUMNS.map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      updateLead(activeLead.id, { status: st });
                      setActiveLead(prev => prev ? { ...prev, status: st } : null);
                    }}
                    className={`p-2 rounded-xl text-center text-xs font-semibold transition-all ${
                      activeLead.status === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Inquiry Notes & Scope</label>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                {activeLead.notes || 'No extra notes provided.'}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
