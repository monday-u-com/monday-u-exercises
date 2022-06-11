// Implement the `Main` class here
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
        this.addIconAnimation = document.querySelector('.icon-add-todo');
        this.itemManager = new ItemManager;
    }

    init() {
        this.todoInput.addEventListener('keyup', (event) => this.onUserInputKeyUp(event));
        this.todoInput.addEventListener('keypress', (event) => this.onAddBtnKeyPress(event));
        this.addBtn.addEventListener('click', (event) => this.onAddBtnClicked(event));
        this.sortOrder.addEventListener('change', (event) => this.onSortChange(event));
        this.editTodoApproveBtn.addEventListener('click', (event) => this.onEditTodoApproveBtn(event));
        this.editTodoCancelBtn.addEventListener('click', (event) => this.onEditTodoCancelBtn(event));
        this.deleteAllBtn.addEventListener('click', (event) => this.onDeleteAllBtnClicked(event));
        this.setSortBy();
    }

    onUserInputKeyUp(event) {
        if (event) {
            if (this.todoInput.value.trim().length !== 0) {
                this.addBtn.classList.add('active');
            } else {
                this.addBtn.classList.remove('active');
            }
        }
    }

    onAddBtnKeyPress(event) {
        if (event.key === 'Enter' && this.addBtn.classList.contains('active')) {
            this.onAddBtnClicked();
        } else if (event.key === 'Enter' && this.todoInput.value.trim().length === 0) {
            alert('Please add a new todo');
        }
    }

    async onAddBtnClicked() {
        let todos;
        try {
            this.addBtn.disabled = true;
            this.todoInput.disabled = true;
            this.toggleAnimation(true);
            todos = await this.itemManager.addItem(this.todoInput.value, false);
            this.insertTodos(todos);
        } catch (e) {
            console.error(e);
        }
        this.toggleAnimation(false);
        this.addBtn.classList.remove('active');
        this.addBtn.disabled = false;
        this.todoInput.disabled = false;
        this.render();
        todos && setTimeout(() => this.checkForAddedDuplicatePokemon(todos), 0);
    }

    onSortChange() {
        this.itemManager.saveSortBy(this.sortOrder.value);
        this.render();
    }

    onEditTodoApproveBtn() {
        this.itemManager.editItem(this.currentTodoEdit, this.editTodoInput.value);
        this.editTodoElement.style.display = 'none';
        this.toggleElementsForEditTodo();
        this.render();
    }

    onEditTodoCancelBtn() {
        this.editTodoElement.style.display = 'none';
    }

    onDeleteAllBtnClicked() {
        this.itemManager.cleanLocalStorageTable();
        this.render();
    }

    insertTodos(todos) {
        this.handleErrorItems(todos);
        this.handleTodos(todos);
    }

    handleTodos(todos) {
        todos
            .filter(item => item.type != 'pokemonExists' && item.type != 'pokemonNotFound')
            .forEach(todo => {
                const itemObject = {
                    type: todo.type,
                    item: todo.item,
                    checked: todo.checked,
                    message: this.handleTodoMessage(todo)
                }
                if (todo.type == 'pokemon') {
                    itemObject.pokemon = todo.pokemon;
                }
                this.itemManager.insertItem(itemObject);
            });
    }

    checkForAddedDuplicatePokemon(todos) {
        const duplicatesPokemons = todos.filter(item => item.type == 'pokemonExists');
        if (!duplicatesPokemons.length) {
            return;
        }
        let content = 'The following pokemons are already exist: \n';
        duplicatesPokemons.forEach(({ pokemon }) => {
            content += `id: ${pokemon.id}, name: ${pokemon.name} \n`;
        });
        this.toggleAnimation(false);
        alert(content);
    }

    toggleAnimation(animate) {
        if (!animate) {
            this.addIconAnimation.style.display = 'none';
            return;
        }
        this.addIconAnimation.style.display = 'block';
    }

    render() {
        this.showPendingTodos();
        this.showTodosList();
        setTimeout(() => this.todoInput.focus(), 0);
    }

    showPendingTodos() {
        const pendingTodos = document.querySelector(".pending-todos");
        pendingTodos.textContent = this.itemManager.getItemsLength();
    }

    showTodosList() {
        const todoListdata = this.itemManager.getTableFromLocalStorage();
        if (!todoListdata.length) {
            this.showContent(this.handleEmptyTodoListContent());
            return;
        }
        let todoListContent = '';
        this.deleteAllBtn.classList.add('active');
        todoListdata?.forEach((element, index) => {
            todoListContent += this.handleTodoListContent(element, index);
        });
        setTimeout(() => this.addTodosListeneres(), 0);
        this.showContent(todoListContent);
    }

    showContent(content) {
        this.todoList.innerHTML = content;
        this.todoInput.value = '';
    }

    handleTodoListContent(element, index) {
        const checked = element.checked ? 'checked' : '';
        const pic = element.type === 'pokemon' ? `<img class="pokemon-pic" src="${element.pokemon.sprites.front_default}" alt="">` : '&emsp;&emsp;'
        const editBtn = (element.type != 'pokemon' && element.type != 'pokemonError') ? `<span id="todo-edit-${index}" class="icon-edit"><i class="fas fa-pen" ></i></span>` : '';
        const todoListContent = `<li>  
        <input id="todo-checkbox-${index}" type="checkbox" name="todoCheckbox" ${checked}>
        ${pic}
        <span id="todo-element-${index}"> ${element.message}</span>
        ${editBtn}
        <span id="todo-delete-${index}" class="icon-delete"><i class="fas fa-trash" ></i></span>
        </li>`;
        return todoListContent;
    }

    handleEmptyTodoListContent() {
        const todoListContent = `<p class="empty-todo-list">
        Well done your todo list is empty </br>
        <span class="icon"><i class="fas fa-clipboard"></i></span> </br>
        now you will not forget anything</p>`;
        this.deleteAllBtn.classList.remove('active');
        return todoListContent;
    }

    handleTodoMessage(todo) {
        switch (todo.type) {
            case 'notFoundPokemons': {
                return `Failed to fetch pokemon with this input: ${todo.item}`;
            }
            case 'pokemonNotFound': {
                return `Pokemon with ID ${todo.item} was not found`;
            }
            case 'text': {
                return todo.item;
            }
            case 'pokemon': {
                const { pokemon } = todo;
                return `Catch #${pokemon.id} ${this.capitalizeText(pokemon.name)} the ${pokemon.types.map(p => this.capitalizeText(p.type.name)).join('/')} type pokemon`;
            }
        }
        return todo.item;
    }

    handleErrorItems(todos) {
        const notFoundPokemons = todos.filter(item => item.type == 'pokemonNotFound');
        if (!notFoundPokemons.length) {
            return;
        }

        const itemObject = { ...notFoundPokemons[0] };
        if (notFoundPokemons.length > 1) {
            itemObject.type = 'notFoundPokemons';
            itemObject.item = notFoundPokemons.map(({ item }) => item).join(', ');
        }
        this.itemManager.insertItem(
            {
                ...itemObject,
                message: this.handleTodoMessage(itemObject)
            });
    }

    addTodosListeneres() {
        const todoListData = this.itemManager.getTableFromLocalStorage();
        todoListData?.forEach((element, index) => {
            if (element.type !== 'pokemon' && element.type != 'pokemonError') {
                document.getElementById(`todo-edit-${index}`).addEventListener('click', () => this.openEditTodo(element, index));
            }
            document.getElementById(`todo-checkbox-${index}`).addEventListener('click', () => this.itemManager.updateItemCheckbox(element));
            document.getElementById(`todo-element-${index}`).addEventListener('click', () => this.showSelectedTodo(element));
            document.getElementById(`todo-delete-${index}`).addEventListener('click', () => this.deleteTodo(element));
        })
    }

    showSelectedTodo(element) {
        alert(element.item);
    }

    openEditTodo(element, index) {
        this.editTodoInput.value = element.item;
        this.editTodoElement.style.display = 'flex';
        this.currentTodoEdit = element;
        this.toggleElementsForEditTodo(true);
    }

    deleteTodo(element) {
        this.itemManager.removeItemFromLocalStorage(element);
        this.render();
    }

    setSortBy() {
        const sortByOrder = this.itemManager.getSortBy();
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

    toggleElementsForEditTodo(disabled) {
        this.todoInput.disabled = typeof disabled == 'boolean' ? disabled : !this.todoInput.disabled;
        this.addBtn.disabled = typeof disabled == 'boolean' ? disabled : !this.addBtn.disabled;
        this.sortOrder.disabled = typeof disabled == 'boolean' ? disabled : !this.sortOrder.disabled;
        this.deleteAllBtn.disabled = typeof disabled == 'boolean' ? disabled : !this.deleteAllBtn.disabled;
    }

    capitalizeText(text) {
        return text
            .split(' ')
            .map((s) => s[0].toUpperCase() + s.slice(1))
            .join(' ');
    }

}


const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
    main.render();
});