let numberButtons = Array.from(document.querySelectorAll(".numbers"));
let operatorButtons = Array.from(document.querySelectorAll(".operators"));
let screen = document.querySelector("#screen");
let inputNumbers = [];
let intermediateAnswer = 0;
let xString = "";
let history = "";


document.addEventListener('keydown', function(event) {
    let key = event.key;
    console.log(key);
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    let operators = ["+", "-", "/", "*"];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === key) {
            buildString(key);
        }
    }
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === key) {
            pushString(key);
        }
    }
    if (key === "Backspace") {
        backspace();
    }
    if (key === "Enter") {
        finalize();
    }
});

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
        buildString(this.textContent);
    });
}


for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
        pushString(this.textContent);
    });
}


let equals = document.querySelector('#equals');
equals.addEventListener('click', function() {
    finalize();
});

function finalize() {
    inputNumbers.push(Number(xString));
    console.log(inputNumbers);
    let finalAnswer = solve(inputNumbers);
    screen.textContent = history + " = " + finalAnswer;
    history = "";
}

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function() {
    xString = "";
    screen.textContent = "";
    history = "";
    operator = "";
    inputNumbers = [];
    intermediateAnswer = 0;
});

let backSpaceButton = document.querySelector('#delete');
backSpaceButton.addEventListener('click', backspace);

function backspace() {
    if (xString === "") {
        if (inputNumbers.length > 0) {
            inputNumbers.pop();
            console.log("last element: " + inputNumbers[inputNumbers.length - 1]);
            console.log(typeof(inputNumbers[inputNumbers.length - 1]));
            xString = inputNumbers[inputNumbers.length - 1].toString();
            inputNumbers.pop();
            console.log("xString = " + xString);
        }
    } else {
        xString = xString.slice(0, -1);
        console.log("xString = " + xString);
    }
    history = history.slice(0, -1);
    screen.textContent = history;
    console.log(inputNumbers);
}

// functions
function pushString(operator) {
    if (xString === "") {
        if (operator == "-") {
            xString += "-"
        } else if (operator == "+") {
            xString = "";
        } else {
            alert("you done fucked up");
            clear();
        }
    } else {
        inputNumbers.push(Number(xString));
        inputNumbers.push(operator);
        xString = "";
    }
    history += operator;
    screen.textContent = history;
    console.log(inputNumbers);
}

function buildString(numberString) {
    history += numberString;
    xString += numberString;
    screen.textContent += numberString;
    console.log(inputNumbers);
}

function solve(arr) {
    if (arr.length === 1) {
        return arr[0];
    } else {
        let j = -1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "*" || arr[i] === "/") {
                j = i;
                break;
            }
        }
        if (j > -1) {
            updateArray(arr, j)
            return solve(arr);
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "+" || arr[i] === "-") {
                    j = i;
                    break;
                }
            }
            if (j > -1) {
                updateArray(arr, j)
                return solve(arr);
            }
        }
    }
}

function updateArray(arr, j) {
    intermediateAnswer = operate(arr[j], arr[j - 1], arr[j + 1])
    arr.splice(j - 1, 3, intermediateAnswer);
    console.log(arr);
}

function clear() {
    xString = "";
    screen.textContent = "";
    history = "";
    operator = "";
    inputNumbers = [];
    intermediateAnswer = 0;
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    if (operator === "+") {
        return add(x, y);
    } else if (operator === "*") {
        return multiply(x, y);
    } else if (operator === "/") {
        return divide(x, y);
    } else if (operator === "-") {
        return subtract(x, y);
    }
}

// --functions