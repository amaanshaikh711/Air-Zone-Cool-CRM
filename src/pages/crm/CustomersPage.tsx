import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Wrench,
  FileText,
  CreditCard,
  Building,
  User,
  Trash2,
  Edit2,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const CustomersPage: React.FC = () => {
  const {
    customers,
    jobs,
    amcs,
    quotations,
    payments,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    selectedCustomerId,
    setSelectedCustomerId,
    setCurrentRoute,
    setSelectedJobId,
    openQuickCreate,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'B2B' | 'B2C'>('all');
  const [amcFilter, setAmcFilter] = useState<'all' | 'amc' | 'non-amc'>('all');

  // Customer Detail Drawer Modal
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(null);

  // Sync if navigated from search
  React.useEffect(() => {
    if (selectedCustomerId) {
      const found = customers.find(c => c.id === selectedCustomerId);
      if (found) setActiveCustomer(found);
      setSelectedCustomerId(null);
    }
  }, [selectedCustomerId, customers, setSelectedCustomerId]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchQuery =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.address && c.address.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchType = typeFilter === 'all' || c.type === typeFilter;
      const matchAmc =
        amcFilter === 'all' ||
        (amcFilter === 'amc' && c.activeAMC) ||
        (amcFilter === 'non-amc' && !c.activeAMC);

      return matchQuery && matchType && matchAmc;
    });
  }, [customers, searchQuery, typeFilter, amcFilter]);

  // Related data for active customer
  const customerJobs = useMemo(() => {
    if (!activeCustomer) return [];
    return jobs.filter(j => j.customerId === activeCustomer.id);
  }, [activeCustomer, jobs]);

  const customerAmcs = useMemo(() => {
    if (!activeCustomer) return [];
    return amcs.filter(a => a.customerId === activeCustomer.id);
  }, [activeCustomer, amcs]);

  const customerQuotes = useMemo(() => {
    if (!activeCustomer) return [];
    return quotations.filter(q => q.customerId === activeCustomer.id);
  }, [activeCustomer, quotations]);

  const customerPayments = useMemo(() => {
    if (!activeCustomer) return [];
    return payments.filter(p => p.customerId === activeCustomer.id);
  }, [activeCustomer, payments]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Customer Directory (360° Profile)
            </h1>
            <Badge variant="primary" size="sm">{filteredCustomers.length} Accounts</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Complete account lifecycle, installed AC unit inventory, AMC service records and billing history
          </p>
        </div>

        <button
          onClick={() => openQuickCreate('customer')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, company, phone, locality..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Accounts (B2B & B2C)</option>
            <option value="B2C">B2C Residential</option>
            <option value="B2B">B2B Commercial</option>
          </select>

          <select
            value={amcFilter}
            onChange={e => setAmcFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All AMC Status</option>
            <option value="amc">Active AMC Contracts</option>
            <option value="non-amc">Non-AMC Customers</option>
          </select>
        </div>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            onClick={() => setActiveCustomer(customer)}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    customer.type === 'B2B'
                      ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300'
                      : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300'
                  }`}>
                    {customer.type === 'B2B' ? <Building className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {customer.name}
                    </h3>
                    {customer.company && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                        {customer.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge variant={customer.type === 'B2B' ? 'purple' : 'primary'} size="sm">
                    {customer.type}
                  </Badge>
                  {customer.activeAMC && (
                    <Badge variant="success" size="sm" dot>
                      AMC Active
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{customer.address || customer.city}</span>
                </div>
              </div>
            </div>

            {/* Stats Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Lifetime Revenue</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  ₹{(customer.totalRevenue || 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Service Jobs</span>
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  {customer.totalJobs || 0} completed
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 360° CUSTOMER DETAIL MODAL */}
      {activeCustomer && (
        <Modal
          isOpen={!!activeCustomer}
          onClose={() => setActiveCustomer(null)}
          title={activeCustomer.name}
          subtitle={`${activeCustomer.type} Account • Customer Since ${activeCustomer.customerSince}`}
          maxWidth="4xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  deleteCustomer(activeCustomer.id);
                  setActiveCustomer(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl"
              >
                Delete Account
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    openQuickCreate('quote');
                    setActiveCustomer(null);
                  }}
                  className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200"
                >
                  + Quotation
                </button>
                <button
                  onClick={() => {
                    openQuickCreate('job');
                    setActiveCustomer(null);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
                >
                  + Book Service Job
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-6 text-xs">
            {/* Header info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Contact & Address</span>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{activeCustomer.phone}</div>
                <div className="text-slate-500">{activeCustomer.email}</div>
                <div className="text-slate-600 dark:text-slate-300 mt-1">{activeCustomer.address}, {activeCustomer.city}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Account Standing</span>
                <div className="font-bold text-base font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{(activeCustomer.totalRevenue || 0).toLocaleString('en-IN')}
                </div>
                <div className="text-slate-500">{customerJobs.length} service jobs logged</div>
                <div className="text-slate-500">Preferred OEM: {activeCustomer.preferredBrand || 'Daikin'}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Active AMC Status</span>
                {activeCustomer.activeAMC ? (
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Active AMC Protection
                  </div>
                ) : (
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg">
                    No active AMC contract
                  </div>
                )}
              </div>
            </div>

            {/* Service Jobs History */}
            <div className="space-y-2">
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center justify-between">
                <span>Service Job History ({customerJobs.length})</span>
              </div>
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-[10px] uppercase font-bold">
                    <tr>
                      <th className="py-2 px-3">Job ID</th>
                      <th className="py-2 px-3">Service & Brand</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {customerJobs.map(j => (
                      <tr key={j.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-2 px-3 font-mono font-bold text-blue-600">{j.jobNumber}</td>
                        <td className="py-2 px-3 font-medium">{j.serviceType} ({j.acBrand})</td>
                        <td className="py-2 px-3 text-slate-500">{j.scheduledDate}</td>
                        <td className="py-2 px-3">
                          <Badge variant={j.status === 'Completed' ? 'success' : 'default'} size="sm">{j.status}</Badge>
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold">₹{j.estimatedCost.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {customerJobs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-slate-400 italic">No job history logged yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AMC Contracts */}
            <div className="space-y-2">
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                AMC Contracts ({customerAmcs.length})
              </div>
              <div className="space-y-2">
                {customerAmcs.map(a => (
                  <div key={a.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{a.amcNumber} - {a.contractType}</div>
                      <div className="text-slate-500 text-[11px]">{a.startDate} to {a.expiryDate} • {a.visitsCompleted} / {a.visitsIncluded} visits done</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={a.status === 'Active' ? 'success' : 'default'} size="sm">{a.status}</Badge>
                      <div className="font-mono font-bold text-blue-600 mt-1">₹{a.annualAmount.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
                {customerAmcs.length === 0 && (
                  <div className="text-slate-400 italic py-2">No active or historical AMC contracts.</div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
