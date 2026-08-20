import React from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  ShieldCheck,
  CreditCard,
  Trash2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Operational Notification Center
            </h1>
            <Badge variant="primary" size="sm">
              {notifications.filter(n => !n.read).length} Unread
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            System dispatch alerts, upcoming AMC visits, invoice settlements & WhatsApp customer triggers
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {notifications.map(notif => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              notif.read
                ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
                : 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 shadow-2xs'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                notif.type === 'job' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600' :
                notif.type === 'amc' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600' :
                notif.type === 'payment' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600' :
                'bg-rose-50 dark:bg-rose-950/60 text-rose-600'
              }`}>
                {notif.type === 'job' && <Wrench className="w-4 h-4" />}
                {notif.type === 'amc' && <ShieldCheck className="w-4 h-4" />}
                {notif.type === 'payment' && <CreditCard className="w-4 h-4" />}
                {notif.type === 'alert' && <AlertTriangle className="w-4 h-4" />}
                {notif.type === 'lead' && <Bell className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{notif.title}</h3>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notif.message}</p>
                <div className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</div>
              </div>
            </div>

            <Badge variant={notif.type === 'alert' ? 'danger' : 'outline'} size="sm">
              {notif.type}
            </Badge>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
            No notifications logged.
          </div>
        )}
      </div>
    </div>
  );
};
