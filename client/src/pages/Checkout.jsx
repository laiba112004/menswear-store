import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems, totalAmount, setCartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: '+1 555-0199'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderPayload = {
        guestEmail: formData.email,
        orderItems: cartItems.map(item => ({
          product: item._id,
          title: item.title,
          qty: item.qty,
          price: item.price,
          image: item.image,
          size: item.size,
          color: item.color
        })),
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone
        },
        totalPrice: totalAmount
      };

      const res = await API.post('/orders', orderPayload);
      setCompletedOrder(res.data);
      // Empty the cart
      localStorage.removeItem('cart');
      if (setCartItems) setCartItems([]);
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Failed to submit order. Please verify connection.");
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
        <span className="text-[10px] uppercase tracking-[0.3em] text-brandGold font-bold">Dispatch Confirmed</span>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack">
          Thank You For Your Order.
        </h1>
        <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
          Your order has been recorded into our atelier fulfillment queue. Confirmation copy sent to <b>{formData.email}</b>.
        </p>

        <div className="bg-brandWarmIvory p-6 border border-neutral-300 max-w-md mx-auto text-left space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-brandGrey font-bold block">Your Tracking Reference Code</span>
          <p className="text-lg font-mono font-bold text-brandBlack tracking-wider select-all">{completedOrder.trackingCode}</p>
          <span className="text-[10px] text-brandGrey block">Save this code to monitor courier dispatch on the Track Order page.</span>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/track-order"
            className="px-8 py-3.5 bg-brandBlack text-white text-xs font-bold uppercase tracking-widest hover:bg-brandSoftBlack flex items-center gap-2"
          >
            Track Dispatch <ArrowRight size={14} />
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3.5 border border-brandBlack text-brandBlack text-xs font-bold uppercase tracking-widest hover:bg-neutral-100"
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
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif mb-4">No Pieces In Checkout</h2>
        <Link to="/shop" className="px-8 py-3.5 bg-brandBlack text-white font-bold text-xs uppercase tracking-widest">
          Explore Silhouettes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full">
      <div className="border-b border-neutral-200 pb-4 mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">Order Fulfillment</span>
        <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Checkout & Dispatch
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brandBlack mb-3">1. Contact Identity</h2>
            <input
              type="email"
              name="email"
              placeholder="Email address for dispatch updates"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-neutral-300 p-3 text-xs focus:outline-none focus:border-brandBlack"
            />
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-brandBlack mb-3">2. Shipping Address</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Recipient Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-neutral-300 p-3 text-xs focus:outline-none focus:border-brandBlack"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address, Suite / Apartment"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-neutral-300 p-3 text-xs focus:outline-none focus:border-brandBlack"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3 text-xs focus:outline-none focus:border-brandBlack"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 p-3 text-xs focus:outline-none focus:border-brandBlack"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck size={16} className="text-brandBlack" />
            <span>End-to-end 256-bit encrypted checkout transmission.</span>
          </div>
        </div>

        {/* Order review */}
        <div className="lg:col-span-5 bg-neutral-50 p-6 border border-neutral-200 h-fit space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brandBlack border-b border-neutral-200 pb-3">
            Manifest Summary
          </h3>
          <div className="divide-y divide-neutral-200 max-h-64 overflow-y-auto">
            {cartItems.map((item, i) => (
              <div key={i} className="py-3 flex justify-between text-xs items-center">
                <div>
                  <h4 className="font-bold uppercase text-brandBlack">{item.title}</h4>
                  <p className="text-[10px] text-brandGrey uppercase">{item.size} / {item.color} × {item.qty}</p>
                </div>
                <span className="font-black text-brandBlack">${item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-1 text-xs">
            <div className="flex justify-between text-brandGrey uppercase">
              <span>Subtotal</span>
              <span className="font-bold text-brandBlack">${totalAmount}</span>
            </div>
            <div className="flex justify-between text-brandGrey uppercase">
              <span>Courier Dispatch</span>
              <span className="font-bold text-brandBlack">{totalAmount >= 150 ? 'FREE' : '$15'}</span>
            </div>
            <div className="border-t border-neutral-300 pt-3 flex justify-between text-base font-black uppercase text-brandBlack">
              <span>Total Payable</span>
              <span>${totalAmount >= 150 ? totalAmount : totalAmount + 15}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brandBlack text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-brandSoftBlack transition-all shadow-xl disabled:bg-neutral-400 mt-4"
          >
            {loading ? "Registering Order..." : "Confirm & Authorize Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}