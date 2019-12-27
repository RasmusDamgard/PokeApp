//CONTEXTUAL DATA:
//var basestats
//var levelchart
//var ivspread

/*
//INPUT & POKEMON DATA
var pvpdata = ivspread[0];
console.log(ivspread.slice());
console.log(pvpdata);
var pokemonID = parseInt(document.getElementById("pokemon_chosen").value);
var cp = parseInt(document.getElementById("cp").value);
var atkIV = parseInt(document.getElementById("atk").value);
var defIV = parseInt(document.getElementById("def").value);
var hpIV = parseInt(document.getElementById("hp").value);
var isBuddy = document.getElementById("buddy").checked;
var isLucky = document.getElementById("lucky").checked;
var isPurified = document.getElementById("purified").checked;
var pokemon = basestats[pokemonID];
var family = pokemon.slice(5,pokemon.length);
var pokedex = pokemon[0];
var name = pokemon[1];
var hp = hpIV + parseInt(pokemon[2]);
var atk = atkIV + parseInt(pokemon[3]);
var def = defIV + parseInt(pokemon[4]);
var level = GetLevel(atk, def, hp, cp)

//SPREADSHEET DATA
var glStats = pvpdata[atkIV][defIV][hpIV].slice(0, 3);
var glLevel = glStats[0];
var glRank = glStats[1];
var glPerc = glStats[2];
var ulStats = pvpdata[atkIV][defIV][hpIV].slice(3, 6);
var ulLevel = ulStats[0]
var ulRank = ulStats[1];
var ulPerc = ulStats[2];
var mlStats = pvpdata[atkIV][defIV][hpIV].slice(6, 9);
var mlLevel = ulStats[0]
var mlRank = ulStats[1];
var mlPerc = ulStats[2];

//CALCULATIONS

var glCp = GetCp(atk, def, hp, glLevel)
var glStardust = 15500 //TODO:
var glCandy = 35 //TODO:



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
    var cp = (atk*Math.sqrt(def)*Math.sqrt(hp)*Math.pow(cpm,2)/10)
    return cp;
}


//OUTPUT VALUES
var title = "Level "+level+" "+name+" (#"+pokedex+")";

//OUTPUT
console.log(pvpdata);

console.log(title)
console.log(family)
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
*/