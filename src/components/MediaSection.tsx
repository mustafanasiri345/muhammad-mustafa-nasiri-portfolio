import { useState } from 'react';
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  Code2
} from 'lucide-react';
import { SOCIAL_LINKS } from '../data/portfolioData';

export function MediaSection() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopyLink = (name: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'youtube': return <Youtube className="w-6 h-6 text-red-500" />;
      case 'facebook': return <Facebook className="w-6 h-6 text-blue-500" />;
      case 'instagram': return <Instagram className="w-6 h-6 text-pink-500" />;
      case 'whatsapp': return <MessageCircle className="w-6 h-6 text-emerald-400" />;
      case 'tiktok': return (
        <svg className="w-6 h-6 text-[#00f2fe]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.41a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.19 8.19 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.04-.09z"/>
        </svg>
      );
      default: return <Share2 className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="media" className="relative py-24 bg-[#090d16] border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>Digital Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Find Me Online
          </h2>
          <div className="mt-2 text-lg font-urdu text-amber-300/80">
            سوشل میڈیا اور آن لائن روابط
          </div>
          <p className="mt-3 text-slate-400 text-sm max-w-2xl">
            Connect across social platforms for upcoming AI creative experiments, video tutorials, and Nasiri Production releases.
          </p>
        </div>

        {/* 5 Social Media Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {SOCIAL_LINKS.map((item) => {
            const isCopied = copiedLink === item.name;
            return (
              <div
                key={item.name}
                className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group border border-white/5 relative"
              >
                <div>
                  {/* Icon & Urdu Title */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getPlatformIcon(item.icon)}
                    </div>
                    <span dir="rtl" className="text-xs font-urdu text-amber-300/80">
                      {item.urduName}
                    </span>
                  </div>

                  {/* Platform Name */}
                  <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>

                  {/* Handle */}
                  <div className="text-xs text-amber-400/90 font-mono mb-2">
                    {item.handle}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 leading-normal mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action with Placeholder Link */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  <a
                    href={item.url}
                    onClick={(e) => {
                      if (item.url === '#SOCIAL_LINK_HERE') {
                        e.preventDefault();
                        handleCopyLink(item.name, item.url);
                      }
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-200 bg-white/5 hover:bg-amber-400/15 hover:text-amber-300 border border-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Connect</span>
                    <ExternalLink className="w-3 h-3 text-amber-400" />
                  </a>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="truncate max-w-[110px]">{item.url}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(item.name, item.url)}
                      className="text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1"
                      title="Copy placeholder URL"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Done' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Placeholder Customization Note for user */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Code2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              All social URLs are configured as <code className="text-amber-300 font-mono">#SOCIAL_LINK_HERE</code> as requested. You can update your links anytime in <code className="text-amber-300 font-mono">/src/data/portfolioData.ts</code>.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
