import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How does the sizing fit?",
    a: "Our silhouettes feature a true oversized, boxy streetwear cut with dropped shoulders. If you prefer a tailored or closer fit, we recommend sizing down one size. Detailed chest and length measurements are available on each product's Size Guide."
  },
  {
    q: "What is your worldwide shipping timeframe?",
    a: "Orders are processed within 24-48 business hours. Express dispatch delivers within 3-5 business days to North America and Europe, and 5-7 business days worldwide. Tracking codes are issued via email upon dispatch."
  },
  {
    q: "What is the return policy?",
    a: "We offer a 14-day return and exchange window from the date of delivery. Garments must remain unworn, unwashed, and in their original packaging with all security tags intact."
  },
  {
    q: "How should I care for heavyweight cotton pieces?",
    a: "Wash cold inside-out on a delicate cycle with like colors. Do not tumble dry; air dry flat in shade to preserve fabric density and prevent fiber distortion."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">Client Support</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Frequently Asked
        </h1>
      </div>

      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-brandBlack hover:text-brandRed transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brandRed' : 'text-neutral-400'}`} />
              </button>
              {isOpen && (
                <div className="pt-3 text-xs text-neutral-600 leading-relaxed font-light">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}