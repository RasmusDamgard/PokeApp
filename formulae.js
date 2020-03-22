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
    constructor(_id, _pvpdata) {
        this.id = _id

        //CORE STATS
        var statline = basestats[_id];
        this.pokedex = statline[0];
        this.name = statline[1];
        this.hp = parseInt(document.getElementById("_Hp").value); + parseInt(statline[2]);
        this.atk = parseInt(document.getElementById("_Atk").value); + parseInt(statline[3]);
        this.def = parseInt(document.getElementById("_Def").value); + parseInt(statline[4]);
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
            great: new PvPStats(glLevel, glRank, glPerc, glCp),
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