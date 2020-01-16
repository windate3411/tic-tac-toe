const xClass = 'x';
const circleClass = 'circle';
let circleTurns;
const winningConditions = [[0, 1, 2], [3, 4, 5],
[6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

// select elements
const cells = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMessage = document.getElementById('winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')

// gameStart
startGame()

// handler
function handleClick(e) {
  // place mark
  const cell = e.target
  const currentClass = circleTurns ? circleClass : xClass
  placeMark(cell, currentClass)

  // check wins
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    // if no winners,switch turns
    switchTurns()
    setBoard()
  }
}

function startGame() {
  circleTurns = false
  cells.forEach(item => {
    item.addEventListener('click', handleClick, { once: true })
  })
  setBoard()
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'Draw!'
  } else {
    winningMessageText.innerText = `${circleTurns ? 'O wins!' : 'X wins!'}`
  }
  winningMessage.classList.add('show')
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function switchTurns() {
  circleTurns = !circleTurns
}

function setBoard() {
  board.classList.remove(xClass)
  board.classList.remove(circleClass)
  circleTurns ? board.classList.add(circleClass) : board.classList.add(xClass)
}

function checkWin(currentClass) {
  return winningConditions.some(combination => {
    return combination.every(item => {
      return cells[item].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}