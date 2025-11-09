function getPokemonCardTemplate(pokemon, imageUrl) {
    return `
        <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image">
        <h3 class="pokemon-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <div class="pokemon-types">
            ${pokemon.types.map(type => 
                `<span class="type-badge" style="background-color: ${typeColors[type.type.name]}">
                    ${type.type.name}
                </span>`
            ).join('')}
        </div>
        <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
    `;
}


function getPokemonDetailTemplate(pokemon, backgroundColor, imageUrl, currentPokemonIndex, allPokemon) {
    return `
    <div class="pokemon-detail-card" style="background-color: ${backgroundColor}">
        <button class="close-detail-button">×</button>
        <img src="${imageUrl}" alt="${pokemon.name}" class="detail-image">
        <h2 class="detail-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <div class="detail-types">
            ${pokemon.types.map(type => 
                `<span class="type-badge" style="background-color: ${typeColors[type.type.name]}">
                    ${type.type.name}
                </span>`
            ).join('')}
        </div>
        <div class="detail-stats">
            ${pokemon.stats.map(stat => 
                `<div class="stat-item">
                    <span class="stat-name">${stat.stat.name}</span>
                    <span class="stat-value">${stat.base_stat}</span>
                </div>`
            ).join('')}
        </div>
        <div class="navigation-buttons">
            <button class="nav-button" id="prevButton" ${currentPokemonIndex === 0 ? 'disabled' : ''}>
                ← Previous
            </button>
            <button class="nav-button" id="nextButton" ${currentPokemonIndex === allPokemon.length - 1 ? 'disabled' : ''}>
                Next →
            </button>
        </div>
    </div>
    `;
}
