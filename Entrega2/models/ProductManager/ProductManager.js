import fs from 'fs/promises';
export default class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.currentId = 1;
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.filePath);
            const products = JSON.parse(data.toString());
            this.products = products;
            console.log(this.products);

            this.currentId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
            console.log(`Data loaded from ${this.filePath}`);
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
        }
    }
    
    async saveProducts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products));
        } catch (error) {
            console.error('Error saving products:', error);
        }
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (this.products.some(product => product.code === product.code)) {
            throw new Error('Product code must be unique');
        }
        const newProduct = { ...product, id: this.currentId++ };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, product) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products[index] = { ...product, id };
        this.saveProducts();
        return this.products[index];
    }

    deleteProduct(id) {
        // this.filePath = './data/data2.json';
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        // this.products = this.products.filter(product => product.id !== id);
        this.products = [{id: 2}];
        
        console.log(`after filter function`,this.products);

        this.saveProducts();
        return true;
    }

}