class Main {
	constructor() {
		this.itemClient = new ItemClient();
	}
	init = async () => {
		const addItemButton = document.getElementById('addTask-btn');
		addItemButton.addEventListener('click', this.handleItem);

		const clearAllButton = document.querySelector('#list-item-clear');
		clearAllButton.addEventListener('click', this.handleDeleteAll);

		await this.renderItems(); // this will make it so that any time you refresh the page you'll see the items already in your todo list
	};

	handleItem = async () => {
		const value = document.querySelector('#list-item-input').value;
		const todo = { value };
		this.itemClient.addTodo(todo);
		document.querySelector('#list-item-input').value = '';
		setTimeout(async () => {
			await this.renderItems();
		}, 500);
	};

	deleteItem = async (item, deleteAllItems) => {
		let todoId;
		const todoList = await this.itemClient.getTodos();
		if (deleteAllItems) {
			todoId = item.id;
		} else {
			const todo = todoList.find(
				(todoListItem) => todoListItem.todo === item
			);
			todoId = await todo.id;
		}
		this.itemClient.deleteTodo(todoId);
		setTimeout(async () => {
			await this.renderItems();
		}, 50);
	};

	renderItems = async () => {
		const list = document.getElementById('list');
		list.innerHTML = '';

		const todoList = await this.itemClient.getTodos();
		const items = todoList.map((item) => {
			return item.todo;
		});

		items.forEach((item) => {
			const listItem = document.createElement('li');
			listItem.classList.add('list-item');
			listItem.innerHTML = item;

			const listItemDeleteButton = this._createDeleteButton(item);
			listItem.appendChild(listItemDeleteButton);
			list.appendChild(listItem);
		});
		this.updateCounter(items);
		this.handleNoTasks();
	};

	updateCounter(tasks) {
		document.querySelector('#counter').textContent = tasks.length;
	}
	handleNoTasks() {
		const img = document.querySelector('#imageOnNoTasks');
		const pendingTaskSection = document.querySelector(
			'#pendingTasksCounter'
		);
		if (document.querySelectorAll('.list-item').length > 0) {
			img.className = 'noTasks-img-hidden';
			pendingTaskSection.className = 'pendingTasksCounter-visible';
		} else {
			img.className = 'NoTasksImg-visible';
			pendingTaskSection.className = 'pendingTasksCounter-hidden';
		}
	}

	_createDeleteButton = (item) => {
		const button = document.createElement('img');
		button.src = './images/delete_icon.svg';
		button.classList.add('list-item-delete-button');
		button.addEventListener('click', (_) =>
			this.deleteItem(item, undefined)
		);

		return button;
	};

	handleDeleteAll = async () => {
		const todoList = await this.itemClient.getTodos();
		for (const singleTodo of todoList) {
			this.deleteItem(singleTodo, true);
		}
	};
}
const main = new Main();
document.addEventListener('DOMContentLoaded', function () {
	main.init();
});
