const integers = "0123456789";
const ints = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const intsWritten = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const intPairsWritten = ["twone", "sevenine", "oneight", "threeight", "nineight", "fiveight", "eighthree", "eightwo"];
const intPairs = ["21", "79", "18", "38", "98", "58", "83", "82"];

const file = Bun.file("day01.txt");
const text = await file.text();
const fileInput = text.replace(/\r/g, "")
  .trim()
  .split("\n");  

function question1() {
  getCalibrationValues(fileInput);
}

function question2() {
  let cleanedInput = cleanInput(fileInput);
  getCalibrationValues(cleanedInput);
  
}

function getNumbersFromString(myString: string) {
  return [...myString].reduce((acc, cur) => ((integers.includes(cur)) ? acc + cur : acc), "");
}

function cleanInput(input: string[]){
  let arr = [];
  for (let line of input) {
    let tempLine = line;
    for (let i = 0; i < intPairsWritten.length; i++) {
      tempLine = tempLine.replaceAll(intPairsWritten[i], intPairs[i]);
    }
    
    for (let i = 0; i < intsWritten.length; i++) {
      tempLine = tempLine.replaceAll(intsWritten[i], ints[i]);
    }
    arr.push(tempLine);
  }
  return arr;
}

function getCalibrationValues(inputString: string[]) {
  let total = 0;
  for (let value of inputString) {
    let numbers = getNumbersFromString(value);
    let tempString = numbers.charAt(0) + numbers.charAt(numbers.length - 1);
    total += parseInt(tempString);
  }
  console.log(total);
}

question1();
question2();