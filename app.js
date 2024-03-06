import dotenv from 'dotenv';
import express from "express";
// __dirname of the project
import __dirname from './utils.js';
// Handlebars
import handlebars from 'express-handlebars';
// Routes
import baseAppRouter from "./src/routes/base.js";
import productsRouter from "./src/routes/ProductRouter.js";
import cartsRouter from "./src/routes/CartsRouter.js";
import userRouter from "./src/routes/UserRouter.js";
// Socket.io
import { Server } from 'socket.io';


/** CONSTANTS **/
const ANSImagenta = '\x1b[35m%s\x1b[0m';
const ANSIgreen =   '\x1b[32m%s\x1b[0m';
const ANSIred =     '\x1b[31m%s\x1b[0m';


/** VAR **/
dotenv.config();
// Express App Instance
const app = express();
// Port 
const SERVER_PORT = process.env.SERVER_PORT || 8080;
// Static Assets (public folder)
app.use(express.static(__dirname+'/public'));
// Parse req bodies to JSON automatically
app.use(express.json()); // This line is crucial for parsing JSON req bodies


// Routes
app.use('/', baseAppRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/users', userRouter);


// Handlebars setup
// Initialize the handlebars engine
app.engine('handlebars', handlebars.engine());
// Set the project views path
app.set('views', __dirname+'/src/views');
// Set the view engine as handlebars
app.set('view engine', 'handlebars');

// Start server (HTTP)
const httpServer = app.listen(SERVER_PORT, () => {
    console.log(ANSIgreen, `\n⚙  Server running at http://localhost:${SERVER_PORT}`)
});

// Socket.io (TCP Websockets)
const socketServer = new Server(httpServer);
// Socket.io events
socketServer.on('connection', (socket) => {
    console.log(`🔌 Socket.io: Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(ANSIred, `❌ Socket.io: Client disconnected: ${socket.id}`);
    });
});