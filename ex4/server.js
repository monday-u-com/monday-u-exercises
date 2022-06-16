const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./server/routes/todoRouter');
const logger = require('./server/middleware/logger');

const port = 5500;
const app = express();

app.use(logger);
app.use(bodyParser.json());
app.use(express.static('dist'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, DELETE'
	);
	next();
});

app.use('/todo', todoRouter);

app.get('/', (req, res) => {
	res.header('Access-Control-Allow-Origin', 'true');
	res.status(200).json({
		health: 'ok',
	});
});

app.post('/error', async (req, res, next) => {
	try {
		let error = Error('Error');
		error.statusCode = 400;
		throw error;
	} catch (e) {
		next(e);
	}
});

app.listen(port, () => {
	console.log('Server started on port ', port);
});
