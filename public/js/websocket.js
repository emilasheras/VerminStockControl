console.log('(websocket.js) 💻↔💻 Custom Websocket JS');

// Socket.io
const socket = io();
// Constants
const SERVER_MESSAGE = 'server:message';
const CLIENT_MESSAGE = 'client:message';

// Send message to server
socket.emit(CLIENT_MESSAGE, 'Hello');
// Receive message from server
socket.on(SERVER_MESSAGE, (msg) => {
    console.log(`🔮 ${msg}`);
});