import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', urdu: 'ہوم' },
    { label: 'About', href: '#about', urdu: 'تعارف' },
    { label: 'Skills', href: '#skills', urdu: 'مہارتیں' },
    { label: 'Services', href: '#services', urdu: 'خدمات' },
    { label: 'Portfolio', href: '#portfolio', urdu: 'پورٹ فولیو' },
    { label: 'Media', href: '#media', urdu: 'سوشل میڈیا' },
    { label: 'Reviews', href: '#reviews', urdu: 'تاثرات' },
    { label: 'Contact', href: '#contact', urdu: 'رابطہ' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#07090e]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/40 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold tracking-wider text-base shadow-inner group-hover:border-amber-400/60 transition-colors">
              NP
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Nasiri Production
                </span>
                <span className="hidden sm:inline-block text-xs font-urdu text-amber-400/80 font-normal">
                  ناصری پروڈکشن
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-wider font-light">
                Muhammad Mustafa Nasiri
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 relative group rounded-md ${
                    isActive 
                      ? 'text-amber-300 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-amber-300 border border-amber-400/40 rounded-lg hover:bg-amber-400/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>{PERSONAL_INFO.brand}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17] border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl transition-all">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-amber-400/15 text-amber-300 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  </span>
                  <span className="text-xs font-urdu text-slate-400">{item.urdu}</span>
                </a>
              );
            })}
            <div className="pt-3 border-t border-white/10 mt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-900 bg-gradient-to-r from-amber-300 to-amber-400 rounded-lg shadow-md"
              >
                <span>Contact Muhammad Mustafa</span>
                <ArrowUpRight className="w-4 h-4 text-slate-900" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
