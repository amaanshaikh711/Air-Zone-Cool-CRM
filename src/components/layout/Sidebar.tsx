import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  FileText,
  Wrench,
  Radio,
  UserCog,
  Shield,
  CreditCard,
  Star,
  Zap,
  MessageSquare,
  CheckSquare,
  BarChart3,
  Settings,
  Globe,
  PlusCircle,
  Wind,
  PhoneCall,
  Bell,
  RefreshCw,
} from 'lucide-react';
import { CRMRoute, useApp } from '../../context/AppContext';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { currentRoute, setCurrentRoute, leads, jobs, amcs, notifications, openQuickCreate } = useApp();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const activeJobs = jobs.filter(j => j.status === 'In Progress' || j.status === 'Assigned' || j.status === 'New').length;
  const renewalAmcs = amcs.filter(a => a.renewalStatus !== 'None' && a.renewalStatus !== 'Renewed').length;

  const navGroups: Array<{
    title: string;
    items: Array<{
      id: CRMRoute;
      label: string;
      icon: any;
      badge?: number | string;
      badgeColor?: string;
    }>;
  }> = [
    {
      title: 'OPERATIONS CORE',
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'dispatch', label: 'Live Dispatch', icon: Radio, badge: activeJobs, badgeColor: 'bg-amber-500 text-white' },
        { id: 'jobs', label: 'Service Jobs', icon: Wrench, badge: jobs.length },
        { id: 'leads', label: 'Leads & Pipeline', icon: UserCheck, badge: newLeads > 0 ? newLeads : undefined, badgeColor: 'bg-blue-600 text-white' },
        { id: 'customers', label: 'Customer Directory', icon: Users },
      ],
    },
    {
      title: 'SALES & CONTRACTS',
      items: [
        { id: 'quotations', label: 'Quotations & Invoicing', icon: FileText },
        { id: 'amc', label: 'AMC Contracts', icon: Shield, badge: amcs.length },
        { id: 'amc-renewals', label: 'Renewals Hub', icon: RefreshCw, badge: renewalAmcs > 0 ? renewalAmcs : undefined, badgeColor: 'bg-rose-500 text-white' },
        { id: 'payments', label: 'Payments & Revenue', icon: CreditCard },
      ],
    },
    {
      title: 'FIELD & CUSTOMER SUCCESS',
      items: [
        { id: 'technicians', label: 'Technicians Roster', icon: UserCog },
        { id: 'whatsapp-bot', label: 'WhatsApp Automation', icon: MessageSquare, badge: 'Live', badgeColor: 'bg-emerald-500 text-white' },
        { id: 'reviews', label: 'Google Reviews 4.9★', icon: Star },
        { id: 'tasks', label: 'Team Tasks', icon: CheckSquare },
        { id: 'automations', label: 'Workflow Engines', icon: Zap },
      ],
    },
    {
      title: 'INTELLIGENCE & SYSTEM',
      items: [
        { id: 'analytics', label: 'Analytics & KPIs', icon: BarChart3 },
        { id: 'notifications', label: 'Notification Center', icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : undefined, badgeColor: 'bg-red-500 text-white' },
        { id: 'settings', label: 'Company Settings', icon: Settings },
      ],
    },
  ];

  const handleNavClick = (route: CRMRoute) => {
    setCurrentRoute(route);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-r border-slate-200/90 dark:border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white tracking-tight text-sm leading-tight">
                AIR ZONE COOL
              </div>
              <div className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 tracking-wider">
                HVAC FIELD OS
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => openQuickCreate('lead')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Quick Create (+ Lead / Job)</span>
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5 scrollbar-thin">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {group.title}
              </div>
              <div className="space-y-0.5 pt-1">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 font-semibold border border-blue-200/80 dark:border-blue-500/30 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Switch to Public Website */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('public-home')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-400 hover:bg-cyan-50/70 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Customer Website</span>
              </div>
              <span className="text-[10px] text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/60 font-mono">
                View Site ↗
              </span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">7 Techs Active</span>
            </div>
            <div className="text-slate-400 dark:text-slate-400 text-[10px] font-mono">v4.2 PRO</div>
          </div>
        </div>
      </aside>
    </>
  );
};
