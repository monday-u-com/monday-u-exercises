const getAllTasks = (req, res) => {
	res.send('get all tasks');
};
const createTask = (req, res) => {
	console.log(req.body);
};
const getTask = (req, res) => {
	res.json({ id: req.params.id });
};
const deleteTask = (req, res) => {
	res.send('delete spesific task');
};

const deletteAllTasks = (req, res) => {
	res.send('delete all tasks');
};

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	deleteTask,
	deletteAllTasks,
};
