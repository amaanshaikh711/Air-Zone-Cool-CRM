import React, { useState } from 'react';
import {
  Zap,
  Play,
  CheckCircle2,
  Clock,
  MessageSquare,
  Mail,
  ShieldAlert,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutomationRule } from '../../types';
import { Badge } from '../../components/ui/Badge';

export const AutomationsPage: React.FC = () => {
  const { automations, toggleAutomation, triggerAutomation, showToast } = useApp();
  const [testingRuleId, setTestingRuleId] = useState<string | null>(null);

  const handleRunNow = (rule: AutomationRule) => {
    setTestingRuleId(rule.id);
    setTimeout(() => {
      triggerAutomation(rule.id);
      setTestingRuleId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Automation Rules & Auto-Triggers
            </h1>
            <Badge variant="primary" size="sm">{automations.filter(a => a.active).length} Active Workflows</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Zero-touch customer lifecycle management: post-service feedback collection, AMC expiration alerts & emergency escalations
          </p>
        </div>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map(rule => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
              rule.active
                ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-2xs'
                : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-70'
            }`}
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{rule.name}</h3>
                    <div className="text-[10px] text-slate-400">Trigger: {rule.trigger}</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleAutomation(rule.id)}
                  className="text-slate-400 hover:text-blue-600 transition-colors"
                >
                  {rule.active ? (
                    <ToggleRight className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-400" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {rule.description}
              </p>

              {/* Action Box */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Configured Auto-Action: {rule.action}</span>
                </div>
                {rule.lastRun && (
                  <div className="text-[10px] text-slate-400">
                    Last triggered: {rule.lastRun}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">
                Fired {rule.timesRun || 0} times
              </span>

              <button
                disabled={testingRuleId === rule.id || !rule.active}
                onClick={() => handleRunNow(rule)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-semibold disabled:opacity-40 transition-colors"
              >
                <Play className="w-3 h-3" />
                <span>{testingRuleId === rule.id ? 'Executing...' : 'Test Trigger Now'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
