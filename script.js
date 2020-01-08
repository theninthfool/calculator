let numberButtons = Array.from(document.querySelectorAll(".numbers"));
let operatorButtons = Array.from(document.querySelectorAll(".operators"));
let screen = document.querySelector("#screen");
let inputNumbers = [];
let intermediateAnswer = 0;
let xString = "";
let history = "";



for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
        history += this.textContent;
        xString += this.textContent;
        screen.textContent += this.textContent;
    });
}

for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
        if (xString === "") {
            if (this.textContent == "-") {
                xString += "-"
            } else if (this.textContent == "+") {
                xString = "";
            } else {
                alert("you done fucked up");
                clear();
            }
        } else {
            console.log(xString);
            inputNumbers.push(Number(xString));
            inputNumbers.push(this.textContent);
            xString = "";
        }
        history += this.textContent;
        screen.textContent = history;
    });
}

let equals = document.querySelector('#equals');
equals.addEventListener('click', function() {
    inputNumbers.push(Number(xString));
    console.log(inputNumbers);
    let finalAnswer = solve(inputNumbers);
    screen.textContent = history + " = " + finalAnswer;
    console.log(finalAnswer);
    history = "";
});

// let subtraction = document.querySelector('#subtract');
// subtraction.addEventListener('click', function() {
//     screen.textContent += this.textContent;
//     history += this.textContent;
//     if (xString !== "") {
//         inputNumbers.push(Number(xString));
//     }
//     inputNumbers.push("-");
//     xString = "";
// });

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function() {
    xString = "";
    screen.textContent = "";
    history = "";
    operator = "";
    inputNumbers = [];
    intermediateAnswer = 0;
});

// functions
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