import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem('cookie_consent', choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-brandBlack text-white border border-brandCharcoal p-5 shadow-2xl pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-xs text-neutral-300 leading-relaxed font-light">
          <p>
            We use essential cookies and analytics to enhance your atelier browsing experience and measure drop conversions.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
          <button
            onClick={() => handleConsent('declined')}
            className="w-1/2 sm:w-auto px-4 py-2 border border-neutral-500 text-neutral-300 hover:text-white hover:border-white text-[10px] uppercase tracking-widest font-bold transition-all"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="w-1/2 sm:w-auto px-6 py-2 bg-white text-brandBlack hover:bg-brandWarmIvory text-[10px] uppercase tracking-widest font-bold transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}