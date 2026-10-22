import React, { useState, useEffect } from 'react';

const messages = [
  "FREE WORLDWIDE SHIPPING ON ORDERS OVER $150",
  "NEW DROP LIVE: THE DARK ESSENTIALS CAPSULE",
  "USE CODE 'FIRST10' FOR 10% OFF YOUR FIRST ORDER"
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brandSoftBlack text-brandWarmIvory text-[11px] font-semibold tracking-widest py-2 px-4 text-center border-b border-brandCharcoal/40 transition-all duration-500">
      <p className="uppercase">{messages[current]}</p>
    </div>
  );
}