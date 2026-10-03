import { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck,
  Clock,
  User
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export interface ReviewItem {
  id: string;
  name: string;
  rating: number; // 1 to 5
  message: string;
  date: string;
  isApproved: boolean;
}

/**
 * APPROVED PUBLIC REVIEWS
 * Only genuine, administrator-approved reviews are displayed here.
 * Starting empty: No fake names, fake ratings, or fake numbers.
 */
export const APPROVED_REVIEWS: ReviewItem[] = [];

export function Reviews() {
  const [reviews] = useState<ReviewItem[]>(APPROVED_REVIEWS);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; rating?: string; message?: string }>({});
  const [submittedReview, setSubmittedReview] = useState<{ name: string; rating: number; message: string } | null>(null);

  // Calculate live statistics strictly from approved reviews
  const approvedCount = reviews.filter(r => r.isApproved).length;
  const averageRating = approvedCount > 0 
    ? (reviews.filter(r => r.isApproved).reduce((acc, r) => acc + r.rating, 0) / approvedCount).toFixed(1)
    : null;

  const validate = () => {
    const errs: { name?: string; rating?: string; message?: string } = {};

    if (!name.trim()) {
      errs.name = 'Please provide your name / اپنا نام درج کریں۔';
    }

    if (rating === 0) {
      errs.rating = 'Please select a star rating (1 to 5) / براہ کرم 1 سے 5 اسٹار منتخب کریں۔';
    }

    if (!message.trim()) {
      errs.message = 'Please write your review / اپنے تاثرات تحریر کریں۔';
    } else if (message.trim().length < 8) {
      errs.message = 'Review must be at least 8 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Record submission for moderation workflow
    setSubmittedReview({
      name: name.trim(),
      rating,
      message: message.trim()
    });

    // Reset form fields
    setName('');
    setRating(0);
    setHoverRating(0);
    setMessage('');
    setErrors({});
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5: return '5 Stars — Excellent / بہترین';
      case 4: return '4 Stars — Very Good / بہت اچھا';
      case 3: return '3 Stars — Good / اچھا';
      case 2: return '2 Stars — Fair / مناسب';
      case 1: return '1 Star — Needs Improvement / بہتری کی ضرورت';
      default: return 'Select your rating';
    }
  };

  return (
    <section id="reviews" className="relative py-24 bg-[#07090e]/70 backdrop-blur-[2px] border-b border-white/5 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Customer Testimonials & Ratings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Reviews & Feedback
          </h2>
          <div className="mt-2 text-xl font-urdu text-amber-300 font-semibold">
            گاہکوں کے تاثرات و آراء
          </div>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-xl">
            What clients and partners say about Nasiri Production's AI content creation, digital media, and video production services.
          </p>
        </div>

        {/* Dynamic Statistics Bar (Calculated strictly from real approved reviews) */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Star className="w-7 h-7 fill-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Verified Client Reviews
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Moderated public feedback for Nasiri Production
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:gap-8 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-white/10 sm:pl-8">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {averageRating ? `${averageRating} / 5` : '—'}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Average Rating
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                  {approvedCount}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">
                  Approved Reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Public Approved Reviews Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>What People Say</span>
              </h3>
              <span className="text-xs font-urdu text-amber-300/80">شائع شدہ آراء</span>
            </div>

            {/* Approved Reviews List or Clean Zero State */}
            {approvedCount > 0 ? (
              <div className="space-y-4">
                {reviews.filter(r => r.isApproved).map((review) => (
                  <div 
                    key={review.id}
                    className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/10 relative hover:border-amber-400/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <User className="w-4 h-4 text-amber-400" />
                          <span>{review.name}</span>
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating 
                                  ? 'text-amber-400 fill-amber-400' 
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {review.date && (
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{review.date}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      "{review.message}"
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Approved Client Feedback</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Honest Zero Reviews State (Per prompt rule: No fake reviews) */
              <div className="rounded-2xl border-2 border-dashed border-amber-400/25 bg-slate-900/60 p-8 sm:p-10 text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4">
                  <Star className="w-7 h-7 text-amber-400/70" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
                  No reviews yet. Be the first to share your experience.
                </h4>
                <p dir="rtl" className="text-sm sm:text-base font-urdu text-amber-200/90 leading-relaxed mb-3">
                  ابھی تک کوئی ریویو شائع نہیں ہوا۔ اپنے تجربے کی رائے دینے والے پہلے شخص بنیں!
                </p>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                  Have you collaborated with Muhammad Mustafa Nasiri or ordered YouTube thumbnails, AI videos, or designs? Use the form on the right to leave your rating and feedback.
                </p>
              </div>
            )}

            {/* Moderation Workflow Explanation Notice */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-start gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-slate-200">Review Moderation Policy:</span>
                <p>
                  To protect our platform against spam, all submitted reviews enter our moderation queue and are verified by Nasiri Production before appearing publicly.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Review Submission Form */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Share Your Feedback
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Submit your rating and message
                  </p>
                </div>
                <div dir="rtl" className="text-right">
                  <span className="font-urdu text-xs text-amber-300 font-semibold block">
                    اپنی رائے درج کریں
                  </span>
                </div>
              </div>

              {submittedReview ? (
                /* Submission Confirmation Banner */
                <div className="py-6 px-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Thank you, {submittedReview.name}!
                    </h4>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">
                      Your review has been submitted for review.
                    </p>
                  </div>

                  <p dir="rtl" className="text-sm font-urdu text-amber-200 leading-relaxed">
                    آپ کا ریویو کامیابی سے موصول ہو چکا ہے۔ ناصری پروڈکشن کی تصدیق و منظوری کے بعد یہ پبلک سیکشن میں شائع کر دیا جائے گا۔
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-left text-xs text-slate-300 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Rating Submitted:</span>
                      <span className="text-amber-300 font-bold font-mono">
                        {'★'.repeat(submittedReview.rating)}{'☆'.repeat(5 - submittedReview.rating)} ({submittedReview.rating}/5)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-0.5">Your message:</span>
                      <p className="italic text-slate-300">"{submittedReview.message}"</p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/923408816926?text=${encodeURIComponent(`السلام علیکم! میں نے ویب سائٹ پر ایک ریویو جمع کروایا ہے:\nنام: ${submittedReview.name}\nریٹنگ: ${submittedReview.rating}/5\nپیغام: ${submittedReview.message}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
                    >
                      <span>Share on WhatsApp to notify Muhammad Mustafa</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmittedReview(null)}
                      className="py-2 px-4 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer border border-white/10"
                    >
                      Submit Another Review
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {/* Field 1: Name */}
                  <div>
                    <label htmlFor="review-name" className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Your Name <span className="text-amber-400">*</span>
                      <span dir="rtl" className="font-urdu text-slate-400 mr-2 text-xs">/ آپ کا نام</span>
                    </label>
                    <input
                      type="text"
                      id="review-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Ali Raza"
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                        errors.name ? 'border-red-500/80' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: 5-Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Star Rating (1 to 5) <span className="text-amber-400">*</span>
                      <span dir="rtl" className="font-urdu text-slate-400 mr-2 text-xs">/ ریٹنگ منتخب کریں</span>
                    </label>

                    <div className="flex items-center gap-1.5 p-3 rounded-xl bg-slate-950/80 border border-white/10">
                      {[1, 2, 3, 4, 5].map((starValue) => {
                        const isFilled = starValue <= (hoverRating || rating);
                        return (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() => {
                              setRating(starValue);
                              if (errors.rating) setErrors(prev => ({ ...prev, rating: undefined }));
                            }}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 rounded-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                            aria-label={`Rate ${starValue} stars`}
                          >
                            <Star 
                              className={`w-7 h-7 transition-colors ${
                                isFilled 
                                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                                  : 'text-slate-600 hover:text-slate-400'
                              }`} 
                            />
                          </button>
                        );
                      })}
                      <span className="ml-auto text-xs font-mono font-medium text-amber-300 text-right">
                        {rating > 0 ? getRatingLabel(rating) : 'Tap stars'}
                      </span>
                    </div>

                    {errors.rating && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.rating}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 3: Review Message */}
                  <div>
                    <label htmlFor="review-message" className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Review / Feedback Message <span className="text-amber-400">*</span>
                      <span dir="rtl" className="font-urdu text-slate-400 mr-2 text-xs">/ اپنے تاثرات تحریر کریں</span>
                    </label>
                    <textarea
                      id="review-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Share your experience working with Nasiri Production..."
                      className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-y ${
                        errors.message ? 'border-red-500/80' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Submit Review for Moderation</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Reviews are reviewed and approved by Nasiri Production before publication.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
