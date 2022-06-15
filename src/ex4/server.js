// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require('express');
const todoRouter = require('./server/routes/api');
const logger = require('./server/middleware/logger')
const PORT = 3000;
const app = express();

app.use([express.json(),logger]);

app.use('/',express.static('dist'));

app.use('/todo', todoRouter);

app.get('/health', (req, res) => {
    res.status(200).json({
        health: 'ok'
    });
});

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
})