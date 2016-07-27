var strict = false;
var greenAudio;
var redAudio;
var yellowAudio;
var blueAudio;
var series = [];
var playerAttempt = series;

function playAudio() {

}

function flashColor() {

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