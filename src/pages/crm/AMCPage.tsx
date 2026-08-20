import React, { useState, useMemo } from 'react';
import {
  Shield,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  Wrench,
  AlertTriangle,
  RotateCcw,
  User,
  Phone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AMCContract, AMCVisit, AMCVisitStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const AMCPage: React.FC = () => {
  const {
    amcs,
    amcVisits,
    technicians,
    updateAMCContract,
    deleteAMCContract,
    updateAMCVisitStatus,
    renewAMCContract,
    selectedAmcId,
    setSelectedAmcId,
    openQuickCreate,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'contracts' | 'visits'>('contracts');
  const [activeContract, setActiveContract] = useState<AMCContract | null>(null);
  const [activeVisitModal, setActiveVisitModal] = useState<AMCVisit | null>(null);

  // Selected visit tech
  const [selectedVisitTechId, setSelectedVisitTechId] = useState('');

  // Sync from search
  React.useEffect(() => {
    if (selectedAmcId) {
      const found = amcs.find(a => a.id === selectedAmcId);
      if (found) setActiveContract(found);
      setSelectedAmcId(null);
    }
  }, [selectedAmcId, amcs, setSelectedAmcId]);

  const filteredContracts = useMemo(() => {
    return amcs.filter(a => {
      return (
        a.amcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.customerPhone.includes(searchQuery)
      );
    });
  }, [amcs, searchQuery]);

  const filteredVisits = useMemo(() => {
    return amcVisits.filter(v => {
      return (
        v.amcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.customerPhone.includes(searchQuery)
      );
    });
  }, [amcVisits, searchQuery]);

  // Contract specific visits
  const contractVisits = useMemo(() => {
    if (!activeContract) return [];
    return amcVisits.filter(v => v.amcId === activeContract.id);
  }, [activeContract, amcVisits]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Annual Maintenance Contracts (AMC)
            </h1>
            <Badge variant="success" size="sm">{amcs.filter(a => a.status === 'Active').length} Active Contracts</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automated 4 quarterly preventive visits engine, OEM spare parts coverage & contract lifecycle tracking
          </p>
        </div>

        <button
          onClick={() => openQuickCreate('amc')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New AMC Contract</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'contracts'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Active Contracts ({amcs.length})
        </button>
        <button
          onClick={() => setActiveTab('visits')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'visits'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Quarterly Maintenance Visits ({amcVisits.length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by AMC number, customer name, phone..."
          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
        />
      </div>

      {/* CONTRACTS VIEW */}
      {activeTab === 'contracts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContracts.map(amc => (
            <div
              key={amc.id}
              onClick={() => setActiveContract(amc)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {amc.amcNumber}
                  </span>
                  <Badge variant={amc.status === 'Active' ? 'success' : 'default'} size="sm">
                    {amc.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{amc.customerName}</h3>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">{amc.contractType}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{amc.numberOfACs} AC Units ({amc.coveredBrands.join(', ')})</div>
                </div>

                {/* Progress bar for visits */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Quarterly Visits:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {amc.visitsCompleted} of {amc.visitsIncluded} Completed
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${(amc.visitsCompleted / amc.visitsIncluded) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                  <span>Period:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{amc.startDate} to {amc.expiryDate}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Annual Contract Value</span>
                <span className="font-mono font-bold text-base text-slate-900 dark:text-slate-100">
                  ₹{amc.annualAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VISITS VIEW */}
      {activeTab === 'visits' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Visit #</th>
                  <th className="py-3 px-4">AMC Contract</th>
                  <th className="py-3 px-4">Customer Name & Phone</th>
                  <th className="py-3 px-4">Scheduled Date</th>
                  <th className="py-3 px-4">Assigned Tech</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredVisits.map(visit => (
                  <tr
                    key={visit.id}
                    onClick={() => setActiveVisitModal(visit)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-blue-600">
                      Visit #{visit.visitNumber}
                    </td>
                    <td className="py-3 px-4 font-mono">{visit.amcNumber}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{visit.customerName}</div>
                      <div className="text-[11px] text-slate-400">{visit.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4 font-medium">{visit.scheduledDate}</td>
                    <td className="py-3 px-4">
                      {visit.technicianName || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={visit.status === 'Completed' ? 'success' : visit.status === 'In Progress' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {visit.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                      {visit.status !== 'Completed' && (
                        <button
                          onClick={() => {
                            updateAMCVisitStatus(visit.id, 'Completed', visit.technicianId);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700"
                        >
                          Complete Visit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CONTRACT 360 MODAL */}
      {activeContract && (
        <Modal
          isOpen={!!activeContract}
          onClose={() => setActiveContract(null)}
          title={`AMC Contract: ${activeContract.amcNumber}`}
          subtitle={`Customer: ${activeContract.customerName} • ${activeContract.contractType}`}
          maxWidth="3xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  deleteAMCContract(activeContract.id);
                  setActiveContract(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl"
              >
                Delete Contract
              </button>
              <button
                onClick={() => {
                  renewAMCContract(activeContract.id);
                  setActiveContract(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Renew Contract for 1 Year</span>
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Header info */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Contract Terms</span>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">{activeContract.contractType}</div>
                <div className="text-slate-500 mt-0.5">{activeContract.numberOfACs} AC Units Covered ({activeContract.coveredBrands.join(', ')})</div>
                <div className="text-slate-500 mt-1">Contract Validity: {activeContract.startDate} to {activeContract.expiryDate}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Annual Fee</span>
                <div className="font-mono font-bold text-xl text-blue-600 mt-1">₹{activeContract.annualAmount.toLocaleString('en-IN')}</div>
                <div className="text-slate-500 mt-1">{activeContract.visitsCompleted} of {activeContract.visitsIncluded} Visits Completed</div>
              </div>
            </div>

            {/* 4 Quarterly Visits List */}
            <div className="space-y-2">
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                Scheduled 4-Quarter Preventive Visits
              </div>
              <div className="space-y-2">
                {contractVisits.map(v => (
                  <div
                    key={v.id}
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        Quarterly Preventive Visit #{v.visitNumber}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Scheduled: {v.scheduledDate} {v.completedDate ? `• Completed on ${v.completedDate}` : ''}
                      </div>
                      <div className="text-[11px] text-slate-400">Tech: {v.technicianName || 'Pending Assignment'}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={v.status === 'Completed' ? 'success' : 'default'} size="sm">
                        {v.status}
                      </Badge>
                      {v.status !== 'Completed' && (
                        <button
                          onClick={() => {
                            updateAMCVisitStatus(v.id, 'Completed');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-semibold hover:bg-emerald-700"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* VISIT DETAIL MODAL */}
      {activeVisitModal && (
        <Modal
          isOpen={!!activeVisitModal}
          onClose={() => setActiveVisitModal(null)}
          title={`AMC Visit #${activeVisitModal.visitNumber} - ${activeVisitModal.customerName}`}
          subtitle={`Contract ${activeVisitModal.amcNumber} • Scheduled for ${activeVisitModal.scheduledDate}`}
          maxWidth="lg"
          actions={
            <div className="flex items-center justify-end gap-2 w-full">
              {activeVisitModal.status !== 'Completed' && (
                <button
                  onClick={() => {
                    updateAMCVisitStatus(activeVisitModal.id, 'Completed', selectedVisitTechId || activeVisitModal.technicianId);
                    setActiveVisitModal(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow"
                >
                  Confirm & Complete Service Visit
                </button>
              )}
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">{activeVisitModal.customerName} ({activeVisitModal.customerPhone})</div>
              <div className="text-slate-500">{activeVisitModal.customerAddress}</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">Checking {activeVisitModal.acUnitsChecked} {activeVisitModal.acBrand} AC Unit(s)</div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Assign Service Engineer</label>
              <select
                value={selectedVisitTechId || activeVisitModal.technicianId || ''}
                onChange={e => setSelectedVisitTechId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="">-- Choose Field Tech --</option>
                {technicians.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.availability})</option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
