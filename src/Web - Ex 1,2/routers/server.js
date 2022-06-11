import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import path from 'path';
const port = 5500;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	express.static(
		'/Users/michaykalika/Downloads/Ex3/monday-u-exercises/src/Web - Ex 1,2'
	)
);

app.post('/tasks', (req, res) => {
	res.status(200);
	console.log(res);
});

app.get('/tasks', (req, res) => {
	res.status(201).json({ g: 'Gd' });
});

app.listen(port);
