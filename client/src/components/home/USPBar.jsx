import React from 'react';
import { Globe, ShieldCheck, RefreshCw, Award } from 'lucide-react';

const usps = [
  { icon: Globe, title: "Worldwide Shipping", desc: "Tracked express dispatch" },
  { icon: Award, title: "Premium Heavyweight", desc: "Crafted from 280-450 GSM cotton" },
  { icon: RefreshCw, title: "14-Day Easy Returns", desc: "Hassle-free exchanges" },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted & fraud protected" }
];

export default function USPBar() {
  return (
    <div className="bg-brandWarmIvory border-y border-neutral-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {usps.map((usp, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-3">
              <usp.icon className="w-5 h-5 text-brandBlack flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-brandBlack">{usp.title}</h4>
                <p className="text-[11px] text-brandGrey">{usp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}