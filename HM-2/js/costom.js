
function firstCalc() {

    let oper = prompt('Hello, what value do you need ( +, -, /, *, ) ?');
    let firstValue = prompt('wtite first number (1, 2, 3 ....)', 2);
    let secondValue = prompt('wtite second number (1, 2, 3, 45....)', 2);
    firstValue = Number(firstValue);
    secondValue = Number(secondValue);

    switch (oper) {
        case '+': result = firstValue + secondValue; break;
        case '-': result = firstValue - secondValue; break;
        case '*': result = firstValue * secondValue; break;
        case '/': result = firstValue / secondValue; break;
        default: result = 'Eror!!!'; break;
    };

    alert(firstValue + oper + secondValue + '=' + result);
}

firstCalc()


