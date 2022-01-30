const boardColors = ['red', 'blue', 'green', 'yellow'];

var context = document.querySelector('canvas').getContext('2d');
var ref = null;
var field = Array.from(new Array(8), () => new Array(8).fill(0));
var currentStone = 1;
var selectedX = 0;
var selectedY = 0;
var colorField = [];

function detectPosition(position) {
  if (position >= 0 && position <= 100) {
    return 0;
  }
  if (position > 100 && position <= 200) {
    return 1;
  }
  if (position > 200 && position <= 300) {
    return 2;
  }
  if (position > 300 && position <= 400) {
    return 3;
  }
  if (position > 400 && position <= 500) {
    return 4;
  }
  if (position > 500 && position <= 600) {
    return 5;
  }
  if (position > 600 && position <= 700) {
    return 6;
  }
  if (position > 700 && position <= 800) {
    return 7;
  }
}

function getAround(x, y) {
  if ((x === 0 && y === 0) || (x % 2 === 0 && y % 2 === 0)) {
    return [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  }

  if (x === 0) {
    if (y % 2 === 0) {
      return [
        [x, y],
        [x + 1, y],
        [x, y + 1],
        [x + 1, y + 1],
      ];
    } else {
      return [
        [x, y === 0 ? y : y - 1],
        [x + 1, y === 0 ? y : y - 1],
        [x, y],
        [x + 1, y],
      ];
    }
  }
  if (y === 0) {
    if (x % 2 === 0) {
      return [
        [x, y],
        [x + 1, y],
        [x, y + 1],
        [x + 1, y + 1],
      ];
    } else {
      return [
        [x === 0 ? x : x - 1, y],
        [x, y],
        [x === 0 ? x : x - 1, y + 1],
        [x, y + 1],
      ];
    }
  }
  if (x % 2 === 1 && y % 2 === 0) {
    return [
      [x === 0 ? x : x - 1, y],
      [x, y],
      [x === 0 ? x : x - 1, y + 1],
      [x, y + 1],
    ];
  }
  if (x % 2 === 0 && y % 2 === 1) {
    return [
      [x, y === 0 ? y : y - 1],
      [x + 1, y === 0 ? y : y - 1],
      [x, y],
      [x + 1, y],
    ];
  }
  if (x % 2 === 1 && y % 2 === 1) {
    return [
      [x - 1, y === 0 ? y : y - 1],
      [x, y === 0 ? y : y - 1],
      [x === 0 ? x : x - 1, y],
      [x, y],
    ];
  }
}

function reDrawRect(event) {
  const getX = detectPosition(event.layerX);
  const getY = detectPosition(event.layerY);
  const currentField = colorField.find(
    (field) => field.position.toString() === [getX, getY].toString()
  );
  const arounds = getAround(currentField.position[0], currentField.position[1]);
  arounds.forEach((around) => {
    const aroundColor = colorField.find(
      (v) => v.position.toString() === around.toString()
    );
  });
}

function drawRect(color, x, y, w, h) {
  if (color !== 'white') {
    const divX = x > 0 ? x / 100 : x;
    const divY = y > 0 ? y / 100 : y;
    colorField = [...colorField, { color: color, position: [divX, divY] }];
  }
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
  reDrawRect(e);
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
