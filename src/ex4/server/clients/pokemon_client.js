// The Pokemon Client (using axios) goes here
const axios = require('axios');
const URL = `https://pokeapi.co/api/v2/pokemon/`;

async function catchPokemons(ids) {
    try {
        console.log('ids:', ids);
        const promises = ids.map((id) => {
            return axios.get(URL + id)
        });
        console.log('promises:', promises);
        const res = [];
        await axios.all([...promises])
            .then(axios.spread((...data) => {
                data.forEach((element) => {
                    console.log(element.data.name);
                    res.push(element.data);
                })
            }))
        return res;
    }
    catch (err) {
        // console.log(err);
        console.log('catch pokemon failed', err.message);
    }

}

// catchPokemons(1);

module.exports = {
    catchPokemons,
}