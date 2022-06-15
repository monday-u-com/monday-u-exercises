// The Pokemon Client (using axios) goes here
const axios = require('axios');
const cache = require('memory-cache');
const URL = `https://pokeapi.co/api/v2/pokemon/`;
const TTL = 600000;//10 min

async function catchPokemons(ids) {
    try {
        console.log('ids:', ids);
        let res = [];
        let promises = ids.map((id) => {
            const cached = cache.get(id);
            if (!cached)
                return axios.get(URL + id);
            else {
                console.log('cache hit!');
                res.push(cached);
            }
        });
        promises = promises.filter((x) => x !== undefined);
        if (promises.length > 0)
            await axios.all([...promises])
                .then(axios.spread((...data) => {
                    data.forEach((element) => {
                        console.log(element.data.name);
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