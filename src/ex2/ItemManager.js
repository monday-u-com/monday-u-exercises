class ItemManager {
    constructor() {
        this.todoList = [];
    }
    
    async addItem(todo){
        if (!/^[0-9]+$/.test(todo))
        {
            return {id:this.todoList.length ,text:todo};
        }
        else{
            const response = await (pokemon.getPokemonNameById(todo))
            /*if(this.todoList.includes(response)) 
            {
                alert('The task in the listTodo') 
                return;
            }*/
            return {id:this.todoList.length ,text:response};
        }
    }
    async addArrayItem(todoArray)
    {
        todoArray = todoArray.filter((item) => item!=',');
        await Promise.all(todoArray.map(async todo => {

            const pokemon = await this.addItem(todo)
            if (pokemon.text.length>0) this.todoList.push(pokemon)
        }))
        return 1
    }

}
const itemManager = new ItemManager();