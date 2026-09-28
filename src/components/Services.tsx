import { 
  Film, 
  Tv, 
  Palette, 
  Share2, 
  Smartphone, 
  BookOpen, 
  Brain,
  Video,
  LayoutTemplate,
  Briefcase,
  MessageCircle
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem, PERSONAL_INFO } from '../data/portfolioData';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutTemplate': return <LayoutTemplate className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
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
            <span>Creative & Practical Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            My Services
          </h2>
          <div className="mt-2 text-xl font-urdu text-amber-300 font-semibold">
            میری خدمات
          </div>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-xl">
            Professional digital media creation, generative AI production, graphic design, and practical services provided by Nasiri Production.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => {
            const isPhoneService = service.id === 'srv-9';
            return (
              <div
                key={service.id}
                className={`glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group relative border ${
                  isPhoneService ? 'border-amber-400/30 bg-gradient-to-b from-[#0e1628] to-[#070a12]' : 'border-white/5'
                }`}
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-amber-400/40 group-hover:text-amber-400 transition-colors font-mono">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
                      {getIcon(service.icon)}
                    </div>
                  </div>

                  {/* Urdu Subtitle */}
                  <div dir="rtl" className="text-xs font-urdu text-amber-300/90 mb-1 text-right">
                    {service.urduTitle}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* English Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {service.shortDesc}
                  </p>

                  {/* Urdu Description */}
                  {service.urduDesc && (
                    <p dir="rtl" className="text-xs font-urdu text-slate-400 leading-[2.1] mb-4 text-right">
                      {service.urduDesc}
                    </p>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <button
                    type="button"
                    onClick={() => handleInquire(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded px-1"
                  >
                    <span>Inquire Now / رابطہ کریں</span>
                  </button>

                  <a
                    href={`${PERSONAL_INFO.whatsappUrl}?text=${encodeURIComponent(`السلام علیکم! میں آپ کی سروس "${service.title}" کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Inquire on WhatsApp"
                    className="p-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
