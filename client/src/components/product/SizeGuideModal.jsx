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

        <h3 className="text-lg font-black uppercase tracking-widest font-serif text-brandBlack mb-1">
          Size & Measurement Guide
        </h3>
        <p className="text-xs text-brandGrey mb-4">
          All measurements are in inches. True to oversized streetwear boxy fit.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-neutral-200">
            <thead className="bg-neutral-100 uppercase font-bold text-neutral-700">
              <tr>
                <th className="p-2.5 border-b border-neutral-200">Size</th>
                <th className="p-2.5 border-b border-neutral-200">Chest</th>
                <th className="p-2.5 border-b border-neutral-200">Length</th>
                <th className="p-2.5 border-b border-neutral-200">Shoulder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-600">
              <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">42</td><td className="p-2.5">28</td><td className="p-2.5">20.5</td></tr>
              <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">44</td><td className="p-2.5">29</td><td className="p-2.5">21.5</td></tr>
              <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">46</td><td className="p-2.5">30</td><td className="p-2.5">22.5</td></tr>
              <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">48</td><td className="p-2.5">31</td><td className="p-2.5">23.5</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}