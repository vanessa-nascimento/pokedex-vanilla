const pokeHTMLList = document.getElementById('pokemonList')
const loadMoreButton =  document.getElementById('loadMoreButton')
const limit = 8
let offset = 0

const maxRecords = 151

function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset,limit).then((pokemonList = []) => {
        pokeHTMLList.innerHTML += pokemonList.map((pokemon) =>
            `<li class="pokemon-item ${pokemon.type}">
                <a href="#">
                    <span class="pokemon-item-number ${pokemon.type}">#${pokemon.number}</span>
                    <span class="pokemon-item-name">${pokemon.name}</span>
                    <div class="pokemon-item-detail">
                        <ol>
                            ${pokemon.types.map(type => `<li class="pokemon-item-type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon-item-img">
                    </div>
                </a>
            </li>`
        ).join('')
    })
}

loadMorePokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = qtdRecordNextPage - offset - 1
        loadMorePokemons(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else loadMorePokemons(offset, limit)
})
