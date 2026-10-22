const Product = require('../models/Product');


exports.getProducts = async (req, res) => {
  try {
    const { category, gender, sort } = req.query;
    let query = {};

    if (category) query.category = category;
    if (gender) query.gender = gender;

    let productsQuery = Product.find(query);

    if (sort === 'price-low') productsQuery = productsQuery.sort({ price: 1 });
    if (sort === 'price-high') productsQuery = productsQuery.sort({ price: -1 });
    if (sort === 'newest') productsQuery = productsQuery.sort({ createdAt: -1 });

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};