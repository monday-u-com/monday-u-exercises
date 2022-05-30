import fs from 'fs/promises';
import dotenv from 'dotenv';

export default class FileManager {
    constructor(){
        dotenv.config();
        this.file = process.env.FILE_DIRECTORY;
    }
    /**
     * write task array to file in json format
     * @param {Array} tasks tasks array
     */
    async WriteToFileTasksArray(tasks) {
        const task_as_json = await JSON.stringify(tasks);
        fs.writeFile(this.file, task_as_json, 'utf-8');
    }

    /**
     * reads file and parses it to json object
     * @returns json object if file is full else empty array
     */
    async ReadFromFileTasks() {
        const file_tasks = await fs.readFile(this.file, 'utf8');
        if (file_tasks.length) {
            const json_file_object = await JSON.parse(file_tasks);
            return json_file_object;
        }
        return [];
    }
}