import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Trash2, ArrowRight, ArrowLeft, Plus, Minus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    rawSubtotal,
    discountPercent,
    discountAmount,
    totalAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useCart();
  const { formatPrice } = useCurrency();

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
        <p className="text-sm sm:text-base text-neutral-600 uppercase tracking-wider mb-8">
          Discover our new drops and heavyweight essentials.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-brandBlack text-white font-bold text-sm uppercase tracking-wider hover:bg-brandSoftBlack transition-all"
        >
          Explore Apparel
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-200 pb-4 mb-8 gap-4">
        <div>
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-500 font-bold">
            Order Review
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
            Shopping Bag
          </h1>
        </div>
        <Link
          to="/shop"
          className="text-sm uppercase tracking-wider text-brandGrey hover:text-black font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={15} /> Continue Shopping
        </Link>
      </div>

      {/* Free Shipping Progress Indicator (FR-K05) */}
      <div className="bg-brandWarmIvory border border-neutral-200 p-4 mb-8">
        {remainingForFreeShipping === 0 ? (
          <p className="text-sm font-bold uppercase tracking-wider text-green-800 flex items-center gap-2">
            <span>✓</span> You have unlocked Free Worldwide Express Shipping!
          </p>
        ) : (
          <p className="text-sm uppercase tracking-wider text-neutral-700">
            Add <span className="font-bold text-brandBlack">{formatPrice(remainingForFreeShipping)}</span> more to unlock Free Worldwide Express Shipping.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List with Quantity Stepper (FR-K01) */}
        <div className="lg:col-span-2 divide-y divide-neutral-200">
          {cartItems.map((item, index) => (
            <div key={index} className="py-6 flex gap-6 items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0 border border-neutral-200"
              />
              <div className="flex-1">
                <Link to={`/product/${item._id}`}>
                  <h3 className="text-base font-bold uppercase text-brandBlack hover:text-brandRed transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-600 uppercase mt-1">
                  Size: {item.size} | Color: {item.color}
                </p>

                {/* Quantity Stepper (FR-K01) */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="inline-flex items-center border border-neutral-300">
                    <button
                      onClick={() => updateQuantity(index, item.qty - 1)}
                      className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-mono font-bold text-brandBlack">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, item.qty + 1)}
                      className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="text-base font-bold text-brandBlack font-mono">
                    {formatPrice(item.price * item.qty)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="text-neutral-400 hover:text-brandRed p-2 transition-colors"
                title="Remove Piece"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-neutral-50 p-6 border border-neutral-200 h-fit space-y-4">
          <h2 className="text-base font-bold uppercase tracking-wider text-brandBlack border-b border-neutral-200 pb-3">
            Summary
          </h2>

          {/* Promo Code Input (FR-K04) */}
          <div className="space-y-2">
            {discountPercent > 0 ? (
              <div className="flex items-center justify-between bg-brandWarmIvory p-3 border border-brandGold/40 text-sm">
                <span className="font-bold text-brandBlack uppercase tracking-wider">
                  {appliedPromo || 'FIRST10'} (-{discountPercent}%)
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-brandRed text-sm uppercase font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. FIRST10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 border border-neutral-300 p-3 text-sm uppercase tracking-wider focus:outline-none focus:border-brandBlack"
                />
                <button
                  type="submit"
                  className="px-5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack"
                >
                  Apply
                </button>
              </form>
            )}
            {promoMsg.text && (
              <p
                className={`text-sm font-bold uppercase tracking-wider ${
                  promoMsg.isError ? 'text-brandRed' : 'text-green-700'
                }`}
              >
                {promoMsg.text}
              </p>
            )}
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-2 text-sm uppercase tracking-wider text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-brandBlack font-mono">{formatPrice(rawSubtotal)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-brandRed font-bold">
                <span>Discount ({discountPercent}%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Worldwide Shipping</span>
              <span>{totalAmount >= 150 ? 'FREE' : formatPrice(15)}</span>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-black uppercase text-brandBlack">
            <span>Total Payable</span>
            <span className="font-mono">
              {formatPrice(totalAmount >= 150 ? totalAmount : totalAmount + 15)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="w-full py-4 bg-brandBlack text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brandSoftBlack transition-all shadow-md mt-4"
          >
            Proceed To Checkout <ArrowRight size={16} />
          </Link>

          {/* Trust Microcopy (FR-K01) */}
          <div className="pt-3 border-t border-neutral-200 space-y-2 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-brandBlack shrink-0" />
              <span>PCI-DSS Level 1 Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-brandBlack shrink-0" />
              <span>14-day international returns guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}