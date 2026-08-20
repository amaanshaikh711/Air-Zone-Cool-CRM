/**
 * Air Zone Cool CRM - Comprehensive TypeScript Definitions
 */

export type UserRole = 'admin' | 'manager' | 'dispatcher' | 'technician';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export type ACBrand = 'Daikin' | 'Mitsubishi' | 'Samsung' | 'Carrier' | 'Voltas' | 'LG' | 'Hitachi' | 'O General' | 'Panasonic' | 'Blue Star' | 'Other';

export type ServiceType = 
  | 'AC Repair & Troubleshooting'
  | 'AC Installation & Uninstallation'
  | 'Deep Jet Cleaning & Servicing'
  | 'Gas Leakage & Charging'
  | 'PCB Board Repair'
  | 'Compressor Replacement'
  | 'AMC Preventive Maintenance'
  | 'Ductable / VRV / VRF Servicing'
  | 'Inspection & Diagnosis'
  | string;

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type LeadSource = 'WhatsApp' | 'Website' | 'Google' | 'Referral' | 'Phone' | 'Walk-in' | 'WhatsApp Bot' | 'Website Booking Form' | 'Contact Page Form' | 'Other';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Site Survey Scheduled' | 'Quote Sent' | 'Negotiation' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  company?: string;
  type: 'B2B' | 'B2C';
  phone: string;
  email: string;
  location: string;
  city: string;
  service: ServiceType;
  acBrand: ACBrand;
  acUnits: number;
  source: LeadSource;
  priority: Priority;
  status: LeadStatus;
  assignedStaff: string;
  estimatedValue: number;
  notes: string;
  createdAt: string;
  lastContact: string;
  nextFollowUp?: string;
  convertedCustomerId?: string;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  type: 'B2B' | 'B2C';
  phone: string;
  email: string;
  address: string;
  city: string;
  customerSince: string;
  totalRevenue: number;
  totalJobs: number;
  activeAMC: boolean;
  lastService?: string;
  nextService?: string;
  preferredBrand?: ACBrand;
  notes?: string;
}

export interface QuotationItem {
  id: string;
  description: string;
  type: 'service' | 'part' | 'labour' | 'gas';
  quantity: number;
  unitPrice: number;
  amount: number;
}

export type QuotationStatus = 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'Expired';

export interface Quotation {
  id: string;
  quoteNumber?: string;
  quotationNumber?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string;
  leadId?: string;
  linkedJobId?: string;
  date?: string;
  createdDate?: string;
  issueDate?: string;
  validUntil: string;
  status: QuotationStatus;
  acBrand?: ACBrand;
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  taxRate?: number; // e.g. 18 for 18% GST
  taxAmount: number;
  totalAmount?: number;
  grandTotal?: number;
  discountAmount?: number;
  taxPercent?: number;
  terms: string;
  notes?: string;
}

export type JobStatus = 'New' | 'Pending' | 'Scheduled' | 'Assigned' | 'En Route' | 'Dispatched' | 'In Progress' | 'Completed' | 'Cancelled' | 'Billed';

export interface SparePartUsed {
  id: string;
  name: string;
  partNumber: string;
  brand: ACBrand;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  warrantyMonths: number;
}

export interface Job {
  id: string;
  jobNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  location?: string;
  quoteId?: string;
  quotationId?: string;
  leadId?: string;
  amcId?: string;
  technicianId?: string;
  technicianName?: string;
  serviceType: ServiceType;
  acBrand: ACBrand;
  acModel?: string;
  acSerial?: string;
  acTonnage?: string;
  issueDescription?: string;
  problem?: string;
  status: JobStatus;
  priority: Priority;
  scheduledDate: string;
  scheduledTimeSlot?: string;
  scheduledTime?: string;
  createdAt?: string;
  completedAt?: string;
  diagnosisReport?: string;
  workDone?: string;
  partsUsed?: SparePartUsed[];
  labourCharges?: number;
  partsCharges?: number;
  totalAmount?: number;
  estimatedCost?: number;
  actualCost?: number;
  reviewRequested?: boolean;
  customerRating?: number;
  customerFeedback?: string;
  technicianNotes?: string;
  notes?: string;
}

export type TechnicianAvailability = 'Available' | 'On Job' | 'On Leave' | 'Off Duty' | 'Busy';

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  certifiedBrands: ACBrand[];
  experienceYears: number;
  rating: number; // 1 to 5
  totalJobs?: number;
  completedJobsCount: number;
  availability: TechnicianAvailability;
  currentLocation: string;
  vehicleNumber?: string;
  avatar?: string;
  todayJobsCount: number;
  activeJobId?: string;
}

export type AMCContractType = 'Comprehensive (Parts + Labour)' | 'Non-Comprehensive (Service Only)' | 'Labour-Only AMC' | 'VRV/VRF Multi-Split Plan';

