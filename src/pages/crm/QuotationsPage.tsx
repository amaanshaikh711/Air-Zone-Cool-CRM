import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Printer,
  Trash2,
  Wrench,
  Send,
  Download,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Percent,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Quotation, QuotationStatus } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const QuotationsPage: React.FC = () => {
  const {
    quotations,
    customers,
    updateQuotation,
    deleteQuotation,
    acceptQuotation,
    convertQuotationToJob,
    selectedQuotationId,
    setSelectedQuotationId,
    openQuickCreate,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeQuote, setActiveQuote] = useState<Quotation | null>(null);

  // Sync with selected from global search
  React.useEffect(() => {
    if (selectedQuotationId) {
      const found = quotations.find(q => q.id === selectedQuotationId);
      if (found) setActiveQuote(found);
      setSelectedQuotationId(null);
    }
  }, [selectedQuotationId, quotations, setSelectedQuotationId]);

  const filteredQuotes = useMemo(() => {
    return quotations.filter(q => {
      const matchQuery =
        q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.customerPhone && q.customerPhone.includes(searchQuery));

      const matchStatus = statusFilter === 'all' || q.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [quotations, searchQuery, statusFilter]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Quotations & Invoicing System
            </h1>
            <Badge variant="primary" size="sm">{filteredQuotes.length} Quotes</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            GST compliant estimation builder, margin discounts, PDF generation & 1-click conversion to dispatched jobs
          </p>
        </div>

        <button
          onClick={() => openQuickCreate('quote')}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Quotation</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search quotations by quote number, customer name, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none w-full sm:w-auto"
        >
          <option value="all">All Quotation Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Quotations Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Quote Number</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Issued / Valid Until</th>
                <th className="py-3 px-4">Scope / Items</th>
                <th className="py-3 px-4">Grand Total (Incl. GST)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredQuotes.map(quote => (
                <tr
                  key={quote.id}
                  onClick={() => setActiveQuote(quote)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {quote.quotationNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{quote.customerName}</div>
                    <div className="text-[11px] text-slate-400">{quote.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{quote.issueDate}</div>
                    <div className="text-[10px] text-slate-400">Valid: {quote.validUntil}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    {quote.items.map(i => i.description).join(', ')}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    ₹{quote.grandTotal.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        quote.status === 'Accepted' ? 'success' :
                        quote.status === 'Sent' ? 'info' :
                        quote.status === 'Draft' ? 'default' : 'danger'
                      }
                      size="sm"
                    >
                      {quote.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      {quote.status !== 'Accepted' && (
                        <button
                          onClick={() => acceptQuotation(quote.id)}
                          title="Mark Accepted"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {quote.status === 'Accepted' && !quote.linkedJobId && (
                        <button
                          onClick={() => convertQuotationToJob(quote.id)}
                          title="Convert to Active Job"
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-semibold flex items-center gap-1"
                        >
                          <Wrench className="w-3 h-3" />
                          <span>Convert</span>
                        </button>
                      )}
                      <button
                        onClick={() => deleteQuotation(quote.id)}
                        title="Delete"
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORMAL QUOTATION PREVIEW & PRINT MODAL */}
      {activeQuote && (
        <Modal
          isOpen={!!activeQuote}
          onClose={() => setActiveQuote(null)}
          title={`Quotation: ${activeQuote.quotationNumber}`}
          subtitle={`Client: ${activeQuote.customerName}`}
          maxWidth="4xl"
          actions={
            <div className="flex items-center justify-between w-full">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <div className="flex items-center gap-2">
                {activeQuote.status !== 'Accepted' && (
                  <button
                    onClick={() => {
                      acceptQuotation(activeQuote.id);
                      setActiveQuote(prev => prev ? { ...prev, status: 'Accepted' } : null);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Quotation</span>
                  </button>
                )}

                {activeQuote.status === 'Accepted' && !activeQuote.linkedJobId && (
                  <button
                    onClick={() => {
                      convertQuotationToJob(activeQuote.id);
                      setActiveQuote(null);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Convert to Service Job</span>
                  </button>
                )}
              </div>
            </div>
          }
        >
          {/* Printable Invoice Sheet */}
          <div className="p-6 bg-white text-slate-900 rounded-xl border border-slate-200 shadow-sm space-y-6 print:m-0 print:p-0 print:border-none">
            {/* Quote Header */}
            <div className="flex items-start justify-between border-b pb-6">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-blue-900">AIR ZONE COOL</h2>
                <p className="text-xs text-slate-500">HVAC Sales & Certified Engineering Services</p>
                <p className="text-xs text-slate-500">GSTIN: 27AABCA1234F1Z8 • MSME: MH-18-00912</p>
                <p className="text-xs text-slate-500">Shop 4, Greenfield Plaza, Link Road, Andheri West, Mumbai</p>
                <p className="text-xs text-slate-500">Phone: +91 98201 45890 • Email: billing@airzonecool.com</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold font-mono text-slate-800 uppercase">QUOTATION</div>
                <div className="font-mono text-sm font-bold text-blue-600 mt-1">{activeQuote.quotationNumber}</div>
                <div className="text-xs text-slate-500 mt-1">Date: {activeQuote.issueDate}</div>
                <div className="text-xs text-slate-500">Valid Until: {activeQuote.validUntil}</div>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quotation Prepared For</span>
                <div className="font-bold text-slate-900 mt-1">{activeQuote.customerName}</div>
                <div className="text-xs text-slate-600">{activeQuote.customerAddress || 'Mumbai, Maharashtra'}</div>
                <div className="text-xs text-slate-600">Phone: {activeQuote.customerPhone}</div>
                <div className="text-xs text-slate-600">Email: {activeQuote.customerEmail}</div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OEM Authorized Scope</span>
                <div className="text-xs text-slate-700 font-semibold mt-1">Certified OEM Parts & High-Pressure Hydro Servicing</div>
                <div className="text-xs text-slate-500">Warranty: 90-Day Parts & Leakage Guarantee</div>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                  <th className="py-2">#</th>
                  <th className="py-2">Item Description & Technical Scope</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price (₹)</th>
                  <th className="py-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeQuote.items.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="py-2.5 font-mono text-slate-500">{idx + 1}</td>
                    <td className="py-2.5 font-medium text-slate-900">{item.description}</td>
                    <td className="py-2.5 text-center font-mono">{item.quantity}</td>
                    <td className="py-2.5 text-right font-mono">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 text-right font-mono font-semibold">₹{item.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Calculations & Summary */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{activeQuote.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {activeQuote.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({activeQuote.discount}%):</span>
                    <span className="font-mono">-₹{(activeQuote.discountAmount || 0).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>GST (18% CGST + SGST):</span>
                  <span className="font-mono">₹{activeQuote.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-300">
                  <span>Grand Total:</span>
                  <span className="font-mono text-blue-700">₹{activeQuote.grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Terms & Bank Details */}
            <div className="border-t pt-4 grid grid-cols-2 gap-4 text-[11px] text-slate-500">
              <div>
                <span className="font-bold text-slate-700">Terms & Conditions:</span>
                <p className="mt-0.5">{activeQuote.terms}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-700">Bank Details for Direct RTGS/NEFT:</span>
                <p>Air Zone Cool HVAC Solutions | HDFC Bank</p>
                <p>A/C No: 50200084918239 | IFSC: HDFC0000249</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
