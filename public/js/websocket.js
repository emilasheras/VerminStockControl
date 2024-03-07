console.log('(websocket.js) 💻↔💻 Custom Websocket JS');

// Socket.io
const socket = io();
// Constants
const SERVER_MESSAGE = 'server:message';
const CLIENT_MESSAGE = 'client:message';
const BROADCAST_MESSAGE = 'broadcast';
const UPDATED_USER_LIST = 'updateUserList';

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

function updateUserList(users) {
    const userList = document.querySelector('#current-users');
    userList.innerHTML = ''; // Clear the current list
    users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user; // Assuming user is a string. Adjust if it's an object.
        userList.appendChild(li);
    });
}