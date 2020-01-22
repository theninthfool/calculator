let buttons = Array.from(document.querySelectorAll(".button"));
let screen = document.querySelector("#screen");
let inputNumbers = [];
let intermediateAnswer = 0;
let previousLength = 0;
let xString = "";
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
let operators = ["+", "-", "/", "*", "(", ")"];

document.addEventListener('keyup', function(event) {
    let key = event.key
    buttons.forEach(button => {
        if (button.textContent === key) {
            button.classList.remove("pressed");
        }
    });
})

document.addEventListener('keydown', function(event) {
    let key = event.key;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === key) {
            buttons[i].classList.add("pressed");
        }
    }
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

let numberButtons = Array.from(document.querySelectorAll(".numbers"));
for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
        buildxString(this.textContent);
    });
}

let operatorButtons = Array.from(document.querySelectorAll(".operators"));
for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
        pushString(this.textContent);
    });
}

let equals = document.querySelector('#equals');
equals.addEventListener('click', finalize);

let clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clear);

let backSpaceButton = document.querySelector('#delete');
backSpaceButton.addEventListener('click', backspace);


// functions
function finalize() {
    console.log("xString pushed= " + xString);
    if (xString !== "") {
        inputNumbers.push(Number(xString));
        xString = "";
    }
    console.log(inputNumbers);
    screen.textContent = inputNumbers.join("") + " = " + solve(inputNumbers);
    xString = "";
    inputNumbers = [];
}

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

function pushString(operator) {
    if (!isNaN(xString) && xString !== "") {
        inputNumbers.push(Number(xString));
        console.log("xString pushed= " + xString);
        // inputNumbers.push(operator);
        xString = "";
    }
    inputNumbers.push(operator);

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
    console.log(arr);
    if (arr.includes(NaN)) {
        return "NaN Error"
    }

    if ((arr[0] === "-" || arr[0] === "+") && !isNaN(arr[1])) {
        if (arr[0] === "-") {
            arr[1] = -arr[1];
        }
        arr.shift();
    }

    if (arr.length === 1) {
        if (isNaN(arr[0])) {
            return "Weird Error"
        } else {
            return arr[0];
        }
    } else if (arr.length === 2) {
        return "Error";
    } else {
        let closingParenIndex = arr.indexOf(")");
        if (closingParenIndex > -1) {
            solveParenthesis(arr, closingParenIndex);
            return solve(arr);
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "*" || arr[i] === "/") {
                    updateArray(arr, i);
                    return solve(arr);
                }
            }
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] === "+" || arr[i] === "-") {
                    updateArray(arr, i);
                    return solve(arr);
                }
            }
        }
    }
}

function solveParenthesis(arr, index) {
    let openingParenIndex = 0;
    for (let i = index; i >= 0; i--) {
        if (arr[i] === "(") {
            openingParenIndex = i;
            break;
        }
    }
    let newArr = arr.slice(openingParenIndex + 1, index);
    let partialAnswer = solve(newArr);
    arr.splice(openingParenIndex, index - openingParenIndex + 1, partialAnswer);
}

function updateArray(arr, j) {
    intermediateAnswer = operate(arr[j], arr[j - 1], arr[j + 1])
    arr.splice(j - 1, 3, intermediateAnswer);
}

function clear() {
    xString = "";
    screen.textContent = "";
    inputNumbers = [];
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