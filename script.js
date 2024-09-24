const screen = document.querySelector(".screen");

let troll = 0;
let result = 0; 
let countLP = 0;
let countRP = 0;
let lastChar = screen.value.slice(-1);

function backspace() {

    if (troll || result) {
        screen.value = "";
        troll = 0;
        result = 0;
    }

    let removedChar = screen.value.slice(-1);

    screen.value = screen.value.slice(0, -1);

    if (removedChar === ')') {
        countRP -= 1;
    } else if (removedChar === '(') {
        countLP -= 1;
    }
    
    lastChar = screen.value.slice(-1);
}

function getLastNumber(expression) {
    const numbers = expression.split(/[\+\-\*\/]/);
    return numbers[numbers.length - 1]; 
}

const operators = ['+','-','*','/'];
const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
const forbiddenFromFirst = ['/','*',')'];

function isLastCharNum() {
    if (numbers.includes(lastChar)) {
        return 1;
    } else {
        return 0;
    }
}

function isLastCharOperator() {
    if (operators.includes(lastChar)) {
        return 1;
    } else {
        return 0;
    }
}

function showDisplay(input) {

    lastChar = screen.value.slice(-1);

    if (troll || result) {
        screen.value = "";
        troll = 0;
        result = 0;
    }

    if (input === '.') {
        const lastNumber = getLastNumber(screen.value);
        if (lastNumber.includes('.')) {
            return; 
        }
    }

    if (screen.value.length === 0 && forbiddenFromFirst.includes(input)) {
        return;
    }

    if (operators.includes(input) && isLastCharOperator()) {
        return;
    }

    if (input === '(') {
        if (isLastCharNum()) {
            return;
        }
        countLP += 1
    }

    if (input === ')') {
        if (countLP === 0) {
            return;
        }
        countRP += 1
    }

    if (numbers.includes(input) && lastChar === ')') {
        return;
    }

    screen.value += input;
}

function wipe() {
    screen.value = "";
    troll = 0;
    result = 0; 
    countLP = 0;
    countRP = 0;
}

function calculate() {
    try{
        if (screen.value.trim() === "") {
            screen.value = "Enter an expression"; 
            return;
        }
        if (countLP === countRP) {
            screen.value = eval(screen.value);
            result = 1;
            countLP = 0;
            countRP = 0;
        } else {
            screen.value = "Close all parenthesis"
            troll = 1;
            countLP = 0;
            countRP = 0;
        }
    }catch(e) {
        screen.value = "Quit Trolling";
        troll = 1;
        countLP = 0;
        countRP = 0;
    }
}