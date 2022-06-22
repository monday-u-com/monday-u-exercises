// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
const SERVER_URL = 'http://localhost:8080/todo'
export default class ItemClient {

    async getTodoList(query = ""){
        const response = await fetch(`${SERVER_URL}${query}`)
        const data = await response.json()

        return data
    }

    async addTodo(value) {
        await fetch(SERVER_URL, 
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        })
    }

    async deleteTodo(index){
        const response = await fetch(`${SERVER_URL}/${index}`, 
        {
            method: 'DELETE'
        })
        const data = await response.json()
        return data.itemName
    }

    async getSingleTodo(index){
        const response = await fetch(`${SERVER_URL}/${index}`)
        const data = await response.json()
        
        return data.todo
    }

    async editTodoIndex(value,index){
        const response = await fetch(`${SERVER_URL}/${index}`, 
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({todo: value})
        })
        const data = await response.json()

        return data
    }

    async editCheckTodoIndex(index, status) {
        const response = await fetch(`${SERVER_URL}/${index}?checked=${status}`, 
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status, index})
        })
        const data = await response.json()

        return data
    }
}

