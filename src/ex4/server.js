// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require('express');
require('express-async-errors');
const logger = require('./server/middlewares/logger');
const errorHandler = require('./server/middlewares/errorHandler');
const todoRouter = require('./server/routes/api')
const port = 8080;
const app = express();

app.use([logger, express.json()]);
app.use('/static', express.static('dist'));
app.use('/item', todoRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        health: 'ok'
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
    throw reason
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log("Server started on port", port);
});