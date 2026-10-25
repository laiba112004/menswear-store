import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import HeroBanner from '../components/home/HeroBanner';
import USPBar from '../components/home/USPBar';
import CategoryTiles from '../components/home/CategoryTiles';
import BrandStoryBand from '../components/home/BrandStoryBand';
import Testimonials from '../components/home/Testimonials';
import ProductCard from '../components/product/ProductCard';
import Reveal from '../components/common/Reveal';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Products loading error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  return (
    <div className="flex flex-col w-full bg-white text-brandBlack">
      {/* 1. Hero Campaign Banner (Editorial Carousel) */}
      <HeroBanner />

      {/* 2. USP Trust Strip */}
      <USPBar />

      {/* 3. New Arrivals Catalog with Smooth Scroll Reveal */}
      <Reveal>
        <section id="featured-drops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-200 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brandRed" />
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brandGold font-bold">
                  New Season • Fresh Arrivals
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
                Featured Arrivals
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-1">
                Premium heavyweight fabrics designed for everyday comfort and modern streetwear style
              </p>
            </div>

            <Link
              to="/shop"
              className="text-sm uppercase tracking-wider text-brandBlack font-bold hover:text-brandRed flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>View All Products ({products.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-[3/4] bg-neutral-200" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="p-16 text-center bg-brandWarmIvory border border-neutral-200">
              <p className="text-sm uppercase tracking-wider text-neutral-600 font-bold">
                Loading collection pieces...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-all shadow-md group"
            >
              <span>Shop All Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 4. Capsule Category Tiles (Editorial Hoodies, Tees, Pants) */}
      <Reveal>
        <CategoryTiles />
      </Reveal>

      {/* 5. The Atelier Construction Standard / Craftsmanship Feature */}
      <Reveal>
        <section className="bg-brandBlack text-white py-24 border-y border-brandCharcoal relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Manifesto Text */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brandGold font-bold">
                  Premium Craftsmanship
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif leading-tight">
                  Tailored Fit.<br />Made to Last.
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                  Conventional streetwear settles for thin, blended fabrics that lose their shape. Our standard begins at 450 GSM heavyweight French Terry and combed organic cotton—enzyme-washed for a soft, lived-in feel that holds its shape indefinitely.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div className="space-y-1">
                    <span className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                      <ShieldCheck size={18} className="text-brandGold" /> Zero Shrinkage
                    </span>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Pre-shrunk cotton yarn ensures exact measurement retention wash after wash.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                      <Layers size={18} className="text-brandGold" /> Double-Stitched
                    </span>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Reinforced flatlock bar-tacks across all high-tension stress zones.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/lookbook"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brandBlack text-sm font-bold uppercase tracking-wider hover:bg-brandWarmIvory transition-all shadow-lg"
                  >
                    <span>View Lookbook</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Campaign Collage */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="/images/craft/manifesto-1.jpg"
                    alt="Streetwear Campaign Piece"
                    className="w-full h-72 object-cover border border-white/10 shadow-2xl filter contrast-105"
                  />
                  <div className="bg-brandSoftBlack p-5 border border-white/10 space-y-1">
                    <span className="text-sm uppercase tracking-wider text-brandGold font-bold">Fabric Weight</span>
                    <p className="text-sm font-mono font-bold text-white">450 GSM Heavy Fleece</p>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="bg-brandSoftBlack p-5 border border-white/10 space-y-1">
                    <span className="text-sm uppercase tracking-wider text-brandGold font-bold">Silhouette Cut</span>
                    <p className="text-sm font-mono font-bold text-white">Relaxed Boxy Fit</p>
                  </div>
                  <img
                    src="/images/craft/manifesto-2.jpg"
                    alt="Lookbook Detail"
                    className="w-full h-72 object-cover border border-white/10 shadow-2xl filter contrast-105"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </Reveal>

      {/* 6. Brand Story Ethos Band (FR-H05) */}
      <Reveal>
        <BrandStoryBand />
      </Reveal>

      {/* 7. Testimonials & Social Proof (FR-H07) */}
      <Reveal>
        <Testimonials />
      </Reveal>

      {/* 8. VIP Inner Circle Newsletter Drop Access */}
      <Reveal>
        <section className="bg-brandWarmIvory py-20 border-t border-neutral-200">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neutral-300">
              <Sparkles size={15} className="text-brandGold" />
              <span className="text-sm uppercase tracking-wider font-bold text-brandBlack">
                Inner Circle Privileges
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-serif text-brandBlack">
              Gain Early Drop Access
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
              Subscribers receive private 1-hour early entrance password keys prior to public capsule releases.
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 bg-white border border-brandGold text-brandBlack space-y-1 shadow-sm max-w-md mx-auto animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-brandBlack">
                  <CheckCircle2 size={18} className="text-brandGold" />
                  <span>Welcome to Atelier.</span>
                </div>
                <p className="text-xs text-neutral-600">
                  Use code <span className="font-mono font-bold text-brandBlack bg-neutral-100 px-2 py-0.5 border border-neutral-300 select-all">FIRST10</span> for 10% off at checkout.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="client@atelierclothing.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-neutral-300 p-3.5 text-sm focus:outline-none focus:border-brandBlack"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-all shadow-md whitespace-nowrap"
                >
                  Join Circle
                </button>
              </form>
            )}

            <span className="text-sm text-neutral-500 block pt-1">
              Zero promotional spam • Strictly private drop allocations
            </span>
          </div>
        </section>
      </Reveal>

    </div>
  );
}