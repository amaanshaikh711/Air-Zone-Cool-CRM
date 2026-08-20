import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';

// CRM Pages
import { DashboardPage } from './pages/crm/DashboardPage';
import { LeadsPage } from './pages/crm/LeadsPage';
import { CustomersPage } from './pages/crm/CustomersPage';
import { QuotationsPage } from './pages/crm/QuotationsPage';
import { JobsPage } from './pages/crm/JobsPage';
import { DispatchPage } from './pages/crm/DispatchPage';
import { TechniciansPage } from './pages/crm/TechniciansPage';
import { AMCPage } from './pages/crm/AMCPage';
import { AMCRenewalsPage } from './pages/crm/AMCRenewalsPage';
import { PaymentsPage } from './pages/crm/PaymentsPage';
import { ReviewsPage } from './pages/crm/ReviewsPage';
import { WhatsAppBotPage } from './pages/crm/WhatsAppBotPage';
import { AutomationsPage } from './pages/crm/AutomationsPage';
import { TasksPage } from './pages/crm/TasksPage';
import { NotificationsPage } from './pages/crm/NotificationsPage';
import { AnalyticsPage } from './pages/crm/AnalyticsPage';
import { SettingsPage } from './pages/crm/SettingsPage';

// Public Pages
import { PublicHomePage } from './pages/public/HomePage';
import { PublicServicesPage } from './pages/public/ServicesPage';
import { PublicACRepairPage } from './pages/public/ACRepairPage';
import { PublicACInstallationPage } from './pages/public/ACInstallationPage';
import { PublicAMCPage } from './pages/public/AMCPage';
import { PublicDaikinPage } from './pages/public/DaikinPage';
import { PublicMitsubishiPage } from './pages/public/MitsubishiPage';
import { PublicSamsungPage } from './pages/public/SamsungPage';
import { PublicAboutPage } from './pages/public/AboutPage';
import { PublicContactPage } from './pages/public/ContactPage';

const AppRouter: React.FC = () => {
  const { currentRoute } = useApp();

  const renderContent = () => {
    switch (currentRoute) {
      // CRM Routes
      case 'dashboard':
        return <DashboardPage />;
      case 'leads':
        return <LeadsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'quotations':
        return <QuotationsPage />;
      case 'jobs':
        return <JobsPage />;
      case 'dispatch':
        return <DispatchPage />;
      case 'technicians':
        return <TechniciansPage />;
      case 'amc':
        return <AMCPage />;
      case 'amc-renewals':
        return <AMCRenewalsPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'whatsapp-bot':
        return <WhatsAppBotPage />;
      case 'automations':
        return <AutomationsPage />;
      case 'tasks':
        return <TasksPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;

      // Public Routes
      case 'public-home':
        return <PublicHomePage />;
      case 'public-services':
        return <PublicServicesPage />;
      case 'public-ac-repair':
        return <PublicACRepairPage />;
      case 'public-ac-installation':
        return <PublicACInstallationPage />;
      case 'public-amc':
        return <PublicAMCPage />;
      case 'public-daikin':
        return <PublicDaikinPage />;
      case 'public-mitsubishi':
        return <PublicMitsubishiPage />;
      case 'public-samsung':
        return <PublicSamsungPage />;
      case 'public-about':
        return <PublicAboutPage />;
      case 'public-contact':
        return <PublicContactPage />;

      default:
        return <DashboardPage />;
    }
  };

  return <AppShell>{renderContent()}</AppShell>;
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
