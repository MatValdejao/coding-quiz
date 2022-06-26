var clearButtonEl = document.querySelector("#clear-highscores")
var highScores = [];

// clearhighscore funtion
var clearHistory = function (event) {
    localStorage.clear();
}


var highscoreRetrieve = function () {
  var savedHighscores = localStorage.getItem("highscores");

  if (!savedHighscores) {
    return false;
  }

  // converts back to DOM object
  savedHighscores = JSON.parse(savedHighscores);

  // adds to highscores list previous scores
  for (var i = 0; i < savedHighscores.length; i++) {
    highScores.push(savedHighscores[i]);
  }
};

// when clicked, clear highscores
clearButtonEl.addEventListener("click", clearHistory);
highscoreRetrieve();
