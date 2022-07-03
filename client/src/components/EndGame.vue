<template>
  <div>
    <div class="overlay"></div>
    <div class="container">
      <h1>Game over</h1>
      <button @click="resetClick">Try again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndGame",
  emits: ["resetGame"],
  beforeMount() {
    var audio = new Audio('dark-souls-death.mp3');
    audio.play();
  },
  methods: {
    resetClick() {
      this.$emit("resetGame")
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: gray;
  opacity: .3;
}

.container {

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);



  z-index: 200;
  height: 160px;
  background-color: black;
  width: 100%;
  box-shadow: 0 0 5px 10px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #ab1313;
  z-index: 100;
  font-size: 40px;
}

button {
  border: none;
  border-radius: 6px;
  width: 150px;
  height: 40px;
  font-size: 28px;
  cursor: pointer;
  margin: 15px 0;
  background-color: #8E0505;
  color: #fff;
  padding: 5px;
  transition: .5s;

  &:hover {
    background-color: #E02401;
  }

}
</style>