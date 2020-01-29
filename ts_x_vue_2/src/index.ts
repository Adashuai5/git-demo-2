import Vue from "vue";
import Ada from "./Ada.vue";

let div = document.createElement("div");
div.id = "ada";
document.body.appendChild(div);

new Vue({
  render: (h) => h(Ada)
}).$mount("#ada");
