// Express boilerplate, hosting the `dist` file, connecting to the routes
const express = require("express")
const port = 8080
const cors = require("cors")
const app = express()

const pokemonClient = require("./server/clients/PokemonClient")
const {
  createPokemon,
  getPokemon,
  getAllPokemons,
  deletePokemon,
} = require("./server/routes/api")
const pc = new pokemonClient()

app.use(express.static("dist"))
app.use([express.json(), cors()])

app.get("/items", async (req, res) => {
  console.log("in get request")
  const items = im.getItems()
  res.json(items)
})

app.post("/items", async (req, res) => {
  console.log("in post request")
  const pokemon = await pc.getPokemon(req.body.item)
  console.log("pokemon", pokemon)
  im.addItem(pokemon.name)
  res.json({ message: "Item added" })
})

app.get("/items/:item", async (req, res) => {
  console.log("in get request")
  const pokemon = await pc.getPokemon(req.params.item)
  im.getItem(req.params.item)
  res.json(pokemon)
})

app.listen(port, () => {
  console.log("Server started on port", port)
})
