//DOM Seletors
var highscoresList = document.querySelector(".highscores-list");

//grab the highscores
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

//create li element for each score and append it to the highscore list
for (var i = 0; i < highscores.length; i++) {
  var highscoreListItem = document.createElement("li");
  highscoreListItem.textContent =
    highscores[i].initials + " - " + highscores[i].score;
  highscoresList.appendChild(highscoreListItem);
}
