import fetch from 'node-fetch';
import Image from 'ascii-art-image';

export class PokemonClient {
  constructor() {
    this.API_URL = 'https://pokeapi.co/api/v2/pokemon/';
  }

  async fetchPokemons(ids) {
    try {
      const allResponses = await Promise.all(
        ids.map((id) => fetch(`${this.API_URL}${id}/`))
      );
      const pokemons = await Promise.all(
        allResponses.map((response) => response.json())
      );

      pokemons.forEach((pokemon) => {
        this.printPokemonImage(
          pokemon.sprites.other['official-artwork'].front_default
        );
      });
      return pokemons;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to fetch pokemons');
    }
  }

  async fetchSinglePokemon(id) {
    try {
      const response = await fetch(`${this.API_URL}${id}/`);
      if (!response.ok) {
        console.log(response.statusText);
        return;
      }
      const pokemon = await response.json();
      const pokemonImg = this.printPokemonImage(
        pokemon.sprites.other['official-artwork'].front_default
      );

      return { ...pokemon, image: pokemonImg };
    } catch (err) {
      console.log(err);
      throw new Error('failed to fetch pokemon');
    }
  }

  printPokemonImage(url) {
    const image = new Image({
      filepath: url,
      alphabet: 'blocks',
    });

    image.write(function (err, rendered) {
      if (err) {
        console.log(err);
        throw new Error('failed to fetch pokemon image');
      }
      console.log(rendered);
    });

    return image;
  }
}
