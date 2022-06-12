// Express boilerplate, hosting the `dist` file, connecting to the routes
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();
const PORT = 5000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) =>{
    res.send('HELLO FROM HOME PAGE');
});

app.listen(PORT,()=>{
    console.log(`Server is Running on Port: http://localhost:${PORT}`)
})