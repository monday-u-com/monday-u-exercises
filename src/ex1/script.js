document.getElementById("addTodo").addEventListener("click", function() {
  let todo = document.getElementById("todo").value;
  let todoList = document.getElementById("todoList");
  let li = document.createElement("li");
  li.innerHTML = todo;
  todoList.appendChild(li);

});