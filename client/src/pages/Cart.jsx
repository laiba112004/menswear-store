import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight, Tag } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, rawSubtotal, discountPercent, discountAmount, totalAmount, applyPromoCode, removePromoCode } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState({ text: '', isError: false });

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const res = applyPromoCode(promoInput);
    setPromoMsg({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif mb-4">Your Bag is Empty</h2>
        <p className="text-xs text-brandGrey uppercase tracking-widest mb-8">Discover our new drops and heavyweight essentials.</p>
        <Link to="/shop" className="px-8 py-3.5 bg-brandBlack text-white font-bold text-xs uppercase tracking-widest">
          Explore Apparel
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mb-8">
        Shopping Bag
      </h1>

      {/* Free Shipping Progress Indicator (FR-K05) */}
      <div className="bg-brandWarmIvory border border-neutral-200 p-4 mb-8">
        {remainingForFreeShipping === 0 ? (
          <p className="text-xs font-bold uppercase tracking-widest text-brandBlack">
            You qualify for Free Worldwide Express Shipping!
          </p>
        ) : (
          <p className="text-xs uppercase tracking-widest text-brandGrey">
            Add <span className="font-bold text-brandBlack">${remainingForFreeShipping}</span> more to unlock Free Worldwide Shipping.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 divide-y divide-neutral-200">
          {cartItems.map((item, index) => (
            <div key={index} className="py-6 flex gap-6 items-center">
              <img src={item.image} alt={item.title} className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0 border border-neutral-200" />
              <div className="flex-1">
                <h3 className="text-sm font-bold uppercase text-brandBlack">{item.title}</h3>
                <p className="text-xs text-brandGrey uppercase mt-1">Size: {item.size} | Color: {item.color}</p>
                <p className="text-xs text-brandGrey uppercase">Qty: {item.qty}</p>
                <span className="text-sm font-bold text-brandBlack mt-2 block">${item.price * item.qty}</span>
              </div>
              <button onClick={() => removeFromCart(index)} className="text-neutral-400 hover:text-brandRed p-2 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-neutral-50 p-6 border border-neutral-200 h-fit space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brandBlack border-b border-neutral-200 pb-3">
            Summary
          </h2>

          {/* Promo Code Input (FR-K04) */}
          <div className="space-y-2">
            {discountPercent > 0 ? (
              <div className="flex items-center justify-between bg-brandWarmIvory p-2.5 border border-brandGold/40 text-xs">
                <span className="font-bold text-brandBlack uppercase tracking-wider">FIRST10 (-10%)</span>
                <button onClick={removePromoCode} className="text-brandRed text-[10px] uppercase font-bold hover:underline">Remove</button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (TRY FIRST10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 border border-neutral-300 p-2 text-xs uppercase tracking-wider focus:outline-none focus:border-brandBlack"
                />
                <button type="submit" className="px-3 bg-brandBlack text-white text-xs font-bold uppercase tracking-wider hover:bg-brandSoftBlack">
                  Apply
                </button>
              </form>
            )}
            {promoMsg.text && (
              <p className={`text-[10px] font-bold uppercase tracking-wider ${promoMsg.isError ? 'text-brandRed' : 'text-green-700'}`}>
                {promoMsg.text}
              </p>
            )}
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-2 text-xs uppercase tracking-wider text-brandGrey">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-brandBlack">${rawSubtotal}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-brandRed font-bold">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{totalAmount >= 150 ? 'FREE' : 'Calculated at checkout'}</span>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex justify-between text-sm font-black uppercase text-brandBlack">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full py-3.5 bg-brandBlack text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brandSoftBlack transition-all mt-4"
          >
            Proceed To Checkout <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}