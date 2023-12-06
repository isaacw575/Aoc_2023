const file = Bun.file("day05.txt");
const inputString = await file.text();
let almanacInput = inputString.split("\n\n");

function question1() {
    let seedsArray = almanacInput[0].substring(7).split(" ");
    // console.log(seedsArray);
    const almanac = almanacInput.slice(1).map(seedMap => seedMap.split("\n").splice(1));
    // console.log(almanac);
    let locationResultsArray: number[] = [];

    for (let seed of seedsArray.map(seed => parseInt(seed))) {
        for (let map of almanac) {
            let shouldExit = false;

            // console.log(map)
            // console.log("^^^^^^^^^^^^^^^   MAP   ^^^^^^^^^^^^^^^^^^")
            let line = map.map(line => line.split(" ").map(index => parseInt(index)));
            // console.log(line)
            // console.log("^^^^^^^^^^^^^^^   LINE   ^^^^^^^^^^^^^^^^^^")
            for (let index of line) {
                let result = mapSeed(index, seed);
                seed = result.seed;
                shouldExit = result.successFlag
                // console.log(index)
                // console.log(seed)
                if (shouldExit) {
                    break;
                }
            }
        }
        
        locationResultsArray.push(seed);
    }
    locationResultsArray.sort((a, b) => a - b)
    console.log(locationResultsArray[0])
}

function mapSeed(index: number[], seed: number) {
    let rangeStart = index[1];
    let rangeEnd = index[1] + index[2];
    let modifier = index[0] - index[1];
    let successFlag = false;
    
    // console.log("RANGE START: " + rangeStart);
    // console.log("RANGE END: " + rangeEnd);
    // console.log("MODIFIER: " + modifier);

    if (rangeStart <= seed && rangeEnd >= seed){
        successFlag = true;
        seed += modifier;
    }
    
    return {seed, successFlag};
}

question1();