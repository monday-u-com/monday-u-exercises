
class PokemonClient
{
    constructor()
    {
        this.base_url = "https://pokeapi.co/api/v2/pokemon/"
    }

    check()
    {
        (async () => {
            const golduck = await this.Pokedex.getPokemonByName("golduck")
            console.log(golduck)
          })()
    }

    async GetPokemonById(id)
    {
        try
        {
            const response = await fetch(this.base_url.concat(id));
            if (!response.ok) 
            {
                throw new Error(`Pokemon with ID ${id} was not found`);
            }
            const res_obj = await response.json();
            return res_obj;
        }
        catch (error)
        {
            return error;
        }        
    }
}