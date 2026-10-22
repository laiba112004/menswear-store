import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Heavy Fleece Hoodies',
    category: 'Hoodies',
    img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
  },
  {
    title: 'Boxy Combed Tees',
    category: 'T-Shirts',
    img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
  },
  {
    title: 'Tactical Utility Pants',
    category: 'Pants',
    img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
  },
];

export default function CategoryTiles() {
  return (
    <section className="bg-brandWarmIvory py-16 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-widest text-brandGrey font-bold">
            Themed Capsules
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
            Shop By Silhouette
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${cat.category}`}
              className="group relative h-96 overflow-hidden bg-brandBlack"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brandBlack/85 via-transparent to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold uppercase text-white tracking-wider font-serif">
                  {cat.title}
                </h3>
                <span className="text-xs uppercase tracking-widest text-brandGold mt-1">
                  Explore Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}