let numberButtons = Array.from(document.querySelectorAll(".numbers"));
let operatorButtons = Array.from(document.querySelectorAll(".operators"));
let screen = document.querySelector("#screen");
let inputNumbers = [];
let intermediateAnswer = 0;
let xString = "";


document.addEventListener('keydown', function(event) {
    let key = event.key;
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    let operators = ["+", "-", "/", "*"];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === key) {
            buildxString(key);
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
        buildxString(this.textContent);
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
    let history = inputNumbers.join("");
    console.log(inputNumbers);
    let finalAnswer = solve(inputNumbers);
    screen.textContent = history + " = " + finalAnswer;
    inputNumbers = [];
}

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function() {
    xString = "";
    screen.textContent = "";
    operator = "";
    inputNumbers = [];
    intermediateAnswer = 0;
});

let backSpaceButton = document.querySelector('#delete');
backSpaceButton.addEventListener('click', backspace);

function backspace() {
    if (xString !== "" || inputNumbers.length > 0) {
        if (xString.length > 0) {
            xString = xString.slice(0, -1);
        } else {
            inputNumbers.pop();
            let lastElement = inputNumbers[inputNumbers.length - 1];
            if (!isNaN(lastElement)) {
                xString = inputNumbers.pop().toString();
            }
        }
        console.log("xString = " + xString);
        console.log(inputNumbers);
        screen.textContent = inputNumbers.join("") + xString;
    }
}

// functions
function pushString(operator) {
    if (xString === "") {
        buildxString(operator);
    } else if (!isNaN(xString)) {
        console.log("xString pushed= " + xString);
        inputNumbers.push(Number(xString));
        inputNumbers.push(operator);
        xString = "";
    } else {
        buildxString(operator)
    }
    console.log("current xString: " + xString);
    screen.textContent = inputNumbers.join("") + xString;
    console.log(inputNumbers);
}

function buildxString(input) {
    xString += input;
    console.log("current xString: " + xString);
    screen.textContent = inputNumbers.join("") + xString;
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
    inputNumbers = [];
    intermediateAnswer = 0;
}

function operate(operator, x, y) {
    if (operator === "+") {
        return x + y
    } else if (operator === "*") {
        return x * y
    } else if (operator === "/") {
        return x / y
    } else if (operator === "-") {
        return x - y
    }
}
// --functions