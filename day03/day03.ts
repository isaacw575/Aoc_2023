import { type } from "os";

const file = Bun.file("day03.txt");
const inputString = await file.text();
const schematic = inputString.split("\n");

const anySymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const noDotRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
const numberRegex = /[0-9]/;

function question1() {
    let partNumberArray = getPartNumberList();
    sumPartNumbers(partNumberArray);
}
function question2() {
    getTotalGearRatios();
}

function getTotalGearRatios(){
    let total = 0;
    let currentIteration = 0;
    for (let line of schematic) {
        let currentLineIndex = 0;
        while (currentLineIndex < line.length) {
            if (line[currentLineIndex] === "*") {
                total += getGearRatio(currentLineIndex, line, currentIteration);
            }
            currentLineIndex++;
        }
    currentIteration++;
    }
    console.log(total)
}

function getGearRatio(currentLineIndex, line, currentLine) {
    // Check above
    let array = [];
    let tempString = "";
    if (currentLine > 0){
        // Check top left
        if (currentLineIndex > 0){
            if (numberRegex.test(schematic[currentLine - 1][currentLineIndex - 1])){
                tempString = getNumberTraverseLeft(currentLineIndex - 1, currentLine - 1, tempString);
                
            }
        }
        // Check top Middle
        if (numberRegex.test(schematic[currentLine - 1][currentLineIndex])) {
            tempString += schematic[currentLine - 1][currentLineIndex];
        }
        else {
            if (tempString !== "") {
                array.push(tempString);
                tempString = "";
            }
        }
        // Check top right
        if (currentLineIndex < line.length - 1)
        {
            if (numberRegex.test(schematic[currentLine - 1][currentLineIndex + 1])) {
                tempString = getNumberTraverseRight(currentLineIndex + 1, currentLine - 1, tempString);
                if (tempString !== "") {
                    array.push(tempString);
                }
            }
            else if (tempString !== "") {
                array.push(tempString);
            }
        }
    }
    // Check Left
    tempString = "";
    if (currentLineIndex > 0){
        if (numberRegex.test(schematic[currentLine][currentLineIndex - 1])){
            let numResultLeft = getNumberTraverseLeft(currentLineIndex - 1, currentLine, tempString);
            if (numResultLeft !== ""){
                tempString = numResultLeft;
                array.push(numResultLeft);
            }
        }
    }
    // Check Right
    tempString = "";
    if (currentLineIndex < line.length - 1) {
        if (numberRegex.test(schematic[currentLine][currentLineIndex + 1])) {
            tempString = "";
            let numResultRight = getNumberTraverseRight(currentLineIndex + 1, currentLine, tempString);
            if (numResultRight !== ""){
                tempString = numResultRight
                array.push(numResultRight);
            }
        }
    }

    if (currentLine < schematic.length - 1) {
        // Check bottom left
        tempString = "";
        if (currentLineIndex > 0) {
            if (numberRegex.test(schematic[currentLine + 1][currentLineIndex - 1])){
                tempString = getNumberTraverseLeft(currentLineIndex - 1, currentLine + 1, tempString);
                
            }
        }
        // Check bottom Middle
        if (numberRegex.test(schematic[currentLine + 1][currentLineIndex])) {
            tempString += schematic[currentLine + 1][currentLineIndex];

        }
        // handle case of two valid numbers in one row
        else {
            if (tempString !== "") {
                array.push(tempString);
                tempString = "";
            }
        }
        // Check bottom right
        if (currentLineIndex < line.length - 1){
            if (numberRegex.test(schematic[currentLine + 1][currentLineIndex + 1])) {
                tempString = getNumberTraverseRight(currentLineIndex + 1, currentLine + 1, tempString);
                if (tempString !== "") {
                    array.push(tempString);
                }
            }
            else if (tempString !== "") {
                array.push(tempString);
            }
        }
    }
    if (array.length === 2) {
        let part1 = Number(array[0]);
        let part2 = Number(array[1]);
        return (part1*part2);
    }
    return 0;
}

function getNumberTraverseLeft(index, line, numberString) {
    let tempString = numberString;
    for (index; index >= 0; index--) {
        if (numberRegex.test(schematic[line][index])) {
            // if index is a number, add to string, increment
            tempString += schematic[line][index];
        }
        else {
            break;
        }
    }
    return tempString.split("").reduce((acc, char) => char + acc, "");
}

function getNumberTraverseRight(index, line, numberString) {
    let tempString = numberString;
    for (index; index < schematic[line].length; index ++) {
        if (numberRegex.test(schematic[line][index])) {
            tempString += schematic[line][index];
        }
        else{
            break;
        }
    }
    return tempString;
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

question1();
question2();