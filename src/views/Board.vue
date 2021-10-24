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
      this.cells[5] = 2
      this.cells[7] = 2
      //startPos = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
      this.cells[12] = 2
      this.cells[9] = 2


    },
    cellsMove(event) {
      event.preventDefault()

      console.log(event)

      if (event.code === "ArrowLeft") {
        this.moveLeft()
      } else if (event.code === "ArrowRight") {
        this.moveRight()
      } else if (event.code === "ArrowUp") {
        this.moveTop()
      } else if (event.code === "ArrowDown") {
        this.moveDown()
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
    rowToCell(tempCells) {
      const newCells = JSON.parse(JSON.stringify(tempCells))

      for(let i = 0; i < tempCells.length; i++) {
        for(let j = 0; j < tempCells[i].length; j++) {
          newCells[j][i] = tempCells[i][j];
        }
      }

      return newCells
    },
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
      this.cells = tempCells.flat()
    },
  moveTop() {
    // Создание двумерного массива с одномерного
    let tempCells = this.chunkArray(this.cells, 4)

    let newCells = this.rowToCell(tempCells)

    // Перебор двумерного массива
    newCells.map((row,rowIndex) => {
      // Перебор одномерного массива который соответствует строке
      for (let i = 0; i < 4; i++) {
        // Если в первой ячейке уже если чисто, то пропустить её
        if (row[i] !== 0 && i !== 0) {
          // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
          if (row[i-1] === 0) {
            // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
            newCells[rowIndex][i-1] = newCells[rowIndex][i]
            // Замена предыдущего элемента который остался после двига на 0
            newCells[rowIndex][i] = 0
            // Возврат для проверки на пустое простанство после сдвигов
            i-=2
          }
        }
      }
    })

    tempCells = this.rowToCell(newCells)

    // Возвращение к одномерному массиву и сохранение данных
    this.cells = tempCells.flat()
  },
  moveDown() {

      console.log("click")
    // Создание двумерного массива с одномерного
    let tempCells = this.chunkArray(this.cells, 4)

    let newCells = this.rowToCell(tempCells)

    // Перебор двумерного массива
    newCells.map((row,rowIndex) => {
      // Перебор одномерного массива который соответствует строке
      for (let i = 3; i >= 0; i--) {
        // Если в первой ячейке уже если чисто, то пропустить её
        if (row[i] !== 0 && i !== 4) {
          // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
          if (row[i+1] === 0) {
            // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
            newCells[rowIndex][i+1] = newCells[rowIndex][i]
            // Замена предыдущего элемента который остался после двига на 0
            newCells[rowIndex][i] = 0
            // Возврат для проверки на пустое простанство после сдвигов
            i+=2
          }
        }
      }
    })

    tempCells = this.rowToCell(newCells)

    // Возвращение к одномерному массиву и сохранение данных
    this.cells = tempCells.flat()
  }
  },
  name: 'Board',
  components: {
    Cell
  }
}
</script>

