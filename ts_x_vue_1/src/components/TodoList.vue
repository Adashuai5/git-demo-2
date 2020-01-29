<template>
  <div>
    <ul v-for="(todoItem,index) in todoList" :key="index">
      <li>
        <input
          type="checkbox"
          :checked="todoItem.status === 'done'"
          @change="changeStatus(todoItem, $event)"
        />
        {{todoItem.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Todo from "@/modules/index";

@Component({
  props: {
    todoList: Array
  }
})
export default class TodoList extends Vue {
  changeStatus(todoItem: Array<Todo>, e: Event) {
    let checked = (<HTMLInputElement>e.target).checked;
    this.$emit("updateTodo", todoItem, { status: checked ? "done" : "todo" });
  }
}
</script>