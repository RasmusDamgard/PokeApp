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

class PvPStats {
    constructor(_level, _rank, _perc, _cp) {
        this.level = _level;
        this.rank = _rank;
        this.perc = _perc;
        this.cp = _cp
        this.stardust = GetStardust(level, this.level);
        this.candy = GetCandy(level, this.level);
        this.isValid = level <= this.level;
    }
}

class Pokemon {
    constructor(_id, _pvpdata, _level) {
        this.id = _id

        //CORE STATS
        var statline = basestats[_id];
        this.pokedex = statline[0];
        this.name = statline[1];
        this.level = _level;
        this.hp = parseInt(document.getElementById("_Hp").value) + parseInt(statline[2]);
        this.atk = parseInt(document.getElementById("_Atk").value) + parseInt(statline[3]);
        this.def = parseInt(document.getElementById("_Def").value) + parseInt(statline[4]);
        this.cp = GetCp(this.atk, this.def, this.hp, this.level);

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
            great: new PvPStats(glLevel, glRank, glPerc, glCp),
            ultra: new PvPStats(ulLevel, ulRank, ulPerc, ulCp),
            master: new PvPStats(mlLevel, mlRank, mlPerc, mlCp)
        };
    }

    PrintStats(){
        console.log("Pokemon:", this.name)
        console.log("Pokedex Entry:", this.pokedex);
        console.log("Pokemon ID:", this.id);
        console.log("Level:", this.level);
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