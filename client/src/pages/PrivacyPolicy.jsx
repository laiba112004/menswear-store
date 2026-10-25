import React from 'react';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">Data Governance</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Privacy Policy (GDPR Compliant)
        </h1>
        <p className="text-sm uppercase tracking-wider text-neutral-600 mt-2">
          Effective Date: October 2026 // Version 1.0
        </p>
      </div>

      <div className="space-y-10 text-base text-neutral-800 leading-relaxed">
        {/* Intro Banner */}
        <div className="p-6 bg-brandWarmIvory border border-neutral-200 flex items-start gap-4">
          <ShieldCheck size={26} className="text-brandBlack flex-shrink-0 mt-0.5" />
          <p className="text-neutral-800">
            ATELIER is committed to protecting your personal data in full compliance with the General Data Protection Regulation (GDPR) and global privacy standards. We process customer information strictly to fulfill orders, prevent fraud, and optimize drop experiences.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-700">
            <li><b>Identity & Contact Data:</b> Full recipient name, shipping address, billing address, email address, and contact telephone number collected during checkout.</li>
            <li><b>Transaction Data:</b> Financial tokens, purchased piece identifiers, size/color variant selections, and total amounts (payment card information is securely tokenized through PCI-compliant gateways; raw card data never touches our servers).</li>
            <li><b>Technical & Device Metrics:</b> Anonymized IP addresses, browser specifications, and cookie sessions collected under explicit consent.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            2. Purpose & Legal Basis for Processing
          </h2>
          <p className="text-neutral-700">
            We process your personal information exclusively to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-700">
            <li>Execute, assemble, package, and dispatch orders to your designated shipping destination.</li>
            <li>Issue automated transactional dispatches, tracking credentials, and customer support resolutions.</li>
            <li>Comply with international accounting, tax, and export regulations.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            3. Third-Party Sub-Processors
          </h2>
          <p className="text-neutral-700">
            Your information is shared only with verified global service providers strictly required to complete fulfillment:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-700">
            <li><b>Payment Processors:</b> Stripe / PayPal (secure gateway transmission).</li>
            <li><b>Courier & Logistics:</b> International carriers for air-freight and last-mile tracking updates.</li>
            <li><b>Cloud Infrastructure:</b> Encrypted MongoDB Atlas cloud instances adhering to ISO/IEC 27001 data security.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-brandBlack font-serif">
            4. Your GDPR Data Rights
          </h2>
          <p className="text-neutral-700">
            Under European data protection laws, visitors maintain the absolute right to access, rectify, restrict, or request permanent erasure of their stored personal data. To exercise data rights or request account deletion, reach out to <b>privacy@atelierclothing.com</b>.
          </p>
        </section>
      </div>
    </div>
  );
}