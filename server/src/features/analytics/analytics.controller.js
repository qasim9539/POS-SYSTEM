const Product = require('../products/product.model');
const Sale = require('../sales/sale.model');

exports.getSummary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSales = await Sale.countDocuments();
    
    const revenueAggregation = await Sale.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    const lowStockCount = await Product.countDocuments({
      $expr: { $lte: ['$stockQuantity', '$lowStockThreshold'] }
    });

    res.status(200).json({
      totalProducts,
      totalSales,
      totalRevenue,
      lowStockCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching summary', error: error.message });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stockQuantity', '$lowStockThreshold'] }
    }).select('name sku stockQuantity lowStockThreshold');
    
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching low stock products', error: error.message });
  }
};

exports.getSalesChartData = async (req, res) => {
  try {
    // Group sales by day for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const chartData = await Sale.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          dailyRevenue: { $sum: '$totalAmount' },
          salesCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chart data', error: error.message });
  }
};
