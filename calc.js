const tokenTypes = {
    NUMBER: 'NUMBER',
    IDENTIFIER: 'IDENTIFIER',
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    EXPONENTIATION: '^',
    PARENTHESIS_LEFT: '(',
    PARENTHESIS_RIGHT: ')',
    MODULUS: 'MOD',
    PERCENT: '%',
    UNARY_MINUS: 'UM',
};

const tokenRegex = [
    [/^(?:\d+(?:\.\d*)?|\.\d+)/, tokenTypes.NUMBER],
    [/^[a-z]+/, tokenTypes.IDENTIFIER],
    [/^\+/, tokenTypes.ADDITION],
    [/^\*/, tokenTypes.MULTIPLICATION],
    [/^\\/, tokenTypes.DIVISION],
    [/^\^/, tokenTypes.EXPONENTIATION],
    [/^\(/, tokenTypes.PARENTHESIS_LEFT],
    [/^\)/, tokenTypes.PARENTHESIS_RIGHT],
    [/\-/, tokenTypes.SUBTRACTION],

];

const unMinus = () => {
    let unRegex = '';
    for (let i = 0; i < length(tokenRegex); i++) {
        unRegex;
    }
};

const functionList = ['sqrt'];

const operators = {
    u: {
        precedence: 4,
        association: 'right',
    },

    '^': {
        precedence: 4,
        association: 'right',
    },

    '+': {
        precedence: 2,
        association: 'left',
    },

    '-': {
        precedence: 2,
        association: 'left',
    },

    '*': {
        precedence: 3,
        association: 'left',
    },

    '/': {
        precedence: 3,
        association: 'left',
    },

    '%': {
        precedence: 3,
        association: 'left',
    },

    'mod': {
        precedence: 3,
        association: 'left',
    },
};

function isFunction(token) {
    return functionList.includes(token);
}

function getCurrentSlice(str, startIndex) {
    return str.slice(startIndex, );
}

function isUnaryMinus(prevToken, currToken) {
    const validChar = /[^0-9.)]/;
    return currToken === '-' &&
        (prevToken === undefined || validChar.test(prevToken));
}

function tokenizeExpression(expression) {
    let currIndex = 0;
    let result = [];
    let substr = expression;

    while (currIndex < expression.length) {

        for (let i = 0; i < tokenRegex.length; i++) {
            const regex = tokenRegex[i][0];
            const tokenFound = substr.match(regex);

            if(!tokenFound){
                continue;
            }

            if (isUnaryMinus(result[result.length - 1], tokenFound[0])) {
                result.push('u');
            }

            else if (tokenFound) {
                result.push(tokenFound[0]);
            }

            currIndex += tokenFound[0].length;
            substr = expression.substring(currIndex);
            break;
        }
    }
    return result;
}

function evaluateExpression(expression) {
    let stack = [];
    let tokens = parse(expression);
    foreach(token in tokens){
        switch(token){
            case !isNaN(token):
                stack.push(token);
                break;
            case 
        }
    }
}

const expr1 = "(3.12+2)*2*4";
const expr2 = "(3.12--2)";
// console.log(tokenizeExpression(expr1));
// console.log(parse(tokenizeExpression(expr1)));
//console.log(tokenizeExpression(expr2));
console.log(parse(tokenizeExpression(expr2)));
console.log(parse(tokenizeExpression(expr1)));

function parse(tokens) {
    let operatorStack = [];
    let outputQueue = [];
    let prevToken = null;
    for (let i = 0; i < tokens.length; i++) {

        let token = tokens[i];

        if (!isNaN(token)) {
            outputQueue.push(token);
        }
        else if (isFunction(token)) {
            operatorStack.push(token);
        }
        else if (Object.keys(operators).includes(token) &&
            token === prevToken &&
            token === '-') {
            operatorStack.push('u');
        }
        else if (Object.keys(operators).includes(token)) {
            //let stackTop = operatorStack.at(-1);
            while (operatorStack.length > 0 &&
                operatorStack.at(-1) !== '(' &&
                (operators[operatorStack.at(-1)].precedence > operators[token].precedence ||
                    (operators[operatorStack.at(-1)].precedence == operators[token].precedence) &&
                    operators[token].association === 'left')) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
        else if (token === '(') {
            operatorStack.push(token);
        }
        else if (token === ')') {

            while (operatorStack.length > 0 && operatorStack.at(-1) !== '(') {
                outputQueue.push(operatorStack.pop());

            }
            console.assert(operatorStack.at(-1) === '(', 'Invalid Expression - Mismatched Parentheses');
            operatorStack.pop();
            if (isFunction(operatorStack.at(-1))) {
                outputQueue.push(operatorStack.pop());
            }
        }
        prevToken = tokens[i];
    }
    while (operatorStack.length > 0) {
        console.assert(operatorStack.at(-1) !== '(', 'Invalid Expression - Mismatched Parentheses');
        outputQueue.push(operatorStack.pop());
    }
    return outputQueue;
}

function evaluateExpression(outPutQueue) {

}

let displayText = '';
let currentState = 'idle';
function handleEvent(event) {
    let eventType = event.target.classList[0];
    let eventText = event.target.textContent;

    if (eventText === 'C') {
        resetCalculator();
        return;
    }

    if (eventText === '=') {
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

function updateDisplay(buttonPressedText) {
    const display = document.getElementById("calc-display_result");
    display.textContent = buttonPressedText;
}

function resetCalculator() {
    displayText = '';
    updateDisplay(displayText);
    currentState = 'idle';
}

//adding event listeners to document
const buttons = document.getElementsByTagName("button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleEvent);
}