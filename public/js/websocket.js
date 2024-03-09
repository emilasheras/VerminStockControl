document.addEventListener('DOMContentLoaded', function () {
    console.log('(websocket.js) 💻↔💻 Custom Websocket JS');

    // Socket.io
    const socket = io();
    // Constants
    const SERVER_MESSAGE = 'server:message';
    const CLIENT_MESSAGE = 'client:message';
    const BROADCAST_MESSAGE = 'broadcast';
    const UPDATED_USER_LIST = 'updateUserList';
    const GET_PRODUCTS = 'getProducts';
    const UPDATED_PRODUCTS = 'updateProducts';
    const ADD_PRODUCT = 'addProduct';
    const DELETE_PRODUCT = 'deleteProduct';

    // Send message to server
    socket.emit(CLIENT_MESSAGE, 'Hello');
    // Receive message from server
    socket.on(SERVER_MESSAGE, (msg) => {
        console.log(`🔮 ${msg}`);
    });
    socket.on(BROADCAST_MESSAGE, (msg) => {
        console.log(`📡 ${msg}`)
    });
    socket.on(UPDATED_USER_LIST, (users) => {
        console.log(`👥 Users: ${users.length}`);
        updateUserList(users);
    });
    socket.emit(GET_PRODUCTS);
    socket.on(UPDATED_PRODUCTS, (products) => {
        console.log(`📦 Products: ${products.length}`);
        renderProducts(products);
    });

    function updateUserList(users) {
        const userList = document.getElementById('current-users');
        userList.innerHTML = ''; // Clear the current list
        users.forEach((user) => {
            const li = document.createElement('li');
            li.textContent = user; // Assuming user is a string. Adjust if it's an object.
            userList.appendChild(li);
        });
    }
    function renderProducts(productsJson) {
        const container = document.getElementById('all-products-container');
        container.innerHTML = ''; // Clear existing content

        const ul = document.createElement('ul');
        productsJson.forEach(product => {
            const li = document.createElement('li');
            li.className = 'd-flex-column';

            const title = document.createElement('h2');
            title.textContent = product.title;

            const description = document.createElement('p');
            description.textContent = product.description;

            const price = document.createElement('p');
            price.textContent = `Price: $${product.price}`;

            const code = document.createElement('p');
            code.textContent = product.code;

            li.appendChild(title);
            li.appendChild(description);
            li.appendChild(price);
            li.appendChild(code);
            ul.appendChild(li);

            const hr = document.createElement('hr');
            // add a delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-product-button';
            deleteButton.addEventListener('click', function () {
                console.log(`Deleting product:`, product.id);
                socket.emit(DELETE_PRODUCT, product.id);
            });
            li.appendChild(deleteButton);

            // add a horizontal divider
            ul.appendChild(hr);
        });

        container.appendChild(ul);
    }

    // Products Form
    const addButton = document.getElementById('add-product-button');
    // Listen for click events on the "Add Product" button
    addButton.addEventListener('click', function () {
        const formProductAttributes = [
            'title',
            'description',
            'code',
            'price',
            'stock',
            'category',
            // 'thumbnails' // todo: add support for multiple images
        ];
        
        // Create an object with the product data
        const productData = formProductAttributes.reduce((acc, attribute) => {
            const elementValue = document.querySelector(`#add-product-form [name="${attribute}"]`).value;
            // Cast 'price' and 'stock' to number
            if (attribute === 'price' || attribute === 'stock') {
                acc[attribute] = Number(elementValue);
            } else {
                acc[attribute] = elementValue;
            }
            return acc;
        }, {});

        // Use the socket to emit an event to add the product
        // todo: add support for `thumbnails` attribute
        socket.emit(ADD_PRODUCT, {...productData, thumbnails: []});

        // Clear the form fields
        formProductAttributes.forEach(attribute => {
            document.querySelector(`#add-product-form [name="${attribute}"]`).value = '';
        });
    });


}); // End of DOMContentLoaded