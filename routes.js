import baseAppRouter from "./src/routes/base.js";
import productsRouter from "./src/routes/ProductRouter.js";
import cartsRouter from "./src/routes/CartsRouter.js";
import userRouter from "./src/routes/UserRouter.js";

export default function setupAppRoutes(app) {
    app.use('/', baseAppRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/users', userRouter);
}
