// create startButtonEl to allow listening of button click to start game
var startButtonEl = document.querySelector(".btn");
var mainEl = document.querySelector("main");
var timeEl = document.querySelector("time");

// questions array containing questions
var questions = ["Commonly used data types DO NOT include:", "The condition in an if/else statement is inclosed within ____.", "Arrays in JavaScript can be used to store ___.", "String values must be enclosed within ___ when being assigned to variables.", "A very useful tool used during development and debugging for printing content to the debugger is:"];

questionCounter = 0;
intialTime = 75;

var qsObjArray = [{
    questionId: 0,
    question: questions[questionCounter],
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
    },
    {
    questionId: 1,
    question: questions[questionCounter],
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses" 
    },
    {
    questionId: 2,
    question: questions[questionCounter],
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],              
    correctAnswer: "all of the above"
    },
    { 
    questionId: 3,
    question: questions[questionCounter],
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
    },
    {
    questionId: 4,
    question: questions[questionCounter],
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"
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

var questionDisplay = function (questionCount) {
    countdown();

    // displays question for user
    h3El = document.createElement("h3");
    h3El.textContent = qsObjArray[questionCounter].question;
    mainEl.appendChild(h3El);
    // changes align item property to align all main child elements
    mainEl.style.alignItems = "flex-start";

  // create four buttons as answer options
    for (var i = 0; i < qsObjArray[questionCount].answers.length; i++) {
        var answerButtonEl = document.createElement("button");
        answerButtonEl.className = "btn";
        answerButtonEl.textContent = (i + 1) + ". " + qsObjArray[questionCount].answers[i];
        // appends to main element
        mainEl.appendChild(answerButtonEl);
  }
}

var countdown = function () {
    var timer = setInterval(function () {
    timeEl.textContent = "Time: " + intialTime;
    intialTime--;
}, 1000)
}


startButtonEl.addEventListener("click", startGame);