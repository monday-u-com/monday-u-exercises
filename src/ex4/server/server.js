const express = require('express');
const cors = require('Cors');
const bodyParser = require('body-parser');
const tasksRouter = require('./server/routes/api');
const logger = require('./server/middleware/logger');
const errorHandler = require('./server/middleware/error-handaling');
const port = process.env.PORT || 8080;
const app = express();

app.use([logger, cors(), bodyParser.json()]);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

app.use('/tasks', tasksRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is connected on port ${port}`);
});
