const squares = document.querySelectorAll('.grid div');
const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const button = document.querySelector('#button');
const resetBtn = document.querySelector('#reset');

const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');

const width = 9;
let currentIndex = 76;
let currentTime = 20;
let timerId;

// render frog on starting block
squares[currentIndex].classList.add('frog');

// function for move the frog
function moveFrog(e) {
  squares[currentIndex].classList.remove('frog');
  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case 'ArrowDown':
      if (currentIndex + width < width * width) currentIndex += width;
      break;
    default:
      break;
  }
  squares[currentIndex].classList.add('frog');
  win();
  lose();
}

// move cars
function moveCars() {
  carsLeft.forEach(car => moveCarLeft(car));
  carsRight.forEach(car => moveCarRight(car));
}

// move car left on time loop
function moveCarLeft(car) {
  switch (true) {
    case car.classList.contains('c1'):
      car.classList.remove('c1');
      car.classList.add('c2');
      break;
    case car.classList.contains('c2'):
      car.classList.remove('c2');
      car.classList.add('c3');
      break;
    case car.classList.contains('c3'):
      car.classList.remove('c3');
      car.classList.add('c1');
      break;
    default:
      break;
  }
}

// move car right on time loop
function moveCarRight(car) {
  switch (true) {
    case car.classList.contains('c1'):
      car.classList.remove('c1');
      car.classList.add('c3');
      break;
    case car.classList.contains('c2'):
      car.classList.remove('c2');
      car.classList.add('c1');
      break;
    case car.classList.contains('c3'):
      car.classList.remove('c3');
      car.classList.add('c2');
      break;
    default:
      break;
  }
}

// move logs
function moveLogs() {
  logsLeft.forEach(log => moveLogLeft(log));
  logsRight.forEach(log => moveLogRight(log));
}

// move log left on time loop
function moveLogLeft(log) {
  switch (true) {
    case log.classList.contains('l1'):
      log.classList.remove('l1');
      log.classList.add('l2');
      break;
    case log.classList.contains('l2'):
      log.classList.remove('l2');
      log.classList.add('l3');
      break;
    case log.classList.contains('l3'):
      log.classList.remove('l3');
      log.classList.add('l4');
      break;
    case log.classList.contains('l4'):
      log.classList.remove('l4');
      log.classList.add('l5');
      break;
    case log.classList.contains('l5'):
      log.classList.remove('l5');
      log.classList.add('l1');
      break;
    default:
      break;
  }
}

// move log right on time loop
function moveLogRight(log) {
  switch (true) {
    case log.classList.contains('r1'):
      log.classList.remove('r1');
      log.classList.add('r5');
      break;
    case log.classList.contains('r2'):
      log.classList.remove('r2');
      log.classList.add('r1');
      break;
    case log.classList.contains('r3'):
      log.classList.remove('r3');
      log.classList.add('r2');
      break;
    case log.classList.contains('r4'):
      log.classList.remove('r4');
      log.classList.add('r3');
      break;
    case log.classList.contains('r5'):
      log.classList.remove('r5');
      log.classList.add('r4');
      break;
    default:
      break;
  }
}

// rules for frog win
function win() {
  if (squares[4].classList.contains('frog')) {
    resultDisplay.textContent = 'You win'
    squares[currentIndex].classList.remove('frog');
    clearInterval(timerId);
    document.removeEventListener('keyup', moveFrog);
  }
}

// rules to lose
function lose() {
  if (currentTime === 0 ||
    (
      squares[currentIndex].classList.contains('c1') ||
      squares[currentIndex].classList.contains('l4') ||
      squares[currentIndex].classList.contains('l5')
    )
  ) {
    resultDisplay.textContent = 'You lose !';
    squares[currentIndex].classList.remove('frog');
    clearInterval(timerId);
    document.removeEventListener('keyup', moveFrog);
  }
}

// move frog when on moving log left
function moveWithLogLeft() {
  if (currentIndex > 26 && currentIndex < 35) {
    squares[currentIndex].classList.remove('frog');
    currentIndex += 1;
    squares[currentIndex].classList.add('frog');
  }
}

// move frog when on moving log right
function moveWithLogRight() {
  if (currentIndex > 18 && currentIndex < 27) {
    squares[currentIndex].classList.remove('frog');
    currentIndex -= 1;
    squares[currentIndex].classList.add('frog');
  }
}

// all function that move pieces
function movePieces() {
  currentTime -= 1;
  timeLeftDisplay.textContent = currentTime;
  moveCars();
  moveLogs();
  moveWithLogLeft();
  moveWithLogRight();
  lose();
}

// to start and pause game
button.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = '';
    document.removeEventListener('keyup', moveFrog);
  } else {
    timerId = setInterval(movePieces, 1000);
    document.addEventListener('keyup', moveFrog);
  }
});

// add reset function
function reset(){
  clearInterval(timerId);
  resultDisplay.textContent = '';
  squares[currentIndex].classList.remove('frog');
  document.removeEventListener('keyup', moveFrog);
  timerId = '';
  currentTime = 20;
  timeLeftDisplay.textContent = currentTime;
  currentIndex = 76;
  squares[currentIndex].classList.add('frog');
}

resetBtn.addEventListener('click', reset);