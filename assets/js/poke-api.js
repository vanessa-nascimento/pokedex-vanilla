const pokeApi = {}

function convertPokeAPiDetailToPokemonModel(pokemon) {
    const pokemonInfo = new Pokemon()
    pokemonInfo.number = pokemon.id
    pokemonInfo.name = pokemon.name
   
    const types = pokemon.types.map(typeSlot => typeSlot.type.name)
    const [type] = types //same pokemon.types.get(0) using destructuring
    
    pokemonInfo.types = types
    pokemonInfo.type = type
    pokemonInfo.photo = pokemon.sprites.other.dream_world.front_default


    return pokemonInfo
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then(resp => resp.json())
    .then(convertPokeAPiDetailToPokemonModel)
}

pokeApi.getPokemons = (offset = 0,limit = 4) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => Promise.all(pokemonsDetails))
}