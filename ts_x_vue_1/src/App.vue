<template>
  <div id="app">
    <div class="todoList">
      <NewList @addNewList="addList"></NewList>
      <TodoList :todoList="list" @updateTodo="updateList"></TodoList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import NewList from "./components/NewList.vue";
import TodoList from "./components/TodoList.vue";
import Todo from "./modules/index";

@Component({
  components: {
    NewList,
    TodoList
  },
  watch: {
    list(newValue: Array<Todo>) {
      let string = JSON.stringify(newValue);
      window.localStorage.setItem("todoListData", string);
    }
  }
})
export default class App extends Vue {
  list: Array<Todo> =
    JSON.parse(<string>localStorage.getItem("todoListData")) || [];
  addList(name: string) {
    this.list.push({ name: name, status: "todo" });
  }
  updateList(todo: Tode, part: Partial<Todo>) {
    let index = this.list.indexOf(todo);
    this.list.splice(index, 1, Object.assign({}, todo, part));
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .todoList {
    padding: 20px;
    border: 1px solid #ddd;
  }
}
* {
  padding: 0;
  margin: 0;
}
ul,
ol {
  list-style: none;
}
</style>