export type AMCStatus = 'Active' | 'Expiring Soon' | 'Renewal Pending' | 'Renewed' | 'Expired' | 'Cancelled';

export type AMCRenewalStatus = 'None' | 'Proposal Sent' | 'Reminder 1' | 'Reminder 2' | 'Final Reminder' | 'Renewed';

export interface AMCContract {
  id: string;
  amcNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  contractType: AMCContractType;
  startDate: string;
  expiryDate: string;
  numberOfACs: number;
  coveredBrands: ACBrand[];
  coveredServices: string[];
  annualAmount: number;
  visitsIncluded: number;
  visitsCompleted: number;
  visitsRemaining: number;
  status: AMCStatus;
  renewalStatus: AMCRenewalStatus;
  lastVisitDate?: string;
  nextScheduledVisit?: string;
}

export type AMCVisitStatus = 'Scheduled' | 'Completed' | 'Rescheduled' | 'Missed';

export interface AMCVisit {
  id: string;
  amcId: string;
  amcNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  visitNumber: 1 | 2 | 3 | 4;
  scheduledDate: string;
  completedDate?: string;
  technicianId?: string;
  technicianName?: string;
  status: AMCVisitStatus;
  remarks?: string;
  acBrand: ACBrand;
  acUnitsChecked: number;
}

export interface AMCRenewalAutomation {
  id: string;
  amcId: string;
  customerName: string;
  daysBeforeExpiry: number;
  status: 'Pending' | 'Triggered' | 'Sent' | 'Completed';
  action: string;
  lastTriggered?: string;
  templateMessage: string;
}

export type PaymentMethod = 'Cash' | 'UPI' | 'Bank Transfer' | 'Card' | 'Online';
export type PaymentMode = PaymentMethod;
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface Payment {
  id: string;
  paymentNumber: string;
  receiptNumber?: string;
  customerId: string;
  customerName: string;
  relatedType?: 'Quote' | 'Job' | 'AMC' | 'General';
  relatedId?: string;
  type?: string;
  amount: number;
  paymentMethod?: PaymentMethod;
  paymentMode?: PaymentMethod;
  mode?: PaymentMethod;
  date: string;
  status: PaymentStatus;
  transactionReference?: string;
  reference?: string;
  notes?: string;
}

export type PaymentRecord = Payment;

export interface Review {
  id: string;
  customerId?: string;
  customerName?: string;
  authorName?: string;
  customerPhone?: string;
  rating: number; // 1 to 5
  reviewText?: string;
  comment?: string;
  serviceType?: ServiceType;
  acBrand?: ACBrand;
  date: string;
  response?: string;
  responseStatus?: 'Pending' | 'Responded';
  responseDate?: string;
  jobId?: string;
  source?: 'Google Review' | 'WhatsApp Direct' | 'Website';
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active?: boolean;
  status?: 'Active' | 'Paused';
  lastRun?: string;
  nextRun?: string;
  timesRun?: number;
  runCount?: number;
  category?: 'Lead' | 'Quote' | 'Job' | 'AMC' | 'Payment' | 'Review';
  description: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'quote' | 'job' | 'amc' | 'payment' | 'review' | 'tech' | 'system' | 'customer' | 'alert';
  read: boolean;
  createdAt?: string;
  timestamp?: string;
  linkTo?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'lead' | 'customer' | 'quote' | 'job' | 'amc' | 'payment' | 'review' | 'dispatch' | 'system';
  timestamp: string;
  relatedId?: string;
  relatedType?: string;
  user: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  dueDate: string;
  priority: Priority;
  completed?: boolean;
  relatedId?: string;
  relatedLead?: string;
  relatedLeadId?: string;
  relatedCustomer?: string;
  relatedCustomerId?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  category: string;
  basePrice?: number;
  price?: number;
  unit?: string;
  description: string;
  estimatedDuration?: string;
  estimatedHours?: number;
  brandPricing?: Record<string, number>;
  acBrands?: ACBrand[] | string[];
  popular?: boolean;
}

export interface PricingMatrixItem {
  id: string;
  brand: ACBrand;
  serviceType: string;
  tonnage?: string;
  capacity?: string;
  standardPrice?: number;
  basePrice?: number;
  partsEstimate?: number;
  partsIncluded?: boolean;
}

export interface CompanySettings {
  companyName?: string;
  name?: string;
  tagline?: string;
  logoText?: string;
  phone: string;
  emergencyPhone?: string;
  email: string;
  gstNumber?: string;
  gstin?: string;
  address: string;
  city?: string;
  website?: string;
  defaultTax?: number;
  currency?: string;
  whatsappNumber?: string;
  authorizedBrands: string | string[];
  taxRate?: number;
  currencySymbol?: string;
  techniciansCount?: number;
}
