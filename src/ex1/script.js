document.getElementById("addTodo").addEventListener("click", function() {
  let todo = document.getElementById("newTodo").value;
  let todoList = document.getElementById("todoList");
  let li = document.createElement("li");
  li.innerHTML = todo;
  li.innerHTML += "<input type='checkbox' name='selectTodo' value='" + todo + "'>";
  todoList.appendChild(li);
  document.getElementById("newTodo").value = "";
});

