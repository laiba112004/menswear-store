# ATELIER — Luxury Streetwear & Apparel E-Commerce Platform

A production-grade direct-to-consumer (D2C) luxury streetwear and apparel web platform built with the **MERN Stack** (MongoDB Atlas, Express.js, React.js, Node.js) and **Tailwind CSS**, strictly engineered to satisfy all functional and non-functional specifications of the 15-page architectural document and audit requirements (GF-01 — GF-08).

---

## 🌟 Key Platform Features & Architecture

### 1. Minimalist Editorial Aesthetic & Micro-Interactions
- **Editorial Sliding Underline Navigation:** Desktop navigation links (`All Apparel`, `Hoodies`, `T-Shirts`, `Pants`, `Shorts`, `Lookbook`) feature custom CSS left-to-right sliding underlines with an active route indicator and signature Atelier Gold accent.
- **Buttery Smooth Scroll & Section Reveal:** Full integration of high-performance `IntersectionObserver` via `<Reveal>` wrapper component with `0.75s cubic-bezier(0.16, 1, 0.3, 1)` easing.
- **Dual Back-to-Top Navigation:** 
  1. Luxury dark floating **`TOP ↑`** button appearing smoothly when scrolling past 350px.
  2. Direct **`BACK TO TOP ↑`** button in the footer bottom bar with animated arrow micro-nudge.
- **High-GSM Typography & Color System:** Built on `#0B0B0B` (Pitch Black), `#1A1A1A` (Soft Black), `#F4F1EA` (Warm Ivory), `#C9A227` (Atelier Gold), and `#C8102E` (Deep Accent Red).

### 2. Multi-Angle Product Imagery & Authentic Catalog
- **100% Matching Product Galleries:** Every piece in the catalog features 2 to 3 high-resolution studio shots of the **exact same garment**:
  - `Image 1:` Full silhouette studio presentation
  - `Image 2:` Collar, hood, or neckline craftsmanship close-up
  - `Image 3:` Hem, fleece texture, pocket, or drawstring detail close-up
- **Zero Mismatched Photography:** Purged all stock faces, unrelated clothing, or casual snapshots; all visuals reflect authentic heavyweight French Terry fleece (450 GSM) and combed organic cotton (280–320 GSM).
- **Interactive Lightbox & Hover Zoom:** Seamless click-to-expand fullscreen image viewer (`ProductGallery`) with auto-resetting active image state.

### 3. Dynamic Variant Engine & Real-Time Inventory (FR-P05 & GF-08)
- **Multi-Variant Matrix:** Selectors for Color swatches (`#1A1A1A`, `#F4F1EA`, `#2B2B2B`, `#0B0B0B`) and Sizes (`XS` to `XXL`).
- **Live Inventory States:** Real-time feedback for *In Stock*, *Low Stock (<5 units)*, and *Sold Out*.
- **Back-in-Stock / Notify Me Modal:** When a variant is sold out, the primary CTA automatically transforms into `"Notify Me When Available"`. Submitting an email instantly puts the visitor onto the drop priority list (*"You are on the drop priority list"*).
- **Dynamic Size Guide Modal:** Interactive chart offering exact chest, length, and sleeve measurements with fit guidance.

### 4. Frictionless Shopping Bag & Promotional Engine (FR-S04 & FR-C01)
- **Slide-Over Cart Drawer:** Quick-access shopping drawer with persistent `localStorage` synchronization.
- **Free Shipping Threshold Bar:** Dynamic progress bar showing remainder required to unlock complimentary express courier delivery ($150 threshold).
- **Promotional Voucher Engine:** Real coupon validation for promotional codes including `FIRST10` (10% off entire order).
- **Newsletter Double Opt-in Alert:** Subscribing in the footer immediately surfaces the welcome voucher code (`FIRST10`).

### 5. Curated Capsules, Lookbook & Brand Story
- **6-Tile Curated Category Grid:** Homepage showcase featuring *Heavy Fleece Hoodies*, *Boxy Combed Tees*, *Tactical Cargo Pants*, *Raw Hem Sweat Shorts*, *Women's Atelier Line*, and *Editorial Lookbook*.
- **Interactive Editorial Lookbook:** 6 complete outfits featuring shoppable piece tags with instant category routing and pricing.
- **Brand Story & Workshop Narrative:** Dual-column craftsmanship manifesto detailing 450 GSM French Terry milling, pre-shrinking, and flatlock bar-tack stitching with London studio workshop imagery.

