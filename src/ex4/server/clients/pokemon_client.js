// The Pokemon Client (using axios) goes here
const axios = require('axios');
const cache = require('memory-cache');
const URL = `https://pokeapi.co/api/v2/pokemon/`;
const TTL = 60000 * 10;//10 min

async function catchPokemons(ids) {
    try {
        let res = [];
        let promises = [];
        ids.map((id) => {
            const cached = cache.get(id);
            if (!cached)
                promises.push(axios.get(URL + id));
            else {
                console.log('cache hit!');
                res.push(cached);
            }
        });
        if (promises.length > 0)
            await axios.all([...promises])
                .then(axios.spread((...data) => {
                    data.forEach((element) => {
                        cache.put((element.data.id).toString(), element.data, TTL);
                        res.push(element.data);
                    })
                }))
        return res;
    }
    catch (err) {
        console.log('catch pokemon failed', err.message);
    }
}

module.exports = {
    catchPokemons,
}