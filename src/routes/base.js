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

// Testing websockets
router.get('/home', async (req, res) => {
  const productManager = new ProductManager();
  await productManager.loadProducts(); 
  const allProducts = productManager.getProducts();

  console.log(`Products Current Length: `+allProducts?.length);

  res.render('home', {
      name: 'Guest User',
      products: allProducts
  });
});

router.get('/realtimeproducts', async (req, res) => {
  const productManager = new ProductManager();
  await productManager.loadProducts(); 
  const allProducts = productManager.getProducts();

  // console.log(`Products Current Length: `+allProducts?.length);

  res.render('real-time-products', {
      name: 'Guest',
      products: allProducts
  });
});


export default router;