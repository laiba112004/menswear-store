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
        <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">Client Relations</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Get In Touch
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Support Information */}
        <div className="space-y-6 text-base text-neutral-800">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            Atelier Support Desk
          </h2>
          <p className="leading-relaxed text-neutral-700">
            For inquiry regarding capsule drops, order tracking, bespoke sizing questions, or press requests, our team responds within 24 business hours.
          </p>

          <div className="space-y-4 pt-4 border-t border-neutral-200 text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brandBlack flex-shrink-0" />
              <span className="font-medium text-brandBlack">concierge@atelierclothing.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-brandBlack flex-shrink-0" />
              <span>Monday – Friday: 09:00 – 18:00 GMT</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-brandBlack flex-shrink-0" />
              <span>London / Milan / Tokyo fulfillment nodes</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-brandWarmIvory p-6 sm:p-8 border border-neutral-200">
          {submitted ? (
            <div className="py-12 text-center space-y-3 text-brandBlack">
              <Check size={32} className="mx-auto text-brandGold" />
              <h3 className="text-base font-bold uppercase tracking-wider">Inquiry Received</h3>
              <p className="text-sm text-neutral-600">Our team will reach out via email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-brandBlack block mb-1.5">Your Name</label>
                <input required type="text" className="w-full bg-white border border-neutral-300 p-3 text-sm sm:text-base focus:outline-none focus:border-brandBlack" />
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-brandBlack block mb-1.5">Email Address</label>
                <input required type="email" className="w-full bg-white border border-neutral-300 p-3 text-sm sm:text-base focus:outline-none focus:border-brandBlack" />
              </div>
              <div>
                <label className="text-sm font-bold uppercase tracking-wider text-brandBlack block mb-1.5">Message</label>
                <textarea required rows={4} className="w-full bg-white border border-neutral-300 p-3 text-sm sm:text-base focus:outline-none focus:border-brandBlack leading-relaxed" />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-all shadow-md"
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