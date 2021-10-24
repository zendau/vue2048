<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      cells: []
    }
  },
  mounted() {
    this.initCells()
    console.log(this.cells)
  },
  methods: {
    initCells() {

      const minimum = 0
      const maximum = 15

      this.cells = Array(16).fill(0)

      const startPos = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

      this.cells[startPos] = 2


    }
  },
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
