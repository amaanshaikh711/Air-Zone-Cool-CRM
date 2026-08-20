import React, { useState, useMemo } from 'react';
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Download,
  Filter,
  FileText,
  Printer,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PaymentRecord, PaymentStatus, PaymentMode } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { Modal } from '../../components/ui/Modal';

export const PaymentsPage: React.FC = () => {
  const { payments, customers, addPayment, updatePayment, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Form for recording payment
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    amount: '',
    mode: 'UPI' as PaymentMode,
    type: 'Job Payment' as PaymentRecord['type'],
    reference: '',
    notes: '',
  });

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchQuery =
        p.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.reference && p.reference.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchMode = modeFilter === 'all' || p.mode === modeFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchQuery && matchMode && matchStatus;
    });
  }, [payments, searchQuery, modeFilter, statusFilter]);

  const totalCollected = useMemo(() => {
    return payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }, [payments]);

  const upiCollected = useMemo(() => {
    return payments
      .filter(p => p.status === 'Paid' && p.mode === 'UPI')
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }, [payments]);

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.amount) {
      showToast('error', 'Missing Information', 'Please provide customer name and payment amount');
      return;
    }

    addPayment({
      customerId: formData.customerId || `cust-${Date.now()}`,
      customerName: formData.customerName,
      amount: parseFloat(formData.amount),
      mode: formData.mode,
      status: 'Paid',
      type: formData.type,
      reference: formData.reference || `UPI-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      notes: formData.notes,
    });

    setIsRecordModalOpen(false);
    setFormData({
      customerId: '',
      customerName: '',
      amount: '',
      mode: 'UPI',
      type: 'Job Payment',
      reference: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Payments & Financial Ledger
            </h1>
            <Badge variant="primary" size="sm">{payments.length} Transactions</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            UPI QR receipts, Bank NEFT/RTGS matching, Cash on Delivery logging & GST invoicing audit
          </p>
        </div>

        <button
          onClick={() => setIsRecordModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Payment</span>
        </button>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Invoiced & Collected"
          value={`₹${(totalCollected / 100000).toFixed(2)}L`}
          subtitle={`₹${totalCollected.toLocaleString('en-IN')} total`}
          change="100% reconciled"
          isPositive={true}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="UPI Instant Collections"
          value={`₹${(upiCollected / 100000).toFixed(2)}L`}
          subtitle="Google Pay, PhonePe, Paytm QR"
          change="Instant settlement"
          isPositive={true}
          icon={CreditCard}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Payment Success Rate"
          value="99.2%"
          subtitle="Zero disputed chargebacks"
          change="+0.8% vs last quarter"
          isPositive={true}
          icon={CheckCircle2}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search payments by receipt #, customer name, transaction reference..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={modeFilter}
            onChange={e => setModeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Modes</option>
            <option value="UPI">UPI (GPay / PhonePe)</option>
            <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
            <option value="Cash">Cash on Delivery</option>
            <option value="Credit Card">Card</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Type & Description</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4">Ref / Txn ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredPayments.map(pay => (
                <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {pay.receiptNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    {pay.customerName}
                  </td>
                  <td className="py-3 px-4">
                    <div>{pay.type}</div>
                    {pay.notes && <div className="text-[10px] text-slate-400">{pay.notes}</div>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[11px]">
                      {pay.mode}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                    {pay.reference || '-'}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {pay.date}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                    ₹{pay.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={pay.status === 'Paid' ? 'success' : 'warning'} size="sm">
                      {pay.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      <Modal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        title="Record Payment Transaction"
        subtitle="Log received customer payment to ledger"
        maxWidth="lg"
      >
        <form onSubmit={handleRecordSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Customer</label>
            <select
              value={formData.customerId}
              onChange={e => {
                const c = customers.find(cust => cust.id === e.target.value);
                setFormData(prev => ({
                  ...prev,
                  customerId: e.target.value,
                  customerName: c?.name || '',
                }));
              }}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="">-- Choose Existing Customer or Enter Below --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Customer / Payer Name</label>
            <input
              type="text"
              required
              value={formData.customerName}
              onChange={e => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              placeholder="e.g. Rahul Mehta"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="e.g. 4500"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Payment Mode</label>
              <select
                value={formData.mode}
                onChange={e => setFormData(prev => ({ ...prev, mode: e.target.value as PaymentMode }))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="UPI">UPI (GPay/PhonePe/Paytm)</option>
                <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                <option value="Cash">Cash on Delivery</option>
                <option value="Credit Card">Credit/Debit Card</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Payment Category</label>
              <select
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="Job Payment">Job Payment</option>
                <option value="AMC Fee">AMC Subscription Fee</option>
                <option value="Quotation Advance">Quotation Advance</option>
                <option value="Spare Parts">Spare Parts</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Transaction Ref / UTR</label>
              <input
                type="text"
                value={formData.reference}
                onChange={e => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                placeholder="e.g. UPI-2025032890"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setIsRecordModalOpen(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow"
            >
              Save Payment to Ledger
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
