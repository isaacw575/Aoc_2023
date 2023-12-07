const file = Bun.file("day05.txt");
const inputString = await file.text();
let almanacInput = inputString.split("\n\n");

function question1() {
    let seedsArray = almanacInput[0].substring(7).split(" ").map(Number);
    let result = getLocations(seedsArray);
    console.log(result[0])
}

function mapSeed(index: number[], seed: number) {
    let rangeStart = index[1];
    let rangeEnd = index[1] + index[2];
    let modifier = index[0] - index[1];
    let successFlag = false;
    if (rangeStart <= seed && rangeEnd >= seed){
        successFlag = true;
        seed += modifier;
    }
    
    return {seed, successFlag};
}

function getLocations(seedArray: number[]) {
    const almanac = almanacInput.slice(1).map(seedMap => seedMap.split("\n").splice(1));
    let locationResultsArray: number[] = [];
    for (let seed of seedArray) {
        for (let map of almanac) {
            let shouldExit = false;
            let line = map.map(line => line.split(" ").map(index => parseInt(index)));
            for (let index of line) {
                let result = mapSeed(index, seed);
                seed = result.seed;
                shouldExit = result.successFlag;
                if (shouldExit) {
                    break;
                }
            }
        }
        locationResultsArray.push(seed);
    }
    locationResultsArray.sort((a, b) => a - b)
    return locationResultsArray;
}

question1();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PART 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function question2() {
    // Get seeds
    let seedsArray = almanacInput[0].substring(7).split(" ").map(Number);
    let seedRangesArray: number[][] = [];
    // Group seeds into [seedRangeStart, length]
    for (let i = 0; i < seedsArray.length - 1; i += 2) {
        seedRangesArray.push([seedsArray[i], seedsArray[i + 1]])
    }
    // Truncate Seed index of array and reverse it for backwards traversal
    let almanac = almanacInput.slice(1).map(seedMap => seedMap.split("\n").splice(1));
    almanac = almanac.reverse();
    // Iterate up to highest value possible. Oof magic numbers :(
    for (let i = 0; i < 4218056486 + 23868437; i++) {
        // Get the seed for the location("i")
        const seed = getSeed(i, almanac);
        // If the seed is within one of our seed ranges, return it
        if (seedExists(seed, seedRangesArray)) {
            console.log("Part 2 result: " + i);
            break;
        }
    }
    
}

function getSeed(step: number, almanac: string[][]): number {
    
    for (const almanacLine of almanac) {
        const almanacLineArray = almanacLine.map((line) => line.split(" "));
        // Map our potential smallest location to its corresponding seed
        for (const [destination, source, length] of almanacLineArray) {
            let d = parseInt(destination);
            let s = parseInt(source);
            let l = parseInt(length);
            if (d <= step && d + l > step) {
                step = s + step - d;
                break;
            }
        }
    }
    return step;
}

function seedExists(seed: number, seedArray: number[][]): boolean {
    if (seedArray.some(([seedStart, length]) => seedStart <= seed && seedStart + length >= seed)) {
        return true;
    }
    return false;
}

question2();