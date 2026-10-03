import { useState } from 'react';
import { 
  Film, 
  Smartphone, 
  Share2, 
  Tv, 
  Youtube, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  ExternalLink,
  Copy, 
  Check,
  FolderOpen,
  Sparkles,
  Radio,
  Play,
  Eye
} from 'lucide-react';
import { 
  MEDIA_PLACEHOLDERS, 
  SOCIAL_LINKS, 
  PERSONAL_INFO,
  MediaPlaceholderItem,
  SocialLinkItem,
  PortfolioProject
} from '../data/portfolioData';
import { resolveAssetUrl } from '../utils/assetUrl';
import { ProjectModal } from './ProjectModal';

function MediaCardItem({
  item,
  onPreview
}: {
  item: MediaPlaceholderItem;
  onPreview: (proj: PortfolioProject) => void;
}) {
  const [loadError, setLoadError] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const imageSrc = item.imageSrc ? resolveAssetUrl(item.imageSrc) : '';
  const videoSrc = item.videoSrc ? resolveAssetUrl(item.videoSrc) : '';
  const isVideo = Boolean(item.videoSrc);
  const hasGallery = Boolean(item.gallery && item.gallery.length > 1);

  const handleOpenImage = (targetImgPath?: string, indexLabel?: string) => {
    const chosenImg = targetImgPath || item.imageSrc;
    onPreview({
      id: indexLabel ? `${item.id}-${indexLabel}` : item.id,
      title: indexLabel ? `${item.title} ${indexLabel}` : item.title,
      urduTitle: indexLabel ? `${item.urduTitle} ${indexLabel}` : item.urduTitle,
      category: item.type === 'Videos' ? 'AI Videos' : 'Social Media Posters',
      description: item.description,
      urduDescription: item.description,
      mediaType: item.videoSrc && !targetImgPath ? 'video' : 'image',
      imageSrc: chosenImg,
      videoSrc: targetImgPath ? undefined : item.videoSrc,
      aspectRatio: item.aspectRatio === '16/9' ? '16/9' : '1/1'
    });
  };

  const handleMediaAreaClick = () => {
    if (isVideo && videoSrc) {
      setIsPlayingInline(true);
    } else {
      handleOpenImage();
    }
  };

  const getMediaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      default: return <Tv className="w-5 h-5" />;
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group border border-white/10 relative overflow-hidden transition-all duration-300">
      <div>
        {/* Top Type Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
            {getMediaIcon(item.icon)}
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
            {item.type}
          </span>
        </div>

        {/* Urdu Title */}
        <div dir="rtl" className="text-xs font-urdu text-amber-300/90 font-medium mb-1 text-right">
          {item.urduTitle}
        </div>

        {/* English Title */}
        <h4 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
          {item.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Visual Media or Clean Empty-State Canvas Container */}
        {hasGallery && item.gallery && !loadError ? (
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {item.gallery.map((galPath, idx) => {
              const resolvedGal = resolveAssetUrl(galPath);
              return (
                <div
                  key={galPath}
                  className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950/90 border border-white/10 cursor-pointer group/img flex items-center justify-center"
                  onClick={() => handleOpenImage(galPath, `0${idx + 1}`)}
                >
                  <img
                    src={resolvedGal}
                    alt={`${item.title} 0${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedRelative) {
                        target.dataset.triedRelative = '1';
                        target.src = galPath;
                      } else if (!target.dataset.triedSingleJpg && galPath.endsWith('.jpg.jpg')) {
                        target.dataset.triedSingleJpg = '1';
                        target.src = resolveAssetUrl(galPath.replace(/\.jpg\.jpg$/, '.jpg'));
                      } else {
                        setLoadError(true);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-medium bg-slate-900/90 px-2 py-1 rounded border border-amber-400/30">
                      <Eye className="w-3 h-3" />
                      <span>0{idx + 1}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : item.imageSrc && !loadError ? (
          <div 
            className={`relative ${item.aspectRatio === '16/9' ? 'aspect-video' : 'aspect-square'} w-full rounded-xl overflow-hidden bg-slate-950/90 border border-white/10 mb-4 cursor-pointer group/img flex items-center justify-center`}
            onClick={!isPlayingInline ? handleMediaAreaClick : undefined}
          >
            {isVideo && isPlayingInline && videoSrc ? (
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={imageSrc || undefined}
                className="w-full h-full object-contain bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <source src={videoSrc} type="video/mp4" />
                {item.videoSrc && <source src={item.videoSrc} type="video/mp4" />}
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <img 
                src={imageSrc} 
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedRelative) {
                    target.dataset.triedRelative = '1';
                    target.src = item.imageSrc || '';
                  } else if (!target.dataset.triedSingleJpg && item.imageSrc?.endsWith('.jpg.jpg')) {
                    target.dataset.triedSingleJpg = '1';
                    target.src = resolveAssetUrl(item.imageSrc.replace(/\.jpg\.jpg$/, '.jpg'));
                  } else {
                    setLoadError(true);
                  }
                }}
              />
            )}

            {/* Play Button overlay for Videos */}
            {isVideo && !isPlayingInline && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-11 h-11 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover/img:scale-110">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>
            )}

            {/* Hover overlay hint */}
            {!isPlayingInline && (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-medium bg-slate-900/90 px-3 py-1.5 rounded-lg border border-amber-400/30 shadow-lg">
                  {isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{isVideo ? 'ویڈیو چلائیں / Play Video' : 'دیکھیں / View Content'}</span>
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-amber-400/25 bg-slate-950/80 p-5 flex flex-col items-center justify-center text-center my-2">
            <FolderOpen className="w-6 h-6 text-amber-400/80 mb-2" />
            <p className="text-xs sm:text-sm font-urdu text-amber-200 font-bold mb-1 leading-relaxed text-center">
              میرا حقیقی میڈیا کام بہت جلد یہاں شامل کیا جائے گا۔
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Real media content will be added here soon.
            </p>
          </div>
        )}
      </div>

      {/* Action / Footer */}
      {item.imageSrc && !loadError ? (
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
          <button
            type="button"
            onClick={() => handleOpenImage()}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            {isVideo ? <Play className="w-3.5 h-3.5 fill-current" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isVideo ? 'ویڈیو دیکھیں / Play Video' : 'دیکھیں / View'}</span>
          </button>
        </div>
      ) : (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Nasiri Production</span>
          <span className="font-mono text-[10px] text-amber-400/80">{item.aspectRatio}</span>
        </div>
      )}
    </div>
  );
}

export function MediaSection() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [selectedMediaProject, setSelectedMediaProject] = useState<PortfolioProject | null>(null);

  const handleCopyLink = (name: string, url: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const getMediaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      default: return <Film className="w-5 h-5" />;
    }
  };

  const getPlatformIcon = (icon: string) => {
    switch (icon) {
      case 'youtube': return <Youtube className="w-5 h-5 text-red-500" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-500" />;
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'whatsapp': return <MessageCircle className="w-5 h-5 text-emerald-400" />;
      case 'whatsapp-channel': return <Radio className="w-5 h-5 text-emerald-400" />;
      case 'tiktok': return (
        <svg className="w-5 h-5 text-[#00f2fe]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.41a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.19 8.19 0 0 0 4.77 1.52V6.78a4.85 4.85 0 0 1-1.04-.09z"/>
        </svg>
      );
      default: return <Share2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="media" className="relative py-24 bg-[#090d16]/35 border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Media Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Media
          </h2>
          <div className="mt-2 text-xl font-urdu text-amber-300 font-semibold">
            میڈیا
          </div>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-xl">
            Featured video streams, vertical reels, and social media broadcasting from Nasiri Production.
          </p>
        </div>

        {/* 
          PART 1: 4 CLEAN MEDIA PLACEHOLDERS (Per Section 11)
          - Videos
          - Reels
          - Social Media Content
          - Featured Media
          With empty-state message: "میرا حقیقی میڈیا کام بہت جلد یہاں شامل کیا جائے گا۔"
        */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Broadcast & Video Channels</span>
            </h3>
            <span className="font-urdu text-xs text-amber-300/80">ویڈیو و براڈکاسٹ میڈیا</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEDIA_PLACEHOLDERS.map((item: MediaPlaceholderItem) => (
              <MediaCardItem 
                key={item.id} 
                item={item} 
                onPreview={(proj) => setSelectedMediaProject(proj)} 
              />
            ))}
          </div>
        </div>

        {/* 
          PART 2: SOCIAL MEDIA PLATFORMS (Per Section 12)
          - Facebook
          - YouTube
          - TikTok
          - Instagram
          - WhatsApp (with 03408816926)
        */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Social Media Channels & Direct Contacts</span>
            </h3>
            <span className="font-urdu text-xs text-amber-300/80">سوشل میڈیا روابط</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOCIAL_LINKS.map((item: SocialLinkItem) => {
              const isWhatsApp = item.name.includes('WhatsApp');
              return (
                <div
                  key={item.name}
                  className={`glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group border relative ${
                    isWhatsApp ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-white/5'
                  }`}
                >
                  <div>
                    {/* Top Icon & Urdu */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getPlatformIcon(item.icon)}
                      </div>
                      <span dir="rtl" className="text-xs font-urdu text-amber-300/80">
                        {item.urduName}
                      </span>
                    </div>

                    {/* Platform Title */}
                    <h4 className="text-base font-bold text-white mb-0.5 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h4>

                    {/* Handle */}
                    <div className="text-xs text-amber-400 font-mono mb-2">
                      {item.handle}
                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-slate-400 leading-normal mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-white/5">
                    {item.name === 'WhatsApp' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    ) : item.name === 'WhatsApp Channel' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-colors cursor-pointer"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>Join WhatsApp Channel</span>
                      </a>
                    ) : item.name === 'YouTube' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Watch on YouTube</span>
                      </a>
                    ) : item.name === 'Facebook' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Facebook</span>
                      </a>
                    ) : item.name === 'Instagram' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Follow on Instagram</span>
                      </a>
                    ) : item.name === 'TikTok' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Follow on TikTok</span>
                      </a>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Channel</span>
                      </a>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Media Detail & Video Lightbox Modal */}
      <ProjectModal 
        project={selectedMediaProject} 
        onClose={() => setSelectedMediaProject(null)} 
      />
    </section>
  );
}
