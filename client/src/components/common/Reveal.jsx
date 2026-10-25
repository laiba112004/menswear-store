import React, { useEffect, useRef, useState } from 'react';

/**
 * Editorial Smooth Reveal on Scroll
 * Enhances content sections with subtle, high-end fade-up transitions.
 */
export default function Reveal({ children, className = '', delay = 0 }) {
  const [revealed, setRevealed] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`reveal-on-scroll ${revealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
