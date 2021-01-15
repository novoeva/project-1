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


//Event listener for changing the direction of the snake

document.addEventListener('keyup', (event) => {
  const key = event.key

  if (key === 'ArrowRight' && !(snake % width === width - 1)) {
    cells[snake].classList.remove('snake')
    snake += 1
    cells[snake].classList.add('snake')
  // ? This below line if for if you don't want to boundary the whole wall.
  // } else if (key === 'a' && !(snake === 0)) {
  } else if (key === 'ArrowLeft' && !(snake % width === 0)) {
    cells[snake].classList.remove('snake')
    snake -= 1
    cells[snake].classList.add('snake')
  } else if (key === 'ArrowDown' && !(snake + width >= width ** 2)) {
    cells[snake].classList.remove('snake')
    snake += width
    cells[snake].classList.add('snake')
  } else if (key === 'ArrowUp' && !(snake < width)) {
    cells[snake].classList.remove('snake')
    snake -= width
    cells[snake].classList.add('snake')
  }
})

//Interval that keeps the object moving

// let direction =  right


let applePosition = 33

// cells[applePosition].classList.add('apple')



startButton.addEventListener('click', () => {
  const intervalId = setInterval(() => {
    // ! 
    

    cells[applePosition].classList.remove('apple')
  
    applePosition -= +1
    cells[applePosition].classList.add('apple')

  }, 800)
})






// // ! This block of code is super common
// cells[snake].classList.remove('snake')
// snake += 1
// cells[snake].classList.add('snake')
