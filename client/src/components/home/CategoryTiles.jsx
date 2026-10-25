import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    title: 'Boxy Combed Tees',
    subtitle: '280 GSM Organic Cotton',
    slug: 't-shirts',
    img: '/images/categories/cat-tees.jpg',
    tag: 'Core Essential',
    link: '/shop/t-shirts',
  },
  {
    title: 'Heavy Fleece Hoodies',
    subtitle: '450 GSM Heavy Fleece',
    slug: 'hoodies',
    img: '/images/categories/cat-hoodies.jpg',
    tag: 'Best Seller',
    link: '/shop/hoodies',
  },
  {
    title: 'Vintage Knit Crewnecks',
    subtitle: '450 GSM Loopback Fleece',
    slug: 'crewnecks',
    img: '/images/categories/cat-crewneck.jpg',
    tag: 'New Capsule',
    link: '/shop/crewnecks',
  },
  {
    title: 'Tactical & Tailored Pants',
    subtitle: 'Relaxed Streetwear Silhouette',
    slug: 'pants',
    img: '/images/categories/cat-pants.jpg',
    tag: 'Trending Now',
    link: '/shop/pants',
  },
  {
    title: 'Raw Hem Sweat Shorts',
    subtitle: '450 GSM Custom Fleece',
    slug: 'shorts',
    img: '/images/categories/cat-shorts.jpg',
    tag: 'Summer Drop',
    link: '/shop/shorts',
  },
  {
    title: 'Hats & Daily Accessories',
    subtitle: 'Caps, Beanies & Bags',
    slug: 'hats',
    img: '/images/products/cap-minimal-1.jpg',
    tag: 'New Drop',
    link: '/shop/hats',
  },
];

export default function CategoryTiles() {
  return (
    <section className="bg-brandWarmIvory py-20 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-300 gap-4">
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Curated Collections
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
              Shop By Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm uppercase tracking-wider text-brandBlack font-bold hover:text-brandRed flex items-center gap-1.5 transition-colors"
          >
            <span>View All</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link || `/shop/${cat.slug}`}
              className="group relative h-[440px] overflow-hidden bg-brandBlack shadow-md block"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.12] group-hover:scale-105 group-hover:brightness-[0.60] transition-all duration-700 ease-out"
              />
              {/* Luxury gradient shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/30 to-transparent flex flex-col justify-end p-7">
                <span className="text-sm uppercase tracking-wider text-brandGold font-bold mb-1.5 block">
                  {cat.tag} • {cat.subtitle}
                </span>
                <h3 className="text-2xl font-bold uppercase text-white tracking-wider font-serif">
                  {cat.title}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-sm uppercase tracking-wider text-neutral-200 font-semibold group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}