import { Server } from 'socket.io';

// Constants
const SERVER_MESSAGE = 'server:message';
const CLIENT_MESSAGE = 'client:message';
const BROADCAST_MESSAGE = 'broadcast';
const UPDATED_USER_LIST = 'updateUserList';
const DIVIDER = '▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰▱▱▰';

// Variables
let users = [];

export default function setupWebSocket(server) {
    const socketServer = new Server(server);


    // Connection
    socketServer.on('connection', (socket) => {
        const clientCount = socket.server.eio.clientsCount;
        const id = socket.id;
        const time = socket.handshake.time;

        // Add user to list
        addUser(socketServer, id);
        
        // Log
        console.log(`\n${DIVIDER}`);
        console.log(`💻 Connected [${id}]`);
        console.log(`🕒 Time: ${time}`);
        console.log(`🔢 Total clients: ${clientCount}`)
        console.log(`${DIVIDER}\n`);
        
        // Receive message from client
        socket.on(CLIENT_MESSAGE, (msg) => {
            // console.log(`📱 ${msg}`);
        });

        // Disconnect
        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${id}`);
            removeUser(socketServer, id);
        });
    });

    return socketServer;
}

function addUser(socketServer, id) {
    users.push(id);
    socketServer.emit(UPDATED_USER_LIST, users);
}
function removeUser(socketServer, id) {
    users = users.filter((user) => user !== id);
    socketServer.emit(UPDATED_USER_LIST, users);
}