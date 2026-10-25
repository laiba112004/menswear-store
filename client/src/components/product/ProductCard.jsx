import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const isWishlisted = isInWishlist(product._id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.variants?.[0]?.color || 'Pitch Black';
    const defaultSize = product.variants?.[0]?.size || 'M';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div className="group relative flex flex-col">
      {/* Product Image Container */}
      <div className="relative w-full aspect-[3/4] bg-neutral-100 overflow-hidden">
        <Link to={`/product/${product._id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.title}
              className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </Link>

        {/* Badges Left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
          {product.isNewArrival && (
            <span className="bg-brandBlack text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm">
              New Drop
            </span>
          )}
          {hasDiscount && (
            <span className="bg-brandRed text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Heart Button Right (FR-P11 / GF-08) */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-brandBlack hover:bg-white hover:text-brandRed transition-all shadow-sm z-10"
          aria-label="Save to Wishlist"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              isWishlisted ? 'fill-brandRed text-brandRed' : 'text-neutral-600'
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover (FR-C04) */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-0 inset-x-0 bg-brandBlack/95 text-white py-3.5 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black shadow-lg"
          title="Quick add default size to bag"
        >
          <Plus size={16} /> Quick Add To Bag
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col flex-grow">
        <span className="text-xs sm:text-sm uppercase tracking-wider text-neutral-500 font-semibold">
          {product.category}
        </span>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-base font-bold text-brandBlack group-hover:text-brandRed transition-colors line-clamp-1 mt-0.5">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-bold text-brandBlack font-mono">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-neutral-400 line-through font-mono">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>

        {/* Color Swatch Dots */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {[...new Set(product.variants.map((v) => v.colorCode))].map((colorHex, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-gray-300"
                style={{ backgroundColor: colorHex || '#1A1A1A' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}