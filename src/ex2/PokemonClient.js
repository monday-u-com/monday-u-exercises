export class PokemonClient {
  async fetchPokemons(ids) {
    const allPromises = [];
    ids.forEach((id) => {
      allPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`));
    });

    try {
      let AllResponses = await Promise.all(allPromises);
      AllResponses = [...AllResponses.map((response) => response.json())];
      let AllData = await Promise.all(AllResponses);
      AllData = [
        ...AllData.map((data) => {
          return { id: data.id, task: 'Catch ' + data.name };
        }),
      ];
      return AllData;
    } catch (err) {
      return [`One of the Pokemons with IDs ${ids} was not found`];
    }
  }

  async fetchSinglePokemon(id) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const data = await response.json();
      return [{ id: data.id, task: 'Catch ' + data.name }];
    } catch (err) {
      return [`Pokemon with ID ${id} was not found`];
    }
  }
}
