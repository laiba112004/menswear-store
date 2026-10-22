import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import HeroBanner from '../components/home/HeroBanner';
import USPBar from '../components/home/USPBar';
import CategoryTiles from '../components/home/CategoryTiles';
import BrandStoryBand from '../components/home/BrandStoryBand';
import Testimonials from '../components/home/Testimonials';
import ProductCard from '../components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Campaign Banner */}
      <HeroBanner />

      {/* 2. USP Trust Strip */}
      <USPBar />

      {/* 3. New Arrivals Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brandGrey font-bold">Latest Drops</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-brandBlack font-serif">
              New Arrivals
            </h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-widest font-bold flex items-center gap-1 hover:text-brandRed transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-[3/4] bg-neutral-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Capsule Category Tiles */}
      <CategoryTiles />

      {/* 5. Brand Story Ethos Band (FR-H05) */}
      <BrandStoryBand />

      {/* 6. Testimonials & Social Proof (FR-H07) */}
      <Testimonials />
    </div>
  );
}