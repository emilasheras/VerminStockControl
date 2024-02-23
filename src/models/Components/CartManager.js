import fs from 'fs/promises';
import CartModel from '../CartModel.js';
import ProductManager from './ProductManager.js';
const CARTS_FILE_PATH = './src/data/carts.json';
const PRODUCTS_EMOJI = "🛒";

export default class CartManager {
    constructor() {
        this.filePath = CARTS_FILE_PATH;
        this.carts = [];
        this.currentId = 1;
    }

    async loadCarts() {
        try {
            // read from filepath
            const data = await fs.readFile(this.filePath);
            // parse data from string to JSON 
            const carts = JSON.parse(data.toString());
            
            this.carts = carts;

            console.log(`✅ Data loaded from ${this.filePath} ${PRODUCTS_EMOJI}`);

            // set currentId to the highest id in the carts array
            this.currentId = carts.length ? Math.max(...carts.map(p => p.id)) + 1 : 1;
        } catch (error) {
            console.error('Error loading carts:', error);
            this.carts = [];
        }
    }
    
    async saveCarts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.carts));
        } catch (error) {
            console.error('Error saving carts:', error);
        }
    }

    getCarts() {
        return this.carts;
    }

    getCartById(id) {
        const cart = this.carts.find(cart => cart.id == id); // <- beware of type check
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    addProductToCart(productId, cartId){
        // Define an initial product with the format needed
        const initialProduct = {
            "product_id": parseInt(productId),
            "quantity": 1
        }

        // Find the cart
        const cart = this.getCartById(cartId);
        // Find the product
        const product = cart.products.find(product => product.product_id == productId);
        console.log('product', product);
        
        // In case the product is already in the cart, increase the quantity by 1
        if(product){
            product.quantity++;
        }
        else{
            // In case the product is not in the cart, push it with a default quantity of 1
            cart.products.push(initialProduct);
        }
        
        this.saveCarts();
    }
    getProductQuantity(){
        // Find the product_id inside the cart and return the quantity for the total of products
    }


}