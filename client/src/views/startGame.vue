<template>
  <div class="container">
    <label for="username">Write your username</label>
    <input type="text" id="username" v-model="username">
    <button @click="createGame">Start game</button>
  </div>
</template>

<script>
export default {
  name: "startGame",
  data() {
    return {
      username: ""
    }
  },
  methods: {
    createGame() {
      this.$router.push({ name: "Board", params: {username: this.username}})
    }
  }
}
</script>

<style scoped>

</style>