class ItemManager {
	constructor() {
		this.tasks = [];
	}

	addTask(task) {
		if (task === '') {
			alert('Add a value to create a new task');
		} else if (this.tasks.includes(task)) {
			alert(`The task "${task}" is already in the list`);
		} else {
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
		if (document.querySelectorAll('.list-item').length != 0) {
			img.className = 'noTasks-img-hidden';
			pendingTaskSection.className = 'pendingTasksCounter-visible';
		} else {
			img.className = 'NoTasksImg-visible';
			pendingTaskSection.className = 'pendingTasksCounter-hidden';
		}
	}
}
