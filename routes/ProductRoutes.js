// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const { isAdmin } = require('../middleware/auth'); // Middleware para verificar se é admin
const router = express.Router();

// Criar novo produto (somente admin)
router.post('/products', isAdmin, productController.createProduct);

// Obter todos os produtos
router.get('/products', productController.getAllProducts);

// Atualizar um produto (somente admin)
router.put('/products/:id', isAdmin, productController.updateProduct);

// Deletar um produto (somente admin)
router.delete('/products/:id', isAdmin, productController.deleteProduct);

module.exports = router;
