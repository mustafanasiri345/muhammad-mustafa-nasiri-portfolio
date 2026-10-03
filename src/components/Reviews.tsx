import { useState, useEffect } from 'react';
import { 
  Star, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck,
  Clock,
  User,
  Lock,
  LogOut,
  Check,
  Trash2,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  googleProvider, 
  ADMIN_EMAIL, 
  OperationType, 
  handleFirestoreError 
} from '../firebase';

export interface ReviewItem {
  id: string;
  name: string;
  rating: number; // 1 to 5
  message: string;
  date: string;
  createdAtMs: number;
  status: 'pending' | 'approved' | 'rejected';
  isApproved: boolean;
}

function formatFirestoreDate(ts: unknown): { formatted: string; ms: number } {
  if (ts instanceof Timestamp) {
    const d = ts.toDate();
    return {
      formatted: d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      ms: d.getTime(),
    };
  }
  return {
    formatted: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    ms: Date.now(),
  };
}

export function Reviews() {
  const [approvedReviews, setApprovedReviews] = useState<ReviewItem[]>([]);
  const [pendingReviews, setPendingReviews] = useState<ReviewItem[]>([]);
  const [loadingApproved, setLoadingApproved] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; rating?: string; message?: string }>({});
  const [submittedReview, setSubmittedReview] = useState<{ name: string; rating: number; message: string } | null>(null);

  // Admin authentication & moderation states
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const isAuthorizedAdmin = Boolean(
    currentUser &&
      currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      currentUser.emailVerified
  );

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
      if (
        user &&
        user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
        user.emailVerified
      ) {
        setShowAdminPanel(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Open admin login box if URL hash is #admin-reviews
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin-reviews') {
        setShowAdminPanel(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Subscribe to public APPROVED reviews (enforced by Firestore Security Rules)
  useEffect(() => {
    const approvedQuery = query(
      collection(db, 'reviews'),
      where('status', '==', 'approved')
    );

    const unsubscribe = onSnapshot(
      approvedQuery,
      (snapshot) => {
        const items: ReviewItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const { formatted, ms } = formatFirestoreDate(data.createdAt);
          return {
            id: docSnap.id,
            name: String(data.name || ''),
            rating: Number(data.rating || 5),
            message: String(data.message || ''),
            date: formatted,
            createdAtMs: ms,
            status: 'approved',
            isApproved: true,
          };
        });
        items.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setApprovedReviews(items);
        setLoadingApproved(false);
      },
      (error) => {
        setLoadingApproved(false);
        handleFirestoreError(error, OperationType.LIST, 'reviews');
      }
    );

    return () => unsubscribe();
  }, []);

  // Subscribe to private PENDING reviews ONLY when authenticated as the verified admin
  useEffect(() => {
    if (!authReady || !isAuthorizedAdmin) {
      setPendingReviews([]);
      return;
    }

    const pendingQuery = query(
      collection(db, 'reviews'),
      where('status', '==', 'pending')
    );

    const unsubscribe = onSnapshot(
      pendingQuery,
      (snapshot) => {
        const items: ReviewItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const { formatted, ms } = formatFirestoreDate(data.createdAt);
          return {
            id: docSnap.id,
            name: String(data.name || ''),
            rating: Number(data.rating || 5),
            message: String(data.message || ''),
            date: formatted,
            createdAtMs: ms,
            status: 'pending',
            isApproved: false,
          };
        });
        items.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setPendingReviews(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'reviews');
      }
    );

    return () => unsubscribe();
  }, [authReady, isAuthorizedAdmin]);

  // Calculate live statistics strictly from approved reviews
  const approvedCount = approvedReviews.length;
  const averageRating =
    approvedCount > 0
      ? (
          approvedReviews.reduce((acc, r) => acc + r.rating, 0) / approvedCount
        ).toFixed(1)
      : null;

  const validate = () => {
    const errs: { name?: string; rating?: string; message?: string } = {};
    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName) {
      errs.name = 'Please provide your name / اپنا نام درج کریں۔';
    } else if (trimmedName.length > 100) {
      errs.name = 'Name must be 100 characters or fewer.';
    }

    if (rating < 1 || rating > 5) {
      errs.rating = 'Please select a star rating (1 to 5) / براہ کرم 1 سے 5 اسٹار منتخب کریں۔';
    }

    if (!trimmedMsg) {
      errs.message = 'Please write your review / اپنے تاثرات تحریر کریں۔';
    } else if (trimmedMsg.length < 8) {
      errs.message = 'Review must be at least 8 characters long.';
    } else if (trimmedMsg.length > 1500) {
      errs.message = 'Review must be 1500 characters or fewer.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const trimmedName = name.trim().slice(0, 100);
    const trimmedMessage = message.trim().slice(0, 1500);
    const cleanRating = Math.min(5, Math.max(1, Math.round(rating)));
    const reviewId = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    setIsSubmitting(true);
    try {
      await setDoc(doc(db, 'reviews', reviewId), {
        name: trimmedName,
        rating: cleanRating,
        message: trimmedMessage,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      setSubmittedReview({
        name: trimmedName,
        rating: cleanRating,
        message: trimmedMessage,
      });

      // Reset form fields
      setName('');
      setRating(0);
      setHoverRating(0);
      setMessage('');
      setErrors({});
    } catch (error) {
      setSubmitError('Could not submit review right now. Please try again.');
      handleFirestoreError(error, OperationType.CREATE, `reviews/${reviewId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSignIn = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : 'Google Sign-In failed. Please try again.'
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAdminSignOut = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
      setPendingReviews([]);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Sign-Out failed.');
    }
  };

  const handleApproveReview = async (reviewId: string) => {
    if (!isAuthorizedAdmin) return;
    setActionLoadingId(reviewId);
    try {
      await updateDoc(doc(db, 'reviews', reviewId), {
        status: 'approved',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `reviews/${reviewId}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRejectDeleteReview = async (reviewId: string) => {
    if (!isAuthorizedAdmin) return;
    setActionLoadingId(reviewId);
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `reviews/${reviewId}`);
    } finally {
      setActionLoadingId(null);
    }
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
    <section id="reviews" className="relative py-24 bg-[#07090e]/28 border-b border-white/5 overflow-hidden">
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
            {loadingApproved ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Loading verified reviews...</span>
              </div>
            ) : approvedCount > 0 ? (
              <div className="space-y-4">
                {approvedReviews.map((review) => (
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

                      <div className="flex items-center gap-2">
                        {review.date && (
                          <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            <span>{review.date}</span>
                          </span>
                        )}
                        {isAuthorizedAdmin && (
                          <button
                            type="button"
                            onClick={() => handleRejectDeleteReview(review.id)}
                            disabled={actionLoadingId === review.id}
                            title="Delete approved review"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
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
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex items-start justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-slate-200">Review Moderation Policy:</span>
                  <p>
                    To protect our platform against spam, all submitted reviews enter our moderation queue and are verified by Nasiri Production before appearing publicly.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminPanel((prev) => !prev)}
                className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-amber-400/15 text-slate-400 hover:text-amber-300 border border-white/10 hover:border-amber-400/30 text-[11px] font-mono transition-colors cursor-pointer"
                title="Admin Moderation Access"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
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
                      Your review has been submitted for moderation (Status: Pending).
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
                      maxLength={100}
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
                      maxLength={1500}
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

                  {submitError && (
                    <p className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{submitError}</span>
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 disabled:opacity-60 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-slate-950 animate-spin" />
                        <span>Submitting Review...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-slate-950" />
                        <span>Submit Review for Moderation</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Reviews are reviewed and approved by Nasiri Production before publication.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* ==================================================
            SECURE ADMIN REVIEW MODERATION PANEL
            Protected by Firebase Authentication + Firestore Security Rules
           ================================================== */}
        {showAdminPanel && (
          <div
            id="admin-reviews"
            className="mt-16 glass-panel rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-2xl animate-fade-in"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Admin Review Moderation</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
                      Firestore Secured
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Restricted exclusively to verified administrator account
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {currentUser && (
                  <button
                    type="button"
                    onClick={handleAdminSignOut}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowAdminPanel(false)}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* State 1: Not Signed In */}
            {!currentUser ? (
              <div className="py-8 px-4 text-center max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-300 mx-auto">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">
                  Administrator Sign-In Required
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sign in with your authorized Google account to view pending reviews and moderate submissions.
                </p>
                {authError && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    {authError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleAdminSignIn}
                  disabled={authLoading}
                  className="inline-flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in with Google...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Sign in with Google</span>
                    </>
                  )}
                </button>
              </div>
            ) : !isAuthorizedAdmin ? (
              /* State 2: Signed In with a Non-Admin Google Account */
              <div className="py-8 px-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-center max-w-lg mx-auto space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-red-300">
                  Access denied. This account is not authorized as an administrator.
                </h4>
                <p className="text-xs text-slate-400">
                  Signed in as <span className="text-slate-200 font-mono">{currentUser.email}</span>. Pending reviews and moderation controls are strictly restricted at the database level.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleAdminSignOut}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out & Switch Account</span>
                  </button>
                </div>
              </div>
            ) : (
              /* State 3: Verified Authorized Admin (mustafanasiri345@gmail.com) */
              <div className="space-y-6">
                {/* Admin Summary Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 block">
                        Pending Reviews
                      </span>
                      <span className="text-2xl font-extrabold text-amber-300 font-mono">
                        {pendingReviews.length}
                      </span>
                    </div>
                    <Clock className="w-6 h-6 text-amber-400/70" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 block">
                        Approved Reviews
                      </span>
                      <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                        {approvedCount}
                      </span>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-400/70" />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 block">
                        Average Approved Rating
                      </span>
                      <span className="text-2xl font-extrabold text-white font-mono">
                        {averageRating ? `${averageRating} / 5` : '—'}
                      </span>
                    </div>
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </div>
                </div>

                {/* Pending Reviews Queue */}
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Pending Moderation Queue ({pendingReviews.length})</span>
                  </h4>

                  {pendingReviews.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 text-center text-xs text-slate-400">
                      No pending reviews waiting for moderation.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingReviews.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-slate-900/90 border border-amber-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                                <User className="w-4 h-4 text-amber-400" />
                                {item.name}
                              </span>
                              <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star
                                    key={s}
                                    className={`w-3.5 h-3.5 ${
                                      s <= item.rating
                                        ? 'text-amber-400 fill-amber-400'
                                        : 'text-slate-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.date}
                              </span>
                              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30">
                                Pending
                              </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                              "{item.message}"
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <button
                              type="button"
                              disabled={actionLoadingId === item.id}
                              onClick={() => handleApproveReview(item.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                            >
                              <Check className="w-4 h-4" />
                              <span>Approve</span>
                            </button>

                            <button
                              type="button"
                              disabled={actionLoadingId === item.id}
                              onClick={() => handleRejectDeleteReview(item.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 disabled:opacity-50 text-red-300 border border-red-500/30 font-semibold text-xs transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Reject / Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
