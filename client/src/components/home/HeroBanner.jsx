import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[880px] w-full bg-brandBlack overflow-hidden flex items-center justify-center">
      
      {/* 1. SEPARATE BACKGROUND IMAGE & OVERLAY LAYER */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&auto=format&fit=crop&q=85"
          alt="Editorial Men's Streetwear Collection"
          className="w-full h-full object-cover object-top filter brightness-[0.70] contrast-[1.12]"
        />
        {/* Cinematic dark gradients for luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/40 to-brandBlack/75" />
        <div className="absolute inset-0 bg-brandBlack/25" />
      </div>

      {/* 2. SEPARATE CONTENT & TEXT LAYER */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Capsule Drop Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/20 bg-brandBlack/70 backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brandRed animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white font-medium">
            Limited Capsule Drop // 01
          </span>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tight font-serif leading-[0.95] drop-shadow-2xl">
          ATELIER
        </h1>

        {/* Editorial Sub-copy */}
        <p className="mt-6 text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto uppercase tracking-[0.25em] font-light leading-relaxed">
          Heavyweight silhouettes. Considered proportions. Engineered from 280–450 GSM Japanese loopback cotton.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/shop?category=Hoodies"
            className="group w-full sm:w-auto min-w-[200px] px-8 py-4 bg-white text-brandBlack font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brandWarmIvory transition-all duration-300 shadow-2xl"
          >
            <span>Explore Hoodies</span>
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            to="/shop?category=T-Shirts"
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 border border-white/80 text-white font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:bg-white hover:text-brandBlack transition-all duration-300 backdrop-blur-sm"
          >
            Shop Boxy Tees
          </Link>
        </div>

        {/* Bottom Feature Specs */}
        <div className="mt-14 hidden sm:flex items-center gap-8 text-[10px] uppercase tracking-[0.25em] text-neutral-400 border-t border-white/10 pt-6">
          <div><span className="text-white font-bold">280–450</span> GSM Cottons</div>
          <span>•</span>
          <div><span className="text-white font-bold">Global</span> Express Dispatch</div>
          <span>•</span>
          <div><span className="text-white font-bold">14-Day</span> Returns</div>
        </div>

      </div>
    </section>
  );
}