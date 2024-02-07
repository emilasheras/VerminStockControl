/** IMPORTS **/
import ProductManager from "./models/ProductManager/ProductManager.js";

/** VARIABLES **/
const ANSImagenta = '\x1b[35m%s\x1b[0m';
const ANSIgreen =   '\x1b[32m%s\x1b[0m';
const ANSIred =     '\x1b[31m%s\x1b[0m';

/** METHODS **/

/**
 * Check if the products array is empty (and an array...)
 */
function testEmptyProducts() {
    console.log(manager.getProducts()); // Must show an empty array
    // ✨
    if (manager.getProducts().length === 0 && manager.getProducts().constructor === Array){
        console.log(ANSIgreen, '✅ Test passed');
    }
    else {
        console.log(ANSIred, '❌ Test failed');
    }
}

/**
 * Add a product and check if it was added
 */
function testAddProduct() {
    manager.addProduct({
        title: "TestProduct [001]",
        description: "This is a test product",
        price: 15,
        thumbnail: "Sin imagen", // i like null better, really
        code: "20L31ABH",
        stock: 25,
    });
    console.log(manager.getProducts()); // Must show the product added

    // ✨
    if (manager.getProducts().length !== 0 && manager.getProducts().constructor === Array){
        console.log(ANSIgreen, '✅ Test passed');
    }
    else {
        console.log(ANSIred, '❌ Test failed');
    }
}

/**
 * trying to add a product with the same code MUST throw an error
 */
function testAddProductWithSameCode() {
    try {
        manager.addProduct({
            title: "TestProduct [002]",
            description: "This is a test product. But with the same code as the previous one.",
            price: 15,
            thumbnail: "Sin imagen",
            code: "20L31ABH",
            stock: 25,
        }); //! an error should be thrown here

        console.log(ANSIred, '❌ Test failed');
    } catch (e) {
        console.error(e.message); // Should show the error message
        console.log(ANSIgreen, '✅ Test passed');
    }
}

/**
 * Get a product by a known existing ID
 */
function testGetProductById() {
    try {
        const product = manager.getProductById(1); //! an error could be thrown here
        
        console.log(product); // Must show the product added
        console.log(ANSIgreen, '✅ Test passed');
    } catch (e) {
        console.error(e.message);
        console.log(ANSIred, '❌ Test failed');
    }
}
/**
 * Get a product by a known undefined ID
 */
function testGetProductByIdNotFound() {
    try {
        console.log(manager.getProductById(2)); //! an error should be thrown here
        console.log(ANSIred, '❌ Test failed');
    } catch (e) {
        console.error(e.message);
        console.log(ANSIgreen, '✅ Test passed');
    }
}


/** TESTS **/
const manager = new ProductManager();

console.log(ANSImagenta, 'Running Test: testEmptyProducts()');
testEmptyProducts();
console.log(ANSImagenta, 'Running Test: testAddProduct()');
testAddProduct();
console.log(ANSImagenta, 'Running Test: testAddProductWithSameCode()');
testAddProductWithSameCode();
console.log(ANSImagenta, 'Running Test: testGetProductById()');
testGetProductById();
console.log(ANSImagenta, 'Running Test: testGetProductByIdNotFound()');
testGetProductByIdNotFound();