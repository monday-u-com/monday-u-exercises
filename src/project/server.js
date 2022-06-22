const express =  require('express')
const todoRouter = require('./server/routes/api.js')
const logger = require('./server/middlewares/logger.js')

const port = 8080;
const app = express();

app.use([logger])
app.use(express.json())
app.use(express.static('dist'))
app.use('/todo', todoRouter)

app.get('/', (req, res) => {
    res.render('index.html')
})

app.listen(port, () => {
    console.log("Server started on port", port);
});