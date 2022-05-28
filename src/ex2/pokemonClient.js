class PokemonClient {
    constructor() {
        this.API_BASE = `https://pokeapi.co/api/v2/`;
    }


    async catchPokemons(numbers) { // numbers -> array of numbers
        const API = this.API_BASE + `pokemon/`;
        const promises = [];
        let res = [];
        numbers.map((num) => {
            promises.push(fetch(API + num + '/'));
        })
        try {
            const response = await Promise.all(promises);
            for (const item of response) {//resolve each promise
                res.push(await item.json());
            }
            res.forEach((el, index) => res[index] = el.name);//extract each element to pokemon name
            console.log('fetched pokemons: ', res);
            return res;//one or more names
        }
        catch (e) {//Promise.all failed
            console.log('Catch Error: ', e);
            return false;
        }

    }

    async pokemonType(number) {
        const URL = `https://pokeapi.co/api/v2/type/${number}/`;
        try {
            const response = await fetch(URL);
            const result = await response.json();
            return result.name;
        }
        catch (e) {
            console.log(number + ' not found');
            return false;
        }
    }

}