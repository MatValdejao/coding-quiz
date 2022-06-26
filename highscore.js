var clearButtonEl = document.querySelector("#clear-highscores")

// clearhighscore funtion
var clearHistory = function (event) {
    localStorage.clear();
}

// when clicked, clear highscores
clearButtonEl.addEventListener("click", clearHistory);