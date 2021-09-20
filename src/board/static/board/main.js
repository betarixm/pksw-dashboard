class Tile {
    constructor(id, title, latex) {
        this.id = id;
        this.title = title;
        this.latex = latex;
    }

    createElement() {
        let element = document.createElement("div");
        let img = document.createElement("img");

        element.id = this.id;
        element.className = "tile";

        img.src = `https://math.vercel.app/?from=${encodeURIComponent(this.latex)}`;

        element.appendChild(img);

        return element;
    }

    getElement() {
        return document.getElementById(this.id);
    }
}

class Expression {
    constructor(id, title, completed, tileList) {
        this.id = id;
        this.title = title;
        this.tileList = tileList;
        this.completed = completed;
    }

    createElement() {
        let wrapper = document.createElement("div");
        let title = document.createElement("h2");
        let list = document.createElement("div");

        wrapper.id = this.id;
        wrapper.className = "completed";

        title.innerText = this.title;

        list.className = "tileList";

        this.tileList.forEach((e) => {
            list.appendChild(e.createElement());
        })

        wrapper.appendChild(title);
        wrapper.appendChild(list);

        return wrapper;
    }

    updateElement(tileList) {
        const parent = document.getElementById(this.id).querySelector(".tileList");

        this.tileList.filter((tile) => {
            return !tileList.map(e => e.id).includes(tile.id);
        }).forEach((r) => {
            console.log(r);
            document.getElementById(this.id).querySelector(`#${r.id}`).remove();
        })

        let prev = null;

        tileList.forEach((tile) => {
            let e = tile.getElement();
            if (e === null) {
                e = tile.createElement();
            }

            if (prev === null) {
                parent.prepend(e);
            } else {
                prev.after(e);
            }

            prev = e;
        });

        this.tileList = tileList;
    }
}

class Hands {
    constructor(id, tileList) {
        this.id = id;
        this.tileList = tileList;
    }

    createElement() {
        let wrapper = document.createElement("div");
        let title = document.createElement("h2");
        let list = document.createElement("div");

        wrapper.id = this.id + "-hands";

        title.innerText = "얻은 타일";

        list.className = "tileList";

        this.tileList.forEach((e) => {
            let c = e.createElement();
            list.appendChild(c);
        })

        wrapper.appendChild(title);
        wrapper.appendChild(list);

        return wrapper;
    }

    updateElement(tileList) {
        const parent = document.getElementById(this.id + "-hands").querySelector(".tileList");

        this.tileList.filter((tile) => {
            return !tileList.map(e => e.id).includes(tile.id);
        }).forEach((r) => {
            document.getElementById(this.id + "-hands").querySelector(`#${r.id}`).remove();
        })

        tileList.filter((tile) => {
            return !this.tileList.map(e => e.id).includes(tile.id);
        }).forEach((r) => {
            parent.appendChild(r.createElement());
        })

        this.tileList = tileList;
    }

    async parse() {
        return new Promise((resolve, reject) => {
            fetch(`/api/game/hand?id=${this.id}`).then((res) => {
                return res.json();
            }).then((res) => {
                const tileList = res.map((e) => {
                    return new Tile(e.id, e.title, e.latex);
                });

                this.updateElement(tileList);
            });
        });
    }
}

class Deck {
    constructor(tileList) {
        this.id = Math.random().toString(16).slice(2);
        this.tileList = tileList;
    }

    createElement() {
        let wrapper = document.createElement("div");
        let title = document.createElement("h1");
        let list = document.createElement("div");

        wrapper.id = "deckHolder"; //this.id;
        wrapper.className = "box";

        title.innerText = "남은 타일";

        list.className = "tileList";

        this.tileList.forEach((e) => {
            let c = e.createElement();
            list.appendChild(c);
        });

        wrapper.appendChild(title);
        wrapper.appendChild(list);

        return wrapper;
    }

