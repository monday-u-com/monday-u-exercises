const newToDo_txt = document.getElementById("NewToDo_txt");
const newToDo_btn = document.getElementById("NewToDo_btn");
const tasksList = document.getElementById("taskList");
const clearAll_btn = document.getElementById("clearAll");
const emptyState = document.getElementById("emptyState");
let taskCount = 0;

newToDo_btn.addEventListener("click", () => {
	if (newToDo_txt.value) {
		const taskElement = document.createElement("div");
		taskElement.innerText = newToDo_txt.value;
		taskElement.className = "taskElement clickable";
		taskElement.addEventListener("click", () => {
			alert(taskElement.innerText);
		});

		const deleteTask = document.createElement("div");
		deleteTask.className = "clickable delete-button";
		const trashImg = document.createElement("img");
		trashImg.src = "trash.png";
		trashImg.className = "tash-icon";

		deleteTask.addEventListener("click", (e) => {
			e.stopPropagation();
			taskElement.remove();
			taskCount--;
			isEmptyState();
		});

		taskElement.addEventListener("mouseover", () => {
			deleteTask.style.display = "block";
			deleteTask.style.height = "30px";
			deleteTask.style.borderBottomRightRadius = "initial";
		});

		taskElement.addEventListener("mouseout", () => {
			deleteTask.style.display = "none";
		});

		deleteTask.appendChild(trashImg);
		taskElement.appendChild(deleteTask);
		tasksList.appendChild(taskElement);
		taskCount++;
		isEmptyState();
	} else {
		alert("Write your task first");
	}
	newToDo_txt.value = "";
});

clearAll_btn.addEventListener("click", () => {
	tasksList.innerHTML = "";
	taskCount = 0;
	isEmptyState();
});

function isEmptyState() {
	if (taskCount === 0) {
		emptyState.style.display = "block";
		tasksList.style.display = "none";
		clearAll_btn.style.display = "none";
	} else {
		emptyState.style.display = "none";
		tasksList.style.display = "block";
		clearAll_btn.style.display = "block";
	}
}
