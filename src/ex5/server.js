<<<<<<< HEAD
const express =  require('express');
const path  = require('path')
const itemRouter = require( './server/routes/api.js');
const  {errorHandler} = require('./server/middleware/error_handler');
=======
// Express boilerplate, hosting the `dist` file, connecting to the routes
const express =  require('express');
const itemRouter = require( './server/routes/api.js');
const  {handleError} = require('./server/middleware/error_handler');
>>>>>>> ex5
const  {logger}  = require('./server/middleware/logger');
const  cors = require('cors');
const  bodyParser = require( 'body-parser');
const Sequelize = require('sequelize');
<<<<<<< HEAD
const  port = 8083;
=======
const  port = 8000;
>>>>>>> ex5
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

<<<<<<< HEAD
  app.use(logger)
  app.use([cors(),express.json()]);
  app.use(errorHandler)
  app.use(bodyParser.urlencoded({extended:false}))
  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, '/client/build')));
  app.use('/item', itemRouter);
  process.on('unhandledRejection', (reason, promise) => {
      console.log("Unhandled Rejection", reason.message);
      throw reason
  });
=======
app.use(bodyParser.json())

app.use(logger)

app.use([cors(),express.json()]);
app.use(express.static( 'dist'));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/item', itemRouter);
app.use(handleError);
process.on('unhandledRejection', (reason, promise) => {
    console.log("Unhandled Rejection", reason.message);
    throw reason
});
>>>>>>> ex5

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});



app.listen(port, () => {console.log( `Server is Running on Port: http://localhost:${port}`); })

