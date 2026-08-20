import React, { useState } from 'react';
import {
  UserCog,
  Star,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Wrench,
  Award,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Technician, ACBrand } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const TechniciansPage: React.FC = () => {
  const { technicians, setTechnicianAvailability, jobs, showToast } = useApp();
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);

  // Completed jobs by technician
  const getTechCompletedJobs = (techId: string) => {
    return jobs.filter(j => j.technicianId === techId && j.status === 'Completed');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Field Technician Roster & OEM Certifications
            </h1>
            <Badge variant="primary" size="sm">7 Certified Techs</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full-time Daikin, Mitsubishi Electric & Samsung factory-trained HVAC engineers and senior technicians
          </p>
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {technicians.map(tech => {
          const completedJobs = getTechCompletedJobs(tech.id);

          return (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Tech Profile Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tech.avatar}
                      alt={tech.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {tech.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{tech.rating}</span>
                        <span className="text-[11px] text-slate-400 font-normal">({tech.completedJobsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <Badge
                    variant={
                      tech.availability === 'Available' ? 'success' :
                      tech.availability === 'Busy' ? 'warning' : 'default'
                    }
                    size="sm"
                    dot
                  >
                    {tech.availability}
                  </Badge>
                </div>

                {/* Contact & Zone */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tech.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tech.zone}</span>
                  </div>
                </div>

                {/* Certified OEM Brands */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OEM Certifications</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.certifiedBrands.map(b => (
                      <span
                        key={b}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60"
                      >
                        {b} Certified
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Skills</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {tech.skills.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Footer KPI */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Today's Jobs</span>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{tech.todayJobsCount || 0} active</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Lifetime Repaired</span>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">{tech.completedJobsCount || 0} units</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* TECH PROFILE MODAL */}
      {selectedTech && (
        <Modal
          isOpen={!!selectedTech}
          onClose={() => setSelectedTech(null)}
          title={`Technician Profile: ${selectedTech.name}`}
          subtitle={`Zone: ${selectedTech.zone} • Rating: ${selectedTech.rating}★`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <img src={selectedTech.avatar} alt={selectedTech.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{selectedTech.name}</h3>
                <p className="text-slate-500">{selectedTech.phone} • {selectedTech.email}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant={selectedTech.availability === 'Available' ? 'success' : 'warning'} size="sm" dot>
                    {selectedTech.availability}
                  </Badge>
                  <span className="text-slate-400 font-mono text-[11px]">{selectedTech.completedJobsCount} Lifetime Jobs</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Set Availability Status</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Available', 'Busy', 'On Leave'] as Technician['availability'][]).map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      setTechnicianAvailability(selectedTech.id, st);
                      setSelectedTech(prev => prev ? { ...prev, availability: st } : null);
                    }}
                    className={`p-2.5 rounded-xl font-bold transition-all ${
                      selectedTech.availability === st
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Certified OEM Systems & Specialized Tooling</span>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedTech.certifiedBrands.join(', ')} OEM Service Engineer
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Equipped with digital manifold gauges, OEM Inverter PCB fault diagnostic scanners, high-pressure 140 bar jet washers, and R32 / R410A recovery units.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
