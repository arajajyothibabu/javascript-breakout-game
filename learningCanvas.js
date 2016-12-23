/**
*
*Learning Canvas basics
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d')

//Rectangle
ctx.beginPath();
ctx.rect(50, 50, 100, 100);
ctx.fillStyle = "#FFFF00";
ctx.fill();
ctx.closePath();

//ARC
ctx.beginPath();
ctx.arc(150, 50, 20, 0, Math.PI * 2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

//Rectangle with Stroke
ctx.beginPath();
ctx.rect(150, 50, 100, 100);
ctx.strokeStyle = 'rgba(0, 0, 240, 0.7)';
ctx.stroke();
ctx.closePath();
