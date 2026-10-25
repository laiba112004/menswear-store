import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShieldCheck, RefreshCw, Award } from 'lucide-react';

const usps = [
  { 
    icon: Globe, 
    title: "Worldwide Shipping", 
    desc: "Tracked express dispatch", 
    link: "/shipping" 
  },
  { 
    icon: Award, 
    title: "Premium Heavyweight", 
    desc: "Crafted from 280-450 GSM cotton", 
    link: "/about" 
  },
  { 
    icon: RefreshCw, 
    title: "14-Day Easy Returns", 
    desc: "Hassle-free exchanges", 
    link: "/returns" 
  },
  { 
    icon: ShieldCheck, 
    title: "Secure Checkout", 
    desc: "Encrypted & fraud protected", 
    link: "/terms" 
  }
];

export default function USPBar() {
  return (
    <div className="bg-brandWarmIvory border-y border-neutral-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {usps.map((usp, idx) => (
            <Link
              key={idx}
              to={usp.link}
              className="group flex flex-col md:flex-row items-center gap-3 p-2 hover:bg-neutral-100/60 transition-colors"
            >
              <usp.icon className="w-6 h-6 text-brandBlack group-hover:text-brandRed transition-colors flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-brandBlack group-hover:text-brandRed transition-colors">
                  {usp.title}
                </h4>
                <p className="text-sm text-neutral-600">{usp.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}