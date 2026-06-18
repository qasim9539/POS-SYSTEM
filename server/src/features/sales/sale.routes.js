const express = require('express');
const router = express.Router();
const saleController = require('./sale.controller');

router.post('/', saleController.createSale);
router.get('/', saleController.getAllSales);
router.get('/:id', saleController.getSaleById);
router.delete('/:id', saleController.deleteSale);

module.exports = router;
