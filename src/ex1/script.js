const todos = document.querySelectorAll('.todo-text');
const deleteButtons = document.querySelectorAll('.todo-list .remove-todo-button');

todos.forEach (todo => {
  todo.addEventListener('click', ({target}) => {
    onTodoClicked(target);
  });
});

function onTodoClicked(clickedTodo) {
  alert(clickedTodo.textContent);
}

deleteButtons.forEach (deleteButton => {
  deleteButton.addEventListener('click', ({currentTarget}) => {
    onDeleteButtonClicked(currentTarget);
  });
});

function onDeleteButtonClicked(clickedButton) {
  alert(`Do you want to delete "${clickedButton.previousElementSibling.textContent}"?`);
}
