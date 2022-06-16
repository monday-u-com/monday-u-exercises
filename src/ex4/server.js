import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import ErrorHandler from './server/middleware/ErrorHandler.js';
import task_router from './server/routes/task.js';
import pokemon_router from './server/routes/pokemon.js';

const app = express();

// middleware
app.use([morgan("common"), compression(), express.json()]);

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

app.use('/task', task_router);

app.use('/pokemon', pokemon_router);

app.use(ErrorHandler);

process.on('unhandledRejection', (reason, promise) => {
    console.log('Uncaught Rejection', reason.message);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});

const server = app.listen(8000, () => {
    const { address, port } = server.address();
    console.log('Express app listening at http://%s:%s', address, port);
});