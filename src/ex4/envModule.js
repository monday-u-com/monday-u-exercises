import dotenv from "dotenv";
dotenv.config();

export default {
	port: process.env.port,
	pokemonApi: process.env.pokemonApi,
	jsonFilePath: process.env.jsonFilePath,
};
