<template>
  <h1 class="score">Score - {{ globalScore }}</h1>
  <h2 class="score">Best score - {{ bestScore }}</h2>
  <div class="board">
    <Cell v-for="(item, index) in cells" :key="index" :cellData="item" />
  </div>
  <EndGame v-if="endGame" @resetGame="resetGame" />
  <mobile-area @btnEvent="clickMoveBtn" />
</template>

<script>
// @ is an alias to /src
import Cell from '@/components/Cell.vue'
import EndGame from "../components/EndGame.vue";
import MobileArea from "../components/mobileArea";
import $api from "../axios";

export default {
  data() {
    return {
      cells: [],
      globalScore: 0,
      bestScore: 0,
      lockHorizontal: false,
      lockVertical: false,
      endGame: false,
      username: "",
      colors: {},
    }
  },
  provide() {
    return {
      colors: this.colors
    }
  },
  mounted() {

    this.username = this.$route.params.userName

    if (this.username === undefined) {
      this.$router.push('/')
    }

    this.initCells()
    window.addEventListener('keydown', this.cellsMove);

  },
  unmounted() {
    window.removeEventListener('keydown', this.cellsMove);
  },
  methods: {
    setColor(cell) {

      this.r = Math.floor(Math.random() * 255);
      this.g = Math.floor(Math.random() * 255);
      this.b = Math.floor(Math.random() * 255);


      let color = this.colors[cell]
      if (color === undefined) {
        color = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',0.8)';
        this.colors[cell] = color
      }
      return color
    },
    initCells() {

      this.cells = Array(16).fill(0)
      this.randomCell()
      this.randomCell()

      this.colors[2] = '#eee4da';
      this.getBestScore()

      this.lockVertical = false
      this.lockHorizontal = false
      this.globalScore = 0
      this.endGame = false

    },
    clickMoveBtn(title) {
      if (title === "left") {
        this.moveLeft()
        this.randomCell()
      } else if (title === "right") {
        this.moveRight()
        this.randomCell()
      } else if (title === "top") {
        this.moveTop()
        this.randomCell()
      } else if (title === "down") {
        this.moveDown()
        this.randomCell()
      }
    },
    cellsMove(event) {

      event.preventDefault()

      if (event.code === "ArrowLeft") {
        this.moveLeft()
        this.randomCell()
      } else if (event.code === "ArrowRight") {
        this.moveRight()
        this.randomCell()
      } else if (event.code === "ArrowUp") {
        this.moveTop()
        this.randomCell()
      } else if (event.code === "ArrowDown") {
        this.moveDown()
        this.randomCell()
      }

      event.stopPropagation()

    },
    chunkArray(arr, cnt) { return arr.reduce((prev, cur, i, a) => !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev, []) },
    rowToCell(tempCells) {
      const newCells = JSON.parse(JSON.stringify(tempCells))

      for (let i = 0; i < tempCells.length; i++) {
        for (let j = 0; j < tempCells[i].length; j++) {
          newCells[j][i] = tempCells[i][j];
        }
      }

      return newCells
    },
    combaineCellsLeft(tempCells) {

      tempCells.forEach(row => {
        for (let i = 3; i >= 0; i--) {
          if (row[i] === row[i - 1] && row[i] !== 0) {
            row[i - 1] = row[i] * 2
            this.setColor(row[i - 1])
            this.globalScore += row[i] * 2
            this.lockHorizontal = false
            this.lockVertical = false
            row[i] = 0
          }
        }
      })


      return tempCells
    },
    combaineCellsRight(tempCells) {

      tempCells.forEach(row => {
        for (let i = 0; i < 4; i++) {
          if (row[i] === row[i + 1] && row[i] !== 0) {
            row[i + 1] = row[i] * 2
            this.setColor(row[i + 1])
            this.globalScore += row[i] * 2
            this.lockHorizontal = false
            this.lockVertical = false
            row[i] = 0
          }
        }
      })


      return tempCells
    },
    randomCell() {
      let rndPos

      const emptyCells = this.cells.reduce((arr, value, currIndex) => {

        if (value === 0) {
          arr.push(currIndex)
        }

        return arr

      }, [])

      if (emptyCells.length === 0) {

        if (this.lockHorizontal && this.lockVertical) {
         this.losedGame()
        }

      } else {
        rndPos = Math.floor(Math.random() * emptyCells.length)
        this.cells[emptyCells[rndPos]] = 2
      }
    },
    setBestScore() {

      if (this.globalScore > this.bestScore) {
        localStorage.setItem("score", this.globalScore)
      }
    },
    getBestScore() {
      this.bestScore = localStorage.getItem("score")

    },
    moveLeft() {

      // Создание двумерного массива с одномерного
      let tempCells = this.chunkArray(this.cells, 4)

      // Перебор двумерного массива
      tempCells.map((row, rowIndex) => {
        // Перебор одномерного массива который соответствует строке
        for (let i = 0; i < 4; i++) {
          // Если в первой ячейке уже если чисто, то пропустить её
          if (row[i] !== 0 && i !== 0) {
            // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
            if (row[i - 1] === 0) {
              // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
              tempCells[rowIndex][i - 1] = tempCells[rowIndex][i]
              // Замена предыдущего элемента который остался после двига на 0
              tempCells[rowIndex][i] = 0
              // Возврат для проверки на пустое простанство после сдвигов
              i -= 2
            }
          }
        }
      })

      tempCells = this.combaineCellsLeft(tempCells).flat()
      this.lockHorizontal = this.cells.join() === tempCells.join()

      // Возвращение к одномерному массиву и сохранение данных
      this.cells = tempCells

    },
    moveRight() {

      // Создание двумерного массива с одномерного
      let tempCells = this.chunkArray(this.cells, 4)

      // Перебор двумерного массива
      tempCells.map((row, rowIndex) => {
        // Перебор одномерного массива который соответствует строке
        for (let i = 3; i >= 0; i--) {
          // Если в первой ячейке уже если чисто, то пропустить её
          if (row[i] !== 0 && i !== 4) {
            // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
            if (row[i + 1] === 0) {
              // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
              tempCells[rowIndex][i + 1] = tempCells[rowIndex][i]
              // Замена предыдущего элемента который остался после двига на 0
              tempCells[rowIndex][i] = 0
              // Возврат для проверки на пустое простанство после сдвигов
              i += 2
            }
          }
        }
      })

      tempCells = this.combaineCellsRight(tempCells).flat()
      this.lockHorizontal = this.cells.join() === tempCells.join()

      // Возвращение к одномерному массиву и сохранение данных
      this.cells = tempCells
    },
    moveTop() {
      // Создание двумерного массива с одномерного
      let tempCells = this.chunkArray(this.cells, 4)

      let newCells = this.rowToCell(tempCells)

      // Перебор двумерного массива
      newCells.map((row, rowIndex) => {
        // Перебор одномерного массива который соответствует строке
        for (let i = 0; i < 4; i++) {
          // Если в первой ячейке уже если чисто, то пропустить её
          if (row[i] !== 0 && i !== 0) {
            // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
            if (row[i - 1] === 0) {
              // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
              newCells[rowIndex][i - 1] = newCells[rowIndex][i]
              // Замена предыдущего элемента который остался после двига на 0
              newCells[rowIndex][i] = 0
              // Возврат для проверки на пустое простанство после сдвигов
              i -= 2
            }
          }
        }
      })

      const test = this.combaineCellsLeft(newCells)
      tempCells = this.rowToCell(test).flat()

      this.lockVertical = this.cells.join() === tempCells.join()
      // Возвращение к одномерному массиву и сохранение данных
      this.cells = tempCells
    },
    moveDown() {

      // Создание двумерного массива с одномерного
      let tempCells = this.chunkArray(this.cells, 4)

      let newCells = this.rowToCell(tempCells)

      // Перебор двумерного массива
      newCells.map((row, rowIndex) => {
        // Перебор одномерного массива который соответствует строке
        for (let i = 3; i >= 0; i--) {
          // Если в первой ячейке уже если чисто, то пропустить её
          if (row[i] !== 0 && i !== 4) {
            // Выполнитель действие если предыдущая ячейка равна нулю и можно произвести сдвиг
            if (row[i + 1] === 0) {
              // Замена элемента который стоит впереди смещаемого элемента на смещаемый элемент
              newCells[rowIndex][i + 1] = newCells[rowIndex][i]
              // Замена предыдущего элемента который остался после двига на 0
              newCells[rowIndex][i] = 0
              // Возврат для проверки на пустое простанство после сдвигов
              i += 2
            }
          }
        }
      })

      tempCells = this.rowToCell(this.combaineCellsRight(newCells)).flat()

      this.lockVertical = this.cells.join() === tempCells.join()

      // Возвращение к одномерному массиву и сохранение данных
      this.cells = tempCells
    },
    resetGame() {
      this.initCells()
    },
    losedGame() {
      this.endGame = true

      const data = {
        username: this.username,
        score: this.globalScore
      }

      $api.post("/top/addPlayer", data).then(res => console.log(res))
      this.setBestScore()
    }

  },
  name: 'Board',
  components: {
    MobileArea,
    Cell, EndGame
  }
}
</script>

<style scoped lang="scss">
.board {
  margin: 0 auto;
  width: 400px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.score {
  text-align: center;
  margin: 10px 0;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.8rem;
}

@media (max-width: 720px) {
  .board {
    width: 300px;
  }    
}

</style>