{
    var Calculator = /** @class */ (function () {
        function Calculator() {
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
                    if ("0123456789".indexOf(buttonText) >= 0) {
                        if (_this.operation) {
                            _this.n2 = _this.n2
                                ? parseInt(_this.n2 + buttonText)
                                : parseInt(buttonText);
                            _this.span.textContent = _this.n2.toString();
                        }
                        else {
                            _this.n1 = _this.n1
                                ? parseInt(_this.n1 + buttonText)
                                : parseInt(buttonText);
                            _this.span.textContent = _this.n1.toString();
                        }
                    }
                    else if ("+-×÷".indexOf(buttonText) >= 0) {
                        _this.operation = buttonText;
                    }
                    else if ("=".indexOf(buttonText) >= 0) {
                        if (_this.operation === "+") {
                            _this.span.textContent = (_this.n1 + _this.n2).toString();
                        }
                        else if (_this.operation === "-") {
                            _this.span.textContent = (_this.n1 - _this.n2).toString();
                        }
                        else if (_this.operation === "×") {
                            _this.span.textContent = (_this.n1 * _this.n2).toString();
                        }
                        else if (_this.operation === "÷") {
                            _this.span.textContent = (_this.n1 / _this.n2).toFixed(1).toString();
                        }
                        _this.n1 = 0;
                        _this.n2 = 0;
                        _this.operation = "";
                    }
                    else if (buttonText === "clear") {
                        _this.span.textContent = "0";
                        _this.n1 = 0;
                        _this.n2 = 0;
                        _this.operation = "";
                    }
                }
            });
        };
        return Calculator;
    }());
    new Calculator();
}
