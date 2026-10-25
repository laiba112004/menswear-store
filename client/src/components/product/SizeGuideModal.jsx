import React from 'react';
import { X } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white max-w-lg w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brandGrey hover:text-brandBlack"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-black uppercase tracking-tight font-serif text-brandBlack mb-1">
          Size & Measurement Guide
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          All measurements are in inches. True to oversized streetwear boxy fit.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-neutral-200">
            <thead className="bg-neutral-100 uppercase font-bold text-neutral-700">
              <tr>
                <th className="p-3 border-b border-neutral-200">Size</th>
                <th className="p-3 border-b border-neutral-200">Chest</th>
                <th className="p-3 border-b border-neutral-200">Length</th>
                <th className="p-3 border-b border-neutral-200">Shoulder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              <tr><td className="p-3 font-bold text-brandBlack">S</td><td className="p-3">42</td><td className="p-3">28</td><td className="p-3">20.5</td></tr>
              <tr><td className="p-3 font-bold text-brandBlack">M</td><td className="p-3">44</td><td className="p-3">29</td><td className="p-3">21.5</td></tr>
              <tr><td className="p-3 font-bold text-brandBlack">L</td><td className="p-3">46</td><td className="p-3">30</td><td className="p-3">22.5</td></tr>
              <tr><td className="p-3 font-bold text-brandBlack">XL</td><td className="p-3">48</td><td className="p-3">31</td><td className="p-3">23.5</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}