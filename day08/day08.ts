const file = Bun.file("day08.txt");
const text = await file.text();
let textArray = text.split("\n");
let networkMappingInstruction = textArray[0]
let networkMap = new Map<string, string[]>();
for (let line of textArray.slice(2)){
    networkMap.set(line.substring(0, 3), [line.substring(7, 10), line.substring(12, 15)])
}

function question1() {
    let total = getMapTraversalDistance();
    console.log(total);
}

function getMapTraversalDistance(): number {
    let key = "AAA"
    let instructionsIndex = 0;
    let count = 0;
    while (key !== "ZZZ") {
        let newKey = ""
        count++;
        if (instructionsIndex === networkMappingInstruction.length) {
            instructionsIndex = 0;
        }
        if (networkMappingInstruction[instructionsIndex] == "R") {
            let newKeyArray = networkMap.get(key);
            newKey = newKeyArray[1];
    
        }
        else if (networkMappingInstruction[instructionsIndex] === "L") {
            let newKeyArray = networkMap.get(key);
            newKey = newKeyArray[0];
        }
    
        key = newKey;
        instructionsIndex++;
    }
    return count;
}

question1();

// ~~~~~~~~~~~~~~~~~~~ Part 2 ~~~~~~~~~~~~~~~~~~~
// Start with every node that ends with A
// traverse as normal but all simultaneously
// if every node ends with Z end.

function question2() {
    const resultLCM = findLCM(getMapTraversalDistanceForGhosts());
    console.log(resultLCM)
}

function getMapTraversalDistanceForGhosts(): number[] {
    let startArray = getStartingSet();
    let multiples: number[] = [];

    startArray.forEach((key) => {
        let instructionsIndex = 0;
        let count = 0;

        while (!checkIfEndsInZ(key)) {
            let newKey = ""
            count++;
            if (instructionsIndex === networkMappingInstruction.length) {
                instructionsIndex = 0;
            }
            if (networkMappingInstruction[instructionsIndex] == "R") {
                let newKeyArray = networkMap.get(key);
                newKey = newKeyArray[1];
        
            }
            else if (networkMappingInstruction[instructionsIndex] === "L") {
                let newKeyArray = networkMap.get(key);
                newKey = newKeyArray[0];
            }
        
            key = newKey;
            instructionsIndex++;
        }
        multiples.push(count);
    })
    return multiples;
}

function getStartingSet(): string[] {
    let startingKeys: string[] = [];
    for (let key of networkMap.keys()) {
        if (key.charAt(2) === "A") {
            startingKeys.push(key);
        }
    }
    return startingKeys;
}

function checkIfEndsInZ(keyString: string): boolean {
    if (keyString.charAt(2) === "Z") {
        return true;
    }
    return false;
}

// Finds the Greatest Common Divisor (GCD) of two numbers
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Finds the LCM of two numbers
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Finds the LCM of an array of numbers
function findLCM(numbers) {
    if (numbers.length < 2) {
        throw new Error("At least two numbers are required to find LCM.");
    }

    let result = numbers[0];
    
    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }

    return result;
}


question2();