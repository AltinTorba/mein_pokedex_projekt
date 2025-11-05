let currentOffset = 0;
// const limit = 20;
let allPokedex = [];
let filteredPokedex = [];
let currentPokedexId = null;
let isSearching = false;


const pokedexGrid = document.getElementById("pokedexGrid");
const loadMoreButton = document.getElementById("loadMoreButton");
const overlay = document.getElementById("overlay");
const closeButton = document.getElementById("closeButton");
const pokedexDetail = document.getElementById("pokedexDetail");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button"); 


async function getFirstPokedex() {
    
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        // console.log(data.results);
        const pokemonWithDetails = [];
        
        for (let i = 0; i < data.results.length; i++) {
            const pokemon = data.results[i];
            
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();
            
            pokemonWithDetails.push(detailData);
        }
        
        allPokedex = pokemonWithDetails;
        showPokedexCards(allPokedex);
        
    } catch (error) {
        console.error("❌:", error);
    }
}



function startPokedex() {

    getFirstPokedex();

    
    // loadMoreButton.onclick = getMorePokedex;
    // closeButton.onclick = hideDetails;
    // searchButton.onclick = searchPokedex;
    
    // Kërko me Enter
    // searchInput.onkeypress = function(event) {
    //     if (event.key === "Enter") {
    //         searchPokedex();
    //     }
    // };
    
    // Thirr funksionin për të marrë Pokémon të parë    
}


function showPokedexCards(pokedexList) {    

    pokedexGrid.innerHTML = '';
    
    for (let i = 0; i < pokedexList.length; i++) {
        const pokedex = pokedexList[i];
        
        // elementin për kartën
        const card = document.createElement('div');
        card.className = 'pokedex-card';
        
        // Përdor sprite-in e fotos nëse ekziston
        const imageUrl = pokedex.sprites.front_default || 'https://via.placeholder.com/96x96?text=No+Image';
        
        card.innerHTML = `
            <p>#ID: ${pokedex.id}</p>
            <img src="${imageUrl}" alt="${pokedex.name}" width="96" height="96">
            <h3>${pokedex.name}</h3>
            <button onclick="showPokedexDetails(${pokedex.id})">More Details</button>
        `;
        
        // Shto kartën në grid
        pokedexGrid.appendChild(card);
    }

}


// async function showPokedexDetails(pokedexId) {

//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexId}`);
//     const pokedex = await response.json();

//     currentPokedexId = pokedexId;

//     pokedexDetail.innerHTML = /*Html*/`
    
    
//     `
//     let typesHTML = '';
//     for (let i = 0; i < pokedex.types.length; i++) {
//         typesHTML += ``;
        
//     }
//     console.log("ID:", pokedexId);
    
    
// }




// Funksionet e tjera
// function getMorePokedex() {

//     console.log("Funksioni për më shumë Pokémon");
// }

// function hideDetails() {
//     console.log("Funksioni për mbylljen e dritares");
// }

// function searchPokedex() {
//     console.log("Funksioni: searchPokemon() - Do të kërkojë Pokémon");
// }
