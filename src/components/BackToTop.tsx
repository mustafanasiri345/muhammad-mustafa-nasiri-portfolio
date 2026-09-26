import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-slate-900/90 text-amber-300 border border-amber-400/40 shadow-xl backdrop-blur-md hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      aria-label="Scroll back to top"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
