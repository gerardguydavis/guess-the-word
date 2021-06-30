const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const userGuess = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainInfo = document.querySelector(".remaining");
const remainNum = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//To generate random word
const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim();
    dots(word);
}

getWord();

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

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submit();
    }
}) 

//To validate guess is only single letter
const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (remainingGuesses === 0) {
        message.innerText = `GAME OVER! The secret word was ${word.toUpperCase()}!`;
        remainInfo.innerText = `Sorry, you've already lost! Click "Play Again" to start a new game!`
    }
    else if (input.length === 0) {
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
        guessesLeft(letter);
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

//Count remaining guesses
const guessesLeft = function (guess) {
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
            message.innerText = "NOPE!";
            remainingGuesses -= 1;
        } else {
            message.innerText = "Yes! Good guessin'!"
        }

    if (remainingGuesses === 0) {
        message.innerText = `GAME OVER! The secret word was ${word.toUpperCase()}!`;
        remainInfo.innerText = "";
        startOver();
    } else if (remainingGuesses === 1) {
        remainInfo.innerText = `Think carefully! You only have one guess left!`;
    } else {
        remainNum.innerText = `${remainingGuesses} guesses`;
    }
}


//Check if user won
const checkWin = function () {
    if (inProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">YOU WIN!</p>`;
        startOver();
    }
}

//To start game over
const startOver = function () {
    guessButton.classList.add("hide");
    guessed.classList.add("hide");
    playAgain.classList.remove("hide");
}

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessed.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    guessed.classList.remove("hide");
    remainInfo.classList.remove("hide");
    remainInfo.innerHTML = `<p class="remaining">You have <span>8 guesses</span> remaining.</p>`;
    getWord();
    playAgain.classList.add("hide");
    guessButton.classList.remove("hide");
})