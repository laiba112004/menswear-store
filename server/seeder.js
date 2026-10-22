const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleProducts = [
  {
    title: 'Heavyweight Oversized Boxy Tee',
    description: 'Crafted from 280 GSM premium organic combed cotton. Features a relaxed drop-shoulder streetwear cut with ribbed collar detailing that retains shape.',
    price: 45,
    comparePrice: 60,
    category: 'T-Shirts',
    gender: 'Men',
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'
    ],
    variants: [
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'S', stock: 15, sku: 'TS-BLK-S' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'M', stock: 20, sku: 'TS-BLK-M' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'L', stock: 12, sku: 'TS-BLK-L' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'XL', stock: 8, sku: 'TS-BLK-XL' },
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'M', stock: 10, sku: 'TS-IVR-M' },
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'L', stock: 14, sku: 'TS-IVR-L' }
    ]
  },
  {
    title: 'Raw French Terry Pullover Hoodie',
    description: '450 GSM ultra-heavyweight cotton fleece. Custom double-layered hood without drawstrings for a clean, minimalist silhouette with collegiate ribbed cuffs.',
    price: 95,
    comparePrice: 120,
    category: 'Hoodies',
    gender: 'Men',
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80'
    ],
    variants: [
      { color: 'Charcoal Grey', colorCode: '#2B2B2B', size: 'M', stock: 8, sku: 'HD-CHR-M' },
      { color: 'Charcoal Grey', colorCode: '#2B2B2B', size: 'L', stock: 15, sku: 'HD-CHR-L' },
      { color: 'Charcoal Grey', colorCode: '#2B2B2B', size: 'XL', stock: 6, sku: 'HD-CHR-XL' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'M', stock: 12, sku: 'HD-BLK-M' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'L', stock: 18, sku: 'HD-BLK-L' }
    ]
  },
  {
    title: 'Varsity Crest Loopback Crewneck',
    description: 'Classic collegiate aesthetic infused with modern brutalist typography. Features durable flatlock stitching and pre-shrunk Japanese loopback cotton.',
    price: 80,
    comparePrice: 95,
    category: 'Crewnecks',
    gender: 'Men',
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80'
    ],
    variants: [
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'S', stock: 5, sku: 'CR-BLK-S' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'M', stock: 10, sku: 'CR-BLK-M' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'L', stock: 9, sku: 'CR-BLK-L' }
    ]
  },
  {
    title: 'Relaxed Tapered Cargo Utility Pants',
    description: 'Heavy duty tactical cotton twill with deep dual flap pockets, darted knee joints for mobility, and adjustable ankle cinch toggles.',
    price: 110,
    comparePrice: 135,
    category: 'Pants',
    gender: 'Men',
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&q=80'
    ],
    variants: [
      { color: 'Charcoal', colorCode: '#2B2B2B', size: 'M', stock: 12, sku: 'PT-CHR-M' },
      { color: 'Charcoal', colorCode: '#2B2B2B', size: 'L', stock: 8, sku: 'PT-CHR-L' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'M', stock: 15, sku: 'PT-BLK-M' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'L', stock: 10, sku: 'PT-BLK-L' }
    ]
  },
  {
    title: 'Structure Heavy Fleece Relaxed Shorts',
    description: 'Custom cut heavyweight streetwear shorts with deep side seam pockets, thick elastic waistband, and raw hem detail.',
    price: 55,
    comparePrice: 70,
    category: 'Shorts',
    gender: 'Men',
    isNewArrival: false,
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
    ],
    variants: [
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'S', stock: 8, sku: 'SH-BLK-S' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'M', stock: 14, sku: 'SH-BLK-M' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'L', stock: 10, sku: 'SH-BLK-L' }
    ]
  },
  {
    title: 'Cropped Boxy Heavyweight Hoodie',
    description: '450 GSM ultra-dense French Terry tailored with a high cropped waistband and drop shoulders. Engineered for an effortless unisex streetwear drape.',
    price: 90,
    comparePrice: 115,
    category: 'Hoodies',
    gender: 'Women',
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'S', stock: 12, sku: 'CR-W-BLK-S' },
      { color: 'Washed Black', colorCode: '#1A1A1A', size: 'M', stock: 16, sku: 'CR-W-BLK-M' },
      { color: 'Vintage Ivory', colorCode: '#F4F1EA', size: 'S', stock: 10, sku: 'CR-W-IVR-S' }
    ]
  },
  {
    title: 'Oversized Minimalist Heavy Tee',
    description: '280 GSM combed cotton featuring wide sleeves and relaxed chest width. Premium streetwear standard.',
    price: 45,
    comparePrice: 55,
    category: 'T-Shirts',
    gender: 'Women',
    isNewArrival: true,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'XS', stock: 10, sku: 'WT-BLK-XS' },
      { color: 'Pitch Black', colorCode: '#0B0B0B', size: 'S', stock: 15, sku: 'WT-BLK-S' }
    ]
  }
];

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('Sample Streetwear Products Added Successfully to Atlas!');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

seedData();