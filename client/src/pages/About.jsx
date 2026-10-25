import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import Reveal from '../components/common/Reveal';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brandGold font-bold">
          Our Story & Atelier Ethos
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-serif text-brandBlack">
          Substance In Every Stitch.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Counteracting fast-fashion cycles with 450 GSM heavyweight organic cottons and precision architectural silhouettes.
        </p>
      </div>

      {/* Main Studio Image (Studio Craft) */}
      <Reveal>
        <div className="aspect-[16/9] w-full overflow-hidden bg-brandBlack mb-16 shadow-2xl relative group">
          <img
            src="/images/craft/studio-workshop.jpg"
            alt="Atelier Cutting Table & Pattern Workshop"
            className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.08] group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-brandBlack/85 backdrop-blur-sm text-white px-4 py-2 text-xs uppercase tracking-wider font-bold">
            The Atelier Workshop // London Studio
          </div>
        </div>
      </Reveal>

      {/* Two-Column Story Narrative */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-base text-neutral-800 leading-relaxed mb-20 border-b border-neutral-200 pb-16">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-brandGold font-bold">Philosophy</span>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-brandBlack font-serif">
              Substance Over Hype
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              ATELIER was established to challenge disposable streetwear culture. Instead of flimsy blends that disintegrate after three washes, we build foundational garments using custom 280 to 450 GSM heavyweight French Terry and combed organic cotton.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Every piece undergoes rigorous pre-shrinking and enzyme wash treatments to lock in proportion, hand-feel, and pitch-black color depth across years of continuous wear.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-brandGold font-bold">Construction</span>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-brandBlack font-serif">
              Architectural Proportions
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Rather than mass-producing disposable clothing, we release curated small-batch drops. Every piece focuses on dropped shoulders, structured boxy cuts, and seamless draps that elevate casual styling into luxury statements.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Engineered with reinforced flatlock bar-tack stitching, heavy rib collars that never buckle, and custom hardware.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Studio Process & Gallery Grid */}
      <Reveal>
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">Craft In Motion</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase font-serif text-brandBlack mt-1">
              From Pattern To Garment
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] bg-brandBlack overflow-hidden group">
              <img
                src="/images/craft/manifesto-1.jpg"
                alt="Craft Manifesto Detail"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brandGold font-bold block mb-1">Material Integrity</span>
                  <p className="text-white font-bold text-sm uppercase">450 GSM Custom-Milled Heavy French Terry</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] bg-brandBlack overflow-hidden group">
              <img
                src="/images/craft/manifesto-2.jpg"
                alt="Studio Cutting Process"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brandGold font-bold block mb-1">Tailored Silhouette</span>
                  <p className="text-white font-bold text-sm uppercase">Boxy Streetwear Proportions with Zero Droop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Call to Action Bar */}
      <Reveal>
        <div className="bg-brandWarmIvory p-8 sm:p-12 border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase font-serif text-brandBlack">
              Explore The Current Collection
            </h3>
            <p className="text-sm text-neutral-600 mt-1">
              Discover heavy fleece hoodies, boxy combed tees, and relaxed tactical utility trousers.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <Link
              to="/lookbook"
              className="px-6 py-3.5 border border-brandBlack text-brandBlack text-xs font-bold uppercase tracking-wider hover:bg-white transition-all text-center flex-1 sm:flex-none"
            >
              View Lookbook
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3.5 bg-brandBlack text-white text-xs font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none shadow-md"
            >
              <span>Shop Apparel</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}