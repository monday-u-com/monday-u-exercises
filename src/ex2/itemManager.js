class ItemManager {
    constructor() {
        this.taskList = [];
    }

    addTask(text){
        //check if is int (pokemon)
        const newTaskList=[...this.getTaskList()];
        newTaskList.push(text);
        this.setTaskList(newTaskList);
    }

    removeTask(text){
        const newTaskList=[...this.getTaskList()];
        const index=newTaskList.indexOf(text);
        if (index !== -1) {
            newTaskList.splice(index, 1);
            this.setTaskList(newTaskList);
            console.log('Item removed from list');
        }
        else console.log('removeFromTaskList ERROR!');
    }

    catchPokemon(number){
        //URL:`https://pokeapi.co/api/v2/pokemon/${number}/`
        //API GET request
        //return {isPokemon:bool,names:[]} array of names
    }

    getTaskList() {
        return this.taskList;
    }

    setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }
}