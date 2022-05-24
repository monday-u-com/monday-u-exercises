// trigger fork
let count = 0;

function addTodo(){
  const todo = document.getElementById("newTodo").value;
  if(todo.length === 0){
    alert("Please enter a todo task")
  }
  else {
    const todoList = document.getElementById("todoList");
    const li = document.createElement("li");
    li.id = 'todo' + count;
    li.innerHTML = `<input type='checkbox' name='selectTodo' class= pl value="${todo}">`;
    li.innerHTML += todo;
    todoList.appendChild(li);
    document.getElementById("newTodo").value = "";
    count++;
    console.log("is this checked" + li.checked);
  }
}
document.getElementById("addTodo").addEventListener("click", addTodo);


let history = [];
function deleteTodo(){
        let todos = document.querySelectorAll('.pl');
        const todoList = document.getElementById("todoList");
        todos.forEach(element => {
          console.log("checked is " + element.checked);
          if(element.checked === true){
            todoList.removeChild(document.getElementById(element.parentElement.id));
            history.push(element.parentElement);
            element.checked = false;
        }
      })
}

document.getElementById("delete").addEventListener("click",deleteTodo);


// Event listeners for keypress
window.addEventListener("keyup",e =>{
  const todoList = document.getElementById("todoList");
  //enable ctrl+z for adding delete items
  if(e.ctrlKey && e.key === 'z'){
    if(history.length === 0){
      alert("History is currently empty")
    }
    else{
      todoList.appendChild(history.pop());
    }
  }
  //enable submitting todo via the enter key
    if(e.key==='Enter'){
        addTodo();
    }
    //enable deleting todo via the delete key
    if(e.key === "Delete"){
      deleteTodo();
    }
})

document.addEventListener('click', function(e){
  const target = e.target;
  if(target.tagName === 'LI'){
    alert("You've selected the following task: " + target.innerText);
  }
});