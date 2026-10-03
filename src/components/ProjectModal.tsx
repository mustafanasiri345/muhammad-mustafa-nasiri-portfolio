import { X, Play, Image as ImageIcon, ExternalLink, Calendar, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { PortfolioProject, PORTFOLIO_CATEGORIES } from '../data/portfolioData';
import { resolveAssetUrl } from '../utils/assetUrl';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  // Match youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const youtubeEmbedUrl = project.videoSrc ? getYoutubeEmbedUrl(project.videoSrc) : null;
  const isDirectVideo = project.videoSrc && (
    project.videoSrc.endsWith('.mp4') || 
    project.videoSrc.endsWith('.webm') || 
    project.videoSrc.endsWith('.ogg') ||
    project.videoSrc.includes('blob:') ||
    project.videoSrc.includes('/video')
  );

  const categoryConfig = PORTFOLIO_CATEGORIES.find(c => c.name === project.category);
  const urduCategoryLabel = categoryConfig ? categoryConfig.urduName : project.category;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#0a0f1d] border border-amber-400/30 p-5 sm:p-7 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 transition-colors z-30 cursor-pointer shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Player / Lightbox Area */}
        <div className={`relative w-full rounded-xl overflow-hidden bg-black/95 border border-white/10 mb-5 flex items-center justify-center shrink-0 ${
          project.mediaType === 'video' ? 'aspect-video' : 'min-h-[280px] max-h-[72vh] p-2'
        }`}>
          {project.mediaType === 'video' && youtubeEmbedUrl ? (
            <iframe
              src={youtubeEmbedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.mediaType === 'video' && isDirectVideo ? (
            <video
              key={project.videoSrc}
              poster={project.imageSrc ? resolveAssetUrl(project.imageSrc) : undefined}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-contain bg-black"
            >
              <source src={resolveAssetUrl(project.videoSrc)} type="video/mp4" />
              {project.videoSrc && <source src={project.videoSrc} type="video/mp4" />}
              Your browser does not support HTML5 video.
            </video>
          ) : project.imageSrc ? (
            <img 
              src={resolveAssetUrl(project.imageSrc)} 
              alt={project.title} 
              referrerPolicy="no-referrer"
              className="max-h-[68vh] w-auto max-w-full object-contain bg-black/90 rounded-lg shadow-2xl" 
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedRelative) {
                  target.dataset.triedRelative = '1';
                  target.src = project.imageSrc || '';
                } else if (!target.dataset.triedSingleJpg && project.imageSrc?.endsWith('.jpg.jpg')) {
                  target.dataset.triedSingleJpg = '1';
                  target.src = resolveAssetUrl(project.imageSrc.replace(/\.jpg\.jpg$/, '.jpg'));
                } else if (!target.dataset.triedDoubleJpg && project.imageSrc?.endsWith('.jpg') && !project.imageSrc?.endsWith('.jpg.jpg')) {
                  target.dataset.triedDoubleJpg = '1';
                  target.src = resolveAssetUrl(`${project.imageSrc}.jpg`);
                }
              }}
            />
          ) : project.videoSrc ? (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Play className="w-7 h-7 fill-amber-400/20 text-amber-300 ml-0.5" />
              </div>
              <p className="text-sm text-slate-300 font-medium">Video preview available at external link</p>
              <a
                href={project.videoSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
              >
                <span>Watch Video</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                {project.mediaType === 'video' ? <Play className="w-6 h-6" /> : <ImageIcon className="w-6 h-6" />}
              </div>
              <p className="text-xs text-slate-400">Media file ready to attach in portfolioData.ts</p>
            </div>
          )}
        </div>

        {/* Details Section (Scrollable if content is tall) */}
        <div className="overflow-y-auto space-y-4 pr-1">
          {/* Header Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 flex-wrap">
                <span className="text-amber-400 font-semibold">{project.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="font-urdu text-amber-300/90">{urduCategoryLabel}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Nasiri Production</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            {project.urduTitle && (
              <div dir="rtl" className="text-right sm:max-w-xs">
                <span className="text-lg font-urdu text-amber-300 font-semibold block leading-relaxed">
                  {project.urduTitle}
                </span>
              </div>
            )}
          </div>

          {/* Description Block */}
          <div className="space-y-2.5 text-slate-300 text-sm leading-relaxed">
            <p className="text-slate-300">{project.description}</p>
            {project.urduDescription && (
              <div dir="rtl" className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-amber-200/90 font-urdu text-base leading-[2.1]">
                {project.urduDescription}
              </div>
            )}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              {project.tags.map((tag, idx) => (
                <span key={idx} className="text-xs text-slate-300 bg-slate-900/90 px-2.5 py-1 rounded-md border border-white/10 font-mono text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* External Action Button */}
          {project.projectUrl && (
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-slate-400">External project resource:</span>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-colors cursor-pointer"
              >
                <span>پروجیکٹ دیکھیں / Open Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

