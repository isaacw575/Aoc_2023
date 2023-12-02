const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

const file = Bun.file("day02.txt");
const text = await file.text();
const input = text.split("\n");
const games = input.map(function(line) {
    return gameFactory(line.replaceAll(" ", ""));
})

function question1(){
    let total = 0
    for (let game of games) {
        if (game.isPossible()) {
            total += game.getId();
        }
    }
    console.log(total);
}

function question2() {
    let total = 0;
    for (let game of games) {
        total += ((Math.max(...game.rounds.reds))*(Math.max(...game.rounds.greens))*(Math.max(...game.rounds.blues)));
    }
    console.log(total);
}

function gameFactory(game: string)
{
    return {
        rounds: getCubes(game.substring((Number(game.search(":") + 1)), game.length).split(";")),
        getId() {
            game = game.replace("Game", "");
            let colonIndex = game.search(":");
            return Number(game.substring(0, colonIndex));
        },
        isPossible() {
            if (this.rounds.reds.some((roll) => roll > RED_MAX) || this.rounds.greens.some((roll) => roll > GREEN_MAX) || this.rounds.blues.some((roll) => roll > BLUE_MAX))
            {
                return false;
            }
            return true;
        }
    }
}

function getCubes(rounds: string[]) {
    let reds = [];
    let greens = [];
    let blues = [];

    for (let round of rounds) {
        let rolls = round.split(",")
        for (let roll of rolls) {
            if (roll.includes("red")) {
                reds.push(Number(roll.replace("red", "")));
            }
            if (roll.includes("green")) {
                greens.push(Number(roll.replace("green", "")));
            }
            if (roll.includes("blue")) {
                blues.push(Number(roll.replace("blue", "")));
            }
        }
    }
    return {reds, greens, blues};
}

question1();
question2();