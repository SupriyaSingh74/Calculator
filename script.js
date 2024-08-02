const resultElement = document.getElementById('result');
const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const percentageBtn = document.getElementById('percentage-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const substractBtn = document.getElementById('substract-button');
const addBtn = document.getElementById('add-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const numberBtns = document.querySelectorAll('.number');

// Intialize the variable
let result = '' ;
let operation ='' ;
let previousoperand = 0;

// Function to append number
const appendNumber = (number) => {
    if (number === '.' && result.includes('.')) return;
    result += number;
    updateDisplay();
}


// Excample 24 + 5
// Operation = +
// previousoperand = 24
// result = 29


//Function to update display
const updateDisplay = () => {
    if(operation) {
        resultElement.innerText = `${previousoperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText = result;
    }
}

// Function tp select operator
const selectOperator = (operatorValue) => {
    if(result === '') return;

    if(operation !== '' && previousoperand !== '') {
        calculateResult();
    }

    operation = operatorValue;
    previousoperand = result;
    result = '';
    updateDisplay()
}

// Function to calculate result
const calculateResult = () => {
    let evaluatedResult;
    const prev = parseFloat(previousoperand);
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;    
        case '*':
            evaluatedResult = prev * current;
            break;
        case '/':
            evaluatedResult = prev / current;
            break; 

        default:
            return;
            break;
    }

    result = evaluatedResult.toString();
    operation = '';
    previousoperand = '';

}

//Add event Listner to numer buttons
numberBtns.forEach(button => {
    button.addEventListener('click' , ()=> {
        // console.log(button.innerText);
        appendNumber(button.innerText);
    });
});

// Function to clear display
const clearDisplay = () => {
    result = '';
    previousoperand = '';
    operation = '';
    updateDisplay();
}

// Function to delete last digit
const deleteLastDigit = () => {
    if(operation !== '' && result === '') {
        operation ='';
        result = previousoperand;
        previousoperand ='';
        updateDisplay();
    }
    else {
        result = result.slice(0,-1);
        updateDisplay();
    }
    // if(result === '') return;
    // result = result.slice(0,-1);
    // updateDisplay();
}

decimalBtn.addEventListener('click' ,  () => appendNumber('.'));
addBtn.addEventListener('click' ,  () => selectOperator('+'));
substractBtn.addEventListener('click' ,  () => selectOperator('-'));
multiplyBtn.addEventListener('click' ,  () => selectOperator('*'));
divideBtn.addEventListener('click' ,  () => selectOperator('/'));
equalBtn.addEventListener('click', () => {

    if(result === '') {
        return;
    }
    calculateResult();
    updateDisplay();
})

clearBtn.addEventListener('click' , clearDisplay);
deleteBtn.addEventListener('click' , deleteLastDigit)