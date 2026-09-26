import { 
  Film, 
  Image as ImageIcon, 
  Tv, 
  Palette, 
  Share2, 
  Smartphone, 
  Terminal, 
  BookOpen, 
  ArrowUpRight, 
  Check, 
  Briefcase 
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/portfolioData';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="w-6 h-6" />;
      case 'Image': return <ImageIcon className="w-6 h-6" />;
      case 'Tv': return <Tv className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'Share2': return <Share2 className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const el = document.getElementById('contact');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#090d16] border-b border-white/5 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Tailored Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Services & Solutions
          </h2>
          <div className="mt-2 text-lg font-urdu text-amber-300/80">
            پیشہ ورانہ تخلیقی خدمات
          </div>
          <p className="mt-3 text-slate-400 text-sm max-w-2xl">
            High-standard generative media, graphic design, and video production tailored for individuals, channels, and digital campaigns.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => {
            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-amber-400/40 group-hover:text-amber-400 transition-colors font-mono">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
                      {getIcon(service.icon)}
                    </div>
                  </div>

                  {/* Urdu Subtitle */}
                  <div dir="rtl" className="text-xs font-urdu text-amber-300/90 mb-1">
                    {service.urduTitle}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => handleInquire(service.title)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 hover:text-amber-300 bg-white/5 hover:bg-amber-400/10 rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <span>Inquire for this Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Need a customized creative or bilingual project?</h4>
            <p className="text-xs text-slate-400 mt-1">
              From end-to-end AI video campaigns to custom Urdu educational series, let's discuss your requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleInquire('Custom Project Inquiries')}
            className="shrink-0 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            Start a Conversation
          </button>
        </div>

      </div>
    </section>
  );
}
