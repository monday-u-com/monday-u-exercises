const express = require('express');
const bodyParser = require('body-parser');
const tasks = require('./rounters/tasks');

const app = express();
const port = 5500;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./dist'));

app.use('/api/v1/tasks', tasks);

app.listen(port);
