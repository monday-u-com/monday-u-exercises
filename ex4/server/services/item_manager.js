// The ItemManager should go here. Remember that you have to export it.

const fs = require('fs').promises;
const todos = 'todos.json';


// Add Todo
async function addTodo(req,res) {
    console.log('AddTODO!');
    const arrTodos = await readTodos();
    if(!arrTodos){
        arrTodos = [];
    }
    arrTodos.push(req.body);
    await writeTodos(arrTodos);
    res.status(200).json(req.body);
}

// Get All Todos
async function getTodos(){
    return await readTodos;
}

// Delete a Todo
async function deleteTodo(todoName){
    const data = await getTodos();
    const index = data.findIndex((val)=> val.name === todoName);
    const deleteTodo = data[index]
    data.splice(index,1);
    await writeTodos(data);
    
    return deleteTodo;

}

// Clear All 
async function clearAll() {
    await writeTodos([]);
}
async function readTodos(){
    try{
        const data = await fs.readFile(todos);
        return await JSON.parse(data.toString());
    }catch(err){
        console.error('Error while trying to read todos.json file.');
    }
}

async function writeTodos(value){
    try{
        await fs.writeFile(todos,JSON.stringify(value));
    }catch(err){
        console.error('Error while trying to Write To todos.json file.');
    }
}


module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    clearAll
}