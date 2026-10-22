import React from 'react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.35em] text-brandGold font-bold">
          Our Architecture & Craft
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-serif text-brandBlack">
          Heavyweight Precision.
        </h1>
        <p className="text-xs uppercase tracking-widest text-brandGrey font-light">
          Founded on the principle of permanent streetwear silhouettes.
        </p>
      </div>

      <div className="aspect-[16/9] w-full overflow-hidden bg-brandBlack mb-16">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
          alt="Studio Craft"
          className="w-full h-full object-cover filter brightness-75 contrast-110"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-xs text-neutral-600 leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-brandBlack font-serif">
            Substance Over Hype
          </h2>
          <p>
            ATELIER was established to counteract ephemeral fast-fashion trends. We construct foundational garments utilizing custom 280 to 450 GSM Japanese loopback and combed organic cotton.
          </p>
          <p>
            Every piece undergoes rigorous pre-shrinking and enzyme washing to lock in proportion, hand-feel, and color permanence across years of continuous wear.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-brandBlack font-serif">
            Limited Capsule System
          </h2>
          <p>
            Rather than flooding retail channels with endless seasonal lines, we operate through numbered drops. Each capsule represents a coherent exploration of drape, tactical utility, and stark brutalist minimalism.
          </p>
          <p>
            Engineered with reinforced flatlock stitching, dropped shoulder geometry, and zero extraneous hardware.
          </p>
        </div>
      </div>
    </div>
  );
}