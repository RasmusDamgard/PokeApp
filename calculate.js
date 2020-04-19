//CONTEXTUAL DATA:
//var basestats
//var levelchart
//var powerups
//var pvpdata
//var family
//var pokemonID

//INPUT DATA
var cp = parseInt(document.getElementById("_Cp").value);
var atkIV = parseInt(document.getElementById("_Atk").value);
var defIV = parseInt(document.getElementById("_Def").value);
var hpIV = parseInt(document.getElementById("_Hp").value);
var isBuddy = document.getElementById("_Buddy").checked;
var isLucky = document.getElementById("_Lucky").checked;
var isPurified = document.getElementById("_Purified").checked;
var level = GetLevel(cp,
    atkIV + parseInt(basestats[pokemonID][3]),
    defIV + parseInt(basestats[pokemonID][4]),
    hpIV + parseInt(basestats[pokemonID][2]));

var outputContainer = document.getElementById("output-container")
var template = document.getElementById("_pokemon-container-template");

function SetPvPData (container, pokemon, league) {
    if (pokemon.pvp[league].isValid) {
        container.getElementsByClassName("PokePerc")[0].innerHTML = pokemon.pvp[league].perc+"%";
        container.getElementsByClassName("PokeRank")[0].innerHTML = "#"+pokemon.pvp[league].rank;
        container.getElementsByClassName("PokeStardust")[0].innerHTML = pokemon.pvp[league].stardust+" Stardust";
        container.getElementsByClassName("PokeCandy")[0].innerHTML = pokemon.pvp[league].candy+" Candy";
        container.getElementsByClassName("PokeLevel")[0].innerHTML = "Level "+pokemon.pvp[league].level;
        container.getElementsByClassName("PokeCP_unit")[0].innerHTML = "CP";
        container.getElementsByClassName("PokeCP_value")[0].innerHTML = pokemon.pvp[league].cp;
    } else {
        container.getElementsByClassName("PokeValid")[0].innerHTML = "Not Eligible";
        if (league == "great") {container.style.backgroundColor = "red";}
        else {container.style.backgroundColor = "darkred";}
    }
}

for (var i = 0; i < family.length; i++)
{
    var pokemon = new Pokemon(family[i], pvpdata[i], level);
    pokemon.PrintStats();
    pokemon.PrintPvPStats();
    console.log(" ");

    var clone = template.content.cloneNode(true);
    outputContainer.appendChild(clone);

    var _corner = document.getElementById("__corner-header");
    _corner.getElementsByClassName("PokeLevel")[0].innerHTML = "Level "+level;

    var _container = document.getElementsByClassName("_pokemon-container")[i];

    var _stats = _container.getElementsByClassName("__pokemon-data")[0];
    _stats.getElementsByClassName("PokeName")[0].innerHTML = pokemon.name;
    _stats.getElementsByClassName("PokeCP_unit")[0].innerHTML = "CP";
    _stats.getElementsByClassName("PokeCP_value")[0].innerHTML = pokemon.cp;

    var _gl = _container.getElementsByClassName("__gl-data")[0];
    SetPvPData(_gl, pokemon, "great");

    var _ul = _container.getElementsByClassName("__ul-data")[0];
    SetPvPData(_ul, pokemon, "ultra");

    var _ml = _container.getElementsByClassName("__ml-data")[0];
    SetPvPData(_ml, pokemon, "master");
}