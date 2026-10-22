# ATELIER — Luxury Streetwear E-Commerce Platform

A production-grade direct-to-consumer (D2C) men's streetwear web platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS, strictly adhering to the architectural requirements and audit specifications.

---

## 🌟 Key Deliverables & Audit Fixes (GF-01 — GF-08)

- **Dark Masculine Luxury Aesthetic:** Minimalist editorial design, custom color system, and high-GSM typography.
- **Dynamic Catalogue & Variant Engine:** Variant selectors for Size (XS–XXL) and Color swatches, real-time inventory states, and dynamic Size Guide modal.
- **Instant Search (<1s):** Overlay live filter querying the database without full reloads.
- **Frictionless Shopping Bag:** Slide-over cart drawer, free shipping threshold progress tracker ($150), and working `FIRST10` (10% off) promotional voucher engine.
- **End-to-End Order & Dispatch Tracking:** Guest checkout flow generating real tracking references (`ATL-XXXX-2026`) verifiable on the Track Order page.
- **Admin Command Desk (CMS):** Administrative portal to inspect incoming client orders and publish new pieces to the catalog.
- **Complete Compliance & Policy Suite:** Resolves all empty-shell pages from the audit with real policy copy (Shipping, 14-Day Returns, FAQ Accordion, Contact Concierge, GDPR Cookie Consent).

---

## 🛠️ Technology Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Lucide React, Axios, React Router v6
- **Backend:** Node.js, Express.js (MVC Controller-Service Pattern)
- **Database:** MongoDB Atlas (Cloud Cluster with Mongoose ODM)

---

## 🚀 How to Run the Project Locally

### 1. Backend Setup
```bash
cd server
npm install
npm run dev