// create startButtonEl to allow listening of button click to start game
var startButtonEl = document.querySelector("#start-btn");
var mainEl = document.querySelector("main");
var timeEl = document.querySelector("time");

// questions array containing questions
var questions = ["Commonly used data types DO NOT include:", "The condition in an if/else statement is inclosed within ____.", "Arrays in JavaScript can be used to store ___.", "String values must be enclosed within ___ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"];

highScores = [];
questionCounter = 0;
initialTime = 75;

var qsObjArray = [{
    question: questions[0],
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "3. alerts"
    },
    {
    question: questions[1],
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "3. parentheses" 
    },
    {
    question: questions[2],
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],              
    correctAnswer: "4. all of the above"
    },
    { 
    question: questions[3],
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "3. quotes"
    },
    {
    question: questions[4],
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "4. console.log"
    },  
]

// select main page content and remove from page
var startGame = function (event) {
  var h1El = document.querySelector(".head-quiz");
  // var pEl = document.querySelector(".p-quiz");
  var pEl = document.querySelector(".p-quiz");

  // take header, p, and button and remove from page
  h1El.remove();
  pEl.remove();
  startButtonEl.remove();

  // countdown should only be called once
  countdown();
  // call questionDisplay()
  questionDisplay(questionCounter);
}

var clear = function () {
  var h3El = document.querySelector("h3");
  var buttonHolderEl = document.querySelector(".button-holder");
  var sectionEl = document.querySelector(".answer-display");

  // removes previous question and answer options from the page
  h3El.remove();
  buttonHolderEl.remove();
}

var questionDisplay = function (questionCount) {
  if (questionCount <= qsObjArray.length - 1) {
    var buttonContainerEl = document.querySelector(".btn-container");
    var headContainerEl = document.querySelector(".head-container");

    // displays question for user
    h3El = document.createElement("h3");
    h3El.textContent = qsObjArray[questionCounter].question;
    buttonHolderEl = document.createElement("div");
    buttonHolderEl.className = "button-holder";
    headContainerEl.appendChild(h3El);
    buttonContainerEl.appendChild(buttonHolderEl);
    // mainEl.appendChild(h3El);
    // mainEl.appendChild(buttonHolderEl);
    // changes align item property to align all main child elements
    mainEl.style.alignItems = "flex-start";

    // create four buttons as answer options
    for (var i = 0; i < qsObjArray[questionCount].answers.length; i++) {
      var answerButtonEl = document.createElement("button");
      answerButtonEl.className = "btn";
      answerButtonEl.setAttribute("id", "answer-btn");
      answerButtonEl.textContent =
        i + 1 + ". " + qsObjArray[questionCount].answers[i];
      // appends to main element
      buttonHolderEl.appendChild(answerButtonEl);
    }
    // create event listener for answer click
    mainEl.addEventListener("click", whichButton);
  }  
  else {
    endGame();
  }
}

var whichButton = function (event) {
    // checks which button option was clicked
  if (event.target.matches("#answer-btn")) {
    ansButtonEl = event.target;
    answerChecker(ansButtonEl);
  }
}

// checks whether answer is correct and detracts ten second of time if it is incorrect
var answerChecker = function (button) {
  if (button.textContent === qsObjArray[questionCounter].correctAnswer) {
    // displays whether answer is correct or incorrect
    var answerDisplayEl = document. createElement("section");
    answerDisplayEl.className = "answer-display";
    answerDisplayEl.textContent = "Correct!";
    mainEl.appendChild(answerDisplayEl);
    var audio = new Audio("./assets/audio/Correct.mp3");
    audio.play();
  } else {
    // displays whether answer is incorrect and removes ten seconds
    initialTime = initialTime - 10;
    var answerDisplayEl = document.createElement("section");
    answerDisplayEl.className = "answer-display";
    answerDisplayEl.textContent = "Wrong!";
    mainEl.appendChild(answerDisplayEl);
    var audio = new Audio("./assets/audio/Wrong.mp3");
    audio.play();
  }

  // removes answer-display after brief feeback to user
  var sectionEl = document.querySelector(".answer-display");
  var timeDelay = setTimeout(function () {
    sectionEl.remove();
  }, 300);

  questionCounter++;
  clear();
  questionDisplay(questionCounter);
}

var endGame = function () {
  if (questionCounter <= qsObjArray.length - 1) {
    clear();
  } 
  
  var buttonContainerEl = document.querySelector(".btn-container");
  var pContainerEl = document.querySelector(".p-container");
  var headContainerEl = document.querySelector(".head-container");

  var h3El = document.createElement("h3");
  h3El.textContent = "All Done!";

  var finalScoreEl = document.createElement("p");
  finalScoreEl.textContent = "Your final score is " + initialTime;

  // Creates form element to allow initial input of user
  var formEl = document.createElement("form");
  formEl.className = "initials-form";
  formEl.innerHTML =
    "<div>Enter initials: <input type='text' name='initials' placeholder=''/></div><div><a href='./highscore.html'><button class='btn' type='submit' id='initials-btn' style='margin-left: 5px'>Submit</button></a>";
  formEl.style.display = "flex";
  formEl.style.marginBottom = "5px";
  
  headContainerEl.appendChild(h3El);
  pContainerEl.appendChild(finalScoreEl);
  buttonContainerEl.appendChild(formEl);

  // event listener for when user clicks submit button
  var endButtonEl = document.querySelector("#initials-btn");
  // redirect into highscore.html
  endButtonEl.addEventListener("click", highscoreSave);
};

var highscoreSave = function (event) {
  // adds attempt to highscore array
  var initials = document.querySelector("form [name='initials']").value;
  highscoreInsert = {
    name: initials + ": ",
    score: initialTime
  }

  highScores.push(highscoreInsert);
  // saves attempt score to storage
  localStorage.setItem("highscores", JSON.stringify(highScores));
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
}

var countdown = function () {
  var timer = setInterval(function () {
    // checks whether user has finished quiz
    if (questionCounter > qsObjArray.length - 1) {
      clearInterval(timer);
      return 
    }
    // check whether time is above zero
    if (initialTime > 0) {
      timeEl.textContent = "Time: " + (initialTime - 1);
      return initialTime--;
    } else {
      clearInterval(timer);
      return endGame();
    }
  }, 1000);
};

startButtonEl.addEventListener("click", startGame);

// calls previous highscores
highscoreRetrieve();
