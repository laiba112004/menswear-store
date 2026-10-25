import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleMoveToBag = (product) => {
    const defaultColor = product.variants?.[0]?.color || 'Pitch Black';
    const defaultSize = product.variants?.[0]?.size || 'M';
    addToCart(product, defaultSize, defaultColor, 1);
    removeFromWishlist(product._id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight font-serif mb-4">
          Your Wishlist Is Empty
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 uppercase tracking-wider mb-8">
          Save your favorite items to review them anytime.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-brandBlack text-white font-bold text-sm uppercase tracking-wider hover:bg-brandSoftBlack transition-all"
        >
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="border-b border-neutral-200 pb-4 mb-8">
        <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">
          Saved Items
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          My Wishlist ({wishlistItems.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {wishlistItems.map((item) => (
          <div key={item._id} className="border border-neutral-200 bg-white flex flex-col justify-between shadow-sm">
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-neutral-400 hover:text-brandRed shadow-sm"
                title="Remove from Wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-sm uppercase tracking-wider text-neutral-500 font-semibold block">
                  {item.category}
                </span>
                <Link to={`/product/${item._id}`}>
                  <h3 className="text-base font-bold uppercase text-brandBlack hover:text-brandRed truncate mt-0.5">
                    {item.title}
                  </h3>
                </Link>
                <span className="text-base font-bold text-brandBlack mt-1 block font-mono">
                  {formatPrice(item.price)}
                </span>
              </div>

              <button
                onClick={() => handleMoveToBag(item)}
                className="w-full py-3 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <ShoppingBag size={15} /> Move To Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}