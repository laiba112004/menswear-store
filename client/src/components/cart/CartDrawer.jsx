import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, totalAmount, totalCount } = useCart();
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);

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
              <ShoppingBag size={18} />
              <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Your Bag ({totalCount})</h2>
            </div>
            <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (FR-K05) */}
          <div className="bg-brandWarmIvory px-5 py-3 border-b border-neutral-200 text-center">
            {remainingForFreeShipping === 0 ? (
              <p className="text-[11px] font-bold uppercase tracking-wider text-brandBlack">
                Unlocked: Free Express Shipping
              </p>
            ) : (
              <p className="text-[11px] uppercase tracking-wider text-brandGrey">
                Add <span className="font-bold text-brandBlack">${remainingForFreeShipping}</span> more for Free Shipping
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-200">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <p className="text-xs uppercase tracking-widest text-brandGrey">Your bag is currently empty.</p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="inline-block px-6 py-3 bg-brandBlack text-white text-[11px] font-bold uppercase tracking-widest"
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
                    <h4 className="text-xs font-bold uppercase text-brandBlack truncate">{item.title}</h4>
                    <p className="text-[10px] text-brandGrey uppercase tracking-wider mt-0.5">
                      {item.color} / {item.size}
                    </p>
                    <p className="text-[10px] text-brandGrey uppercase mt-0.5">Qty: {item.qty}</p>
                    <span className="text-xs font-bold text-brandBlack mt-2 block">${item.price * item.qty}</span>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)} 
                    className="text-neutral-400 hover:text-brandRed p-1 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              <div className="flex justify-between text-xs uppercase tracking-wider font-semibold">
                <span>Subtotal</span>
                <span className="font-black text-sm">${totalAmount}</span>
              </div>
              <p className="text-[10px] text-brandGrey tracking-wider">Taxes and shipping calculated at checkout.</p>
              
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full py-4 bg-brandBlack text-white font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brandSoftBlack transition-all"
              >
                Checkout Now <ArrowRight size={14} />
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}