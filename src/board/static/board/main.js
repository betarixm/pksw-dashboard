const queryTeams = async () => {
    return new Promise((resolve) => {
        fetch(`/api/team/team`).then((res) => {
            return res.json();
        }).then((res) => {
            resolve(res);
        })
    })
}

const queryTeamByName = async (name) => {
    return new Promise((resolve) => {
        fetch(`/api/team/team?name=${name}`).then((res) => {
            return res.json();
        }).then((res) => {
            resolve(res);
        })
    })
}

const queryTile = async (deck, team, is_allocated) => {
    return new Promise((resolve) => {
        fetch(`/api/game/tile?deck=${deck}&team=${team}&is_allocated=${is_allocated}`).then((res) => {
            return res.json();
        }).then((res) => {
            resolve(res);
        })
    })
}

const createTile = (tile) => {
    let result = document.createElement("div");
    result.className = "tile"
    result.innerHTML = `$${tile.latex}$`;
    return result;
}

const createTiles = (target, tileList) => {
    tileList.forEach((e) => {
       target.appendChild(createTile(e));
    });
}

const drawDeck = async (target) => {
    queryTile(true, "", true).then((res) => {
        target.innerHTML = "";
        createTiles(target, res);
    });
}

const drawSubTiles = async (target, title, tiles) => {
    let eleTitle = document.createElement("h2");
    eleTitle.innerHTML = title;

    let eleTiles = document.createElement("div");
    createTiles(eleTiles, tiles);

    target.appendChild(eleTitle);
    target.appendChild(eleTiles);
}

const drawTeams = async (target) => {
    queryTeams().then((res) => {
        target.innerHTML = "";
        res.forEach((team) => {
            const name = team.name;

            const notAllocTiles = team.slot.filter(s => {
                return s.is_allocated === false;
            }).map((s) => {
                return s.tile;
            })

            const allocTiles = team.slot.filter(s => {
                return s.is_allocated === true;
            }).map((s) => {
                return s.tile;
            })

            let eleWrapper = document.createElement("div");

            let eleTitle = document.createElement("h1");
            eleTitle.innerHTML = name;


            let eleNotAlloc = document.createElement("div");
            drawSubTiles(eleNotAlloc, "아직", notAllocTiles);

            let eleAlloc = document.createElement("div");
            drawSubTiles(eleAlloc, "썼음", allocTiles);

            eleWrapper.appendChild(eleTitle);
            eleWrapper.appendChild(eleNotAlloc);
            eleWrapper.appendChild(eleAlloc);
            target.appendChild(eleWrapper);
        })
    })
}

const draw = () => {
    let deck = document.getElementById("deck");
    let team = document.getElementById("team");

    drawDeck(deck).then();
    drawTeams(team).then();
}


document.body.onload = () => {
    setInterval(() => {
        draw();
    }, 500);
}
