import dotenv from 'dotenv';
import express from "express";
import baseAppRouter from "./src/routes/base.js";
import productsRouter from "./src/routes/ProductRouter.js";


/** CONSTANTS **/
const ANSImagenta = '\x1b[35m%s\x1b[0m';
const ANSIgreen =   '\x1b[32m%s\x1b[0m';
const ANSIred =     '\x1b[31m%s\x1b[0m';

/** VAR **/
dotenv.config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 8080;

app.use(express.json()); // This line is crucial for parsing JSON req bodies

// Routes
app.use('/', baseAppRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', productsRouter);

// Start server
app.listen(SERVER_PORT, () => {
    console.log(ANSImagenta, `Server running at http://localhost:${SERVER_PORT}`)
});