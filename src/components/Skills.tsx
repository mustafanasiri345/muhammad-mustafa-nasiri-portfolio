import { 
  Brain, 
  Film, 
  Tv, 
  Share2, 
  Palette, 
  LayoutTemplate, 
  Image as ImageIcon, 
  BookOpen, 
  Video, 
  Terminal, 
  Sparkles,
  Layers
} from 'lucide-react';
import { SKILLS_DATA, SkillItem } from '../data/portfolioData';

export function Skills() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-amber-400" />;
      case 'Film': return <Film className="w-5 h-5 text-amber-400" />;
      case 'Tv': return <Tv className="w-5 h-5 text-amber-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-amber-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-amber-400" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-5 h-5 text-amber-400" />;
      case 'Image': return <ImageIcon className="w-5 h-5 text-amber-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'Video': return <Video className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 bg-[#07090e]/70 backdrop-blur-[2px] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            My Skills
          </h2>
          <div className="mt-2 text-xl font-urdu text-amber-300 font-semibold">
            میری مہارتیں
          </div>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm max-w-xl">
            A focused skillset spanning generative AI workflows, digital video editing, visual graphic arts, and cultural content creation.
          </p>
        </div>

        {/* 10 Skills Grid (No Fake Percentages) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SKILLS_DATA.map((skill: SkillItem, index: number) => {
            return (
              <div
                key={skill.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 flex flex-col justify-between group border border-white/5 relative"
              >
                <div>
                  {/* Top Bar: Icon and Skill Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-400/20 transition-all">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-amber-400/70 transition-colors">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Urdu Skill Name */}
                  <div dir="rtl" className="text-xs font-urdu text-amber-300/90 font-medium mb-1 text-right">
                    {skill.urduName}
                  </div>

                  {/* English Skill Name */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono text-[10px] text-amber-400/80">Active Skill</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
