// generating the grid
const grid = document.querySelector('.grid')

//  Specify the width of the grid.
const width = 15
const cells = []
const totalSize = width ** 2


//Initial position of the snake and score 
let snake = [51, 36, 21, 6]
let score = 0





for (let index = 0; index < width ** 2; index++) {
  // ? Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  // ? Number each cell by its index.
  cell.innerHTML = index
  // ? Set the width and height of my cells
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}


//Define the key variables
const startButton = document.querySelector('#start')
const resetButton = document.querySelector('#reset')
const showScore = document.querySelector('.countingPoint')


let direction = 'down'

//setting up the initial position of apple
let applePosition = Math.floor(Math.random() * totalSize)

//Event listener for changing the direction of the snake

document.addEventListener('keyup', (event) => {
  const key = event.key
  if (key === 'ArrowRight' && direction !== 'left') {
    direction = 'right'
  } else if (key === 'ArrowLeft' & direction !== 'right') {
    direction = 'left'
  } else if (key === 'ArrowDown' && direction !== 'up') {
    direction = 'down'
  } else if (key === 'ArrowUp' && direction !== 'down') {
    direction = 'up'
  }
})

// document.addEventListener('keyup', (event) => {
//   const key = event.key
//   if (key === 'ArrowRight' && !(snake % width === width - 1)) {
//     direction = 'right'
//   } else if (key === 'ArrowLeft' && !(snake % width === 0)) {
//     direction = 'left'
//   } else if (key === 'ArrowDown' && !(snake + width >= width ** 2)) {
//     direction = 'down'
//   } else if (key === 'ArrowUp' && !(snake < width)) {
//     direction = 'up'
//   }
// })





// Bug fix not creating multiple intervals
let intervalId = 0




//Interval that keeps the object moving
startButton.addEventListener('click', () => {
  runSnake()
})
function runSnake() {
  // Plot the snake on the grid
  snake.forEach((snakeSkin) => {
    cells[snakeSkin].classList.add('snake')
  })

  if (intervalId !== 0) return
  intervalId = setInterval(() => {

    showApple()
    // console.log(snake)
    snake.forEach((snakeSkin2) => {
      cells[snakeSkin2].classList.remove('snake')
    })


    if (direction === 'right') {

      if (snake[0] % width === width - 1) {
        console.log('Game over')
      } else {
        const newFirstPiece = snake[0] + 1
        snake.pop()
        snake.unshift(newFirstPiece)

        if (snake[0] === applePosition) {
          growSnake()
        }

      }
    } else if (direction === 'left') {
      if (snake[0] % width === 0) {
        console.log('Game over')
      } else {

        const newFirstPiece = snake[0] - 1
        snake.pop()
        snake.unshift(newFirstPiece)
        if (snake[0] === applePosition) {
          growSnake()
        }

      }
    } else if (direction === 'up') {
      if (snake[0] < width) {
        console.log('Game over')
      } else {
        const newFirstPiece = snake[0] - width
        snake.pop()
        snake.unshift(newFirstPiece)
        if (snake[0] === applePosition) {
          growSnake()
        }


      }
    } else if (direction === 'down') {
      if (snake[0] + width >= width ** 2) {
        console.log('Game Over')
      } else {
        const newFirstPiece = snake[0] + width
        snake.pop()
        snake.unshift(newFirstPiece)
        if (snake[0] === applePosition) {
          growSnake()
        }

      }
    }

    snake.forEach((snakeSkin) => {
      cells[snakeSkin].classList.add('snake')
    })
  }, 200)
}

//reset button that resets the whole game and resets snake to initial position
resetButton.addEventListener('click', () => {
  clearInterval(intervalId)
  intervalId = 0
  let score = 0
  showScore.innerHTML = score
  //remove the current snake
  snake.forEach((snakeSkin2) => {
    cells[snakeSkin2].classList.remove('snake')
  })
  //enter where i want to start again with the snake
  snake = [51, 36, 21, 6]
  //make snake appear again
  snake.forEach((snakeSkin2) => {
    cells[snakeSkin2].classList.add('snake')
  })
  //remove apple
  cells[applePosition].classList.remove('apple')


})

//function to update Apple possition


function showApple() {

  cells[applePosition].classList.add('apple')

  // if (cells[applePosition].classList.contains('snake')) {
  //   cells[applePosition].classList.remove('apple')
  //   applePosition = Math.floor(Math.random() * cells.length)

  // } //! this does not add score properly

  if (snake[0] === applePosition) {

    cells[applePosition].classList.remove('apple')
    applePosition = Math.floor(Math.random() * cells.length)

    // array.includes(element,start)  
    while (snake.includes(applePosition)) {
      applePosition = Math.floor(Math.random() * cells.length)
      console.log(applePosition)
      console.log('this is it')
    }



    // // cells[applePosition].classList.add('apple')

    // snake.forEach((snakePart) => {
    //   if (applePosition === snakePart) {
    //     cells[applePosition].classList.remove('apple')
    //     applePosition = Math.floor(Math.random() * cells.length)

    //   }
    // })

    cells[applePosition].classList.add('apple')
    score = score += 100
    showScore.innerHTML = score
  }



}

//logic behind how should the snake grow (it pushes an item at the end of the array)
function growSnake() {

  const lastPiece = snake[snake.length - 1]
  const secondtoLast = snake[snake.length - 2]


  if (lastPiece - secondtoLast === - width) {

    snake.push(snake[snake.length - 1] - width)
  } else if (lastPiece - secondtoLast === 1) {
    snake.push(snake[snake.length - 1] + 1)
  } else if (lastPiece - secondtoLast === - 1) {
    snake.push(snake[snake.length - 1] - 1)
  } else if (lastPiece - secondtoLast === width) {
    snake.push(snake[snake.length - 1] + width)

  }

}


// //function to update Apple possition


// function showApple() {

//   if (cells[applePosition].classList.contains('snake')) {
//     cells[applePosition].classList.remove('apple')
//     applePosition = Math.floor(Math.random() * cells.length)

//   }

//   cells[applePosition].classList.add('apple')

//   if (snake[0] === applePosition) {

//     cells[applePosition].classList.remove('apple')
//     applePosition = Math.floor(Math.random() * cells.length)

//     cells[applePosition].classList.add('apple')
//     score = score += 100
//     showScore.innerHTML = score
//   }



// }