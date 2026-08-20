/**
 * Air Zone Cool CRM - Central React Application Context
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Customer,
  Lead,
  Quotation,
  Job,
  Technician,
  AMCContract,
  AMCVisit,
  Payment,
  Review,
  AutomationRule,
  Notification,
  Activity,
  Task,
  ServiceCatalogItem,
  CompanySettings,
  AppUser,
  JobStatus,
  QuotationStatus,
  AMCVisitStatus,
  Priority,
  ACBrand,
  ServiceType,
} from '../types';
import { STORAGE_KEYS, LocalStorageService } from '../services/storage/localStorageService';
import {
  initializeDatabase,
  SEED_SETTINGS,
  SEED_CUSTOMERS,
  SEED_LEADS,
  SEED_QUOTATIONS,
  SEED_JOBS,
  SEED_TECHNICIANS,
  SEED_AMCS,
  SEED_AMC_VISITS,
  SEED_PAYMENTS,
  SEED_REVIEWS,
  SEED_AUTOMATIONS,
  SEED_TASKS,
  SEED_ACTIVITIES,
  SEED_NOTIFICATIONS,
  SEED_SERVICES,
} from '../data/seedData';

export type CRMRoute = 
  | 'dashboard'
  | 'leads'
  | 'customers'
  | 'quotations'
  | 'jobs'
  | 'dispatch'
  | 'technicians'
  | 'amc'
  | 'amc-renewals'
  | 'payments'
  | 'reviews'
  | 'automations'
  | 'whatsapp-bot'
  | 'tasks'
  | 'notifications'
  | 'analytics'
  | 'settings'
  | 'public-home'
  | 'public-services'
  | 'public-ac-repair'
  | 'public-ac-installation'
  | 'public-amc'
  | 'public-daikin'
  | 'public-mitsubishi'
  | 'public-samsung'
  | 'public-about'
  | 'public-contact';

export const ROUTE_PATH_MAP: Record<CRMRoute, string> = {
  // CRM Routes
  'dashboard': '/dashboard',
  'leads': '/leads',
  'customers': '/customers',
  'quotations': '/quotations',
  'jobs': '/jobs',
  'dispatch': '/dispatch',
  'technicians': '/technicians',
  'amc': '/amc',
  'amc-renewals': '/amc-renewals',
  'payments': '/payments',
  'reviews': '/reviews',
  'automations': '/automations',
  'whatsapp-bot': '/whatsapp-bot',
  'tasks': '/tasks',
  'notifications': '/notifications',
  'analytics': '/analytics',
  'settings': '/settings',

  // Public Website Routes
  'public-home': '/website',
  'public-services': '/website/services',
  'public-ac-repair': '/website/ac-repair',
  'public-ac-installation': '/website/installation',
  'public-amc': '/website/amc-plans',
  'public-daikin': '/website/daikin',
  'public-mitsubishi': '/website/mitsubishi',
  'public-samsung': '/website/samsung',
  'public-about': '/website/about',
  'public-contact': '/website/contact',
};

export const pathToRoute = (pathname: string): CRMRoute => {
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  
  // Public Website Routes
  if (cleanPath === '/' || cleanPath === '/website') return 'public-home';
  if (cleanPath === '/website/services' || cleanPath === '/services') return 'public-services';
  if (cleanPath === '/website/ac-repair' || cleanPath === '/ac-repair') return 'public-ac-repair';
  if (cleanPath === '/website/installation' || cleanPath === '/installation') return 'public-ac-installation';
  if (cleanPath === '/website/amc-plans' || cleanPath === '/website/amc' || cleanPath === '/amc-plans') return 'public-amc';
  if (cleanPath === '/website/daikin' || cleanPath === '/daikin') return 'public-daikin';
  if (cleanPath === '/website/mitsubishi' || cleanPath === '/mitsubishi') return 'public-mitsubishi';
  if (cleanPath === '/website/samsung' || cleanPath === '/samsung') return 'public-samsung';
  if (cleanPath === '/website/about' || cleanPath === '/about') return 'public-about';
  if (cleanPath === '/website/contact' || cleanPath === '/contact') return 'public-contact';

  // CRM Routes
  if (cleanPath === '/dashboard' || cleanPath === '/crm' || cleanPath === '/crm/dashboard') return 'dashboard';
  if (cleanPath === '/leads' || cleanPath === '/crm/leads') return 'leads';
  if (cleanPath === '/customers' || cleanPath === '/crm/customers') return 'customers';
  if (cleanPath === '/quotations' || cleanPath === '/crm/quotations') return 'quotations';
  if (cleanPath === '/jobs' || cleanPath === '/crm/jobs') return 'jobs';
  if (cleanPath === '/dispatch' || cleanPath === '/crm/dispatch') return 'dispatch';
  if (cleanPath === '/technicians' || cleanPath === '/crm/technicians') return 'technicians';
  if (cleanPath === '/amc' || cleanPath === '/crm/amc') return 'amc';
  if (cleanPath === '/amc-renewals' || cleanPath === '/crm/amc-renewals') return 'amc-renewals';
  if (cleanPath === '/payments' || cleanPath === '/crm/payments') return 'payments';
  if (cleanPath === '/reviews' || cleanPath === '/crm/reviews') return 'reviews';
  if (cleanPath === '/automations' || cleanPath === '/crm/automations') return 'automations';
  if (cleanPath === '/whatsapp-bot' || cleanPath === '/crm/whatsapp-bot') return 'whatsapp-bot';
  if (cleanPath === '/tasks' || cleanPath === '/crm/tasks') return 'tasks';
  if (cleanPath === '/notifications' || cleanPath === '/crm/notifications') return 'notifications';
  if (cleanPath === '/analytics' || cleanPath === '/crm/analytics') return 'analytics';
  if (cleanPath === '/settings' || cleanPath === '/crm/settings') return 'settings';

  return 'dashboard';
};

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface AppContextType {
  // Session & Auth
  isAuthenticated: boolean;
  user: AppUser | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;

  // Theme & Navigation
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  currentRoute: CRMRoute;
  setCurrentRoute: (route: CRMRoute) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  selectedQuotationId: string | null;
  setSelectedQuotationId: (id: string | null) => void;
  selectedAmcId: string | null;
  setSelectedAmcId: (id: string | null) => void;

  // Global Modals & Controls
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isQuickCreateOpen: boolean;
  setIsQuickCreateOpen: (open: boolean) => void;
  quickCreateType: 'lead' | 'customer' | 'quote' | 'job' | 'amc' | 'payment' | 'task';
  openQuickCreate: (type: 'lead' | 'customer' | 'quote' | 'job' | 'amc' | 'payment' | 'task') => void;
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Collections
  customers: Customer[];
  leads: Lead[];
  quotations: Quotation[];
  jobs: Job[];
  technicians: Technician[];
  amcs: AMCContract[];
  amcVisits: AMCVisit[];
  payments: Payment[];
  reviews: Review[];
  automations: AutomationRule[];
  notifications: Notification[];
  activities: Activity[];
  tasks: Task[];
  services: ServiceCatalogItem[];
  settings: CompanySettings;

  // CRUD & Cascade Operations
  // Leads
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'lastContact'>) => Lead;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  convertLeadToCustomer: (leadId: string) => Customer | null;

  // Customers
  addCustomer: (customerData: Omit<Customer, 'id' | 'customerSince' | 'totalRevenue' | 'totalJobs' | 'activeAMC'>) => Customer;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Quotations
  addQuotation: (quoteData: Omit<Quotation, 'id' | 'quotationNumber' | 'createdDate'>) => Quotation;
  updateQuotation: (id: string, updates: Partial<Quotation>) => void;
  deleteQuotation: (id: string) => void;
  acceptQuotation: (id: string) => void;
  convertQuotationToJob: (quoteId: string) => Job | null;

  // Jobs
  addJob: (jobData: Omit<Job, 'id' | 'jobNumber' | 'createdAt'>) => Job;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  assignTechnicianToJob: (jobId: string, technicianId: string) => void;
  updateJobStatus: (jobId: string, newStatus: JobStatus) => void;

  // Technicians
  updateTechnician: (id: string, updates: Partial<Technician>) => void;
  setTechnicianAvailability: (id: string, availability: Technician['availability']) => void;

  // AMC & Visits
  addAMCContract: (amcData: Omit<AMCContract, 'id' | 'amcNumber' | 'visitsCompleted' | 'visitsRemaining' | 'status' | 'renewalStatus'>) => AMCContract;
  updateAMCContract: (id: string, updates: Partial<AMCContract>) => void;
  deleteAMCContract: (id: string) => void;
  updateAMCVisitStatus: (visitId: string, newStatus: AMCVisitStatus, technicianId?: string, remarks?: string) => void;
  renewAMCContract: (amcId: string) => AMCContract | null;
  triggerAMCRenewalReminder: (amcId: string, step: string) => void;

  // Payments
  addPayment: (paymentData: Omit<Payment, 'id' | 'paymentNumber'>) => Payment;
  updatePaymentStatus: (id: string, newStatus: Payment['status']) => void;
  deletePayment: (id: string) => void;

  // Reviews
  addReview: (reviewData: Omit<Review, 'id' | 'date' | 'responseStatus'>) => Review;
  respondToReview: (reviewId: string, responseText: string) => void;
  generateAIReviewResponse: (rating: number, service: string, brand: string, customerName: string) => string;

  // Tasks
  addTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => Task;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;

  // Automations & Notifications
  toggleAutomationRule: (id: string) => void;
  runAutomationSimulation: (ruleId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;

  // Services & Settings
  addServiceItem: (item: Omit<ServiceCatalogItem, 'id'>) => void;
  updateServiceItem: (id: string, updates: Partial<ServiceCatalogItem>) => void;
  deleteServiceItem: (id: string) => void;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;

  // Database Management
  resetAllData: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;

  // WhatsApp Simulation Lead Gen
  createWhatsAppLead: (customerName: string, phone: string, service: ServiceType, brand: ACBrand, problem: string, scheduledDate: string) => { lead: Lead; job: Job };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Ensure Database is initialized on boot
  initializeDatabase();

  // Reload helper
  const reloadState = useCallback(() => {
    setCustomers(LocalStorageService.getCollection<Customer>(STORAGE_KEYS.CUSTOMERS) || SEED_CUSTOMERS);
    setLeads(LocalStorageService.getCollection<Lead>(STORAGE_KEYS.LEADS) || SEED_LEADS);
    setQuotations(LocalStorageService.getCollection<Quotation>(STORAGE_KEYS.QUOTES) || SEED_QUOTATIONS);
    setJobs(LocalStorageService.getCollection<Job>(STORAGE_KEYS.JOBS) || SEED_JOBS);
    setTechnicians(LocalStorageService.getCollection<Technician>(STORAGE_KEYS.TECHNICIANS) || SEED_TECHNICIANS);
    setAmcs(LocalStorageService.getCollection<AMCContract>(STORAGE_KEYS.AMCS) || SEED_AMCS);
    setAmcVisits(LocalStorageService.getCollection<AMCVisit>(STORAGE_KEYS.AMC_VISITS) || SEED_AMC_VISITS);
    setPayments(LocalStorageService.getCollection<Payment>(STORAGE_KEYS.PAYMENTS) || SEED_PAYMENTS);
    setReviews(LocalStorageService.getCollection<Review>(STORAGE_KEYS.REVIEWS) || SEED_REVIEWS);
    setAutomations(LocalStorageService.getCollection<AutomationRule>(STORAGE_KEYS.AUTOMATIONS) || SEED_AUTOMATIONS);
    setNotifications(LocalStorageService.getCollection<Notification>(STORAGE_KEYS.NOTIFICATIONS) || SEED_NOTIFICATIONS);
    setActivities(LocalStorageService.getCollection<Activity>(STORAGE_KEYS.ACTIVITIES) || SEED_ACTIVITIES);
    setTasks(LocalStorageService.getCollection<Task>(STORAGE_KEYS.TASKS) || SEED_TASKS);
    setServices(LocalStorageService.getCollection<ServiceCatalogItem>(STORAGE_KEYS.SERVICES) || SEED_SERVICES);
    setSettings(LocalStorageService.getObject<CompanySettings>(STORAGE_KEYS.SETTINGS, SEED_SETTINGS) || SEED_SETTINGS);
  }, []);

  useEffect(() => {
    const wasSeeded = initializeDatabase();
    if (wasSeeded) {
      reloadState();
    }
  }, [reloadState]);

  // Theme
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  });

  const setTheme = (next: 'light' | 'dark') => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Auth Session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const session = LocalStorageService.getObject<{ isAuthenticated: boolean }>(STORAGE_KEYS.SESSION, { isAuthenticated: true });
    return !!session?.isAuthenticated;
  });

  const [user, setUser] = useState<AppUser | null>(() => {
    const session = LocalStorageService.getObject<{ user: AppUser }>(STORAGE_KEYS.SESSION, {
      user: {
        id: 'usr_admin',
        name: 'Suhail Khan (Operations Director)',
        email: 'admin@airzonecool.com',
        role: 'admin',
        phone: '+91 98201 45890',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
    });
    return session?.user || null;
  });

  const login = (email: string, pass: string): boolean => {
    if (email === 'admin@airzonecool.com' && pass === 'admin123') {
      const authUser: AppUser = {
        id: 'usr_admin',
        name: 'Suhail Khan (Operations Director)',
        email: 'admin@airzonecool.com',
        role: 'admin',
        phone: '+91 98201 45890',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      };
      setIsAuthenticated(true);
      setUser(authUser);
      LocalStorageService.setObject(STORAGE_KEYS.SESSION, { isAuthenticated: true, user: authUser });
      showToast('success', 'Welcome Back', 'Signed in as Operations Director.');
      return true;
    }
    showToast('error', 'Authentication Failed', 'Invalid credentials. Use admin@airzonecool.com / admin123');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    LocalStorageService.setObject(STORAGE_KEYS.SESSION, { isAuthenticated: false, user: null });
    showToast('info', 'Logged Out', 'You have been signed out.');
  };

  // Routing with URL synchronization
  const [currentRoute, setCurrentRouteState] = useState<CRMRoute>(() => {
    return pathToRoute(window.location.pathname);
  });
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);
  const [selectedAmcId, setSelectedAmcId] = useState<string | null>(null);

  // Sync state on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRouteState(pathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setCurrentRoute = (route: CRMRoute) => {
    setCurrentRouteState(route);
    const targetPath = ROUTE_PATH_MAP[route] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ route }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals & Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [quickCreateType, setQuickCreateType] = useState<'lead' | 'customer' | 'quote' | 'job' | 'amc' | 'payment' | 'task'>('lead');

  const openQuickCreate = (type: 'lead' | 'customer' | 'quote' | 'job' | 'amc' | 'payment' | 'task') => {
    setQuickCreateType(type);
    setIsQuickCreateOpen(true);
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = useCallback((type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper to safely load collection with seed fallback
  const getInitialCollection = <T,>(key: string, seed: T[]): T[] => {
    const list = LocalStorageService.getCollection<T>(key);
    return list && list.length > 0 ? list : seed;
  };

  // Collections State - Guaranteed immediate data fallback
  const [customers, setCustomers] = useState<Customer[]>(() => getInitialCollection<Customer>(STORAGE_KEYS.CUSTOMERS, SEED_CUSTOMERS));
  const [leads, setLeads] = useState<Lead[]>(() => getInitialCollection<Lead>(STORAGE_KEYS.LEADS, SEED_LEADS));
  const [quotations, setQuotations] = useState<Quotation[]>(() => getInitialCollection<Quotation>(STORAGE_KEYS.QUOTES, SEED_QUOTATIONS));
  const [jobs, setJobs] = useState<Job[]>(() => getInitialCollection<Job>(STORAGE_KEYS.JOBS, SEED_JOBS));
  const [technicians, setTechnicians] = useState<Technician[]>(() => getInitialCollection<Technician>(STORAGE_KEYS.TECHNICIANS, SEED_TECHNICIANS));
  const [amcs, setAmcs] = useState<AMCContract[]>(() => getInitialCollection<AMCContract>(STORAGE_KEYS.AMCS, SEED_AMCS));
  const [amcVisits, setAmcVisits] = useState<AMCVisit[]>(() => getInitialCollection<AMCVisit>(STORAGE_KEYS.AMC_VISITS, SEED_AMC_VISITS));
  const [payments, setPayments] = useState<Payment[]>(() => getInitialCollection<Payment>(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS));
  const [reviews, setReviews] = useState<Review[]>(() => getInitialCollection<Review>(STORAGE_KEYS.REVIEWS, SEED_REVIEWS));
  const [automations, setAutomations] = useState<AutomationRule[]>(() => getInitialCollection<AutomationRule>(STORAGE_KEYS.AUTOMATIONS, SEED_AUTOMATIONS));
  const [notifications, setNotifications] = useState<Notification[]>(() => getInitialCollection<Notification>(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS));
  const [activities, setActivities] = useState<Activity[]>(() => getInitialCollection<Activity>(STORAGE_KEYS.ACTIVITIES, SEED_ACTIVITIES));
  const [tasks, setTasks] = useState<Task[]>(() => getInitialCollection<Task>(STORAGE_KEYS.TASKS, SEED_TASKS));
  const [services, setServices] = useState<ServiceCatalogItem[]>(() => getInitialCollection<ServiceCatalogItem>(STORAGE_KEYS.SERVICES, SEED_SERVICES));
  const [settings, setSettings] = useState<CompanySettings>(() => LocalStorageService.getObject<CompanySettings>(STORAGE_KEYS.SETTINGS, SEED_SETTINGS) || SEED_SETTINGS);

  // Keyboard shortcut for Cmd/Ctrl + K (Command Palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // -------------------------------------------------------------
  // LEADS OPERATIONS
  // -------------------------------------------------------------
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'lastContact'>): Lead => {
    const newLead: Lead = {
      ...leadData,
      id: 'lead_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    };
    LocalStorageService.createRecord(STORAGE_KEYS.LEADS, newLead);
    LocalStorageService.addActivity({
      title: 'New Lead Created',
      description: `Lead registered for ${newLead.name} (${newLead.service} - ${newLead.acBrand})`,
      type: 'lead',
      relatedId: newLead.id,
      relatedType: 'Lead',
      user: user?.name || 'Staff',
    });
    LocalStorageService.addNotification({
      title: 'New Lead Inquired',
      message: `${newLead.name} inquired for ${newLead.service} (${newLead.acBrand}). Est: ₹${newLead.estimatedValue.toLocaleString('en-IN')}`,
      type: 'lead',
      linkTo: '/leads',
    });
    reloadState();
    showToast('success', 'Lead Created', `Lead for ${newLead.name} added successfully.`);
    return newLead;
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.LEADS, id, updates);
    reloadState();
    showToast('info', 'Lead Updated', 'Lead details updated.');
  };

  const deleteLead = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.LEADS, id);
    reloadState();
    showToast('warning', 'Lead Deleted', 'Lead removed from CRM.');
  };

  const convertLeadToCustomer = (leadId: string): Customer | null => {
    const lead = LocalStorageService.getRecord<Lead>(STORAGE_KEYS.LEADS, leadId);
    if (!lead) return null;

    // Check if customer already exists with phone
    const existing = customers.find(c => c.phone === lead.phone);
    if (existing) {
      LocalStorageService.updateRecord(STORAGE_KEYS.LEADS, leadId, {
        status: 'Won',
        convertedCustomerId: existing.id,
      });
      reloadState();
      showToast('info', 'Lead Linked', `Lead marked as Won and linked to existing customer ${existing.name}.`);
      return existing;
    }

    const newCustomer: Customer = {
      id: 'cust_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      name: lead.name,
      company: lead.company || '',
      type: lead.type,
      phone: lead.phone,
      email: lead.email,
      address: lead.location,
      city: lead.city || 'Mumbai',
      customerSince: new Date().toISOString().split('T')[0],
      totalRevenue: 0,
      totalJobs: 0,
      activeAMC: false,
      preferredBrand: lead.acBrand,
      notes: `Converted from Lead (${lead.source}). Original notes: ${lead.notes}`,
    };

    LocalStorageService.createRecord(STORAGE_KEYS.CUSTOMERS, newCustomer);
    LocalStorageService.updateRecord(STORAGE_KEYS.LEADS, leadId, {
      status: 'Won',
      convertedCustomerId: newCustomer.id,
    });

    LocalStorageService.addActivity({
      title: 'Lead Converted to Customer',
      description: `${lead.name} won and converted to formal Customer record (#${newCustomer.id})`,
      type: 'customer',
      relatedId: newCustomer.id,
      relatedType: 'Customer',
      user: user?.name || 'Staff',
    });

    LocalStorageService.addNotification({
      title: 'New Customer Converted!',
      message: `Lead ${lead.name} successfully converted to Customer profile.`,
      type: 'customer',
      linkTo: '/customers',
    });

    reloadState();
    showToast('success', 'Lead Won & Converted!', `${newCustomer.name} is now a registered customer.`);
    return newCustomer;
  };

  // -------------------------------------------------------------
  // CUSTOMERS OPERATIONS
  // -------------------------------------------------------------
  const addCustomer = (customerData: Omit<Customer, 'id' | 'customerSince' | 'totalRevenue' | 'totalJobs' | 'activeAMC'>): Customer => {
    const newCustomer: Customer = {
      ...customerData,
      id: 'cust_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      customerSince: new Date().toISOString().split('T')[0],
      totalRevenue: 0,
      totalJobs: 0,
      activeAMC: false,
    };
    LocalStorageService.createRecord(STORAGE_KEYS.CUSTOMERS, newCustomer);
    LocalStorageService.addActivity({
      title: 'Customer Registered',
      description: `Customer ${newCustomer.name} added to database`,
      type: 'customer',
      relatedId: newCustomer.id,
      relatedType: 'Customer',
      user: user?.name || 'Staff',
    });
    reloadState();
    showToast('success', 'Customer Added', `${newCustomer.name} successfully added.`);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, id, updates);
    reloadState();
    showToast('info', 'Customer Updated', 'Customer profile updated.');
  };

  const deleteCustomer = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.CUSTOMERS, id);
    reloadState();
    showToast('warning', 'Customer Deleted', 'Customer record removed.');
  };

  // -------------------------------------------------------------
  // QUOTATIONS OPERATIONS
  // -------------------------------------------------------------
  const addQuotation = (quoteData: Omit<Quotation, 'id' | 'quotationNumber' | 'createdDate'>): Quotation => {
    const count = quotations.length + 101;
    const quotationNumber = `AZC-QT-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
    const newQuote: Quotation = {
      ...quoteData,
      id: 'quote_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      quotationNumber,
      createdDate: new Date().toISOString(),
    };
    LocalStorageService.createRecord(STORAGE_KEYS.QUOTES, newQuote);
    LocalStorageService.addActivity({
      title: `Quotation ${quotationNumber} Generated`,
      description: `Quotation of ₹${newQuote.grandTotal.toLocaleString('en-IN')} created for ${newQuote.customerName}`,
      type: 'quote',
      relatedId: newQuote.id,
      relatedType: 'Quotation',
      user: user?.name || 'Staff',
    });
    LocalStorageService.addNotification({
      title: `Quotation Generated (${quotationNumber})`,
      message: `Quotation for ₹${newQuote.grandTotal.toLocaleString('en-IN')} prepared for ${newQuote.customerName}.`,
      type: 'quote',
      linkTo: '/quotations',
    });
    reloadState();
    showToast('success', 'Quotation Created', `Quotation ${quotationNumber} generated.`);
    return newQuote;
  };

  const updateQuotation = (id: string, updates: Partial<Quotation>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.QUOTES, id, updates);
    reloadState();
    showToast('info', 'Quotation Updated', 'Quotation details saved.');
  };

  const deleteQuotation = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.QUOTES, id);
    reloadState();
    showToast('warning', 'Quotation Deleted', 'Quotation removed.');
  };

  const acceptQuotation = (id: string) => {
    const quote = LocalStorageService.getRecord<Quotation>(STORAGE_KEYS.QUOTES, id);
    if (!quote) return;
    LocalStorageService.updateRecord(STORAGE_KEYS.QUOTES, id, { status: 'Accepted' });
    LocalStorageService.addActivity({
      title: `Quotation ${quote.quotationNumber} Accepted`,
      description: `${quote.customerName} approved the quote for ₹${quote.grandTotal.toLocaleString('en-IN')}`,
      type: 'quote',
      relatedId: quote.id,
      relatedType: 'Quotation',
      user: user?.name || 'Staff',
    });
    LocalStorageService.addNotification({
      title: 'Quotation Approved by Client!',
      message: `${quote.customerName} accepted Quotation ${quote.quotationNumber}. Ready to convert to job.`,
      type: 'quote',
      linkTo: '/quotations',
    });
    reloadState();
    showToast('success', 'Quotation Accepted!', `Quotation ${quote.quotationNumber} marked as Accepted.`);
  };

  const convertQuotationToJob = (quoteId: string): Job | null => {
    const quote = LocalStorageService.getRecord<Quotation>(STORAGE_KEYS.QUOTES, quoteId);
    if (!quote) return null;

    const count = jobs.length + 801;
    const jobNumber = `JOB-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;

    // Determine brand and service from quote description
    let acBrand: ACBrand = 'Daikin';
    if (quote.items.some(i => i.description.toLowerCase().includes('mitsubishi'))) acBrand = 'Mitsubishi';
    else if (quote.items.some(i => i.description.toLowerCase().includes('samsung'))) acBrand = 'Samsung';

    let serviceType: ServiceType = 'AC Repair & Troubleshooting';
    if (quote.items.some(i => i.description.toLowerCase().includes('amc') || i.description.toLowerCase().includes('annual'))) serviceType = 'AMC Preventive Maintenance';
    else if (quote.items.some(i => i.description.toLowerCase().includes('install'))) serviceType = 'AC Installation & Uninstallation';
    else if (quote.items.some(i => i.description.toLowerCase().includes('cleaning') || i.description.toLowerCase().includes('jet'))) serviceType = 'Deep Jet Cleaning & Servicing';
    else if (quote.items.some(i => i.description.toLowerCase().includes('gas'))) serviceType = 'Gas Leakage & Charging';
    else if (quote.items.some(i => i.description.toLowerCase().includes('pcb'))) serviceType = 'PCB Board Repair';
    else if (quote.items.some(i => i.description.toLowerCase().includes('vrv') || i.description.toLowerCase().includes('vrf'))) serviceType = 'Ductable / VRV / VRF Servicing';

    const newJob: Job = {
      id: 'job_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      jobNumber,
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerPhone: quote.customerPhone,
      customerAddress: quote.customerAddress || 'On file',
      serviceType,
      acBrand,
      location: quote.customerAddress ? quote.customerAddress.split(',')[0] : 'Mumbai',
      problem: `Work converted from Approved Quotation ${quote.quotationNumber}. Scope: ${quote.items.map(i => i.description).join('; ')}`,
      priority: 'High',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '10:00 AM - 01:00 PM',
      status: 'New',
      estimatedCost: quote.grandTotal,
      actualCost: 0,
      quotationId: quote.id,
      createdAt: new Date().toISOString(),
    };

    LocalStorageService.createRecord(STORAGE_KEYS.JOBS, newJob);
    LocalStorageService.updateRecord(STORAGE_KEYS.QUOTES, quote.id, {
      status: 'Accepted',
      linkedJobId: newJob.id,
    });

    // Update customer jobs count
    const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, quote.customerId);
    if (customer) {
      LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
        totalJobs: (customer.totalJobs || 0) + 1,
      });
    }

    LocalStorageService.addActivity({
      title: `Job ${jobNumber} Created from Quotation`,
      description: `Job generated from approved Quote ${quote.quotationNumber} for ${quote.customerName}`,
      type: 'job',
      relatedId: newJob.id,
      relatedType: 'Job',
      user: user?.name || 'Staff',
    });

    LocalStorageService.addNotification({
      title: `New Service Job Created (${jobNumber})`,
      message: `Job generated from Quotation ${quote.quotationNumber}. Ready for dispatch assignment.`,
      type: 'job',
      linkTo: '/dispatch',
    });

    reloadState();
    showToast('success', 'Job Created!', `Job ${jobNumber} generated from quotation. Assign technician in Dispatch.`);
    return newJob;
  };

  // -------------------------------------------------------------
  // JOBS OPERATIONS
  // -------------------------------------------------------------
  const addJob = (jobData: Omit<Job, 'id' | 'jobNumber' | 'createdAt'>): Job => {
    const count = jobs.length + 801;
    const jobNumber = `JOB-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
    const newJob: Job = {
      ...jobData,
      id: 'job_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      jobNumber,
      createdAt: new Date().toISOString(),
    };

    LocalStorageService.createRecord(STORAGE_KEYS.JOBS, newJob);

    // Update customer stats
    const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, newJob.customerId);
    if (customer) {
      LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
        totalJobs: (customer.totalJobs || 0) + 1,
      });
    }

    // If technician is assigned immediately, update technician jobs
    if (newJob.technicianId) {
      const tech = LocalStorageService.getRecord<Technician>(STORAGE_KEYS.TECHNICIANS, newJob.technicianId);
      if (tech) {
        LocalStorageService.updateRecord(STORAGE_KEYS.TECHNICIANS, tech.id, {
          todayJobsCount: (tech.todayJobsCount || 0) + 1,
          availability: 'Busy',
          activeJobId: newJob.id,
        });
      }
    }

    LocalStorageService.addActivity({
      title: `Job ${jobNumber} Created`,
      description: `Service job created for ${newJob.customerName} (${newJob.serviceType} - ${newJob.acBrand})`,
      type: 'job',
      relatedId: newJob.id,
      relatedType: 'Job',
      user: user?.name || 'Staff',
    });

    LocalStorageService.addNotification({
      title: `New Service Job (${jobNumber})`,
      message: `Job for ${newJob.customerName} created. Status: ${newJob.status}.`,
      type: 'job',
      linkTo: '/jobs',
    });

    reloadState();
    showToast('success', 'Job Created', `Job ${jobNumber} scheduled.`);
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.JOBS, id, updates);
    reloadState();
    showToast('info', 'Job Updated', 'Job details saved.');
  };

  const deleteJob = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.JOBS, id);
    reloadState();
    showToast('warning', 'Job Deleted', 'Job removed.');
  };

  const assignTechnicianToJob = (jobId: string, technicianId: string) => {
    const job = LocalStorageService.getRecord<Job>(STORAGE_KEYS.JOBS, jobId);
    const tech = LocalStorageService.getRecord<Technician>(STORAGE_KEYS.TECHNICIANS, technicianId);
    if (!job || !tech) return;

    LocalStorageService.updateRecord(STORAGE_KEYS.JOBS, jobId, {
      technicianId: tech.id,
      technicianName: tech.name,
      status: job.status === 'Pending' ? 'Scheduled' : job.status,
    });

    LocalStorageService.updateRecord(STORAGE_KEYS.TECHNICIANS, tech.id, {
      todayJobsCount: (tech.todayJobsCount || 0) + 1,
      availability: 'Busy',
      activeJobId: job.id,
    });

    LocalStorageService.addActivity({
      title: `Technician Dispatched`,
      description: `${tech.name} assigned to Job ${job.jobNumber} for ${job.customerName}`,
      type: 'dispatch',
      relatedId: job.id,
      relatedType: 'Job',
      user: user?.name || 'Dispatcher',
    });

    LocalStorageService.addNotification({
      title: `Technician Assigned to Job ${job.jobNumber}`,
      message: `${tech.name} assigned to ${job.customerName} (${job.serviceType}).`,
      type: 'tech',
      linkTo: '/dispatch',
    });

    reloadState();
    showToast('success', 'Technician Assigned', `${tech.name} dispatched to Job ${job.jobNumber}.`);
  };

  const updateJobStatus = (jobId: string, newStatus: JobStatus) => {
    const job = LocalStorageService.getRecord<Job>(STORAGE_KEYS.JOBS, jobId);
    if (!job) return;

    const updates: Partial<Job> = { status: newStatus };

    if (newStatus === 'Completed') {
      updates.completedAt = new Date().toISOString();
      if (!job.actualCost || job.actualCost === 0) {
        updates.actualCost = job.estimatedCost;
      }

      // Update technician completed count and availability
      if (job.technicianId) {
        const tech = LocalStorageService.getRecord<Technician>(STORAGE_KEYS.TECHNICIANS, job.technicianId);
        if (tech) {
          LocalStorageService.updateRecord(STORAGE_KEYS.TECHNICIANS, tech.id, {
            completedJobsCount: (tech.completedJobsCount || 0) + 1,
            availability: 'Available',
            activeJobId: undefined,
          });
        }
      }

      // Update Customer Last Service Date & total jobs
      const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, job.customerId);
      if (customer) {
        LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
          lastService: new Date().toISOString().split('T')[0],
        });
      }

      // Automatically trigger Review Request Automation
      if (!job.reviewRequested) {
        updates.reviewRequested = true;
        LocalStorageService.addNotification({
          title: `Google Review Requested for Job ${job.jobNumber}`,
          message: `Automated review request link sent via WhatsApp to ${job.customerName}.`,
          type: 'review',
          linkTo: '/reviews',
        });
      }

      // Create an automatic Pending Payment if not exists
      const existingPay = payments.find(p => p.relatedId === job.id);
      if (!existingPay && job.estimatedCost > 0) {
        const count = payments.length + 901;
        const payNum = `PAY-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
        const newPay: Payment = {
          id: 'pay_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
          paymentNumber: payNum,
          customerId: job.customerId,
          customerName: job.customerName,
          relatedType: 'Job',
          relatedId: job.id,
          amount: job.actualCost || job.estimatedCost,
          paymentMethod: 'UPI',
          date: new Date().toISOString().split('T')[0],
          status: 'Pending',
          transactionReference: `INV-${job.jobNumber}`,
        };
        LocalStorageService.createRecord(STORAGE_KEYS.PAYMENTS, newPay);
      }
    }

    LocalStorageService.updateRecord(STORAGE_KEYS.JOBS, jobId, updates);

    LocalStorageService.addActivity({
      title: `Job ${job.jobNumber} Status: ${newStatus}`,
      description: `Job status transitioned from ${job.status} to ${newStatus} for ${job.customerName}`,
      type: 'job',
      relatedId: job.id,
      relatedType: 'Job',
      user: user?.name || 'Staff',
    });

    reloadState();
    showToast('success', 'Status Updated', `Job ${job.jobNumber} marked as ${newStatus}.`);
  };

  // -------------------------------------------------------------
  // TECHNICIANS OPERATIONS
  // -------------------------------------------------------------
  const updateTechnician = (id: string, updates: Partial<Technician>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.TECHNICIANS, id, updates);
    reloadState();
    showToast('info', 'Technician Updated', 'Technician record updated.');
  };

  const setTechnicianAvailability = (id: string, availability: Technician['availability']) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.TECHNICIANS, id, { availability });
    reloadState();
    showToast('info', 'Availability Updated', `Status changed to ${availability}.`);
  };

  // -------------------------------------------------------------
  // AMC & VISITS OPERATIONS
  // -------------------------------------------------------------
  const addAMCContract = (amcData: Omit<AMCContract, 'id' | 'amcNumber' | 'visitsCompleted' | 'visitsRemaining' | 'status' | 'renewalStatus'>): AMCContract => {
    const count = amcs.length + 1;
    const amcNumber = `AMC-${new Date().getFullYear()}-${count.toString().padStart(3, '0')}`;
    const newAMC: AMCContract = {
      ...amcData,
      id: 'amc_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      amcNumber,
      visitsCompleted: 0,
      visitsRemaining: amcData.visitsIncluded || 4,
      status: 'Active',
      renewalStatus: 'None',
    };

    LocalStorageService.createRecord(STORAGE_KEYS.AMCS, newAMC);

    // Auto-generate 4 scheduled AMC Visits
    const startDate = new Date(newAMC.startDate);
    for (let i = 1; i <= (newAMC.visitsIncluded || 4); i++) {
      const visitDate = new Date(startDate);
      visitDate.setMonth(visitDate.getMonth() + (i * 3) - 1);
      const newVisit: AMCVisit = {
        id: `v_${newAMC.id}_${i}`,
        amcId: newAMC.id,
        amcNumber: newAMC.amcNumber,
        customerId: newAMC.customerId,
        customerName: newAMC.customerName,
        customerPhone: newAMC.customerPhone,
        customerAddress: newAMC.customerAddress,
        visitNumber: i as 1 | 2 | 3 | 4,
        scheduledDate: visitDate.toISOString().split('T')[0],
        status: 'Scheduled',
        remarks: `Quarterly Preventive Maintenance Visit #${i}`,
        acBrand: newAMC.coveredBrands[0] || 'Daikin',
        acUnitsChecked: newAMC.numberOfACs,
      };
      LocalStorageService.createRecord(STORAGE_KEYS.AMC_VISITS, newVisit);
    }

    // Update customer active AMC flag
    const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, newAMC.customerId);
    if (customer) {
      LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
        activeAMC: true,
      });
    }

    // Record an initial payment record for the AMC
    const payCount = payments.length + 901;
    const payNum = `PAY-${new Date().getFullYear()}-${payCount.toString().padStart(4, '0')}`;
    const newPay: Payment = {
      id: 'pay_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      paymentNumber: payNum,
      customerId: newAMC.customerId,
      customerName: newAMC.customerName,
      relatedType: 'AMC',
      relatedId: newAMC.id,
      amount: newAMC.annualAmount,
      paymentMethod: 'Bank Transfer',
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      transactionReference: `AMC-INV-${newAMC.amcNumber}`,
    };
    LocalStorageService.createRecord(STORAGE_KEYS.PAYMENTS, newPay);

    LocalStorageService.addActivity({
      title: `AMC Contract ${amcNumber} Activated`,
      description: `Annual contract (${newAMC.contractType}) activated for ${newAMC.customerName} for ₹${newAMC.annualAmount.toLocaleString('en-IN')}`,
      type: 'amc',
      relatedId: newAMC.id,
      relatedType: 'AMC',
      user: user?.name || 'Staff',
    });

    LocalStorageService.addNotification({
      title: `AMC Contract Activated (${amcNumber})`,
      message: `4 quarterly maintenance visits generated for ${newAMC.customerName}.`,
      type: 'amc',
      linkTo: '/amc',
    });

    reloadState();
    showToast('success', 'AMC Contract Activated!', `Contract ${amcNumber} created with 4 scheduled visits.`);
    return newAMC;
  };

  const updateAMCContract = (id: string, updates: Partial<AMCContract>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.AMCS, id, updates);
    reloadState();
    showToast('info', 'AMC Updated', 'Contract details updated.');
  };

  const deleteAMCContract = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.AMCS, id);
    reloadState();
    showToast('warning', 'AMC Deleted', 'Contract record removed.');
  };

  const updateAMCVisitStatus = (visitId: string, newStatus: AMCVisitStatus, technicianId?: string, remarks?: string) => {
    const visit = LocalStorageService.getRecord<AMCVisit>(STORAGE_KEYS.AMC_VISITS, visitId);
    if (!visit) return;

    let techName = visit.technicianName;
    if (technicianId) {
      const tech = LocalStorageService.getRecord<Technician>(STORAGE_KEYS.TECHNICIANS, technicianId);
      if (tech) techName = tech.name;
    }

    const updates: Partial<AMCVisit> = {
      status: newStatus,
      technicianId: technicianId || visit.technicianId,
      technicianName: techName,
      remarks: remarks !== undefined ? remarks : visit.remarks,
    };

    if (newStatus === 'Completed') {
      updates.completedDate = new Date().toISOString().split('T')[0];

      // Update parent AMC visits counts
      const parentAmc = LocalStorageService.getRecord<AMCContract>(STORAGE_KEYS.AMCS, visit.amcId);
      if (parentAmc) {
        const completed = Math.min(parentAmc.visitsIncluded, (parentAmc.visitsCompleted || 0) + 1);
        const remaining = Math.max(0, parentAmc.visitsIncluded - completed);
        LocalStorageService.updateRecord(STORAGE_KEYS.AMCS, parentAmc.id, {
          visitsCompleted: completed,
          visitsRemaining: remaining,
          lastVisitDate: updates.completedDate,
        });
      }

      // Update technician completed count
      if (technicianId) {
        const tech = LocalStorageService.getRecord<Technician>(STORAGE_KEYS.TECHNICIANS, technicianId);
        if (tech) {
          LocalStorageService.updateRecord(STORAGE_KEYS.TECHNICIANS, tech.id, {
            completedJobsCount: (tech.completedJobsCount || 0) + 1,
          });
        }
      }

      // Update Customer Last Service
      const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, visit.customerId);
      if (customer) {
        LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
          lastService: updates.completedDate,
        });
      }
    }

    LocalStorageService.updateRecord(STORAGE_KEYS.AMC_VISITS, visitId, updates);

    LocalStorageService.addActivity({
      title: `AMC Visit #${visit.visitNumber} Marked as ${newStatus}`,
      description: `Preventive service visit for ${visit.customerName} (${visit.amcNumber}) updated to ${newStatus}`,
      type: 'amc',
      relatedId: visit.amcId,
      relatedType: 'AMC',
      user: user?.name || 'Staff',
    });

    reloadState();
    showToast('success', 'AMC Visit Updated', `Visit #${visit.visitNumber} marked as ${newStatus}.`);
  };

  const renewAMCContract = (amcId: string): AMCContract | null => {
    const amc = LocalStorageService.getRecord<AMCContract>(STORAGE_KEYS.AMCS, amcId);
    if (!amc) return null;

    const oldExpiry = new Date(amc.expiryDate);
    const newStart = new Date(oldExpiry);
    newStart.setDate(newStart.getDate() + 1);
    const newExpiry = new Date(newStart);
    newExpiry.setFullYear(newExpiry.getFullYear() + 1);

    const count = amcs.length + 1;
    const amcNumber = `AMC-${newStart.getFullYear()}-${count.toString().padStart(3, '0')}`;

    const renewedAMC: AMCContract = {
      ...amc,
      id: 'amc_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      amcNumber,
      startDate: newStart.toISOString().split('T')[0],
      expiryDate: newExpiry.toISOString().split('T')[0],
      visitsCompleted: 0,
      visitsRemaining: amc.visitsIncluded || 4,
      status: 'Active',
      renewalStatus: 'Renewed',
    };

    // Mark previous as Renewed
    LocalStorageService.updateRecord(STORAGE_KEYS.AMCS, amcId, {
      status: 'Renewed',
      renewalStatus: 'Renewed',
    });

    LocalStorageService.createRecord(STORAGE_KEYS.AMCS, renewedAMC);

    // Create 4 new scheduled visits for the renewed year
    for (let i = 1; i <= (renewedAMC.visitsIncluded || 4); i++) {
      const visitDate = new Date(newStart);
      visitDate.setMonth(visitDate.getMonth() + (i * 3) - 1);
      const newVisit: AMCVisit = {
        id: `v_${renewedAMC.id}_${i}`,
        amcId: renewedAMC.id,
        amcNumber: renewedAMC.amcNumber,
        customerId: renewedAMC.customerId,
        customerName: renewedAMC.customerName,
        customerPhone: renewedAMC.customerPhone,
        customerAddress: renewedAMC.customerAddress,
        visitNumber: i as 1 | 2 | 3 | 4,
        scheduledDate: visitDate.toISOString().split('T')[0],
        status: 'Scheduled',
        remarks: `Renewed Period - Quarterly Preventive Maintenance #${i}`,
        acBrand: renewedAMC.coveredBrands[0] || 'Daikin',
        acUnitsChecked: renewedAMC.numberOfACs,
      };
      LocalStorageService.createRecord(STORAGE_KEYS.AMC_VISITS, newVisit);
    }

    // Payment for renewal
    const payCount = payments.length + 901;
    const payNum = `PAY-${new Date().getFullYear()}-${payCount.toString().padStart(4, '0')}`;
    const newPay: Payment = {
      id: 'pay_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      paymentNumber: payNum,
      customerId: renewedAMC.customerId,
      customerName: renewedAMC.customerName,
      relatedType: 'AMC',
      relatedId: renewedAMC.id,
      amount: renewedAMC.annualAmount,
      paymentMethod: 'Bank Transfer',
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      transactionReference: `RENEW-${renewedAMC.amcNumber}`,
    };
    LocalStorageService.createRecord(STORAGE_KEYS.PAYMENTS, newPay);

    LocalStorageService.addActivity({
      title: `AMC Renewed: ${renewedAMC.amcNumber}`,
      description: `Contract renewed for ${renewedAMC.customerName} until ${renewedAMC.expiryDate}`,
      type: 'amc',
      relatedId: renewedAMC.id,
      relatedType: 'AMC',
      user: user?.name || 'Staff',
    });

    LocalStorageService.addNotification({
      title: `AMC Contract Renewed (${renewedAMC.amcNumber})`,
      message: `${renewedAMC.customerName} successfully renewed for 1 Year (₹${renewedAMC.annualAmount.toLocaleString('en-IN')}).`,
      type: 'amc',
      linkTo: '/amc',
    });

    reloadState();
    showToast('success', 'AMC Renewed Successfully!', `Contract ${renewedAMC.amcNumber} activated for 2026-2027.`);
    return renewedAMC;
  };

  const triggerAMCRenewalReminder = (amcId: string, step: string) => {
    const amc = LocalStorageService.getRecord<AMCContract>(STORAGE_KEYS.AMCS, amcId);
    if (!amc) return;

    let nextStatus: AMCContract['renewalStatus'] = 'Proposal Sent';
    if (step.includes('30')) nextStatus = 'Reminder 1';
    else if (step.includes('15')) nextStatus = 'Reminder 2';
    else if (step.includes('7')) nextStatus = 'Final Reminder';

    LocalStorageService.updateRecord(STORAGE_KEYS.AMCS, amcId, {
      renewalStatus: nextStatus,
    });

    LocalStorageService.addActivity({
      title: `AMC Renewal Automation Triggered`,
      description: `${step} sent via WhatsApp & Email to ${amc.customerName} (${amc.amcNumber})`,
      type: 'amc',
      relatedId: amc.id,
      relatedType: 'AMC',
      user: 'Automation Engine',
    });

    reloadState();
    showToast('success', 'Renewal Reminder Sent', `${step} dispatched to ${amc.customerName}.`);
  };

  // -------------------------------------------------------------
  // PAYMENTS OPERATIONS
  // -------------------------------------------------------------
  const addPayment = (paymentData: Omit<Payment, 'id' | 'paymentNumber'>): Payment => {
    const count = payments.length + 901;
    const paymentNumber = `PAY-${new Date().getFullYear()}-${count.toString().padStart(4, '0')}`;
    const newPayment: Payment = {
      ...paymentData,
      id: 'pay_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      paymentNumber,
    };

    LocalStorageService.createRecord(STORAGE_KEYS.PAYMENTS, newPayment);

    // If marked Paid immediately, update Customer Total Revenue
    if (newPayment.status === 'Paid') {
      const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, newPayment.customerId);
      if (customer) {
        LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
          totalRevenue: (customer.totalRevenue || 0) + Number(newPayment.amount),
        });
      }
    }

    LocalStorageService.addActivity({
      title: `Payment ${paymentNumber} Recorded`,
      description: `₹${Number(newPayment.amount).toLocaleString('en-IN')} recorded (${newPayment.status}) for ${newPayment.customerName}`,
      type: 'payment',
      relatedId: newPayment.id,
      relatedType: 'Payment',
      user: user?.name || 'Accounts',
    });

    reloadState();
    showToast('success', 'Payment Recorded', `Receipt ${paymentNumber} saved.`);
    return newPayment;
  };

  const updatePaymentStatus = (id: string, newStatus: Payment['status']) => {
    const pay = LocalStorageService.getRecord<Payment>(STORAGE_KEYS.PAYMENTS, id);
    if (!pay) return;

    const oldStatus = pay.status;
    LocalStorageService.updateRecord(STORAGE_KEYS.PAYMENTS, id, { status: newStatus });

    // Update customer revenue if flipped from Pending -> Paid
    if (oldStatus !== 'Paid' && newStatus === 'Paid') {
      const customer = LocalStorageService.getRecord<Customer>(STORAGE_KEYS.CUSTOMERS, pay.customerId);
      if (customer) {
        LocalStorageService.updateRecord(STORAGE_KEYS.CUSTOMERS, customer.id, {
          totalRevenue: (customer.totalRevenue || 0) + Number(pay.amount),
        });
      }

      LocalStorageService.addActivity({
        title: `Payment Received ₹${Number(pay.amount).toLocaleString('en-IN')}`,
        description: `Payment ${pay.paymentNumber} marked as Paid via ${pay.paymentMethod} from ${pay.customerName}`,
        type: 'payment',
        relatedId: pay.id,
        relatedType: 'Payment',
        user: user?.name || 'Accounts',
      });

      LocalStorageService.addNotification({
        title: 'Payment Credited',
        message: `₹${Number(pay.amount).toLocaleString('en-IN')} received from ${pay.customerName} (${pay.paymentMethod}).`,
        type: 'payment',
        linkTo: '/payments',
      });
    }

    reloadState();
    showToast('success', 'Payment Status Updated', `Payment ${pay.paymentNumber} marked as ${newStatus}.`);
  };

  const deletePayment = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.PAYMENTS, id);
    reloadState();
    showToast('warning', 'Payment Deleted', 'Payment record removed.');
  };

  // -------------------------------------------------------------
  // REVIEWS OPERATIONS
  // -------------------------------------------------------------
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'responseStatus'>): Review => {
    const newReview: Review = {
      ...reviewData,
      id: 'rev_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      date: new Date().toISOString().split('T')[0],
      responseStatus: 'Pending',
    };
    LocalStorageService.createRecord(STORAGE_KEYS.REVIEWS, newReview);
    LocalStorageService.addActivity({
      title: `New ${newReview.rating}-Star Review Received`,
      description: `${newReview.customerName} submitted a ${newReview.rating}-star review for ${newReview.serviceType}`,
      type: 'review',
      relatedId: newReview.id,
      relatedType: 'Review',
      user: newReview.customerName,
    });
    LocalStorageService.addNotification({
      title: `New ${newReview.rating}★ Review Received`,
      message: `${newReview.customerName}: "${newReview.reviewText.substring(0, 70)}..."`,
      type: 'review',
      linkTo: '/reviews',
    });
    reloadState();
    showToast('success', 'Review Added', `New ${newReview.rating}-star review posted.`);
    return newReview;
  };

  const respondToReview = (reviewId: string, responseText: string) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.REVIEWS, reviewId, {
      response: responseText,
      responseStatus: 'Responded',
      responseDate: new Date().toISOString().split('T')[0],
    });
    LocalStorageService.addActivity({
      title: 'Review Response Published',
      description: `Official response published to Google Review #${reviewId}`,
      type: 'review',
      relatedId: reviewId,
      relatedType: 'Review',
      user: user?.name || 'Owner',
    });
    reloadState();
    showToast('success', 'Response Published', 'Official reply posted to review.');
  };

  const generateAIReviewResponse = (rating: number, service: string, brand: string, customerName: string): string => {
    if (rating === 5) {
      const templates = [
        `Thank you ${customerName}! We take immense pride in delivering precision ${brand} certified HVAC services. Our technicians strive to ensure zero downtime and optimal cooling efficiency. We appreciate your trust in Air Zone Cool!`,
        `Dear ${customerName}, thank you for your generous 5-star rating! Providing prompt, clean, and certified ${service} for ${brand} systems is our topmost commitment. Looking forward to serving you again!`,
        `Thank you so much ${customerName}! Our team takes great pride in our certified expertise with ${brand} AC systems. Glad we could resolve your ${service} efficiently!`,
      ];
      return templates[Math.floor(Math.random() * templates.length)];
    } else if (rating === 4) {
      return `Thank you ${customerName} for your positive feedback! We are constantly refining our turnaround times and service protocols for ${brand} ACs. Please let us know if there's anything else we can do to make your experience a full 5 stars!`;
    } else {
      return `Dear ${customerName}, we sincerely apologize that your recent ${service} experience did not meet the highest Air Zone Cool standards. Our Operations Director is directly reviewing your service ticket to resolve any lingering issues immediately. Please feel free to reach our emergency line at +91 98201 45890.`;
    }
  };

  // -------------------------------------------------------------
  // TASKS OPERATIONS
  // -------------------------------------------------------------
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: 'task_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      createdAt: new Date().toISOString().split('T')[0],
    };
    LocalStorageService.createRecord(STORAGE_KEYS.TASKS, newTask);
    reloadState();
    showToast('success', 'Task Created', newTask.title);
    return newTask;
  };

  const toggleTaskStatus = (id: string) => {
    const task = LocalStorageService.getRecord<Task>(STORAGE_KEYS.TASKS, id);
    if (!task) return;
    const nextStatus = task.status === 'Completed' ? 'Todo' : 'Completed';
    LocalStorageService.updateRecord(STORAGE_KEYS.TASKS, id, { status: nextStatus });
    reloadState();
    showToast('info', 'Task Updated', `Task marked as ${nextStatus}.`);
  };

  const deleteTask = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.TASKS, id);
    reloadState();
    showToast('warning', 'Task Deleted', 'Task removed.');
  };

  // -------------------------------------------------------------
  // AUTOMATIONS & NOTIFICATIONS
  // -------------------------------------------------------------
  const toggleAutomationRule = (id: string) => {
    const rule = LocalStorageService.getRecord<AutomationRule>(STORAGE_KEYS.AUTOMATIONS, id);
    if (!rule) return;
    const next = rule.status === 'Active' ? 'Paused' : 'Active';
    LocalStorageService.updateRecord(STORAGE_KEYS.AUTOMATIONS, id, { status: next });
    reloadState();
    showToast('info', 'Automation Rule', `${rule.name} is now ${next}.`);
  };

  const runAutomationSimulation = (ruleId: string) => {
    const rule = LocalStorageService.getRecord<AutomationRule>(STORAGE_KEYS.AUTOMATIONS, ruleId);
    if (!rule) return;

    LocalStorageService.updateRecord(STORAGE_KEYS.AUTOMATIONS, ruleId, {
      lastRun: 'Just now',
      runCount: (rule.runCount || 0) + 1,
    });

    LocalStorageService.addActivity({
      title: `Automation Executed: ${rule.name}`,
      description: `Automated workflow "${rule.name}" triggered successfully for target records`,
      type: 'system',
      relatedId: rule.id,
      relatedType: 'Automation',
      user: 'Automation Engine',
    });

    LocalStorageService.addNotification({
      title: `Automation Ran: ${rule.name}`,
      message: `Workflow completed: ${rule.action.substring(0, 80)}...`,
      type: 'system',
      linkTo: '/automations',
    });

    reloadState();
    showToast('success', 'Workflow Executed', `${rule.name} simulation executed successfully.`);
  };

  const markNotificationRead = (id: string) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.NOTIFICATIONS, id, { read: true });
    reloadState();
  };

  const markAllNotificationsRead = () => {
    const notifs = LocalStorageService.getCollection<Notification>(STORAGE_KEYS.NOTIFICATIONS);
    const updated = notifs.map(n => ({ ...n, read: true }));
    LocalStorageService.replaceCollection(STORAGE_KEYS.NOTIFICATIONS, updated);
    reloadState();
    showToast('info', 'Notifications', 'All notifications marked as read.');
  };

  const deleteNotification = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.NOTIFICATIONS, id);
    reloadState();
  };

  // -------------------------------------------------------------
  // SERVICES & SETTINGS
  // -------------------------------------------------------------
  const addServiceItem = (item: Omit<ServiceCatalogItem, 'id'>) => {
    const newItem: ServiceCatalogItem = {
      ...item,
      id: 'srv_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    };
    LocalStorageService.createRecord(STORAGE_KEYS.SERVICES, newItem);
    reloadState();
    showToast('success', 'Service Added', newItem.name);
  };

  const updateServiceItem = (id: string, updates: Partial<ServiceCatalogItem>) => {
    LocalStorageService.updateRecord(STORAGE_KEYS.SERVICES, id, updates);
    reloadState();
    showToast('info', 'Service Updated', 'Service item modified.');
  };

  const deleteServiceItem = (id: string) => {
    LocalStorageService.deleteRecord(STORAGE_KEYS.SERVICES, id);
    reloadState();
    showToast('warning', 'Service Removed', 'Service catalog item deleted.');
  };

  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    const current = LocalStorageService.getObject<CompanySettings>(STORAGE_KEYS.SETTINGS, SEED_SETTINGS);
    const merged = { ...current, ...newSettings };
    LocalStorageService.setObject(STORAGE_KEYS.SETTINGS, merged);
    reloadState();
    showToast('success', 'Settings Saved', 'Company profile and parameters updated.');
  };

  // -------------------------------------------------------------
  // DATA MANAGEMENT
  // -------------------------------------------------------------
  const resetAllData = () => {
    initializeDatabase(true);
    reloadState();
    showToast('warning', 'Database Reset', 'All records reset to standard realistic demonstration data.');
  };

  const exportData = (): string => {
    return LocalStorageService.exportDatabase();
  };

  const importData = (jsonStr: string): boolean => {
    const success = LocalStorageService.importDatabase(jsonStr);
    if (success) {
      reloadState();
      showToast('success', 'Import Successful', 'All CRM tables restored from JSON.');
      return true;
    }
    showToast('error', 'Import Failed', 'Invalid database JSON bundle.');
    return false;
  };

  // -------------------------------------------------------------
  // WHATSAPP BOT LEAD & JOB GENERATION
  // -------------------------------------------------------------
  const createWhatsAppLead = (
    customerName: string,
    phone: string,
    service: ServiceType,
    brand: ACBrand,
    problem: string,
    scheduledDate: string
  ): { lead: Lead; job: Job } => {
    // 1. Create Lead
    const newLead = addLead({
      name: customerName,
      type: 'B2C',
      phone,
      email: `${customerName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      location: 'Mumbai Suburbs',
      city: 'Mumbai',
      service,
      acBrand: brand,
      acUnits: 1,
      source: 'WhatsApp',
      priority: 'Urgent',
      status: 'Qualified',
      assignedStaff: 'Rahul Sharma',
      estimatedValue: service.includes('Installation') ? 2200 : service.includes('Gas') ? 3200 : 1499,
      notes: `Booked via WhatsApp Interactive Assistant. Problem: ${problem}. Preferred slot: ${scheduledDate}`,
    });

    // 2. Automatically create customer if not present
    let customer = customers.find(c => c.phone === phone);
    if (!customer) {
      customer = addCustomer({
        name: customerName,
        type: 'B2C',
        phone,
        email: newLead.email,
        address: 'Mumbai',
        city: 'Mumbai',
        preferredBrand: brand,
        notes: 'Acquired via WhatsApp Chat Assistant.',
      });
    }

    // 3. Create Service Job
    const newJob = addJob({
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: 'Mumbai Suburbs',
      serviceType: service,
      acBrand: brand,
      location: 'Mumbai Suburbs',
      problem,
      priority: 'Urgent',
      scheduledDate,
      scheduledTime: '02:00 PM - 04:00 PM',
      status: 'New',
      estimatedCost: newLead.estimatedValue,
      actualCost: 0,
      notes: 'Booked through WhatsApp Bot Simulation with instant quote confirmation.',
    });

    return { lead: newLead, job: newJob };
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        theme,
        setTheme,
        toggleTheme,
        currentRoute,
        setCurrentRoute,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedJobId,
        setSelectedJobId,
        selectedLeadId,
        setSelectedLeadId,
        selectedQuotationId,
        setSelectedQuotationId,
        selectedAmcId,
        setSelectedAmcId,
        isSearchOpen,
        setIsSearchOpen,
        isQuickCreateOpen,
        setIsQuickCreateOpen,
        quickCreateType,
        openQuickCreate,
        toasts,
        showToast,
        removeToast,
        customers,
        leads,
        quotations,
        jobs,
        technicians,
        amcs,
        amcVisits,
        payments,
        reviews,
        automations,
        notifications,
        activities,
        tasks,
        services,
        settings,
        addLead,
        updateLead,
        deleteLead,
        convertLeadToCustomer,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addQuotation,
        updateQuotation,
        deleteQuotation,
        acceptQuotation,
        convertQuotationToJob,
        addJob,
        updateJob,
        deleteJob,
        assignTechnicianToJob,
        updateJobStatus,
        updateTechnician,
        setTechnicianAvailability,
        addAMCContract,
        updateAMCContract,
        deleteAMCContract,
        updateAMCVisitStatus,
        renewAMCContract,
        triggerAMCRenewalReminder,
        addPayment,
        updatePaymentStatus,
        deletePayment,
        addReview,
        respondToReview,
        generateAIReviewResponse,
        addTask,
        toggleTaskStatus,
        deleteTask,
        toggleAutomationRule,
        runAutomationSimulation,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        addServiceItem,
        updateServiceItem,
        deleteServiceItem,
        updateSettings,
        resetAllData,
        exportData,
        importData,
        createWhatsAppLead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
