import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { NasiriProduction } from './components/NasiriProduction';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { MediaSection } from './components/MediaSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'nasiri-production', 'services', 'portfolio', 'media', 'contact'];
    
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
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200">
      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Skills Section (11 Skills) */}
        <Skills />

        {/* 4. Nasiri Production Branded Section */}
        <NasiriProduction />

        {/* 5. Services Section (8 Services) */}
        <Services onSelectService={handleSelectService} />

        {/* 6. Filterable Portfolio Section */}
        <Portfolio />

        {/* 7. Media / Find Me Online Section */}
        <MediaSection />

        {/* 8. Contact Section with Form Validation */}
        <Contact prefilledService={selectedServiceForInquiry} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
