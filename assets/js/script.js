//DOM references
var titleElem = document.querySelector(".title");
var descriptionElem = document.querySelector(".description");
var startElem = document.querySelector(".start-button");
var timeElem = document.querySelector(".time");
var feedbackElem = document.querySelector(".feedback");

//Declare Varibles
var questions = [
  {
    title: "How would you create a new object in JavaScript?",
    choices: [
      "var object = [];",
      "var object = {};",
      "var object = ();",
      "var object = //;",
    ],
    answer: "var object = {};",
  },
  {
    title: "Which is the correct way to declare a variable in JavaScript?",
    choices: ["int x = 10;", "var x = 10;", "10 > x;", "x += 10;"],
    answer: "var x = 10;",
  },
  {
    title: "What keyword is used to define a function in JavaScript?",
    choices: ["function", "method", "var", "const"],
    answer: "function",
  },
  {
    title: "Which is the correct way to create a function in JavaScript?",
    choices: [
      "function newFunction(){}",
      "newFunction(){}",
      "func = newFunction(){}",
      "newFunction: function(){}",
    ],
    answer: "function newFunction(){}",
  },
  {
    title: "Which method returns the length of a string?",
    choices: ["length()", "size()", "index()", "None of the above"],
    answer: "length()",
  },
  {
    title: "Which of the following will correctly declare an array?",
    choices: ["var arr[];", "var arr = [];", "array arr = [];", "arr{} = ();"],
    answer: "var arr = [];",
  },
  {
    title: "How do you add a comment in JavaScript?",
    choices: [
      "<!--This is a comment-->",
      "# This is a comment",
      "//This is a comment",
      "''This is a comment",
    ],
    answer: "//This is a comment",
  },
];

var timeLeft;
var currentQuestionIndex = 0;
var score = 0;
var penalty = -10;

titleElem.textContent = "Coding Quiz Challenge!";
descriptionElem.textContent =
  "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
startElem.textContent = "start quiz";

//Functions

function newQuestion() {
  //check if we run out of questions
  if (currentQuestionIndex >= questions.length) {
    // handle end of questions, stop timer, show results,
    gameOver();
    return;
  }
  //get the current question
  var currentQuestion = questions[currentQuestionIndex];
  //display the current question
  titleElem.textContent = currentQuestion.title;
  //clear the description/ answer options
  descriptionElem.innerHTML = "";

  //display the current question choices as buttons
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var button = document.createElement("button");
    button.setAttribute("class", "answer-button");
    button.textContent = currentQuestion.choices[i];
    descriptionElem.appendChild(button);
  }
  //move the next question for the next time through
  currentQuestionIndex++;
}

function checkAnswer(choice) {
  var correctAnswer = questions[currentQuestionIndex - 1].answer;
  if (correctAnswer === choice) {
    score++;
    feedbackElem.textContent = "Correct!";
  } else {
    timeLeft = timeLeft + penalty;
    feedbackElem.textContent = "Incorrect!";
  }
  //remove the feedback text after 1 second
  setTimeout(function () {
    feedbackElem.textContent = "";
  }, 1000);
  newQuestion();
}

function timer() {
  timeLeft = 75;
  var timerInterval = setInterval(function () {
    timeLeft--;
    timeElem.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}
function startQuiz() {
  startElem.style.display = "none";
  timer();
  newQuestion();
}
function gameOver() {
  timeLeft = 1;
  //display end screen
  titleElem.textContent = "Game Over!";
  descriptionElem.textContent = "Your score is: " + score;

  //need to show an input for the user to enter their initials
  var userInput = document.createElement("input");
  userInput.setAttribute("placeholder", "Enter your initials here.");
  userInput.setAttribute("class", "user-input");
  descriptionElem.appendChild(userInput);

  // create sumbit button
  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.setAttribute("class", "submit-button");
  descriptionElem.appendChild(submitButton);
}
function saveScore(initials, score) {
  //load scores
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  // add new score
  highscores.push({ initials: initials, score: score });
  //save scores
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Event Listeners
startElem.addEventListener("click", startQuiz);

descriptionElem.addEventListener("click", function (event) {
  // Check if a button was clicked
  if (event.target.className === "answer-button") {
    checkAnswer(event.target.textContent);
  }
});
descriptionElem.addEventListener("click", function (event) {
  if (event.target.className === "submit-button") {
    var initials = document.querySelector(".user-input").value;
    if (initials !== "") {
      saveScore(initials, score);
      window.location.href = "highscores.html";
    } else {
      alert("Please enter in your initials to continue.");
    }
  }
});
