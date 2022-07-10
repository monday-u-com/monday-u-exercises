// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from "express";
import router from './server/routes/api.js'
import { logger } from './server/helper/logger.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(logger)
app.use(cors())

app.use('/todo', router)

app.listen('3030', () => {
    console.log("App is running :)")
})