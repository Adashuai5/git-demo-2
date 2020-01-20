{
  class Calculator {
    public container: HTMLDivElement;
    private output: HTMLDivElement;
    private span: HTMLSpanElement;
    public n1: number;
    public operation: string;
    public n2: number;

    constructor() {
      this.createContainer();
      this.createOutput();
      this.createKeys();
      this.eventHub();
    }

    createButton(
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

    createContainer() {
      this.container = document.createElement("div");
      this.container.classList.add("calculator");
      document.body.appendChild(this.container);
    }

    createOutput() {
      this.output = document.createElement("div");
      this.output.classList.add("output");
      this.container.appendChild(this.output);
      this.span = document.createElement("span");
      this.span.textContent = "0";
      this.output.appendChild(this.span);
    }

    createKeys() {
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
          this.createButton(text, div, `button text-${text}`);
        });
        this.container.appendChild(div);
      });
    }

    eventHub() {
      this.container.addEventListener("click", event => {
        if (event.target instanceof HTMLButtonElement) {
          let buttonText = event.target.textContent;

          if ("0123456789".indexOf(buttonText) >= 0) {
            if (this.operation) {
              this.n2 = this.n2
                ? parseInt(this.n2 + buttonText)
                : parseInt(buttonText);
              this.span.textContent = this.n2.toString();
            } else {
              this.n1 = this.n1
                ? parseInt(this.n1 + buttonText)
                : parseInt(buttonText);
              this.span.textContent = this.n1.toString();
            }
          } else if ("+-×÷".indexOf(buttonText) >= 0) {
            this.operation = buttonText;
          } else if ("=".indexOf(buttonText) >= 0) {
            if (this.operation === "+") {
              this.span.textContent = (this.n1 + this.n2).toString();
            } else if (this.operation === "-") {
              this.span.textContent = (this.n1 - this.n2).toString();
            } else if (this.operation === "×") {
              this.span.textContent = (this.n1 * this.n2).toString();
            } else if (this.operation === "÷") {
              this.span.textContent = (this.n1 / this.n2).toFixed(1).toString();
            }
            this.n1 = 0;
            this.n2 = 0;
            this.operation = "";
          } else if (buttonText === "clear") {
            this.span.textContent = "0";
            this.n1 = 0;
            this.n2 = 0;
            this.operation = "";
          }
        }
      });
    }
  }

  new Calculator();
}
