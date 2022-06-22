// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from 'express';
import itemRouter from './server/routes/api.js';
import errorHandler from './server//middleware/error_handler.js';
import {logger} from './server//middleware/logger.js'
import cors from 'cors'
import Sequelize from 'sequelize';
const  port = 3000;
const app = express();
const models = require("./models");

const sequelize = new Sequelize("tododb", "root", "password", {
    host: 'localhost',
    dialect:  'mysql' 
  });
  
  async function test(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  test()

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to esparkinfo application." });
  });

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

