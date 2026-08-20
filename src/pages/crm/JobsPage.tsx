import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  Play,
  RotateCcw,
  Trash2,
  MessageSquare,
  Sparkles,
  Phone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Job, JobStatus, Priority, ACBrand } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

const STATUS_TABS: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'All Jobs' },
  { id: 'New', label: 'New Unassigned' },
  { id: 'Assigned', label: 'Assigned' },
  { id: 'In Progress', label: 'In Progress' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Cancelled', label: 'Cancelled' },
];

export const JobsPage: React.FC = () => {
  const {
    jobs,
    technicians,
    updateJob,
    deleteJob,
    assignTechnicianToJob,
    updateJobStatus,
    selectedJobId,
    setSelectedJobId,
    openQuickCreate,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [activeJob, setActiveJob] = useState<Job | null>(null);

  // Sync if navigated from global search or dashboard
  React.useEffect(() => {
    if (selectedJobId) {
      const found = jobs.find(j => j.id === selectedJobId);
      if (found) setActiveJob(found);
      setSelectedJobId(null);
    }
  }, [selectedJobId, jobs, setSelectedJobId]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchQuery =
        j.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || j.status === statusFilter;
      const matchBrand = brandFilter === 'all' || j.acBrand === brandFilter;
      const matchPriority = priorityFilter === 'all' || j.priority === priorityFilter;

      return matchQuery && matchStatus && matchBrand && matchPriority;
    });
  }, [jobs, searchQuery, statusFilter, brandFilter, priorityFilter]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Service Jobs & Field Execution
            </h1>
            <Badge variant="primary" size="sm">{filteredJobs.length} Jobs</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time status transitions, field technician tracking, job completion verification & instant invoicing
          </p>
        </div>

        <button
          onClick={() => openQuickCreate('job')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Service Job</span>
        </button>
      </div>

      {/* Status Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {STATUS_TABS.map(tab => {
          const count = tab.id === 'all' ? jobs.length : jobs.filter(j => j.status === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                statusFilter === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search jobs by Job ID, customer, location, problem description..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All AC Brands</option>
            <option value="Daikin">Daikin</option>
            <option value="Mitsubishi">Mitsubishi</option>
            <option value="Samsung">Samsung</option>
          </select>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            onClick={() => setActiveJob(job)}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                  {job.jobNumber}
                </span>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant={
                      job.status === 'Completed' ? 'success' :
                      job.status === 'In Progress' ? 'warning' :
                      job.status === 'Assigned' ? 'info' : 'default'
                    }
                    size="sm"
                  >
                    {job.status}
                  </Badge>
                  <Badge
                    variant={job.priority === 'Urgent' ? 'danger' : job.priority === 'High' ? 'amber' : 'default'}
                    size="sm"
                  >
                    {job.priority}
                  </Badge>
                </div>
              </div>

              {/* Customer & Service */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  {job.customerName}
                </h3>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                  {job.serviceType} <span className="text-blue-600 dark:text-blue-400 font-bold">({job.acBrand})</span>
                </div>
              </div>

              {/* Problem snippet */}
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                {job.problem}
              </p>

              {/* Location & Slot */}
              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{job.customerAddress || job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{job.scheduledDate} • {job.scheduledTime}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                  {job.technicianName ? job.technicianName.charAt(0) : '?'}
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {job.technicianName || 'Unassigned'}
                </span>
              </div>

              <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                ₹{job.estimatedCost.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* JOB DETAIL & WORKFLOW MODAL */}
      {activeJob && (
        <Modal
          isOpen={!!activeJob}
          onClose={() => setActiveJob(null)}
          title={`Job: ${activeJob.jobNumber} - ${activeJob.customerName}`}
          subtitle={`${activeJob.serviceType} • ${activeJob.acBrand} AC • Priority: ${activeJob.priority}`}
          maxWidth="3xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  deleteJob(activeJob.id);
                  setActiveJob(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl"
              >
                Cancel / Delete Job
              </button>

              <div className="flex items-center gap-2">
                {activeJob.status === 'New' && (
                  <button
                    onClick={() => {
                      if (technicians[0]) {
                        assignTechnicianToJob(activeJob.id, technicians[0].id);
                        setActiveJob(prev => prev ? { ...prev, technicianId: technicians[0].id, technicianName: technicians[0].name, status: 'Assigned' } : null);
                      }
                    }}
                    className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
                  >
                    Quick Assign Tech
                  </button>
                )}

                {activeJob.status === 'Assigned' && (
                  <button
                    onClick={() => {
                      updateJobStatus(activeJob.id, 'In Progress');
                      setActiveJob(prev => prev ? { ...prev, status: 'In Progress' } : null);
                    }}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Start Work on Site</span>
                  </button>
                )}

                {activeJob.status === 'In Progress' && (
                  <button
                    onClick={() => {
                      updateJobStatus(activeJob.id, 'Completed');
                      setActiveJob(prev => prev ? { ...prev, status: 'Completed', actualCost: activeJob.estimatedCost } : null);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed & Invoice</span>
                  </button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Status Pipeline Selector */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Current Execution Status
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['New', 'Assigned', 'In Progress', 'Completed', 'Cancelled'] as JobStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      updateJobStatus(activeJob.id, st);
                      setActiveJob(prev => prev ? { ...prev, status: st } : null);
                    }}
                    className={`p-2 rounded-xl text-center font-semibold transition-all ${
                      activeJob.status === st
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Information</span>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{activeJob.customerName}</div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeJob.customerPhone}</span>
                </div>
                <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{activeJob.customerAddress || activeJob.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Assignment & Schedule</span>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Assigned Field Technician</label>
                  <select
                    value={activeJob.technicianId || ''}
                    onChange={e => {
                      if (e.target.value) {
                        assignTechnicianToJob(activeJob.id, e.target.value);
                        const tech = technicians.find(t => t.id === e.target.value);
                        setActiveJob(prev => prev ? { ...prev, technicianId: e.target.value, technicianName: tech?.name, status: 'Assigned' } : null);
                      }
                    }}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-semibold focus:outline-none"
                  >
                    <option value="">-- Unassigned --</option>
                    {technicians.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.availability}) - {t.certifiedBrands.join(', ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500">Scheduled:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{activeJob.scheduledDate} ({activeJob.scheduledTime})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Cost:</span>
                  <span className="font-mono font-bold text-blue-600">₹{activeJob.estimatedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Problem & Notes */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Reported Diagnostic Scope</label>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300">
                {activeJob.problem}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
