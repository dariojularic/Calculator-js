import './style.css'

const dotBtn = document.querySelector(".dot");
const equalBtn = document.querySelector(".equal");
const buttons = document.querySelector(".buttons")
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
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

  const operate = (a, b, operation) => {
    if (operation === "/") return a / b
    if (operation === "*") return a * b
    if (operation === "+") return a + b
    if (operation === "-") return a - b
  }

  return {getFirstNumber, setFirstNumber, resetNumberOne, getSecondNumber, setSecondNumber, resetNumberTwo, getOperation, setOperation, operate}
}


// jesu li displayPrimary i displaySecondary state??
function clearPrimaryDisplay() {
  displayPrimary.textContent = "";
}

const clearSecondaryDisplay = () => displaySecondary.textContent = "";

function resetAllNumbers() {
  calculator.resetNumberOne()
  calculator.resetNumberTwo()
}

const calculator = calculatorFactory();

buttons.addEventListener("click", (event) => {
  if (event.target.classList.contains("number") ) {
    calculator.setFirstNumber(event.target.value)
    clearPrimaryDisplay()
    displayPrimary.textContent += calculator.getFirstNumber();
  } else if (event.target.classList.contains("operation") && calculator.getFirstNumber() !== "" && calculator.getSecondNumber() === "") {
    calculator.setSecondNumber(calculator.getFirstNumber());
    calculator.resetNumberOne();
    calculator.setOperation(event.target.value)
    clearPrimaryDisplay()
    displaySecondary.textContent = `${calculator.getSecondNumber()} ${calculator.getOperation()}`;
  } else if (event.target.classList.contains("operation") && calculator.getSecondNumber() !== "" && calculator.getFirstNumber() !== "") {
    console.log(event.target.value)
    const result = calculator.operate(parseInt(calculator.getSecondNumber()), parseInt(calculator.getFirstNumber()), calculator.getOperation());
    calculator.resetNumberTwo()
    calculator.setSecondNumber(result);
    calculator.resetNumberOne()
    calculator.setOperation(event.target.value)
    clearPrimaryDisplay()
    displaySecondary.textContent = `${calculator.getSecondNumber()} ${calculator.getOperation()}`;
  }
})


// napravit funkciju clear
clearBtn.addEventListener("click", () => {
  clearPrimaryDisplay()
  clearSecondaryDisplay()
  // displaySecondary.textContent = "";
  resetAllNumbers()
  calculator.setOperation("");
})

deleteBtn.addEventListener("click", () => {
  // ocu ovo stavit pod if displayPrimary.textContent !== ""
  if (displayPrimary.textContent !== "" && displaySecondary.textContent === "" ) {
    let result = calculator.getFirstNumber()
    calculator.resetNumberOne()
    calculator.setFirstNumber(result.substring(0, result.length - 1))
    displayPrimary.textContent = calculator.getFirstNumber()
  }
})

equalBtn.addEventListener("click", () => {
  if (calculator.getFirstNumber() !== "" && calculator.getSecondNumber() !== "" && calculator.getOperation() !== "") {
    const result = calculator.operate(parseInt(calculator.getSecondNumber()), parseInt(calculator.getFirstNumber()), calculator.getOperation());
    clearSecondaryDisplay()
    displayPrimary.textContent = result;
  }
})

dotBtn.addEventListener("click", (event) => {
  const number = calculator.getFirstNumber()
  // console.log(number)
  if (!number.includes(".") && calculator.getFirstNumber() !== "") {
    // console.log(event.target.value)
    calculator.setFirstNumber(event.target.value)
    displayPrimary.textContent = calculator.getFirstNumber();
    // console.log("first", calculator.getFirstNumber())
    // console.log("second", calculator.getSecondNumber())
    // console.log("first", calculator.getFirstNumber())
  }
})
