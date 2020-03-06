let screen = document.querySelector("#screen");
let inputNumbers = [];
let xString = "";
init();

function init() {
    addListeners();
}


function addListeners() {
    let buttons = document.querySelector("#buttons");
    buttons.addEventListener('click', e => {
        let id = e.target.getAttribute('id');
        checkInput(id);
    });
    document.addEventListener('keydown', e => {
        let key = e.key;
        if (key === "Enter") key = '=';
        checkInput(key);
        keyPressed(key);
    });
}

function keyPressed(id) {
    let element = document.getElementById(id);
    if (element) {
        element.classList.add('pressed');
        document.addEventListener('keyup', () => {
            element.classList.remove("pressed");
        });
    }
}

function checkInput(input) {
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    let operators = ["+", "-", "/", "*", "(", ")"];
    if (numbers.includes(input)) buildxString(input);
    if (operators.includes(input)) pushString(input);
    if (input === "Backspace") backspace();
    if (input === "=") finalize();
    if (input === 'clear') clear();
}

function finalize() {
    if (xString !== "") inputNumbers.push(Number(xString));
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
            if (!isNaN(lastElement)) xString = inputNumbers.pop().toString();
        }
        screen.textContent = inputNumbers.join("") + xString;
    }
}

function pushString(operator) {
    if (!isNaN(xString) && xString !== "") inputNumbers.push(Number(xString));

    xString = "";
    inputNumbers.push(operator);
    screen.textContent = inputNumbers.join("") + xString;
}

function buildxString(input) {
    xString += input;
    screen.textContent = inputNumbers.join("") + xString;
}

function solve(arr) {
    if (arr.includes(NaN)) return "NaN Error";

    if ((arr[0] === "-" || arr[0] === "+") && !isNaN(arr[1])) {
        if (arr[0] === "-") return solve([-arr[1]].concat(arr.slice(2)));
        return solve(arr.slice(1));
    }

    if (arr.length === 1) {
        if (isNaN(arr[0])) return "Weird Error";
        return arr[0];
    } else if (arr.length === 2) {
        return "Two Error";
    } else {
        if (arr.indexOf(")") > -1) {
            return solve(solveParenthesis(arr, arr.indexOf(")")));
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === "*" || arr[i] === "/") {
                    return solve(updateArray(arr, i));
                }
            }
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] === "+" || arr[i] === "-") {
                    return solve(updateArray(arr, i));
                }
            }
        }
    }
}

function solveParenthesis(arr, index) {
    for (let i = index; i >= 0; i--) {
        if (arr[i] === "(") {
            let answer = solve(arr.slice(i + 1, index));
            return arr.slice(0, i).concat(answer, arr.slice(index + 1));
        }
    }
}

function updateArray(arr, j) {
    let intermediateAnswer = operate(arr[j], arr[j - 1], arr[j + 1])
    return arr.slice(0, j - 1).concat(intermediateAnswer, arr.slice(j + 2));
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