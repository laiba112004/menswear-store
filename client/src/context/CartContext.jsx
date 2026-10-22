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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('discount', discountPercent);
  }, [discountPercent]);

  const addToCart = (product, selectedSize, selectedColor, qty = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item._id === product._id && item.size === selectedSize && item.color === selectedColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qty;
        return updated;
      }
      return [...prev, {
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        qty
      }];
    });
  };

  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const applyPromoCode = (code) => {
    if (code.trim().toUpperCase() === 'FIRST10') {
      setDiscountPercent(10);
      return { success: true, message: '10% FIRST ORDER DISCOUNT APPLIED!' };
    }
    return { success: false, message: 'INVALID PROMO CODE' };
  };

  const removePromoCode = () => {
    setDiscountPercent(0);
  };

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const totalAmount = Math.max(0, rawSubtotal - discountAmount);
  const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      rawSubtotal,
      discountPercent,
      discountAmount,
      totalAmount,
      totalCount,
      applyPromoCode,
      removePromoCode
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);