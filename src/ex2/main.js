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
				await this.validateInput();
			});
		document.getElementById("clear-btn").addEventListener("click", () => {
			this.clearAll();
		});
	}

	renderTaskList(itemArray) {
		const tasksList = document.getElementById("list");
		const empyState = document.getElementById("empty-state");
		const clearBtn = document.getElementById("clear-btn");
		tasksList.innerHTML = "";
		if (itemArray.length > 0) {
			itemArray.forEach((item) => {
				empyState.style.display = "none";
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
				clearBtn.style.display = "block";
			});
		} else {
			clearBtn.style.display = "none";
			empyState.style.display = "block";
		}
	}

	async validateInput() {
		const inputValue = document.getElementById("list-item-input").value;
		const patternForNumbers = /^\d+$/;
		if (patternForNumbers.test(inputValue) || inputValue.includes(",")) {
			const items = await this.itemManager.pokemonIdsTostring(inputValue);
			this.renderTaskList(items);
		} else {
			const items = this.itemManager.addListItem(inputValue);
			this.renderTaskList(items);
		}
	}

	clearAll() {
		const empyArray = this.itemManager.clearItemsArray();
		this.renderTaskList(empyArray);
	}
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
	// you should create an `init` method in your class
	// the method should add the event listener to your "add" button
	main.init();
});
