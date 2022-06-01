import fetch from "node-fetch";

export class PokemonClient {
  constructor() {
    this.API_BASE = 'https://pokeapi.co/api/v2/pokemon';
    // popular Pokemons list from https://gist.github.com/octalmage/6936761
    this.popularPokemons = new Array("Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew");
  }

  async fetchPokemon(pokemonText) {
    try {
      const pokemons = pokemonText.split(',').map( el => el.trim() );
      let promises = [];
      pokemons.forEach(pokemon => {
        promises.push(fetch(`${this.API_BASE}/${pokemon}/`));
      });
      const responses = await Promise.all(promises);
      const elements = await Promise.all(responses.map(response => response.json()));
      return await Promise.all(elements.map(element =>
        `${element.forms[0].name} (${element.types[0].type.name} pokemon)`));
    } catch (error) {
      this.failureHandler(pokemonText);
    }
  }

  failureHandler(pokemon) {
    console.log(`Failed to fetch ${pokemon}`);
  }

  isPokemon(name) {
    return this.popularPokemons.find(pokemon => pokemon.toLowerCase() === name.toLowerCase());
  }
}
