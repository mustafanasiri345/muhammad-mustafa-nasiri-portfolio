import { useState } from 'react';
import { 
  Play, 
  Image as ImageIcon, 
  Eye, 
  Sparkles, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const categories = [
    'All',
    'AI Videos',
    'AI Images',
    'Posters',
    'Thumbnails',
    'Social Media',
    'Educational'
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-[#07090e] border-b border-white/5 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Portfolio
          </h2>
          <div className="mt-2 text-lg font-urdu text-amber-300/80">
            نمونہ جات اور تخلیقی پروجیکٹس
          </div>
          <p className="mt-3 text-slate-400 text-sm max-w-2xl">
            Explore curated creative concepts across AI video generation, prompt engineering, high-CTR YouTube thumbnails, and culturally resonant posters.
          </p>
        </div>

        {/* Category Filters (Clean Segmented Tabs) */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-white/10 shadow-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice for Muhammad Mustafa on replacing placeholders */}
        <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-xl bg-slate-900/60 border border-amber-400/20 flex items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              All items currently use clean visual placeholders. Click <strong>"View Project"</strong> on any card for instructions on dropping in your live YouTube links or image files.
            </span>
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: PortfolioProject) => {
            return (
              <div
                key={project.id}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-white/10"
              >
                {/* Media Placeholder Header Canvas */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-900 via-[#0a101d] to-slate-950 border-b border-white/10 flex items-center justify-center p-6 text-center">
                  
                  {project.imageSrc ? (
                    <img 
                      src={project.imageSrc} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-2.5">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all">
                        {project.mediaType === 'video' ? (
                          <Play className="w-6 h-6 fill-amber-400/20 text-amber-400 ml-0.5" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-amber-400" />
                        )}
                      </div>
                      <span className="text-[11px] font-medium text-amber-300/90 tracking-wider uppercase font-mono">
                        {project.mediaType === 'video' ? 'AI Video Concept' : 'Visual Design Asset'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Placeholder Ready
                      </span>
                    </div>
                  )}

                  {/* Corner format watermark */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/5">
                    {project.aspectRatio}
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-slate-950" />
                      <span>Preview Details</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata Header (Zero-Pill compliant: unboxed text with dot separator) */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="text-amber-400 font-semibold">{project.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Nasiri Production</span>
                    </div>

                    {/* Urdu Title if available */}
                    {project.urduTitle && (
                      <div dir="rtl" className="text-xs font-urdu text-amber-300/80 mb-1">
                        {project.urduTitle}
                      </div>
                    )}

                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span>{project.tags[0]}</span>
                      {project.tags[1] && (
                        <>
                          <span aria-hidden="true">/</span>
                          <span>{project.tags[1]}</span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-200 group/btn cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded p-1"
                    >
                      <span>View Project</span>
                      <Eye className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
