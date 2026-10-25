import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import ProductGallery from '../components/product/ProductGallery';
import SizeGuideModal from '../components/product/SizeGuideModal';
import BackInStockModal from '../components/product/BackInStockModal';
import ReviewsSection from '../components/product/ReviewsSection';
import CartDrawer from '../components/cart/CartDrawer';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { ShieldCheck, Truck, RotateCcw, ChevronDown, Check, Share2, Plus, Minus, Bell, Zap } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showBackInStock, setShowBackInStock] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Accordion Tabs State (FR-P08)
  const [openTab, setOpenTab] = useState(null);

  const toggleTab = (tabName) => {
    setOpenTab(openTab === tabName ? null : tabName);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedColor(res.data.variants[0].color);
          setSelectedSize(res.data.variants[0].size);
        }

        // Fetch related pieces from same category (FR-P10)
        const relRes = await API.get(`/products?category=${res.data.category}`);
        const filtered = relRes.data.filter((p) => p._id !== id).slice(0, 4);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error loading piece details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center uppercase tracking-[0.2em] text-xs font-semibold text-brandGrey">
        Loading Product Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center uppercase tracking-[0.2em] text-xs font-semibold text-brandGrey">
        Product Not Found.
      </div>
    );
  }

  // Find active variant to check inventory state (FR-P05)
  const activeVariant = product.variants?.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );
  const currentStock = activeVariant ? (activeVariant.stock ?? 0) : 0;
  const isSoldOut = currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= 5;

  const handleAdd = () => {
    if (!selectedSize || !selectedColor || isSoldOut) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setCartDrawerOpen(true);
  };

  // Express Checkout: Buy It Now skips cart and navigates directly to checkout (FR-P06)
  const handleBuyItNow = () => {
    if (!selectedSize || !selectedColor || isSoldOut) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const availableColors = [...new Set(product.variants.map((v) => v.color))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      <BackInStockModal
        isOpen={showBackInStock}
        onClose={() => setShowBackInStock(false)}
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />

      {/* Breadcrumb Navigation (FR-C01) */}
      <nav className="mb-8 text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-2">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/shop/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-black transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-brandBlack font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

        {/* Left: Gallery (Thumbnails + Main View + Lightbox Zoom) */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Right: Product Buy Box */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">
                {product.category} • {product.gender || 'Unisex'}
              </span>

              {/* Dynamic Inventory Badge (FR-P05) */}
              {isSoldOut ? (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider font-bold text-red-700 bg-red-50 px-3 py-1 border border-red-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  Sold Out in Selection
                </span>
              ) : isLowStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-3 py-1 border border-amber-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                  Only {currentStock} Remaining — Low Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider font-bold text-green-700 bg-green-50 px-3 py-1 border border-green-200 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  In Stock — Dispatches within 24h
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1.5">
              {product.title}
            </h1>

            {/* Price with Multi-Currency Formatting (FR-P04) */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-black text-brandBlack font-mono">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-base text-neutral-400 line-through font-mono">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-base text-neutral-800 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-brandBlack block mb-2">
              Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-4 py-2 border text-sm uppercase tracking-wider font-semibold transition-all ${selectedColor === col
                    ? 'border-brandBlack bg-brandBlack text-white shadow-sm'
                    : 'border-neutral-300 text-brandBlack hover:border-brandBlack'
                    }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector + Size Guide Modal Trigger */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold uppercase tracking-wider text-brandBlack">
                Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
              </label>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-sm uppercase tracking-wider text-brandRed underline font-bold"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => {
                const varForSize = product.variants?.find(
                  (v) => v.color === selectedColor && v.size === size
                );
                const isVariantSoldOut = !varForSize || varForSize.stock === 0;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative w-12 h-12 flex items-center justify-center border text-sm font-bold uppercase transition-all ${
                      selectedSize === size
                        ? 'border-brandBlack bg-brandBlack text-white shadow-sm'
                        : isVariantSoldOut
                        ? 'border-neutral-200 text-neutral-400 hover:border-neutral-400 bg-neutral-50'
                        : 'border-neutral-300 text-brandBlack hover:border-brandBlack'
                    }`}
                  >
                    {size}
                    {isVariantSoldOut && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brandRed" title="Sold Out" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper (FR-P06) */}
          {!isSoldOut && (
            <div>
              <label className="text-sm font-bold uppercase tracking-wider text-brandBlack block mb-2">
                Quantity
              </label>
              <div className="inline-flex items-center border border-neutral-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm font-bold font-mono text-brandBlack">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Action CTAs: Add to Bag, Express Buy It Now, or Back in Stock Alert (FR-P05, FR-P06) */}
          <div className="pt-2 space-y-3">
            {isSoldOut ? (
              <button
                onClick={() => setShowBackInStock(true)}
                className="w-full py-4 bg-brandSoftBlack text-brandGold font-bold text-sm uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 border border-brandGold/40 shadow-sm"
              >
                <Bell size={16} /> Notify Me When Available
              </button>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  className="w-full py-4 bg-brandBlack text-white font-bold text-sm uppercase tracking-wider hover:bg-brandSoftBlack transition-all shadow-xl"
                >
                  Add To Bag • {formatPrice(product.price * quantity)}
                </button>

                <button
                  onClick={handleBuyItNow}
                  className="w-full py-3.5 bg-brandWarmIvory text-brandBlack font-black text-sm uppercase tracking-wider border border-brandBlack hover:bg-white transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Zap size={16} className="text-brandGold fill-brandGold" /> Buy It Now (Express Checkout)
                </button>
              </>
            )}

            <button
              onClick={handleShare}
              className="w-full py-3 border border-neutral-300 text-neutral-700 hover:text-black hover:border-black text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Share2 size={16} />
              <span>{copied ? "Link Copied to Clipboard!" : "Share Product"}</span>
            </button>
          </div>

          {/* Collapsible Accordion Tabs (FR-P08) */}
          <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-2">
            {/* Tab 1: Fabric & Care */}
            <div className="py-4">
              <button
                onClick={() => toggleTab('fabric')}
                className="w-full flex justify-between items-center text-sm sm:text-base uppercase tracking-wider font-bold text-brandBlack hover:text-brandRed transition-colors"
              >
                <span>Fabric & Care Specifications</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${openTab === 'fabric' ? 'rotate-180 text-brandRed' : 'text-neutral-400'}`} />
              </button>
              {openTab === 'fabric' && (
                <div className="pt-3 text-sm text-neutral-700 space-y-2 leading-relaxed animate-fadeIn">
                  <p>• 100% Pre-shrunk combed organic loopback cotton (280–450 GSM).</p>
                  <p>• Reinforced double-needle coverstitch on neck, cuffs, and hem.</p>
                  <p>• Machine wash cold inside-out with like colors. Air dry flat to retain custom boxy fit.</p>
                </div>
              )}
            </div>

            {/* Tab 2: Shipping & Returns */}
            <div className="py-4">
              <button
                onClick={() => toggleTab('shipping')}
                className="w-full flex justify-between items-center text-sm sm:text-base uppercase tracking-wider font-bold text-brandBlack hover:text-brandRed transition-colors"
              >
                <span>Worldwide Dispatch & 14-Day Returns</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${openTab === 'shipping' ? 'rotate-180 text-brandRed' : 'text-neutral-400'}`} />
              </button>
              {openTab === 'shipping' && (
                <div className="pt-3 text-sm text-neutral-700 space-y-2 leading-relaxed animate-fadeIn">
                  <p>• Orders dispatched within 24–48 hours from our central warehouse.</p>
                  <p>• Free Express tracked shipping on all orders over $150 USD.</p>
                  <p>• 14 calendar days return policy on all unworn items with security tags attached.</p>
                </div>
              )}
            </div>
          </div>

          {/* Microcopy Trust Features (FR-P07) */}
          <div className="pt-2 space-y-2.5 text-sm text-neutral-700">
            <div className="flex items-center gap-3">
              <Truck size={17} className="text-brandBlack flex-shrink-0" />
              <span>Worldwide express tracked shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={17} className="text-brandBlack flex-shrink-0" />
              <span>14-day return and size exchange guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={17} className="text-brandBlack flex-shrink-0" />
              <span>100% encrypted & secure payment checkout</span>
            </div>
          </div>

        </div>
      </div>

      {/* Verified Reviews Section (FR-P09, GF-07) */}
      <ReviewsSection productTitle={product.title} />

      {/* Related Products Grid (FR-P10) */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-neutral-200">
          <div className="mb-8">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">Complete Your Look</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}