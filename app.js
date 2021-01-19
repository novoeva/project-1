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
  if (key === 'ArrowRight') {
    direction = 'right'
  } else if (key === 'ArrowLeft') {
    direction = 'left'
  } else if (key === 'ArrowDown') {
    direction = 'down'
  } else if (key === 'ArrowUp') {
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



// Plot the snake on the grid
snake.forEach((snakeSkin) => {
  cells[snakeSkin].classList.add('snake')
})



//Interval that keeps the object moving
startButton.addEventListener('click', () => {
  const intervalId = setInterval(() => {

    showApple()
    console.log(snake)
    snake.forEach((snakeSkin2) => {
      cells[snakeSkin2].classList.remove('snake')
    })


    // snake.forEach((snakePart, i) => {

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
        // cells[snakePart].classList.remove('snake')
        const newFirstPiece = snake[0] - width
        snake.pop()
        snake.unshift(newFirstPiece)
        // cells[snakePart].classList.add('snake')
        if (snake[0] === applePosition) {
          growSnake()
        }


      }
    } else if (direction === 'down') {
      if (snake[0] + width >= width ** 2) {
        console.log('Game Over')
      } else {

        // // if (snake[0] = applePosition) {
        // //   snake.push(snake[0] - (snake.lenght * width))
        // // }
        // cells[snakePart].classList.remove('snake')
        const newFirstPiece = snake[0] + width
        snake.pop()
        snake.unshift(newFirstPiece)
        // cells[snakePart].classList.add('snake')
        if (snake[0] === applePosition) {
          growSnake()
        }

      }
    }
    // })
    snake.forEach((snakeSkin) => {
      cells[snakeSkin].classList.add('snake')
    })


    resetButton.addEventListener('click', () => {
      clearInterval(intervalId)
      score = 0
      //enter where i want to start again with the snake
      let snake = [51, 36]
    })
  }, 200)
})


//function to update Apple possition


function showApple() {

  cells[applePosition].classList.add('apple')

  if (snake[0] === applePosition) {

    cells[applePosition].classList.remove('apple')
    applePosition = Math.floor(Math.random() * cells.length)
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










// function growSnake() {
//   if (snake === applePosition) {

//     snake.push(snake[snake.length - 1])

//   }
// //   //snake.push


// // }



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


// startButton.addEventListener('click', () => {
//   const intervalId = setInterval(() => {

//     showApple()

//     snake.forEach((snakePart, i) => {

//       if (direction === 'right') {

//         if (snakePart % width === width - 1) {
//           console.log('Game over')
//         } else {
//           cells[snakePart].classList.remove('snake')
//           snake[i] += 1
//           cells[snakePart += 1].classList.add('snake')
//         }
//       } else if (direction === 'left') {
//         if (snakePart % width === 0) {
//           console.log('Game over')
//         } else {
//           cells[snakePart].classList.remove('snake')
//           snake[i] -= 1
//           cells[snakePart -= 1].classList.add('snake')
//         }
//       } else if (direction === 'up') {
//         if (snakePart < width) {
//           console.log('Game over')
//         } else {
//           cells[snakePart].classList.remove('snake')
//           snake[i] -= width
//           cells[snakePart -= width].classList.add('snake')
//         }
//       } else if (direction === 'down') {
//         if (snakePart + width >= width ** 2) {
//           console.log('Game Over')
//         } else {
//           cells[snakePart].classList.remove('snake')
//           snake[i] += width
//           cells[snakePart += width].classList.add('snake')
//           // if (snake[0] = applePosition) {
//           //   snake.push(snake[0] - (snake.lenght * width))
//           // }
//         }
//       }
//     })


//     resetButton.addEventListener('click', () => {
//       clearInterval(intervalId)
//       score = 0
//       //enter where i want to start again with the snake
//       let snake = [51, 36]
//     })
//   }, 300)
// })