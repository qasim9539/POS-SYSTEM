const Sale = require('./sale.model');
const Product = require('../products/product.model');

// Create a new sale and deduct stock
exports.createSale = async (req, res) => {
  try {
    const { items, paymentMethod, customerName } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Sale items are required' });
    }

    let totalAmount = 0;
    
    // First, verify all products exist and have enough stock
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found with ID ${item.product}` });
      }
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}. Available: ${product.stockQuantity}` });
      }
      totalAmount += item.quantity * item.price;
    }

    // Generate invoice number
    const count = await Sale.countDocuments();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;

    // Create the sale
    const newSale = new Sale({
      invoiceNumber,
      items,
      totalAmount,
      paymentMethod,
      customerName
    });

    const savedSale = await newSale.save();

    // Deduct stock for each product
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stockQuantity: -item.quantity } }
      );
    }

    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sale', error: error.message });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('items.product', 'name sku').sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error: error.message });
  }
};

// Get single sale
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('items.product', 'name sku');
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sale', error: error.message });
  }
};

// Delete a sale and restore inventory
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    // Restore stock for each product in the sale
    for (let item of sale.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stockQuantity: item.quantity } }
      );
    }

    await Sale.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Sale deleted and inventory restored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale', error: error.message });
  }
};
