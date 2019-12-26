//CONTEXTUAL DATA:
//var basestats
//var levelchart
//var ivspread
//var uldata

//INPUT
var pokemonID = parseInt(document.getElementById("pokemon_chosen").value);
var cp = parseInt(document.getElementById("cp").value);
var atkIV = parseInt(document.getElementById("atk").value);
var defIV = parseInt(document.getElementById("def").value);
var hpIV = parseInt(document.getElementById("hp").value);

//DERIVED VALUES
var pokemon = basestats[pokemonID];
var pokedex = pokemon[0];
var name = pokemon[1];
var hp = hpIV + parseInt(pokemon[2]);
var atk = atkIV + parseInt(pokemon[3]);
var def = defIV + parseInt(pokemon[4]);

//SPREADSHEET DATA
var glStats = ivspread[atkIV][defIV][hpIV].slice(0, 2);
var glLevel = glStats[0];
var glRank = glStats[1];
var glPerc = glStats[2];
var ulStats = ivspread[atkIV][defIV][hpIV].slice(2, 5);
var ulLevel = ulStats[0]
var ulRank = ulStats[1];
var ulPerc = ulStats[2];
var mlStats = ivspread[atkIV][defIV][hpIV].slice(5, 8);
var mlLevel = ulStats[0]
var mlRank = ulStats[1];
var mlPerc = ulStats[2];

//CALCULATIONS
var level = 15.0 //TODO: ACTUAL CALCULATION
var glStardust = 15500 //TODO:
var glCandy = 35 //TODO:
var glCp = 1489 //TODO:

//OUTPUT VALUES
var title = "Level "+level+" "+name+" (#"+pokedex+")";

//OUTPUT
console.log(ivspread);
console.log(title)
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

console.log("Gl Level: " + glLevel);
console.log("GL#: " + glRank);
console.log("GL%: " + glPerc);
console.log("Ul Level: " + ulLevel);
console.log("UL#: " + ulRank);
console.log("UL%: " + ulPerc);
console.log("Ml Level: " + mlLevel);
console.log("ML#: " + mlRank);
console.log("ML%: " + mlPerc);
console.log("");