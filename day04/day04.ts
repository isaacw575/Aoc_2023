const file = Bun.file("day04.txt");
const inputString = await file.text();
const card = inputString.split("\n");

const numberRegex = /[0-9]/;

function question1() {
    const arrayOfCards = getArrayOfCards(card);
    AssignScorecardValues(arrayOfCards);
    console.log(arrayOfCards);
    let total = arrayOfCards.reduce((acc, card) => acc + card.power, 0);
    console.log(total);

}

function getArrayOfCards(card) {
    let cardRowsArray = [];
    for (let row of card) {
        let cardNumber: number = 0;
        let winningNumbers: number[] = [];
        let myNumbers: number[] = [];
        let rowData = (row.replace(/ +(?= )/g, "").split(" "));
        let winningNumbersPassedFlag = false;
        for (let item of rowData) {
            if (item.includes(":")) {
                item = item.replace(":", "");
                cardNumber = Number(item);
                continue;
            }
            if (item === "|") {
                winningNumbersPassedFlag = true;
                continue;
            }
    
            if (numberRegex.test(item)) {
                if (!winningNumbersPassedFlag) {
                    winningNumbers.push(Number(item));
                }
                else {
                    myNumbers.push(Number(item));
                }
            }
    
        }
        cardRowsArray.push(getCardRow(cardNumber, winningNumbers, myNumbers));
    }
    return cardRowsArray;
}

function AssignScorecardValues(cardRowsArray) {
    let currentIteration2 = 0
    for (let myCardRow of cardRowsArray) {
        for (let num of myCardRow.winningNumbers) {
            if (myCardRow.myNumbers.some(r => myCardRow.myNumbers.includes(num))) {
                if (myCardRow.power === 0) {
                    myCardRow.power = 1;
                }
                else {
                    myCardRow.power = myCardRow.power * 2;
                }
            }
        }
        
        currentIteration2++;
    }
}

type Card = {
    cardNumber: number;
    winningNumbers: number[];
    myNumbers: number[];
    power: number;
}

function getCardRow(cardNumber: number, winningNumbers: number[], myNumbers: number[]) {
    return {
        cardNumber,
        winningNumbers,
        myNumbers,
        power: 0
    };
}

//  question1();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PART 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const arrayOfCards = getArrayOfCards(card);

function question2() {
    let total = tallyScratchCards(arrayOfCards);
    console.log(total)
}

function tallyScratchCards(scratchCards: Card[]) {
    return scratchCards.reduce((acc: number, card: Card) => {
        acc++;
        if (getWinners(card) === 0) {
            return acc;
        }

        let numberOfMatches = getWinners(card);
        acc += tallyScratchCards(arrayOfCards.slice(card.cardNumber, card.cardNumber + numberOfMatches));
        return acc;
    }, 0);
}

function getWinners(card: Card) {
    return card.winningNumbers.reduce((acc, winningNumber) => {
        if (card.myNumbers.includes(winningNumber)) {
            acc++;
        }
        return acc;
    }, 0);
}

question2();