import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  iconBgColor = 'bg-blue-50 dark:bg-blue-950/60',
  iconColor = 'text-blue-600 dark:text-blue-400',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-700' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
            {title}
          </span>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {value}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${iconBgColor} ${iconColor} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || change) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`font-semibold inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
              }`}
            >
              {isPositive ? '+' : ''}
              {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500 dark:text-slate-400 truncate">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
