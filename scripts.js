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
var paddleMovement = 7;

var leftArrowKeyCode = 37;
var rightArrowKeyCode = 39;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler)

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
  drawBall();
  drawPaddle();
  sumX = x + dx; sumY = y + dy;
  if(sumY < ballRadius){
    dy = -dy;
  }else if(sumY > canvas.height - ballRadius){
    if(x <= paddleX || x >= paddleX + paddleWidth) alert("Oops..! Game Over."); //GameOver condition
    dy = -dy;
  }
  if(sumX > (canvas.width - ballRadius) || sumX < ballRadius) dx = -dx;
  if(leftPressed && paddleX > 0) paddleX -= paddleMovement;
  if(rightPressed && paddleX + paddleWidth < canvas.width) paddleX += paddleMovement;
  x += dx; y += dy;
}
