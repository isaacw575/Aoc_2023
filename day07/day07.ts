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