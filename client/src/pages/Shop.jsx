import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/product/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';
  const selectedGender = searchParams.get('gender') || '';
  const selectedSort = searchParams.get('sort') || '';

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        let endpoint = '/products?';
        if (selectedCategory) endpoint += `category=${selectedCategory}&`;
        if (selectedGender) endpoint += `gender=${selectedGender}&`;
        if (selectedSort) endpoint += `sort=${selectedSort}&`;
        const res = await API.get(endpoint);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [selectedCategory, selectedGender, selectedSort]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const categories = ['All', 'Hoodies', 'T-Shirts', 'Crewnecks', 'Pants', 'Shorts'];
  const audiences = [
    { label: 'All Silhouettes', value: '' },
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* 1. Header Bar with Audience Selector (FR-H06) */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">
            Curated Catalogue
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
            {selectedGender ? `${selectedGender}'s Apparel` : selectedCategory || 'All Garments'}
          </h1>
        </div>

        {/* Audience Pill Buttons (Men / Women / All) */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 border border-neutral-200">
          {audiences.map((aud) => (
            <button
              key={aud.value}
              onClick={() => updateParam('gender', aud.value)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                selectedGender === aud.value
                  ? 'bg-brandBlack text-white shadow-sm'
                  : 'text-neutral-600 hover:text-brandBlack'
              }`}
            >
              {aud.label}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs uppercase tracking-widest text-brandGrey font-semibold">
            Sort:
          </label>
          <select
            value={selectedSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="border border-neutral-300 text-xs uppercase tracking-wider px-3 py-2 bg-white focus:outline-none"
          >
            <option value="">Featured</option>
            <option value="newest">Newest Drops</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 2. Left Category Sidebar */}
        <div className="w-full md:w-48 flex-shrink-0">
          <h3 className="text-xs font-bold uppercase tracking-widest text-brandBlack mb-4">
            Category
          </h3>
          <div className="flex flex-wrap md:flex-col gap-2">
            {categories.map((cat) => {
              const active = (cat === 'All' && !selectedCategory) || selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => updateParam('category', cat === 'All' ? '' : cat)}
                  className={`text-xs uppercase tracking-wider text-left py-1.5 transition-colors ${
                    active
                      ? 'font-bold text-brandRed border-l-2 border-brandRed pl-2.5'
                      : 'text-brandGrey hover:text-brandBlack'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-[3/4] bg-neutral-200" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-brandWarmIvory border border-neutral-200 p-8 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-brandBlack">
                No pieces found for this filter criteria.
              </p>
              <button
                onClick={() => {
                  updateParam('category', '');
                  updateParam('gender', '');
                }}
                className="text-xs uppercase tracking-widest text-brandRed underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}