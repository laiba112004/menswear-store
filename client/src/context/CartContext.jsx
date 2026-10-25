import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [discountPercent, setDiscountPercent] = useState(() => {
    return Number(localStorage.getItem('discount')) || 0;
  });

  const [appliedPromo, setAppliedPromo] = useState(() => {
    return localStorage.getItem('applied_promo') || '';
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('discount', discountPercent);
    localStorage.setItem('applied_promo', appliedPromo);
  }, [discountPercent, appliedPromo]);

  const addToCart = (product, selectedSize, selectedColor, qty = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item._id === product._id && item.size === selectedSize && item.color === selectedColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qty;
        return updated;
      }
      return [
        ...prev,
        {
          _id: product._id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          size: selectedSize,
          color: selectedColor,
          qty,
        },
      ];
    });
  };

  // Quantity Edit (FR-K01)
  const updateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].qty = newQty;
      }
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Promo Code Validation (FR-K04)
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FIRST10') {
      setDiscountPercent(10);
      setAppliedPromo('FIRST10');
      return { success: true, message: '10% FIRST ORDER DISCOUNT APPLIED!' };
    }
    if (clean === 'VIP20') {
      setDiscountPercent(20);
      setAppliedPromo('VIP20');
      return { success: true, message: '20% VIP INNER CIRCLE PRIVILEGE APPLIED!' };
    }
    return { success: false, message: 'INVALID OR EXPIRED CODE' };
  };

  const removePromoCode = () => {
    setDiscountPercent(0);
    setAppliedPromo('');
  };

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const totalAmount = Math.max(0, rawSubtotal - discountAmount);
  const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        rawSubtotal,
        discountPercent,
        discountAmount,
        totalAmount,
        totalCount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);