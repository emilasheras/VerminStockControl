import fs from 'fs/promises';
import ProductModel from '../ProductModel.js';
const PRODUCTS_FILE_PATH = './src/data/products.json';

export default class ProductManager {
    constructor() {
        this.filePath = PRODUCTS_FILE_PATH;
        this.products = [];
        this.currentId = 1;
    }

    async loadProducts() {
        try {
            // read from filepath
            const data = await fs.readFile(this.filePath);
            // parse data from string to JSON 
            const products = JSON.parse(data.toString());
            
            this.products = products;
            console.log(`✅ Data loaded from ${this.filePath}`);

            // set currentId to the highest id in the products array
            this.currentId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
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
        const productModel = new ProductModel({ ...product, id: this.currentId++ });

        // Check the field attributes before adding the product.
        this.products.push(productModel.toJson()); // <- get the json format of the class object
        this.saveProducts(); //* <- save the products to the file
        return productModel;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id == id); // <- beware of type check
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, product) {
        const index = this.products.findIndex(product => product.id == id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products[index] = { ...product, id };
        this.saveProducts();
        return this.products[index];
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id == id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products = this.products.filter(product => product.id != id);

        console.log(`after filter function`,this.products);
        
        this.saveProducts();
        // return true;
    }


    
    /**
     * Searches for products based on the given parameters.
     * @param {Object} params - The parameters for filtering (e.g., from the request).
     * @returns {Array|boolean} - The filtered data or false if no params.
     */
    search(params) {
        // if no params, return false
        if(!params) return false;

        // defaults
        let data = this.products;
        let offset = params.offset ? params.offset : 0;
        let limit = params.limit ? params.limit : 10;

        // Filters
        // id
        data = this.filterById(params, data); //? data or query?
        // ... more filters

        // Pagination
        data = data.slice(offset, offset + limit);

        // Return the dataprovider
        return data;
    }


    /**
     * Filters data by product id.
     * 
     * @param {Object} params - The parameters for filtering (e.g., from the request).
     * @param {Array} data - The data or query to be filtered.
     * @returns {Array} - The filtered data.
     */
    filterById(params, data) {
        if(params.id) {
            data = this.products.filter(product => {
                return product.id == params.id; // <- beware of type check
            });
        }
        return data;
    }


}