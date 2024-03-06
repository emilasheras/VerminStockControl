import { Server } from 'socket.io';

export default function setupWebSocket(server) {
    const socket = new Server(server);
    // Constants
    const SERVER_MESSAGE = 'server:message';
    const CLIENT_MESSAGE = 'client:message';
    

    // Connection
    socket.on('connection', (socket) => {
        console.log(`🔌 Client connected: ${socket.id}`);
        
        socket.on(CLIENT_MESSAGE, (msg) => {
            console.log(`📱 ${msg}`);
            socket.emit(SERVER_MESSAGE, 'Server emitted this');
        });


        // Disconnect
        socket.on('disconnect', () => {
            console.log(`❌ Client disconnected: ${socket.id}`);
        });
    });

    return socket;
}