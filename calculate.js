//CONTEXTUAL DATA:
//var basestats
//var levelchart
//var pvpdata
//var family

//INPUT DATA
var id = parseInt(document.getElementById("_ChosenPokemon").value);
var cp = parseInt(document.getElementById("_Cp").value);
var atkIV = parseInt(document.getElementById("_Atk").value);
var defIV = parseInt(document.getElementById("_Def").value);
var hpIV = parseInt(document.getElementById("_Hp").value);
var isBuddy = document.getElementById("_Buddy").checked;
var isLucky = document.getElementById("_Lucky").checked;
var isPurified = document.getElementById("_Purified").checked;

//GENERAL DATA
var level = GetLevel(cp,
    atkIV + parseInt(basestats[id][3]),
    defIV + parseInt(basestats[id][4]),
    hpIV + parseInt(basestats[id][2]));

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
        this.title = "Level "+level+" "+this.name+" (#"+this.pokedex+")";

        //PVP STATS
        var glStats = _pvpdata[atkIV][defIV][hpIV].slice(0, 3);
        this.glLevel = glStats[0];
        this.glRank = glStats[1];
        this.glPerc = glStats[2];
        this.glValid = level <= this.glLevel
        var ulStats = _pvpdata[atkIV][defIV][hpIV].slice(3, 6);
        this.ulLevel = ulStats[0]
        this.ulRank = ulStats[1];
        this.ulPerc = ulStats[2];
        this.ulValid = level <= this.ulLevel
        var mlStats = _pvpdata[atkIV][defIV][hpIV].slice(6, 9);
        this.mlLevel = mlStats[0]
        this.mlRank = mlStats[1];
        this.mlPerc = mlStats[2];
        this.mlValid = level <= this.mlLevel

        //CALCULATIONS
        this.glCp = GetCp(this.atk, this.def, this.hp, this.glLevel);
        this.glStardust = GetStardust(level, this.glLevel);
        this.glCandy = GetCandy(level, this.glLevel);

        this.ulCp = GetCp(this.atk, this.def, this.hp, this.ulLevel);
        this.ulStardust = GetStardust(level, this.ulLevel);
        this.ulCandy = GetCandy(level, this.ulLevel);

        this.mlCp = GetCp(this.atk, this.def, this.hp, this.mlLevel);
        this.mlStardust = GetStardust(level, this.mlLevel);
        this.mlCandy = GetCandy(level, this.mlLevel);
    }

    PrintStats(){
        console.log("Pokemon:", this.name)
        console.log("Pokedex Entry:", this.pokedex);
        console.log("Pokemon ID:", this.id);
        console.log("Level: ", level);
        console.log("CP:", this.cp);
        console.log("Attack:", this.atk)
        console.log("Defense:", this.def);
        console.log("HP:", this.hp);
    }
    PrintPvPStats()
    {
        console.log(this.glValid, this.glLevel, this.glRank, this.glPerc);
        console.log(this.ulValid, this.ulLevel, this.ulRank, this.ulPerc);
        console.log(this.mlValid, this.mlLevel, this.mlRank, this.mlPerc);
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
    var cost = powerups[j][1] - powerups[i][1]
    return cost;
}

//OUTPUT
var outputContainer = document.getElementById("output-container")
var template = document.getElementById("_pokemon-container-template");

for (var i = 0; i < family.length; i++)
{
    var pokemon = new Pokemon(family[i], pvpdata[i]);
    pokemon.PrintStats();
    pokemon.PrintPvPStats();
    console.log("");

    var clone = template.content.cloneNode(true);
    outputContainer.appendChild(clone);


    var _container = document.getElementsByClassName("_pokemon-container")[i];

    var _stats = _container.getElementsByClassName("__pokemon-data")[0];
    _stats.getElementsByClassName("PokeName")[0].innerHTML = pokemon.name;
    _stats.getElementsByClassName("PokeCP")[0].innerHTML = "CP: "+pokemon.cp;

    var _gl = _container.getElementsByClassName("__gl-data")[0];
    _gl.getElementsByClassName("PokePerc")[0].innerHTML = pokemon.glPerc+"%";
    _gl.getElementsByClassName("PokeRank")[0].innerHTML = "#"+pokemon.glRank;
    _gl.getElementsByClassName("PokeStardust")[0].innerHTML = pokemon.glStardust+" Stardust";
    _gl.getElementsByClassName("PokeCandy")[0].innerHTML = pokemon.glCandy+" Candy";

    var _ul = _container.getElementsByClassName("__ul-data")[0];
    _ul.getElementsByClassName("PokePerc")[0].innerHTML = pokemon.ulPerc+"%";
    _ul.getElementsByClassName("PokeRank")[0].innerHTML = "#"+pokemon.ulRank;
    _ul.getElementsByClassName("PokeStardust")[0].innerHTML = pokemon.ulStardust+" Stardust";
    _ul.getElementsByClassName("PokeCandy")[0].innerHTML = pokemon.ulCandy+" Candy";

    var _ml = _container.getElementsByClassName("__ml-data")[0];
    _ml.getElementsByClassName("PokePerc")[0].innerHTML = pokemon.mlPerc+"%";
    _ml.getElementsByClassName("PokeRank")[0].innerHTML = "#"+pokemon.mlRank;
    _ml.getElementsByClassName("PokeStardust")[0].innerHTML = pokemon.mlStardust+" Stardust";
    _ml.getElementsByClassName("PokeCandy")[0].innerHTML = pokemon.mlCandy+" Candy";
}