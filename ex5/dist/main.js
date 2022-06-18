class Main {
	constructor() {
		this.itemClient = new ItemClient();
	}

	init = async () => {
		const addItemButton = document.getElementById('list-item-submit');
		addItemButton.addEventListener('click', this.handleItem);

		await this.renderItems();
	};

	handleItem = async () => {
		const input = document.getElementById('list-item-input');
		const inputValue = input.value;

		const t = await this.itemClient.postItem(inputValue);
		this.renderItems();
	};

	deleteItem = async (item) => {
		await this.itemClient.deleteItem(item);
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
			listItem.innerHTML = item.ItemName;
			const listItemStatusButton = this._createStatusButton(
				item.ItemName
			);
			const listItemDeleteButton = this._createDeleteButton(
				item.ItemName
			);
			listItem.appendChild(listItemStatusButton);
			listItem.appendChild(listItemDeleteButton);
			list.appendChild(listItem);
		});
		this.clearForm();
	};

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

	_createStatusButton = (item) => {
		const button = document.createElement('input');
		button.type = 'checkbox';
		button.classList.add('list-item-status-button');
		button.addEventListener('click', (_) => this.updateStatus(item));

		return button;
	};
}
const main = new Main();

document.addEventListener('DOMContentLoaded', function () {
	main.init();
});
