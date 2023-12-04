const file = Bun.file("day04.txt");
const inputString = await file.text();
const card = inputString.split("\n");

const numberRegex = /[0-9]/;

function question1() {
    const arrayOfCards = getArrayOfCards();
    AssignScorecardValues(arrayOfCards);
    console.log(arrayOfCards);
    let total = arrayOfCards.reduce((acc, card) => acc + card.power, 0);
    console.log(total);

}

function getArrayOfCards() {
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

function getCardRow(cardNumber: number, winningNumbers: number[], myNumbers: number[]) {
    return {
        cardNumber,
        winningNumbers,
        myNumbers,
        power: 0
    };
}

question1();