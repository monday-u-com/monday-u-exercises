import { writeToFile, readFile } from './fileHandler.js'

export const logger = async (req, res, next) => {
    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let logs = await readFile("./server/data/log.json")
    if (req.body.item !== undefined) {
        logs = [...logs, `Item: ${req.body.item}, Date : ${currentDate}`]
        writeToFile("./server/data/log.json", logs)
    }
    next()
}