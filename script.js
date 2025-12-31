const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

function updateDisplay() {
  display.textContent = expression || "0";
}

function calculate() {
  try {
    expression = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    expression = eval(expression).toString();
  } catch {
    expression = "Error";
  }
  updateDisplay();
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      expression = "";
    } else if (value === "=") {
      calculate();
      return;
    } else if (value === "⌫") {
      expression = expression.slice(0, -1);
    } else {
      expression += value;
    }

    updateDisplay();
  });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789.+-*/".includes(key)) {
    expression += key
      .replace("*", "×")
      .replace("/", "÷");
  } else if (key === "Enter") {
    calculate();
    return;
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
  } else if (key === "Escape") {
    expression = "";
  }

  updateDisplay();
});
