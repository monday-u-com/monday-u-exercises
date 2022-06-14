import { writeFile } from 'fs';
import fs from 'fs-extra'

export async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath);
        return JSON.parse(data.toString());
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function writeToFile(filePath, fileToWrite){
    try{
        await fs.writeFile(filePath, JSON.stringify(fileToWrite))
    }
    catch(e){
        console.log(e)
        return e
    }
}