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

    orderScores();
};

// orders score from best to worst
var orderScores = function () {
    // loop through highScores and take score value, compare to previous extracted 
    scoreStart = -9999;
    theScore = []
    for (var i = 0; i < highScores.length; i++) {
        var space = highScores[i].indexOf(" ");
        score = (highScores[i].slice(space + 1));
        if (parseInt(score) > scoreStart) {
            scoreStart = score
            theScore.unshift(score);
        }
        else if (parseInt(score) <= scoreStart) {
            theScore.push(score);
        }
    }
    

}


// when clicked, clear highscores
clearButtonEl.addEventListener("click", clearHistory);
highscoreRetrieve();
