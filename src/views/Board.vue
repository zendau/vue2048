<template>
  <div class="board">
    <Cell v-for="(item, index) in cells" :key="index" :cellData="item"/>
  </div>
</template>

<style scoped lang="scss">
.board {
  margin: 0 auto;
  width: 400px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>

<script>
// @ is an alias to /src
import Cell from '@/components/Cell.vue'

export default {
  data() {
    return {
      cells: []
    }
  },
  mounted() {
    this.initCells()
    console.log(this.cells)

    window.addEventListener('keydown', this.cellsMove);

  },
  methods: {
    initCells() {

      //const minimum = 0
      //const maximum = 15

      this.cells = Array(16).fill(0)
      //let startPos = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
      this.cells[0] = 2
      this.cells[1] = 2
      //startPos = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
      this.cells[4] = 2
      this.cells[9] = 2


    },
    cellsMove(event) {
      event.preventDefault()
      if (event.code === "ArrowLeft") {
        this.moveLeft()
      } else if (event.code === "ArrowRight") {
        this.moveRight()
      }
    },
    moveLeft() {

      // Создание двумерного массива с одномерного
      const tempCells = this.chunkArray(this.cells, 4)

      // Перебор двумерного массива
      tempCells.map((row,rowIndex) => {
        // Перебор одномерного массива который соответствует строке
        for (let i = 0; i < 4; i++) {
          // Если в первой ячейке уже если чисто, то пропустить её
          if (row[i] !== 0 && i !== 0) {
            // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
            if (row[i-1] === 0) {
              // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
              tempCells[rowIndex][i-1] = tempCells[rowIndex][i]
              // Замена предыдущего элемента который остался после двига на 0
              tempCells[rowIndex][i] = 0
              // Возврат для проверки на пустое простанство после сдвигов
              i-=2
            }
          }
        }
      })

      // Возвращение к одномерному массиву и сохранение данных
      this.cells = tempCells.flat()
    },
    chunkArray(arr, cnt) { return  arr.reduce((prev, cur, i, a) => !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev, [])},
    moveRight() {

      // Создание двумерного массива с одномерного
      const tempCells = this.chunkArray(this.cells, 4)

      // Перебор двумерного массива
      tempCells.map((row,rowIndex) => {
        // Перебор одномерного массива который соответствует строке
        for (let i = 3; i >= 0; i--) {
          // Если в первой ячейке уже если чисто, то пропустить её
          if (row[i] !== 0 && i !== 4) {
            // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
            if (row[i+1] === 0) {
              // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
              tempCells[rowIndex][i+1] = tempCells[rowIndex][i]
              // Замена предыдущего элемента который остался после двига на 0
              tempCells[rowIndex][i] = 0
              // Возврат для проверки на пустое простанство после сдвигов
              i+=2
            }
          }
        }
      })

      // Возвращение к одномерному массиву и сохранение данных
      console.log(tempCells)
      this.cells = tempCells.flat()
    }
  },
  name: 'Board',
  components: {
    Cell
  }
}
</script>

