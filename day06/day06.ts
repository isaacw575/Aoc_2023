const file = Bun.file("day06.txt");
const inputString = await file.text();
let leaderboard = inputString.split("\n");
let leaderboardArray = leaderboard.map((line) => line
    // Remove everything but whitespace and numbers, then reduce down all multiple occurences of whitespace
    .replace(/[^0-9\s]+|\s+/g, ' ')
    .trim()
    .split(" "));
let inputArray: number[][] = [];
// Group into [time, distance] arrays
for (let i = 0; i < leaderboardArray[0].length; i++) {
    inputArray.push([parseInt(leaderboardArray[0][i]), parseInt(leaderboardArray[1][i])])
}

function question1() {
    let marginOfErrArray = [];
    // For each race, caluclate how many ways there are to win
    for (const [time, minimumDistance] of inputArray) {
        marginOfErrArray.push(getWaysToWin(time, minimumDistance));
    }
    // Find the total margin of error by multiplying all ways to win
    let total = marginOfErrArray.reduce((acc, margin) => acc * margin);
    console.log(total)
}

function getWaysToWin(time: number, minimumDistance: number): number {
    let waysToWin = 0;
        // For every time interval
        for (let i = 0; i <= time; i++) {
            // Calculate how long you have remaining after button press
            let postPressMs = time - i;
            // Find the speed
            let speed = i;
            // Distance = speed * time
            let distance = speed * postPressMs;
            // If we go far enough, ways to win +1
            if (distance > minimumDistance) {
                waysToWin++;
            }
        }
    return waysToWin;
}

question1();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PART 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function question2() {
    let buildTimeString: string = "";
    let buildDistanceString: string = "";
    // Concat all times and all distances
    for (let [time, distance] of inputArray) {
        buildTimeString += time;
        buildDistanceString += distance;
    }
    // Convert to numbers and calculate how many ways to win
    let time = parseInt(buildTimeString);
    let minimumDistance = parseInt(buildDistanceString);
    console.log(getWaysToWin(time, minimumDistance));
}

question2();