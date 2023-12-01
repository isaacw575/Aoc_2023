// The elves calibration document is jumbled
// in each line the calibration value you need to
// get is the first number appended to the last number
// ex: a1b2c3d should yeild 13
// Those with only 1 number should be that number repeated
// ex: treb7uchet should yield 77
// find the sum of all the calibration values

import { read, readFileSync} from "node:fs";

const integers = "0123456789";
const ints = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const intsWritten = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const intPairsWritten = ["twone", "sevenine", "oneight", "threeight", "nineight", "fiveight", "eighthree", "eightwo"];
const intPairs = ["21", "79", "18", "38", "98", "58", "83", "82"];

function question1() {
  let input = readFile();
  getCalibrationValues(input);
}

function question2() {
  let input = readFile();
  input = cleanInput(input);
  getCalibrationValues(input);
  
}

function readFile() {
  return readFileSync("day01.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n");
}

function getNumbersFromString(myString) {
  return [...myString].reduce((acc, cur) => ((integers.includes(cur)) ? acc + cur : acc), "");
}

function cleanInput(input){
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

function getCalibrationValues(inputString) {
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