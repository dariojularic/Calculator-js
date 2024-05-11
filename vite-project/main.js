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
    if (operation === "*") return a * b
    if (operation === "+") return a + b
    if (operation === "-") return a - b
    if (operation === "/" && (a === 0 || b === 0)) {
      alert("You can't divide by zero!")
      return "";
    } else {
      return a / b
    }
  }

  return {getFirstNumber, setFirstNumber, resetNumberOne, getSecondNumber, setSecondNumber, resetNumberTwo, getOperation, setOperation, operate}
}

function clearPrimaryDisplay() {
  displayPrimary.textContent = "";
}
// koja je razlika izmedu ove dve funkcije?
const clearSecondaryDisplay = () => displaySecondary.textContent = "";

// ocu li napravit setPrimaryDisplay i setSecondaryDisplay??
function resetAllNumbers() {
  calculator.resetNumberOne()
  calculator.resetNumberTwo()
}

const calculator = calculatorFactory();

buttons.addEventListener("click", (event) => {
  // kako ogranicit broj znamenki ?
  const numberOfNumbers = calculator.getFirstNumber()
  if (event.target.classList.contains("number") && numberOfNumbers.length < 15) {
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
    const result = calculator.operate(parseFloat(calculator.getSecondNumber()), parseFloat(calculator.getFirstNumber()), calculator.getOperation());
    console.log(calculator.getFirstNumber())
    console.log(calculator.getSecondNumber())
    calculator.resetNumberTwo()
    calculator.setSecondNumber(result);
    calculator.resetNumberOne()
    calculator.setOperation(event.target.value)
    clearPrimaryDisplay()
    displaySecondary.textContent = `${calculator.getSecondNumber()} ${calculator.getOperation()}`;
  }
})

clearBtn.addEventListener("click", () => {
  clearPrimaryDisplay()
  clearSecondaryDisplay()
  resetAllNumbers()
  calculator.setOperation("");
})

deleteBtn.addEventListener("click", () => {
  if (displayPrimary.textContent !== "") {
    let result = calculator.getFirstNumber()
    calculator.resetNumberOne()
    calculator.setFirstNumber(result.substring(0, result.length - 1))
    displayPrimary.textContent = calculator.getFirstNumber()
  }
  if (displayPrimary.textContent === "") calculator.resetNumberOne();
})

equalBtn.addEventListener("click", () => {
  if (calculator.getFirstNumber() !== "" && calculator.getSecondNumber() !== "" && calculator.getOperation() !== "") {
    const result = calculator.operate(parseFloat(calculator.getSecondNumber()), parseFloat(calculator.getFirstNumber()), calculator.getOperation());
    clearSecondaryDisplay()
    resetAllNumbers()
    calculator.setFirstNumber(result)
    displayPrimary.textContent = Number(calculator.getFirstNumber()).toFixed(10);
  }
})

dotBtn.addEventListener("click", (event) => {
  // jel ovo ok? zasto ne mogu zvat .includes("") na calculator.getFirstNumbe?
  const number = calculator.getFirstNumber()
  if (!number.includes(".") && calculator.getFirstNumber() !== "") {
    calculator.setFirstNumber(event.target.value)
    displayPrimary.textContent = calculator.getFirstNumber();
  }
})
