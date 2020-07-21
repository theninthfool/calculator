addListeners();

function addListeners() {
    let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    let ops = ["+", "-", "/", "*", "(", ")", '='];
    let controls = ['Backspace', 'clear', 'Enter'];
    let data = { xString: '', inputNumbers: [] };
    updateScreen(data, false);
    let buttons = document.querySelector("#buttons");
    buttons.addEventListener('click', e => {
        let id = e.target.getAttribute('id');
        data = checkInput(id, data, nums, ops);
    });
    document.addEventListener('keydown', e => {
        let key = e.key;
        if (nums.includes(key) || ops.includes(key) || controls.includes(key)) {
            if (key == 'Enter') key = '=';
            keyPressed(key);
            data = checkInput(key, data, nums, ops);
        }
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

function updateScreen(data, flag) {
    let screen = document.querySelector("#screen");
    let arr = data.inputNumbers;
    if (flag) {
        screen.textContent = arr.join('') + " = " + solve(arr);
        data = { xString: '', inputNumbers: [] };
    } else {
        screen.textContent = arr.join('') + data.xString;
    }
    return data;
}



function checkInput(input, data, nums, ops) {
    let newData = {};
    let flag = false;
    if (input === '=') flag = true;
    if (nums.includes(input)) {
        newData = {
            xString: data.xString + input,
            inputNumbers: data.inputNumbers
        }
    } else if (ops.includes(input)) {
        newData = pushString(input, data);
    } else if (input === "Backspace") {
        newData = backspace(data, ops);
    } else if (input === "clear") {
        newData = { xString: '', inputNumbers: [] }
    }
    console.log(newData.xString);
    console.log(newData.inputNumbers);
    return updateScreen(newData, flag);
}

function finalize(arr) {
    let newArr = arr.map(function(item) {
        if (Number(item) || item === '0') {
            return Number(item);
        } else {
            return item;
        }
    });
    console.log("New Array", newArr);
    return { xString: '', inputNumbers: newArr }
}

function backspace(data, ops) {
    let str = '';
    let arr = data.inputNumbers;
    if (data.xString !== "") {
        str = data.xString.slice(0, -1);
    } else if (arr.length > 0) {
        arr.pop();
        if (!ops.includes(arr[arr.length - 1])) {
            str = arr.pop();
        }
    }
    return { xString: str, inputNumbers: arr };
}

function pushString(operator, data) {
    let arr = data.inputNumbers;
    if (data.xString.length > 0) {
        arr.push(data.xString);
    }
    if (operator === '=') {
        return finalize(arr)
    }
    arr.push(operator);
    return { xString: '', inputNumbers: arr };
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