export default class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (this.products.some(p => p.code === product.code)) {
            throw new Error('Product code must be unique');
        }
        const newProduct = { ...product, id: this.nextId++ };
        this.products.push(newProduct);
        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
}