async function getPokemon(num) {
    const url = `https://pokeapi.co/api/v2/pokemon/${num}`
    const pokeName = await fetch(url).then(res => {
        return res.json()
    }).then(data => {
        return data
    }).catch(e => {
        return 0
    })
    return pokeName
}

export default getPokemon