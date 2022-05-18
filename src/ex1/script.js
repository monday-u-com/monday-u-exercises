let count = 0;
document.getElementById("addTodo").addEventListener("click", function() {
  let todo = document.getElementById("newTodo").value;
  let todoList = document.getElementById("todoList");
  let li = document.createElement("li");
  li.id = 'todo' + count;
  li.innerHTML = `<input type='checkbox' name='selectTodo' value="${todo}">`;
  li.innerHTML += todo;
  todoList.appendChild(li);
  document.getElementById("newTodo").value = "";
  count++;
});


