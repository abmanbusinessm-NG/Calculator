let currentInput = "0";
let previousInput = "";
let operator = "";

const currentScreen = document.getElementById("current-operand");
const previousScreen = document.getElementById("previous-operand");

function updateScreen() {
    currentScreen.innerText = formatNumber(currentInput);
    if (operator) {
        previousScreen.innerText = `${formatNumber(previousInput)} ${operator}`;
    } else {
        previousScreen.innerText = "";
    }
}

// Helper to format numbers with thousands-separators
function formatNumber(numStr) {
    if (numStr === "Error" || numStr === "0") return numStr;
    const parts = numStr.split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US');
    return parts.join('.');
}

function appendNumber(number) {
    if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        // Prevent typing multiple decimals
        if (number === "." && currentInput.includes(".")) return;
        currentInput += number;
    }
    updateScreen();
}

function appendOperator(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = "0";
    updateScreen();
}

function clearScreen() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    updateScreen();
}

function deleteNumber() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateScreen();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                currentInput = "Error";
                operator = "";
                previousInput = "";
                updateScreen();
                return;
            }
            result = prev / current;
            break;
        case "%":
            result = prev % current;
            break;
        default:
            return;
    }

    // Solve floating point precision issues (e.g., 0.1 + 0.2 = 0.3)
    currentInput = parseFloat(result.toFixed(10)).toString();
    operator = "";
    previousInput = "";
    updateScreen();
}

// Keyboard support for a frictionless user experience
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key)) appendNumber(key);
    if (key === ".") appendNumber(".");
    if (key === "+" || key === "-") appendOperator(key);
    if (key === "*") appendOperator("*");
    if (key === "/") appendOperator("/");
    if (key === "%") appendOperator("%");
    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }
    if (key === "Backspace") deleteNumber();
    if (key === "Escape") clearScreen();
});