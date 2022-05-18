const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function addTodo(event) {
	event.preventDefault();

	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	alert(todoInput.value);

	// const newTodo = document.createElement("li").value;
	// if (newTodo.document.createElement === "") {
	// 	alert("Please input a Value");
	// 	return false;
	// } else {
	// 	alert(todoInput.value);
	// 	return true;
	// }

	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	todoInput.value = "";

	const completedButton = document.createElement("button");
	completedButton.innerHTML = `<i class="fas fa-check"></i>`;
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	const trashButton = document.createElement("button");
	trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	todoList.appendChild(todoDiv);
}

function deleteCheck(event) {
	const item = event.target;

	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		todo.classList.add("fall");
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}

	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function sortSelect(event) {
	const item = event.target;

	var sortSelect = 0;
	var sortSelect = 0;

	if ((value = "1" == pressed)) {
		Math.add(this.position.x + 10);
	}

	if ((value = "2" == pressed)) {
		Math.sub(this.position.x - 10);
	}
}
// 	if (item.sortSelect[0] === "select-btn") {
// 		const todo = item.parentElement;
// 		todo.classList.move;
// 		todo.addEventListener("transitionend", function () {
// 			todo.remove();
// 		});
// 	}
// }
