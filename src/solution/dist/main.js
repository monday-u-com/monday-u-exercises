class Main {
    constructor() {
        this.todoInput = document.querySelector('#todo-input');
        this.addBtn = document.querySelector('#todo-input-btn');
        this.sortOrder = document.querySelector('#select-sort');
        this.editTodoElement = document.querySelector('#edit-todo');
        this.editTodoInput = document.querySelector('#edit-todo-input');
        this.editTodoApproveBtn = document.querySelector('#edit-todo-approve-btn');
        this.editTodoCancelBtn = document.querySelector('#edit-todo-cancel-btn');
        this.todoList = document.querySelector('#todo-list');
        this.deleteAllBtn = document.querySelector('#footer-btn');
        this.spinnerElement = document.querySelector('#spinner');
        this.itemClient = new ItemClient;
        this.localStorageManager = new LocalStorageManager;

        this.todoListData = [];
    }

    init() {
        this.todoInput.addEventListener('keyup', (event) => this._onUserInputKeyUp(event));
        this.todoInput.addEventListener('keypress', (event) => this._onAddBtnKeyPress(event));
        this.addBtn.addEventListener('click', (event) => this._onAddBtnClicked(event));
        this.sortOrder.addEventListener('change', (event) => this._onSortChange(event));
        this.editTodoApproveBtn.addEventListener('click', (event) => this._onEditTodoApproveBtn(event));
        this.editTodoCancelBtn.addEventListener('click', (event) => this._onEditTodoCancelBtn(event));
        this.deleteAllBtn.addEventListener('click', (event) => this._onDeleteAllBtnClicked(event));
        this._setSortBy();
    }

    async render() {
        try {
            this._toggleSpinner(true);
            await this._showTodosList();
            this._showPendingTodos();
        } catch (e) {
            console.error(e)
        }
        this._toggleSpinner(false);
        setTimeout(() => this.todoInput.focus(), 0);
    }


    _onUserInputKeyUp(event) {
        if (event) {
            if (this.todoInput.value.trim().length !== 0) {
                this.addBtn.classList.add('active');
            } else {
                this.addBtn.classList.remove('active');
            }
        }
    }

    _onAddBtnKeyPress(event) {
        if (event.key === 'Enter' && this.addBtn.classList.contains('active')) {
            this._onAddBtnClicked();
        } else if (event.key === 'Enter' && this.todoInput.value.trim().length === 0) {
            alert('Please add a new todo');
        }
    }

    async _onAddBtnClicked() {
        let todos;
        this._toggleSpinner(true);
        try {
            this.addBtn.disabled = true;
            this.todoInput.disabled = true;
            todos = await this.itemClient.addTodo(this.todoInput.value);
            await this.render();
        } catch (e) {
            console.error(e);
        }
        this._toggleSpinner(false);
        this.addBtn.classList.remove('active');
        this.addBtn.disabled = false;
        this.todoInput.disabled = false;
        (todos && todos.success) && setTimeout(() => this._checkForDuplicateTodos(todos.body), 0);
    }

    _onSortChange() {
        this.localStorageManager.saveSortBy(this.sortOrder.value);
        this.render();
    }

    async _onEditTodoApproveBtn() {
        await this.itemClient.editTodo(this.currentTodoEdit.id, {type: this.currentTodoEdit.type, item: this.editTodoInput.value, checked: this.currentTodoEdit.checked});
        this.editTodoElement.style.display = 'none';
        this._toggleElementsForEditTodo();
        await this.render();
    }

    _onEditTodoCancelBtn() {
        this.editTodoElement.style.display = 'none';
    }

    async _onDeleteAllBtnClicked() {
        await this.itemClient.deleteAllTodos();
        await this.render();
    }

    _checkForDuplicateTodos(todos) {
        const duplicates = todos.filter(item => (item.type == 'pokemonExists' || item.type=='todoExists'));
        if (!duplicates.length) {
            return;
        }
        let content = 'The following todos are already exist: \n';
        duplicates.forEach((todo) => {
            if(todo.type=='pokemonExists'){
                content += `id: ${todo.pokemon.id}, name: ${todo.pokemon.name} \n`;
            }else{
                content += `${todo.item}\n`
            }
        });
        this._toggleSpinner(false);
        alert(content);
    }

    _toggleSpinner(animate) {
        if (!animate) {
            this.spinnerElement.style.display = 'none';
            return;
        }
        this.spinnerElement.style.display = 'block';
    }

    _showPendingTodos() {
        const pendingTodos = document.querySelector(".pending-todos");
        pendingTodos.textContent = this.todoListData.length;
    }

    async _getTodoListData() {
        const sortOrder = this.localStorageManager.getSortBy();
        const response = await this.itemClient.getAllTodos(sortOrder);
        this.todoListData = response.success && Array.isArray(response.body) ? response.body : [];
    }

    async _showTodosList() {
        await this._getTodoListData();
        if (!this.todoListData.length) {
            this._showContent(this._handleEmptyTodoListContent());
            return;
        }
        let todoListContent = '';
        this.deleteAllBtn.classList.add('active');
        this.todoListData.forEach((element, index) => {
            todoListContent += this._handleTodoListContent(element, index);
        });
        setTimeout(() => this._addTodosListeneres(), 0);
        this._showContent(todoListContent);
    }

    _showContent(content) {
        this.todoList.innerHTML = content;
        this.todoInput.value = '';
    }

    _handleTodoListContent(element, index) {
        const checked = element.checked ? 'checked' : '';
        const pic = element.type === 'pokemon' ? `<img class="pokemon-pic" src="${element.pokemon.image}" alt="">` : '&emsp;&emsp;';
        const editBtn = (element.type === 'text') ? `<span id="todo-edit-${element.id}" class="icon-edit"><i class="fas fa-pen" ></i></span>` : '';
        const todoListContent = `<li> 
        <input id="todo-checkbox-${element.id}" type="checkbox" name="todoCheckbox" ${checked}>
        ${pic}
        <span id="todo-element-${element.id}"> ${element.message}</span>
        ${editBtn}
        <span id="todo-delete-${element.id}" class="icon-delete"><i class="fas fa-trash" ></i></span>
        </li>`;
        return todoListContent;
    }

    _handleEmptyTodoListContent() {
        const todoListContent = `<p class="empty-todo-list">
        Well done your todo list is empty </br>
        <span class="icon"><i class="fas fa-clipboard"></i></span> </br>
        now you will not forget anything</p>`;
        this.deleteAllBtn.classList.remove('active');
        return todoListContent;
    }

    async _addTodosListeneres() {
        this.todoListData.forEach((element, index) => {
            if (element.type === 'text') {
                document.getElementById(`todo-edit-${element.id}`).addEventListener('click', () => this._openEditTodo(element, index));
            }
            document.getElementById(`todo-element-${element.id}`).addEventListener('click', () => this._showSelectedTodo(element));
            document.getElementById(`todo-delete-${element.id}`).addEventListener('click', () => this._deleteTodo(element));
            document.getElementById(`todo-checkbox-${element.id}`).addEventListener('click', () => this._updateItemCheckbox(element));
        })
    }

    _showSelectedTodo(element) {
        alert(element.message);
    }

    _openEditTodo(element) {
        this.editTodoInput.value = element.item;
        this.editTodoElement.style.display = 'flex';
        this.currentTodoEdit = element;
        this._toggleElementsForEditTodo(true);
    }
    
    async _updateItemCheckbox(element){
        await this.itemClient.editTodo(element.id, {type: element.type, item: element.item, checked: !element.checked, doneTimestamp: Date.now()});
    }

    async _deleteTodo(element) {
        await this.itemClient.deleteTodo(element.id);
        await this.render();
    }

    _setSortBy() {
        const sortByOrder = this.localStorageManager.getSortBy();
        if (!sortByOrder) {
            return;
        }
        const options = Array.from(this.sortOrder.options);
        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            if (sortByOrder == element.value) {
                this.sortOrder.selectedIndex = i;
                return;
            }
        }
    }

    _toggleElementsForEditTodo(disabled) {
        this.todoInput.disabled = typeof disabled == 'boolean' ? disabled : !this.todoInput.disabled;
        this.addBtn.disabled = typeof disabled == 'boolean' ? disabled : !this.addBtn.disabled;
        this.sortOrder.disabled = typeof disabled == 'boolean' ? disabled : !this.sortOrder.disabled;
        this.deleteAllBtn.disabled = typeof disabled == 'boolean' ? disabled : !this.deleteAllBtn.disabled;
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", async () => {
    main.init();
    await main.render();
});