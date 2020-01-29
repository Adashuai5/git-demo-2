<template>
  <div>
    <input v-model="listText" />
    <button @click="addList" :disabled="!listText">添加</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class NewList extends Vue {
  listText = "";
  addList() {
    this.$emit("addNewList", this.listText);
    this.listText = "";
  }
}
</script>