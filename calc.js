// function validRightParen(expression) {
//     let leftCount = 0;
//     let rightCount = 0;
//     for (let i = 0; i < expression.length; i++) {
//         if (rightCount > leftCount) {
//             return false;
//         }
//         else if (expression[i] === ")") {
//             rightCount++;
//         }
//         else if (expression[i] === "(") {
//             leftCount++;
//         }
//     }

//     return (leftCount == rightCount);
// }

// function trimLeadingZeros(operand) {
//     const decimalPlace = ".";
//     let result = "";
//     if (operand.includes(decimalPlace, 0)) {
//         result = operand.replace(/^0+/, '0');
//     }
//     else {
//         result = operand.replace(/^0+/, '');
//     }

//     return result;
// }

const tokenTypes = {
    NUMBER: 'NUMBER',
    FUNCTION: 'FUNCTION',
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    EXPONENTIATION: '^',
    PARENTHESIS_LEFT: '(',
    PARENTHESIS_RIGHT: ')',
    MODULUS: 'MOD',
    PERCENT: '%',
};

const tokenRegex = [
    [/^(?:\d+(?:\.\d*)?|\.\d+)/, tokenTypes.NUMBER],
    [/^[a-z]+/, tokenTypes.FUNCTION],
    [/^\+/, tokenTypes.ADDITION],
    [/^\-/, tokenTypes.ADDITION],
    [/^\*/, tokenTypes.ADDITION],
    [/^\\/, tokenTypes.ADDITION],
    [/^\^/, tokenTypes.ADDITION],
    [/^\(/, tokenTypes.ADDITION],
    [/^\)/, tokenTypes.ADDITION]
];

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

// while there are tokens to be read:
//     read a token
//     if the token is:
//     - a number:
//         put it into the output queue
//     - a function:
//         push it onto the operator stack 
//     - an operator o1:
//         while (
//             there is an operator o2 at the top of the operator stack which is not a left parenthesis, 
//             and (o2 has greater precedence than o1 or (o1 and o2 have the same precedence and o1 is left-associative))
//         ):
//             pop o2 from the operator stack into the output queue
//         push o1 onto the operator stack
//     - a ",":
//         while the operator at the top of the operator stack is not a left parenthesis:
//              pop the operator from the operator stack into the output queue
//     - a left parenthesis (i.e. "("):
//         push it onto the operator stack
//     - a right parenthesis (i.e. ")"):
//         while the operator at the top of the operator stack is not a left parenthesis:
//             {assert the operator stack is not empty}
//             /* If the stack runs out without finding a left parenthesis, then there are mismatched parentheses. */
//             pop the operator from the operator stack into the output queue
//         {assert there is a left parenthesis at the top of the operator stack}
//         pop the left parenthesis from the operator stack and discard it
//         if there is a function token at the top of the operator stack, then:
//             pop the function from the operator stack into the output queue
// /* After the while loop, pop the remaining items from the operator stack into the output queue. */
// while there are tokens on the operator stack:
//     /* If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses. */
//     {assert the operator on top of the stack is not a (left) parenthesis}
//     pop the operator from the operator stack onto the output queue



function tokenizeExpression(expression) {
    let currIndex = 0;
    let result = [];

    while (currIndex < expression.length) {
        let substr = expression.substring(currIndex);
        for (let i = 0; i < tokenRegex.length; i++) {
            const regex = tokenRegex[i][0];
            const tokenFound = substr.match(regex);

            if (tokenFound) {
                const tokenIndex = tokenFound.index;
                result.push(tokenFound[0]);
                currIndex += tokenFound[0].length;
                break;
            } 
        }
    }
    return result;
}

function evaluateExpression(expression) {
    
}

const expr1 = "(3.12+2)*2*4";
const expr2 = "3.12+2*2*4"
console.log(tokenizeExpression(expr1));
console.log(parse(tokenizeExpression(expr1)));
console.log(tokenizeExpression(expr2));
console.log(parse(tokenizeExpression(expr2)));

function parse(tokens) {
    let operatorStack = [];
    let outputQueue = [];
    for (let i = 0; i < tokens.length; i++) {

        let token = tokens[i];

        //console.log(outputQueue);
        //console.log(token);

        if (!isNaN(token)) {
            outputQueue.push(token);
        }
        else if (isFunction(token)) {
            operatorStack.push(token);
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
    }
    while (operatorStack.length > 0) {
        console.assert(operatorStack.at(-1) !== '(', 'Invalid Expression - Mismatched Parentheses');
        outputQueue.push(operatorStack.pop());
    }
    return outputQueue;
}


//console.log(parse(tokenizeExpression(expr1)));

function evaluateExpression(outPutQueue) {

}

// function createNode(type, value, children = []){
//     return {
//         type: type,
//         value: value,
//         children: children
//     };
// }


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