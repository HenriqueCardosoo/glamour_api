// controllers/productController.js
const Product = require('../models/Product');

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { title, imageUrl, quantity, price } = req.body;
    const product = await Product.create({ title, imageUrl, quantity, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error });
  }
};

// Obter todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter produtos', error });
  }
};

// Atualizar um produto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, quantity, price, isSoldOut } = req.body;
    const product = await Product.update({ title, imageUrl, quantity, price, isSoldOut }, { where: { id } });
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
};
