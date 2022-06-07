const API_BASE = 'https://pokeapi.co/api/v2/pokemon/'

export default class PokemonClient{

    async fetchSingle(dataEntered){ 
        try {
            const response = await fetch(`${API_BASE}${dataEntered}`)
            if(response.status === 404 && isNaN(+dataEntered)){
                return dataEntered
            }
            else if(response.status === 404 && !isNaN(+dataEntered)){    
                return `pokemon id ${dataEntered} not found` 
            }

            const res = await response.json()
            const types = this.getTypes(res)

            return this.returnPokemonData(res, types)
        } catch(error){
            console.log(error)
        }
    }

    getTypes(data){

        if(!data.types) return data

        const typeNo = data.types
        let types = ""

        typeNo.forEach(type => {
            types += type.type.name + "/"    
        })

        return types
    }

    returnPokemonData(res, types){
        if(res.name === undefined){
            return `failed to catch pokemon with id ${res}`
        }
        return `catch ${res.name} with type ${types}`
    }

    fetchMulti(pokemonName){
        return new Promise((resolve, reject) => {
            return fetch(`${API_BASE}${pokemonName}`)
                .then(response => {
                    if(response.status === 200){
                        resolve(response.json())
                    }
                    else if(response.status === 404){
                        resolve(pokemonName)
                    }
                    else{
                        reject(response)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}