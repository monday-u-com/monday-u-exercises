class Main {
    constructor() {
        this.ItemClient = new itemClient();
        this.todoList= [];
    }

    init () {
        this.listToDo = document.querySelector("#listToDo");
        this.buttonClearAll = document.querySelector("#buttonClearAll");
        this.buttonAdd = document.querySelector("#buttonAdd");
        this.removeSVG = '<i class="fa fa-trash"></i>';
        this.lengthTodoList = document.querySelector(".lengthTodoList");
        this.lengthTodoList.textContent =0 ;
        this.buttonAdd.addEventListener('click', ()=>{this.addTodo()});
        this.buttonClearAll.addEventListener('click',()=>{this.deleteListToDo()});
        document.addEventListener('keydown',(event)=>{this.addEnter(event)});  
    }
 
    async renderTodoList () {
        this.todoList= await this.ItemClient.getTodo();
        this.listToDo.innerHTML="";
        this.todoList.forEach(async (todo) => {
         const todoItem = await this.createListTodoDiv(todo);
            this.listToDo.appendChild(todoItem);
        });
        this.lengthTodoList.textContent = this.todoList.length;
        this.setIsActiveClearButton();
    };

    async deleteListToDo(){
        if (confirm("Are you sure??")){
            await this.ItemClient.deleteAllTodo();
            await this.renderTodoList();
        }
    }
    
    setIsActiveClearButton(){
        this.buttonClearAll.classList.toggle('active', this.todoList.length > 0);
    }

    onItemClick(inputValue){
        alert(inputValue);
    }

    async createListTodoDiv(todo){
        let div = document.createElement('div');
        div.classList.add('todo');
        let item = document.createElement('span');
        item.innerText=todo.text;
        item.addEventListener('click', () => this.onItemClick(todo.text));
        let remove = document.createElement('button');
        remove.classList.add('delete');
        remove.innerHTML = this.removeSVG
        remove.id=todo.id;
        remove.addEventListener('click', async () => {
            await this.ItemClient.deleteTodo(remove.id);
            await this.renderTodoList();
        });
        div.appendChild(remove);
        div.appendChild(item);
        return div;
    } 

    async addTodo(){
        const todoInput=document.querySelector('#newToDo input').value;
        if(todoInput.length == 0) {
            alert("Please Enter new todo");
        }else {
            const todoInputArr=todoInput
            .split(',')
            .map(todo => todo.trim())
            .filter(Boolean)
            await this.ItemClient.addTodo(todoInputArr);
            await this.renderTodoList();
            document.getElementById('newToInput').value = "";
        }
    }

    async addEnter(event){
        if (event.code === 'Enter') await this.addTodo();
    }
}

document.addEventListener("DOMContentLoaded", async ()=> {
    main.init(); 
    await main.renderTodoList();
});

const main = new Main();
