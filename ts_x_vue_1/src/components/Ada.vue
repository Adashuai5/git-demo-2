<template>
  <div>
    I am Ada!
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class Ada extends Vue {}
</script>