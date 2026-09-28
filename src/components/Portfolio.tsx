import { useState, useEffect, useRef } from 'react';
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
  FolderOpen,
  Upload
} from 'lucide-react';
import { 
  PORTFOLIO_CATEGORIES, 
  portfolioItems, 
  PortfolioProject, 
  PortfolioCategory,
  PortfolioCategoryConfig 
} from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { getPortfolioImage, savePortfolioImage } from '../utils/imageStorage';

function PortfolioPosterCard({ 
  project, 
  onPreview 
}: { 
  project: PortfolioProject; 
  onPreview: (proj: PortfolioProject) => void;
}) {
  const [currentImage, setCurrentImage] = useState<string>(project.imageSrc || '');
  const [loadError, setLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    getPortfolioImage(project.id).then((cached) => {
      if (isMounted && cached) {
        setCurrentImage(cached);
        setLoadError(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [project.id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setCurrentImage(base64);
        setLoadError(false);
        await savePortfolioImage(project.id, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const filename = project.imageSrc ? project.imageSrc.split('/').pop() : '';

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-amber-400/20 bg-slate-900/80 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 group">
      <div>
        {/* Poster Image Display Area */}
        <div 
          className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950/90 border border-white/10 mb-4 cursor-pointer group/img flex items-center justify-center"
          onClick={() => onPreview({ ...project, imageSrc: currentImage })}
        >
          {!loadError ? (
            <img 
              src={currentImage} 
              alt={project.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
              onError={() => setLoadError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center space-y-2.5 w-full h-full bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <span className="font-urdu text-sm font-bold text-amber-200" dir="rtl">
                {project.urduTitle || project.title}
              </span>
              <p className="text-[10px] text-slate-400 font-mono">
                {filename}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-lg transition-colors cursor-pointer mt-1"
              >
                <Upload className="w-3 h-3" />
                <span>فائل منتخب کریں</span>
              </button>
            </div>
          )}

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-medium bg-slate-900/90 px-3 py-1.5 rounded-lg border border-amber-400/30 shadow-lg">
              <Eye className="w-3.5 h-3.5" />
              <span>پوسٹر بڑا کر کے دیکھیں</span>
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Category Label Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-medium w-fit mb-2.5">
          <BookOpen className="w-3 h-3 text-amber-400" />
          <span className="font-urdu">اسلامی و دینی ڈیزائنز</span>
          <span className="text-[10px] text-slate-400">· Islamic Designs</span>
        </div>

        {/* Project Title */}
        <h4 
          className="text-base sm:text-lg font-bold text-white font-urdu mb-2 group-hover:text-amber-300 transition-colors leading-relaxed" 
          dir="rtl"
        >
          {project.urduTitle || project.title}
        </h4>

        {/* Short Description */}
        <p 
          className="text-xs text-slate-300/90 font-urdu leading-loose mb-4 line-clamp-3" 
          dir="rtl"
        >
          {project.urduDescription || project.description}
        </p>
      </div>

      {/* View / Preview Option Button */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
        <button
          type="button"
          onClick={() => onPreview({ ...project, imageSrc: currentImage })}
          className="flex-1 py-2 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>پوسٹر دیکھیں / View Poster</span>
        </button>
      </div>
    </div>
  );
}

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
          SEVEN SEPARATE CATEGORIES:
          - Islamic & Religious Designs contains 4 separate project cards.
            DO NOT show empty-state message inside Islamic & Religious Designs.
          - The other six categories contain 0 projects and show:
            "اس زمرے میں میرا حقیقی کام بہت جلد شامل کیا جائے گا۔"
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCategories.map((catConfig: PortfolioCategoryConfig, index: number) => {
            const projectsInCat = getProjectsForCategory(catConfig.name);
            const hasProjects = projectsInCat.length > 0;
            const isIslamicCategory = catConfig.name === 'Islamic & Religious Designs';

            // When "All" is active, Islamic & Religious Designs spans full width to comfortably display the 4 cards
            const spanClass = (activeCategory === 'All' && isIslamicCategory)
              ? 'col-span-1 md:col-span-2 lg:col-span-3'
              : 'col-span-1';

            return (
              <div
                key={catConfig.id}
                className={`glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 relative overflow-hidden transition-all duration-300 ${spanClass}`}
              >
                {/* Subtle top accent hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent transition-all" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                      {getCategoryIcon(catConfig.icon)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-500">
                      Category {index + 1} of 7
                    </span>
                  </div>

                  {/* Urdu Category Title */}
                  <div dir="rtl" className="text-lg font-urdu text-amber-300 font-bold mb-1 text-right">
                    {catConfig.urduName}
                  </div>

                  {/* English Category Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {catConfig.name}
                  </h3>

                  {/* Short Category Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {catConfig.description}
                  </p>

                  {/* Content Area: If projects exist, render the project cards. NO empty state here! */}
                  {hasProjects ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-2">
                      {projectsInCat.map((project) => (
                        <PortfolioPosterCard
                          key={project.id}
                          project={project}
                          onPreview={(proj) => setSelectedProject(proj)}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Clean Empty State Area for the remaining six empty categories */
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
                <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-urdu text-amber-300/80">ناصری پروڈکشن</span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {hasProjects ? `${projectsInCat.length} Projects Active` : 'Empty State Ready'}
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
