// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from 'express';
import itemRouter from './server/routes/api.js';
import errorHandler from './server//middleware/error_handler.js';
import {logger} from './server//middleware/logger.js'
import cors from 'cors'
const  port = 8080;
const app = express();



app.use([logger,cors(),express.json()]);
app.use(express.static( 'dist'));
app.use('/item', itemRouter);
app.use(errorHandler);
process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
    throw reason
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});



app.listen(port, () => {console.log( `Server is Running on Port: http://localhost:${port}`); })

