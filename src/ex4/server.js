// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express")
const port = 8080
const cors = require("cors")
const app = express()

const {
  createPokemon,
  getPokemon,
  getAllPokemons,
  deletePokemon,
} = require("./server/routes/api")

app.use(express.static("dist"))
app.use([express.json(), cors()])

app.get("/api/pokemon", getAllPokemons)
app.post("/api/pokemon/:id", createPokemon)

app.listen(port, () => {
  console.log("Server started on port", port)
})
