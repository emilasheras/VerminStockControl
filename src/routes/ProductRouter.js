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

/**
 * recieves a query id and returns a SINGLE product
 */
router.get('', async (req, res) => {
  const params = req.query;
  const productManager = new ProductManager(`./src/data/products.json`);
  await productManager.loadProducts();
  const product = productManager.search(params);
  
  if (!product) {
    res
      .status(404)
      .send(`Product not found id: ${params.id}`);
  }
  res
    .status(200)
    .send(product);
});

/**
 * Recieves a dynamic id and returns a SINGLE product
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const productManager = new ProductManager(`./src/data/products.json`);
  await productManager.loadProducts();
  const product = productManager.getProductById(id);
  
  if (!product) {
    res
      .status(404)
      .send(`Product not found id: ${id}`);
  }
  res
    .status(200)
    .send(product);
}); 

export default router; 