import { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  prefilledService?: string;
}

export function Contact({ prefilledService }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData(prev => ({
        ...prev,
        message: `السلام علیکم محمد مصطفیٰ! میں ناصری پروڈکشن کی سروس "${prefilledService}" کے بارے میں رابطہ کرنا چاہتا ہوں۔`
      }));
    }
  }, [prefilledService]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name / اپنا نام درج کریں۔';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address / ای میل ایڈریس درج کریں۔';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address / درست ای میل ایڈریس درج کریں۔';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message / اپنا پیغام تحریر کریں۔';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormSubmitted(true);
  };

  const constructWhatsAppUrl = () => {
    const text = `Name: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\nMessage: ${formData.message || ''}`;
    return `https://wa.me/923408816926?text=${encodeURIComponent(text)}`;
  };

  const constructMailtoUrl = () => {
    const subject = `Website Inquiry from ${formData.name || 'Visitor'}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative py-24 bg-[#07090e] border-b border-white/5 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Direct Inquiries & Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <div className="mt-2 text-xl font-urdu text-amber-300 font-semibold">
            رابطہ کریں
          </div>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-xl">
            Get in touch for AI video creation, YouTube thumbnails, graphic design, social media posters, or phone buying inquiries.
          </p>
        </div>

        {/* 
          PART 1: 3 SEPARATE CONTACT CARDS (Per Section 13 & 15)
          1. Call / Phone: 03555677577 (tel:03555677577)
          2. WhatsApp: 03408816926 (wa.me/923408816926)
          3. Email: mustafanasiri345@gmail.com (mailto:mustafanasiri345@gmail.com)
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Call / Phone */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover:via-blue-400 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <span dir="rtl" className="text-xs font-urdu text-blue-300">
                  براہ راست کال
                </span>
              </div>

              <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                1. Call / Phone
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">
                {PERSONAL_INFO.phone}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Direct mobile line for urgent inquiries and creative project discussions.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2">
              <a
                href={PERSONAL_INFO.telUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Me / کال کریں</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                title="Copy phone number"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors cursor-pointer"
              >
                {copiedItem === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-emerald-500/30 bg-emerald-950/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent group-hover:via-emerald-400 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span dir="rtl" className="text-xs font-urdu text-emerald-300 font-semibold">
                  واٹس ایپ رابطہ
                </span>
              </div>

              <div className="text-xs font-mono uppercase text-emerald-400/90 mb-1">
                2. WhatsApp
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">
                {PERSONAL_INFO.whatsapp}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Fast messaging for briefs, file sharing, references, and instant quotes.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-md cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Me / میسج کریں</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.whatsapp, 'whatsapp')}
                title="Copy WhatsApp number"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors cursor-pointer"
              >
                {copiedItem === 'whatsapp' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span dir="rtl" className="text-xs font-urdu text-amber-300">
                  ای میل ایڈریس
                </span>
              </div>

              <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                3. Email
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-mono truncate" title={PERSONAL_INFO.email}>
                {PERSONAL_INFO.email}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Official inbox for formal project requirements and collaboration briefs.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center gap-2">
              <a
                href={PERSONAL_INFO.mailUrl}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me / ای میل کریں</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                title="Copy email address"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors cursor-pointer"
              >
                {copiedItem === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* 
          PART 2: CONTACT FORM (Per Section 14)
          Required Fields: Name, Email, Message
          Client-side validation
          Honest message: "Your message form is ready. Email sending can be connected later."
        */}
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your details below to reach Muhammad Mustafa Nasiri.
                </p>
              </div>
              <div dir="rtl" className="text-right">
                <span className="font-urdu text-sm text-amber-300 font-semibold block">
                  پیغام بھیجیں
                </span>
              </div>
            </div>

            {formSubmitted ? (
              /* Honest status message per Section 14 */
              <div className="py-8 px-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-amber-400" />
                </div>
                
                {/* Primary Message requested in prompt */}
                <h4 className="text-lg font-bold text-white">
                  Your message form is ready. Email sending can be connected later.
                </h4>

                <p dir="rtl" className="text-base font-urdu text-amber-200">
                  آپ کا میسج فارم تیار ہے۔ ای میل سروس بعد میں کنیکٹ کی جا سکتی ہے۔
                </p>

                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  To immediately send your message right now, you can forward it with one click to Muhammad Mustafa via WhatsApp or your default email application:
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <a
                    href={constructWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp ({PERSONAL_INFO.whatsapp})</span>
                  </a>

                  <a
                    href={constructMailtoUrl()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                  >
                    Write New Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Field 1: Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Your Name <span className="text-amber-400">*</span>
                    <span dir="rtl" className="font-urdu text-slate-400 mr-2 text-xs">/ آپ کا نام</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
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

                {/* Field 2: Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Your Email <span className="text-amber-400">*</span>
                    <span dir="rtl" className="font-urdu text-slate-400 mr-2 text-xs">/ ای میل ایڈریس</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="example@domain.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${
                      errors.email ? 'border-red-500/80' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Field 3: Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Your Message <span className="text-amber-400">*</span>
                    <span dir="rtl" className="font-urdu text-slate-400 mr-2 text-xs">/ پیغام تحریر کریں</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, message: e.target.value }));
                      if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                    }}
                    placeholder="Describe your inquiry, project scope, or requirements..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-y ${
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

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send Message / پیغام بھیجیں</span>
                  </button>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
