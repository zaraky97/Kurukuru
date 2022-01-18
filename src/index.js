const boardColors = ['red', 'blue', 'green', 'yellow'];

var context = document.querySelector('canvas').getContext('2d');
var ref = null;
var field = Array.from(new Array(8), () => new Array(8).fill(0));
var currentStone = 1;
var selectedX = 0;
var selectedY = 0;

function getStone(x, y) {
  console.log(x, y);
  if (x < 1 || x > 8 || y < 1 || y > 8) return -1;
  return field[y - 1][x - 1];
}

function setStone(x, y, stone) {
  if (x < 1 || x > 8 || y < 1 || y > 8) return;
  field[y - 1][x - 1] = stone;
}

function drawRect(color, x, y, w, h) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawField() {
  drawRect('white', 0, 0, 800, 800);
  for (var y = 1; y <= 8; y++) {
    for (var x = 1; x <= 8; x++) {
      var colorNumber = Math.floor(Math.random() * 4);
      var bgColor = boardColors[colorNumber];
      drawRect(bgColor, (x - 1) * 100, (y - 1) * 100, 99, 99);
    }
  }
}

var dx = [0, 1, 1, 1, 0, -1, -1, -1];
var dy = [-1, -1, 0, 1, 1, 1, 0, -1];

function clickBoard(e) {
  console.log(e);
  var rect = e.target.getBoundingClientRect();
  var x = Math.floor((e.clientX - rect.left) / 100) + 1;
  var y = Math.floor((e.clientY - rect.top) / 100) + 1;
}

function init() {
  field = Array.from(new Array(8), () => new Array(8).fill(0));
  currentStone = 1;
  selectedX = 0;
  selectedY = 0;
  drawField();
}
