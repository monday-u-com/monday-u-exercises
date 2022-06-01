import fetch from "node-fetch";

export class PokemonClient {
    constructor() {
        this.API_BASE = `https://pokeapi.co/api/v2/`;
    }
    async catchPokemons(numbers) { // numbers -> array of IDs
        const API = this.API_BASE + `pokemon/`;
        let res = [];
        try {
            const promises = numbers.map((num) => fetch(API + num + '/'));
            const response = await Promise.all(promises);
            for (const item of response) { //resolve each promise
                res.push(await item.json());
            }
            return res; //one or more pokemon objects
        }
        catch (err) { //Promise.all failed
            // console.log(err);
            // throw err;
            console.log("PokemonClient error");
        }

    }
    async getPokemonTypeById(number) {
        const URL = this.API_BASE + `type/${number}/`;
        try {
            const response = await fetch(URL);
            const result = await response.json();
            return result;
        }
        catch (err) {
            console.log(number + ' not found');
            throw err;
        }
    }

}