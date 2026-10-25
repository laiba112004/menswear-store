import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import ProductCard from '../components/product/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { param1, param2 } = useParams();
  const navigate = useNavigate();

  // Helper mappings for clean SEO URLs
  const GENDER_MAP = {
    'men': 'Men',
    'mens': 'Men',
    'women': 'Women',
    'womens': 'Women',

  };

  const CATEGORY_MAP = {
    't-shirts': 'T-Shirts',
    'tshirts': 'T-Shirts',
    'tees': 'T-Shirts',
    'hoodies': 'Hoodies',
    'crewnecks': 'Crewnecks',
    'sweaters': 'Crewnecks',
    'pants': 'Pants',
    'trousers': 'Pants',
    'shorts': 'Shorts',
    'hats': 'Hats',
    'caps': 'Hats',
    'accessories': 'Accessories',
  };

  const parseSlug = (slug) => {
    if (!slug) return { category: '', gender: '' };
    const s = slug.toLowerCase();
    if (GENDER_MAP[s]) return { gender: GENDER_MAP[s], category: '' };
    if (CATEGORY_MAP[s]) return { category: CATEGORY_MAP[s], gender: '' };
    return { category: slug.charAt(0).toUpperCase() + slug.slice(1), gender: '' };
  };

  // Extract category and gender from URL segments (supports /shop/t-shirts/women or /shop/women/t-shirts)
  let categoryFromUrl = '';
  let genderFromUrl = '';

  const parsed1 = parseSlug(param1);
  const parsed2 = parseSlug(param2);

  if (parsed1.gender) {
    genderFromUrl = parsed1.gender;
    if (parsed2.category) categoryFromUrl = parsed2.category;
  } else if (parsed1.category) {
    categoryFromUrl = parsed1.category;
    if (parsed2.gender) genderFromUrl = parsed2.gender;
  }

  // Fallbacks for backward compatibility
  const selectedCategory = categoryFromUrl || searchParams.get('category') || '';
  const selectedGender = genderFromUrl || searchParams.get('gender') || '';
  const selectedSort = searchParams.get('sort') || '';
  const selectedSize = searchParams.get('size') || '';
  const selectedColor = searchParams.get('color') || '';
  const selectedPrice = searchParams.get('priceRange') || '';

  // Helper to build clean real-world URLs (/shop/t-shirts/women, /shop/women, /shop/hoodies)
  const buildShopUrl = (cat, gen, currentParams) => {
    const params = new URLSearchParams(currentParams);
    params.delete('category');
    params.delete('gender');

    const catSlug = (cat && cat !== 'All') ? cat.toLowerCase().replace(/\s+/g, '-') : '';
    const genSlug = (gen && gen !== 'All') ? gen.toLowerCase() : '';

    let path = '/shop';
    if (catSlug && genSlug) {
      path = `/shop/${catSlug}/${genSlug}`;
    } else if (catSlug) {
      path = `/shop/${catSlug}`;
    } else if (genSlug) {
      path = `/shop/${genSlug}`;
    }

    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  };

  // Auto-clean query string: converts /shop/t-shirts?gender=Women into /shop/t-shirts/women
  useEffect(() => {
    if (searchParams.has('gender') || searchParams.has('category')) {
      const cleanUrl = buildShopUrl(selectedCategory, selectedGender, searchParams);
      navigate(cleanUrl, { replace: true });
    }
  }, [searchParams, selectedCategory, selectedGender]);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        let endpoint = '/products?';
        if (selectedCategory) endpoint += `category=${encodeURIComponent(selectedCategory)}&`;
        if (selectedGender) endpoint += `gender=${encodeURIComponent(selectedGender)}&`;
        if (selectedSort) endpoint += `sort=${encodeURIComponent(selectedSort)}&`;
        if (selectedSize) endpoint += `size=${encodeURIComponent(selectedSize)}&`;
        if (selectedColor) endpoint += `color=${encodeURIComponent(selectedColor)}&`;

        if (selectedPrice === 'under-60') {
          endpoint += `maxPrice=59&`;
        } else if (selectedPrice === '60-100') {
          endpoint += `minPrice=60&maxPrice=100&`;
        } else if (selectedPrice === 'over-100') {
          endpoint += `minPrice=101&`;
        }

        const res = await API.get(endpoint);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  }, [selectedCategory, selectedGender, selectedSort, selectedSize, selectedColor, selectedPrice]);

  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  // Switch category with clean URLs (/shop/t-shirts, /shop/t-shirts/women, etc.)
  const handleCategoryClick = (cat) => {
    const nextCat = (cat === 'All' || cat === selectedCategory) ? '' : cat;
    const cleanUrl = buildShopUrl(nextCat, selectedGender, searchParams);
    navigate(cleanUrl);
  };

  // Switch audience gender with clean URLs (/shop/women, /shop/t-shirts/women, etc.)
  const handleGenderClick = (genValue) => {
    const cleanUrl = buildShopUrl(selectedCategory, genValue, searchParams);
    navigate(cleanUrl);
  };

  const clearAllFilters = () => {
    navigate('/shop');
    setSearchParams(new URLSearchParams());
  };

  const categories = [
    'All',
    'T-Shirts',
    'Hoodies',
    'Crewnecks',
    'Pants',
    'Shorts',
    'Hats',
    'Accessories'
  ];
  const audiences = [
    { label: 'All', value: '' },
    { label: 'Men', value: 'Men' },
    { label: 'Women', value: 'Women' }
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $60', value: 'under-60' },
    { label: '$60 — $100', value: '60-100' },
    { label: '$100 & Above', value: 'over-100' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Breadcrumbs - Crisp & Legible (FR-C01) */}
      <nav className="mb-6 text-xs sm:text-sm uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-2">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-black transition-colors">Catalogue</Link>
        {selectedCategory && (
          <>
            <span>/</span>
            {selectedGender ? (
              <Link to={`/shop/${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black transition-colors">
                {selectedCategory}
              </Link>
            ) : (
              <span className="text-brandBlack font-bold">{selectedCategory}</span>
            )}
          </>
        )}
        {selectedGender && (
          <>
            <span>/</span>
            <span className="text-brandBlack font-bold">{selectedGender}'s</span>
          </>
        )}
      </nav>

      {/* 1. Header Bar with Audience Selector (FR-H06, FR-C01) */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold block">
            Curated Collection • {products.length} {products.length === 1 ? 'Product' : 'Products'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1.5">
            {selectedGender && selectedCategory
              ? `${selectedGender}'s ${selectedCategory}`
              : selectedGender
                ? `${selectedGender}'s Apparel`
                : selectedCategory
                  ? `${selectedCategory} Collection`
                  : 'All Products'}
          </h1>
          <p className="text-sm text-neutral-600 mt-1.5 max-w-xl leading-relaxed">
            Premium heavyweight fleece, combed organic cotton, and streetwear accessories.
          </p>
        </div>

        {/* Controls: Audience Pills + Sorting Dropdown */}
        <div className="flex flex-wrap items-center gap-3.5 self-start lg:self-end">
          {/* Audience Pill Buttons (All / Men / Women) */}
          <div className="inline-flex items-center bg-neutral-100 p-1 border border-neutral-200">
            {audiences.map((aud) => {
              const active = selectedGender === aud.value || (!selectedGender && !aud.value);
              return (
                <button
                  key={aud.value}
                  onClick={() => handleGenderClick(aud.value)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${active
                      ? 'bg-brandBlack text-white shadow-sm'
                      : 'text-neutral-600 hover:text-brandBlack'
                    }`}
                >
                  {aud.label}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown (FR-C02) */}
          <div className="flex items-center gap-2">
            <label className="text-xs uppercase tracking-wider text-neutral-600 font-bold whitespace-nowrap">
              Sort:
            </label>
            <select
              value={selectedSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="border border-neutral-300 text-xs uppercase tracking-wider px-3 py-2 bg-white focus:outline-none focus:border-black font-medium"
            >
              <option value="">Featured Drop</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="a-z">Alphabetical (A–Z)</option>
              <option value="z-a">Alphabetical (Z–A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Filter Sidebar (FR-C03) */}
        <aside className="w-full md:w-60 flex-shrink-0 space-y-8">
          {/* 1. Category */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-brandBlack mb-3.5">
              Category
            </h3>
            <div className="flex flex-wrap md:flex-col gap-1.5">
              {categories.map((cat) => {
                const active = (cat === 'All' && !selectedCategory) || selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`text-sm uppercase tracking-wider text-left py-2 transition-all font-semibold ${active
                        ? 'font-bold text-brandRed border-l-2 border-brandRed pl-3 bg-neutral-50'
                        : 'text-neutral-500 hover:text-brandBlack hover:pl-1'
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Size Swatches Filter (FR-C03) */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-brandBlack mb-3.5">
              Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => {
                const active = selectedSize === s;
                return (
                  <button
                    key={s}
                    onClick={() => updateParam('size', active ? '' : s)}
                    className={`w-10 h-10 text-sm font-bold uppercase border transition-all ${active
                        ? 'border-brandBlack bg-brandBlack text-white shadow-sm'
                        : 'border-neutral-300 text-brandBlack hover:border-black'
                      }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Price Range (FR-C03) */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-brandBlack mb-3.5">
              Price Range
            </h3>
            <div className="space-y-2 text-sm font-medium">
              {priceRanges.map((p) => {
                const active = selectedPrice === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => updateParam('priceRange', p.value)}
                    className={`block w-full text-left uppercase tracking-wider py-1.5 transition-colors ${active ? 'font-bold text-brandRed' : 'text-neutral-500 hover:text-brandBlack'
                      }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Product Grid (FR-C04, FR-C05) */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-[3/4] bg-neutral-200" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-brandWarmIvory border border-neutral-200 p-8 space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-brandBlack font-serif">
                No Products Match Your Selection
              </h3>
              <p className="text-base text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Try modifying your category, color, or price filters to discover available items.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-8 py-3.5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack shadow-sm"
              >
                View All Apparel
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