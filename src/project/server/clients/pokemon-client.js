// The Pokemon Client (using axios) goes here

const axios = require('axios')

const API_BASE = 'https://pokeapi.co/api/v2/pokemon/'

module.exports = class PokemonClient{

    fetchMulti(pokemonName){
        return new Promise((resolve, reject) => {
            return axios(`${API_BASE}${pokemonName}`)
                .then(response => {
                    if(response.status === 200){
                        resolve(response.data)
                    }
                    else{
                        console.log("here else")
                        reject(response)
                    }
                })
                .catch(error => {
                    if(error.response.status === 404){
                        resolve(pokemonName)
                    }
                    else{
                        reject(error)
                    }
                })
        })
    }

    async fetchSingle(dataEntered){ 
        try{
            const response = await axios(`${API_BASE}${dataEntered}`)
            if(response.status === 404 && isNaN(Number.parseInt(dataEntered))){
                return dataEntered
            }
            else if(response.status === 404 && !isNaN(Number.parseInt(dataEntered))){    
                return `pokemon id ${dataEntered} not found` 
            }

            const res = await response.data
            const types = this.getTypes(res)

            return this.returnPokemonData(res, types)
        }catch(error){
            console.log(error)
        }
    }

    getTypes(data){
        if(!data.types) return data

        const typeNo = data.types
        let types = ""

        typeNo.forEach(type => {
            types += `${type.type.name}/`    
        })

        return types
    }

    returnPokemonData(res, types){
        if(res.name === undefined){
            return {
                value: `failed to catch pokemon with id ${res}`, 
                isPokemon: false, 
                imagePokemonPath:null
            }
        }

        return {
            value: `catch ${res.name} with type ${types}`,
            isPokemon: true,
            imagePokemonPath: res.sprites.front_default
        }
    }
}