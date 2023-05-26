//DOM Seletors
var highscoresList = document.querySelector(".highscores-list");
var clearButton = document.querySelector(".clear-button");
var backButton = document.querySelector(".back-button");

//grab the highscores
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

//create li element for each score and append it to the highscore list
for (var i = 0; i < highscores.length; i++) {
  var highscoreListItem = document.createElement("li");
  highscoreListItem.textContent =
    highscores[i].initials + " - " + highscores[i].score;
  highscoresList.appendChild(highscoreListItem);
}

//event listener to clear highscores from local storage
clearButton.addEventListener("click", function () {
  localStorage.removeItem("highscores");
  // reload the page
  location.reload();
});
//add event listener to go back to the main page
backButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
