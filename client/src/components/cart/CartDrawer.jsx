import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    rawSubtotal,
    discountPercent,
    discountAmount,
    totalAmount, 
    totalCount,
    appliedPromo,
    applyPromoCode,
    removePromoCode 
  } = useCart();
  const { formatPrice } = useCurrency();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState({ text: '', isError: false });

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);
  const progressPercent = Math.min(100, Math.round((totalAmount / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromoCode(promoInput);
    if (result.success) {
      setPromoMsg({ text: result.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMsg({ text: result.message, isError: true });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-brandBlack text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Your Bag ({totalCount})</h2>
            </div>
            <button onClick={onClose} className="text-neutral-400 hover:text-white p-1" aria-label="Close Bag">
              <X size={22} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (FR-K05) */}
          <div className="bg-brandWarmIvory px-5 py-3 border-b border-neutral-200 text-center">
            {remainingForFreeShipping === 0 ? (
              <p className="text-sm font-bold uppercase tracking-wider text-green-800">
                ✓ Unlocked: Free Worldwide Shipping ($150+)
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-700">
                  Add <span className="font-bold text-brandBlack">{formatPrice(remainingForFreeShipping)}</span> more for Free Shipping ($150)
                </p>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-brandBlack h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List with Quantity Stepper (FR-K01) */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-200">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <p className="text-sm uppercase tracking-wider text-neutral-600">Your bag is currently empty.</p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="inline-block px-7 py-3.5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="py-4 flex gap-4 items-start">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-20 object-cover bg-neutral-100 flex-shrink-0 border border-neutral-200" 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold uppercase text-brandBlack truncate">{item.title}</h4>
                    <p className="text-sm text-neutral-600 uppercase tracking-wider mt-0.5">
                      {item.color} / {item.size}
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="inline-flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQuantity(index, item.qty - 1)}
                          className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-sm font-mono font-bold text-brandBlack">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.qty + 1)}
                          className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-brandBlack font-mono">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(index)} 
                    className="text-neutral-400 hover:text-brandRed p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              {/* Promo Code Box inside Drawer */}
              <div className="space-y-1.5 pb-2 border-b border-neutral-200">
                {discountPercent > 0 ? (
                  <div className="flex items-center justify-between bg-brandWarmIvory p-2.5 border border-brandGold/40 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 font-bold text-brandBlack uppercase tracking-wider">
                      <Tag size={14} className="text-brandGold" />
                      <span>{appliedPromo || 'FIRST10'} (-{discountPercent}%)</span>
                    </div>
                    <button
                      onClick={() => {
                        removePromoCode();
                        setPromoMsg({ text: '', isError: false });
                      }}
                      className="text-brandRed text-xs sm:text-sm uppercase font-bold hover:underline"
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
                      className="flex-1 border border-neutral-300 px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-brandBlack bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brandBlack text-white text-xs font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg.text && (
                  <p
                    className={`text-xs uppercase tracking-wider font-bold ${
                      promoMsg.isError ? 'text-brandRed' : 'text-green-700'
                    }`}
                  >
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs sm:text-sm uppercase tracking-wider text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-brandBlack font-mono">{formatPrice(rawSubtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-brandRed font-bold">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-brandBlack font-bold pt-1 border-t border-neutral-200">
                  <span className="text-sm">Total</span>
                  <span className="font-black text-base font-mono">{formatPrice(totalAmount)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="py-3 border border-brandBlack text-brandBlack font-bold text-xs uppercase tracking-wider text-center hover:bg-neutral-100 transition-all"
                >
                  View Bag
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="py-3 bg-brandBlack text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brandSoftBlack transition-all"
                >
                  Checkout <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}