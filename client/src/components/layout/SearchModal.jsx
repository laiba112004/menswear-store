import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { useCurrency } from '../../context/CurrencyContext';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Sare products cache me rakh lein live fast search ke liye
  useEffect(() => {
    if (isOpen) {
      API.get('/products')
        .then((res) => setAllProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  // Live client-side filtering (<1s response)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }
    const query = searchTerm.toLowerCase();
    const matches = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    setFilteredResults(matches);
  }, [searchTerm, allProducts]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brandBlack/95 backdrop-blur-md flex flex-col p-4 sm:p-8">
      {/* Top Bar with Close */}
      <div className="max-w-4xl w-full mx-auto flex justify-between items-center pb-6 border-b border-brandCharcoal">
        <span className="text-sm uppercase tracking-[0.2em] text-brandGold font-bold">
          Quick Product Search
        </span>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-2 transition-colors"
          aria-label="Close search"
        >
          <X size={26} />
        </button>
      </div>

      {/* Big Search Input Field */}
      <div className="max-w-4xl w-full mx-auto mt-8">
        <div className="relative flex items-center border-b-2 border-white/20 focus-within:border-brandRed transition-colors pb-3">
          <Search size={28} className="text-neutral-400 mr-4 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="TYPE TO SEARCH (E.G. HOODIE, BOXY TEE, PANTS)..."
            className="w-full bg-transparent text-xl sm:text-2xl text-white uppercase placeholder-neutral-500 tracking-wider focus:outline-none font-serif"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm uppercase tracking-wider text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Live Results Display */}
      <div className="max-w-4xl w-full mx-auto mt-8 flex-1">
        {searchTerm && filteredResults.length === 0 ? (
          <div className="py-16 text-center text-neutral-400">
            <p className="text-base uppercase tracking-wider">No apparel matched "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredResults.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                onClick={onClose}
                className="group flex gap-4 items-center bg-brandSoftBlack p-3 border border-brandCharcoal hover:border-neutral-400 transition-all"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-16 h-20 object-cover bg-neutral-900 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-sm uppercase tracking-wider text-brandGold font-bold block">
                    {product.category}
                  </span>
                  <h4 className="text-base font-bold text-white uppercase truncate group-hover:text-brandRed transition-colors">
                    {product.title}
                  </h4>
                  <p className="text-sm font-bold text-neutral-300 mt-1 font-mono">{formatPrice(product.price)}</p>
                </div>
                <ArrowRight size={18} className="text-neutral-500 group-hover:text-white transition-colors mr-2" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}