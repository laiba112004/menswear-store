import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">Legal Agreement</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Terms & Conditions of Sale
        </h1>
        <p className="text-sm uppercase tracking-wider text-neutral-600 mt-2">
          Governing Direct-to-Consumer Purchases // 2026
        </p>
      </div>

      <div className="space-y-10 text-base text-neutral-800 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            1. Agreement Overview
          </h2>
          <p className="text-neutral-700">
            These Terms and Conditions govern the purchase of all garments and limited capsule drops offered through the ATELIER storefront. By completing an order checkout, you acknowledge full compliance with these commercial sale terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            2. Limited Drops & Inventory Availability
          </h2>
          <p className="text-neutral-700">
            Due to our numbered capsule model, garment inventory is strictly allocated upon confirmed order processing. In the rare event an item is oversold due to simultaneous checkout collisions, we will issue an immediate refund and notify the customer within 24 hours.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            3. Pricing & Currency
          </h2>
          <p className="text-neutral-700">
            All listed prices are displayed in USD unless localized by regional checkout integrations. We reserve the right to correct pricing typographical errors prior to fulfillment dispatch.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            4. 14-Day Return Condition Standards
          </h2>
          <p className="text-neutral-700">
            Customers retain the right to request a size exchange or return within 14 calendar days of delivery. Returned pieces must remain completely unworn, unwashed, odor-free, and in their original branded packaging with all garment security tags unbroken.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            5. Governing Law
          </h2>
          <p className="text-neutral-700">
            These conditions of sale are governed and construed in accordance with international commercial trade laws and applicable consumer protection statutes.
          </p>
        </section>
      </div>
    </div>
  );
}