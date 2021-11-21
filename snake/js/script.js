const game = document.getElementById("game");
const ctx = game.getContext("2d");

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

  let secret = invisibility ();
  if (secret) {
    clearSecret();
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
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

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }

    //walls
    if (headX === -1) {
      gameOver = true;
    } else if (headX === 21) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === 21 && headX != 10) {
      gameOver = true;
    }

  }

  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "50px Verdana";

    if (gameOver) {
      ctx.fillStyle = "black";
      ctx.font = "50px Verdana";
      ctx.fillText("Game Over", 10, 50);
    }

    ctx.fillText("Game Over!", 10, 50);
  }

  return gameOver;
}

//EasterEgg

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, game.width - 50, 10);
}

function clearScreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 420, 420);
}

function clearSecret() {
  ctx.fillStyle = "white";
  ctx.fillRect(200, 420, 20, 140);
  ctx.fillRect(140, 560, 140, 140);
  ctx.fillStyle="gold";
  ctx.fillRect( 200, 620, tileCount, tileCount);
}

function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  ctx.fillStyle = "green";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
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

  if ( 10 === headX && 31 === headY) {
    end = true;
    if (end) {
      ctx.fillStyle = "black";
      ctx.font = "25px Verdana";

      if (end) {
        ctx.fillStyle = "black";
        ctx.font = "25px Verdana";
        ctx.fillText("Bravo, tu as trouvé l'easter egg", 10, 50);
      }

      ctx.fillText("Bravo, tu as trouvé l'easter egg", 10, 50);
    }

    return end;
  }
}

function invisibility() {
  let open = false;

  if (headX === 10 && headY === 20) {
    open = true;
    return open;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38 && headY <= 21) {

    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (event.keyCode == 40 && headY <= 21) {

    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (event.keyCode == 37 && headY <= 21) {

    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (event.keyCode == 39 && headY <= 21) {

    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame();
