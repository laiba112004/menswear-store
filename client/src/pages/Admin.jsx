import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { ShoppingBag, Plus, RefreshCw, CheckCircle, Package } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' ya 'newProduct'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Naye product ka form state
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Hoodies',
    price: '',
    comparePrice: '',
    description: '',
    image1: '',
    color: 'Pitch Black',
    colorHex: '#0B0B0B',
    stock: 20
  });

  // Database se orders fetch karne ka function
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Naya product submit karne ka handler
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    try {
      const payload = {
        title: productForm.title,
        description: productForm.description,
        price: Number(productForm.price),
        comparePrice: productForm.comparePrice ? Number(productForm.comparePrice) : undefined,
        category: productForm.category,
        gender: 'Men',
        images: [
          productForm.image1 || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80'
        ],
        variants: [
          { color: productForm.color, colorCode: productForm.colorHex, size: 'S', stock: Number(productForm.stock) },
          { color: productForm.color, colorCode: productForm.colorHex, size: 'M', stock: Number(productForm.stock) },
          { color: productForm.color, colorCode: productForm.colorHex, size: 'L', stock: Number(productForm.stock) },
          { color: productForm.color, colorCode: productForm.colorHex, size: 'XL', stock: Number(productForm.stock) }
        ],
        isNewArrival: true
      };

      await API.post('/products', payload);
      setSuccessMsg('Streetwear piece successfully published to catalog!');
      setProductForm({
        title: '',
        category: 'Hoodies',
        price: '',
        comparePrice: '',
        description: '',
        image1: '',
        color: 'Pitch Black',
        colorHex: '#0B0B0B',
        stock: 20
      });
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error creating product. Please verify connection.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      {/* Header Bar */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brandGold font-bold">
            Atelier Command Center
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
            Store Administration (CMS)
          </h1>
        </div>

        {/* Tab Switch Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'bg-brandBlack text-white'
                : 'border border-neutral-300 text-brandBlack hover:border-black'
            }`}
          >
            <ShoppingBag size={14} /> Orders Desk
          </button>
          <button
            onClick={() => setActiveTab('newProduct')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'newProduct'
                ? 'bg-brandBlack text-white'
                : 'border border-neutral-300 text-brandBlack hover:border-black'
            }`}
          >
            <Plus size={14} /> Publish Piece
          </button>
        </div>
      </div>

      {/* 1. ORDERS DESK TAB */}
      {activeTab === 'orders' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brandBlack">
              Logged Customer Dispatches ({orders.length})
            </h2>
            <button
              onClick={fetchOrders}
              className="text-xs uppercase tracking-widest text-neutral-600 hover:text-black flex items-center gap-1.5 font-bold"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh List
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-brandWarmIvory border border-neutral-200 space-y-2">
              <Package size={28} className="mx-auto text-brandGrey" />
              <p className="text-xs uppercase tracking-widest text-brandGrey font-semibold">
                No customer orders logged in database yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-neutral-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-100 uppercase font-bold text-neutral-700 tracking-wider">
                  <tr>
                    <th className="p-3.5 border-b border-neutral-200">Tracking Code</th>
                    <th className="p-3.5 border-b border-neutral-200">Customer Identity</th>
                    <th className="p-3.5 border-b border-neutral-200">Manifest / Items</th>
                    <th className="p-3.5 border-b border-neutral-200">Total</th>
                    <th className="p-3.5 border-b border-neutral-200">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-600">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-brandBlack">
                        {ord.paymentResult?.id || ord._id.slice(-6)}
                      </td>
                      <td className="p-3.5">
                        <span className="block font-semibold text-brandBlack">{ord.shippingAddress?.name || 'Guest'}</span>
                        <span className="text-[11px] text-brandGrey">{ord.guestEmail}</span>
                      </td>
                      <td className="p-3.5">
                        {ord.orderItems?.map((item, idx) => (
                          <span key={idx} className="block text-[11px] leading-relaxed">
                            {item.title} ({item.size} / {item.color}) × {item.qty}
                          </span>
                        ))}
                      </td>
                      <td className="p-3.5 font-black text-brandBlack font-mono">
                        ${ord.totalPrice}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-brandBlack text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 inline-block">
                          {ord.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* 2. PUBLISH PIECE FORM TAB */
        <div className="max-w-2xl bg-white border border-neutral-200 p-8 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brandBlack mb-6 font-serif">
            Add New Streetwear Silhouette
          </h2>

          {successMsg && (
            <div className="p-3.5 mb-6 bg-green-50 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                Product Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Heavyweight Raw Hem Boxy Hoodie"
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                  Category
                </label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack bg-white"
                >
                  <option value="Hoodies">Hoodies</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Pants">Pants</option>
                  <option value="Crewnecks">Crewnecks</option>
                  <option value="Shorts">Shorts</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                  Price ($ USD)
                </label>
                <input
                  required
                  type="number"
                  placeholder="85"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                  Compare Price (Optional Sale)
                </label>
                <input
                  type="number"
                  placeholder="110"
                  value={productForm.comparePrice}
                  onChange={(e) => setProductForm({ ...productForm, comparePrice: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                  Default Color Name
                </label>
                <input
                  type="text"
                  placeholder="Pitch Black"
                  value={productForm.color}
                  onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack"
                />
              </div>
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                Product Image URL (Unsplash or Cloudinary)
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={productForm.image1}
                onChange={(e) => setProductForm({ ...productForm, image1: e.target.value })}
                className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack"
              />
            </div>

            <div>
              <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">
                Description & Fabric Specifications
              </label>
              <textarea
                rows={3}
                required
                placeholder="Engineered from 450 GSM French Terry cotton with dropped shoulders and double-layered hood..."
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brandBlack text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-brandSoftBlack transition-all shadow-md mt-2"
            >
              Publish Piece Live
            </button>
          </form>
        </div>
      )}
    </div>
  );
}