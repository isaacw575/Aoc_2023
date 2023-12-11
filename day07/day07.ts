import { type } from "os";

const fiveOfAKindRegex = /(.)\1{4}/;
const fourOfAKindRegex = /^(.*?)(\S).*\2.*\2.*\2.*$/;
const threeOfAKindRegex = /^(.*?)(\S).*\2.*\2.*$/;

const cardValuesString = "23456789TJQKA";

const file = Bun.file("day07.txt")
const text = await file.text();
let hands = text.split("\n");

function question1() {
    let handObjectsArray: Hand[] = hands.map((entry) => handFactory(entry));
    let insertionArray: Hand[] = [...handObjectsArray];
    insertionArray = insertionSort(insertionArray);
    let total = 0;
    for (let i = 0; i < insertionArray.length; i++) {
        total += (i + 1)*parseInt(insertionArray[i].bet)
    }
    console.log(total);
}

type Hand = {
    hand: string,
    bet: string,
    strength: number
}

function handFactory(lineItem: string): Hand {
    return {
        hand: lineItem.substring(0, lineItem.indexOf(" ")),
        bet: lineItem.substring(lineItem.indexOf(" ") + 1, lineItem.length),
        strength: getStrength(lineItem.substring(0, lineItem.indexOf(" ")))
    }
}

function getStrength(hand: string) {
    if (fiveOfAKindRegex.test(hand)) {
        return 7;
    }
    else if (fourOfAKindRegex.test(hand)) {
        return 6;
    }
    else if (isFullHouse(hand.split(""))) {
        return 5;
    }
    else if (threeOfAKindRegex.test(hand)) {
        return 4;
    }

    const result = [...hand].reduce((acc, chr) => { 
        acc[chr] = (acc[chr] || 0) + 1;
        return acc;
    }, {});

    let count = 0;
    for (let key in result) {
        if (result[key] === 2) {
            count++;
        }
        if (count === 2){
        return 3;
        }
    }
    if (count === 1) {
        return 2;
    }
    return 1;
}

function isFullHouse(hand: string[]) {
    const cardCounts = {};

    // Count the occurrences of each card value in the hand
    hand.forEach(card => {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
    });

    // Check for a full house
    let hasThree = false;
    let hasTwo = false;

    for (const count of Object.values(cardCounts)) {
        if (count === 3) {
        hasThree = true;
        } else if (count === 2) {
        hasTwo = true;
        }
    }

    return hasThree && hasTwo;
}

function insertionSort(arr: Hand[]) {
    for (let i = 1; i < arr.length; i++) {
        let currentHand = arr[i];
        let j = i - 1;
        while (j >= 0 && (arr[j].strength > currentHand.strength || (arr[j].strength === currentHand.strength && settleTie(arr[j], currentHand) === 1))) {
          arr[j + 1] = arr[j];
          j--;
        }
    
        arr[j + 1] = currentHand;
      }
    
      return arr;
}

function settleTie(hand1: Hand, hand2: Hand) {
    for (let i = 0; i < hand1.hand.length; i++){
        if (hand1.hand[i] !== hand2.hand[i]) {
            return cardValuesString.indexOf(hand1.hand[i]) <  cardValuesString.indexOf(hand2.hand[i]) ? 0 : 
                1;
        }
    }
}

question1();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ PART 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~
// JJJJJ(5)
// JJJJA(5)
// JJJAA(5) or JJJAK(4)
// JJAAA(5) or JJAAK(4) or JJAKQ(3)
// JAAAA(5) or JAAAK(4) JAAKK(FH) JAAKQ(3) JAKQT(OP)

const allSameRegex = /^(\S)\1*$/;
const atLeastOneRepeatedRegex = /(.).*\1/;
const checkIfThreeRepeatedRegex = /(.)(.*\1){2}/;
const allUniqueRegex = /^(?!.*(.).*\1).*$/
const cardValuesStringWithJokers = "J23456789TQKA";

function question2() {
    let handObjectsArray: Hand[] = hands.map((entry) => handFactoryWithJokers(entry));
    let insertionArray: Hand[] = [...handObjectsArray];
    insertionArray = insertionSortWithJokers(insertionArray);
    let total = 0;
    for (let i = 0; i < insertionArray.length; i++) {
        total += (i + 1)*parseInt(insertionArray[i].bet)
    }
    console.log(total);
}

function handFactoryWithJokers(lineItem: string): Hand {
    return {
        hand: lineItem.substring(0, lineItem.indexOf(" ")),
        bet: lineItem.substring(lineItem.indexOf(" ") + 1, lineItem.length),
        strength: getStrengthWithJokers(lineItem.substring(0, lineItem.indexOf(" ")))
    }
}

function getStrengthWithJokers(hand: string) {
    let jokerCount = (hand.match(/J/g) || []).length;

    // No jokers, defualt method instead
    if (jokerCount === 0) {
        return getStrength(hand);
    }

    // 5 of a kind
    if (jokerCount >= 4) {
        return 7;
    }
    if (jokerCount === 3){
        let temp = hand.replaceAll("J", "");
        //4 of a kind if non joker cards are not equal, else 5 of a kind
        if (temp[0] !== temp[1]) {
            return 6;
        }
        return 7;
    }
    if (jokerCount === 2) {
        let temp = hand.replaceAll("J", "");
        // 5 of a kind if all non jokers are the same
        if (allSameRegex.test(temp)) {
            return 7;
        }
        // 4 of a kind if there's another pair
        else if (atLeastOneRepeatedRegex.test(temp)) {
            return 6;
        }
        // Else all the non joker cards are different, and it's 3 of a kind
        return 4;
    }

    if(jokerCount === 1){
        let temp = hand.replaceAll("J", "");
        // 5 of a kind if all non jokers are the same
        if (allSameRegex.test(temp)) {
            return 7;
        }
        // 4 of a kind if 3 non jokers are the same
        else if (checkIfThreeRepeatedRegex.test(temp)) {
            return 6;
        }
        else if (atLeastOneRepeatedRegex.test(temp)) {
            // Break remaining string into key value pairs
            let eachChar = [...temp].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {});
            // If there's only two keys, then there's a joker and a two pair, which is a full house
            if (Object.keys(eachChar).length === 2) {
                return 5;
            }
            // If there's 3 keys, then it's a 3 of a Kind
            if(Object.keys(eachChar).length == 3) {
                return 4;
            }
        }
        // If all non jokers are unique it's a pair
        else if (allUniqueRegex.test(temp)) {
            return 2;
        }
    }
}

function insertionSortWithJokers(arr: Hand[]) {
    for (let i = 1; i < arr.length; i++) {
        let currentHand = arr[i];
        let j = i - 1;
        while (j >= 0 && (arr[j].strength > currentHand.strength || (arr[j].strength === currentHand.strength && settleTieWithJokers(arr[j], currentHand) === 1))) {
          arr[j + 1] = arr[j];
          j--;
        }
    
        arr[j + 1] = currentHand;
      }
      return arr;
}

function settleTieWithJokers(hand1: Hand, hand2: Hand) {
    for (let i = 0; i < hand1.hand.length; i++){
        if (hand1.hand[i] !== hand2.hand[i]) {
            return cardValuesStringWithJokers.indexOf(hand1.hand[i]) <  cardValuesStringWithJokers.indexOf(hand2.hand[i]) ? 0 : 1;
        }
    }
}

question2();