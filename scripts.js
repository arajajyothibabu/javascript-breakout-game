/**
* Main Scripts for Game
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d')

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2
var ballRadius = 10;
var timeInterval = 10;
var sumX = 0, sumY = 0;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var leftPressed = false;
var rightPressed = false;
var paddleOffset = 7;

var leftArrowKeyCode = 37;
var rightArrowKeyCode = 39;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
var brickX = 0, brickY = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

for(var c = 0; c < brickColumnCount; c++){
  bricks[c] = [];
  for(var r = 0; r < brickRowCount; r++){
    bricks[c][r] = {x: 0, y: 0, status: false};
  }
}

var brick;
function collisionDetection(){
  for(var c = 0; c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount; r++){
      brick = bricks[c][r];
      if(!bricks[c][r].status){
        if(x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight){
          dy = -dy;
          brick.status = true;
        }
      }
    }
  }
}

function drawBrick(x, y){
  ctx.beginPath();
  ctx.rect(x, y, brickWidth, brickHeight);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(var c = 0; c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount; r++){
      if(bricks[c][r].status) continue;
      brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      drawBrick(brickX, brickY);
    }
  }
}

function keyUpHandler(e){
  if(e.keyCode === leftArrowKeyCode) leftPressed = false;
  if(e.keyCode === rightArrowKeyCode) rightPressed = false;
}

function keyDownHandler(e){
  if(e.keyCode === leftArrowKeyCode) leftPressed = true;
  if(e.keyCode === rightArrowKeyCode) rightPressed = true;
}

setInterval(draw, timeInterval);

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  sumX = x + dx; sumY = y + dy;
  if(sumY < ballRadius){
    dy = -dy;
  }else if(sumY > canvas.height - paddleHeight - ballRadius){
    if(x >= paddleX && x <= paddleX + paddleWidth) dy = -dy;
    else if(sumY > canvas.height - ballRadius) {
      alert("Oops..! Game Over."); //GameOver condition
      dy = -dy;
    }
  }
  if(sumX > (canvas.width - ballRadius) || sumX < ballRadius) dx = -dx;
  if(leftPressed && paddleX > 0) paddleX -= paddleOffset;
  if(rightPressed && paddleX + paddleWidth < canvas.width) paddleX += paddleOffset;
  x += dx; y += dy;
}
