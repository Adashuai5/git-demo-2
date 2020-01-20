{
  function createButton(
    text: string,
    container: HTMLElement,
    className: string
  ): void {
    let button: HTMLButtonElement = document.createElement("button");
    button.textContent = text;
    if (className) {
      button.className = className;
    }
    container.appendChild(button);
  }

  let container: HTMLDivElement = document.createElement("div");
  container.classList.add("calculator");
  document.body.appendChild(container);

  let output: HTMLDivElement = document.createElement("div");
  output.classList.add("output");
  container.appendChild(output);

  let span: HTMLSpanElement = document.createElement("span");
  span.textContent = "0";
  output.appendChild(span);

  let n1: number, operation: string, n2: number;
  container.addEventListener("click", event => {
    if (event.target instanceof HTMLButtonElement) {
      let buttonText = event.target.textContent;

      if ("0123456789".indexOf(buttonText) >= 0) {
        if (operation) {
          n2 = n2 ? parseInt(n2 + buttonText) : parseInt(buttonText);
          span.textContent = n2.toString();
        } else {
          n1 = n1 ? parseInt(n1 + buttonText) : parseInt(buttonText);
          span.textContent = n1.toString();
        }
      } else if ("+-×÷".indexOf(buttonText) >= 0) {
        operation = buttonText;
      } else if ("=".indexOf(buttonText) >= 0) {
        if (operation === "+") {
          span.textContent = (n1 + n2).toString();
        } else if (operation === "-") {
          span.textContent = (n1 - n2).toString();
        } else if (operation === "×") {
          span.textContent = (n1 * n2).toString();
        } else if (operation === "÷") {
          span.textContent = (n1 / n2).toFixed(1).toString();
        }
        n1 = 0;
        n2 = 0;
        operation = "";
      } else if (buttonText === "clear") {
        span.textContent = "0";
        n1 = 0;
        n2 = 0;
        operation = "";
      }
    }
  });

  let keys: Array<Array<string>> = [
    ["clear", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];
  keys.forEach((textList: Array<string>) => {
    let div: HTMLDivElement = document.createElement("div");
    div.classList.add("row");
    textList.forEach((text: string) => {
      createButton(text, div, `button text-${text}`);
    });
    container.appendChild(div);
  });
}
