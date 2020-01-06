let numbers = Array.from(document.querySelectorAll(".numbers"));
let screen = document.querySelector("#screen");
let x = 0;
let y = 0;
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function() {
        screen.textContent += this.textContent;
    });
}

let clear = document.querySelector('#clear');
clear.addEventListener('click', function() {
    screen.textContent = "";
});

let addition = document.querySelector('#add');
addition.addEventListener('click', function() {
    x = Number(screen.textContent)
    screen.textContent += this.textContent;
});

let subtraction = document.querySelector('#subtract');
subtraction.addEventListener('click', function() {
    screen.textContent += this.textContent;
});

let multiplication = document.querySelector('#multiply');
multiplication.addEventListener('click', function() {
    screen.textContent += this.textContent;
});

let division = document.querySelector('#divide');
division.addEventListener('click', function() {
    screen.textContent += this.textContent;
});

let equals = document.querySelector('#equals');
equals.addEventListener('click', function() {
    screen.textContent += this.textContent;
});


// functions
function add(x, y) {
    return x + y;
}
// --functions