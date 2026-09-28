import { useState } from 'react';
import { 
  Sparkles, 
  Film, 
  Tv, 
  Palette, 
  Image as ImageIcon, 
  Video, 
  BookOpen, 
  Eye, 
  Play, 
  ExternalLink,
  Layers,
  FolderOpen
} from 'lucide-react';
import { 
  PORTFOLIO_CATEGORIES, 
  portfolioItems, 
  PortfolioProject, 
  PortfolioCategory,
  PortfolioCategoryConfig 
} from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Image': return <ImageIcon className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      default: return <FolderOpen className="w-5 h-5" />;
    }
  };

  // Filter categories to display
  const displayedCategories = activeCategory === 'All'
    ? PORTFOLIO_CATEGORIES
    : PORTFOLIO_CATEGORIES.filter(c => c.name === activeCategory);

  // Projects per category helper
  const getProjectsForCategory = (catName: PortfolioCategory): PortfolioProject[] => {
    return portfolioItems.filter(item => item.category === catName);
  };

  return (
    <section id="portfolio" className="relative py-24 bg-[#07090e] border-b border-white/5 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Subtle Branded Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wide">Nasiri Production · پورٹ فولیو شوکیس</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-urdu py-1">
            <span className="gold-gradient-text">تخلیقی پورٹ فولیو</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-base sm:text-xl font-urdu text-amber-300/90 font-medium">
            میرے منتخب کردہ حقیقی تخلیقی کام
          </p>
          
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl">
            Authentic creative works by Muhammad Mustafa Nasiri across seven dedicated media and design categories.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-center mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl max-w-5xl">
            {/* "All" Tab */}
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                activeCategory === 'All'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="font-urdu text-xs font-semibold">تمام</span>
              <span className="opacity-75 text-[11px]">/ All</span>
            </button>

            {/* The 7 Official Categories */}
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.name;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-urdu text-xs font-semibold">{cat.urduName}</span>
                  <span className="opacity-75 text-[10px] tracking-tight">({cat.name})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 
          SEVEN SEPARATE CATEGORY CARDS 
          Per Section 8 & Section 26: Each category has its own separate, complete card.
          Each card displays:
          - Category icon
          - Category title (English + Urdu)
          - Short category description
          - Empty portfolio area
          - The primary visible Urdu empty-state message: "اس زمرے میں میرا حقیقی کام بہت جلد شامل کیا جائے گا۔"
          - English fallback: "My real work in this category will be added soon."
          When projects exist in portfolioItems, they render smoothly inside the card.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((catConfig: PortfolioCategoryConfig, index: number) => {
            const projectsInCat = getProjectsForCategory(catConfig.name);
            const hasProjects = projectsInCat.length > 0;

            return (
              <div
                key={catConfig.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border border-white/10 relative overflow-hidden transition-all duration-300"
              >
                {/* Subtle top accent hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400 transition-all" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-105 group-hover:bg-amber-400/20 transition-all">
                      {getCategoryIcon(catConfig.icon)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-amber-400 transition-colors">
                      Card {index + 1} of 7
                    </span>
                  </div>

                  {/* Urdu Category Title */}
                  <div dir="rtl" className="text-base font-urdu text-amber-300 font-bold mb-1 text-right">
                    {catConfig.urduName}
                  </div>

                  {/* English Category Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {catConfig.name}
                  </h3>

                  {/* Short Category Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {catConfig.description}
                  </p>

                  {/* Content Area: If projects exist, render project cards. If empty, render empty state */}
                  {hasProjects ? (
                    <div className="space-y-4">
                      {projectsInCat.map((project) => (
                        <div
                          key={project.id}
                          className="rounded-xl overflow-hidden border border-white/10 bg-slate-950 p-3 group/item cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black/60 mb-2 flex items-center justify-center">
                            {project.imageSrc ? (
                              <img src={project.imageSrc} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center">
                                {project.mediaType === 'video' ? <Play className="w-6 h-6 text-amber-400" /> : <ImageIcon className="w-6 h-6 text-amber-400" />}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-white truncate">{project.title}</span>
                            <Eye className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Clean Empty State Area */
                    <div className="rounded-xl border-2 border-dashed border-amber-400/25 bg-slate-950/70 p-6 flex flex-col items-center justify-center text-center my-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-3">
                        <FolderOpen className="w-5 h-5 text-amber-400" />
                      </div>

                      {/* Primary Visible Urdu Message */}
                      <p className="text-sm sm:text-base font-urdu text-amber-200 font-bold mb-1.5 leading-relaxed text-center">
                        اس زمرے میں میرا حقیقی کام بہت جلد شامل کیا جائے گا۔
                      </p>

                      {/* English Fallback */}
                      <p className="text-[11px] text-slate-400 leading-normal max-w-xs">
                        My real work in this category will be added soon.
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-urdu text-amber-300/80">ناصری پروڈکشن</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {hasProjects ? `${projectsInCat.length} Project(s)` : 'Empty State Ready'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Project Detail Lightbox Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
