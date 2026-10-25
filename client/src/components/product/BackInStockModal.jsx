import React, { useState } from 'react';
import { X, Bell, CheckCircle2 } from 'lucide-react';

export default function BackInStockModal({ isOpen, onClose, product, selectedSize, selectedColor }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-brandWarmIvory max-w-md w-full border border-neutral-300 p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-brandGold mb-2">
          <Bell size={18} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Drop Alert Notification</span>
        </div>

        <h3 className="text-xl font-black uppercase font-serif text-brandBlack tracking-tight">
          Notify When Available
        </h3>

        <div className="mt-2 text-xs text-neutral-600 border-b border-neutral-200 pb-3">
          <p className="font-semibold text-brandBlack">{product?.title}</p>
          <p className="text-[11px] text-neutral-500 uppercase tracking-wider mt-0.5">
            Variant: {selectedColor || 'Default'} // Size: {selectedSize || 'Standard'}
          </p>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 size={36} className="text-brandBlack mx-auto animate-bounce" />
            <p className="text-xs font-bold uppercase tracking-widest text-brandBlack">
              You are on the drop priority list
            </p>
            <p className="text-[11px] text-neutral-600">
              An encrypted dispatch signal will be transmitted to <span className="font-mono text-brandBlack">{email}</span> the instant this silhouette restocks.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              This silhouette is currently exhausted. Provide your email to receive an instant restock alert prior to public launch.
            </p>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-brandBlack mb-1">
                Client Dispatch Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@atelier.com"
                className="w-full p-3 bg-white border border-neutral-300 text-xs focus:outline-none focus:border-brandBlack"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brandBlack text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-brandSoftBlack transition-all"
            >
              Request Drop Notification
            </button>
          </form>
        )}
      </div>
    </div>
  );
}