import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from './Modal';
import { ACBrand, ServiceType, Priority, AMCContractType } from '../../types';

const BRANDS: ACBrand[] = ['Daikin', 'Mitsubishi', 'Samsung', 'Carrier', 'Voltas', 'LG', 'Hitachi', 'O General', 'Blue Star', 'Panasonic'];

const SERVICES: ServiceType[] = [
  'AC Repair & Troubleshooting',
  'AC Installation & Uninstallation',
  'Deep Jet Cleaning & Servicing',
  'Gas Leakage & Charging',
  'PCB Board Repair',
  'Compressor Replacement',
  'AMC Preventive Maintenance',
  'Ductable / VRV / VRF Servicing',
  'Inspection & Diagnosis',
];

export const QuickCreateModal: React.FC = () => {
  const {
    isQuickCreateOpen,
    setIsQuickCreateOpen,
    quickCreateType,
    openQuickCreate,
    customers,
    technicians,
    addLead,
    addCustomer,
    addQuotation,
    addJob,
    addAMCContract,
    addPayment,
    addTask,
  } = useApp();

  // Active form state
  const [activeTab, setActiveTab] = useState<'lead' | 'customer' | 'quote' | 'job' | 'amc' | 'payment' | 'task'>(quickCreateType);

  // Sync tab when quickCreateType changes
  React.useEffect(() => {
    setActiveTab(quickCreateType);
  }, [quickCreateType]);

  // Form states
  // 1. Lead Form
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadLocation, setLeadLocation] = useState('');
  const [leadService, setLeadService] = useState<ServiceType>('AC Repair & Troubleshooting');
  const [leadBrand, setLeadBrand] = useState<ACBrand>('Daikin');
  const [leadUnits, setLeadUnits] = useState(1);
  const [leadPriority, setLeadPriority] = useState<Priority>('High');
  const [leadValue, setLeadValue] = useState(4500);
  const [leadNotes, setLeadNotes] = useState('');

  // 2. Customer Form
  const [custName, setCustName] = useState('');
  const [custCompany, setCustCompany] = useState('');
  const [custType, setCustType] = useState<'B2B' | 'B2C'>('B2C');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custCity, setCustCity] = useState('Mumbai');
  const [custBrand, setCustBrand] = useState<ACBrand>('Daikin');

  // 3. Job Form
  const [jobCustId, setJobCustId] = useState(customers[0]?.id || '');
  const [jobService, setJobService] = useState<ServiceType>('Deep Jet Cleaning & Servicing');
  const [jobBrand, setJobBrand] = useState<ACBrand>('Daikin');
  const [jobLocation, setJobLocation] = useState('Andheri West');
  const [jobProblem, setJobProblem] = useState('');
  const [jobPriority, setJobPriority] = useState<Priority>('Medium');
  const [jobTechId, setJobTechId] = useState(technicians[0]?.id || '');
  const [jobDate, setJobDate] = useState(new Date().toISOString().split('T')[0]);
  const [jobTime, setJobTime] = useState('10:00 AM - 12:00 PM');
  const [jobCost, setJobCost] = useState(1800);

  // 4. Quotation Form
  const [quoteCustId, setQuoteCustId] = useState(customers[0]?.id || '');
  const [quoteItemDesc, setQuoteItemDesc] = useState('Comprehensive Jet Cleaning for 3 ACs');
  const [quoteItemQty, setQuoteItemQty] = useState(3);
  const [quoteItemPrice, setQuoteItemPrice] = useState(1500);
  const [quoteDiscount, setQuoteDiscount] = useState(5);
  const [quoteTerms, setQuoteTerms] = useState('100% on completion. 90-day warranty on parts.');

  // 5. AMC Form
  const [amcCustId, setAmcCustId] = useState(customers[0]?.id || '');
  const [amcType, setAmcType] = useState<AMCContractType>('Comprehensive (Parts + Labour)');
  const [amcBrand, setAmcBrand] = useState<ACBrand>('Daikin');
  const [amcUnits, setAmcUnits] = useState(4);
  const [amcAmount, setAmcAmount] = useState(18000);
  const [amcStartDate, setAmcStartDate] = useState(new Date().toISOString().split('T')[0]);

  // 6. Payment Form
  const [payCustId, setPayCustId] = useState(customers[0]?.id || '');
  const [payAmount, setPayAmount] = useState(5000);
  const [payMethod, setPayMethod] = useState<'UPI' | 'Bank Transfer' | 'Cash' | 'Card'>('UPI');
  const [payType, setPayType] = useState<'Job' | 'AMC' | 'Quote' | 'General'>('Job');

  // 7. Task Form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState(technicians[0]?.name || 'Admin');
  const [taskPriority, setTaskPriority] = useState<Priority>('High');
  const [taskDueDate, setTaskDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [taskNotes, setTaskNotes] = useState('');

  const handleClose = () => {
    setIsQuickCreateOpen(false);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;
    addLead({
      name: leadName,
      company: leadCompany,
      type: leadCompany ? 'B2B' : 'B2C',
      phone: leadPhone,
      email: leadEmail || `${leadName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      location: leadLocation || 'Mumbai',
      city: 'Mumbai',
      service: leadService,
      acBrand: leadBrand,
      acUnits: Number(leadUnits),
      source: 'Website',
      priority: leadPriority,
      status: 'New',
      assignedStaff: technicians[0]?.name || 'Rahul Sharma',
      estimatedValue: Number(leadValue),
      notes: leadNotes || 'Quick created lead.',
    });
    handleClose();
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;
    addCustomer({
      name: custName,
      company: custCompany,
      type: custType,
      phone: custPhone,
      email: custEmail || `${custName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address: custAddress || 'Mumbai',
      city: custCity,
      preferredBrand: custBrand,
      notes: 'Quick created customer profile.',
    });
    handleClose();
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === jobCustId) || customers[0];
    const tech = technicians.find(t => t.id === jobTechId);
    if (!cust) return;

    addJob({
      customerId: cust.id,
      customerName: cust.name,
      customerPhone: cust.phone,
      customerAddress: cust.address || jobLocation,
      serviceType: jobService,
      acBrand: jobBrand,
      location: jobLocation,
      problem: jobProblem || `${jobService} requested for ${jobBrand} AC`,
      priority: jobPriority,
      technicianId: tech?.id,
      technicianName: tech?.name,
      scheduledDate: jobDate,
      scheduledTime: jobTime,
      status: tech ? 'Assigned' : 'New',
      estimatedCost: Number(jobCost),
      actualCost: 0,
      notes: 'Scheduled via Quick Create',
    });
    handleClose();
  };

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === quoteCustId) || customers[0];
    if (!cust) return;

    const subtotal = Number(quoteItemQty) * Number(quoteItemPrice);
    const discAmount = (subtotal * Number(quoteDiscount)) / 100;
    const taxable = subtotal - discAmount;
    const tax = (taxable * 18) / 100;
    const grandTotal = taxable + tax;

    const validUntilDate = new Date();
    validUntilDate.setDate(validUntilDate.getDate() + 30);

    addQuotation({
      customerId: cust.id,
      customerName: cust.name,
      customerPhone: cust.phone,
      customerEmail: cust.email,
      customerAddress: cust.address,
      issueDate: new Date().toISOString().split('T')[0],
      validUntil: validUntilDate.toISOString().split('T')[0],
      items: [
        {
          id: 'item_1',
          description: quoteItemDesc,
          type: 'service',
          quantity: Number(quoteItemQty),
          unitPrice: Number(quoteItemPrice),
          amount: subtotal,
        },
      ],
      subtotal,
      discount: Number(quoteDiscount),
      discountAmount: discAmount,
      taxPercent: 18,
      taxAmount: tax,
      grandTotal,
      terms: quoteTerms,
      notes: 'Generated via Quick Builder',
      status: 'Draft',
    });
    handleClose();
  };

  const handleCreateAMC = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === amcCustId) || customers[0];
    if (!cust) return;

    const startDate = new Date(amcStartDate);
    const expiryDate = new Date(startDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    addAMCContract({
      customerId: cust.id,
      customerName: cust.name,
      customerPhone: cust.phone,
      customerAddress: cust.address,
      contractType: amcType,
      startDate: amcStartDate,
      expiryDate: expiryDate.toISOString().split('T')[0],
      numberOfACs: Number(amcUnits),
      coveredBrands: [amcBrand],
      coveredServices: ['4 Routine Hydro Jet Services', 'Emergency Breakdown Support', 'Electrical Spares Check'],
      annualAmount: Number(amcAmount),
      visitsIncluded: 4,
    });
    handleClose();
  };

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === payCustId) || customers[0];
    if (!cust) return;

    addPayment({
      customerId: cust.id,
      customerName: cust.name,
      relatedType: payType,
      amount: Number(payAmount),
      paymentMethod: payMethod,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      transactionReference: `MANUAL-${Date.now().toString(36).toUpperCase()}`,
      notes: 'Recorded via Quick Create',
    });
    handleClose();
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    addTask({
      title: taskTitle,
      assignedTo: taskAssignee,
      priority: taskPriority,
      dueDate: taskDueDate,
      status: 'Todo',
      notes: taskNotes,
    });
    handleClose();
  };

  return (
    <Modal
      isOpen={isQuickCreateOpen}
      onClose={handleClose}
      title="Quick Create Record"
      subtitle="Instantly register a new lead, customer, service job, quotation, AMC, payment or task"
      maxWidth="3xl"
    >
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {(['lead', 'customer', 'job', 'quote', 'amc', 'payment', 'task'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab === 'quote' ? 'Quotation' : tab}
          </button>
        ))}
      </div>

      {/* 1. LEAD FORM */}
      {activeTab === 'lead' && (
        <form onSubmit={handleCreateLead} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer / Contact Name *</label>
              <input
                type="text"
                required
                value={leadName}
                onChange={e => setLeadName(e.target.value)}
                placeholder="e.g. Ramesh Shah"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization (Optional)</label>
              <input
                type="text"
                value={leadCompany}
                onChange={e => setLeadCompany(e.target.value)}
                placeholder="e.g. Shah Jewels LLP"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={leadPhone}
                onChange={e => setLeadPhone(e.target.value)}
                placeholder="+91 98200 00000"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location / Area</label>
              <input
                type="text"
                value={leadLocation}
                onChange={e => setLeadLocation(e.target.value)}
                placeholder="e.g. Bandra West, Mumbai"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">AC Brand</label>
              <select
                value={leadBrand}
                onChange={e => setLeadBrand(e.target.value as ACBrand)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Required Service</label>
              <select
                value={leadService}
                onChange={e => setLeadService(e.target.value as ServiceType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SERVICES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Deal Value (₹)</label>
              <input
                type="number"
                value={leadValue}
                onChange={e => setLeadValue(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={leadPriority}
                onChange={e => setLeadPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes / Problem Description</label>
            <textarea
              rows={2}
              value={leadNotes}
              onChange={e => setLeadNotes(e.target.value)}
              placeholder="Provide specific notes, AC model details or symptoms..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              Save New Lead
            </button>
          </div>
        </form>
      )}

      {/* 2. CUSTOMER FORM */}
      {activeTab === 'customer' && (
        <form onSubmit={handleCreateCustomer} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer Full Name *</label>
              <input
                type="text"
                required
                value={custName}
                onChange={e => setCustName(e.target.value)}
                placeholder="e.g. Shalini Roy"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Type</label>
              <select
                value={custType}
                onChange={e => setCustType(e.target.value as 'B2B' | 'B2C')}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="B2C">B2C (Residential / Individual)</option>
                <option value="B2B">B2B (Corporate / Commercial / Clinic)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company (If B2B)</label>
              <input
                type="text"
                value={custCompany}
                onChange={e => setCustCompany(e.target.value)}
                placeholder="e.g. Roy Architects"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={custPhone}
                onChange={e => setCustPhone(e.target.value)}
                placeholder="+91 98200 00000"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={custEmail}
                onChange={e => setCustEmail(e.target.value)}
                placeholder="shalini@gmail.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary AC Brand</label>
              <select
                value={custBrand}
                onChange={e => setCustBrand(e.target.value as ACBrand)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Service Address</label>
            <input
              type="text"
              value={custAddress}
              onChange={e => setCustAddress(e.target.value)}
              placeholder="Flat / Building / Street, Area, Mumbai"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              Register Customer
            </button>
          </div>
        </form>
      )}

      {/* 3. JOB FORM */}
      {activeTab === 'job' && (
        <form onSubmit={handleCreateJob} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Customer *</label>
              <select
                value={jobCustId}
                onChange={e => setJobCustId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.company ? `(${c.company})` : ''} - {c.phone}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Service Type</label>
              <select
                value={jobService}
                onChange={e => setJobService(e.target.value as ServiceType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SERVICES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">AC Brand</label>
              <select
                value={jobBrand}
                onChange={e => setJobBrand(e.target.value as ACBrand)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assign Certified Technician</label>
              <select
                value={jobTechId}
                onChange={e => setJobTechId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Unassigned (Hold in Dispatch) --</option>
                {technicians.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.availability}) - {t.certifiedBrands.join(', ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Scheduled Date</label>
              <input
                type="date"
                value={jobDate}
                onChange={e => setJobDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Window</label>
              <select
                value={jobTime}
                onChange={e => setJobTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Estimated Charge (₹)</label>
              <input
                type="number"
                value={jobCost}
                onChange={e => setJobCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={jobPriority}
                onChange={e => setJobPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Reported Problem / Job Scope</label>
            <textarea
              rows={2}
              value={jobProblem}
              onChange={e => setJobProblem(e.target.value)}
              placeholder="Describe symptoms, noise, cooling drops or exact task instructions..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              Schedule Service Job
            </button>
          </div>
        </form>
      )}

      {/* 4. QUOTATION FORM */}
      {activeTab === 'quote' && (
        <form onSubmit={handleCreateQuotation} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer *</label>
              <select
                value={quoteCustId}
                onChange={e => setQuoteCustId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Discount %</label>
              <input
                type="number"
                value={quoteDiscount}
                onChange={e => setQuoteDiscount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Service Item Description</label>
              <input
                type="text"
                required
                value={quoteItemDesc}
                onChange={e => setQuoteItemDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
              <input
                type="number"
                value={quoteItemQty}
                onChange={e => setQuoteItemQty(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Price (₹)</label>
              <input
                type="number"
                value={quoteItemPrice}
                onChange={e => setQuoteItemPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">₹{(Number(quoteItemQty) * Number(quoteItemPrice)).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount ({quoteDiscount}%):</span>
              <span className="font-semibold text-emerald-600">-₹{((Number(quoteItemQty) * Number(quoteItemPrice) * quoteDiscount) / 100).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span className="font-semibold">₹{(((Number(quoteItemQty) * Number(quoteItemPrice) * (100 - quoteDiscount)) / 100) * 0.18).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-slate-100 pt-1 border-t border-slate-200 dark:border-slate-700">
              <span>Calculated Total:</span>
              <span className="text-blue-600 dark:text-blue-400">
                ₹{(((Number(quoteItemQty) * Number(quoteItemPrice) * (100 - quoteDiscount)) / 100) * 1.18).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              Generate Quotation
            </button>
          </div>
        </form>
      )}

      {/* 5. AMC FORM */}
      {activeTab === 'amc' && (
        <form onSubmit={handleCreateAMC} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer *</label>
              <select
                value={amcCustId}
                onChange={e => setAmcCustId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Contract Type</label>
              <select
                value={amcType}
                onChange={e => setAmcType(e.target.value as AMCContractType)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Comprehensive (Parts + Labour)">Comprehensive (Parts + Labour)</option>
                <option value="Non-Comprehensive (Service Only)">Non-Comprehensive (Service Only)</option>
                <option value="VRV/VRF Multi-Split Plan">VRV/VRF Multi-Split Plan</option>
                <option value="Labour-Only AMC">Labour-Only AMC</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">AC Brand</label>
              <select
                value={amcBrand}
                onChange={e => setAmcBrand(e.target.value as ACBrand)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Number of ACs Covered</label>
              <input
                type="number"
                value={amcUnits}
                onChange={e => setAmcUnits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Contract Value (₹)</label>
              <input
                type="number"
                value={amcAmount}
                onChange={e => setAmcAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                value={amcStartDate}
                onChange={e => setAmcStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/40 text-xs text-blue-800 dark:text-blue-300">
            ✓ 4 Quarterly Preventive Visits will be automatically scheduled across the 12-month contract period.
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              Activate AMC Contract
            </button>
          </div>
        </form>
      )}

      {/* 6. PAYMENT FORM */}
      {activeTab === 'payment' && (
        <form onSubmit={handleCreatePayment} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Customer *</label>
              <select
                value={payCustId}
                onChange={e => setPayCustId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount (₹) *</label>
              <input
                type="number"
                required
                value={payAmount}
                onChange={e => setPayAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
              <select
                value={payMethod}
                onChange={e => setPayMethod(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                <option value="Bank Transfer">Bank Transfer (NEFT / RTGS / IMPS)</option>
                <option value="Cash">Cash on Delivery</option>
                <option value="Card">Card / POS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Related Service Module</label>
              <select
                value={payType}
                onChange={e => setPayType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Job">Service Job</option>
                <option value="AMC">AMC Contract</option>
                <option value="Quote">Quotation Advance</option>
                <option value="General">General / Parts</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-colors"
            >
              Record Paid Receipt
            </button>
          </div>
        </form>
      )}

      {/* 7. TASK FORM */}
      {activeTab === 'task' && (
        <form onSubmit={handleCreateTask} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Task Title / Action Item *</label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              placeholder="e.g. Order Daikin Inverter PCB module from OEM distributor"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assignee</label>
              <select
                value={taskAssignee}
                onChange={e => setTaskAssignee(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Admin">Admin / Operations</option>
                {technicians.map(t => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={taskDueDate}
                onChange={e => setTaskDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
              <select
                value={taskPriority}
                onChange={e => setTaskPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Notes (Optional)</label>
            <textarea
              rows={2}
              value={taskNotes}
              onChange={e => setTaskNotes(e.target.value)}
              placeholder="Additional checklist or details..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
