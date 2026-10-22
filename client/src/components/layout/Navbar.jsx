import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import CartDrawer from '../cart/CartDrawer';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-brandBlack text-white border-b border-brandCharcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Mobile Hamburger Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl sm:text-2xl font-black tracking-[0.2em] uppercase font-serif text-white">
                ATELIER
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex space-x-8 items-center text-xs uppercase tracking-widest font-medium">
              <Link to="/shop" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-brandRed pb-1 transition-all">
                All Apparel
              </Link>
              <Link to="/shop?category=Hoodies" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-brandRed pb-1 transition-all">
                Hoodies
              </Link>
              <Link to="/shop?category=T-Shirts" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-brandRed pb-1 transition-all">
                T-Shirts
              </Link>
              <Link to="/shop?category=Pants" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-brandRed pb-1 transition-all">
                Pants
              </Link>
              <Link to="/shop?category=Shorts" className="text-gray-300 hover:text-white hover:border-b-2 hover:border-brandRed pb-1 transition-all">
                Shorts
              </Link>
            </nav>

            {/* Utility Controls (Search, Wishlist, Admin, Cart) */}
            <div className="flex items-center space-x-5">
              {/* 1. Live Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Search"
                title="Search Silhouettes"
              >
                <Search size={20} />
              </button>

              {/* 2. Wishlist Link with Live Badge */}
              <Link
                to="/wishlist"
                className="relative text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Wishlist"
                title="Saved Pieces"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-brandGold text-brandBlack text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* 3. Admin Command Center Trigger */}
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white transition-colors p-1 hidden sm:block"
                title="Admin Command Center"
                aria-label="Admin Portal"
              >
                <User size={20} />
              </Link>
              
              {/* 4. Cart Slide-over Drawer Trigger */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="relative text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Open Bag"
                title="Shopping Bag"
              >
                <ShoppingBag size={21} />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-brandRed text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brandSoftBlack border-b border-brandCharcoal px-4 pt-3 pb-6 space-y-3">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-gray-300 hover:text-white py-2"
            >
              All Apparel
            </Link>
            <Link
              to="/shop?category=Hoodies"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-gray-300 hover:text-white py-2"
            >
              Hoodies
            </Link>
            <Link
              to="/shop?category=T-Shirts"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-gray-300 hover:text-white py-2"
            >
              T-Shirts
            </Link>
            <Link
              to="/shop?category=Pants"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-gray-300 hover:text-white py-2"
            >
              Pants
            </Link>
            <Link
              to="/shop?category=Shorts"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-gray-300 hover:text-white py-2"
            >
              Shorts
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-brandGold font-medium py-2 border-t border-brandCharcoal pt-3"
            >
              Wishlist ({wishlistCount})
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-neutral-400 font-medium py-2"
            >
              Admin Portal
            </Link>
          </div>
        )}
      </header>

      {/* Modals & Slide-over Panels */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}