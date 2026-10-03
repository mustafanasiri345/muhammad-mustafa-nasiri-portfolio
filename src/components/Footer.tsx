import { ArrowUp, Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'Home', href: '#home', urdu: 'ہوم' },
    { label: 'About', href: '#about', urdu: 'تعارف' },
    { label: 'Skills', href: '#skills', urdu: 'مہارتیں' },
    { label: 'Services', href: '#services', urdu: 'خدمات' },
    { label: 'Portfolio', href: '#portfolio', urdu: 'پورٹ فولیو' },
    { label: 'Media', href: '#media', urdu: 'میڈیا' },
    { label: 'Reviews', href: '#reviews', urdu: 'تاثرات' },
    { label: 'Contact', href: '#contact', urdu: 'رابطہ' },
  ];

  return (
    <footer className="relative bg-[#05070b]/85 backdrop-blur-[2px] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      
      {/* Decorative top gold gradient hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand & Name Info (cols 1-5) */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            {/* Urdu Name */}
            <div dir="rtl" className="mb-1">
              <span className="text-2xl sm:text-3xl font-urdu text-amber-300 font-bold drop-shadow-md">
                {PERSONAL_INFO.urduName}
              </span>
            </div>

            {/* English Name */}
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h3>

            {/* Brand Title */}
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-semibold text-amber-400">
                {PERSONAL_INFO.brand}
              </span>
              <span className="text-slate-600">·</span>
              <span dir="rtl" className="text-xs font-urdu text-amber-300/80">
                {PERSONAL_INFO.urduBrand}
              </span>
            </div>

            {/* Location */}
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </p>

            {/* Tagline */}
            <p className="text-xs text-slate-500 mt-3 italic">
              "{PERSONAL_INFO.tagline}"
            </p>
          </div>

          {/* Navigation Links (cols 6-8) */}
          <div className="md:col-span-3 flex flex-col items-start">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-amber-300 transition-colors flex items-center gap-2"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-600 font-urdu">{item.urdu}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information & Social Placeholders (cols 9-12) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Contact & Social Channels
            </h4>

            {/* Contact Items */}
            <div className="space-y-2 text-xs mb-6 w-full">
              <a 
                href={PERSONAL_INFO.telUrl} 
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">{PERSONAL_INFO.phone}</span>
              </a>

              <a 
                href={PERSONAL_INFO.whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono">{PERSONAL_INFO.whatsapp}</span>
              </a>

              <a 
                href={PERSONAL_INFO.mailUrl} 
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-300 transition-colors truncate max-w-full"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-mono truncate">{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-white/5 hover:border-amber-400/40 text-[11px] text-slate-300 hover:text-amber-300 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <div className="mt-6 pt-4 border-t border-white/5 w-full">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-medium text-amber-300 hover:text-amber-200 cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p className="font-sans">
            {PERSONAL_INFO.copyright}
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Official Portfolio</span>
            <span className="text-slate-700">·</span>
            <span>Skardu, Gilgit-Baltistan</span>
            <span className="text-slate-700">·</span>
            <span className="text-amber-400">ناصری پروڈکشن</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
