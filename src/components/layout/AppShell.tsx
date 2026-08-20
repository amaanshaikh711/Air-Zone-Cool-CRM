import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PublicNav } from './PublicNav';
import { PublicFooter } from './PublicFooter';
import { ToastContainer } from '../ui/Toast';
import { GlobalSearchModal } from '../ui/GlobalSearchModal';
import { QuickCreateModal } from '../ui/QuickCreateModal';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { currentRoute, toasts, removeToast, isAuthenticated } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPublicPage = currentRoute.startsWith('public-');

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white font-sans">
        <PublicNav />
        <main className="flex-1">
          {children}
        </main>
        <PublicFooter />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
        <GlobalSearchModal />
        <QuickCreateModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans selection:bg-blue-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <TopBar onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      <GlobalSearchModal />
      <QuickCreateModal />
    </div>
  );
};
