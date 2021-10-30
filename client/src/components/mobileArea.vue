<template>
  <div class="container">
    <mobile-btn @click="btnClick('top')" btn-text="top" />
    <mobile-btn @click="btnClick('down')" btn-text="down" />
    <mobile-btn @click="btnClick('left')" btn-text="left" />
    <mobile-btn @click="btnClick('right')" btn-text="right" />
  </div>
</template>

<script>

import mobileBtn from "./mobileBtn";

export default {
  name: "mobileArea",
  components: {
    mobileBtn
  },
  methods: {
    btnClick(title) {
      this.$emit("btnEvent", title)
    }
  }
}
</script>

<style scoped>
  .container {
    width: 300px;
    margin: 15px auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
  }
</style>