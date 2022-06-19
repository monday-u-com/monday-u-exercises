import PokemonClient from '../clients/PokemonClient.mjs';

const pokemon_client = new PokemonClient();
export async function GetPokemonsNames() {
    const req = Promise.resolve(pokemon_client.FetchAllPokemonsNamesRequest());
    const pokemons = await req;
    return Promise.resolve(ParsePokemonNamesResponse(pokemons));
}

export async function GetPokemonById(id) {
    const req = Promise.resolve(pokemon_client.FetchRequestById(id));
    const pokemon = await req;
    return Promise.resolve(FilterPokemonImageAttribute(pokemon));
}

export async function GetPokemonsByList(ids) {
    const pokemon_ids = ids.split(',');
    const requests = [];
    pokemon_ids.forEach(async (id) => {
        const req = GetPokemonById(id);
        requests.push(req);
    });
    return Promise.all(requests);
}

function ParsePokemonNamesResponse(response) {
    const pokemons = [];
    response.forEach((pokemon) => {
        // split the url attribute to get the id the response contains only name and url no id attribute
        const parsed_url = pokemon.url.split('/').filter((item) => item);
        const id = parsed_url[parsed_url.length - 1];
        pokemons.push({ name: pokemon.name, id: pokemon.id });
    });
    return pokemons;
}

/**
 * filters the pokemon object from api and takes only the images with url
 * @param {Object} pokemon_object pokemon object from api
 * @returns
 */
function FilterPokemonImageAttribute(pokemon_object) {
    // new pokemon object
    const pokemon_filtered = { name: pokemon_object.name, id: pokemon_object.id, images: {} };
    // images url from object
    const images_unfiltered = pokemon_object.sprites;
    const images = Object.entries(images_unfiltered).filter((value) => {
        // get only attributes of url (filters null and other objects)
        if (typeof value[1] !== 'object') 
            return value;
    });
    // appends it to the new object
    images.forEach((value) => {
        pokemon_filtered.images = { ...pokemon_filtered.images, ...{ [value[0]]: value[1] } };
    });
    return pokemon_filtered;
}