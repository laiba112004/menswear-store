import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { Globe } from 'lucide-react';

const messages = [
  "FREE WORLDWIDE SHIPPING ON ORDERS OVER $150",
  "NEW DROP LIVE: THE DARK ESSENTIALS CAPSULE",
  "USE CODE 'FIRST10' FOR 10% OFF YOUR FIRST ORDER"
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const { currency, setCurrency, currencies } = useCurrency();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brandSoftBlack text-brandWarmIvory text-xs font-bold tracking-[0.2em] py-2.5 px-4 border-b border-brandCharcoal/40 transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Spacer for balance */}
        <div className="hidden md:block w-32 text-xs text-neutral-400 uppercase tracking-wider font-semibold">
          Atelier Global
        </div>

        {/* Center Rotating Message (FR-S01) */}
        <div className="flex-1 text-center truncate px-2">
          <p className="uppercase transition-opacity duration-300">
            {messages[current]}
          </p>
        </div>

        {/* Right Multi-Currency Switcher (FR-S06) */}
        <div className="flex items-center gap-1.5 justify-end">
          <Globe size={13} className="text-neutral-400 hidden sm:inline" />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-white border-0 text-xs uppercase font-bold tracking-wider focus:outline-none cursor-pointer hover:text-brandGold transition-colors"
            title="Select Regional Currency"
          >
            {Object.keys(currencies).map((code) => (
              <option key={code} value={code} className="bg-brandBlack text-white">
                {code} ({currencies[code].symbol})
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}