// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from "express";
import router from './server/routes/api.js'

const app = express()
app.use(express.json())

app.use('/dist', express.static("dist"))
app.use('/', router)

app.listen('3030', () => {
    console.log("App is running :)")
})