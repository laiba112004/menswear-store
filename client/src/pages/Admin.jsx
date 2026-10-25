import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { useCurrency } from '../context/CurrencyContext';
import {
  ShoppingBag,
  Plus,
  RefreshCw,
  CheckCircle,
  Package,
  Trash2,
  Layers,
  Edit3,
  X,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Image as ImageIcon,
  Upload,
  Folder,
  Link as LinkIcon
} from 'lucide-react';

const LOCAL_IMAGE_PRESETS = [
  { name: 'Boxy Tee Front', path: '/images/products/tee-boxy-1.jpg' },
  { name: 'Boxy Tee Back', path: '/images/products/tee-boxy-2.jpg' },
  { name: 'French Terry Hoodie Front', path: '/images/products/hoodie-raw-1.jpg' },
  { name: 'French Terry Hoodie Back', path: '/images/products/hoodie-raw-2.jpg' },
  { name: 'Vintage Ivory Hoodie', path: '/images/products/hoodie-ivory-1.jpg' },
  { name: 'Varsity Crewneck Front', path: '/images/products/crewneck-varsity-1.jpg' },
  { name: 'Varsity Crewneck Back', path: '/images/products/crewneck-varsity-2.jpg' },
  { name: 'Cargo Pants Front', path: '/images/products/pants-cargo-1.jpg' },
  { name: 'Cargo Pants Detail', path: '/images/products/pants-cargo-2.jpg' },
  { name: 'Cargo Sweat Shorts', path: '/images/products/shorts-cargo-1.jpg' },
  { name: 'Fleece Shorts', path: '/images/products/shorts-fleece-1.jpg' },
  { name: 'Women Fleece Shorts (Ivory)', path: '/images/products/shorts-fleece-women-1.jpg' },
  { name: 'Cropped Hoodie (Women)', path: '/images/products/hoodie-cropped-women-1.jpg' },
  { name: 'Women Cropped Tee (Black)', path: '/images/products/tee-crop-black-1.jpg' },
  { name: 'Washed Twill Dad Cap', path: '/images/products/cap-minimal-1.jpg' },
];

