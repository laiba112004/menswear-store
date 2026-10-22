import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const isWishlisted = isInWishlist(product._id);

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
            <span className="bg-brandBlack text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              New Drop
            </span>
          )}
          {hasDiscount && (
            <span className="bg-brandRed text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Heart Button Right (FR-P11 / GF-08) */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-brandBlack hover:bg-white hover:text-brandRed transition-all shadow-sm"
          aria-label="Save to Wishlist"
        >
          <Heart
            size={15}
            className={`transition-colors ${
              isWishlisted ? 'fill-brandRed text-brandRed' : 'text-neutral-600'
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-3 pb-1 flex flex-col flex-grow">
        <span className="text-[10px] uppercase tracking-widest text-brandGrey">
          {product.category}
        </span>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-semibold text-brandBlack group-hover:text-brandRed transition-colors line-clamp-1 mt-0.5">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-brandBlack">${product.price}</span>
          {hasDiscount && (
            <span className="text-xs text-brandGrey line-through font-mono">
              ${product.comparePrice}
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