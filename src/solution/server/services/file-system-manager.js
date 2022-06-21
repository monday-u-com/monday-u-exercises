import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

class FileSystemManager {
    BASE_DIR = process.cwd();
    TODO_DATA_PATH = join(this.BASE_DIR, 'data');
    TODO_FILE_NAME = 'todo.json';

    constructor() {
        this.initFile();
    }

    initFile() {
        try {
            if (!existsSync(this.TODO_DATA_PATH)) {
                mkdirSync(this.TODO_DATA_PATH);
            }
        } catch (err) {
            console.error(err);
        }
        try {
            if (!existsSync(join(this.TODO_DATA_PATH, this.TODO_FILE_NAME))) {
                writeFileSync(join(this.TODO_DATA_PATH, this.TODO_FILE_NAME), JSON.stringify([]));
            }
        } catch (err) {
            console.error(err);
        }
    }

    addItemToFile(item) {
        const items = this.getAllItems();
        items.push(item);
        this.saveToTodoFile(items);
        return item;
    }

    getAllItems() {
        return JSON.parse(readFileSync(join(this.TODO_DATA_PATH, this.TODO_FILE_NAME), 'utf8'));
    }

    getItemFromFile(id) {
        const items = this.getAllItems();
        return { items, item: items.find(el => el.id === id) };
    }

    getItemFromFileById(id) {
        const items = this.getAllItems();
        return items.find(el => el.id === id);
    }

    editItem(id, item) {
        const current = this.getItemFromFile(id);
        if (!current.item) {
            return;
        }
        current.item.item = current.item.message = item;
        this.saveToTodoFile(current.items);
        return current.item;
    }

    removeItemFromFile(id) {
        const current = this.getItemFromFile(id);
        if (!current.item) {
            return {};
        }
        current.items.splice(current.items.indexOf(current.item), 1);
        this.saveToTodoFile(current.items);
        return {deleted: 1};
    }

    saveToTodoFile(items) {
        writeFileSync(join(this.TODO_DATA_PATH, this.TODO_FILE_NAME), JSON.stringify(items), 'utf8');
    }

    cleanTodoFile() {
        const deletedCount = this.getAllItems().length;
        this.saveToTodoFile([]);
        return {deleted: deletedCount};
    }
}

export default FileSystemManager;