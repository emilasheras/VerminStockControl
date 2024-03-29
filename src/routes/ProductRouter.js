import express from 'express';
const router = express.Router();
import ProductManager from '../models/Components/ProductManager.js';

// GET

/**
 * Returns all products
 */
router.get('/all', async (req, res) => {
  const products = ProductManager.getProducts();

  res
    .status(200)
    .send(products);
});

/**
 * recieves a query id and returns a SINGLE product
 */
router.get('', async (req, res) => {
  const params = req.query;
  const product = ProductManager.search(params);

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
  const product = ProductManager.getProductById(id);

  if (!product) {
    res
      .status(404)
      .send(`Product not found id: ${id}`);
  }
  res
    .status(200)
    .send(product);
});

// POST

/**
 * Recieves a post request with a product object and adds it to the product list (id is auto-generated).
 * @param {Object} product - The product to add.
 * @returns {Object} - The added product.
 */
router.post('', async (req, res) => {
  const params = req.body;
  const newProduct = ProductManager.addProduct(params);

  res
    .status(200)
    .send('Product added successfully');
});

// PUT
/**
 * The PUT method must take the product id and update it with the fields provided.
 */
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const params = req.body;
  const updatedProduct = await ProductManager.updateProduct(id, params);

  res
    .status(200)
    .send('Product updated successfully');
});

// DELETE
/**
 * The DELETE method must take the product id and delete it.
 */
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deletedProduct = ProductManager.deleteProduct(id);

  res
    .status(200)
    .send('Product deleted successfully');
});




export default router; 