import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '../components/common/Reveal';

const looks = [
  {
    id: 'look-01',
    title: 'Look 01 // Monochrome Streetwear',
    subtitle: 'Heavyweight Fleece Hoodie & Cargo Pants',
    image: '/images/categories/cat-hoodies.jpg',
    tags: [
      { name: '450 GSM French Terry Pullover', category: 'Hoodies', price: 95 },
      { name: 'Tapered Cargo Utility Pants', category: 'Pants', price: 110 }
    ]
  },
  {
    id: 'look-02',
    title: 'Look 02 // Clean Minimalist Fit',
    subtitle: 'Washed Boxy Tee & Relaxed Shorts',
    image: '/images/categories/cat-tees.jpg',
    tags: [
      { name: '280 GSM Boxy Combed Tee', category: 'T-Shirts', price: 45 },
      { name: 'Heavy Fleece Relaxed Shorts', category: 'Shorts', price: 55 }
    ]
  },
  {
    id: 'look-04',
    title: 'Look 04 // Tailored Industrial Fit',
    subtitle: 'Charcoal Heavyweight Hoodie & Pleated Trousers',
    image: '/images/categories/cat-pants.jpg',
    tags: [
      { name: '450 GSM Tonal Loopback Hoodie', category: 'Hoodies', price: 95 },
      { name: 'Pleated Relaxed Street Trousers', category: 'Pants', price: 115 }
    ]
  },
  {
    id: 'look-03',
    title: 'Look 03 // Warm Mustard Atelier Series',
    subtitle: '450 GSM Loopback Fleece & Relaxed Wide-Leg Trousers',
    image: '/images/lookbook/look-3.jpg',
    tags: [
      { name: 'Warm Ochre Heavyweight Fleece Hoodie', category: 'Hoodies', price: 94 },
      { name: 'Relaxed Wide-Leg Fleece Sweatpants', category: 'Pants', price: 85 }
    ]
  },

  {
    id: 'look-05',
    title: 'Look 05 // Washed Monochrome Core',
    subtitle: 'Washed Charcoal Black Hoodie & Tapered Cargos',
    image: '/images/lookbook/look-5.jpg',
    tags: [
      { name: 'Heavyweight Washed Boxy Pullover Hoodie', category: 'Hoodies', price: 95 },
      { name: 'Relaxed Tapered Cargo Utility Pants', category: 'Pants', price: 110 }
    ]
  },
  {
    id: 'look-06',
    title: 'Look 06 // Dual Silhouette Street Duo',
    subtitle: 'Matching Oversized Hoodies & Relaxed Layering',
    image: '/images/lookbook/look-6.jpg',
    tags: [
      { name: 'Cropped Boxy Heavyweight Hoodie', category: 'Hoodies', price: 90 },
      { name: 'Oversized Streetwear Essential Hoodie', category: 'Hoodies', price: 92 }
    ]
  },
  {
    id: 'look-07',
    title: 'Look 07 // Women\'s Atelier Oversized Drape',
    subtitle: '450 GSM Brushed Fleece & High-Waisted Sweat Shorts',
    image: '/images/lookbook/look-7.jpg',
    tags: [
      { name: 'Cropped Boxy Heavyweight Hoodie', category: 'Hoodies', price: 90 },
      { name: 'High-Waisted Relaxed Fleece Sweat Shorts', category: 'Shorts', price: 58 }
    ]
  },
  {
    id: 'look-08',
    title: 'Look 08 // Desert Camel & Tailored Streetwear',
    subtitle: '300 GSM Organic Combed Tee & Pleated Trousers',
    image: '/images/lookbook/look-8.jpg',
    tags: [
      { name: 'Desert Sand Camel Oversized Tee', category: 'T-Shirts', price: 46 },
      { name: 'Pleated Relaxed Street Trousers', category: 'Pants', price: 115 }
    ]
  },
  {
    id: 'look-09',
    title: 'Look 09 // Tactical Cargo & Chain Detail',
    subtitle: 'Heavy Duty Articulated Twill & Boxy Minimal Tee',
    image: '/images/lookbook/look-9.jpg',
    tags: [
      { name: 'Tactical Straight-Leg Cargo Pants', category: 'Pants', price: 105 },
      { name: 'Heavyweight Oversized Boxy Tee', category: 'T-Shirts', price: 45 }
    ]
  },
  {
    id: 'look-10',
    title: 'Look 10 // Summer Heavy Fleece & Olive Layer',
    subtitle: 'Washed Olive Green Shorts & Vintage Enzyme Tee',
    image: '/images/lookbook/look-10.jpg',
    tags: [
      { name: 'Washed Olive Heavy Fleece Sweat Shorts', category: 'Shorts', price: 56 },
      { name: 'Vintage Enzyme-Washed Relaxed Tee', category: 'T-Shirts', price: 45 }
    ]
  }
];

export default function Lookbook() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brandGold font-bold">
          Seasonal Lookbook
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight font-serif text-brandBlack">
          Style Guide & Looks
        </h1>
        <p className="text-base text-neutral-600">
          Explore curated outfits, relaxed streetwear styling, and shoppable essentials.
        </p>
      </div>

      {/* Looks Grid with Smooth Scroll Reveal */}
      <div className="space-y-24">
        {looks.map((look, index) => (
          <Reveal key={look.id}>
            <div
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-10 items-center`}
            >
              {/* Look Image with Hover Depth */}
              <div className="w-full lg:w-7/12 aspect-[4/5] bg-brandBlack overflow-hidden relative group">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brandBlack/85 backdrop-blur-sm text-white px-3.5 py-1.5 text-sm uppercase font-bold tracking-wider">
                  Capsule Series
                </div>
              </div>

              {/* Look Details & Shoppable Tags (FR-A04) */}
              <div className="w-full lg:w-5/12 space-y-6">
                <div>
                  <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">
                    {look.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
                    {look.title}
                  </h2>
                </div>

                <div className="border-t border-neutral-200 pt-6 space-y-4">
                  <span className="text-sm uppercase tracking-wider font-bold text-brandBlack block">
                    Featured In This Look:
                  </span>

                  <div className="space-y-3">
                    {look.tags.map((tag, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-4 bg-brandWarmIvory border border-neutral-200 flex items-center justify-between hover:border-black transition-colors"
                      >
                        <div>
                          <h3 className="text-base font-bold uppercase text-brandBlack">{tag.name}</h3>
                          <span className="text-sm uppercase tracking-wider text-neutral-600 font-medium">
                            {tag.category} • ${tag.price}
                          </span>
                        </div>
                        <Link
                          to={`/shop/${tag.category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="px-4 py-2 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack flex items-center gap-1.5 shadow-sm"
                        >
                          Shop Piece <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
