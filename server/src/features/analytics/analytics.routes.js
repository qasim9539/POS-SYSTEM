const express = require('express');
const router = express.Router();
const analyticsController = require('./analytics.controller');

router.get('/summary', analyticsController.getSummary);
router.get('/low-stock', analyticsController.getLowStockProducts);
router.get('/sales-chart', analyticsController.getSalesChartData);

module.exports = router;
