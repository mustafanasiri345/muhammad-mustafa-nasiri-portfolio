import { MapPin, Sparkles, Video, BookOpen, Compass, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function About() {
  const pillars = [
    {
      title: 'Artificial Intelligence',
      urdu: 'مصنوعی ذہانت (AI)',
      desc: 'Exploring prompt engineering, generative video models, and synthetic imagery workflows.',
      icon: Cpu,
    },
    {
      title: 'Digital Media & Video',
      urdu: 'ڈیجیٹل میڈیا اور ویڈیو سازی',
      desc: 'Creating engaging video pacing, visual storytelling, and high-impact social media assets.',
      icon: Video,
    },
    {
      title: 'Educational & Islamic Content',
      urdu: 'تعلیمی اور اسلامی مواد',
      desc: 'Curating respectful, spiritually inspiring, and knowledge-driven digital visual media.',
      icon: BookOpen,
    },
    {
      title: 'Rooted in Skardu, GB',
      urdu: 'سکردو، گلگت بلتستان',
      desc: 'Bringing a fresh creative perspective from the breathtaking valleys of northern Pakistan.',
      icon: Compass,
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#090d16] border-y border-white/5 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 left-10 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="mt-2 text-lg font-urdu text-amber-300/80">
            تعارف و پس منظر
          </div>
        </div>

        {/* Core Statement Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-amber-500/20 relative shadow-2xl">
            <div className="absolute -top-3 left-8 px-4 py-1 rounded bg-[#07090e] border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider">
              OFFICIAL STATEMENT
            </div>

            {/* Official Urdu Introduction - exact wording provided by user */}
            <div dir="rtl" className="mt-4 mb-6">
              <p className="font-urdu text-lg sm:text-xl md:text-2xl text-amber-100 font-normal leading-[2.4] text-right">
                {PERSONAL_INFO.aboutUrdu}
              </p>
            </div>

            {/* English translation / parallel description without inventing extra facts */}
            <div className="pt-6 border-t border-white/10 text-slate-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                My name is <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>, based in{' '}
                <span className="text-amber-300 font-medium">{PERSONAL_INFO.location}</span>. My focus spans Artificial Intelligence, digital media production, video creation, social media content strategies, and the thoughtful curation of educational and Islamic media.
              </p>
              <p className="text-slate-400 text-sm">
                Under <strong className="text-slate-200">{PERSONAL_INFO.brand}</strong>, I utilize modern generative AI technology for creative, educational, and beneficial endeavors, transforming innovative concepts into compelling visual projects.
              </p>
            </div>

            {/* Location & Origin detail */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Origin: <span className="text-slate-200">Skardu, Gilgit-Baltistan, Pakistan</span></span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span>Brand: <span className="text-amber-300 font-medium">Nasiri Production (ناصری پروڈکشن)</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid (Domain Focus) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {pillar.title}
                  </h3>
                  <div dir="rtl" className="text-xs font-urdu text-amber-300/80 mb-3">
                    {pillar.urdu}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Creative Discipline</span>
                  <span className="text-amber-400/80 font-mono">0{pillars.indexOf(pillar) + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
