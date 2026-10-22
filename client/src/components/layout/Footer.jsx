import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

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
    <footer className="bg-brandBlack text-brandWarmIvory border-t border-brandCharcoal/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="text-2xl font-black tracking-widest uppercase font-serif">
              ATELIER
            </span>
            <p className="text-xs text-brandGrey leading-relaxed">
              Direct-to-consumer premium streetwear and essentials. Heavyweight fabrics engineered for durability and silhouette.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-xs text-brandGrey">
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=Hoodies" className="hover:text-white transition-colors">Heavyweight Hoodies</Link></li>
              <li><Link to="/shop?category=T-Shirts" className="hover:text-white transition-colors">Boxy Tees</Link></li>
              <li><Link to="/shop?category=Pants" className="hover:text-white transition-colors">Tactical Pants</Link></li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Client Care</h4>
            <ul className="space-y-2 text-xs text-brandGrey">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Worldwide Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">14-Day Returns</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
             <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
    <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Sale</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">Join The Inner Circle</h4>
            <p className="text-xs text-brandGrey mb-4">Get 10% off your first order plus priority access to capsule drops.</p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-brandGold border border-brandGold/30 p-2.5 bg-brandSoftBlack">
                <Check size={16} />
                <span>Code <b>FIRST10</b> sent to your email.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="bg-brandSoftBlack text-white text-xs px-3 py-2.5 border border-brandCharcoal focus:outline-none focus:border-white w-full"
                />
                <button
                  type="submit"
                  className="bg-white text-brandBlack px-4 flex items-center justify-center hover:bg-brandWarmIvory transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brandCharcoal/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brandGrey">
          <p>© 2026 ATELIER CLOTHING. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0 uppercase tracking-widest">
            <span>Secure Checkout</span>
            <span>•</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}