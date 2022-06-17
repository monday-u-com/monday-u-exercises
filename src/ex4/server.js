// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require('express');
require('express-async-errors');
const port = 8080;
const app = express();


app.use(express.static('dist'));
app.use(express.json());



app.listen(port, () => {
  console.log("Server started on port", port);
});