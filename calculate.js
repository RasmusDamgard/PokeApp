//CONTEXTUAL DATA:
//var pokedata

//INPUT
var pokemonID = parseInt(document.getElementById("pokemon_chosen").value);
var cp = parseInt(document.getElementById("cp").value);
var atkIV = parseInt(document.getElementById("atk").value);
var defIV = parseInt(document.getElementById("def").value);
var hpIV = parseInt(document.getElementById("hp").value);

//DERIVED VALUES
var pokemon = basestats[pokemonID];
var pokedex = parseInt(pokemon[0]);
var name = pokemon[1];
var hpBase = parseInt(pokemon[2]);
var atkBase = parseInt(pokemon[3]);
var defBase = parseInt(pokemon[4]);

//CALCULATIONS
var hp = hpIV + hpBase
var atk = atkIV + atkBase
var def = defIV + defBase
//var level = LEVEL()

console.log("Pokemon ID: " + pokemonID);
console.log("Pokedex Entry: " + pokedex);
console.log("Basestats: " + pokemon);
console.log("CP:" + cp);
console.log("Attack IV: " + atkIV);
console.log("Defense IV: " + defIV);
console.log("HP IV: " + hpIV);
console.log("Attack: " + atk)
console.log("Defense: " + def);
console.log("HP: " + hp);
console.log(pokedata);