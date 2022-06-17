// Express boilerplate, hosting the `dist` file, connecting to the routes
var express = require('express');
const todoRouter = require('./server/routes/api.js');
const app = express();
const PORT = 3000;



app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('dist'));

app.use('/tasks', todoRouter);


app.listen(PORT,()=>{
    console.log(`Server is Running on Port: http://localhost:${PORT}`)
})