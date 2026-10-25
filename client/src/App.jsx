import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CookieBanner from './components/layout/CookieBanner';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import FAQ from './pages/FAQ';
import ShippingReturns from './pages/ShippingReturns';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Wishlist from './pages/Wishlist';
import Lookbook from './pages/Lookbook';
import NotFound from './pages/NotFound';
import Auth from './pages/Auth';
import Account from './pages/Account';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTop from './components/common/BackToTop';

function App() {
  return (
    <div className="min-h-screen bg-white text-brandBlack flex flex-col font-sans">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:param1" element={<Shop />} />
          <Route path="/shop/:param1/:param2" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping" element={<ShippingReturns />} />
          <Route path="/returns" element={<ShippingReturns />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <CookieBanner />
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;