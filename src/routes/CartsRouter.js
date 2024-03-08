import express from 'express';
import CartManager from '../models/Components/CartManager.js';
const router = express.Router();

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const cartManager = new CartManager();
    await cartManager.loadCarts();
    const cart = cartManager.getCartById(id);

    if (!cart) {
        res
            .status(404)
            .send(`Cart not found id: ${id}`);
    }
    res
        .status(200)
        .send(cart);
});

router.post('', async (req, res) => {
    const params = req.body;

    // Initialize the cart manager 
    const cartManager = new CartManager();
    await cartManager.loadCarts();
    const cartModel = cartManager.addCart(params);

    res
        .status(200)
        .send("Product added to cart successfully");
});

router.post('/:id/product/:product_id', async (req, res) => {
    const id = req.params.id;
    const product_id = req.params.product_id;

    // Initialize the cart manager 
    const cartManager = new CartManager();
    await cartManager.loadCarts();

    // Add the product to the cart
    cartManager.addProductToCart(product_id, id);

    res
        .status(200)
        .send("Product added to cart successfully");
});

export default router;