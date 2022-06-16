import fs from "fs/promises";
import itemManager from "./item_manager.js";

const todoFile='./todoList.json';
const ItemManager = new itemManager();

function getLength(data){
    if(data.length==0){
        return 0;
    }
    const ids = data.map(object => {
        return object.id;
    });
      return Math.max(...ids)+1;
}

export async function getAllService() {
    return await readTodoFile();
}

export async function addTodoService(todo) {
    let data = await readTodoFile();
    if (!data) {
        data = [];
    }
    let newTodo = await ItemManager.addArrayItem(todo,getLength(data))
    const all = [...data, ...newTodo];
    await writeTodoFile(all);
    return await getAllService()
}

async function readTodoFile() {
    try {
        const data = await fs.readFile(todoFile);
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeTodoFile(content) {
    try {
        await fs.writeFile(todoFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

export async function deleteTodoService(id) {
    const data = await getAllService();
    const index = data.findIndex((value) => value.id === id);
    data.splice(index, 1);
    await writeTodoFile(data);
    return await getAllService()
}

export async function deleteAllTodoService() {
    const data = [];
    await writeTodoFile(data);
    return data
}
