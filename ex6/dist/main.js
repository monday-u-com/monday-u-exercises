class Main {
	constructor() {
		this.itemClient = new ItemClient();
	}

	init = async () => {
		const addItemButton = document.getElementById('list-item-submit');
		addItemButton.addEventListener('click', this.handleItem);

		const deleteAllBtn = document.getElementById('list-item-clear');
		deleteAllBtn.addEventListener('click', this.handleDeleteAll);

		await this.renderItems();
	};

	handleItem = async () => {
		const input = document.getElementById('list-item-input');
		const inputValue = input.value;
		await this.itemClient.postItem(inputValue);
		await this.renderItems();
	};

	deleteItem = async (item) => {
		await this.itemClient.deleteItem(item);
		await this.renderItems();
	};
	popUp = async (item) => {
		const { value: text } = await swal.fire({
			input: 'textarea',
			inputLabel: 'Edit your task',
			inputValue: item,
			inputAttributes: {
				'aria-label': 'Type your message here',
			},
			showCancelButton: true,
		});
		if (text) {
			await this.itemClient.editItem(item, text);
		}
	};
	editItem = async (item) => {
		let itemToEdit;
		const list = document.querySelectorAll('.list-item');
		for (const listItem of list) {
			if (listItem.textContent == item) {
				itemToEdit = listItem;
				await this.popUp(item);
			}
		}

		await this.renderItems();
	};

	updateStatus = async (item) => {
		await this.itemClient.updateStatus(item);
	};

	renderItems = async () => {
		const list = document.getElementById('list');
		list.innerHTML = '';
		const items = await this.itemClient.getItems();

		items.forEach((item) => {
			const listItem = document.createElement('li');
			listItem.classList.add('list-item');
			const listItemStatusButton = this._createStatusButton(
				item.ItemName,
				item.status
			);
			const listItemDeleteButton = this._createDeleteButton(
				item.ItemName
			);
			const editItemButton = this._createEditButton(item.ItemName);

			listItem.appendChild(listItemStatusButton);
			const span = document.createElement('span');
			span.innerHTML = item.ItemName;
			span.className = 'task-content';

			listItem.appendChild(span);
			listItem.appendChild(editItemButton);
			listItem.appendChild(listItemDeleteButton);
			list.appendChild(listItem);
		});
		this.updateCounter(items);
		this.changeImageState();
		this.updateTaskCounter();
		this.clearForm();
	};

	handleDeleteAll = async () => {
		const items = await this.itemClient.getItems();
		items.forEach((item) => {
			this.deleteItem(item.ItemName);
		});
	};

	changeImageState() {
		const img = document.querySelector('#imageOnNoTasks');
		if (document.querySelectorAll('.list-item').length != 0) {
			img.className = 'noTasks-img-hidden';
		} else {
			img.className = 'NoTasksImg-visible';
		}
	}

	updateTaskCounter() {
		const pendingTaskSection = document.querySelector(
			'#pendingTasksCounter'
		);
		if (document.querySelectorAll('.list-item').length != 0) {
			pendingTaskSection.className = 'pendingTasksCounter-visible';
		} else {
			pendingTaskSection.className = 'pendingTasksCounter-hidden';
		}
	}

	updateCounter(tasks) {
		document.querySelector('#counter').textContent = tasks.length;
	}

	clearForm() {
		document.querySelector('#list-item-input').value = '';
	}

	_createDeleteButton = (item) => {
		const button = document.createElement('img');
		button.src = './images/delete_icon.svg';
		button.classList.add('list-item-delete-button');
		button.addEventListener('click', (_) => this.deleteItem(item));
		return button;
	};

	_createEditButton = (item) => {
		const button = document.createElement('img');
		button.src = './images/edit_btn.svg';
		button.classList.add('edit-item-button');
		button.addEventListener('click', (_) => this.editItem(item));
		return button;
	};

	_createStatusButton = (item, status) => {
		const button = document.createElement('input');
		button.type = 'checkbox';
		button.classList.add('list-item-status-button');
		button.checked = status;
		button.addEventListener('click', (_) => this.updateStatus(item));

		return button;
	};
}
const main = new Main();

document.addEventListener('DOMContentLoaded', function () {
	main.init();
});
