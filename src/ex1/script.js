document.addEventListener('DOMContentLoaded', main)

function main() {
    const todoInput = document.querySelector('#todo-input');
    const addBtn = document.querySelector('#todo-input-btn');
    const sortOrder = document.querySelector('#select-sort');
    const editTodoElement = document.querySelector('#edit-todo');
    const editTodoInput = document.querySelector('#edit-todo-input');
    const editTodoApproveBtn = document.querySelector('#edit-todo-approve-btn');
    const editTodoCancelBtn = document.querySelector('#edit-todo-cancel-btn');
    const todoList = document.querySelector('#todo-list');
    const deleteAllBtn = document.querySelector('#footer-btn');

    const todoListData = [];

    let sortBy;
    let currentTodoEditElement;

    initListeners();
    showTodos();

    function initListeners() {
        todoInput.addEventListener('keyup', onUserInputKeyUp);
        todoInput.addEventListener('keypress', onAddBtnKeyPress);
        addBtn.addEventListener('click', onAddBtnClicked);
        sortOrder.addEventListener('change', onSortChange);
        editTodoApproveBtn.addEventListener('click', onEditTodoApproveBtn);
        editTodoCancelBtn.addEventListener('click', onEditTodoCancelBtn);
        deleteAllBtn.addEventListener('click', onDeleteAllBtnClicked);
    }

    function onUserInputKeyUp(event) {
        if (event) {
            if (todoInput.value.trim().length !== 0) {
                addBtn.classList.add('active');
            } else {
                addBtn.classList.remove('active');
            }
        }
    }

    function onAddBtnKeyPress(event) {
        if (event.key === 'Enter' && addBtn.classList.contains('active')) {
            onAddBtnClicked();
        } else if (event.key === 'Enter' && todoInput.value.trim().length === 0) {
            alert('Please add a new todo');
        }
    }

    function onDeleteAllBtnClicked() {
        todoListData.length = 0;
        showTodos();
    }

    function onAddBtnClicked() {
        addBtn.disabled = true;
        todoInput.disabled = true;
        const addIconAnimation = document.querySelector('.icon-add-todo');
        addIconAnimation.style.display = 'block';
        setTimeout(() => {
            addIconAnimation.style.display = 'none'
            todoListData.push({
                todo: todoInput.value,
                checked: false
            });
            showTodos();
            addBtn.classList.remove('active');
            addBtn.disabled = false;
            todoInput.disabled = false;
        }, 1550)

    }

    function onSortChange() {
        sortBy = sortOrder.value;
        showTodos();
    }

    function onEditTodoApproveBtn() {
        currentTodoEditElement.todo = editTodoInput.value;
        editTodoElement.style.display = 'none';
        toggleElementsForEditTodo();
        showTodos();
    }

    function onEditTodoCancelBtn() {
        editTodoElement.style.display = 'none';
    }

    function showTodos() {
        showPendingTodos();
        showTodosList();
    }

    function showPendingTodos() {
        const pendingTodos = document.querySelector(".pending-todos");
        pendingTodos.textContent = todoListData.length;
    }

    function showTodosList() {
        let todoListContent = '';
        if (todoListData.length > 0) {
            sortTodoListData();
            deleteAllBtn.classList.add('active');
            todoListData.forEach((element, index) => {
                const checked = todoListData[index].checked ? 'checked' : '';
                todoListContent += `<li> 
                <input id="todo-checkbox-${index}" type="checkbox" name="todoCheckbox" ${checked}>
                <span id="todo-element-${index}"> ${element.todo}</span>
                <span id="todo-edit-${index}" class="icon-edit"><i class="fas fa-pen" ></i></span>
                <span id="todo-delete-${index}" class="icon-delete"><i class="fas fa-trash" ></i></span>
                </li>`;
            });
            setTimeout(() => addTodosListeneres(), 0);
        } else {
            todoListContent = `<p class="empty-todo-list">
            Well done your todo list is empty </br>
            <span class="icon"><i class="fas fa-clipboard"></i></span> </br>
            now you will not forget anything</p>`;
            deleteAllBtn.classList.remove('active');
        }
        todoList.innerHTML = todoListContent;
        todoInput.value = '';
    }

    function sortTodoListData() {
        todoListData.sort((a, b) => a.todo > b.todo ? 1 : a.todo < b.todo ? -1 : 0);
        if (sortBy === 'Z-A') {
            todoListData.reverse();
        }
    }

    function addTodosListeneres() {
        todoListData.forEach((element, index) => {
            document.getElementById(`todo-checkbox-${index}`).addEventListener('click', () => updateTodoCheckbox(element));
            document.getElementById(`todo-element-${index}`).addEventListener('click', () => showSelectedTodo(element));
            document.getElementById(`todo-edit-${index}`).addEventListener('click', () => editTodo(element));
            document.getElementById(`todo-delete-${index}`).addEventListener('click', () => deleteTodo(index));
        })
    }

    function updateTodoCheckbox(element) {
        element.checked = !element.checked;
    }

    function showSelectedTodo(element) {
        alert(element.todo);
    }

    function editTodo(element) {
        editTodoInput.value = element.todo;
        editTodoElement.style.display = 'flex';
        currentTodoEditElement = element;
        toggleElementsForEditTodo(true);
    }

    function deleteTodo(index) {
        todoListData.splice(index, 1);
        showTodos();
    }

    function toggleElementsForEditTodo(disabled) {
        todoInput.disabled = typeof disabled == 'boolean' ? disabled : !todoInput.disabled;
        addBtn.disabled = typeof disabled == 'boolean' ? disabled : !addBtn.disabled;
        sortOrder.disabled = typeof disabled == 'boolean' ? disabled : !sortOrder.disabled;
        deleteAllBtn.disabled = typeof disabled == 'boolean' ? disabled : !deleteAllBtn.disabled;
    }
}