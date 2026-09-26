import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Media', href: '#media' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#05070b] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      
      {/* Decorative top gold gradient hairline */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* Urdu Name */}
            <div dir="rtl" className="mb-1">
              <span className="text-2xl sm:text-3xl font-urdu text-amber-300 font-semibold drop-shadow-md">
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

            {/* Tagline specified by user: "AI • Digital Media • Creative Content" */}
            <p className="mt-2 text-xs text-slate-400 tracking-wider">
              "{PERSONAL_INFO.tagline}"
            </p>

            {/* Origin Location */}
            <p className="text-[11px] text-slate-500 mt-1">
              {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-amber-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>
            Copyright © 2026 Muhammad Mustafa Nasiri. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Personal Portfolio</span>
            <span className="text-slate-700">·</span>
            <span>Skardu, Gilgit-Baltistan</span>
            <span className="text-slate-700">·</span>
            <span className="text-amber-400/80">Nasiri Production</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
