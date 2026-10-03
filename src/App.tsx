import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { MediaSection } from './components/MediaSection';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(undefined);

  const base = (import.meta.env.BASE_URL || '/').trim();
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const profilePhoto = `${cleanBase}assets/profile.jpg`;

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'services', 'portfolio', 'media', 'reviews', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForInquiry(serviceTitle);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200 relative">
      {/* 
        Continuous real profile photo background extending through the full Home page
        from top to bottom with a light, balanced semi-transparent dark overlay 
      */}
      <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
        <img
          src={profilePhoto}
          alt=""
          role="presentation"
          aria-hidden="true"
          className="w-full h-full object-cover object-center lg:object-[center_18%] opacity-100"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedRelative) {
              target.dataset.triedRelative = '1';
              target.src = 'assets/profile.jpg';
            }
          }}
        />
        {/* Light semi-transparent dark overlay so the real face and original photo remain clearly visible while keeping text readable */}
        <div className="absolute inset-0 bg-[#07090e]/22" />
      </div>

      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections matching the 7 nav links */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero / Home */}
        <Hero />

        {/* 2. About Me */}
        <About />

        {/* 3. My Skills (10 Skills) */}
        <Skills />

        {/* 4. My Services (9 Services) */}
        <Services onSelectService={handleSelectService} />

        {/* 5. Creative Portfolio (7 Category Cards) */}
        <Portfolio />

        {/* 6. Media & Social Media Channels */}
        <MediaSection />

        {/* 7. Reviews & Feedback (Verified Testimonials & Moderation Form) */}
        <Reviews />

        {/* 8. Contact Me */}
        <Contact prefilledService={selectedServiceForInquiry} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
