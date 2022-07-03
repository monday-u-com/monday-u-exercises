const fs = require('fs').promises;
const todofile = 'todo_list.json';

async function addTodo(todo) {
    let todos = await readTodoFile();
    todos = [...todos, CreateObToSave(todo)];
    await writeTodoFile(todos);
}

async function addManyTodo(manyTodo) {
    let todos = await readTodoFile();
    let todosToSave = manyTodo.map(CreateObToSave)
    todos = [...todos, ...todosToSave];
    await writeTodoFile(todos);
}


async function readTodoFile() {
    try {
        const data = await fs.readFile(todofile);
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeTodoFile(content) {
    try {
        await fs.writeFile(todofile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

function CreateObToSave(value) {
    return {
        value
    }
}

module.exports = {
    addTodo,
    addManyTodo,
    readTodoFile,
    writeTodoFile
}