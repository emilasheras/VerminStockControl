import ProductManager from "./Components/ProductManager.js";

export default class ProductModel {
    /**
     * @param {JSON} params attributes of the product in JSON format 
     */
    constructor(params) {
        this.id = params.id; // Autogenerated Number or String (IDs should never repeat).
        this.products = []; // <- Should hold the foreign key to the products. And the quantity attribute
    
        // this.errors = []; // Array of error messages
        // this.hasErrors = false; // Boolean to check if the model has errors
        // this.validateAttributes();
    }
    addProduct(productModel){
        this.products.push(productModel);
    }
}