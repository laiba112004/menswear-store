import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandStoryBand() {
  return (
    <section className="bg-brandBlack text-white py-24 border-y border-brandCharcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brandGold font-bold">
          Our Philosophy
        </span>

        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif leading-tight">
          "Details that define.<br />Quality that lasts."
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto uppercase tracking-wider font-normal leading-relaxed">
          We reject fast, disposable fashion. Every garment is constructed with premium pre-shrunk heavyweight cotton, reinforced stitching, and a clean modern fit built for everyday life.
        </p>

        <div className="pt-4">
          <Link
            to="/about"
            className="inline-block px-8 py-3.5 border border-neutral-400 text-white hover:bg-white hover:text-brandBlack text-sm font-bold uppercase tracking-wider transition-all"
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}