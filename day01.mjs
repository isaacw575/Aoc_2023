// The elves calibration document is jumbled
// in each line the calibration value you need to
// get is the first number appended to the last number
// ex: a1b2c3d should yeild 13
// Those with only 1 number should be that number repeated
// ex: treb7uchet should yield 77
// find the sum of all the calibration values

import { read, readFileSync} from "node:fs";

//take array of strings and reduce it to just numbers
const integers = "0123456789";
const integersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const stringIntegers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function readFile() {
  return readFileSync("day01.txt", { encoding: "utf-8" })
  .trim()
}

function splitInput(input) {
  return input.split("\n");
}
function getNumbersFromString(myString) {
  return [...myString].reduce((acc, cur) => ((integers.includes(cur)) ? acc + cur : acc), "");
}

function cleanInput(input){
  for (let i = 0; i < 10; i++) {
    input = input.replaceAll(stringIntegers[i], integersArray[i]);
  }
  console.log(input);
}

function question1() {
  let input = readFile();
  input = splitInput(input);
  let total = 0;
  for (let value of input) {
    let numbers = getNumbersFromString(value);
    let tempString = numbers.charAt(0) + numbers.charAt(numbers.length - 1);
    total += parseInt(tempString);
  }
  console.log(total);
}

function question2() {
  let input = readFile();
  cleanInput(input);
  

}

//take the first and last numbers and append them



// question1();
question2();