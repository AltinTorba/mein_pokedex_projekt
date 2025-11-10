let currentOffset = 20;
const limit = 20;
let allPokemon = [];
let filteredPokemon = [];
let currentPokemonIndex = null;

const pokemonGrid = document.getElementById("pokemonGrid");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonDialog = document.getElementById("pokemonDialog");
const dialogClose = document.getElementById("dialogClose");
const pokemonDetail = document.getElementById("pokemonDetail");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");


async function init() {
    const data = await fetchPokemonData(0, 20);
    allPokemon = data;
    filteredPokemon = data;
    displayPokemonCards(data);
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
    card.innerHTML = getPokemonCardTemplate(pokemon, imageUrl);
    card.addEventListener('click', () => openPokemonDetail(pokemon));
    return card;
}

function displayPokemonCards(pokemonList) {
    pokemonList.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonGrid.appendChild(card);
    });
}

async function loadMorePokemon() {
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Loading...';
    try {
        const newPokemon = await fetchPokemonData(currentOffset, limit);
        allPokemon = [...allPokemon, ...newPokemon];
        displayPokemonCards(newPokemon);
        currentOffset += limit;
    } catch (error) {
        console.error('Error loading more Pokémon:', error);
    } finally {
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = 'Load More Pokémon';
    }
}

function openPokemonDetail(pokemon) {
    currentPokemonIndex = allPokemon.findIndex(p => p.id === pokemon.id);
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = typeColors[primaryType] || '#A8A878';
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    pokemonDetail.innerHTML = getPokemonDetailTemplate(pokemon, backgroundColor, imageUrl, currentPokemonIndex, allPokemon);
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    prevButton.disabled = currentPokemonIndex === 0;
    nextButton.disabled = currentPokemonIndex === allPokemon.length - 1;
    prevButton.onclick = () => currentPokemonIndex > 0 && openPokemonDetail(allPokemon[currentPokemonIndex - 1]);
    nextButton.onclick = () => currentPokemonIndex < allPokemon.length - 1 && openPokemonDetail(allPokemon[currentPokemonIndex + 1]);
    pokemonDialog.showModal();
    setTimeout(() => document.querySelector('.dialog-content')?.scrollTo(0,0), 10);
}

function closePokemonDetail() {
    document.body.style.overflow = 'auto';
    overlay.classList.add('hidden');
}

function searchPokemon() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm.length < 3) return;
    pokemonGrid.innerHTML = '';
    filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    if (filteredPokemon.length === 0) {
        pokemonGrid.innerHTML = '<p>No Pokémon found matching your search.</p>';
        loadMoreButton.style.display = 'none';
    } else {
        displayPokemonCards(filteredPokemon);
        loadMoreButton.style.display = 'none';
    }
}

function resetSearch() {
    if (searchInput.value.length === 0) {
        pokemonGrid.innerHTML = '';
        filteredPokemon = allPokemon;
        displayPokemonCards(allPokemon);
        loadMoreButton.style.display = 'block';
    }
}

loadMoreButton.addEventListener('click', loadMorePokemon);

function closePokemonDetail() {
    pokemonDialog.close();
}

pokemonDialog.addEventListener('click', (e) => {
    if (e.target === pokemonDialog) {
        closePokemonDetail();
    }
    if (e.target.classList.contains('close-detail-button')) {
        closePokemonDetail();
    }
});

searchInput.addEventListener('input', () => {
    searchButton.disabled = searchInput.value.length < 3;
});

searchButton.addEventListener('click', searchPokemon);

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && searchInput.value.length >= 3) {
        searchPokemon();
    }
});

searchInput.addEventListener('input', resetSearch);
