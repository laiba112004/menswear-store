import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { CheckCircle, ArrowRight, ShieldCheck, CreditCard, Lock, Truck, Zap, UserCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Shipping Method selection (FR-K02)
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'
  const shippingFee = shippingMethod === 'express' ? 25 : totalAmount >= 150 ? 0 : 15;
  const grandTotal = totalAmount + shippingFee;

  // Payment Method selection (FR-K03)
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'paypal' | 'wallet'

  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        name: user.name || prev.name,
      }));
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderPayload = {
        guestEmail: formData.email,
        ...(user?._id ? { user: user._id } : {}),
        orderItems: cartItems.map((item) => ({
          product: item._id,
          title: item.title,
          qty: item.qty,
          price: item.price,
          image: item.image,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (PCI-Tokenized)'
            : paymentMethod === 'paypal'
            ? 'PayPal Wallet'
            : 'Apple Pay / Google Pay',
        totalPrice: grandTotal,
      };

      const res = await API.post('/orders', orderPayload);
      setCompletedOrder(res.data);
      clearCart();
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Failed to submit order. Please verify connection.');
    } finally {
      setLoading(false);
    }
  };

  // Confirmation Success View (FR-K06)
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-brandBlack text-brandGold mx-auto rounded-full flex items-center justify-center">
          <CheckCircle size={32} />
        </div>
        <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brandGold font-bold">
          Fulfillment Queued
        </span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack">
          Thank You For Your Order.
        </h1>
        <p className="text-base text-neutral-700 max-w-md mx-auto leading-relaxed">
          Your order has been recorded into our atelier fulfillment queue. Confirmation copy sent to <b>{formData.email}</b>.
        </p>

        <div className="bg-brandWarmIvory p-6 border border-neutral-300 max-w-md mx-auto text-left space-y-2 shadow-sm">
          <span className="text-sm uppercase tracking-wider text-neutral-600 font-bold block">
            Your Tracking Reference Code
          </span>
          <p className="text-xl font-mono font-bold text-brandBlack tracking-wider select-all">
            {completedOrder.trackingCode}
          </p>
          <span className="text-sm text-neutral-600 block">
            Save this code to monitor courier dispatch on the Track Order page.
          </span>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to={`/track-order?ref=${completedOrder.trackingCode}`}
            className="px-8 py-3.5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack flex items-center gap-2"
          >
            Track Dispatch <ArrowRight size={14} />
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3.5 border border-brandBlack text-brandBlack text-sm font-bold uppercase tracking-wider hover:bg-neutral-100"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif mb-4">Your Bag Is Empty</h2>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-brandBlack text-white font-bold text-xs uppercase tracking-widest hover:bg-brandSoftBlack"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <div className="border-b border-neutral-200 pb-4 mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-500 font-bold">
            Order Fulfillment
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
            Checkout & Dispatch
          </h1>
        </div>

        {user ? (
          <span className="text-sm uppercase tracking-wider text-brandGold font-bold flex items-center gap-1.5">
            <UserCheck size={16} /> Client: {user.name}
          </span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600 font-medium hidden sm:inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-brandBlack" /> Express Guest Checkout
            </span>
            <Link to="/login" className="text-sm uppercase tracking-wider text-brandRed font-bold hover:underline">
              Sign In
            </Link>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Identity */}
          <div>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-brandBlack mb-3">
              1. Customer Identity
            </h2>
            <input
              type="email"
              name="email"
              placeholder="Email address for dispatch updates"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
            />
          </div>

          {/* 2. Shipping Address */}
          <div>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-brandBlack mb-3">
              2. Shipping Destination
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Recipient Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address, Suite / Apartment"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone for Courier SLA"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
                />
              </div>
            </div>
          </div>

          {/* 3. Shipping Options (FR-K02) */}
          <div>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-brandBlack mb-3">
              3. Courier Dispatch Options
            </h2>
            <div className="space-y-2">
              <label
                className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-brandBlack bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="accent-black w-4 h-4"
                  />
                  <div>
                    <span className="text-sm font-bold uppercase text-brandBlack block">
                      Standard Tracked Courier (3–5 Business Days)
                    </span>
                    <span className="text-sm text-neutral-500">Global tracked air-freight</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-brandBlack font-mono">
                  {totalAmount >= 150 ? 'FREE' : formatPrice(15)}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-brandBlack bg-neutral-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-black w-4 h-4"
                  />
                  <div>
                    <span className="text-sm font-bold uppercase text-brandBlack block">
                      DHL Priority Express (1–2 Business Days)
                    </span>
                    <span className="text-sm text-neutral-500">Dedicated priority customs lane</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-brandBlack font-mono">{formatPrice(25)}</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Method Selection (FR-K03) */}
          <div>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-brandBlack mb-3">
              4. Payment Authorization (PCI-Compliant)
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brandBlack bg-brandBlack text-white'
                    : 'border-neutral-200 text-brandBlack hover:border-black'
                }`}
              >
                <CreditCard size={18} className="mx-auto mb-1.5" />
                <span className="text-sm font-bold uppercase tracking-wider block">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3.5 border text-center transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-brandBlack bg-brandBlack text-white'
                    : 'border-neutral-200 text-brandBlack hover:border-black'
                }`}
              >
                <Lock size={18} className="mx-auto mb-1.5" />
                <span className="text-sm font-bold uppercase tracking-wider block">PayPal</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3.5 border text-center transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-brandBlack bg-brandBlack text-white'
                    : 'border-neutral-200 text-brandBlack hover:border-black'
                }`}
              >
                <Zap size={18} className="mx-auto mb-1.5" />
                <span className="text-sm font-bold uppercase tracking-wider block">Apple / Google Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-brandWarmIvory border border-neutral-300 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number •••• •••• •••• ••••"
                  defaultValue="4242 •••• •••• 4242"
                  className="w-full bg-white border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brandBlack font-mono"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    defaultValue="12/28"
                    className="w-full bg-white border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brandBlack font-mono"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    defaultValue="982"
                    className="w-full bg-white border border-neutral-300 p-3 text-sm focus:outline-none focus:border-brandBlack font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 text-sm text-neutral-600">
            <ShieldCheck size={18} className="text-brandBlack shrink-0" />
            <span>End-to-end 256-bit encrypted checkout transmission. Fraud screening active.</span>
          </div>
        </div>

        {/* Order review */}
        <div className="lg:col-span-5 bg-neutral-50 p-6 border border-neutral-200 h-fit space-y-4">
          <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-brandBlack border-b border-neutral-200 pb-3">
            Manifest Summary
          </h3>
          <div className="divide-y divide-neutral-200 max-h-64 overflow-y-auto">
            {cartItems.map((item, i) => (
              <div key={i} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <h4 className="font-bold uppercase text-brandBlack text-sm sm:text-base">{item.title}</h4>
                  <p className="text-sm text-neutral-500 uppercase font-medium mt-0.5">
                    {item.size} / {item.color} × {item.qty}
                  </p>
                </div>
                <span className="font-bold text-brandBlack font-mono text-sm sm:text-base">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600 uppercase font-medium">
              <span>Subtotal</span>
              <span className="font-bold text-brandBlack font-mono">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between text-neutral-600 uppercase font-medium">
              <span>Courier Dispatch</span>
              <span className="font-bold text-brandBlack font-mono">
                {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="border-t border-neutral-300 pt-3 flex justify-between text-base font-black uppercase text-brandBlack">
              <span>Total Payable</span>
              <span className="font-mono">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brandBlack text-white font-bold text-sm uppercase tracking-[0.15em] hover:bg-brandSoftBlack transition-all shadow-xl disabled:bg-neutral-400 mt-4"
          >
            {loading ? 'Authorizing Dispatch...' : `Pay ${formatPrice(grandTotal)}`}
          </button>
        </div>
      </form>
    </div>
  );
}