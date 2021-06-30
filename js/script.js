const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const userGuess = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainInfo = document.querySelector(".remaining");
const remainNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";

const dots = function (word) {
    const dotSpots = [];
    for (let letter of word) {
        dotSpots.push("●");
    }
    inProgress.innerText = dotSpots.join("");
};

dots(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guessInput = userGuess.value;
    console.log(guessInput);
    userGuess.value = "";
})