const newToDo_txt = document.getElementById("NewToDo_txt");
const newToDo_btn = document.getElementById("NewToDo_btn");
const tasksList = document.getElementById("taskList");
const clearAll_btn = document.getElementById("clearAll");
const emptyState = document.getElementById("emptyState");
const amountTasks = document.getElementById("amountTasks");
import { getAllTasks, addItem, deleteItem } from "./clients/item_client.js";

const createItems = (items = []) => {
	if (items.length > 0) {
		tasksList.innerHTML = "";
		displayAmountTasks(items.length);
		items.forEach((item, i) => {
			const taskElement = document.createElement("div");
			taskElement.id = i;
			taskElement.innerText = item.value;
			taskElement.classList.add("clickable", "task-element");
			taskElement.addEventListener("click", () => {
				alert(taskElement.innerText);
			});

			const deleteTask = document.createElement("div");
			deleteTask.classList.add("clickable", "delete-button");

			const trashImg = document.createElement("img");
			trashImg.src = "./images/trash.png";
			trashImg.className = "tash-icon";

			deleteTask.addEventListener("click", async (e) => {
				e.stopPropagation();
				const items = await deleteItem(taskElement.id);
				taskElement.remove();
				displayAmountTasks();
				createItems(items);
			});

			deleteTask.appendChild(trashImg);
			taskElement.appendChild(deleteTask);
			tasksList.appendChild(taskElement);
		});
	} else {
		tasksList.innerHTML = "";
		displayAmountTasks(items.length);
	}
};

newToDo_btn.addEventListener("click", async () => {
	if (newToDo_txt.value) {
		const newItem = { value: newToDo_txt.value };
		const items = await addItem(newItem);
		if (items.data) {
			createItems(items.data);
		}
	} else {
		alert("Write your task first");
		return;
	}
	newToDo_txt.value = "";
	newToDo_txt.focus();
});

clearAll_btn.addEventListener("click", () => {
	const noItemsArr = deleteItem("all");
	createItems();
});

function isEmptyState(taskCount) {
	if (taskCount === 0) {
		clearAll_btn.style.display = "none";
		emptyState.style.display = "block";
		tasksList.appendChild(emptyState);
	} else {
		clearAll_btn.style.display = "block";
	}
}

function displayAmountTasks(taskCount) {
	isEmptyState(taskCount);
	amountTasks.innerText = `${taskCount} Active tasks`;
	tasksList.appendChild(amountTasks);
}

document.addEventListener("DOMContentLoaded", async () => {
	const items = await getAllTasks();
	createItems(items);
});
