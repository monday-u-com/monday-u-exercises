import { updateFile } from './fileHandler.js'

export const logger = async (req, res, next) => {
    const currentDate = new Date().toLocaleDateString()
    if (req.body.item !== undefined) {
        updateFile("./server/data/log.json", `Item: ${req.body.item}, Date : ${currentDate}`)
    }
    // let logs = await readFile("./server/data/log.json")
    // if (req.body.item !== undefined) {
    //     logs = [...logs, `Item: ${req.body.item}, Date : ${currentDate}`]
    //     writeToFile("./server/data/log.json", logs)
    // }
    next()
}