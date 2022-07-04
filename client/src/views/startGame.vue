<template>
  <div class="container">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">User name</label>
      <input type="text" class="form-control" id="username" v-model.trim="userName" placeholder="user">
    </div>
    <button class="btn btn-secondary" @click="createGame" :disabled="userName.length === 0">Start game</button>
  </div>
</template>

<script>
export default {
  name: "startGame",
  inject: ['update'],
  data() {
    return {
      userName: ""
    }
  },
  methods: {
    createGame() {
      this.$router.push({ name: "game", params: { userName: this.userName } })
    }
  }
}
</script>

<style scoped>
.container {
  width: 400px;
  margin-top: 35px;
}

.btn {
  display: block;
  margin: 0 auto;
}

.btn:disabled, .btn[disabled] {
  cursor: not-allowed;
  pointer-events: all;
}

@media (max-width: 720px) {
  .container {
    width: 350px;
    margin-top: 35px;
  }

}
</style>