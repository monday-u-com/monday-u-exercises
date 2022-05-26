import ItemManager from "./item_manager.js";

// Implement the `Main` class here
class Main {
	constructor() {
		this.itemManager = new ItemManager();
	}
	init() {
		document
			.getElementById("list-item-submit")
			.addEventListener("click", async () => {
				const itemsList = await this.validateInput();
			});
	}

	renderTaskList(itemArray) {
		const tasksList = document.getElementById("list");
		tasksList.innerHTML = "";
		itemArray.forEach((item) => {
			const newItem = document.createElement("li");
			newItem.innerText = item.value;
			newItem.id = item.id;
			newItem.className = "list-item";

			const trashImg = document.createElement("img");
			trashImg.src = "./images/delete_icon.svg";
			trashImg.className = "list-item-delete-button";
			trashImg.addEventListener("click", (e) => {
				e.stopPropagation();
				this.itemManager.removeItem(newItem.id);
				newItem.remove();
			});
			newItem.appendChild(trashImg);
			tasksList.appendChild(newItem);
		});
	}

	async validateInput() {
		const inputValue = document.getElementById("list-item-input").value;
		const patternForNumbers = /^\d+$/;
		if (patternForNumbers.test(inputValue) || inputValue.includes(",")) {
			const items = await this.itemManager.pokemonIdsTostring(inputValue);
			debugger;
			this.renderTaskList(items);
		} else {
			const items = this.itemManager.addListItem(inputValue);
			this.renderTaskList(items);
		}
	}
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
	// you should create an `init` method in your class
	// the method should add the event listener to your "add" button
	main.init();
});
