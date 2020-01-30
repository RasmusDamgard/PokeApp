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

class PvPStats {
    constructor(_level, _rank, _perc, _cp){
        this.level = _level;
        this.rank = _rank;
        this.perc = _perc;
        this.cp = _cp
        this.stardust = GetStardust(level, this.level);
        this.candy = GetCandy(level, this.level);
        this.isValid = level <= this.level;
    }
}

//POKEMON SPECIFIC DATA
class Pokemon {
    constructor(_id, _pvpdata) {
        //POKEMON STATS
        var statline = basestats[_id];
        this.id = _id
        this.pokedex = statline[0];
        this.name = statline[1];
        this.hp = hpIV + parseInt(statline[2]);
        this.atk = atkIV + parseInt(statline[3]);
        this.def = defIV + parseInt(statline[4]);
        this.cp = GetCp(this.atk, this.def, this.hp, level);

        //PVP STATS
        var glStats = _pvpdata[atkIV][defIV][hpIV].slice(0, 3);
        var glLevel = glStats[0];
        var glRank = glStats[1];
        var glPerc = glStats[2];
        var glCp = GetCp(this.atk, this.def, this.hp, glLevel);

        var ulStats = _pvpdata[atkIV][defIV][hpIV].slice(3, 6);
        var ulLevel = ulStats[0]
        var ulRank = ulStats[1];
        var ulPerc = ulStats[2];
        var ulCp = GetCp(this.atk, this.def, this.hp, ulLevel);

        var mlStats = _pvpdata[atkIV][defIV][hpIV].slice(6, 9);
        var mlLevel = mlStats[0]
        var mlRank = mlStats[1];
        var mlPerc = mlStats[2];
        var mlCp = GetCp(this.atk, this.def, this.hp, mlLevel);

        this.pvp = {
            "great": new PvPStats(glLevel, glRank, glPerc, glCp),
            ultra: new PvPStats(ulLevel, ulRank, ulPerc, ulCp),
            master: new PvPStats(mlLevel, mlRank, mlPerc, mlCp)
        };
    }

    PrintStats(){
        console.log("Pokemon:", this.name)
        console.log("Pokedex Entry:", this.pokedex);
        console.log("Pokemon ID:", this.id);
        console.log("Level:", level);
        console.log("CP:", this.cp);
        console.log("Attack:", this.atk)
        console.log("Defense:", this.def);
        console.log("HP:", this.hp);
    }
    PrintPvPStats()
    {
        console.log("PvP:", this.pvp);
    }
}

//FUNCTIONS
function GetLevel (cp, atk, def, hp) {
    var cpm = Math.sqrt((cp*10)/(atk*Math.sqrt(def)*Math.sqrt(hp)));
    var min = 0;
    for (i = 0; i < levelchart.length; i++) {
        var curDiff = Math.abs(cpm - levelchart[i][1]);
        var minDiff = Math.abs(cpm - levelchart[min][1]);
        if (curDiff < minDiff) {
            min = i;
        }
    }
    var level = levelchart[min][0];
    return level;
}

function GetCp (atk, def, hp, level) {
    var index = Math.round((level-1)*2);
    var cpm = levelchart[index][1];
    var cp = Math.floor(atk*Math.sqrt(def)*Math.sqrt(hp)*Math.pow(cpm,2)/10)
    return cp;
}

function GetStardust (fromLevel, toLevel){
    var i = Math.round((fromLevel-1)*2);
    var j = Math.round((toLevel-1)*2);
    if (j>78) {j=78}
    var cost = (powerups[j][0] - powerups[i][0])
    if (isLucky && isPurified) {
        cost = cost*0.45;
    }
    else if (isLucky) {
        cost = cost*0.5;
    }
    else if (isPurified) {
        cost = cost*0.9
    }
    return cost;
}
function GetCandy (fromLevel, toLevel){
    var i = Math.round((fromLevel-1)*2);
    var j =  Math.round((toLevel-1)*2);
    if (j>78) {j=78}
    var cost = powerups[j][1] - powerups[i][1]
    return cost;
}

//OUTPUT
var outputContainer = document.getElementById("output-container")
var template = document.getElementById("_pokemon-container-template");

function SetPvPData (container, pokemon, league) {
    if (pokemon.pvp[league].isValid) {
        container.getElementsByClassName("PokePerc")[0].innerHTML = pokemon.pvp[league].perc+"%";
        container.getElementsByClassName("PokeRank")[0].innerHTML = "#"+pokemon.pvp[league].rank;
        container.getElementsByClassName("PokeStardust")[0].innerHTML = pokemon.pvp[league].stardust+" Stardust";
        container.getElementsByClassName("PokeCandy")[0].innerHTML = pokemon.pvp[league].candy+" Candy";
        container.getElementsByClassName("PokeLevel")[0].innerHTML = "Level "+pokemon.pvp[league].level
    }
    else {
        container.getElementsByClassName("PokeValid")[0].innerHTML = "Not Eligible";
        if (league == "great") {container.style.backgroundColor = "red";}
        else {container.style.backgroundColor = "darkred";}
    }
}

for (var i = 0; i < family.length; i++)
{
    var pokemon = new Pokemon(family[i], pvpdata[i]);
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
    _stats.getElementsByClassName("PokeCP")[0].innerHTML = "CP: "+pokemon.cp;

    var _gl = _container.getElementsByClassName("__gl-data")[0];
    SetPvPData(_gl, pokemon, "great");

    var _ul = _container.getElementsByClassName("__ul-data")[0];
    SetPvPData(_ul, pokemon, "ultra");

    var _ml = _container.getElementsByClassName("__ml-data")[0];
    SetPvPData(_ml, pokemon, "master");
}