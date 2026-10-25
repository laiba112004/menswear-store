import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export default function ShippingReturns() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">Service Terms</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Shipping & Returns
        </h1>
      </div>

      <div className="space-y-10 text-base text-neutral-800 leading-relaxed">
        {/* Shipping details */}
        <div className="border border-neutral-200 p-6 sm:p-8 bg-brandWarmIvory">
          <div className="flex items-center gap-3 mb-4 text-brandBlack">
            <Truck size={22} />
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider font-serif">Worldwide Delivery Protocol</h2>
          </div>
          <ul className="space-y-3 list-disc list-inside text-neutral-700">
            <li><b>Free Express Shipping:</b> Automatically unlocked for all orders exceeding $150 USD.</li>
            <li><b>Standard Dispatch SLA:</b> Orders processed and packaged within 24–48 hours from our central warehouse.</li>
            <li><b>Transit Times:</b> Tier 1 zones (US, UK, CA, EU) receive shipments in 3–5 business days. Worldwide transit spans 5–8 days.</li>
            <li><b>Tracking:</b> Full end-to-end tracking notifications dispatched via email immediately upon courier scan.</li>
          </ul>
        </div>

        {/* Returns details */}
        <div className="border border-neutral-200 p-6 sm:p-8 bg-white">
          <div className="flex items-center gap-3 mb-4 text-brandBlack">
            <RotateCcw size={22} />
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider font-serif">14-Day Return Window</h2>
          </div>
          <ul className="space-y-3 list-disc list-inside text-neutral-700">
            <li>Items are eligible for refund or size exchange within 14 calendar days of confirmed delivery.</li>
            <li>Pieces must be unwashed, completely unworn, with all garment tags attached in original polybag packaging.</li>
            <li>Return shipping labels are generated automatically through our client support portal.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}