import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brandBlack text-brandWarmIvory border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-3xl font-black tracking-widest uppercase font-serif text-white block">
              ATELIER
            </span>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-sm">
              Premium modern menswear and streetwear essentials. Crafted from heavyweight organic cottons designed for everyday comfort, relaxed fits, and lasting quality.
            </p>
            <div className="pt-2 text-sm uppercase tracking-wider text-brandGold font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brandGold" />
              <span>Tokyo • Milan • London</span>
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-bold uppercase tracking-wider text-white mb-4 font-serif">
              Collections
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Apparel</Link></li>
              <li><Link to="/shop/hoodies" className="hover:text-white transition-colors">Heavyweight Hoodies</Link></li>
              <li><Link to="/shop/t-shirts" className="hover:text-white transition-colors">Boxy Oversized Tees</Link></li>
              <li><Link to="/shop/pants" className="hover:text-white transition-colors">Tactical Pants</Link></li>
              <li><Link to="/lookbook" className="hover:text-white transition-colors">Editorial Lookbook</Link></li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-bold uppercase tracking-wider text-white mb-4 font-serif">
              Client Concierge
            </h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><Link to="/track-order" className="hover:text-white transition-colors font-medium text-brandGold">Track Your Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Worldwide Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">14-Day Global Returns</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Governance</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold uppercase tracking-wider text-white font-serif">
              Join The Inner Circle
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Get 10% off your first capsule order plus 1-hour early access keys to limited public drops.
            </p>
            {subscribed ? (
              <div className="p-3.5 bg-brandSoftBlack border border-brandGold/60 space-y-1.5 animate-fadeIn">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brandGold">
                  <Check size={16} />
                  <span>Welcome to Atelier.</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Use code <span className="font-mono font-bold text-brandGold bg-white/10 px-1.5 py-0.5 border border-brandGold/40 select-all">FIRST10</span> for 10% off at checkout.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@atelier.com"
                  required
                  className="bg-brandSoftBlack text-white text-sm px-4 py-3 border border-neutral-700 focus:outline-none focus:border-white w-full placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="bg-white text-brandBlack px-5 flex items-center justify-center hover:bg-brandWarmIvory transition-colors flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-neutral-400 gap-4">
          <p>© 2026 ATELIER CLOTHING. All rights reserved.</p>
          <div className="flex items-center space-x-4 uppercase tracking-wider text-xs sm:text-sm text-neutral-400">
            <span>PCI-DSS Encrypted</span>
            <span>•</span>
            <span>Express Courier Dispatched</span>
            <span>•</span>
            <span>Worldwide Coverage</span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors duration-200 group pt-2 sm:pt-0"
            aria-label="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-200 text-brandGold" />
          </button>
        </div>
      </div>
    </footer>
  );
}