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
    console.log(`👥 Users: ${users}`);
    updateUserList(users);
});
socket.emit(GET_PRODUCTS);
socket.on(UPDATED_PRODUCTS, (products) => {
    console.log(`📦 Products: ${products}`);
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
  
      li.appendChild(title);
      li.appendChild(description);
      li.appendChild(price);
      ul.appendChild(li);
  
      const hr = document.createElement('hr');
      ul.appendChild(hr);
    });
  
    container.appendChild(ul);
  }
  