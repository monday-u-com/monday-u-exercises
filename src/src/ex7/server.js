const express =  require('express');
const path  = require('path')
const itemRouter = require( './server/routes/api.js');
const  {errorHandler} = require('./server/middleware/error_handler');
const  {logger}  = require('./server/middleware/logger');
const  cors = require('cors');
const  bodyParser = require( 'body-parser');
const Sequelize = require('sequelize');
const  port = 8081;
const app = express();


const sequelize = new Sequelize("tododb", "root", "kokoriko1992", {
    host: 'localhost',
    dialect:  'mysql' 
  });
  
  async function test(){
    try {
      await sequelize.authenticate();
      console.log('Connection successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  test()

app.use(bodyParser.json())

app.use(logger)

app.use([cors(),express.json()]);
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.resolve(__dirname, '/client/build')));
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

