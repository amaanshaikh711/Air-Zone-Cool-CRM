import React, { useState, useMemo } from 'react';
import { Search, User, Wrench, FileText, Shield, Briefcase, Zap, Moon, Sun, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    customers,
    leads,
    quotations,
    jobs,
    amcs,
    technicians,
    setCurrentRoute,
    setSelectedCustomerId,
    setSelectedJobId,
    setSelectedLeadId,
    setSelectedQuotationId,
    setSelectedAmcId,
    openQuickCreate,
    theme,
    toggleTheme,
  } = useApp();

  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: 'Customer' | 'Lead' | 'Job' | 'Quote' | 'AMC' | 'Technician' | 'Action';
      icon: any;
      action: () => void;
    }> = [];

    // Search Customers
    customers.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.company && c.company.toLowerCase().includes(q))) {
        results.push({
          id: c.id,
          title: c.name,
          subtitle: `${c.company ? c.company + ' • ' : ''}${c.phone} • ${c.city}`,
          category: 'Customer',
          icon: User,
          action: () => {
            setSelectedCustomerId(c.id);
            setCurrentRoute('customers');
            setIsSearchOpen(false);
          },
        });
      }
    });

    // Search Leads
    leads.forEach(l => {
      if (l.name.toLowerCase().includes(q) || l.phone.includes(q) || l.service.toLowerCase().includes(q)) {
        results.push({
          id: l.id,
          title: l.name,
          subtitle: `Lead: ${l.service} (${l.acBrand}) • Status: ${l.status}`,
          category: 'Lead',
          icon: Briefcase,
          action: () => {
            setSelectedLeadId(l.id);
            setCurrentRoute('leads');
            setIsSearchOpen(false);
          },
        });
      }
    });

    // Search Jobs
    jobs.forEach(j => {
      if (j.jobNumber.toLowerCase().includes(q) || j.customerName.toLowerCase().includes(q) || j.problem.toLowerCase().includes(q)) {
        results.push({
          id: j.id,
          title: `${j.jobNumber} - ${j.customerName}`,
          subtitle: `${j.serviceType} • Status: ${j.status} • Tech: ${j.technicianName || 'Unassigned'}`,
          category: 'Job',
          icon: Wrench,
          action: () => {
            setSelectedJobId(j.id);
            setCurrentRoute('jobs');
            setIsSearchOpen(false);
          },
        });
      }
    });

    // Search Quotations
    quotations.forEach(quote => {
      if (quote.quotationNumber.toLowerCase().includes(q) || quote.customerName.toLowerCase().includes(q)) {
        results.push({
          id: quote.id,
          title: `${quote.quotationNumber} - ${quote.customerName}`,
          subtitle: `Amount: ₹${quote.grandTotal.toLocaleString('en-IN')} • Status: ${quote.status}`,
          category: 'Quote',
          icon: FileText,
          action: () => {
            setSelectedQuotationId(quote.id);
            setCurrentRoute('quotations');
            setIsSearchOpen(false);
          },
        });
      }
    });

    // Search AMC
    amcs.forEach(amc => {
      if (amc.amcNumber.toLowerCase().includes(q) || amc.customerName.toLowerCase().includes(q)) {
        results.push({
          id: amc.id,
          title: `${amc.amcNumber} - ${amc.customerName}`,
          subtitle: `${amc.contractType} • ${amc.status} • Expires: ${amc.expiryDate}`,
          category: 'AMC',
          icon: Shield,
          action: () => {
            setSelectedAmcId(amc.id);
            setCurrentRoute('amc');
            setIsSearchOpen(false);
          },
        });
      }
    });

    // Search Technicians
    technicians.forEach(t => {
      if (t.name.toLowerCase().includes(q) || t.skills.some(s => s.toLowerCase().includes(q))) {
        results.push({
          id: t.id,
          title: t.name,
          subtitle: `Tech: ${t.certifiedBrands.join(', ')} • Status: ${t.availability} • Rating: ${t.rating}★`,
          category: 'Technician',
          icon: User,
          action: () => {
            setCurrentRoute('technicians');
            setIsSearchOpen(false);
          },
        });
      }
    });

    return results.slice(0, 10);
  }, [query, customers, leads, jobs, quotations, amcs, technicians, setCurrentRoute, setSelectedCustomerId, setSelectedJobId, setSelectedLeadId, setSelectedQuotationId, setSelectedAmcId, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={() => setIsSearchOpen(false)} />

      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search leads, customers, jobs, quotes, AMC contracts, or type commands..."
            className="flex-1 bg-transparent border-0 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results / Quick Actions */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() ? (
            filteredResults.length > 0 ? (
              <div className="space-y-1">
                {filteredResults.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={`${item.category}_${item.id}`}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate flex items-center gap-2">
                            {item.title}
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-normal">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                <p className="text-sm">No records found matching "{query}"</p>
                <p className="text-xs mt-1">Try searching by customer name, phone, job ID or brand.</p>
              </div>
            )
          ) : (
            <div className="p-2 space-y-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
                Quick Actions & Navigation
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => { openQuickCreate('lead'); setIsSearchOpen(false); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  + Create New Lead
                </button>
                <button
                  onClick={() => { openQuickCreate('quote'); setIsSearchOpen(false); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  + Create Quotation
                </button>
                <button
                  onClick={() => { openQuickCreate('job'); setIsSearchOpen(false); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <Wrench className="w-4 h-4 text-amber-500" />
                  + Schedule Service Job
                </button>
                <button
                  onClick={() => { openQuickCreate('amc'); setIsSearchOpen(false); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <Shield className="w-4 h-4 text-purple-500" />
                  + New AMC Contract
                </button>
                <button
                  onClick={() => { setCurrentRoute('dispatch'); setIsSearchOpen(false); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <Zap className="w-4 h-4 text-cyan-500" />
                  Open Dispatch Command
                </button>
                <button
                  onClick={() => { toggleTheme(); }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                  Toggle Dark / Light Theme
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Search across all CRM collections & actions</span>
          <div className="flex items-center gap-2">
            <span>Navigation: <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">↑</kbd> <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">↓</kbd></span>
          </div>
        </div>
      </div>
    </div>
  );
};
