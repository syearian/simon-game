var strict = false;
var green = document.getElementById('green');
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var blue = document.getElementById('blue');
var count = '--';
var series = [];
var playerAttempt = series;

function playAudio(button) {
  var audio = button.firstElementChild;
  audio.play();
}

// From https://css-tricks.com/snippets/javascript/lighten-darken-color/
function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);

  
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
  var flashColor = LightenDarkenColor(color, 10);
  changeBackground(button, flashColor);
  setTimeout(changeBackground(button, color), 500);
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

function chooseNextButton() {
  
}

function addToSeries() {

}

function pressButton(button) {
  playAudio(button);
  flashColor(button);
}

function setEventHandlers() {

}

function startSeries() {

}

function playerAttemptSeries() {

}

function setStrict(target) {
  if (target.checked) {
    strict = true;
  } else {
    strict = false;
  }
}

function reset() {
  var strict = false;
  var greenAudio;
  var redAudio;
  var yellowAudio;
  var blueAudio;
  var count = '--';
  var series = [];
  var playerAttempt = series;
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
    startSeries();
  } else {
    setTimeout(reset(), 500);
  }
}

function ready() {
  var startStop = document.getElementById('startStop');
  startStop[i].addEventListener("click", function(event) {
    startOrStop(event.target);
  });
  var strictToggle = document.getElementById('strict');
  strictToggle[i].addEventListener("click", function(event) {
    setStrict(event.target);
  });
}

var everythingLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(everythingLoaded);
    ready(); // this is the function that gets called when everything is loaded
  }
}, 10);