import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import CartDrawer from '../cart/CartDrawer';
import SearchModal from './SearchModal';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { name: 'All Apparel', path: '/shop' },
  { name: 'T-Shirts', path: '/shop/t-shirts' },
  { name: 'Hoodies', path: '/shop/hoodies' },
  { name: 'Pants', path: '/shop/pants' },
  { name: 'Hats', path: '/shop/hats' },
  { name: 'Lookbook', path: '/lookbook', highlight: true },
];

export default function Navbar() {
  const location = useLocation();
  const { totalCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAuthenticated } = useAuth();

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
              <Link to="/" className="text-xl sm:text-2xl font-black tracking-[0.2em] uppercase font-serif text-white hover:opacity-90 transition-opacity">
                ATELIER
              </Link>
            </div>

            {/* Desktop Navigation Links with Editorial Sliding Underline */}
            <nav className="hidden lg:flex space-x-8 items-center text-sm uppercase tracking-wider font-semibold">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative group py-1.5 transition-colors duration-200 ${
                      item.highlight
                        ? 'text-brandGold hover:text-white font-bold'
                        : isActive
                        ? 'text-white'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    {/* Editorial Underline Slide */}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out ${
                        item.highlight ? 'bg-brandGold' : 'bg-white'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Utility Controls (Search, Wishlist, Admin, Cart) */}
            <div className="flex items-center space-x-5">
              {/* 1. Live Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Search"
                title="Search Products"
              >
                <Search size={20} />
              </button>

              {/* 2. Wishlist Link with Live Badge */}
              <Link
                to="/wishlist"
                className="relative text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Wishlist"
                title="Saved Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-brandGold text-brandBlack text-xs font-black rounded-full min-w-[20px] h-[20px] px-1 flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to={isAuthenticated ? "/account" : "/login"}
                className="text-gray-300 hover:text-white transition-colors p-1 hidden sm:block"
                title={isAuthenticated ? "Account Dashboard" : "Sign In"}
                aria-label="Account"
              >
                <User size={20} className={isAuthenticated ? "text-brandGold" : ""} />
              </Link>
              {/* Admin Portal Link */}
              <Link
                to="/admin"
                className="text-gray-400 hover:text-brandGold transition-colors p-1 hidden sm:block"
                title="Admin Command Center"
                aria-label="Admin Portal"
              >
                <Shield size={19} />
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
                  <span className="absolute -top-2 -right-2.5 bg-brandRed text-white text-xs font-black rounded-full min-w-[20px] h-[20px] px-1 flex items-center justify-center shadow-sm">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brandSoftBlack border-b border-brandCharcoal px-4 pt-3 pb-6 space-y-1.5 animate-fade-in">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm uppercase tracking-widest py-2 px-3 border-l-2 transition-all duration-200 ${
                    item.highlight
                      ? 'text-brandGold border-brandGold/40 hover:border-brandGold hover:pl-4 hover:text-white'
                      : isActive
                      ? 'text-white border-white bg-white/5 pl-4 font-bold'
                      : 'text-neutral-300 border-transparent hover:border-white hover:text-white hover:pl-4'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
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