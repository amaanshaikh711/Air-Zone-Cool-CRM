import React, { useMemo } from 'react';
import {
  TrendingUp,
  Users,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Radio,
  PlusCircle,
  MessageSquare,
  FileText,
  CreditCard,
  ChevronRight,
  Wind,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  const {
    customers,
    leads,
    jobs,
    technicians,
    amcs,
    payments,
    activities,
    setCurrentRoute,
    setSelectedJobId,
    openQuickCreate,
  } = useApp();

  // Metrics Calculations
  const totalRevenue = useMemo(() => {
    return payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }, [payments]);

  const activeJobs = useMemo(() => {
    return jobs.filter(j => j.status === 'In Progress' || j.status === 'Assigned' || j.status === 'New');
  }, [jobs]);

  const completedJobs = useMemo(() => {
    return jobs.filter(j => j.status === 'Completed');
  }, [jobs]);

  const activeAmcs = useMemo(() => {
    return amcs.filter(a => a.status === 'Active');
  }, [amcs]);

  const availableTechs = useMemo(() => {
    return technicians.filter(t => t.availability === 'Available').length;
  }, [technicians]);

  // Brand Distribution Data for Pie Chart
  const brandDistribution = useMemo(() => {
    const counts: Record<string, number> = { Daikin: 0, Mitsubishi: 0, Samsung: 0, Others: 0 };
    jobs.forEach(j => {
      if (counts[j.acBrand] !== undefined) {
        counts[j.acBrand]++;
      } else {
        counts['Others']++;
      }
    });
    return [
      { name: 'Daikin', value: counts['Daikin'], color: '#0284c7' },
      { name: 'Mitsubishi', value: counts['Mitsubishi'], color: '#e11d48' },
      { name: 'Samsung', value: counts['Samsung'], color: '#2563eb' },
      { name: 'Others', value: counts['Others'], color: '#64748b' },
    ];
  }, [jobs]);

  // Monthly Revenue Trend
  const revenueTrendData = [
    { month: 'Nov', revenue: 420000, jobs: 48 },
    { month: 'Dec', revenue: 380000, jobs: 42 },
    { month: 'Jan', revenue: 510000, jobs: 58 },
    { month: 'Feb', revenue: 640000, jobs: 74 },
    { month: 'Mar', revenue: 780000, jobs: 89 },
    { month: 'Current', revenue: totalRevenue, jobs: jobs.length },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <Wind className="w-64 h-64 text-white" />
        </div>
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/30 text-cyan-300 border border-blue-400/30">
              Live Operations Control
            </span>
            <span className="text-xs text-slate-300">Mumbai West & Central Zones</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Air Zone Cool Operations Dashboard
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            7 Certified field technicians active. 98.4% first-time resolution rate across Daikin, Mitsubishi & Samsung units.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => setCurrentRoute('dispatch')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md transition-all"
          >
            <Radio className="w-4 h-4" />
            <span>Live Dispatch Board</span>
          </button>
          <button
            onClick={() => openQuickCreate('job')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
          >
            <PlusCircle className="w-4 h-4 text-cyan-300" />
            <span>New Service Job</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total CRM Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(2)}L`}
          subtitle={`₹${totalRevenue.toLocaleString('en-IN')} collected`}
          change="24.8% vs last month"
          isPositive={true}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
          onClick={() => setCurrentRoute('payments')}
        />
        <StatCard
          title="Active Field Jobs"
          value={activeJobs.length}
          subtitle={`${completedJobs.length} completed this cycle`}
          change="92% on-time arrival"
          isPositive={true}
          icon={Wrench}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
          onClick={() => setCurrentRoute('jobs')}
        />
        <StatCard
          title="Active AMC Contracts"
          value={activeAmcs.length}
          subtitle="94% renewal retention"
          change="+4 this week"
          isPositive={true}
          icon={ShieldCheck}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconColor="text-blue-600 dark:text-blue-400"
          onClick={() => setCurrentRoute('amc')}
        />
        <StatCard
          title="Technician Fleet"
          value={`${availableTechs} / 7 Free`}
          subtitle="7 certified technicians on duty"
          change="100% attendance"
          isPositive={true}
          icon={Users}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconColor="text-purple-600 dark:text-purple-400"
          onClick={() => setCurrentRoute('technicians')}
        />
      </div>

      {/* Main Charts & Live Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Jobs Trend Area Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Revenue & Service Volume Growth</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monthly billing trends & job completion velocity</p>
            </div>
            <Badge variant="primary" size="sm">FY 2025-2026</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Distribution Pie Chart */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Jobs by AC Brand</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Certified OEM specialization split</p>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Share</span>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {brandDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {brandDistribution.map(b => (
              <div key={b.name} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{b.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{b.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Action Lists Grid: Active Jobs & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent & Active Jobs Queue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Service Jobs Queue</h3>
            </div>
            <button
              onClick={() => setCurrentRoute('jobs')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
            >
              View All ({jobs.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {jobs.slice(0, 5).map(job => (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedJobId(job.id);
                  setCurrentRoute('jobs');
                }}
                className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer transition-all flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{job.jobNumber}</span>
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
                    <Badge variant={job.priority === 'Urgent' ? 'danger' : 'outline'} size="sm">
                      {job.priority}
                    </Badge>
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {job.customerName} • {job.location}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {job.serviceType} ({job.acBrand})
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    ₹{job.estimatedCost.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {job.technicianName ? `Tech: ${job.technicianName.split(' ')[0]}` : 'Unassigned'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity & Audit Stream */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">System Activity Stream</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Real-time log</span>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 6).map(act => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  {act.type === 'job' && <Wrench className="w-3.5 h-3.5" />}
                  {act.type === 'amc' && <ShieldCheck className="w-3.5 h-3.5" />}
                  {act.type === 'lead' && <Users className="w-3.5 h-3.5" />}
                  {act.type === 'quote' && <FileText className="w-3.5 h-3.5" />}
                  {act.type === 'payment' && <CreditCard className="w-3.5 h-3.5 text-emerald-500" />}
                  {act.type === 'dispatch' && <Radio className="w-3.5 h-3.5 text-amber-500" />}
                  {act.type === 'customer' && <Users className="w-3.5 h-3.5" />}
                  {act.type === 'system' && <Clock className="w-3.5 h-3.5" />}
                  {act.type === 'review' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{act.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">{act.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
