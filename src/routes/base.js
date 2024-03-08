import express from 'express';
const router = express.Router();
import ProductManager from '../models/Components/ProductManager.js';

// GET
router.get('', async (req, res) => {

  res.render('index', {
    name: 'Jane Doe'
  });
});

// POST
router.post('/', (req, res) => {
  res
    .status(405)
    .send('NOT IMPLEMENTED YET');
});

router.get('/one-parameter/:id', (req, res) => {
  res
    .status(200)
    .send(`
      <h1>One Parameter Testing</h1>
      <p>/one-parameter/${req.params.id}</p>
    `);
});

router.get('/two-parameters/:id/:name', (req, res) => {
  res
    .status(200)
    .send(`
      <h1>Two Parameter Testing</h1>
      <p>/two-parameters/${req.params.id}/${req.params.name}</p>
    `);
});


// Testing Websockets and Product Singleton

router.get('/realtimeproducts', async (req, res) => {
  res.render('real-time-products', {
    name: 'Guest'
  });
});
 
router.get('/products', (req, res) => {
  const products = ProductManager.getProducts();
  console.log(products.length);
  res.render('products', {});
});

export default router;