{
  class Calculator {
    public container: HTMLDivElement;
    private output: HTMLDivElement;
    private span: HTMLSpanElement;
    public n1: string = "";
    public operator: string = "";
    public n2: string = "";
    public result: string = "";

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

          if ("0123456789.".indexOf(buttonText) >= 0) {
            this.operator
              ? this.getNumber("n2", buttonText)
              : this.getNumber("n1", buttonText);
          } else if ("+-×÷".indexOf(buttonText) >= 0) {
            this.n1 = this.n1 ? this.n1 : this.result;
            this.operator = buttonText;
          } else if ("=".indexOf(buttonText) >= 0) {
            this.result = this.removeZero(
              this.getResult(this.n1, this.n2, this.operator)
            );
            this.span.textContent = this.result;
            this.n1 = "";
            this.n2 = "";
            this.operator = "";
          } else if (buttonText === "clear") {
            this.span.textContent = "0";
            this.n1 = "";
            this.n2 = "";
            this.operator = "";
            this.result = "";
          }
        }
      });
    }

    getNumber(name: string, text: string): void {
      this[name] += text;
      this.span.textContent =
        this[name].length > 12
          ? parseFloat(this[name]).toPrecision(12)
          : this[name];
    }
    removeZero(text: string) {
      text = /\.\d+?0+$/g.test(text) ? text.replace(/0+$/g, "") : text;
      return text
        .replace(/\.0+$/g, "")
        .replace(/\.0+e/, "e")
        .replace(/0+e/, "e");
    }
    getResult(n1: string, n2: string, operator: string): string {
      let numberN1: number = parseFloat(n1);
      let numberN2: number = parseFloat(n2);
      if (operator === "+") {
        return (numberN1 + numberN2).toPrecision(12);
      } else if (operator === "-") {
        return (numberN1 - numberN2).toPrecision(12);
      } else if (operator === "×") {
        return (numberN1 * numberN2).toPrecision(12);
      } else if (operator === "÷") {
        if (numberN2 === 0) {
          return "不是数字";
        }
        return (numberN1 / numberN2).toPrecision(12);
      }
    }
  }

  new Calculator();
}
