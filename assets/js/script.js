var titleElem = document.querySelector(".title");
var descriptionElem = document.querySelector(".description");
var startElem = document.querySelector("button");
var timeElem = document.querySelector(".time");

titleElem.textContent = "Coding Quiz Challenge!";
descriptionElem.textContent =
  "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
startElem.textContent = "start quiz";

var timeLeft;

function timer() {
  timeLeft = 75;
  var timerInterval = setInterval(function () {
    timeLeft--;
    timeElem.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      //do something
    }
  }, 1000);
}

function startQuiz() {
  timer();
}

startElem.addEventListener("click", startQuiz);
