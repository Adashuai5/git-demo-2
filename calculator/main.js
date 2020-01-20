{
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.n1 = "";
            this.operator = "";
            this.n2 = "";
            this.result = "";
            this.createContainer();
            this.createOutput();
            this.createKeys();
            this.eventHub();
        }
        Calculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement("button");
            button.textContent = text;
            if (className) {
                button.className = className;
            }
            container.appendChild(button);
        };
        Calculator.prototype.createContainer = function () {
            this.container = document.createElement("div");
            this.container.classList.add("calculator");
            document.body.appendChild(this.container);
        };
        Calculator.prototype.createOutput = function () {
            this.output = document.createElement("div");
            this.output.classList.add("output");
            this.container.appendChild(this.output);
            this.span = document.createElement("span");
            this.span.textContent = "0";
            this.output.appendChild(this.span);
        };
        Calculator.prototype.createKeys = function () {
            var _this = this;
            var keys = [
                ["clear", "÷"],
                ["7", "8", "9", "×"],
                ["4", "5", "6", "-"],
                ["1", "2", "3", "+"],
                ["0", ".", "="]
            ];
            keys.forEach(function (textList) {
                var div = document.createElement("div");
                div.classList.add("row");
                textList.forEach(function (text) {
                    _this.createButton(text, div, "button text-" + text);
                });
                _this.container.appendChild(div);
            });
        };
        Calculator.prototype.eventHub = function () {
            var _this = this;
            this.container.addEventListener("click", function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var buttonText = event.target.textContent;
                    if ("0123456789.".indexOf(buttonText) >= 0) {
                        _this.operator
                            ? _this.getNumber("n2", buttonText)
                            : _this.getNumber("n1", buttonText);
                    }
                    else if ("+-×÷".indexOf(buttonText) >= 0) {
                        _this.n1 = _this.n1 ? _this.n1 : _this.result;
                        _this.operator = buttonText;
                    }
                    else if ("=".indexOf(buttonText) >= 0) {
                        _this.result = _this.removeZero(_this.getResult(_this.n1, _this.n2, _this.operator));
                        _this.span.textContent = _this.result;
                        _this.n1 = "";
                        _this.n2 = "";
                        _this.operator = "";
                    }
                    else if (buttonText === "clear") {
                        _this.span.textContent = "0";
                        _this.n1 = "";
                        _this.n2 = "";
                        _this.operator = "";
                        _this.result = "";
                    }
                }
            });
        };
        Calculator.prototype.getNumber = function (name, text) {
            this[name] += text;
            this.span.textContent =
                this[name].length > 12
                    ? parseFloat(this[name]).toPrecision(12)
                    : this[name];
        };
        Calculator.prototype.removeZero = function (text) {
            text = /\.\d+?0+$/g.test(text) ? text.replace(/0+$/g, "") : text;
            return text
                .replace(/\.0+$/g, "")
                .replace(/\.0+e/, "e")
                .replace(/0+e/, "e");
        };
        Calculator.prototype.getResult = function (n1, n2, operator) {
            var numberN1 = parseFloat(n1);
            var numberN2 = parseFloat(n2);
            if (operator === "+") {
                return (numberN1 + numberN2).toPrecision(12);
            }
            else if (operator === "-") {
                return (numberN1 - numberN2).toPrecision(12);
            }
            else if (operator === "×") {
                return (numberN1 * numberN2).toPrecision(12);
            }
            else if (operator === "÷") {
                if (numberN2 === 0) {
                    return "不是数字";
                }
                return (numberN1 / numberN2).toPrecision(12);
            }
        };
        return Calculator;
    }());
    new Calculator();
}
