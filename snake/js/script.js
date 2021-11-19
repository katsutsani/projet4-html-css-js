var game = document.getElementById("game");
var couloir = document.getElementById("couloir");
var piece = document.getElementById("piece");
var ctxGame = game.getContext("2d");
var ctxCouloir = couloir.getContext("2d");
var ctxPiece = piece.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = game.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let easterEggX = 200;
let easterEggY = 710;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//game loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  }

  let find = findEasterEgg();
  if (find) {
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawEasterEgg();
  drawScore();

  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls

  /*

  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

*/

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctxGame.fillStyle = "black";
    ctxGame.font = "50px Verdana";

    if (gameOver) {
      ctxGame.fillStyle = "black";
      ctxGame.font = "50px Verdana";
      ctxGame.fillText("Game Over", game.width / 6.5, game.height / 2);
    }

    ctxGame.fillText("Game Over!", game.width / 6.5, game.height / 2);
  }

  return gameOver;
}

//EasterEgg

function drawScore() {
  ctxGame.fillStyle = "black";
  ctxGame.font = "10px Verdana";
  ctxGame.fillText("Score " + score, game.width - 50, 10);
}

function clearScreen() {
  ctxGame.fillStyle = "white";
  ctxGame.fillRect(0, 0, game.width, game.height);
  ctxCouloir.fillStyle = "white";
  ctxCouloir.fillRect(0, 0, couloir.width, couloir.height);
  ctxPiece.fillStyle = "white";
  ctxPiece.fillRect(0, 0, piece.width, piece.height);
}

function drawEasterEgg() {
  ctxPiece.fillStyle='gold';
  ctxPiece.fillRect(80, 80, tileCount, tileCount);
}

function drawSnake() {
  ctxGame.fillStyle = "red";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctxGame.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctxGame.fillStyle = "red";
  ctxGame.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctxGame.fillStyle = "red";
  ctxGame.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

function findEasterEgg() {
  let end = false;

  if (easterEggX === headX && easterEggY === headY) {
    end = true;
    if (end) {
      ctxGame.fillStyle = "black";
      ctxGame.font = "50px Verdana";

      if (end) {
        ctxGame.fillStyle = "black";
        ctxGame.font = "50px Verdana";
        ctxGame.fillText("Bravo tu as trouvé l'easter egg", 1, piece.height / 2);
      }

      ctxGame.fillText("Bravo tu as trouvé l'easter egg", 1, piece.height / 2);
    }

    return end;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    //87 is w
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 is s
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 is a
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    //68 is d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame();
