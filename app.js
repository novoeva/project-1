// generating the grid
const grid = document.querySelector('.grid')

//  Specify the width of the grid.
const width = 15
const cells = []
const totalSize = width ** 2


//Initial position of the snake and score 
let snake = [6,21]
let score = 0

//setting up the initial position of apple
let applePosition = Math.floor(Math.random() * totalSize)
// console.log(applePosition)


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

//Event listener for changing the direction of the snake

document.addEventListener('keyup', (event) => {
  const key = event.key
  if (key === 'ArrowRight' && !(snake % width === width - 1)) {
    direction = 'right'
  } else if (key === 'ArrowLeft' && !(snake % width === 0)) {
    direction = 'left'
  } else if (key === 'ArrowDown' && !(snake + width >= width ** 2)) {
    direction = 'down'
  } else if (key === 'ArrowUp' && !(snake < width)) {
    direction = 'up'
  }
})

//Interval that keeps the object moving





startButton.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    // ! 

    cells[snake].classList.add('snake')
    showApple()
   
    // cells[snake].classList.add('snake')

    if (direction === 'right') {

      if (snake % width === width - 1) {
        console.log('Game over')
      } else {
        cells[snake].classList.remove('snake')
        snake += 1
        cells[snake].classList.add('snake')
      }
    } else if (direction === 'left') {
      if (snake % width === 0) {
        console.log('Game over')
      } else {
        cells[snake].classList.remove('snake')
        snake -= 1
        cells[snake].classList.add('snake')
      }
    } else if (direction === 'up') {
      if (snake < width) {
        console.log('Game over')
      } else {
        cells[snake].classList.remove('snake')
        snake -= width
        cells[snake].classList.add('snake')
      }
    } else if (direction === 'down') {
      if (snake + width >= width ** 2) {
        console.log('Game Over')
      } else {
        cells[snake].classList.remove('snake')
        snake += width
        cells[snake].classList.add('snake')
      }
    }
    resetButton.addEventListener('click', () => {
      clearInterval(intervalId)
      score = 100
      //enter where i want to start again with the snake
    })
  }, 300)
})


//function to update Apple possition


function showApple() {

  cells[applePosition].classList.add('apple')

  if (snake === applePosition) {
    score = score += 100
    // const gameScore = score
    console.log(score)
    // console.log(gameScore)
    showScore.innerHTML = score
    
    
   
    cells[applePosition].classList.remove('apple')
    applePosition = Math.floor(Math.random() * cells.length)
    cells[applePosition].classList.add('apple')
  }

 
}


function growSnake () {


  
 

  if (snake === applePosition) {

  snake.push(snake[snake.length-1])

  }
//snake.push


}

forEach()

//i will need two forEach


// startButton.innerHTML = 'Hi'
// 


// // ! This block of code is super common
// cells[snake].classList.remove('snake')
// snake += 1
// cells[snake].classList.add('snake')



// ! hiding code so i dont screw it up
// document.addEventListener('keyup', (event) => {
//   const key = event.key

//   if (key === 'ArrowRight' && !(snake % width === width - 1)) {
//     cells[snake].classList.remove('snake')
//     snake += 1
//     cells[snake].classList.add('snake')
//   // ? This below line if for if you don't want to boundary the whole wall.
//   // } else if (key === 'a' && !(snake === 0)) {
//   } else if (key === 'ArrowLeft' && !(snake % width === 0)) {
//     cells[snake].classList.remove('snake')
//     snake -= 1
//     cells[snake].classList.add('snake')
//   } else if (key === 'ArrowDown' && !(snake + width >= width ** 2)) {
//     cells[snake].classList.remove('snake')
//     snake += width
//     cells[snake].classList.add('snake')
//   } else if (key === 'ArrowUp' && !(snake < width)) {
//     cells[snake].classList.remove('snake')
//     snake -= width
//     cells[snake].classList.add('snake')
//   }
// })