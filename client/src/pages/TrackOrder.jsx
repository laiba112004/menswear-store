import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import { useCurrency } from '../context/CurrencyContext';
import { Package, Truck, CheckCircle, Search, AlertCircle } from 'lucide-react';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  const [orderId, setOrderId] = useState(searchParams.get('ref') || '');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const executeTrack = async (refCode) => {
    if (!refCode) return;
    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const res = await API.get(`/orders/track/${refCode.trim()}`);
      setOrderData(res.data);
    } catch (err) {
      console.error(err);
      setError('No dispatch found matching this tracking reference.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialRef = searchParams.get('ref');
    if (initialRef) {
      setOrderId(initialRef);
      executeTrack(initialRef);
    }
  }, [searchParams]);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    executeTrack(orderId.trim());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 w-full">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">Real-Time Dispatch</span>
        <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Track Your Order
        </h1>
        <p className="text-sm text-neutral-600 mt-2">
          Enter your order reference identifier below (e.g., from checkout confirmation or your account vault).
        </p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 mb-10">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="E.G. ATL-5832-2026"
          required
          className="flex-1 border border-neutral-300 p-3.5 text-sm sm:text-base uppercase tracking-wider focus:outline-none focus:border-brandBlack font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-7 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-brandSoftBlack disabled:bg-neutral-400"
        >
          <Search size={16} /> {loading ? 'Searching...' : 'Lookup'}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-brandRed/30 text-brandRed flex items-center gap-2 text-sm uppercase tracking-wider mb-6 font-medium">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Live Order Result */}
      {orderData && (
        <div className="bg-brandWarmIvory p-8 border border-neutral-200 space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-300/60 pb-4 gap-2">
            <div>
              <span className="text-sm uppercase tracking-wider text-neutral-600 font-semibold">Reference Code</span>
              <h3 className="text-lg font-bold font-mono uppercase text-brandBlack mt-0.5">
                {orderData.paymentResult?.id || orderData._id}
              </h3>
            </div>
            <div>
              <span className="bg-brandBlack text-white text-sm font-bold uppercase tracking-wider px-4 py-2 inline-block shadow-sm">
                Status: {orderData.orderStatus}
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-brandBlack text-white mx-auto flex items-center justify-center">
                <CheckCircle size={20} />
              </div>
              <p className="text-sm font-bold uppercase text-brandBlack">Order Placed</p>
              <span className="text-xs sm:text-sm text-neutral-600 font-medium block">Confirmed</span>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-brandBlack text-white mx-auto flex items-center justify-center">
                <Package size={20} />
              </div>
              <p className="text-sm font-bold uppercase text-brandBlack">Processing</p>
              <span className="text-xs sm:text-sm text-neutral-600 font-medium block">SLA Active</span>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-brandRed text-white mx-auto flex items-center justify-center animate-pulse">
                <Truck size={20} />
              </div>
              <p className="text-sm font-bold uppercase text-brandRed">Transit</p>
              <span className="text-xs sm:text-sm text-neutral-600 font-medium block">Global Courier</span>
            </div>
          </div>

          {/* Summary of Items */}
          <div className="border-t border-neutral-300/60 pt-4">
            <span className="text-sm uppercase tracking-wider text-neutral-600 font-bold block mb-2">Package Items</span>
            <div className="divide-y divide-neutral-200 text-sm">
              {orderData.orderItems?.map((item, idx) => (
                <div key={idx} className="py-2.5 flex justify-between">
                  <span className="text-neutral-800">{item.title} ({item.size} / {item.color}) × {item.qty}</span>
                  <span className="font-bold font-mono text-brandBlack">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}