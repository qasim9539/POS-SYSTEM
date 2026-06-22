const Product = require('./product.model');
<<<<<<< HEAD
const Notification = require('../notifications/notification.model');
=======
>>>>>>> Amira-branch

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, sku, category, purchasePrice, sellingPrice, stockQuantity, lowStockThreshold } = req.body;
    
    // Check if product with SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this SKU already exists' });
    }

    const newProduct = new Product({
      name,
      sku,
      category,
      purchasePrice,
      sellingPrice,
      stockQuantity,
      lowStockThreshold
    });

    const savedProduct = await newProduct.save();

<<<<<<< HEAD
    // Create Notification
    await Notification.create({
      title: 'Product Added',
      message: `${name} has been added to the inventory.`,
      type: 'success'
    });

=======
>>>>>>> Amira-branch
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

<<<<<<< HEAD
    // Create Notification
    await Notification.create({
      title: 'Product Updated',
      message: `${updatedProduct.name} details have been updated.`,
      type: 'info'
    });

=======
>>>>>>> Amira-branch
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

<<<<<<< HEAD
    // Create Notification
    await Notification.create({
      title: 'Product Deleted',
      message: `${deletedProduct.name} has been removed from inventory.`,
      type: 'warning'
    });

=======
>>>>>>> Amira-branch
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
