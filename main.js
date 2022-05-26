const mylistManager = new listManager();
console.log(mylistManager);

// create allert on click
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
document.getElementById("todo-list").addEventListener(
	"click",
	function (event) {
		if ("LI" != event.target.tagName) return;
		alert(event.target.innerText);
	},
	false
);

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

const main = new Main();
async function addTodo(event) {
	event.preventDefault();

	const fetchPokemon = todoInput.value.split(",");
	console.log(fetchPokemon);
	for (let i = 0; i < fetchPokemon.length; i++) {
		const searchNum = fetchPokemon[i];
		console.log(searchNum);
		//----add to my list
		mylistManager.add(searchNum);
		//----go to get from api
		if (isNumeric(searchNum)) {
			//is number
			const response = await main.addPoke(searchNum);
			addElemntToDom(response, searchNum);
		} else {
			//is string
			addElemntToDom(searchNum, searchNum);
		}
	}

	//---clear input
	todoInput.value = "";
}

function isNumeric(str) {
	if (typeof str != "string") return false;
	return !isNaN(str);
}

function addElemntToDom(value, name) {
	//----add elemnt to page
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	todoDiv.setAttribute("data-arr", name);
	const newTodo = document.createElement("li");
	newTodo.innerText = value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);

	//---add button complete
	const completedButton = document.createElement("button");
	completedButton.innerHTML = `<i class="fas fa-check"></i>`;
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	//---add button trash
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
		todo.addEventListener("transitionend", function (e) {
			todo.remove();

			const arrName = e.target.attributes["data-arr"].value;
			const place = mylistManager.listArray.indexOf(arrName);

			mylistManager.listArray.splice(place, 1);
			console.log(mylistManager.listArray);
		});
	}

	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearArray);
function clearArray() {
	mylistManager.listArray = [];
	todoList.innerHTML = "";
	console.log(mylistManager);
}
