{
    function createButton(text, container, className) {
        var button = document.createElement("button");
        button.textContent = text;
        if (className) {
            button.className = className;
        }
        container.appendChild(button);
    }
    var container_1 = document.createElement("div");
    container_1.classList.add("calculator");
    document.body.appendChild(container_1);
    var output = document.createElement("div");
    output.classList.add("output");
    container_1.appendChild(output);
    var span_1 = document.createElement("span");
    span_1.textContent = "0";
    output.appendChild(span_1);
    var n1_1, operation_1, n2_1;
    container_1.addEventListener("click", function (event) {
        if (event.target instanceof HTMLButtonElement) {
            var buttonText = event.target.textContent;
            if ("0123456789".indexOf(buttonText) >= 0) {
                if (operation_1) {
                    n2_1 = n2_1 ? parseInt(n2_1 + buttonText) : parseInt(buttonText);
                    span_1.textContent = n2_1.toString();
                }
                else {
                    n1_1 = n1_1 ? parseInt(n1_1 + buttonText) : parseInt(buttonText);
                    span_1.textContent = n1_1.toString();
                }
            }
            else if ("+-×÷".indexOf(buttonText) >= 0) {
                operation_1 = buttonText;
            }
            else if ("=".indexOf(buttonText) >= 0) {
                if (operation_1 === "+") {
                    span_1.textContent = (n1_1 + n2_1).toString();
                }
                else if (operation_1 === "-") {
                    span_1.textContent = (n1_1 - n2_1).toString();
                }
                else if (operation_1 === "×") {
                    span_1.textContent = (n1_1 * n2_1).toString();
                }
                else if (operation_1 === "÷") {
                    span_1.textContent = (n1_1 / n2_1).toFixed(1).toString();
                }
                n1_1 = 0;
                n2_1 = 0;
                operation_1 = "";
            }
            else if (buttonText === "clear") {
                span_1.textContent = "0";
                n1_1 = 0;
                n2_1 = 0;
                operation_1 = "";
            }
        }
    });
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
            createButton(text, div, "button text-" + text);
        });
        container_1.appendChild(div);
    });
}
