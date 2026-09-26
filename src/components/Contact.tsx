import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles,
  Settings,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sendContactEmail, isEmailJsConfigured, getEmailJsConfig } from '../services/emailService';
import { EmailJsSettingsModal } from './EmailJsSettingsModal';

interface ContactProps {
  prefilledService?: string;
}

export function Contact({ prefilledService }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{
    success: boolean;
    isSimulated?: boolean;
    message: string;
  } | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [emailConfig, setEmailConfig] = useState(getEmailJsConfig());

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        message: `Hello Muhammad Mustafa, I would like to inquire regarding your "${prefilledService}" service with Nasiri Production.`
      }));
    }
  }, [prefilledService]);

  const refreshConfig = () => {
    setEmailConfig(getEmailJsConfig());
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone or WhatsApp number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your message or project requirements.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitFeedback({
          success: true,
          isSimulated: result.isSimulated,
          message: result.isSimulated
            ? `Your message has been processed! Since live EmailJS API keys are not yet added, the inquiry was tested for recipient (${emailConfig.recipientEmail}).`
            : `Your message has been successfully transmitted via EmailJS directly to Muhammad Mustafa Nasiri (${emailConfig.recipientEmail}).`
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
      } else {
        setSubmitFeedback({
          success: false,
          message: result.error || 'Failed to dispatch email. Please check your network or EmailJS settings.'
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitFeedback({
        success: false,
        message: msg || 'An unexpected error occurred while sending the email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPlaceholder = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const isConfigured = isEmailJsConfigured();

  return (
    <section id="contact" className="relative py-24 bg-[#07090e] overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <div className="mt-2 text-lg font-urdu text-amber-300/80">
            رابطہ کریں اور باہمی تعاون
          </div>
          <p className="mt-3 text-slate-400 text-sm max-w-2xl">
            Have a project in mind, an AI video concept, or need social media visuals? Send a message and let's collaborate.
          </p>

          {/* EmailJS Status & Quick Settings Toggle */}
          <div className="mt-4 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
              <span className="text-slate-300">
                EmailJS: {isConfigured ? 'Live Delivery Enabled' : 'Configured (Test Mode Ready)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-medium transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Email Settings / Keys</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Official Contact & Location Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel rounded-2xl p-7 border border-amber-400/20 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 block mb-1">
                  Creator & Brand Identity
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <div dir="rtl" className="text-lg font-urdu text-amber-300/90 mt-0.5">
                  {PERSONAL_INFO.urduName}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {PERSONAL_INFO.brand} · {PERSONAL_INFO.urduBrand}
                </div>
              </div>

              {/* Exact Location specified by user */}
              <div className="pt-4 border-t border-white/10 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Official Location
                  </h4>
                  <p className="text-sm font-medium text-white mt-0.5">
                    {PERSONAL_INFO.location}
                  </p>
                  <p dir="rtl" className="text-xs font-urdu text-amber-300/80 mt-0.5">
                    {PERSONAL_INFO.urduLocation}
                  </p>
                </div>
              </div>

              {/* Email Placeholder (Required: Use EMAIL_HERE, with copy option) */}
              <div className="pt-4 border-t border-white/10 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Email Address
                    </h4>
                    <p className="text-sm font-mono text-amber-300 font-semibold mt-0.5">
                      {PERSONAL_INFO.contactPlaceholders.email}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Destination inbox: {emailConfig.recipientEmail}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPlaceholder('email', emailConfig.recipientEmail || PERSONAL_INFO.contactPlaceholders.email)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Placeholder (Required: Use PHONE_HERE, no fake numbers) */}
              <div className="pt-4 border-t border-white/10 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Phone / WhatsApp
                    </h4>
                    <p className="text-sm font-mono text-amber-300 font-semibold mt-0.5">
                      {PERSONAL_INFO.contactPlaceholders.phone}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Placeholder reserved for your telephone number
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyPlaceholder('phone', PERSONAL_INFO.contactPlaceholders.phone)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  title="Copy phone placeholder"
                >
                  {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

            </div>

            {/* EmailJS service info badge */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-400/20 flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  EmailJS Delivery Service
                </span>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="text-amber-400 hover:text-amber-300 text-[11px] underline cursor-pointer"
                >
                  Manage Keys
                </button>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Form submissions are routed using the client-side EmailJS integration directly to{' '}
                <strong className="text-amber-300">{emailConfig.recipientEmail}</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-7 sm:p-9 border border-white/10 shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-bold text-white">
                  Send a Message
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  via EmailJS
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below. All submissions are automatically processed and delivered.
              </p>

              {/* Feedback Alert */}
              {submitFeedback && (
                <div 
                  className={`mb-6 p-4 rounded-xl border flex items-start gap-3 text-xs ${
                    submitFeedback.success 
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' 
                      : 'bg-red-950/40 border-red-500/30 text-red-200'
                  }`}
                >
                  {submitFeedback.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">
                      {submitFeedback.success ? 'Message Submitted!' : 'Delivery Notice'}
                    </p>
                    <p className="leading-relaxed opacity-90">
                      {submitFeedback.message}
                    </p>
                    {submitFeedback.isSimulated && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSettingsOpen(true)}
                          className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 border border-amber-400/30 text-[11px] font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Settings className="w-3 h-3" />
                          <span>Configure Live EmailJS Keys</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Your Full Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Ahmad Khan"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-white/10 focus:border-amber-400/60 focus:ring-amber-400/20'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="name@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500/30' 
                          : 'border-white/10 focus:border-amber-400/60 focus:ring-amber-400/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Phone / WhatsApp <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="+92 300 0000000"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500/30' 
                          : 'border-white/10 focus:border-amber-400/60 focus:ring-amber-400/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Your Message / Requirements <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Describe your creative project, timeframe, and specific needs..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-white/10 focus:border-amber-400/60 focus:ring-amber-400/20'
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
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending Email via EmailJS...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Protected transmission via EmailJS</span>
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(true)}
                    className="text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
                  >
                    Configure destination & API keys
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* EmailJS Settings Modal */}
      <EmailJsSettingsModal 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        onSaved={refreshConfig}
      />
    </section>
  );
}
