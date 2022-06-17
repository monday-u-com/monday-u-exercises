// Implement the `Main` class here

class Main {
    init () {
        const listToDo = document.querySelector("#listToDo");
        const buttonClearAll = document.querySelector("#buttonClearAll");
        const buttonAdd = document.querySelector("#buttonAdd");
        const removeSVG = '<i class="fa fa-trash"></i>';
        const lengthTodoList = document.querySelector(".lengthTodoList");

        lengthTodoList.textContent =0;
        eventListener()

        function eventListener(){
            document.addEventListener('keydown', addEnter);
            buttonAdd.addEventListener('click',addTodo );
            buttonClearAll.addEventListener('click',deleteListToDo );
        }   

        function renderTodoList () {
            listToDo.innerHTML="";
            itemManager.todoList.forEach((todo) => {
                const todoItem = createListTodoDiv(todo);
                listToDo.appendChild(todoItem);
            });
            lengthTodoList.textContent = itemManager.todoList.length;
            setIsActiveClearButton()
        };

        function deleteListToDo(){
        if (confirm("Are you sure??") == true) {
            itemManager.todoList=[];
            renderTodoList()
        }
        }
    
        function setIsActiveClearButton() {
            if (itemManager.todoList.length > 0) {
                buttonClearAll.classList.add("active");
            }   
            else {
                buttonClearAll.classList.remove("active");
            }
        }
        function onItemClick(inputValue) {
            alert(inputValue)
        }

        function deleteIdFromList(id)
        {
            itemManager.todoList=itemManager.todoList.filter((item) => item.id!=id);
            renderTodoList();
        }

        function createListTodoDiv(todo){
            let div = document.createElement('div');
            div.classList.add('todo');
            let item = document.createElement('span');
            item.innerText=todo.text;
            item.addEventListener('click', () => onItemClick(todo.text));
            let remove = document.createElement('button');
            remove.classList.add('delete');
            remove.innerHTML = removeSVG
            remove.id=todo.id;
            remove.addEventListener('click', () => {itemManager.deleteIdListTodo(remove.id); renderTodoList();});
            div.appendChild(remove);
            div.appendChild(item);
            return div;
        }

        function addTodo(){
            const todoInput=document.querySelector('#newToDo input').value;
            if(todoInput.length == 0) {
                alert("Please Enter new todo");
            }else { 
                itemManager.addArrayItem(todoInput
                    .split(',')
                    .map(todo => todo.trim())
                    .filter(Boolean))
                    .then(()=> renderTodoList());
                document.getElementById('newToInput').value = "";
            }
        }

        function addEnter(event){
            if (event.code === 'Enter') addTodo()
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
  
});
const main = new Main();