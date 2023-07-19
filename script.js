
class Calculator {
  constructor(previous, current) {
    this.previousOperand = previous;
    this.currentOperand = current;
    this.currentOperandElement = document.querySelector(current); // Inisialisasi properti currentOperandElement
    this.previousOperandElement = document.querySelector(previous); // Inisialisasi properti previousOperandElement
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousOperand;
  }
}

const numbers = document.querySelectorAll('#number');
const operations = document.querySelectorAll('#operation');
const equal = document.querySelector('#equals');
const previous = '#previous-operand'; // Gunakan tanda pagar di depan ID
const current = '#current-operand'; // Gunakan tanda pagar di depan ID
const deleteButton = document.querySelector('#delete');
const clearAll = document.querySelector('#clear-all');

const calculator = new Calculator(previous, current);

numbers.forEach(number => {
  number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach(operation => {
  operation.addEventListener('click', () => {
    calculator.chooseOperation(operation.innerText);
    calculator.updateDisplay();
  });
});

equal.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAll.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});