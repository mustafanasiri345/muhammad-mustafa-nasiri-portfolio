import { X, Play, Image as ImageIcon, ExternalLink, Code2, Tag, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { PortfolioProject } from '../data/portfolioData';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!project) return null;

  const replaceSnippet = `// In /src/data/portfolioData.ts (id: "${project.id}"):
{
  id: "${project.id}",
  title: "${project.title}",
  category: "${project.category}",
  imageSrc: "https://your-domain.com/your-media-file.jpg", // <-- Insert your image/video URL here
  ...
}`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(replaceSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-[#0c1220] border border-amber-400/30 p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Media Placeholder Canvas */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-white/10 mb-6 flex flex-col items-center justify-center p-6 text-center group">
          {project.imageSrc ? (
            <img 
              src={project.imageSrc} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="relative z-10 flex flex-col items-center max-w-md space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
                {project.mediaType === 'video' ? (
                  <Play className="w-8 h-8 fill-amber-400/20 text-amber-400 ml-1" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-amber-400" />
                )}
              </div>
              <div className="text-sm font-semibold text-white">
                {project.mediaType === 'video' ? 'AI Video Project Placeholder' : 'Visual Artwork Placeholder'}
              </div>
              <p className="text-xs text-slate-400">
                "{project.title}"
              </p>
              <div className="text-[11px] text-amber-300/80 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
                Ready for user upload • Nasiri Production Showcase
              </div>
            </div>
          )}

          {/* Grid decor lines */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)',
              backgroundSize: '24px 24px' 
            }}
          />
        </div>

        {/* Project Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span className="text-amber-400 font-medium">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Nasiri Production Archive</span>
              <span aria-hidden="true">·</span>
              <span className="uppercase text-[10px] font-mono">{project.aspectRatio} format</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>

          {project.urduTitle && (
            <div dir="rtl" className="text-right">
              <span className="text-base font-urdu text-amber-300 font-medium block">
                {project.urduTitle}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed mb-6">
          <p>{project.description}</p>
          {project.urduDescription && (
            <div dir="rtl" className="p-3 rounded-lg bg-black/30 border border-white/5 text-amber-200/90 font-urdu text-base leading-[2.1]">
              {project.urduDescription}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs text-slate-400">Keywords:</span>
          {project.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-white/5">
              #{tag}
            </span>
          ))}
        </div>

        {/* Developer / Owner Replacement Helper */}
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-400/20 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-medium text-amber-300">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>How to replace this placeholder with your photo/video:</span>
            </div>
            <button
              onClick={handleCopySnippet}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 transition-colors cursor-pointer"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <p className="text-slate-400 leading-normal mb-2 text-[11px]">
            Open <code className="text-amber-200">/src/data/portfolioData.ts</code>, find item with <code className="text-amber-200">"{project.id}"</code> and add your real image or video URL to the <code className="text-amber-200">imageSrc</code> property.
          </p>
          <pre className="p-2 rounded bg-black/60 font-mono text-[10px] text-slate-300 overflow-x-auto">
            {replaceSnippet}
          </pre>
        </div>

      </div>
    </div>
  );
}
