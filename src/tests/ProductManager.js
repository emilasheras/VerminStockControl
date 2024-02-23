/** IMPORTS **/
import ProductManager from "../models/Components/ProductManager.js";

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
    const testProduct = {
        title: "TestProduct [001]",
        description: "This is a test product",
        price: 15,
        thumbnail: "Sin imagen", // i like null better, really
        code: "20L31ABH",
        stock: 25,
    };
    manager.addProduct(testProduct);
    
    console.log(manager.getProducts()); // Get the last product added

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

function testUpdateProduct() {
    try {
        // define a product id to update
        const productRefId = 1;
        // get the product to update
        const oldProduct = manager.getProductById(productRefId);
        // define a new product with different known values
        const newProduct = {
            title: "TestProduct [001]",
            description: "This is a test product",
            price: 15,
            thumbnail: "Sin imagen",
            code: "20L31ABH",
            stock: 26, //* the only different value
            id: productRefId // <- this is the important part
        };
        const product = manager.updateProduct(productRefId, newProduct);

        // check if the product was updated
        // console.log(JSON.stringify(newProduct));
        // console.log(JSON.stringify(oldProduct));
        if (JSON.stringify(newProduct) === JSON.stringify(oldProduct)) {
            throw new Error('Product not updated');
        }

        console.log(product); // Must show the product added
        console.log(ANSIgreen, '✅ Test passed');
    } catch (e) {
        console.error(e.message);
        console.log(ANSIred, '❌ Test failed');
    }
}

function testDeleteProduct() {
    try {
        // define a product id to delete
        const productRefId = 1;
        
        // get the product we 'bout to delete
        const productBefore = manager.products.find(p => p.id === productRefId);
        console.log(`productBefore`, productBefore);

        // remove that sucker
        const result = manager.deleteProduct(productRefId);

        // get the product we 'bout to delete
        const productAfter = manager.products.find(p => p.id === productRefId);
        console.log(`productAfter`, productAfter);

        // check if the product was deleted
        if(!result) throw new Error('Product not deleted');
        else if (productBefore === productAfter) {
            throw new Error('Product not deleted');
        }
        else if (productAfter !== undefined) {
            throw new Error('Product not deleted');
        }
        // If we got here, the product was deleted successfully
        console.log(ANSIgreen, '✅ Test passed');
    } catch (e) {
        console.error(e.message);
        console.log(ANSIred, '❌ Test failed');
    }
}

/** Tests **/

/** Entrega 2 **/
const test2FilePath = './data/data.json'
const manager = new ProductManager(test2FilePath); // <- Reassigning the manager

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

// Entrega 2 specific tests::
// todo:
// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, 
// se evaluará que no se elimine el id y que sí se haya hecho la actualización.
console.log(ANSImagenta, 'Running Test: testUpdateProduct()');
setTimeout(() => {testUpdateProduct()}, 2000); //todo: research on js doc why fast async writes to file overlap here (related to saveProducts() method)

// todo:
// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto 
// o que arroje un error en caso de no existir.
console.log(ANSImagenta, 'Running Test: testDeleteProduct()');
setTimeout(() => {testDeleteProduct()}, 4000); //todo: research on js doc why fast async writes to file overlap here (related to saveProducts() method)