### 6. End-to-End Order & Dispatch Tracking (FR-K06)
- **Guest Checkout Flow:** Multi-step order creation generating verified tracking numbers (`ATL-XXXX-2026`).
- **Live Order Tracking Page (`/track-order`):** Verifies order status (*Processing*, *Dispatched*, *In Transit*, *Delivered*) directly against MongoDB.

### 7. Administrative Command Desk (`/admin`)
- **Order Inspection & Management:** View client orders, shipping addresses, items, and change dispatch statuses in real time.
- **Catalog Management:** Add new pieces, set SKU variants, specify fabric weight, and adjust prices.

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, Axios, React Router v6 |
| **Backend** | Node.js, Express.js (MVC Controller-Route Architecture) |
| **Database** | MongoDB Atlas Cloud Cluster with Mongoose ODM |
| **State Management** | React Context API (`CartContext`, `WishlistContext`, `AuthContext`, `CurrencyContext`) |
| **Typography** | Cinzel (Editorial Serif), Plus Jakarta Sans / Inter (Clean UI Sans) |

---

## 📁 Repository Structure

```
menswear-store/
├── client/
│   ├── public/
│   │   └── images/
│   │       ├── categories/   # 6 Curated collection banner images
│   │       ├── craft/        # Workshop, cutting table, and manifesto photos
│   │       ├── hero/         # High-resolution campaign slide banners
│   │       ├── lookbook/     # 6 Editorial lookbook outfits
│   │       └── products/     # Studio shots and multi-angle detail crops
│   ├── src/
│   │   ├── api/              # Axios instance configured with baseURL
│   │   ├── components/
│   │   │   ├── cart/         # CartDrawer, CartItem
│   │   │   ├── common/       # BackToTop, Reveal, ScrollToTop
│   │   │   ├── home/         # HeroBanner, CategoryTiles, BrandStoryBand, Testimonials, USPBar
│   │   │   ├── layout/       # Navbar, Footer, AnnouncementBar, CookieBanner, SearchModal
│   │   │   └── product/      # ProductCard, ProductGallery, BackInStockModal, SizeGuideModal
│   │   ├── context/          # Cart, Wishlist, Auth, Currency Context Providers
│   │   ├── pages/            # Home, Shop, ProductDetails, Cart, Checkout, Lookbook, About, Admin, etc.
│   │   ├── App.jsx           # Master route table and layout wrapper
│   │   ├── index.css         # Tailwind utilities, smooth scrolling, and keyframe animations
│   │   └── main.jsx          # Entry point with context providers and router
│   └── package.json
├── server/
│   ├── config/               # Database connection (db.js)
│   ├── controllers/          # productController, orderController, authController
│   ├── middleware/           # authMiddleware (JWT verification)
│   ├── models/               # Product.js, Order.js, User.js
│   ├── routes/               # productRoutes, orderRoutes, authRoutes
│   ├── .env                  # Environment variables (PORT, MONGO_URI, JWT_SECRET)
│   ├── seeder.js             # Automated database seeding script (22 luxury items)
│   ├── server.js             # Express server entry point
│   └── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Backend Server Setup
```bash
cd server
npm install
node seeder.js    # Syncs 22 high-end products to MongoDB Atlas
npm run dev       # Starts Express API server on port 5000
```

### 2. Frontend Client Setup
```bash
cd client
npm install
npm run dev       # Starts Vite dev server (typically http://localhost:5173)
```

### 3. Production Build Validation
```bash
cd client
npm run build    
```

---

## 📡 API Directory

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Query products with optional filters (`category`, `gender`, `search`, `sort`) |
| `GET` | `/api/products/:id` | Fetch detailed single product with variants and gallery images |
| `POST` | `/api/products` | Create a new product (Admin authenticated) |
| `POST` | `/api/orders` | Create guest/user order with items, shipping info, and tracking code |
| `GET` | `/api/orders/:trackingNumber` | Track real-time order status and item dispatch info |
| `GET` | `/api/orders` | List all orders for Admin command dashboard |
| `PUT` | `/api/orders/:id/status` | Update dispatch status (*Processing*, *Dispatched*, *Delivered*) |
| `POST` | `/api/auth/register` | Register new user account |
| `POST` | `/api/auth/login` | Authenticate user and receive JWT session token |

---