    updateElement(tileList) {
        const parent = document.getElementById(this.id).querySelector(".tileList");

        this.tileList.filter((tile) => {
            return !tileList.map(e => e.id).includes(tile.id);
        }).forEach((r) => {
            document.getElementById(this.id).querySelector(`#${r.id}`).remove();
        })

        tileList.filter((tile) => {
            return !this.tileList.map(e => e.id).includes(tile.id);
        }).forEach((r) => {
            parent.appendChild(r.createElement());
        })

        this.tileList = tileList;
    }

    async parse() {
        return new Promise((resolve, reject) => {
            fetch(`/api/game/deck`).then((res) => {
                return res.json();
            }).then((res) => {
                const tileList = res.map((e) => {
                    return new Tile(e.id, e.title, e.latex);
                });

                this.updateElement(tileList);
            });
        });
    }
}


class Team {
    constructor(id, name, score, hands, expressions) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.hands = hands;
        this.expressions = expressions;
    }

    createElement() {
        let wrapper = document.createElement("div");
        let titleBar = document.createElement("div");
        let title = document.createElement("h1");
        let score = document.createElement("div");
        let completed = document.createElement("div");

        wrapper.id = this.id;

        wrapper.className = "team box";
        titleBar.className = "titleBar";
        title.className = "title";
        score.className = "score";
        completed.className = "completedList";

        title.innerText = this.name;
        score.innerText = this.score;

        this.expressions.filter(e => e.completed).forEach((e) => {
            completed.appendChild(e.createElement());
        });

        titleBar.appendChild(title);
        titleBar.appendChild(score);

        wrapper.appendChild(titleBar);
        wrapper.appendChild(this.hands.createElement());

        this.expressions.filter(e => !e.completed).forEach((e) => {
            wrapper.appendChild(e.createElement());
        })

        wrapper.appendChild(completed);

        return wrapper;
    }

    parse() {
        fetch(`/api/team/team?id=${this.id}`).then((res) => {
            return res.json();
        }).then((res) => {
            res = res[0];

            document.getElementById(this.id).querySelector(".score").innerText = res.score;

            const parent = document.getElementById(this.id);

            const expressions = res.expression.map((exp) => {
                return new Expression(exp.id, exp.title, exp.is_completed, exp.slot.map(s => {
                    return new Tile(s.tile.id, s.tile.title, s.tile.latex);
                }))
            });


            this.expressions.filter((exp) => {
                return !expressions.map(e => e.id).includes(exp.id);
            }).forEach((r) => {
                document.getElementById(this.id).querySelector(`#${r.id}`).remove();
            });

            expressions.filter((exp) => {
                return !this.expressions.map(e => e.id).includes(exp.id);
            }).forEach((r) => {
                parent.appendChild(r.createElement());
            });

            this.expressions.filter((exp) => {
                return expressions.map(e => e.id).includes(exp.id);
            }).forEach((r) => {
                r.updateElement(expressions.filter(e => e.id === r.id)[0].tileList);
            });

            this.expressions = expressions;

        }).then((res) => {
            this.hands.parse();
        });
    }
}

setInterval(() => {
    fetch(`/api/team/team`).then((res) => {
        return res.json();
    }).then((res) => {
        const teamList = res.map((team) => {
            const hands = new Hands(team.id, team.hands.map(e => {
                return new Tile(e.id, e.title, e.latex);
            }))

            const expressions = team.expression.map((exp) => {
                return new Expression(exp.id, exp.title, exp.is_completed, exp.slot.map(s => {
                    return new Tile(s.tile.id, s.tile.title, s.tile.latex);
                }))
            })

            return new Team(team.id, team.name, team.score, hands, expressions);
        });

        teamList.forEach((t) => {
            if (document.getElementById(t.id) === null) {
                document.getElementById("teamsHolder").appendChild(t.createElement());
            } else {
                document.getElementById(t.id).replaceWith(t.createElement());
            }
        });
    });
}, 1000);

setInterval(() => {
    fetch(`/api/game/deck`).then((res) => {
        return res.json();
    }).then((res) => {
        const deck = new Deck(res.map((tile) => {
            return new Tile(tile.id, tile.title, tile.latex);
        }))

        let target = document.getElementById("deckHolder");
        target.replaceWith(deck.createElement());

    })
}, 1000);
