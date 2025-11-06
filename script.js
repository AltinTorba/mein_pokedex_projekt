let currentOffset = 0;
const limit = 20;
let allPokemon = [];
let filteredPokemon = [];
let currentPokemonId = null;

const pokemonGrid = document.getElementById("pokemonGrid");
const loadMoreButton = document.getElementById("loadMoreButton");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeButton");
const pokemonDetail = document.getElementById("pokemonDetail");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");


function init() {
    fetchPokemonData(currentOffset, limit).then(data => {
        allPokemon = data;
        filteredPokemon = data;
        displayPokemonCards(data);
    });
}

async function fetchPokemonData(offset, limit) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();

        const pokemonDetails = [];

        for (let i = 0; i < data.results.length; i++) {
            const pokemon = data.results[i];
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            pokemonDetails.push(pokemonData);
        }

        return pokemonDetails;

    } catch (error) {
        console.error("❌:", error);
        return []; 
    }
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.dataset.id = pokemon.id;
    
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = typeColors[primaryType] || '#A8A878';
    card.style.backgroundColor = backgroundColor;
    
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image">
        <h3 class="pokemon-name">${pokemon.name}</h3>
        <div class="pokemon-types">
            ${pokemon.types.map(type => 
                `<span class="type-badge" style="background-color: ${typeColors[type.type.name]}">${type.type.name}</span>`
            ).join('')}
        </div>
        <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
    `;
    
    card.addEventListener('click', () => openPokemonDetail(pokemon));
    
    return card;
}

function displayPokemonCards(pokemonList) {
    pokemonList.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonGrid.appendChild(card);
    });
}

