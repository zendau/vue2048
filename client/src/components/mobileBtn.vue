<template>
  <button><span class="material-icons">{{getBtnData}}</span></button>
</template>

<script>
export default {
  name: "mobileBtn",
  props: {
    btnText: {
      type: String,
      require: true,
      validator(value) {
        return ['top', "down", "left", "right"].indexOf(value) !== -1
      },
    }
  },
  computed: {
    getBtnData() {
      if (this.btnText === "top") {
        return "arrow_upward"
      } else if (this.btnText === "down") {
        return "arrow_downward"
      } else if (this.btnText === "left") {
        return "arrow_back"
      } else if (this.btnText === "right") {
        return "arrow_forward"
      } else {
        return ""
      }
    }
  }
}
</script>

<style scoped>
  button {
    width: 50px;
    height: 50px;
  }
</style>