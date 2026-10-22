import React, { useState } from 'react';
import { Mail, Clock, MapPin, Check } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">Client Relations</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Get In Touch
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Support Information */}
        <div className="space-y-6 text-xs text-neutral-600">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brandBlack font-serif">
            Atelier Support Desk
          </h2>
          <p className="leading-relaxed">
            For inquiry regarding capsule drops, order tracking, bespoke sizing questions, or press requests, our team responds within 24 business hours[cite: 5, 11].
          </p>

          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-brandBlack" />
              <span>concierge@atelierclothing.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-brandBlack" />
              <span>Monday – Friday: 09:00 – 18:00 GMT</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-brandBlack" />
              <span>London / Milan / Tokyo fulfillment nodes</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-brandWarmIvory p-6 sm:p-8 border border-neutral-200">
          {submitted ? (
            <div className="py-12 text-center space-y-3 text-brandBlack">
              <Check size={28} className="mx-auto text-brandGold" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Inquiry Received</h3>
              <p className="text-[11px] text-brandGrey">Our team will reach out via email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-brandBlack block mb-1">Your Name</label>
                <input required type="text" className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-brandBlack" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-brandBlack block mb-1">Email Address</label>
                <input required type="email" className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-brandBlack" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-brandBlack block mb-1">Message</label>
                <textarea required rows={4} className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-brandBlack" />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-brandBlack text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-brandSoftBlack transition-all"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}