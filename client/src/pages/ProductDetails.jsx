import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import ProductGallery from '../components/product/ProductGallery';
import SizeGuideModal from '../components/product/SizeGuideModal';
import CartDrawer from '../components/cart/CartDrawer';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, RotateCcw, ChevronDown, Check, Share2 } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

const handleShare = () => {
  navigator.clipboard.writeText(window.location.href);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

  // Accordion Tabs State (FR-P08)
  const [openTab, setOpenTab] = useState(null); // 'fabric' ya 'shipping'

  const toggleTab = (tabName) => {
    setOpenTab(openTab === tabName ? null : tabName);
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
        Retrieving Piece Specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center uppercase tracking-[0.2em] text-xs font-semibold text-brandGrey">
        Piece Not Found.
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, 1);
    setCartDrawerOpen(true);
  };

  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const availableColors = [...new Set(product.variants.map((v) => v.color))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Gallery (Thumbnails + Main View) */}
        <ProductGallery images={product.images} />

        {/* Right: Product Buy Box */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brandGrey font-bold">
                {product.category}
              </span>
              {/* Live Inventory Status (FR-P05) */}
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-green-700 bg-green-50 px-2.5 py-1 border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                In Stock — Ready to Dispatch
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1.5">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-2xl font-black text-brandBlack font-mono">${product.price}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-base text-brandGrey line-through font-mono">${product.comparePrice}</span>
              )}
            </div>
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-brandBlack block mb-2">
              Color: <span className="font-normal text-brandGrey">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-3.5 py-2 border text-xs uppercase tracking-wider font-semibold transition-all ${
                    selectedColor === col 
                      ? 'border-brandBlack bg-brandBlack text-white' 
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
              <label className="text-xs font-bold uppercase tracking-widest text-brandBlack">
                Size: <span className="font-normal text-brandGrey">{selectedSize}</span>
              </label>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-xs uppercase tracking-widest text-brandRed underline font-bold"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border text-xs font-bold uppercase transition-all ${
                    selectedSize === size 
                      ? 'border-brandBlack bg-brandBlack text-white' 
                      : 'border-neutral-300 text-brandBlack hover:border-brandBlack'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add To Bag CTA Button */}
          <div className="pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-brandBlack text-white font-bold text-xs uppercase tracking-[0.25em] hover:bg-brandSoftBlack transition-all shadow-xl"
            >
              Add To Bag
            </button>
            <button
  onClick={handleShare}
  className="w-full py-2.5 border border-neutral-300 text-neutral-600 hover:text-black hover:border-black text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-2"
>
  <Share2 size={13} />
  <span>{copied ? "Link Copied to Clipboard!" : "Share Silhouette"}</span>
</button>
          </div>

          {/* Collapsible Accordion Tabs (FR-P08) */}
          <div className="border-t border-neutral-200 divide-y divide-neutral-200 pt-2">
            {/* Tab 1: Fabric & Care */}
            <div className="py-3.5">
              <button
                onClick={() => toggleTab('fabric')}
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold text-brandBlack hover:text-brandRed transition-colors"
              >
                <span>Fabric & Care Specifications</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openTab === 'fabric' ? 'rotate-180 text-brandRed' : 'text-neutral-400'}`} />
              </button>
              {openTab === 'fabric' && (
                <div className="pt-3 text-xs text-neutral-600 space-y-1.5 leading-relaxed animate-fadeIn">
                  <p>• 100% Pre-shrunk combed organic loopback cotton (280–450 GSM)[cite: 7].</p>
                  <p>• Reinforced double-needle coverstitch on neck, cuffs, and hem.</p>
                  <p>• Machine wash cold inside-out with like colors. Air dry flat to retain custom boxy fit.</p>
                </div>
              )}
            </div>

            {/* Tab 2: Shipping & Returns */}
            <div className="py-3.5">
              <button
                onClick={() => toggleTab('shipping')}
                className="w-full flex justify-between items-center text-xs uppercase tracking-widest font-bold text-brandBlack hover:text-brandRed transition-colors"
              >
                <span>Worldwide Dispatch & 14-Day Returns</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openTab === 'shipping' ? 'rotate-180 text-brandRed' : 'text-neutral-400'}`} />
              </button>
              {openTab === 'shipping' && (
                <div className="pt-3 text-xs text-neutral-600 space-y-1.5 leading-relaxed animate-fadeIn">
                  <p>• Orders dispatched within 24–48 hours from our central warehouse[cite: 5, 13].</p>
                  <p>• Free Express tracked shipping on all orders over $150 USD[cite: 9, 13].</p>
                  <p>• 14 calendar days return policy on all unworn items with security tags attached[cite: 3, 5, 13].</p>
                </div>
              )}
            </div>
          </div>

          {/* Microcopy Trust Features (FR-P07) */}
          <div className="pt-2 space-y-2.5 text-xs text-brandGrey">
            <div className="flex items-center gap-3">
              <Truck size={15} className="text-brandBlack flex-shrink-0" />
              <span>Worldwide express tracked shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={15} className="text-brandBlack flex-shrink-0" />
              <span>14-day return and size exchange guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={15} className="text-brandBlack flex-shrink-0" />
              <span>100% encrypted & secure payment checkout</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Grid (FR-P10) */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-12 border-t border-neutral-200">
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">Curated Pairing</span>
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