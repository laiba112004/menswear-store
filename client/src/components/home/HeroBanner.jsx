import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';

const campaignSlides = [
  {
    id: 1,
    tag: 'Autumn Drop // 450 GSM',
    title: 'Heavyweight Fleece',
    subtitle: 'Custom-milled 450 GSM French Terry hoodies and relaxed cargo pants engineered for effortless drape.',
    image: '/images/hero/hero-slide-1.jpg',
    primaryCta: 'Shop Hoodies',
    primaryLink: '/shop/hoodies',
    secondaryCta: 'View Lookbook',
    secondaryLink: '/lookbook',
    featuredProduct: {
      title: 'Forest Green 450 GSM Hoodie',
      price: '$98.00',
      tag: 'Signature Piece',
    },
  },
  {
    id: 2,
    tag: 'Core Drop // 280 GSM',
    title: 'Boxy Essentials',
    subtitle: 'Drop-shoulder combed organic cotton tees and washed twill dad caps crafted for modern streetwear.',
    image: '/images/hero/hero-slide-2.jpg',
    primaryCta: 'Shop Boxy Tees',
    primaryLink: '/shop/t-shirts',
    secondaryCta: 'Shop Caps & Hats',
    secondaryLink: '/shop/hats',
    featuredProduct: {
      title: 'Royal Cobalt Blue Boxy Tee',
      price: '$48.00',
      tag: 'Core Essential',
    },
  },
  {
    id: 3,
    tag: 'Limited Capsule // Raw Cut',
    title: 'Vintage Washed',
    subtitle: 'Enzyme-washed fleece pullovers paired with 450 GSM deep burgundy raw-hem sweat shorts.',
    image: '/images/hero/hero-slide-3.jpg',
    primaryCta: 'Shop Shorts & Pants',
    primaryLink: '/shop/shorts',
    secondaryCta: 'Explore Collection',
    secondaryLink: '/shop',
    featuredProduct: {
      title: 'Washed Black Hoodie & Shorts',
      price: '$95.00',
      tag: 'Trending Set',
    },
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance campaign slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaignSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = campaignSlides[currentSlide];

  return (
    <section className="relative h-[88vh] min-h-[640px] max-h-[920px] w-full bg-brandBlack overflow-hidden flex items-center justify-center">
      
      {/* 1. EDITORIAL BACKGROUND IMAGE CAROUSEL WITH SMOOTH FADE */}
      {campaignSlides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none select-none ${
            idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] saturate-[1.05] scale-105 transition-transform duration-[8000ms] ease-out"
            style={{
              transform: idx === currentSlide ? 'scale(1.04)' : 'scale(1.0)',
            }}
          />
          {/* Subtle multi-stop gradient for ultra-luxury typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/95 via-brandBlack/35 to-brandBlack/45" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-brandBlack/20 to-brandBlack/70" />
        </div>
      ))}

      {/* 2. SUBTLE MONOGRAM WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.035]">
        <span className="text-[26vw] font-black font-serif tracking-tighter text-white">
          ATELIER
        </span>
      </div>

      {/* 3. HERO CONTENT CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Seasonal Edition Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-brandGold/40 bg-brandBlack/75 backdrop-blur-md mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-brandGold animate-pulse" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brandGold font-bold">
            {slide.tag}
          </span>
        </div>

        {/* Brand Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight font-serif leading-[1.05] drop-shadow-2xl max-w-3xl mx-auto">
          {slide.title}
        </h1>

        {/* Editorial Sub-copy */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-neutral-200 max-w-lg mx-auto uppercase tracking-wider font-normal leading-relaxed">
          {slide.subtitle}
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to={slide.primaryLink}
            className="group w-full sm:w-auto min-w-[210px] px-8 py-4 bg-white text-brandBlack font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brandWarmIvory transition-all duration-300 shadow-2xl hover:scale-[1.02]"
          >
            <span>{slide.primaryCta}</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            to={slide.secondaryLink}
            className="w-full sm:w-auto min-w-[210px] px-8 py-4 border border-white/60 bg-brandBlack/50 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white hover:text-brandBlack transition-all duration-300 backdrop-blur-md hover:scale-[1.02]"
          >
            <Compass size={16} className="text-brandGold" />
            <span>{slide.secondaryCta}</span>
          </Link>
        </div>

        {/* Bottom Feature Specs */}
        <div className="mt-12 hidden sm:flex items-center gap-8 text-xs sm:text-sm uppercase tracking-wider text-neutral-300 border-t border-white/10 pt-5">
          <div><span className="text-white font-bold">450 GSM</span> Heavy Fleece</div>
          <span>•</span>
          <div><span className="text-white font-bold">Relaxed Boxy</span> Fit</div>
          <span>•</span>
          <div><span className="text-white font-bold">Worldwide</span> Express Shipping</div>
        </div>

      </div>

      {/* 4. FLOATING LUXURY PRODUCT SPOTLIGHT PILL (Bottom Right) */}
      <div className="hidden lg:flex absolute bottom-8 right-8 z-20 items-center gap-3.5 bg-brandBlack/85 border border-white/15 backdrop-blur-md p-3 pr-5 text-left shadow-2xl">
        <div className="w-10 h-12 bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0">
          <img
            src={slide.image}
            alt={slide.featuredProduct.title}
            className="w-full h-full object-cover filter contrast-110"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider text-brandGold font-bold block">
            {slide.featuredProduct.tag}
          </span>
          <span className="text-white font-bold uppercase tracking-wider block text-sm">
            {slide.featuredProduct.title}
          </span>
          <span className="text-neutral-300 font-mono text-sm font-semibold">
            {slide.featuredProduct.price}
          </span>
        </div>
        <Link
          to={slide.primaryLink}
          className="ml-2 text-white hover:text-brandGold transition-colors"
          title="Explore Piece"
        >
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* 5. SLIDE ARROWS & STEPPER (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? campaignSlides.length - 1 : prev - 1))}
          className="w-9 h-9 border border-white/20 bg-brandBlack/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
          aria-label="Previous Campaign Slide"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-mono font-bold text-white tracking-wider px-1">
          0{currentSlide + 1} / 0{campaignSlides.length}
        </span>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % campaignSlides.length)}
          className="w-9 h-9 border border-white/20 bg-brandBlack/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
          aria-label="Next Campaign Slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

    </section>
  );
}