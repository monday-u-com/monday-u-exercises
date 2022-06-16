class itemClient {
    
    constructor(){
        this.todoList = [];
    }

    async getTodo() {
       const response = await fetch("/getAll");
       return await response.json();
    }

    async addTodo(todoList) {
        const response=await fetch("/",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todoList)
        })
       return await response.json();
     }

     async deleteTodo(id) {
        const response=await fetch("/"+id,{
            method: 'DELETE'
        })
       return await response.json();
     }

     async deleteAllTodo() {
        const response=await fetch("/",{
            method: 'DELETE'
        })
       return await response.json();
     }
 }

