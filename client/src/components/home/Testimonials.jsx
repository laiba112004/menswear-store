import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const stats = [
  { value: '14,000+', label: 'Worldwide Orders' },
  { value: '4.9 / 5', label: 'Average Client Rating' },
  { value: '38', label: 'Countries Delivered' },
  { value: '450 GSM', label: 'Custom Fleece Standard' }
];

const reviews = [
  {
    quote: "The weight and collar ribbing on the boxy tee are unlike anything at this price point. Clean, structured drape.",
    author: "Marcus V.",
    location: "London, UK",
    product: "Heavyweight Boxy Tee"
  },
  {
    quote: "True double-layered hood with no loose drawstrings. The silhouette sits perfectly over raw denim or cargos.",
    author: "Julian K.",
    location: "Berlin, DE",
    product: "French Terry Hoodie"
  },
  {
    quote: "Dispatched to North America in 3 days. Heavy hardware on the cargos and flawless stitching. Will be back for Drop 02.",
    author: "David R.",
    location: "Toronto, CA",
    product: "Tactical Utility Pants"
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-neutral-200 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-2xl sm:text-3xl font-black font-serif text-brandBlack block">
                {s.value}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-brandGrey font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto my-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">
            Verified Feedback
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
            Client Impressions
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-brandWarmIvory p-8 border border-neutral-200 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-brandGold mb-4">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} size={14} fill="#C9A227" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-xs text-brandCharcoal leading-relaxed font-serif italic mb-6">
                  "{r.quote}"
                </p>
              </div>

              <div className="border-t border-neutral-300/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brandBlack">{r.author}</h4>
                  <span className="text-[10px] text-brandGrey uppercase tracking-widest">{r.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-neutral-600 font-medium">
                  <ShieldCheck size={13} className="text-brandBlack" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}