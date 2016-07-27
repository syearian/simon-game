var strict = false;
var greenAudio;
var redAudio;
var yellowAudio;
var blueAudio;
var count = document.getElementById('count').textContent;
var series = [];
var playerAttempt = series;

function playAudio() {

}

function flashColor() {

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

function pressButton() {

}

function startSeries() {

}

function playerAttemptSeries() {

}

function setStrict() {

}

function reset() {

}

function win() {

}

function startOrStop() {

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