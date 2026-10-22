import React, { useState } from 'react';
import API from '../api/axios';
import { Package, Truck, CheckCircle, Search, AlertCircle } from 'lucide-react';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await API.get(`/orders/track/${orderId.trim()}`);
      setOrderData(res.data);
    } catch (err) {
      console.error(err);
      setError('No dispatch found matching this tracking reference.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">Real-Time Dispatch</span>
        <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Track Your Order
        </h1>
        <p className="text-xs uppercase tracking-widest text-brandGrey mt-2">
          Enter your order reference identifier below (e.g., from checkout confirmation).
        </p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 mb-10">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="E.G. ATL-5832-2026"
          required
          className="flex-1 border border-neutral-300 p-3 text-xs uppercase tracking-wider focus:outline-none focus:border-brandBlack font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 bg-brandBlack text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-brandSoftBlack disabled:bg-neutral-400"
        >
          <Search size={14} /> {loading ? 'Searching...' : 'Lookup'}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-brandRed/30 text-brandRed flex items-center gap-2 text-xs uppercase tracking-wider mb-6">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Live Order Result */}
      {orderData && (
        <div className="bg-brandWarmIvory p-8 border border-neutral-200 space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-300/60 pb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-brandGrey font-semibold">Reference Code</span>
              <h3 className="text-sm font-bold font-mono uppercase text-brandBlack">
                {orderData.paymentResult?.id || orderData._id}
              </h3>
            </div>
            <div>
              <span className="bg-brandBlack text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 inline-block">
                Status: {orderData.orderStatus}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-brandBlack text-white mx-auto flex items-center justify-center">
                <CheckCircle size={16} />
              </div>
              <p className="text-[11px] font-bold uppercase text-brandBlack">Order Placed</p>
              <span className="text-[9px] text-brandGrey">Confirmed</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-brandBlack text-white mx-auto flex items-center justify-center">
                <Package size={16} />
              </div>
              <p className="text-[11px] font-bold uppercase text-brandBlack">Processing</p>
              <span className="text-[9px] text-brandGrey">SLA Active</span>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-brandRed text-white mx-auto flex items-center justify-center animate-pulse">
                <Truck size={16} />
              </div>
              <p className="text-[11px] font-bold uppercase text-brandRed">Transit</p>
              <span className="text-[9px] text-brandGrey">Global Courier</span>
            </div>
          </div>

          {/* Summary of Items */}
          <div className="border-t border-neutral-300/60 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-brandGrey font-bold block mb-2">Package Items</span>
            <div className="divide-y divide-neutral-200 text-xs">
              {orderData.orderItems?.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between">
                  <span>{item.title} ({item.size} / {item.color}) × {item.qty}</span>
                  <span className="font-bold">${item.price * item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}