<template>
  <div>
    <div class="overlay"></div>
    <div class="end-container">
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

.end-container {

  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  z-index: 200;
  height: 160px;
  background-color: #F7D3BA;
  width: 500px;
  box-shadow: 0 0 5px 10px #F7D3BA;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #F73859;
  z-index: 100;
  font-size: 40px;
}

button {
  border: none;
  border-radius: 6px;
  width: 150px;
  font-size: 28px;
  cursor: pointer;
  margin: 15px 0;
  background-color: #347474;
  color: #fff;
  transition: .5s;

  &:hover {
    background-color: #63B7AF;
  }

}
</style>