class Main {
    constructor() { }

    init() {
        //add click event listener to add button
        addBtn.addEventListener("click", this.addTodoAndRender)

        // add a task when user press Enter key
        taskInput.addEventListener("keypress", (e) => { if (e.key === 'Enter' && taskInput.value) this.addTodoAndRender() });

        //Clear the tasks list
        clearAllBtn.addEventListener("click", () => {
            itemManager.clearArr();
            taskList.innerHTML = ''; //Clear the list of tasks element
            this.updateForm();
        })

        //sort the tasks list add them to html list element and save them to the LocalStorage
        sortAllBtn.addEventListener("click", () => {
            itemManager.sortArr();
            taskList.innerHTML = '';
            this.renderAllTasks();
        })

        //waiting for user input before enable the add button
        taskInput.addEventListener('keyup', () => addBtn.disabled = !taskInput.value)

        if (itemManager.taskArr.length != 0) this.renderAllTasks();
        else placeHolder.classList.remove("hidden");
    }

    //function to add task and update the list and the localStorage
    addLiTask(taskValue) {
        taskList.appendChild(this.createLi(taskValue));
        taskInput.value = ''; //clear the input after added
        addBtn.disabled = true;
        this.updateForm();
    }

    // function to remove from DOM task that have been clicked
    removeLiTask(li) {
        taskList.removeChild(li);
        this.updateForm();
    }

    //update the button and the placeHolder if necessary
    updateForm() {
        pedingTaskText.innerHTML = "You have " + itemManager.taskArr.length + " pending tasks"
        if (itemManager.taskArr.length === 0) { //if there are no task any more disable the clear and sort button
            clearAllBtn.disabled = true;
            sortAllBtn.disabled = true;
            placeHolder.classList.remove("hidden");
        }
        else {
            clearAllBtn.disabled = false;
            sortAllBtn.disabled = false;
            placeHolder.classList.add("hidden");
        }
    }

    //function to insert the all tasks from the localStorage to the html list element
    renderAllTasks() {
        itemManager.taskArr.forEach((taskValue) => {
            taskList.appendChild(this.createLi(taskValue));
        });
        this.updateForm();
    }

    //Function to create the li element and its childs and assign a click event to them
    createLi(taskValue) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const i = document.createElement("i");
        li.innerHTML = taskValue;
        i.classList.add("fa", "fa-trash-o");
        span.appendChild(i);
        li.appendChild(span);
        span.onclick = (e) => {
            e.stopPropagation(); //stop the parent elemnt to listen to click event
            itemManager.removeTask(taskValue);
            this.removeLiTask(li);
        };
        li.onclick = () => alert(taskValue);
        li.classList.add('new-li');
        return li;
    }

    addTodoAndRender() {
        //input a number
        if (/^\d*$/.test(taskInput.value)) {
            pokemonClient.getPokemon(taskInput.value).then((pokemon) => {
                if (pokemon) {
                    itemManager.addNewTask(`Catch ${pokemon}`);
                    this.addLiTask(`Catch ${pokemon}`);
                } else {
                    itemManager.addNewTask(`Pokemon with ${taskInput.value} was not found`);
                    this.addLiTask(`Pokemon with ${taskInput.value} was not found`);
                }
            })
        }
        //inputs a comma separated list of IDs 
        else if (/^\d+(\,\d+)+$/.test(taskInput.value)) {
            pokemonClient.getPokemons(taskInput.value).then((pokemons) => {
                if (pokemons) {
                    pokemons.forEach((pokemon) => {
                        itemManager.addNewTask(`Catch ${pokemon}`);
                        this.addLiTask(`Catch ${pokemon}`);
                    })
                } else {
                    itemManager.addNewTask(`faild to fetch pokemon with this input: ${taskInput.value}`);
                    this.addLiTask(`faild to fetch pokemon with this input: ${taskInput.value}`);
                }
            })
        }

        //input a task
        else {
            itemManager.addNewTask(taskInput.value);
            this.addLiTask(taskInput.value);
        }
    }

};

const pokemonClient = new PokemonClient();
const itemManager = new ItemManager();
const taskInput = document.querySelector(" #taskInput ");
const addBtn = document.querySelector(" #addBtn ");
const clearAllBtn = document.querySelector(" #clearAllBtn ");
const sortAllBtn = document.querySelector(" #sortAllBtn ");
const taskList = document.querySelector(" #taskList ");
const placeHolder = document.querySelector(" .placeHolder ")
const pedingTaskText = document.querySelector(" #peding-task-text ")
const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});








