export function handleAddSingleOrMultiPokemonsTodo(model, pokemonClient, enterValue){

    if(enterValue.includes(",")){
        handleAddMultiPokemonsTodo(model, pokemonClient ,enterValue)
    }
    else {
        handleAddSinglePokemonTodo(model, pokemonClient, enterValue)
    }
}

export function handleAddMultiPokemonsTodo(model, pokemonClient, enterValue){
    
    const split = enterValue.split(",")
    const pokemonArr = []

    for(let i = 0; i < split.length; i++){
        pokemonArr.push(pokemonClient.fetchMulti(trim(split[i])))
    }

    Promise.all(pokemonArr)
        .then(response => {
            response.forEach(res => {
                const types = pokemonClient.getTypes(res)
                const dataRetrieved = pokemonClient.returnPokemonData(res, types)
                const {value, isPokemon, imagePokemonPath} = dataRetrieved
                addTodoParse(model, value, isPokemon, imagePokemonPath)
        })
        updateTodos(model)
    }).catch(error => {
        console.log(error)
        const isPokemon = false
        const imagePokemonPath = null
        const value = `failed to fetch pokemon with this input: ${enterValue}`
        addTodoParse(model, value, isPokemon, imagePokemonPath)
        updateTodos(model)
    })
}

export async function handleAddSinglePokemonTodo(model, pokemonClient, enterValue){
    const dataRetrieved = await pokemonClient.fetchSingle(enterValue)
    if(dataRetrieved) {
        const {value, isPokemon, imagePokemonPath} = dataRetrieved
        addTodoParse(model, value, isPokemon, imagePokemonPath) 
    }
    else {
        const isPokemon = false
        const imagePokemonPath = null
        const value = `failed to fetch pokemon with this input: ${enterValue}`
        addTodoParse(model, value, isPokemon, imagePokemonPath)
    }

    updateTodos(model)
}

function addTodoParse(model, value, isPokemon, imagePokemonPath){
    model.addData({title: value, done: false, isPokemon, imagePokemonPath})
}

function trim(value) {
    return value.replace(/^\s+|\s+$/g,"");
}

function updateTodos(model) {
    model.saveDataToLS()
}