"use strict"

const form = document.querySelector('form');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const hp = document.getElementById('hp');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const dataType = document.querySelector('figcaption');
const speed = document.getElementById('speed');

function handleForm(event) {
    event.preventDefault();
    searchPokemon();
    searchInput.value = '';
}

form.addEventListener('submit', handleForm);

async function searchPokemon() {
    try {
        const userEntry = searchInput.value.toLowerCase();
        const endpoint = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userEntry}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        console.log(data)

        const resultDisplay = document.getElementById('display');
        resultDisplay.innerHTML =
            `
            <span id="pokemon-name">${data.name.toUpperCase()}</span>
            <span id="pokemon-id">#${data.id}</span>
            <span id="weight">Weight: ${data.weight}</span>
            <span id="height">Height: ${data.height}</span>
            <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
        `

        dataType.innerHTML = data.types.map(item => `<p id="type">${item.type.name.toUpperCase()}</p>`).join('');

        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

    } catch (err) {
        console.error(err);
        alert('Pokémon not found');
    }
}


