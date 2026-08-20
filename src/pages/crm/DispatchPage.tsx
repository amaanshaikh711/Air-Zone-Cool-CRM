import React, { useState, useMemo } from 'react';
import {
  Radio,
  UserCog,
  Wrench,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Play,
  Phone,
  ShieldCheck,
  Send,
  Zap,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Job, Technician, JobStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const DispatchPage: React.FC = () => {
  const {
    jobs,
    technicians,
    assignTechnicianToJob,
    updateJobStatus,
    setTechnicianAvailability,
    showToast,
  } = useApp();

  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [assigningJob, setAssigningJob] = useState<Job | null>(null);

  // Unassigned / Pending Jobs Queue
  const unassignedJobs = useMemo(() => {
    return jobs.filter(j => j.status === 'New' || !j.technicianId);
  }, [jobs]);

  // Active Dispatched Jobs
  const activeDispatchedJobs = useMemo(() => {
    return jobs.filter(j => j.status === 'Assigned' || j.status === 'In Progress');
  }, [jobs]);

  const handleQuickAssign = (jobId: string, techId: string) => {
    assignTechnicianToJob(jobId, techId);
    setAssigningJob(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Operations Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              LIVE DISPATCH COMMAND CENTER
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Field Technician Routing & Live Dispatch Board
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Real-time technician utilization, GPS zone mapping, emergency priority assignment & workload balancing across 7 Mumbai service territories.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
            <div className="text-xs text-slate-400">Unassigned Jobs</div>
            <div className="text-xl font-bold font-mono text-amber-400">{unassignedJobs.length} In Queue</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
            <div className="text-xs text-slate-400">Technicians Active</div>
            <div className="text-xl font-bold font-mono text-cyan-400">{technicians.length} on Duty</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Technicians Live Roster vs. Job Assignment Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 7 Field Technicians Live Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Field Technicians Roster (7 Active Units)
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Click status to toggle</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicians.map(tech => {
              const techActiveJob = jobs.find(j => j.id === tech.activeJobId || (j.technicianId === tech.id && (j.status === 'In Progress' || j.status === 'Assigned')));

              return (
                <div
                  key={tech.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={tech.avatar}
                          alt={tech.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                        />
                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{tech.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{tech.phone}</div>
                        </div>
                      </div>

                      {/* Availability Dropdown */}
                      <select
                        value={tech.availability}
                        onChange={e => setTechnicianAvailability(tech.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border-0 focus:outline-none ${
                          tech.availability === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : tech.availability === 'Busy'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <option value="Available">🟢 Available</option>
                        <option value="Busy">🟡 Busy on Site</option>
                        <option value="On Leave">⚪ On Leave</option>
                      </select>
                    </div>

                    {/* Zone & Certified Brands */}
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium">{tech.zone}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {tech.certifiedBrands.map(b => (
                          <span
                            key={b}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Current Active Assignment */}
                    {techActiveJob ? (
                      <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs space-y-1">
                        <div className="flex items-center justify-between text-amber-900 dark:text-amber-200 font-semibold">
                          <span className="truncate">{techActiveJob.jobNumber}: {techActiveJob.customerName}</span>
                          <span className="text-[10px] uppercase">{techActiveJob.status}</span>
                        </div>
                        <div className="text-[11px] text-amber-700 dark:text-amber-300 truncate">
                          {techActiveJob.serviceType} • {techActiveJob.location}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-400 text-center italic">
                        No active service job assigned
                      </div>
                    )}
                  </div>

                  {/* Tech KPI Footer */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Today: <strong className="text-slate-800 dark:text-slate-200">{tech.todayJobsCount || 0} jobs</strong></span>
                    <span>Completed: <strong className="text-slate-800 dark:text-slate-200">{tech.completedJobsCount || 0}</strong></span>
                    <span>Rating: <strong className="text-amber-500 font-bold">{tech.rating}★</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Unassigned Jobs Dispatch Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Dispatch Queue ({unassignedJobs.length})
              </h2>
            </div>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Needs Assignment</span>
          </div>

          <div className="space-y-3">
            {unassignedJobs.map(job => (
              <div
                key={job.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {job.jobNumber}
                  </span>
                  <Badge variant={job.priority === 'Urgent' ? 'danger' : 'amber'} size="sm">
                    {job.priority}
                  </Badge>
                </div>

                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{job.customerName}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {job.serviceType} <span className="text-blue-600 font-bold">({job.acBrand})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{job.customerAddress || job.location}</div>
                </div>

                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs">
                  {job.problem}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-400">
                    Slot: <strong className="text-slate-700 dark:text-slate-300">{job.scheduledTime}</strong>
                  </div>
                  <button
                    onClick={() => setAssigningJob(job)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1"
                  >
                    <span>Assign Tech</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {unassignedJobs.length === 0 && (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="font-bold text-slate-700 dark:text-slate-200">Dispatch Queue is Clear!</p>
                <p>All active service jobs have been assigned to certified technicians.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TECH ASSIGNMENT MODAL */}
      {assigningJob && (
        <Modal
          isOpen={!!assigningJob}
          onClose={() => setAssigningJob(null)}
          title={`Assign Technician to Job ${assigningJob.jobNumber}`}
          subtitle={`${assigningJob.customerName} • ${assigningJob.serviceType} (${assigningJob.acBrand})`}
          maxWidth="lg"
        >
          <div className="space-y-3 text-xs">
            <div className="text-[11px] text-slate-500">
              Select a certified technician matching the {assigningJob.acBrand} AC brand for territory <strong className="text-slate-800 dark:text-slate-200">{assigningJob.location}</strong>:
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {technicians.map(t => {
                const isCertified = t.certifiedBrands.includes(assigningJob.acBrand);
                return (
                  <div
                    key={t.id}
                    onClick={() => handleQuickAssign(assigningJob.id, t.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isCertified
                        ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:bg-blue-100/70'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          {t.name}
                          {isCertified && (
                            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded">
                              OEM Certified
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{t.zone} • Status: <strong className={t.availability === 'Available' ? 'text-emerald-600' : 'text-amber-600'}>{t.availability}</strong></div>
                      </div>
                    </div>

                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700">
                      Dispatch
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
