function setup() {
  createCanvas(400, 400);
}

let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];

let currentPlayer = 1;
let gameEnded = false;

function draw() {
  background(220);
  drawLines();
  drawSymbols();
  
  if (checkWinner()) {
    drawWinningLine();
    displayResult("Player " + currentPlayer + " wins!");
    gameEnded = true;
  } else if (checkTie()) {
    displayResult("It's a tie!");
    gameEnded = true;
  }
}

function drawLines() {
  line(133, 0, 133, 400);
  line(266, 0, 266, 400);
  line(0, 133, 400, 133);
  line(0, 266, 400, 266);
}

function drawSymbols() {
  const w = width / 3;
  const h = height / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const x = w * j + w / 2;
      const y = h * i + h / 2;
      const spot = board[i][j];
      textSize(32);
      textAlign(CENTER, CENTER);

      if (spot === 1) {
        text("X", x, y);
      } else if (spot === 2) {
        text("O", x, y);
      }
    }
  }
}

function mouseClicked() {
  if (!gameEnded) {
    const w = width / 3;
    const h = height / 3;

    const j = floor(mouseX / w);
    const i = floor(mouseY / h);

    if (board[i][j] === 0) {
      board[i][j] = currentPlayer;
      currentPlayer = 3 - currentPlayer; // Switch player between 1 and 2
    }
  }
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true; // Row win
    }
    if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true; // Column win
    }
  }
  if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true; // Diagonal win
  }
  if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true; // Diagonal win
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === 0) {
        return false; // If any empty spot is found, the game is not a tie
      }
    }
  }
  return true;
}

function drawWinningLine() {
  // Add code to draw a line through the winning combination if needed
}

function displayResult(result) {
  background(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  text(result, width / 2, height / 2);
}
