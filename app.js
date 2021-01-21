// generating the grid
const grid = document.querySelector('.grid')

//  Specify the width of the grid.
const width = 15
const cells = []
const totalSize = width ** 2


//Initial position of the snake and score 
let snake = [51, 36, 21, 6]
let score = 0
let checkSelfEating = false
let gameSpeed = 400




for (let index = 0; index < width ** 2; index++) {
  // ? Generate each element
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  // ? Number each cell by its index.
  // cell.innerHTML = index
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

  if (checkSelfEating === false) {

    if (key === 'ArrowRight' && direction !== 'left') {
      direction = 'right'
      checkSelfEating = true
    } else if (key === 'ArrowLeft' & direction !== 'right') {
      direction = 'left'
      checkSelfEating = true
    } else if (key === 'ArrowDown' && direction !== 'up') {
      direction = 'down'
      checkSelfEating = true
    } else if (key === 'ArrowUp' && direction !== 'down') {
      direction = 'up'
      checkSelfEating = true
    }


  } else {
    return
  }

})



// Bug fix not creating multiple intervals
let intervalId = 0




//Interval that keeps the object moving
startButton.addEventListener('click', () => {
  if (intervalId !== 0) return
  runSnake()
})
function runSnake() {
  console.log('function starts')
  // Plot the snake on the grid
  snake.forEach((snakeSkin) => {
    cells[snakeSkin].classList.add('snake')
  })
  //check so only one interval at the time
  // if (intervalId !== 0) return
  //interval
  intervalId = setInterval(() => {
    checkSelfEating = false
    showApple()

    console.log(snake)
    snake.forEach((snakeSkin2) => {
      cells[snakeSkin2].classList.remove('snake')
    })


    if (direction === 'right') {

      if (snake[0] % width === width - 1) {
        console.log('Game over')
      } else {
        const newFirstPiece = snake[0] + 1
        snake.unshift(newFirstPiece)

        if (snake[0] === applePosition) {
          // growSnake()
          console.log('eaten from right')
          console.log(gameSpeed)
          showApple()
          //speeding up the game
          gameSpeed -= 5
          console.log(gameSpeed)
          clearInterval(intervalId)
          runSnake()
        } else {
          snake.pop()
        }
        if (cells[snake[0]].classList.contains('unicorn')) {
          showUnicorn()
        }

      }
    } else if (direction === 'left') {
      if (snake[0] % width === 0) {
        console.log('Game over')
      } else {

        const newFirstPiece = snake[0] - 1
        snake.unshift(newFirstPiece)


        if (snake[0] === applePosition) {
          // growSnake()
          console.log('eaten from left')
          console.log(gameSpeed)
          showApple()
          //speeding up the game
          gameSpeed -= 5
          console.log(gameSpeed)
          clearInterval(intervalId)
          runSnake()
        } else {
          snake.pop()
        }
        if (cells[snake[0]].classList.contains('unicorn')) {
          showUnicorn()
        }

      }
    } else if (direction === 'up') {
      if (snake[0] < width) {
        console.log('Game over')
      } else {
        const newFirstPiece = snake[0] - width


        snake.unshift(newFirstPiece)
        if (snake[0] === applePosition) {
          // growSnake()
          console.log('eaten from down')
          console.log(gameSpeed)
          showApple()
          //speeding up the game
          gameSpeed -= 5
          console.log(gameSpeed)
          clearInterval(intervalId)
          runSnake()
        } else {
          snake.pop()
        }
        if (cells[snake[0]].classList.contains('unicorn')) {
          showUnicorn()
        }


      }
    } else if (direction === 'down') {
      if (snake[0] + width >= width ** 2) {
        console.log('Game Over')
      } else {
        const newFirstPiece = snake[0] + width


        snake.unshift(newFirstPiece)
        if (snake[0] === applePosition) {
          // growSnake()
          console.log('eaten from up')
          console.log(gameSpeed)
          showApple()
          //speeding up the game
          gameSpeed -= 5
          console.log(gameSpeed)
          clearInterval(intervalId)
          runSnake()
        } else {
          snake.pop()
        }
        if (cells[snake[0]].classList.contains('unicorn')) {
          showUnicorn()
        }

      }
    }

    dontEatSnake()

    snake.forEach((snakeSkin) => {
      cells[snakeSkin].classList.add('snake')

    })
  }, gameSpeed)
}

//speed up the snake when it hits the apple


// const speed = () => {
//   const initialSpeed = 400
//   if (snake[0] === applePosition) {
//     const speedConstant = 0.95
//     let newSpeed = initialSpeed * speedConstant

//   }
// }


//set interval for unicorn


let intervalId2 = 0


//unicorn position

let unicornPosition = Math.floor(Math.random() * totalSize)

startButton.addEventListener('click', () => {
  console.log('Unicorn starts')

  if (intervalId2 !== 0) return
  intervalId2 = setInterval(() => {
    console.log('is the interval starting')
    setTimeout(() => {

      unicornPosition = Math.floor(Math.random() * totalSize)
      //here later add checking if it is not in snake or apple
      while (snake.includes(unicornPosition)) {
        unicornPosition = Math.floor(Math.random() * cells.length)
        console.log('this snake clashing with unicorn')
      }
      // checking it does not appear where the apple is
      while (unicornPosition === applePosition) {
        unicornPosition = Math.floor(Math.random() * cells.length)
        console.log('this apple clashing  with unicorn')
      }


      
      cells[unicornPosition].classList.add('unicorn')
      setTimeout(() => {

        cells[unicornPosition].classList.remove('unicorn')


      }, 6000)



    }, 10000)



  }, 15000)

})

// function show unicorn



function showUnicorn() {

  if (snake[0] === unicornPosition) {
    score = score += 500
    showScore.innerHTML = score
    cells[unicornPosition].classList.remove('unicorn')


    // // checking it does not appear where the snake is
    // while (snake.includes(unicornPosition)) {
    //   unicornPosition = Math.floor(Math.random() * cells.length)
    //   console.log('this snake clashing with unicorn')
    // }
    // // checking it does not appear where the apple is
    // while (unicornPosition === unicornPosition) {
    //   unicornPosition = Math.floor(Math.random() * cells.length)
    //   console.log('this apple clashing  with unicorn')
    // }


  }

}





//reset button that resets the whole game and resets snake to initial position
resetButton.addEventListener('click', () => {
  clearInterval(intervalId)
  intervalId = 0
  // ! window.localStorage.clear() - this does not work
  score = 0
  showScore.innerHTML = score
  gameSpeed = 400
  //remove the current snake
  snake.forEach((snakeSkin2) => {
    cells[snakeSkin2].classList.remove('snake')
  })
  //enter where i want to start again with the snake
  snake = [51, 36, 21, 6]
  direction = 'down'
  //make snake appear again
  snake.forEach((snakeSkin2) => {
    cells[snakeSkin2].classList.add('snake')
  })
  //remove apple
  cells[applePosition].classList.remove('apple')
  //reset unicorn interval
  clearInterval(intervalId2)
  cells[applePosition].classList.remove('unicorn')

})



//function to check if snake eats itself


function dontEatSnake() {
  for (let i = 1; i < snake.length - 1; i++) {
    if (snake[0] === snake[i]) {
      console.log('you loser')
      //clear the interval when it eats itself
      clearInterval(intervalId)
      //remove apple
     
      // unicorn
      clearInterval(intervalId2)
      cells[applePosition].classList.remove('unicorn')
      cells[applePosition].classList.remove('apple')
    }

  }
}






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


