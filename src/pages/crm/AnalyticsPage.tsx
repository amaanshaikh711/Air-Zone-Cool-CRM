import React, { useMemo } from 'react';
import {
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  Users,
  Wrench,
  Award,
  DollarSign,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';

export const AnalyticsPage: React.FC = () => {
  const { jobs, technicians, payments, amcs } = useApp();

  // Tech Performance data
  const techPerformanceData = useMemo(() => {
    return technicians.map(t => ({
      name: t.name.split(' ')[0],
      jobs: t.completedJobsCount,
      rating: t.rating,
    }));
  }, [technicians]);

  // Service Type Breakdown
  const serviceTypeData = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach(j => {
      counts[j.serviceType] = (counts[j.serviceType] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [jobs]);

  // Brand Revenue Breakdown
  const brandRevenueData = [
    { brand: 'Daikin', revenue: 480000, color: '#0284c7' },
    { brand: 'Mitsubishi', revenue: 390000, color: '#e11d48' },
    { brand: 'Samsung', revenue: 310000, color: '#2563eb' },
    { brand: 'Others', revenue: 120000, color: '#64748b' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Executive Reports & Operations Analytics
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Service profitability, technician efficiency metrics, brand share analysis & revenue velocity
        </p>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tech Performance Leaderboard Chart */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Technician Completed Jobs Leaderboard
            </h3>
            <p className="text-xs text-slate-400">Total jobs delivered by field technician</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={techPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="jobs" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Revenue Comparison */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Revenue by HVAC Brand (FY 25-26)
            </h3>
            <p className="text-xs text-slate-400">Commercial & residential billing volume</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brandRevenueData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <YAxis dataKey="brand" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={80} />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#0284c7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
