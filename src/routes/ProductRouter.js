import express from 'express';
const router = express.Router();
import ProductManager from '../models/ProductManager/ProductManager.js';

// GET
router.get('/all', async (req, res) => {
  const productManager = new ProductManager(`./src/data/products.json`);
  await productManager.loadProducts();
  res
    .status(200)
    .send(productManager.getProducts());
});


export default router; 