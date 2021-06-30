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
const submit = function () {
    const guessInput = userGuess.value;
    console.log(guessInput);
    message.innerText = "";
    const accept = validateGuess(guessInput);
    if (accept) {
        makeGuess(guessInput);
    }
    userGuess.value = "";
}

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    submit();
});

guessButton.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submit();
    }
}) 

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

//To log user guesses
const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You already guessed that letter!";
    } else {
        guessedLetters.push(letter);
        showGuesses(guessedLetters);
        reveal(guessedLetters);
    }
    console.log(guessedLetters);
}

//To display user guesses
const showGuesses = function () {
    guessed.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessed.append(li);
    }
}

//To display correctly guessed letters in secret word
const reveal = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showLetters = [];
    for (const goodGuess of wordArray) {
        if (guessedLetters.includes(goodGuess)) {
            showLetters.push(goodGuess.toUpperCase());
        } else {
            showLetters.push("●");
        }
        inProgress.innerText = showLetters.join("");
    }
    checkWin();
}

//Check if user won
const checkWin = function () {
    if (inProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">YOU WIN!</p>`;
    }
}