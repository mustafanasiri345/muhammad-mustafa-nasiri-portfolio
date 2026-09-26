import { useState } from 'react';
import { 
  Brain, 
  Film, 
  Image as ImageIcon, 
  Terminal, 
  Video, 
  Share2, 
  Palette, 
  LayoutTemplate, 
  Tv, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  Layers
} from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../data/portfolioData';

export function Skills() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Image': return <ImageIcon className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All 11 Skills' },
    { id: 'AI & Generative', label: 'AI & Generative' },
    { id: 'Video & Media', label: 'Video & Media' },
    { id: 'Design & Creative', label: 'Design & Creative' },
    { id: 'Content & Education', label: 'Educational & Islamic' },
  ];

  const filteredSkills = selectedFilter === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter(s => s.category === selectedFilter);

  return (
    <section id="skills" className="relative py-24 bg-[#07090e] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Creative Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills & Specializations
          </h2>
          <div className="mt-2 text-lg font-urdu text-amber-300/80">
            مہارتیں اور پیشہ ورانہ صلاحیتیں
          </div>
          <p className="mt-3 text-slate-400 text-sm max-w-2xl">
            A comprehensive suite of modern generative AI workflows, video pacing, digital poster aesthetics, and cultural content creation.
          </p>
        </div>

        {/* Filter Tabs (Interactive filter control allowed per guidelines) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                selectedFilter === cat.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 11 Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill: SkillItem, index: number) => {
            return (
              <div
                key={skill.id}
                className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon and Urdu Name */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-slate-800/80 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
                      {getIcon(skill.icon)}
                    </div>
                    <div className="text-right" dir="rtl">
                      <span className="text-xs font-urdu text-amber-300/90 font-medium block">
                        {skill.urduName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans tracking-wide">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Tools / Workflow tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                    {skill.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="inline-flex items-center">
                        <span className="text-slate-300">{tool}</span>
                        {tIdx < skill.tools.length - 1 && (
                          <span className="mx-1 text-slate-600" aria-hidden="true">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Visual Activity Bar (No Fake Percentages) */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Active Creative Focus
                    </span>
                    <span className="text-amber-300/90 font-medium font-mono text-[10px]">
                      {skill.focusLevel}
                    </span>
                  </div>

                  {/* Animated pulsating energy track */}
                  <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full animate-pulse"
                      style={{ 
                        width: '100%',
                        animationDuration: `${2.5 + (index % 4) * 0.6}s` 
                      }} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Note on genuine mastery */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <span>Continuous hands-on creation with modern AI models & production suites • Verified workflow capabilities</span>
        </div>

      </div>
    </section>
  );
}
