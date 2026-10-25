import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
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
      className="fixed bottom-6 right-6 z-40 p-3 bg-brandBlack text-white border border-white/20 shadow-2xl hover:bg-white hover:text-brandBlack hover:border-black transition-all duration-300 group flex items-center gap-2 animate-fadeIn"
      aria-label="Back to Top"
      title="Return to Top"
    >
      <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">
        Top
      </span>
    </button>
  );
}
