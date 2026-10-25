const Product = require('../models/Product');

// @desc    Get all products with full filtering & sorting (FR-C02, FR-C03, FR-S05)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const { category, gender, sort, search, color, size, minPrice, maxPrice } = req.query;
    let query = {};

    if (category) query.category = category;
    if (gender) query.gender = gender;

    // Search query
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Color filter
    if (color) {
      query['variants.color'] = { $regex: color, $options: 'i' };
    }

    // Size filter
    if (size) {
      query['variants.size'] = size;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let productsQuery = Product.find(query);

    // Sorting (FR-C02)
    if (sort === 'price-low') productsQuery = productsQuery.sort({ price: 1 });
    else if (sort === 'price-high') productsQuery = productsQuery.sort({ price: -1 });
    else if (sort === 'newest') productsQuery = productsQuery.sort({ createdAt: -1 });
    else if (sort === 'a-z') productsQuery = productsQuery.sort({ title: 1 });
    else if (sort === 'z-a') productsQuery = productsQuery.sort({ title: -1 });
    let products = await productsQuery;

    // Prioritize Shirts, Hoodies, and Pants at the start when browsing all apparel or default view
    if (!category && (!sort || sort === 'newest')) {
      const categoryOrder = { 'T-Shirts': 1, 'Hoodies': 2, 'Pants': 3, 'Crewnecks': 4, 'Shorts': 5, 'Hats': 6 };
      products = products.sort((a, b) => {
        const orderA = categoryOrder[a.category] || 99;
        const orderB = categoryOrder[b.category] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Admin)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed from catalog' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};