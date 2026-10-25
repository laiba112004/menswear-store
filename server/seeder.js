const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const sampleProducts = [
  // ==========================================
  // 1. T-SHIRTS (T-Shirts Collection)
  // ==========================================
  {
    title: 'Heavyweight Oversized Boxy Tee',
    description: 'Crafted from 280 GSM premium organic combed cotton. Features a relaxed drop-shoulder streetwear cut with ribbed collar detailing that retains shape.',
    price: 45,
    comparePrice: 60,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/tee-boxy-1.jpg',
      '/images/products/tee-boxy-2.jpg',
      '/images/products/tee-boxy-3.jpg'
    ],
    variants: [
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'S', stock: 15, sku: 'TS-BLK-S' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'M', stock: 20, sku: 'TS-BLK-M' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'L', stock: 12, sku: 'TS-BLK-L' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'XL', stock: 8, sku: 'TS-BLK-XL' }
    ]
  },
  {
    title: 'Royal Cobalt Blue Boxy Streetwear Tee',
    description: 'Vibrant cobalt blue 280 GSM heavy combed jersey. Designed with dropped shoulders, oversized boxy proportions, and durable double-needle stitching.',
    price: 48,
    comparePrice: 65,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/tee-cobalt-blue-1.jpg',
      '/images/products/tee-cobalt-blue-2.jpg',
      '/images/products/tee-cobalt-blue-3.jpg'
    ],
    variants: [
      { color: 'Cobalt Blue', colorCode: '#1D4ED8', size: 'S', stock: 12, sku: 'TS-CBLT-S' },
      { color: 'Cobalt Blue', colorCode: '#1D4ED8', size: 'M', stock: 18, sku: 'TS-CBLT-M' },
      { color: 'Cobalt Blue', colorCode: '#1D4ED8', size: 'L', stock: 14, sku: 'TS-CBLT-L' },
      { color: 'Cobalt Blue', colorCode: '#1D4ED8', size: 'XL', stock: 6, sku: 'TS-CBLT-XL' }
    ]
  },
  {
    title: 'Heavy Combed Sand Camel Minimalist Tee',
    description: '280 GSM organic carded jersey in an earthy sand camel tone. Boxy streetwear fit, reinforced ribbed crew neckline, and breathable heavyweight hand feel.',
    price: 46,
    comparePrice: 62,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/tee-sand-camel-1.jpg',
      '/images/products/tee-sand-camel-2.jpg',
      '/images/products/tee-sand-camel-3.jpg'
    ],
    variants: [
      { color: 'Sand Camel', colorCode: '#C19A6B', size: 'S', stock: 10, sku: 'TS-SND-S' },
      { color: 'Sand Camel', colorCode: '#C19A6B', size: 'M', stock: 16, sku: 'TS-SND-M' },
      { color: 'Sand Camel', colorCode: '#C19A6B', size: 'L', stock: 14, sku: 'TS-SND-L' },
      { color: 'Sand Camel', colorCode: '#C19A6B', size: 'XL', stock: 8, sku: 'TS-SND-XL' }
    ]
  },
  {
    title: 'Dusty Blue Drop-Shoulder Relaxed Tee',
    description: 'Pigment-dyed 260 GSM combed cotton in soothing dusty blue. Softened with enzyme wash for an authentic broken-in vintage feel.',
    price: 45,
    comparePrice: 58,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: false,
    images: [
      '/images/products/tee-dusty-blue-1.jpg',
      '/images/products/tee-dusty-blue-2.jpg',
      '/images/products/tee-dusty-blue-3.jpg'
    ],
    variants: [
      { color: 'Dusty Blue', colorCode: '#5B7C99', size: 'S', stock: 12, sku: 'TS-DBL-S' },
      { color: 'Dusty Blue', colorCode: '#5B7C99', size: 'M', stock: 15, sku: 'TS-DBL-M' },
      { color: 'Dusty Blue', colorCode: '#5B7C99', size: 'L', stock: 10, sku: 'TS-DBL-L' }
    ]
  },
  {
    title: 'Vintage Sun-Faded Black Boxy Tee',
    description: 'Acid-washed 280 GSM heavyweight cotton with subtle distressed collar accents. Raw relaxed drape perfect for layered streetwear aesthetics.',
    price: 48,
    comparePrice: 65,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/tee-vintage-black-1.jpg',
      '/images/products/tee-vintage-black-2.jpg',
      '/images/products/tee-vintage-black-3.jpg'
    ],
    variants: [
      { color: 'Vintage Black', colorCode: '#222222', size: 'S', stock: 14, sku: 'TS-VNT-S' },
      { color: 'Vintage Black', colorCode: '#222222', size: 'M', stock: 18, sku: 'TS-VNT-M' },
      { color: 'Vintage Black', colorCode: '#222222', size: 'L', stock: 15, sku: 'TS-VNT-L' },
      { color: 'Vintage Black', colorCode: '#222222', size: 'XL', stock: 7, sku: 'TS-VNT-XL' }
    ]
  },
  {
    title: 'Atelier Studio Graphic Heavy Combed Tee',
    description: 'High-density typographic chest screenprint on 280 GSM luxury jersey. Clean back typography detailing the Atelier construction manifesto.',
    price: 48,
    comparePrice: 62,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/tee-graphic-men-1.jpg',
      '/images/products/tee-boxy-2.jpg'
    ],
    variants: [
      { color: 'Pitch Black', colorCode: '#111111', size: 'S', stock: 10, sku: 'TS-GRP-S' },
      { color: 'Pitch Black', colorCode: '#111111', size: 'M', stock: 15, sku: 'TS-GRP-M' },
      { color: 'Pitch Black', colorCode: '#111111', size: 'L', stock: 12, sku: 'TS-GRP-L' }
    ]
  },

  // ==========================================
  // 2. HOODIES (Hoodies Collection)
  // ==========================================
  {
    title: 'Forest Green Heavyweight French Terry Hoodie',
    description: '450 GSM ultra-heavyweight combed French Terry fleece in deep evergreen forest hue. Double-layered crossover hood without drawstrings, dropped shoulders, and collegiate 2x2 ribbed cuffs.',
    price: 98,
    comparePrice: 125,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hoodie-forest-green-1.jpg',
      '/images/products/hoodie-forest-green-2.jpg',
      '/images/products/hoodie-forest-green-3.jpg'
    ],
    variants: [
      { color: 'Forest Green', colorCode: '#1E3A2F', size: 'S', stock: 10, sku: 'HD-GRN-S' },
      { color: 'Forest Green', colorCode: '#1E3A2F', size: 'M', stock: 18, sku: 'HD-GRN-M' },
      { color: 'Forest Green', colorCode: '#1E3A2F', size: 'L', stock: 15, sku: 'HD-GRN-L' },
      { color: 'Forest Green', colorCode: '#1E3A2F', size: 'XL', stock: 0, sku: 'HD-GRN-XL' }
    ]
  },
  {
    title: 'Terracotta Rust Heavyweight Pullover Hoodie',
    description: '450 GSM luxury brushed cotton fleece in vibrant terracotta rust. Built with seamless shoulder drape, deep front kangaroo pocket, and heavy structured ribbing.',
    price: 98,
    comparePrice: 125,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hoodie-terracotta-1.jpg',
      '/images/products/hoodie-terracotta-2.jpg',
      '/images/products/hoodie-terracotta-3.jpg'
    ],
    variants: [
      { color: 'Terracotta Rust', colorCode: '#B35432', size: 'S', stock: 8, sku: 'HD-TRC-S' },
      { color: 'Terracotta Rust', colorCode: '#B35432', size: 'M', stock: 16, sku: 'HD-TRC-M' },
      { color: 'Terracotta Rust', colorCode: '#B35432', size: 'L', stock: 12, sku: 'HD-TRC-L' },
      { color: 'Terracotta Rust', colorCode: '#B35432', size: 'XL', stock: 6, sku: 'HD-TRC-XL' }
    ]
  },
  {
    title: 'Vintage Ivory Heavyweight Pullover Hoodie',
    description: '450 GSM custom-milled brushed French Terry loopback cotton in warm off-white ivory. Double-layered hood without drawstrings for an effortless architectural drape.',
    price: 95,
    comparePrice: 120,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hoodie-ivory-1.jpg',
      '/images/products/hoodie-ivory-2.jpg',
      '/images/products/hoodie-ivory-3.jpg'
    ],
    variants: [
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'S', stock: 10, sku: 'HD-IVR-S' },
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'M', stock: 16, sku: 'HD-IVR-M' },
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'L', stock: 14, sku: 'HD-IVR-L' },
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'XL', stock: 8, sku: 'HD-IVR-XL' }
    ]
  },
  {
    title: 'Washed Black Heavyweight Boxy Pullover Hoodie',
    description: '450 GSM ultra-heavyweight cotton fleece in washed charcoal black. Features double-layered hood without drawstrings, dropped shoulders, and collegiate ribbed cuffs.',
    price: 95,
    comparePrice: 125,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: false,
    images: [
      '/images/products/hoodie-washed-black-1.jpg',
      '/images/products/hoodie-washed-black-2.jpg',
      '/images/products/hoodie-washed-black-3.jpg'
    ],
    variants: [
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'S', stock: 12, sku: 'HD-WSH-S' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'M', stock: 18, sku: 'HD-WSH-M' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'L', stock: 15, sku: 'HD-WSH-L' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'XL', stock: 0, sku: 'HD-WSH-XL' }
    ]
  },
  {
    title: 'Mustard Ochre Heavyweight Fleece Hoodie',
    description: '450 GSM custom-milled brushed cotton fleece in warm mustard ochre. Features relaxed drop-shoulder cut, roomy crossover hood, and clean front pouch pocket.',
    price: 95,
    comparePrice: 120,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hoodie-mustard-1.jpg',
      '/images/products/hoodie-mustard-2.jpg',
      '/images/products/hoodie-mustard-3.jpg'
    ],
    variants: [
      { color: 'Mustard Ochre', colorCode: '#C99738', size: 'S', stock: 8, sku: 'HD-MST-S' },
      { color: 'Mustard Ochre', colorCode: '#C99738', size: 'M', stock: 15, sku: 'HD-MST-M' },
      { color: 'Mustard Ochre', colorCode: '#C99738', size: 'L', stock: 12, sku: 'HD-MST-L' },
      { color: 'Mustard Ochre', colorCode: '#C99738', size: 'XL', stock: 6, sku: 'HD-MST-XL' }
    ]
  },
  {
    title: 'Raw Hem Stonewash Heavy Hoodie',
    description: 'Custom stone-washed 450 GSM French Terry with raw cut hem detailing. Relaxed oversized silhouette with clean structured crossover hood.',
    price: 92,
    comparePrice: 118,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: false,
    images: [
      '/images/products/hoodie-raw-1.jpg',
      '/images/products/hoodie-raw-2.jpg',
      '/images/products/hoodie-raw-3.jpg'
    ],
    variants: [
      { color: 'Stonewash Grey', colorCode: '#737373', size: 'S', stock: 8, sku: 'HD-RAW-S' },
      { color: 'Stonewash Grey', colorCode: '#737373', size: 'M', stock: 14, sku: 'HD-RAW-M' },
      { color: 'Stonewash Grey', colorCode: '#737373', size: 'L', stock: 12, sku: 'HD-RAW-L' }
    ]
  },
  {
    title: 'Tonal Minimalist Drop-Shoulder Pullover Hoodie',
    description: 'Subtle tonal stitching on 450 GSM organic fleece. Designed for clean streetwear pairing with dark trousers or relaxed denim.',
    price: 94,
    comparePrice: 120,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hoodie-tonal-men-1.jpg',
      '/images/products/hoodie-washed-black-2.jpg'
    ],
    variants: [
      { color: 'Charcoal Black', colorCode: '#1F1F1F', size: 'S', stock: 10, sku: 'HD-TNL-S' },
      { color: 'Charcoal Black', colorCode: '#1F1F1F', size: 'M', stock: 16, sku: 'HD-TNL-M' },
      { color: 'Charcoal Black', colorCode: '#1F1F1F', size: 'L', stock: 14, sku: 'HD-TNL-L' }
    ]
  },

  // ==========================================
  // 3. CREWNECKS (Crewnecks Collection)
  // ==========================================
  {
    title: 'Studio Loopback Fleece Minimal Crewneck',
    description: '450 GSM premium pre-shrunk loopback fleece in pristine white. Features durable flatlock stitching, dropped shoulder line, and heavy 2x2 ribbed collar.',
    price: 82,
    comparePrice: 100,
    category: 'Crewnecks',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/crewneck-varsity-1.jpg',
      '/images/products/crewneck-varsity-2.jpg',
      '/images/products/crewneck-varsity-3.jpg'
    ],
    variants: [
      { color: 'Clean White', colorCode: '#FFFFFF', size: 'S', stock: 8, sku: 'CR-WHT-S' },
      { color: 'Clean White', colorCode: '#FFFFFF', size: 'M', stock: 16, sku: 'CR-WHT-M' },
      { color: 'Clean White', colorCode: '#FFFFFF', size: 'L', stock: 12, sku: 'CR-WHT-L' },
      { color: 'Clean White', colorCode: '#FFFFFF', size: 'XL', stock: 6, sku: 'CR-WHT-XL' }
    ]
  },
  {
    title: 'Varsity Athletic Heavyweight Crewneck',
    description: '450 GSM loopback cotton sweatshirt in timeless athletic silhouette. Reinforced bound crew neck and double needle stitching throughout.',
    price: 85,
    comparePrice: 105,
    category: 'Crewnecks',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/crewneck-varsity-2.jpg',
      '/images/products/crewneck-varsity-1.jpg',
      '/images/products/crewneck-varsity-3.jpg'
    ],
    variants: [
      { color: 'Athletic Grey', colorCode: '#A3A3A3', size: 'S', stock: 10, sku: 'CR-GRY-S' },
      { color: 'Athletic Grey', colorCode: '#A3A3A3', size: 'M', stock: 15, sku: 'CR-GRY-M' },
      { color: 'Athletic Grey', colorCode: '#A3A3A3', size: 'L', stock: 12, sku: 'CR-GRY-L' }
    ]
  },
  {
    title: 'Vintage Slub Terry Heavyweight Crewneck',
    description: 'Crafted from textured slub French Terry with an ultra-comfortable inner weave. Dropped shoulder seam and relaxed boxy cut.',
    price: 84,
    comparePrice: 105,
    category: 'Crewnecks',
    gender: 'Men',
    isNewArrival: false,
    images: [
      '/images/products/crewneck-varsity-3.jpg',
      '/images/products/crewneck-varsity-1.jpg'
    ],
    variants: [
      { color: 'Sandstone', colorCode: '#D2B48C', size: 'S', stock: 8, sku: 'CR-SND-S' },
      { color: 'Sandstone', colorCode: '#D2B48C', size: 'M', stock: 14, sku: 'CR-SND-M' },
      { color: 'Sandstone', colorCode: '#D2B48C', size: 'L', stock: 10, sku: 'CR-SND-L' }
    ]
  },

  // ==========================================
  // 4. PANTS (Pants Collection)
  // ==========================================
  {
    title: 'Relaxed Tactical Grey Cargo Pants',
    description: 'Heavy duty tactical cotton twill in urban slate grey. Features spacious dual side cargo flap pockets, articulated knee joints for unrestricted movement, and drawstring cinch waist.',
    price: 115,
    comparePrice: 145,
    category: 'Pants',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/pants-cargo-grey-1.jpg',
      '/images/products/pants-cargo-2.jpg'
    ],
    variants: [
      { color: 'Slate Grey', colorCode: '#808080', size: 'S', stock: 10, sku: 'PT-GRY-S' },
      { color: 'Slate Grey', colorCode: '#808080', size: 'M', stock: 16, sku: 'PT-GRY-M' },
      { color: 'Slate Grey', colorCode: '#808080', size: 'L', stock: 12, sku: 'PT-GRY-L' },
      { color: 'Slate Grey', colorCode: '#808080', size: 'XL', stock: 6, sku: 'PT-GRY-XL' }
    ]
  },
  {
    title: 'Tailored Slim-Straight Khaki Chinos',
    description: 'Premium stretch-cotton twill chinos in versatile khaki tan. Clean flat front tailoring, discreet coin pocket, and tapered cuffs designed to pair effortlessly with low-top sneakers.',
    price: 105,
    comparePrice: 135,
    category: 'Pants',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/pants-chino-khaki-1.jpg',
      '/images/products/pants-cargo-1.jpg'
    ],
    variants: [
      { color: 'Khaki Tan', colorCode: '#C2A382', size: 'S', stock: 10, sku: 'PT-KHK-S' },
      { color: 'Khaki Tan', colorCode: '#C2A382', size: 'M', stock: 18, sku: 'PT-KHK-M' },
      { color: 'Khaki Tan', colorCode: '#C2A382', size: 'L', stock: 14, sku: 'PT-KHK-L' },
      { color: 'Khaki Tan', colorCode: '#C2A382', size: 'XL', stock: 8, sku: 'PT-KHK-XL' }
    ]
  },
  {
    title: 'Sage Green Relaxed Utility Cargo Trousers',
    description: 'Durable military cotton ripstop in muted sage green. Featuring ergonomic 6-pocket cargo layout, adjustable hem drawstrings, and reinforced seat panel.',
    price: 118,
    comparePrice: 145,
    category: 'Pants',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/pants-sage-green-1.jpg',
      '/images/products/pants-sage-green-2.jpg',
      '/images/products/pants-sage-green-3.jpg'
    ],
    variants: [
      { color: 'Sage Green', colorCode: '#77815C', size: 'S', stock: 8, sku: 'PT-SGE-S' },
      { color: 'Sage Green', colorCode: '#77815C', size: 'M', stock: 14, sku: 'PT-SGE-M' },
      { color: 'Sage Green', colorCode: '#77815C', size: 'L', stock: 12, sku: 'PT-SGE-L' }
    ]
  },
  {
    title: 'Minimalist Tactical Cargo Pants - Pitch Black',
    description: 'Triple-stitched technical twill with matte black tactical hardware. Features deep expandable gusset pockets and an elasticated waistband with drawstring.',
    price: 112,
    comparePrice: 140,
    category: 'Pants',
    gender: 'Men',
    isNewArrival: false,
    images: [
      '/images/products/pants-cargo-1.jpg',
      '/images/products/pants-cargo-2.jpg',
      '/images/products/pants-cargo-3.jpg'
    ],
    variants: [
      { color: 'Pitch Black', colorCode: '#111111', size: 'S', stock: 12, sku: 'PT-BLK-S' },
      { color: 'Pitch Black', colorCode: '#111111', size: 'M', stock: 18, sku: 'PT-BLK-M' },
      { color: 'Pitch Black', colorCode: '#111111', size: 'L', stock: 15, sku: 'PT-BLK-L' },
      { color: 'Pitch Black', colorCode: '#111111', size: 'XL', stock: 6, sku: 'PT-BLK-XL' }
    ]
  },
  {
    title: 'Pleated Relaxed Wide-Leg Trousers',
    description: 'Architectural front pleats crafted in high-drape cotton-viscose blend. Deep front slash pockets and modern relaxed straight-leg profile.',
    price: 120,
    comparePrice: 150,
    category: 'Pants',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/pants-pleated-men-1.jpg',
      '/images/products/pants-cargo-1.jpg'
    ],
    variants: [
      { color: 'Midnight Black', colorCode: '#0D0D0D', size: 'S', stock: 7, sku: 'PT-PLT-S' },
      { color: 'Midnight Black', colorCode: '#0D0D0D', size: 'M', stock: 15, sku: 'PT-PLT-M' },
      { color: 'Midnight Black', colorCode: '#0D0D0D', size: 'L', stock: 10, sku: 'PT-PLT-L' }
    ]
  },

  // ==========================================
  // 5. SHORTS (Shorts Collection)
  // ==========================================
  {
    title: 'Deep Burgundy Raw Hem Sweat Shorts',
    description: '450 GSM heavyweight cotton fleece shorts in deep burgundy maroon. Features deep side seam pockets, relaxed raw hem finish, and thick elastic waistband with drawstrings.',
    price: 58,
    comparePrice: 75,
    category: 'Shorts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/shorts-burgundy-1.jpg',
      '/images/products/shorts-burgundy-2.jpg',
      '/images/products/shorts-burgundy-3.jpg'
    ],
    variants: [
      { color: 'Burgundy Wine', colorCode: '#6A1B29', size: 'S', stock: 10, sku: 'SH-BRG-S' },
      { color: 'Burgundy Wine', colorCode: '#6A1B29', size: 'M', stock: 16, sku: 'SH-BRG-M' },
      { color: 'Burgundy Wine', colorCode: '#6A1B29', size: 'L', stock: 12, sku: 'SH-BRG-L' }
    ]
  },
  {
    title: 'Washed Olive Heavy Fleece Sweat Shorts',
    description: '450 GSM ultra-dense French Terry fleece shorts in military washed olive green. Styled with raw cut leg openings, elastic drawstring waistband, and reinforced side pockets.',
    price: 56,
    comparePrice: 70,
    category: 'Shorts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/shorts-olive-1.jpg',
      '/images/products/shorts-olive-2.jpg',
      '/images/products/shorts-olive-3.jpg'
    ],
    variants: [
      { color: 'Olive Green', colorCode: '#556B2F', size: 'S', stock: 12, sku: 'SH-OLV-S' },
      { color: 'Olive Green', colorCode: '#556B2F', size: 'M', stock: 18, sku: 'SH-OLV-M' },
      { color: 'Olive Green', colorCode: '#556B2F', size: 'L', stock: 14, sku: 'SH-OLV-L' }
    ]
  },
  {
    title: 'Tactical Multi-Pocket Cargo Shorts',
    description: 'Durable cotton twill utility shorts with reinforced twin bellows pockets, custom metal D-ring attachment, and heavy drawstring waist.',
    price: 64,
    comparePrice: 80,
    category: 'Shorts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/shorts-cargo-1.jpg',
      '/images/products/shorts-cargo-2.jpg',
      '/images/products/shorts-cargo-3.jpg'
    ],
    variants: [
      { color: 'Stealth Black', colorCode: '#1A1A1A', size: 'S', stock: 10, sku: 'SH-CRG-S' },
      { color: 'Stealth Black', colorCode: '#1A1A1A', size: 'M', stock: 15, sku: 'SH-CRG-M' },
      { color: 'Stealth Black', colorCode: '#1A1A1A', size: 'L', stock: 12, sku: 'SH-CRG-L' }
    ]
  },
  {
    title: 'French Terry Everyday Lounge Shorts',
    description: 'Pre-shrunk 400 GSM loopback cotton fleece with clean overlocked seams and metal-tipped drawstring cords.',
    price: 54,
    comparePrice: 68,
    category: 'Shorts',
    gender: 'Men',
    isNewArrival: false,
    images: [
      '/images/products/shorts-fleece-1.jpg',
      '/images/products/shorts-cargo-2.jpg'
    ],
    variants: [
      { color: 'Heather Charcoal', colorCode: '#333333', size: 'S', stock: 8, sku: 'SH-FLC-S' },
      { color: 'Heather Charcoal', colorCode: '#333333', size: 'M', stock: 14, sku: 'SH-FLC-M' },
      { color: 'Heather Charcoal', colorCode: '#333333', size: 'L', stock: 10, sku: 'SH-FLC-L' }
    ]
  },

  // ==========================================
  // 6. HATS (Hats Collection)
  // ==========================================
  {
    title: 'Heavyweight Washed Twill Dad Cap',
    description: 'Unstructured 6-panel silhouette crafted from 100% durable washed cotton twill. Features clean tonal embroidery and custom matte buckle closure.',
    price: 38,
    comparePrice: 50,
    category: 'Hats',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/cap-minimal-1.jpg',
      '/images/products/cap-minimal-2.jpg'
    ],
    variants: [
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'One Size', stock: 25, sku: 'CP-BLK-OS' }
    ]
  },
  {
    title: 'Vintage Distressed 6-Panel Chino Cap',
    description: 'Enzyme-washed heavy chino twill in faded moss green. Curved brim, brass sliding adjuster, and breathable embroidered eyelets.',
    price: 36,
    comparePrice: 48,
    category: 'Hats',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hat-moss-1.jpg',
      '/images/products/cap-minimal-2.jpg'
    ],
    variants: [
      { color: 'Moss Green', colorCode: '#4A5D4E', size: 'One Size', stock: 20, sku: 'CP-MOS-OS' }
    ]
  },
  {
    title: 'Atelier Heavy Ribbed Fisherman Beanie',
    description: '7-gauge fisherman rib knit crafted from a warm wool-cotton blend. Snug architectural watch cap fit that retains tension wear after wear.',
    price: 35,
    comparePrice: 45,
    category: 'Hats',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/hat-beanie-1.jpg'
    ],
    variants: [
      { color: 'Oatmeal Heather', colorCode: '#D8CBB7', size: 'One Size', stock: 30, sku: 'BN-OTM-OS' }
    ]
  },

  // ==========================================
  // 7. ACCESSORIES (Accessories Collection)
  // ==========================================
  {
    title: 'Full-Grain Pebbled Leather Cardholder',
    description: 'Handcrafted from 100% vegetable-tanned full-grain cowhide leather. Houses 4 cards plus central receipt slot with blind debossed Atelier logo.',
    price: 42,
    comparePrice: 55,
    category: 'Accessories',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/accessory-cardholder-1.jpg'
    ],
    variants: [
      { color: 'Matte Black', colorCode: '#111111', size: 'One Size', stock: 30, sku: 'AC-CRD-BLK' }
    ]
  },
  {
    title: '16oz Heavy Cotton Canvas Daily Tote',
    description: 'Ultra-durable 16oz raw natural cotton canvas with reinforced webbing shoulder straps and interior zippered drop pocket.',
    price: 38,
    comparePrice: 50,
    category: 'Accessories',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/accessory-totebag-1.jpg'
    ],
    variants: [
      { color: 'Natural Ecru', colorCode: '#F5F2EB', size: 'One Size', stock: 25, sku: 'AC-TOT-ECR' }
    ]
  },
  {
    title: 'Tactical Cordura Utility Crossbody Sling Bag',
    description: 'Water-resistant 1000D ballistic nylon with YKK matte waterproof zippers, quick-release Cobra-style buckle, and modular webbing loops.',
    price: 58,
    comparePrice: 75,
    category: 'Accessories',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/accessory-slingbag-1.jpg'
    ],
    variants: [
      { color: 'Stealth Black', colorCode: '#141414', size: 'One Size', stock: 20, sku: 'AC-SLG-BLK' }
    ]
  },
  {
    title: 'Solid Sterling Silver Cuban Link Chain',
    description: 'Solid 925 sterling silver 6mm flat curb Cuban link chain necklace with custom laser-engraved Atelier box clasp closure. 55cm length.',
    price: 75,
    comparePrice: 95,
    category: 'Accessories',
    gender: 'Men',
    isNewArrival: true,
    images: [
      '/images/products/accessory-chain-1.jpg'
    ],
    variants: [
      { color: 'Sterling Silver', colorCode: '#C0C0C0', size: 'One Size', stock: 15, sku: 'AC-CHN-SLV' }
    ]
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany({});
    console.log('Cleared all old products from MongoDB.');
    await Product.insertMany(sampleProducts);
    console.log(`Success! Seeded ${sampleProducts.length} menswear streetwear products across all 7 categories: T-Shirts, Hoodies, Crewnecks, Pants, Shorts, Hats, Accessories.`);
    process.exit(0);
  } catch (error) {
    console.error('Error with data sync:', error);
    process.exit(1);
  }
};

seedData();