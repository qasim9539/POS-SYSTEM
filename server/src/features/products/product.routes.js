const express = require('express');
const router = express.Router();
const productController = require('./product.controller');

// Optionally: Add JWT authentication middleware here if needed
// const authMiddleware = require('../../middlewares/authMiddleware');
// router.use(authMiddleware);

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
