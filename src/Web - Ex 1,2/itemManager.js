export class ItemManager {
	constructor() {
		this.tasks = [];
	}

	async addTask(task) {
		if (task === '') {
			alert('Add a value to create a new task');
		} else if (this.tasks.includes(task)) {
			alert(`The task "${task}" is already in the list`);
		} else {
			//axios.post('/tasks', { sqwe: 'sqwe' });
			this.tasks.push(task);
		}
	}

	removeTask(task) {
		this.tasks = this.tasks.filter((e) => e !== task);
	}

	removeAllTasks() {
		this.tasks = [];
	}

	handleNoTasks() {
		const img = document.querySelector('#imageOnNoTasks');

		const pendingTaskSection = document.querySelector(
			'#pendingTasksCounter'
		);
		console.log(document.querySelectorAll('.list-item'));
		if (document.querySelectorAll('.list-item').length != 0) {
			img.className = 'noTasks-img-hidden';
			pendingTaskSection.className = 'pendingTasksCounter-visible';
		} else {
			img.className = 'NoTasksImg-visible';
			pendingTaskSection.className = 'pendingTasksCounter-hidden';
		}
	}
}

//export default ItemManager;
