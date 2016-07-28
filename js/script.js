var strict = false;
var buttons = ['green','red','yellow','blue']
var green = document.getElementById('green');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var blue = document.getElementById('blue');
var count = '--';
var series = [];
var playerAttemptSeries = [];
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

function flashColor(button, timeDelay) {
  var color = getHexColor(button.id);
  var flashColor = flashColors[button.id];
  changeBackground(button, flashColor);
  var flashTimeout = window.setTimeout(changeBackground, timeDelay, button, color);
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

function pressButton(button, timeDelay) {
  playAudio(button);
  flashColor(button, timeDelay);
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
    pressButton(button, 500);
    i++
    if (i >= series.length) {
      clearInterval(seriesInterval);
    }
  }, 700);
}

function chooseNextButton() {
  return buttons[Math.floor(Math.random() * buttons.length)];
}

function addToSeries() {
  series.push(chooseNextButton());
  playerAttemptSeries = series.slice();
  incrementCount();
  startSeries();
}

function greenEvent() {
  pressButton(green, 200);
  playerAttempt(green);
}

function redEvent() {
  pressButton(red, 200);
  playerAttempt(red);
}

function yellowEvent() {
  pressButton(yellow, 200);
  playerAttempt(yellow);
}

function blueEvent() {
  pressButton(blue, 200);
  playerAttempt(blue);
}

function playerAttempt(button) {
  console.log(button);
  if (button.id === playerAttemptSeries[0]) {
    playerAttemptSeries.shift();
    if (playerAttemptSeries.length < 1) {
      var addTimeout = window.setTimeout(addToSeries, 200);
    }
  }
}

function setEventHandlers() {
  green.addEventListener("click", greenEvent);
  red.addEventListener("click", redEvent);
  yellow.addEventListener("click", yellowEvent);
  blue.addEventListener("click", blueEvent);
}

function removeEventHandlers() {
  green.removeEventListener("click", greenEvent);
  red.removeEventListener("click", redEvent);
  yellow.removeEventListener("click", yellowEvent);
  blue.removeEventListener("click", blueEvent);
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
  playerAttemptSeries = series;
  document.getElementById('count').textContent = '--';
  removeEventHandlers();
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