const newItemInput = document.getElementById("newItemInput");
const newItemSubmitButton = document.getElementById("newItemSubmitButton");
const tasksList = document.getElementById("taskList");
const clearAllButton = document.getElementById("clearAll");
const emptyState = document.getElementById("emptyState");
const numberOfTasks = document.getElementById("numberOfTasks");
import {
	getAllTasks,
	addItem,
	deleteItem,
	updateItem,
	clearAll,
} from "./clients/item_client.js";

const resetNewItemInput = () => {
	newItemInput.value = "";
	newItemInput.focus();
};

const addNewItem = async (itemName) => {
	const isResOk = await addItem({ itemName });

	if (!isResOk) {
		alert("something went wrong.");
	}
	await renderAllItems();
	resetNewItemInput();
};

function displayNumberOfTasks(taskCount) {
	numberOfTasks.innerText = taskCount;
}

newItemInput.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
		addNewItem(newItemInput.value);
	}
});

newItemSubmitButton.addEventListener("click", async () =>
	addNewItem(newItemInput.value)
);

clearAllButton.addEventListener("click", async () => {
	const isReOk = await clearAll();
	if (!isReOk) {
		alert("something went wrong.");
	}
	await renderAllItems();
});

const resetTaskList = () => {
	tasksList.innerHTML = "";
};

const displayEmptyState = () => {
	clearAllButton.style.display = "none";
	emptyState.style.display = "block";
};

const hideEmptyState = () => {
	clearAllButton.style.display = "block";
	emptyState.style.display = "none";
};

const renderAllItems = async () => {
	const items = await getAllTasks();
	displayNumberOfTasks(items.length);
	resetTaskList();
	if (items.length === 0) {
		displayEmptyState();
	} else {
		hideEmptyState();
		items.forEach((item) => {
			const itemElement = createItemElement(item);
			tasksList.appendChild(itemElement);
		});
	}
};

const createTaskContainer = () => {
	const taskContainer = document.createElement("div");
	taskContainer.style.height = "40px";
	return taskContainer;
};

const createEditTaskElement = (itemId, itemName) => {
	const editTaskElement = document.createElement("input");
	editTaskElement.value = itemName;

	const saveButton = document.createElement("button");
	saveButton.innerText = "save";
	saveButton.addEventListener("click", async () => {
		const isReOk = await updateItem(
			{ itemName: editTaskElement.value },
			itemId
		);
		if (!isReOk) {
			alert("something went wrong.");
		}
		await renderAllItems();
	});
	return { editTaskElement, saveButton };
};

const createTaskElement = (itemId, itemName) => {
	const taskElement = document.createElement("div");
	taskElement.id = itemId;
	taskElement.innerText = itemName;
	taskElement.classList.add("clickable", "task-element");
	taskElement.addEventListener("click", (e) => {
		e.preventDefault();
		const editElement = createEditTaskElement(itemId, itemName);
		document
			.getElementById(itemId)
			.parentElement.appendChild(editElement.saveButton);
		taskElement.replaceWith(editElement.editTaskElement);
		editElement.editTaskElement.focus();
	});
	return taskElement;
};

const createDeleteElement = (itemId) => {
	const deleteTask = document.createElement("div");
	deleteTask.classList.add("clickable", "delete-button");

	deleteTask.addEventListener("click", async (e) => {
		e.stopPropagation();
		const isResOk = await deleteItem(itemId);
		if (!isResOk) {
			alert("something went wrong.");
		}
		displayNumberOfTasks();
		await renderAllItems();
	});
	return deleteTask;
};

const createTrashImg = () => {
	const trashImg = document.createElement("img");
	trashImg.src = "./images/trash.png";
	trashImg.className = "tash-icon";
	return trashImg;
};

const createStatusElement = (itemId, itemStatus) => {
	const status = document.createElement("input");
	status.setAttribute("type", "checkbox");
	if (itemStatus) {
		status.checked = true;
	}
	status.addEventListener("click", async (e) => {
		e.preventDefault();
		if (e.target.value) {
			const isReOk = await updateItem(
				{ status: status.checked, doneAt: Date.now() },
				itemId
			);
			if (!isReOk) {
				alert("something went wrong.");
			}
		} else {
			const isReOk = await updateItem({ status: status.checked }, itemId);
			if (!isReOk) {
				alert("something went wrong.");
			}
		}
		await renderAllItems();
	});
	return status;
};

const appendElements = (
	taskContainer,
	taskElement,
	deleteTask,
	trashImg,
	status
) => {
	deleteTask.appendChild(trashImg);
	taskElement.appendChild(deleteTask);
	taskContainer.appendChild(status);
	taskContainer.appendChild(taskElement);
};
const createItemElement = (item) => {
	const taskContainer = createTaskContainer();
	const taskElement = createTaskElement(item.id, item.itemName);
	const deleteTask = createDeleteElement(item.id);
	const trashImg = createTrashImg();
	const status = createStatusElement(item.id, item.status);
	appendElements(taskContainer, taskElement, deleteTask, trashImg, status);
	return taskContainer;
};

document.addEventListener("DOMContentLoaded", async () => {
	await renderAllItems();
});
