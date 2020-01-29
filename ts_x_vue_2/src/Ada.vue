<template>
  <div>
    {{number}}
    <button @click="add">+1</button>
    <button @click="minus">-1</button>
  </div>
</template>
<script lang='ts'>
export default {
  name: "ada",
  data() {
    return {
      number: 0
    };
  },
  methods: {
    add() {
      this.number += 1;
    },
    minus() {
      this.number -= 1;
    }
  }
};
</script>