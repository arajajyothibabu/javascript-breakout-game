/**
* Main Scripts for Game
*/
//styles with javaScript
var universal = document.querySelector("*");
universal.style.padding = 0;
universal.style.margin = 0;

var canvas = document.getElementById("myCanvas");
canvas.style.backgroundColor = "#CCCCCC";
canvas.style.display = "block";
canvas.style.margin = "0 auto";

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

var score = 0;
var lives = 3;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);

for(var c = 0; c < brickColumnCount; c++){
  bricks[c] = [];
  for(var r = 0; r < brickRowCount; r++){
    bricks[c][r] = {x: 0, y: 0, status: false};
  }
}

var brick;
var totalBricks = brickRowCount * brickColumnCount;
function collisionDetection(){
  for(var c = 0; c < brickColumnCount; c++){
    for(var r = 0; r < brickRowCount; r++){
      brick = bricks[c][r];
      if(!bricks[c][r].status){
        if(x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight){
          dy = -dy;
          brick.status = true;
          score++;
          if(score == totalBricks){
            alert("YOU WON. ");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(lives + " Lives", canvas.width - 65, 20);
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

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2){
    paddleX = relativeX - paddleWidth / 2;
  }
}

function resetBall(){
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
}

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
  drawScore();
  drawLives();
  collisionDetection();
  sumX = x + dx; sumY = y + dy;
  if(sumY < ballRadius){
    dy = -dy;
  }else if(sumY > canvas.height - paddleHeight - ballRadius){
    if(x >= paddleX && x <= paddleX + paddleWidth) dy = -dy;
    else if(sumY > canvas.height - ballRadius) {
      lives--;
      if(!lives) {
        alert("Oops..! Game Over."); //GameOver condition
        document.location.reload();
      }else{
        resetBall();
      }
    }
  }
  if(sumX > (canvas.width - ballRadius) || sumX < ballRadius) dx = -dx;
  if(leftPressed && paddleX > 0) paddleX -= paddleOffset;
  if(rightPressed && paddleX + paddleWidth < canvas.width) paddleX += paddleOffset;
  x += dx; y += dy;
  requestAnimationFrame(draw);
}

function init(){
  draw();
};

(function(){
  init();
})();
