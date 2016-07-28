var strict = false;
var buttons = ['green','red','yellow','blue']
var green = document.getElementById('green');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var blue = document.getElementById('blue');
var count = 0;
var series = [];
var playerAttemptSeries = series;
var flashColors = {
  'green': '#32b232',
  'red': '#E55451',
  'yellow': '#FFDB58',
  'blue': '#3232ff'
}

function playAudio(button) {
  var audio = button.firstElementChild;
  audio.play();
}

function getHexColor(color) {
  var hexColor;
  switch (color) {
    case 'green':
      hexColor = '#008000';
      break;
    case 'red':
      hexColor = '#FF0000';
      break;
    case 'yellow':
      hexColor = '#FFFF00';
      break;
    case 'blue':
      hexColor = '#0000FF';
      break;
  }
  return hexColor;
}

function changeBackground(button, color) {
  button.style.background = color;
}

function flashColor(button) {
  var color = getHexColor(button.id);
  var flashColor = flashColors[button.id];
  changeBackground(button, flashColor);
  var timeout = window.setTimeout(changeBackground, 400, button, color);
}

function incrementCount() {
  if (count === "--") {
    count = 1;
    document.getElementById('count').textContent = '0' + count.toString();
  } else if (count === 20) {
    win();
  }
  else {
    count = ++count;
    document.getElementById('count').textContent = '0' + count.toString();
  }
}

function pressButton(button) {
  playAudio(button);
  flashColor(button);
}

function getCorrectButton(elem) {
  var correct;
  switch (elem) {
    case 'green':
      correct = green;
      break;
    case 'red':
      correct = red;
      break;
    case 'yellow':
      correct = yellow;
      break;
    case 'blue':
      correct = blue;
      break;
  }
  return correct;
}

function startSeries() {
  var i = 0;
  var button;
  var seriesInterval = window.setInterval(function() {
    button = getCorrectButton(series[i]);
    pressButton(button);
    i++
    if (i >= series.length) {
      clearInterval(seriesInterval);
    }
  }, 600);
}

function chooseNextButton() {
  return buttons[Math.floor(Math.random() * buttons.length)];
}

function addToSeries() {
  series.push(chooseNextButton());
  playerAttemptSeries = series;
  count++;
  document.getElementById('count').textContent = '0' + count.toString();
  startSeries();
}

function playerAttempt(button) {
  console.log(button);
}

function setEventHandlers() {
  green.addEventListener("click", function(event) {
    pressButton(green);
    playerAttempt(green);
  });
  red.addEventListener("click", function(event) {
    pressButton(red);
    playerAttempt(red);
  });
  yellow.addEventListener("click", function(event) {
    pressButton(yellow);
    playerAttempt(yellow);
  });
  blue.addEventListener("click", function(event) {
    pressButton(blue);
    playerAttempt(blue);
  });
}

function setStrict(target) {
  if (target.checked) {
    strict = true;
  } else {
    strict = false;
  }
}

function reset() {
  green = document.getElementById('green');
  red = document.getElementById('red');
  yellow = document.getElementById('yellow');
  blue = document.getElementById('blue');
  count = 0;
  series = [];
  playerAttempt = series;
  document.getElementById('count').textContent = '--';
}

function win() {
  pressButton(green);
  pressButton(red);
  pressButton(yellow);
  pressButton(blue);
  reset();
}

function startOrStop(target) {
  if (target.checked) {
    setEventHandlers();
    addToSeries();
  } else {
    reset();
  }
}

function ready() {
  var startStop = document.getElementById('startStop');
  startStop.addEventListener("click", function(event) {
    startOrStop(event.target);
  });
  var strictToggle = document.getElementById('strict');
  strictToggle.addEventListener("click", function(event) {
    setStrict(event.target);
  });
}

var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    ready(); // this is the function that gets called when everything is loaded
  }
}, 10);