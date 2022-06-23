const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	port: process.env.port,
	pokemonApi: process.env.pokemonApi,
};
