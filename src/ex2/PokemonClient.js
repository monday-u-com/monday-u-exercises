// class PokemonApi{
//     async getPokemon(id){
//         fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//         .then((response)=>{
//         return response.json()
          
//     });
//     }
// }

export default class PokemonClient {
  constructor() {}

    async getPokemonByID(pokemonsArray) {
    
      const pokemonFecthing = await Promise.all(
        
          pokemonsArray.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (response.ok) {
            return response.json();
          } else {
            return id;
          }
        })
      ).catch((error) =>{
        console.log(error); 
      });
      return pokemonFecthing;
    }
  
}
  
  

  