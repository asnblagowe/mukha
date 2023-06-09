// Получаем ссылки на необходимые элементы
const screen = document.querySelector(".calc-screen p");
const buttons = document.querySelectorAll(".btn");

let currentNumber = "";
let previousNumber = "";
let operation = "";

// Функция для обновления содержимого экрана
function updateScreen() {
  screen.textContent = currentNumber;
}

// Функция для обработки нажатия на кнопки с цифрами и точкой
function handleNumberClick(e) {
  const clickedNumber = e.target.textContent;

  if (clickedNumber === "." && currentNumber.includes(".")) {
    // Если точка уже присутствует, игнорируем повторное нажатие
    return;
  }

  currentNumber += clickedNumber;
  updateScreen();
}

// Функция для обработки нажатия на кнопки операций (+, -, *, /)
function handleOperationClick(e) {
  const clickedOperation = e.target.textContent;

  if (currentNumber === "") {
    // Если текущее число пусто, игнорируем нажатие на операцию
    return;
  }

  if (previousNumber !== "") {
    // Если предыдущее число уже есть, выполним предыдущую операцию
    calculate();
  }

  operation = clickedOperation;
  previousNumber = currentNumber;
  currentNumber = "";

  updateScreen();
}

// Функция для выполнения арифметической операции
function calculate() {
  let result;

  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "X":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentNumber = result.toString();
  previousNumber = "";
  operation = "";

  updateScreen();
}

// Функция для обработки нажатия на кнопку AC (очистка)
function handleClearClick() {
  currentNumber = "";
  previousNumber = "";
  operation = "";

  updateScreen();
}

// Функция для обработки нажатия на кнопку "=" (равно)
function handleEqualClick() {
  if (currentNumber === "" || previousNumber === "" || operation === "") {
    // Если не хватает операндов или операции, игнорируем нажатие на "="
    return;
  }

  calculate();
}

// Навешиваем обработчики событий на кнопки
buttons.forEach((button) => {
  if (button.classList.contains("ac")) {
    button.addEventListener("click", handleClearClick);
  } else if (
    button.classList.contains("plus") ||
    button.classList.contains("minus") ||
    button.classList.contains("myltiply") ||
    button.classList.contains("division")
  ) {
    button.addEventListener("click", handleOperationClick);
  } else if (button.classList.contains("equal")) {
    button.addEventListener("click", handleEqualClick);
  } else {
    button.addEventListener("click", handleNumberClick);
  }
});
