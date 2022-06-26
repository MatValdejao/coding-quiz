var clearButtonEl = document.querySelector("#clear-highscores")
var highScores = [];

// clearhighscore funtion
var clearHistory = function (event) {
    var olEl = document.querySelector("ol") 
    olEl.remove();
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
    theScore = [];
    for (var i = 0; i < highScores.length; i++) {
        score = highScores[i].score;
        theScore.push(score);
    }
    // puts them in 
    theScore.sort();
    theScore.reverse();

    // calls display function to show user
    displayScores(theScore);
}

var displayScores = function (theScore) {
    // select div element where list will be 
    var divEl = document.querySelector(".highscores");
    divEl.style.width = "100%";
    var olEl = document.createElement("ol");
    olEl.style.backgroundColor = "rgb(228, 217, 238)";
    
    // loops through score array and adds to list of values in display
    for (var i = 0; i < theScore.length; i++) {
        for (var v = i; v < highScores.length; v++) {
            if (highScores[v].score === theScore[i]) {
                var listItemEl = document.createElement("li");
                listItemEl.style.marginBottom = "3px";
                listItemEl.textContent = highScores[v].name + theScore[i];
                // console.log(listItemEl);
                olEl.appendChild(listItemEl);  
                break;
            }
            else {
                continue;
            }
        }
    }
    divEl.appendChild(olEl);
}


// when clicked, clear highscores
clearButtonEl.addEventListener("click", clearHistory);
highscoreRetrieve();
