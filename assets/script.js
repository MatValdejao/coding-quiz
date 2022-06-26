// create startButtonEl to allow listening of button click to start game
var startButtonEl = document.querySelector("#start-btn");
var mainEl = document.querySelector("main");
var timeEl = document.querySelector("time");

// questions array containing questions
var questions = ["Commonly used data types DO NOT include:", "The condition in an if/else statement is inclosed within ____.", "Arrays in JavaScript can be used to store ___.", "String values must be enclosed within ___ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"];

questionCounter = 0;
intialTime = 75;

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
    var pEl = document.querySelector(".p-quiz");
    

    // take header, p, and button and remove from page
    h1El.remove();
    pEl.remove();
    startButtonEl.remove();

    // call questionDisplay()
    questionDisplay(questionCounter);
}

var clear = function () {
    var h3El = document.querySelector("h3");

    var buttonHolderEl = document.querySelector(".button-holder");

    h3El.remove();
    buttonHolderEl.remove();
}

var questionDisplay = function (questionCount) {
  countdown();

  // displays question for user
  h3El = document.createElement("h3") 
  h3El.textContent = qsObjArray[questionCounter].question;
  buttonHolderEl = document.createElement("div");
  buttonHolderEl.className = "button-holder";
  mainEl.appendChild(h3El);
  mainEl.appendChild(buttonHolderEl);
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
    var answerDisplayEl = document. createElement("section");
    answerDisplayEl.className = "answer-display";
    answerDisplayEl.textContent = "Correct!";
    mainEl.appendChild(answerDisplayEl);
  } else {
    var answerDisplayEl = document.createElement("section");
    answerDisplayEl.className = "answer-display";
    answerDisplayEl.textContent = "Wrong!";
    mainEl.appendChild(answerDisplayEl);
  }
  questionCounter++;
  clear();
  questionDisplay(questionCounter);
}

var countdown = function () {
    var timer = setInterval(function () {
    timeEl.textContent = "Time: " + intialTime;
    intialTime--;
}, 1000)
}

startButtonEl.addEventListener("click", startGame);