function ImageInputControl({
  label,
  value,
  onChange,
  required = false,
  presetImages = LOCAL_IMAGE_PRESETS,
  onUpload,
}) {
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = React.useRef(null);

  const getImageTypeBadge = (val) => {
    if (!val) return null;
    if (val.startsWith('data:image/')) {
      return (
        <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded">
          Device File (Uploaded)
        </span>
      );
    }
    if (val.startsWith('/images/')) {
      return (
        <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
          Local Folder File
        </span>
      );
    }
    if (val.startsWith('http://') || val.startsWith('https://')) {
      return (
        <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded">
          Web Link (URL)
        </span>
      );
    }
    return (
      <span className="text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded">
        Custom Path
      </span>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-bold uppercase tracking-wider block text-brandBlack text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {getImageTypeBadge(value)}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => onUpload(e, (dataUrl) => onChange(dataUrl))}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-brandBlack text-sm font-bold uppercase tracking-wider border border-neutral-300 transition-colors"
          >
            <Upload size={15} />
            <span>Upload from PC</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 text-sm font-bold uppercase tracking-wider border border-neutral-300 transition-colors"
          >
            <Folder size={15} />
            <span>Folder Presets {showPresets ? '▲' : '▼'}</span>
          </button>
        </div>

        {showPresets && (
          <div className="p-3 bg-neutral-50 border border-neutral-300 grid grid-cols-2 sm:grid-cols-5 gap-2 max-h-56 overflow-y-auto">
            {presetImages.map((p, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => {
                  onChange(p.path);
                  setShowPresets(false);
                }}
                className={`p-1 text-left border rounded transition-all flex flex-col items-center gap-1 ${value === p.path ? 'border-brandBlack bg-white shadow-sm ring-1 ring-black' : 'border-neutral-200 hover:border-neutral-400 bg-white'
                  }`}
              >
                <img src={p.path} alt={p.name} className="w-full h-14 object-cover bg-neutral-100" />
                <span className="text-xs font-semibold text-neutral-700 leading-tight text-center line-clamp-1">{p.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /images/products/tee-boxy-1.jpg OR https://..."
            className="w-full border border-neutral-300 p-2.5 pr-8 focus:outline-none focus:border-brandBlack text-sm"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-2.5 text-neutral-400 hover:text-black"
              title="Clear Image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {value && (
        <div className="flex items-center gap-3 p-2.5 bg-neutral-50 border border-neutral-200">
          <img
            src={value}
            alt="Preview"
            className="w-12 h-14 object-cover border border-neutral-300 bg-white flex-shrink-0"
            onError={(e) => {
              e.target.src = '/images/products/tee-boxy-1.jpg';
            }}
          />
          <div className="text-sm overflow-hidden">
            <span className="font-mono text-xs text-neutral-600 truncate block max-w-xs sm:max-w-md">
              {value.startsWith('data:image/') ? `Base64 Image (${Math.round(value.length / 1024)} KB)` : value}
            </span>
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
              Ready for display
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'catalog' | 'newProduct'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formatPrice } = useCurrency();

  // In-app Toast Notification state (No native alert/confirm popups)
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // State for Delete Confirmation Modal (In-App Modal)
  const [deleteModalProduct, setDeleteModalProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // State for Edit Product Modal
  const [editModalProduct, setEditModalProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: 'Hoodies',
    gender: 'Men',
    price: '',
    comparePrice: '',
    description: '',
    image1: '',
    image2: '',
    color: 'Pitch Black',
    colorHex: '#0B0B0B',
    stock: 20,
    isNewArrival: false,
  });
  const [updating, setUpdating] = useState(false);

  // New product form state
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Hoodies',
    gender: 'Men',
    price: '',
    comparePrice: '',
    description: '',
    image1: '',
    image2: '',
    color: 'Pitch Black',
    colorHex: '#0B0B0B',
    stock: 20,
    isNewArrival: true,
  });
  const [publishing, setPublishing] = useState(false);

  // File upload handler for PC / device files -> Base64
  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP).', 'error');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showToast('Image exceeds 8MB. Please select an image under 8MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target.result);
      showToast(`Loaded "${file.name}" from your device!`);
    };
    reader.readAsDataURL(file);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
      showToast('Failed to fetch orders from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching admin products:', err);
      showToast('Failed to fetch catalog garments.', 'error');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  // Update order status live
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o)));
      showToast(`Order status updated to "${newStatus}"`);
    } catch (err) {
      console.error(err);
      showToast('Failed to update status', 'error');
    }
  };

  // Open Edit Modal & populate form
  const handleOpenEdit = (p) => {
    setEditModalProduct(p);
    setEditForm({
      title: p.title || '',
      category: p.category || 'Hoodies',
      gender: p.gender || 'Men',
      price: p.price || '',
      comparePrice: p.comparePrice || '',
      description: p.description || '',
      image1: p.images?.[0] || '',
      image2: p.images?.[1] || '',
      color: p.variants?.[0]?.color || 'Pitch Black',
      colorHex: p.variants?.[0]?.colorCode || '#0B0B0B',
      stock: p.variants?.[0]?.stock !== undefined ? p.variants[0].stock : 20,
      isNewArrival: !!p.isNewArrival,
    });
  };

  // Submit Product Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editModalProduct) return;
    setUpdating(true);

    try {
      const images = [
        editForm.image1 || '/images/products/tee-boxy-1.jpg',
      ];
      if (editForm.image2) images.push(editForm.image2);

      const payload = {
        title: editForm.title,
        description: editForm.description,
        price: Number(editForm.price),
        comparePrice: editForm.comparePrice ? Number(editForm.comparePrice) : undefined,
        category: editForm.category,
        gender: editForm.gender,
        images,
        variants: [
          { color: editForm.color, colorCode: editForm.colorHex, size: 'S', stock: Number(editForm.stock) },
          { color: editForm.color, colorCode: editForm.colorHex, size: 'M', stock: Number(editForm.stock) },
          { color: editForm.color, colorCode: editForm.colorHex, size: 'L', stock: Number(editForm.stock) },
          { color: editForm.color, colorCode: editForm.colorHex, size: 'XL', stock: Number(editForm.stock) },
        ],
        isNewArrival: editForm.isNewArrival,
      };

      const res = await API.put(`/products/${editModalProduct._id}`, payload);
      setProducts(products.map((p) => (p._id === editModalProduct._id ? res.data : p)));
      setEditModalProduct(null);
      showToast(`"${res.data.title}" updated successfully!`);
    } catch (err) {
      console.error('Update product error:', err);
      showToast('Error updating product specifications.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  // Handle Delete Product with custom in-app modal
  const handleConfirmDelete = async () => {
    if (!deleteModalProduct) return;
    setDeleting(true);
    try {
      await API.delete(`/products/${deleteModalProduct._id}`);
      setProducts(products.filter((p) => p._id !== deleteModalProduct._id));
      showToast(`Piece "${deleteModalProduct.title}" retired from store.`);
      setDeleteModalProduct(null);
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete product.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Handle New Product Publish
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setPublishing(true);

    try {
      const images = [
        productForm.image1 || '/images/products/tee-boxy-1.jpg',
      ];
      if (productForm.image2) images.push(productForm.image2);

      const payload = {
        title: productForm.title,
        description: productForm.description,
        price: Number(productForm.price),
        comparePrice: productForm.comparePrice ? Number(productForm.comparePrice) : undefined,
        category: productForm.category,
        gender: productForm.gender,
        images,
        variants: [
          { color: productForm.color, colorCode: productForm.colorHex, size: 'S', stock: Number(productForm.stock) },
          { color: productForm.color, colorCode: productForm.colorHex, size: 'M', stock: Number(productForm.stock) },
          { color: productForm.color, colorCode: productForm.colorHex, size: 'L', stock: Number(productForm.stock) },
          { color: productForm.color, colorCode: productForm.colorHex, size: 'XL', stock: Number(productForm.stock) },
        ],
        isNewArrival: productForm.isNewArrival,
      };

      const res = await API.post('/products', payload);
      setProducts([res.data, ...products]);
      showToast(`"${res.data.title}" published live to catalog!`);

      // Reset form
      setProductForm({
        title: '',
        category: 'Hoodies',
        gender: 'Men',
        price: '',
        comparePrice: '',
        description: '',
        image1: '',
        image2: '',
        color: 'Pitch Black',
        colorHex: '#0B0B0B',
        stock: 20,
        isNewArrival: true,
      });
      setActiveTab('catalog'); // Navigate to inventory to see the new piece
    } catch (err) {
      console.error('Create error:', err);
      showToast('Error publishing new piece. Please check details.', 'error');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative">

      {/* IN-APP TOAST NOTIFICATION POPUP (No native alert/confirm popups) */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-brandBlack text-white border border-brandGold shadow-2xl rounded-none text-xs font-semibold uppercase tracking-wider animate-bounce-short">
          {toast.type === 'error' ? (
            <AlertTriangle size={18} className="text-brandRed flex-shrink-0" />
          ) : (
            <CheckCircle size={18} className="text-brandGold flex-shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-neutral-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-sm uppercase tracking-wider text-brandGold font-bold">
            Atelier Command Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
            Store Administration (CMS)
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Real-time catalog curator & fulfillment console
          </p>
        </div>

        {/* Tab Switch Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'orders'
              ? 'bg-brandBlack text-white shadow-sm'
              : 'border border-neutral-300 text-brandBlack hover:border-black'
              }`}
          >
            <ShoppingBag size={16} /> Orders Desk ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'catalog'
              ? 'bg-brandBlack text-white shadow-sm'
              : 'border border-neutral-300 text-brandBlack hover:border-black'
              }`}
          >
            <Layers size={16} /> Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('newProduct')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${activeTab === 'newProduct'
              ? 'bg-brandBlack text-white shadow-sm'
              : 'border border-neutral-300 text-brandBlack hover:border-black'
              }`}
          >
            <Plus size={16} /> Publish Piece
          </button>
        </div>
      </div>

      {/* 1. ORDERS DESK TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brandBlack">
              Logged Customer Dispatches ({orders.length})
            </h2>
            <button
              onClick={fetchOrders}
              className="text-sm uppercase tracking-wider text-neutral-600 hover:text-black flex items-center gap-1.5 font-bold"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh List
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-16 text-center bg-brandWarmIvory border border-neutral-200 space-y-3">
              <Package size={36} className="mx-auto text-neutral-400" />
              <p className="text-sm uppercase tracking-wider text-neutral-600 font-semibold">
                No customer orders logged in database yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-neutral-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-100 uppercase font-bold text-neutral-700 tracking-wider">
                  <tr>
                    <th className="p-4 border-b border-neutral-200">Tracking Code</th>
                    <th className="p-4 border-b border-neutral-200">Customer Identity</th>
                    <th className="p-4 border-b border-neutral-200">Manifest / Items</th>
                    <th className="p-4 border-b border-neutral-200">Total Paid</th>
                    <th className="p-4 border-b border-neutral-200">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-neutral-700">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-brandBlack select-all">
                        {ord.paymentResult?.id || ord._id.slice(-6)}
                      </td>
                      <td className="p-4">
                        <span className="block font-semibold text-brandBlack">{ord.shippingAddress?.name || 'Guest'}</span>
                        <span className="text-sm text-neutral-600">{ord.guestEmail}</span>
                        {ord.shippingAddress?.city && (
                          <span className="text-xs sm:text-sm text-neutral-500 block">
                            {ord.shippingAddress.city}, {ord.shippingAddress.country}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {ord.orderItems?.map((item, idx) => (
                          <span key={idx} className="block text-sm leading-relaxed">
                            {item.title} ({item.size} / {item.color}) × {item.qty}
                          </span>
                        ))}
                      </td>
                      <td className="p-4 font-black text-brandBlack font-mono text-base">
                        {formatPrice(ord.totalPrice)}
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.orderStatus || 'Processing'}
                          onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                          className="text-sm uppercase font-bold tracking-wider px-3 py-2 border border-neutral-300 bg-white focus:outline-none focus:border-brandBlack cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 2. CATALOG INVENTORY TAB (With Edit & Delete Custom Modal) */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brandBlack">
              Active Products Catalog ({products.length})
            </h2>
            <button
              onClick={() => setActiveTab('newProduct')}
              className="text-sm uppercase tracking-wider text-brandBlack hover:underline flex items-center gap-1 font-bold"
            >
              <Plus size={15} /> Add Product
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 uppercase font-bold text-neutral-700 tracking-wider">
                <tr>
                  <th className="p-4 border-b border-neutral-200">Product</th>
                  <th className="p-4 border-b border-neutral-200">Category / Gender</th>
                  <th className="p-4 border-b border-neutral-200">Price</th>
                  <th className="p-4 border-b border-neutral-200">Inventory Stock</th>
                  <th className="p-4 border-b border-neutral-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-700">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || '/images/products/tee-boxy-1.jpg'}
                        alt={p.title}
                        className="w-12 h-16 object-cover bg-neutral-100 border border-neutral-200 flex-shrink-0"
                      />
                      <div>
                        <span className="font-bold uppercase text-brandBlack block text-sm sm:text-base">{p.title}</span>
                        {p.isNewArrival && (
                          <span className="text-xs text-brandGold uppercase font-bold tracking-wider">
                            New Drop
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 uppercase font-medium">
                      {p.category} • {p.gender || 'Men'}
                    </td>
                    <td className="p-4 font-bold text-brandBlack font-mono text-base">
                      {formatPrice(p.price)}
                      {p.comparePrice && (
                        <span className="text-neutral-400 line-through text-xs sm:text-sm block font-normal">
                          {formatPrice(p.comparePrice)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs sm:text-sm">
                      {p.variants?.map((v, i) => (
                        <span
                          key={i}
                          className="inline-block bg-neutral-100 px-2.5 py-1 mr-1 mb-1 border border-neutral-200 font-mono"
                        >
                          {v.size}: <b>{v.stock}</b>
                        </span>
                      ))}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-3 py-2 border border-neutral-300 hover:border-black text-brandBlack uppercase tracking-wider text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
                          title="Edit Product Details"
                        >
                          <Edit3 size={15} /> Edit
                        </button>

                        {/* Delete Button (Triggers Custom Modal) */}
                        <button
                          onClick={() => setDeleteModalProduct(p)}
                          className="p-2 text-neutral-400 hover:text-brandRed hover:bg-red-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. PUBLISH PIECE FORM TAB (CENTERED & CLEAN - 'Semester / Center' requirement) */}
      {activeTab === 'newProduct' && (
        <div className="max-w-3xl mx-auto bg-white border border-neutral-300 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-neutral-200 pb-4 text-center">
            <span className="text-sm uppercase tracking-wider text-brandGold font-bold">
              Product Management
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
              Add New Product To Catalog
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Add a brand-new item to the live store with automated inventory sizing.
            </p>
          </div>

          <form onSubmit={handleProductSubmit} className="space-y-6 text-sm">

            {/* 1. Product Identity */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brandBlack border-b border-neutral-100 pb-1">
                1. Basic Product Details
              </h3>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                  Product Title *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Heavyweight Raw Hem Boxy Hoodie"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack bg-white text-sm"
                  >
                    <option value="Hoodies">Hoodies</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Crewnecks">Crewnecks</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Hats">Hats</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Audience Gender *
                  </label>
                  <select
                    value={productForm.gender}
                    onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack bg-white text-sm"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>

                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={productForm.isNewArrival}
                  onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                  className="w-4 h-4 accent-brandBlack cursor-pointer"
                />
                <span className="font-bold uppercase tracking-wider text-brandBlack text-sm">
                  Feature in "New Arrivals" drop carousel
                </span>
              </label>
            </div>

            {/* 2. Pricing & Stock */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brandBlack border-b border-neutral-100 pb-1">
                2. Pricing & Sizing Stock
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Regular Price ($ USD) *
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="85"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Compare Price (Sale)
                  </label>
                  <input
                    type="number"
                    placeholder="110"
                    value={productForm.comparePrice}
                    onChange={(e) => setProductForm({ ...productForm, comparePrice: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Stock per Size (S-XL) *
                  </label>
                  <input
                    required
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 3. Colorway */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brandBlack border-b border-neutral-100 pb-1">
                3. Colorway Spec
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Color Name
                  </label>
                  <input
                    type="text"
                    placeholder="Pitch Black"
                    value={productForm.color}
                    onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Color Hex Code
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="#0B0B0B"
                      value={productForm.colorHex}
                      onChange={(e) => setProductForm({ ...productForm, colorHex: e.target.value })}
                      className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm font-mono"
                    />
                    <div
                      className="w-10 h-10 border border-neutral-300 flex-shrink-0"
                      style={{ backgroundColor: productForm.colorHex || '#0B0B0B' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Visual Assets & Media */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-neutral-100 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brandBlack">
                  4. Visual Imagery & Media (Files or Links)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                  Upload directly from your PC/device, pick from project folder assets, or paste any web image URL.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ImageInputControl
                  label="Primary Product Image"
                  required
                  value={productForm.image1}
                  onChange={(val) => setProductForm({ ...productForm, image1: val })}
                  onUpload={handleFileUpload}
                />

                <ImageInputControl
                  label="Secondary Angle / Detail Image (Optional)"
                  value={productForm.image2}
                  onChange={(val) => setProductForm({ ...productForm, image2: val })}
                  onUpload={handleFileUpload}
                />
              </div>
            </div>

            {/* 5. Description */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brandBlack border-b border-neutral-100 pb-1">
                5. Fabric & Product Description
              </h3>

              <div>
                <textarea
                  rows={4}
                  required
                  placeholder="Crafted from 450 GSM heavyweight cotton fleece with relaxed dropped shoulders and comfortable streetwear fit..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={publishing}
              className="w-full py-4 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-all shadow-md disabled:bg-neutral-400 mt-4"
            >
              {publishing ? 'Publishing Product...' : 'Publish Product To Store'}
            </button>
          </form>
        </div>
      )}

      {/* ============================================================ */}
      {/* IN-APP MODAL 1: EDIT PRODUCT MODAL */}
      {/* ============================================================ */}
      {editModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-neutral-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditModalProduct(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-brandBlack p-1"
            >
              <X size={22} />
            </button>

            <div className="border-b border-neutral-200 pb-3 mb-6">
              <span className="text-sm uppercase tracking-wider text-brandGold font-bold">
                CMS Product Editor
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
                Edit Product: {editModalProduct.title}
              </h3>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-sm">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack bg-white text-sm"
                  >
                    <option value="Hoodies">Hoodies</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Crewnecks">Crewnecks</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Hats">Hats</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Audience
                  </label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack bg-white text-sm"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>

                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Price ($ USD)
                  </label>
                  <input
                    required
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Compare Price
                  </label>
                  <input
                    type="number"
                    value={editForm.comparePrice}
                    onChange={(e) => setEditForm({ ...editForm, comparePrice: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Stock per Size
                  </label>
                  <input
                    required
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={editForm.color}
                    onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                    className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                    Color Hex
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editForm.colorHex}
                      onChange={(e) => setEditForm({ ...editForm, colorHex: e.target.value })}
                      className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm font-mono"
                    />
                    <div
                      className="w-10 h-10 border border-neutral-300 flex-shrink-0"
                      style={{ backgroundColor: editForm.colorHex || '#0B0B0B' }}
                    />
                  </div>
                </div>
              </div>

              <ImageInputControl
                label="Primary Image"
                required
                value={editForm.image1}
                onChange={(val) => setEditForm({ ...editForm, image1: val })}
                onUpload={handleFileUpload}
              />

              <ImageInputControl
                label="Secondary Image (Optional)"
                value={editForm.image2}
                onChange={(val) => setEditForm({ ...editForm, image2: val })}
                onUpload={handleFileUpload}
              />

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1.5 text-brandBlack text-sm">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full border border-neutral-300 p-3 focus:outline-none focus:border-brandBlack text-sm leading-relaxed"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editForm.isNewArrival}
                  onChange={(e) => setEditForm({ ...editForm, isNewArrival: e.target.checked })}
                  className="w-4 h-4 accent-brandBlack cursor-pointer"
                />
                <span className="font-bold uppercase tracking-wider text-brandBlack text-sm">
                  Feature as "New Drop"
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditModalProduct(null)}
                  className="px-5 py-2.5 border border-neutral-300 text-sm font-bold uppercase tracking-wider hover:border-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-7 py-2.5 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack disabled:bg-neutral-400"
                >
                  {updating ? 'Saving Changes...' : 'Save Modifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* IN-APP MODAL 2: CUSTOM DELETE CONFIRMATION POPUP */}
      {/* (NO native window.confirm, smooth in-app dialog popup) */}
      {/* ============================================================ */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-neutral-300 max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 text-center relative">
            <button
              onClick={() => setDeleteModalProduct(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-brandBlack p-1"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 bg-red-50 text-brandRed rounded-full mx-auto flex items-center justify-center">
              <Trash2 size={24} />
            </div>

            <div>
              <span className="text-sm uppercase tracking-wider text-brandRed font-bold">
                Delete Confirmation
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-brandBlack font-serif mt-1">
                Delete Product From Store?
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                Are you sure you want to delete <b>"{deleteModalProduct.title}"</b>? This action will remove it immediately from all collections and the store catalog.
              </p>
            </div>

            {/* Silhouette Preview Card */}
            <div className="flex items-center gap-3 p-3 bg-brandWarmIvory border border-neutral-200 text-left">
              <img
                src={deleteModalProduct.images?.[0] || '/images/products/tee-boxy-1.jpg'}
                alt={deleteModalProduct.title}
                className="w-12 h-14 object-cover border border-neutral-300 bg-neutral-100 flex-shrink-0"
              />
              <div className="text-sm">
                <span className="font-bold uppercase text-brandBlack block">{deleteModalProduct.title}</span>
                <span className="text-xs sm:text-sm text-neutral-500 uppercase block">
                  {deleteModalProduct.category} • {formatPrice(deleteModalProduct.price)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                className="py-3 border border-neutral-300 text-sm font-bold uppercase tracking-wider text-brandBlack hover:border-black transition-colors"
              >
                Keep Piece
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="py-3 bg-brandRed text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors disabled:bg-neutral-400 shadow-md"
              >
                {deleting ? 'Retiring...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}