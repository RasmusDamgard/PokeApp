//CONTEXTUAL DATA:
//var basestats
//var levelchart
//var pvpdata
//var family

//INPUT DATA
var id = parseInt(document.getElementById("pokemon_chosen").value);
var cp = parseInt(document.getElementById("cp").value);
var atkIV = parseInt(document.getElementById("atk").value);
var defIV = parseInt(document.getElementById("def").value);
var hpIV = parseInt(document.getElementById("hp").value);
var isBuddy = document.getElementById("buddy").checked;
var isLucky = document.getElementById("lucky").checked;
var isPurified = document.getElementById("purified").checked;

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
        this.glCandy = 0; //TODO:
    }

    PrintStats(){
        console.log("Pokemon:", this.name)
        console.log("Pokemon ID:", this.id);
        console.log("Pokedex Entry:", this.pokedex);
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

for (i = 0; i < family.length; i++)
{
    console.log("");
    pokemon = new Pokemon(family[i], pvpdata[i]);
    pokemon.PrintStats();
    pokemon.PrintPvPStats();
}

//TODO: Fix
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

function GetStardust (){
    return 0; //TODO
}

//OUTPUT VALUES

/*
var title = "Level "+level+" "+name+" (#"+pokedex+")";
console.log(title);
console.log("Evolutions: " + evolutions);
console.log("Pokemon ID: " + pokemonID);
console.log("Pokedex Entry: " + pokedex);
console.log("Basestats: " + statline);
console.log("CP:" + cp);
console.log("Attack IV: " + atkIV);
console.log("Defense IV: " + defIV);
console.log("HP IV: " + hpIV);
console.log("Attack: " + atk)
console.log("Defense: " + def);
console.log("HP: " + hp);

console.log("Gl Level: " + glLevel + "    " + glLevelEvo);
console.log("GL#: " + glRank + "    " + glRankEvo);
console.log("GL%: " + glPerc + "    " + glPercEvo);
console.log("Ul Level: " + ulLevel + "    " + ulLevelEvo);
console.log("UL#: " + ulRank + "    " + ulRankEvo);
console.log("UL%: " + ulPerc + "    " + ulPercEvo);
console.log("Ml Level: " + mlLevel + "    " + mlLevelEvo);
console.log("ML#: " + mlRank + "    " + mlRankEvo);
console.log("ML%: " + mlPerc + "    " + mlPercEvo);
console.log("");
*/