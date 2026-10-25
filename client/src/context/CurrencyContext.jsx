import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36, label: 'CAD (CA$)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' },
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('atelier_currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('atelier_currency', currency);
  }, [currency]);

  const activeCurrency = CURRENCIES[currency] || CURRENCIES.USD;

  const formatPrice = (amountInUSD) => {
    if (amountInUSD === undefined || amountInUSD === null) return '';
    const converted = amountInUSD * activeCurrency.rate;
    // Round to whole numbers if clean or 2 decimal places
    const formatted = Math.round(converted);
    return `${activeCurrency.symbol}${formatted}`;
  };

  const convertPrice = (amountInUSD) => {
    if (!amountInUSD) return 0;
    return Math.round(amountInUSD * activeCurrency.rate);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        activeCurrency,
        formatPrice,
        convertPrice,
        currencies: CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
