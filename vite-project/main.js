import './style.css'

const buttons = document.querySelector(".buttons")
const numberButtons = document.querySelectorAll(".number");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const dotBtn = document.querySelector(".dot");
const equalBtn = document.querySelector(".equal");
const operationBtn = document.querySelector(".operation");
const displayPrimary = document.querySelector(".primary-output");
const displaySecondary = document.querySelector(".secondary-output");


function calculatorFactory() {
  let secondNumber = "";
  let firstNumber = "";
  let operation = "";

  const getFirstNumber = () => firstNumber;
  const setFirstNumber = (firstNum) => firstNumber += firstNum;
  const resetNumberOne = () => firstNumber = "";

  const getSecondNumber = () => secondNumber;
  const setSecondNumber = (secondNum) => secondNumber += secondNum;
  const resetNumberTwo = () => secondNumber = "";

  const getOperation = () => operation;
  const setOperation = (mathOperation) => operation = mathOperation;

  return {getFirstNumber, setFirstNumber, resetNumberOne, getSecondNumber, setSecondNumber, resetNumberTwo, getOperation, setOperation}
}

const calculator = calculatorFactory();

buttons.addEventListener("click", (event) => {
  if (event.target.classList.contains("number") ) {
    calculator.setFirstNumber(event.target.value)
    displayPrimary.textContent = "";
    displayPrimary.textContent += calculator.getFirstNumber();
  } else if (event.target.classList.contains("operation") && calculator.getFirstNumber() !== "" && calculator.getSecondNumber() === "") {
    calculator.setSecondNumber(calculator.getFirstNumber());
    calculator.resetNumberOne();
    calculator.setOperation(event.target.value)
    displayPrimary.textContent = "";
    displaySecondary.textContent = `${calculator.getSecondNumber()} ${calculator.getOperation()}`;
  } else if (event.target.classList.contains("operation") && calculator.getSecondNumber() !== "" && calculator.getFirstNumber() !== "") {
    const result = (eval(`${parseInt(calculator.getSecondNumber())} ${calculator.getOperation()} ${parseInt(calculator.getFirstNumber())}`));
    calculator.resetNumberTwo()
    calculator.setSecondNumber(result);
    calculator.resetNumberOne()
    calculator.setOperation(event.target.value)
    displayPrimary.textContent = "";
    displaySecondary.textContent = `${calculator.getSecondNumber()} ${calculator.getOperation()}`;
  }
})

clearBtn.addEventListener("click", () => {
  displayPrimary.textContent = "";
  displaySecondary.textContent = "";
  // zasto ovo ne radi??
  // calculator.setFirstNumber("");
  calculator.resetNumberOne();
  calculator.resetNumberTwo();
  // jel trebam ovo?
  // calculator.setOperation("");
})

deleteBtn.addEventListener("click", () => {
  // ocu ovo stavit pod if displayPrimary.textContent !== ""
  let result = calculator.getFirstNumber()
  calculator.resetNumberOne()
  calculator.setFirstNumber(result.substring(0, result.length - 1))
  displayPrimary.textContent = calculator.getFirstNumber()
})

// dotBtn.addEventListener("click", (event) => {
//   if (!event.target.value in calculator.getFirstNumber() && calculator.getFirstNumber() !== "") {
//     calculator.setFirstNumber(event.target.value)
//   }
// })
