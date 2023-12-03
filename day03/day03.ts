const file = Bun.file("day03.txt");
const inputString = await file.text();
const schematic = inputString.split("\n");

const anySymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const noDotRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
const numberRegex = /[0-9]/;

function question2() {
    let partNumberArray = getPartNumberList();
    sumPartNumbers(partNumberArray);
}

function getPartNumberList() {
    let arr = [];
    let currentIteration = 0;
    for (let line of schematic) {
        let currentLineIndex = 0;
        while (currentLineIndex < line.length) {
            if (anySymbolRegex.test(line[currentLineIndex])) {
                currentLineIndex++;
                continue;
            }
            else if (numberRegex.test(line[currentLineIndex])) {
                let tempString = getFullNumber(line, currentLineIndex);
                let endIndex = currentLineIndex + tempString.length;
                arr.push(partNumberFactory(Number(tempString), currentLineIndex, endIndex - 1, currentIteration, line.length))
                currentLineIndex = endIndex;
            }
        }
        currentIteration++;
    }
    return arr;
}

function getFullNumber(line, currentIndex) {
    let tempString = line[currentIndex];
    currentIndex++;
    for (currentIndex; currentIndex < line.length; currentIndex++) {
        if (numberRegex.test(line[currentIndex])) {
            tempString += line[currentIndex];
        }
        else {
            break;
        }
    }
    return tempString;
}

function partNumberFactory(value, startIndex, endIndex, line, lineLength) {
    return {
        value,
        startIndex,
        endIndex,
        line,
        lineLength
    };
}

function sumPartNumbers(partNumberArray) {
    let total = 0;
    for (let part of partNumberArray) {
        console.log(part);
        if (isPartNumberValid(part)) {
            total += parseInt(part.value);
        }
    }
    console.log(total);
}

function isPartNumberValid(part) {
    let leftIndex = 0;
    let rightIndex = 0;

    if (part.startIndex === 0) {
        leftIndex = part.startIndex;
    }
    else leftIndex = part.startIndex -1;

    if (part.endIndex === part.lineLength - 1) {
        rightIndex = part.endIndex;
    }
    else rightIndex = part.endIndex + 1;

    if (part.line > 0) {
        if (noDotRegex.test(schematic[part.line - 1].substring(leftIndex, rightIndex + 1))) {
            return true;
        }
    }
     if (part.line < schematic.length - 1) {
        if (noDotRegex.test(schematic[part.line + 1].substring(leftIndex, rightIndex + 1))) {
            return true;
        }
    }
    if (noDotRegex.test(schematic[part.line][leftIndex])) {
        return true;
    }
    if (noDotRegex.test(schematic[part.line][rightIndex])) {
        return true;
    }
    return false;
}

question2();