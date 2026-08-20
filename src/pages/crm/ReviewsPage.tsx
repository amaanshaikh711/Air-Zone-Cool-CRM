import React, { useState, useMemo } from 'react';
import {
  Star,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  ThumbsUp,
  Share2,
  ExternalLink,
  Users,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Review } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const ReviewsPage: React.FC = () => {
  const { reviews, replyToReview, customers, showToast } = useApp();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedCustomerForReview, setSelectedCustomerForReview] = useState('');

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 4.9;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview || !replyText.trim()) return;

    replyToReview(selectedReview.id, replyText);
    showToast('success', 'Reply Published', 'Your response has been published to Google Reviews.');
    setSelectedReview(null);
    setReplyText('');
  };

  const handleGenerateAIReply = (review: Review) => {
    const aiTemplates = [
      `Thank you so much ${review.authorName}! We're thrilled that our certified HVAC engineering team could deliver a 5-star cooling experience for your ${review.acBrand || 'AC'} unit. Stay cool! - Team Air Zone Cool`,
      `Hi ${review.authorName}, thank you for your kind words! We take immense pride in factory-standard servicing and prompt emergency turnaround across Mumbai. We look forward to serving you again! - Air Zone Cool`,
      `Thank you for trusting Air Zone Cool, ${review.authorName}! Providing honest diagnosis and genuine OEM spare parts is our top priority. Have a great day!`,
    ];
    const random = aiTemplates[Math.floor(Math.random() * aiTemplates.length)];
    setReplyText(random);
  };

  const handleSendWhatsAppReviewRequest = () => {
    const cust = customers.find(c => c.id === selectedCustomerForReview);
    if (!cust) return;

    const text = encodeURIComponent(
      `Hi ${cust.name}, thank you for choosing Air Zone Cool for your AC service today! We hope our certified technician provided top-tier service. Could you please take 30 seconds to rate us on Google? It helps our local team immensely: https://g.page/r/AirZoneCool-Mumbai/review`
    );
    window.open(`https://wa.me/91${cust.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    showToast('success', 'Review Link Sent', `WhatsApp review link sent to ${cust.name}`);
    setIsRequestModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-950 via-slate-900 to-blue-950 p-6 rounded-2xl text-white shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/30 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300" /> Google My Business Reputation
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Customer Reviews & 4.9★ Social Proof
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Live Google Reviews synchronization, 1-click AI response generation, and automated WhatsApp post-service review dispatchers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <div className="text-2xl font-bold font-mono text-amber-400 flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-amber-400" /> {averageRating}
            </div>
            <div className="text-[10px] text-slate-300">480+ Verified Reviews</div>
          </div>

          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Review via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Reviews Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 font-bold flex items-center justify-center text-sm">
                    {rev.authorName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100">{rev.authorName}</h3>
                    <div className="text-[10px] text-slate-400">{rev.date} • Verified Customer</div>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Tag for brand */}
              {rev.acBrand && (
                <Badge variant="primary" size="sm">
                  {rev.acBrand} HVAC Servicing
                </Badge>
              )}

              {/* Comment text */}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{rev.comment}"
              </p>

              {/* Existing Response */}
              {rev.response && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-2 border-blue-500 text-xs space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-[10px] uppercase">
                    Air Zone Cool Response ({rev.responseDate || 'Recently'})
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">{rev.response}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Source: Google Maps Profile</span>
              {!rev.response ? (
                <button
                  onClick={() => {
                    setSelectedReview(rev);
                    handleGenerateAIReply(rev);
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Reply to Review</span>
                </button>
              ) : (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Replied
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI REPLY MODAL */}
      {selectedReview && (
        <Modal
          isOpen={!!selectedReview}
          onClose={() => setSelectedReview(null)}
          title={`Reply to ${selectedReview.authorName}`}
          subtitle={`Rating: ${selectedReview.rating}★ • Review: "${selectedReview.comment.slice(0, 50)}..."`}
          maxWidth="lg"
        >
          <form onSubmit={handleReplySubmit} className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Response Content</label>
                <button
                  type="button"
                  onClick={() => handleGenerateAIReply(selectedReview)}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                >
                  <Sparkles className="w-3 h-3" /> Regenerate AI Draft
                </button>
              </div>
              <textarea
                rows={4}
                required
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow"
              >
                Publish Response
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* REQUEST REVIEW MODAL */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Send Review Request via WhatsApp"
        subtitle="Prompt completed service clients to leave a Google Review"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Select Customer</label>
            <select
              value={selectedCustomerForReview}
              onChange={e => setSelectedCustomerForReview(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="">-- Choose Completed Service Client --</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-[11px] space-y-1">
            <span className="font-bold">Message Preview:</span>
            <p>
              "Hi [Customer], thank you for choosing Air Zone Cool for your AC service today! We hope our certified technician provided top-tier service. Could you please take 30 seconds to rate us on Google?..."
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsRequestModalOpen(false)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              disabled={!selectedCustomerForReview}
              onClick={handleSendWhatsAppReviewRequest}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch WhatsApp</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
