// generating the grid
const grid = document.querySelector('.grid')

//  Specify the width of the grid.
const width = 15
const cells = []


//Initial position of the snake
let snake = 6


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


let direction = ''

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


// let applePosition = 33

// cells[applePosition].classList.add('apple')



startButton.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    // ! 

    cells[snake].classList.add('snake')

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

  }, 500)
})






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