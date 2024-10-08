function validRightParen(expression) {
    let leftCount = 0;
    let rightCount = 0;
    for (let i = 0; i < expression.length; i++) {
        if (rightCount > leftCount) {
            return false;
        }
        else if (expression[i] === ")") {
            rightCount++;
        }
        else if (expression[i] === "(") {
            leftCount++;
        }
    }

    return (leftCount == rightCount);
}

function trimLeadingZeros(operand) {
    const decimalPlace = ".";
    let result = "";
    if (operand.includes(decimalPlace, 0)) {
        result = operand.replace(/^0+/, '0');
    }
    else {
        result = operand.replace(/^0+/, '');
    }

    return result;
}

function evaluateExpression(operator, operandA, operandB) {
    return false;
}

const buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleEvent);
}

function updateDisplay(buttonPressedText) {
    const display = document.getElementById("calc-display_result");
    display.textContent = buttonPressedText;
}

function resetCalculator(){
    displayText = '';
    updateDisplay(displayText);
    currentState = 'idle';
    
}

function tokenizeExpression(expression){
    const operatorRegex = /([()+-/*])/g;
    tokens = expression.split(operatorRegex);
    return tokens;
    
}

function shuntingYard(tokens){
    let stack = [];
    let queue = [];
    for(let i = 0; i < tokens.length; i++){
        token = tokens[i];
        
    }
}

function createNode(type, value, children = []){
    return {
        type: type,
        value: value,
        children: children
    };
}

const stateMapping = {
    idle: "inputtingNumber",
    inputtingNumber: "inputtingOperator",
    inputtingOperator: "inputtingNumber",
    evaluating: "result",
    result: ["inputtingNumber", "inputtingOperator"],
};

let displayText = '';
let currentState = 'idle';
function handleEvent(event) {
    let eventType = event.target.classList[0];
    let eventText = event.target.textContent;

    if (eventText === 'C') {
        resetCalculator();
        return;
    }

    if (eventText === '='){
        tokenizeExpression(displayText);
        updateState('result', displayText);
    }
    

    switch (currentState) {
        case 'idle':
            handleIdleState(eventType, eventText);
            break;
        case 'inputtingNumber':
            handleInputtingNumberState(eventType, eventText);
            break;
        case 'inputtingOperator':
            handleInputtingOperatorState(eventType, eventText);
            break;
        case 'result':
            break;
        default:
            currenState = 'error';
            displayText = 'error';
            break;
    }
}

function handleIdleState(eventType, eventText) {
    if (eventType === 'numeral') {
        displayText += eventText;
        updateState('inputtingNumber', displayText);
    }
    //can handle left paren, square root, decimal point
}

function handleInputtingNumberState(eventType, eventText) {
    if (eventType === 'operation') {
        displayText += eventText;
        updateState('inputtingOperator', displayText);
    }
    else if (eventType === 'numeral') {
        displayText += eventText;
        updateState('inputtingNumber', displayText);
    }
}

function handleInputtingOperatorState(eventType, eventText) {
    if (eventType === 'numeral') {
        displayText += eventText;
        updateState('inputtingNumber', displayText);
    }
    else if (eventType === 'operation' && eventText === '-') {
        displayText += eventText;
        updateState('inputtingOperator', displayText);
    }
    else if (eventType === 'operation') {
        displayText[displayText.length - 1] = eventText;
        updateState('inputtingOperator', displayText);
    }

}

function handleResultState(eventType, eventText) {
    if (eventType === 'operation') {
        displayText += eventText;
        updateState('inputtingOperator', displayText);
    }
    else if (eventType === 'numeral') {
        displayText += eventText;
        updateState('inputtingNumber', displayText);
    }
}

function updateState(newState, value = "") {
    currentState = newState;
    updateDisplay(value);
}