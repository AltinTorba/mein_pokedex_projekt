// const pokemonCardTemplate = `
//         <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image">
//         <h3 class="pokemon-name">${pokemon.name}</h3>
//         <div class="pokemon-types">
//             ${pokemon.types.map(type => 
//                 `<span class="type-badge" style="background-color: ${typeColors[type.type.name]}">${type.type.name}</span>`
//             ).join('')}
//         </div>
//         <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
//     `;


// const pokemonCardTemplate = `
//     <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image">
//     <h3 class="pokemon-name">${pokemon.name}</h3>
//     <div class="pokemon-types">
//         ${getTypesHTML(pokemon.types)}
//     </div>
//     <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
// `;

// function getTypesHTML(types) {
//     let typesHTML = '';
    
//     for (let i = 0; i < types.length; i++) {
//         const type = types[i];
//         const typeName = type.type.name;
//         const typeColor = typeColors[typeName] || '#A8A878';
        
//         typesHTML += `<span class="type-badge" style="background-color: ${typeColor}">${typeName}</span>`;
//     }
    
//     return typesHTML;
// }