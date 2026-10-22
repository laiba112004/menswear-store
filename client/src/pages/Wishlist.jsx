import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

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
        <p className="text-xs text-brandGrey uppercase tracking-widest mb-8">
          Save your favorite capsule silhouettes to review them anytime.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-brandBlack text-white font-bold text-xs uppercase tracking-widest hover:bg-brandSoftBlack transition-all"
        >
          Explore Apparel
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="border-b border-neutral-200 pb-4 mb-8">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brandGrey font-bold">
          Saved Silhouettes
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
          Client Wishlist ({wishlistItems.length})
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {wishlistItems.map((item) => (
          <div key={item._id} className="border border-neutral-200 bg-white flex flex-col justify-between">
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
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-neutral-400 hover:text-brandRed"
                title="Remove from Wishlist"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brandGrey block">
                  {item.category}
                </span>
                <Link to={`/product/${item._id}`}>
                  <h3 className="text-xs font-bold uppercase text-brandBlack hover:text-brandRed truncate mt-0.5">
                    {item.title}
                  </h3>
                </Link>
                <span className="text-xs font-bold text-brandBlack mt-1 block font-mono">
                  ${item.price}
                </span>
              </div>

              <button
                onClick={() => handleMoveToBag(item)}
                className="w-full py-2.5 bg-brandBlack text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brandSoftBlack flex items-center justify-center gap-1.5 transition-all"
              >
                <ShoppingBag size={13} /> Move To Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}