const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const userGuess = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainInfo = document.querySelector(".remaining");
const remainNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

//To replace secret word characters with dots
const dots = function (word) {
    const dotSpots = [];
    for (let letter of word) {
        dotSpots.push("●");
    }
    inProgress.innerText = dotSpots.join("");
};

dots(word);

//To submit user guess
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guessInput = userGuess.value;
    console.log(guessInput);
    userGuess.value = "";
    message.innerText = "";
    validateGuess(guessInput);
    makeGuess(guessInput);
});

//To validate guess is only single letter
const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You have to guess something!";
    }
    else if (input.length > 1) {
        message.innerText = "You can only guess one letter at a time!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "We're only playing with letters here, ma'am.";
    }
    else {
        return input;
    }
}

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters);
}