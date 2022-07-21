const express = require('express');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');

const main = async () => {

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', api);

  const port = process.env.PORT || '3042';
  app.listen(port, function () { console.log('Running on ' + port); });
};

main();
