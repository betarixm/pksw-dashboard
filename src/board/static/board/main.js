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
    result.innerHTML = `<img src="https://math.vercel.app/?from=${encodeURIComponent(tile.latex)}">`;
    return result;
}

const createTiles = (target, tileList) => {
    tileList.forEach((e) => {
        if (e) {
            target.appendChild(createTile(e));
        }

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
    eleTiles.className = "tileList";
    createTiles(eleTiles, tiles);

    target.appendChild(eleTitle);
    target.appendChild(eleTiles);
}

const drawTeams = async (target) => {
    queryTeams().then((res) => {
        target.innerHTML = "";
        res.forEach((team) => {
            const name = team.name;
            const score = team.score;

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
            eleWrapper.className = "team box";

            let eleTitleBar = document.createElement("div");
            eleTitleBar.className = "titleBar";

            let eleTitle = document.createElement("h1");
            eleTitle.innerHTML = name;
            eleTitle.className = "title";

            let eleScore = document.createElement("div");
            eleScore.innerHTML = score
            eleScore.className = "score";

            eleTitleBar.appendChild(eleTitle);
            eleTitleBar.appendChild(eleScore);

            let eleNotAlloc = document.createElement("div");
            eleNotAlloc.className = "tilesWrapper";

            drawSubTiles(eleNotAlloc, "얻은 타일", notAllocTiles);

            let eleAlloc = document.createElement("div");
            eleAlloc.className = "tilesWrapper";

            drawSubTiles(eleAlloc, "배치한 수식", allocTiles);

            eleWrapper.appendChild(eleTitleBar);
            eleWrapper.appendChild(eleNotAlloc);
            eleWrapper.appendChild(eleAlloc);
            target.appendChild(eleWrapper);
        })
    })
}

const draw = () => {
    let deck = document.getElementById("deck");
    let teams = document.getElementById("teams");

    drawDeck(deck).then();
    drawTeams(teams).then();
}


document.body.onload = () => {
    setInterval(() => {
        draw();
    }, 1500);
}
