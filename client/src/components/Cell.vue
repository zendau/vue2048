<template>
  <div class="cell">
    <p ref="cell" v-bind:class="[cellData === 0 ? 'cell-data' : 'cell-data--active']">
      {{ cellNumber }}
    </p>
  </div>
</template>

<script>
export default {
  inject: ['colors'],
  props: {
    cellData: Number
  },
  updated() {
    // eslint-disable-next-line no-debugger
    debugger
    if (this.cellData !== 0) {
      this.$refs.cell.style.backgroundColor = this.colors[this.cellData]
    } else {
      this.$refs.cell.style.backgroundColor = 'rgba(238, 228, 218, 0.35)'
    }

  },
  computed: {
    cellNumber() {
      return this.cellData !== 0 ? this.cellData : ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cell {
  width: 100px;
  height: 100px;
  border: 1px solid black;
  box-sizing: border-box;
}

.cell-data {
  background-color: rgba(238, 228, 218, 0.35);
  ;
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 24px;
  text-align: center;
  line-height: 98px;

  &--active {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #eee4da;
    font-size: 24px;
    text-align: center;
    line-height: 98px;
  }

}

@media (max-width: 720px) {
  .cell {
    width: 75px;
    height: 75px;
  }
}
</style>
