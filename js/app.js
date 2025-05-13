// As a user. I want to see a landing page when I arrive at the website to know I am in the right place
// As a user. I want to see a tutorial on how to play the game. to know how to play the game
// As a user. I want to see and click on keyboard layout in the page to type in words
// As a user. I want to recieve feedback when I click on a letter on the keyboard. to know that my input has been saved
// As a user. I want to be able to click back to remove letters from the word i want to write> so I can change it 
// As a user. I want to be able to click submit when I am ready to submit my word. 
// As a user. I want to see feedback based on my choice of word comparing to the right word
// As a user. I want to see feedback if a letter(s) in the word I choose is in the right word and if it is there but its place is incorrect to show me feedback for that case
// As a user. I want to see feedback if a letter(s) in the word I choose is in the right word and if it is there and its place is correct to show me feedback for that case
// AS a user. I want to see feedback if I win/lose and how much tries I had left
const gameBoard = [['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', '']]
const guessableWords = ['BROWN', 'BROAD', 'WNROB', 'QUICK', 'BROOM', 'NOBLE']

const wordList = ['BROWN']
const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
let currentRow = 0
let gamestate = true
let currentCol = 0

// cached event listeners
const keys = document.querySelectorAll('.key-button')
const gameFeedback = document.querySelector('#game-feedback')
const showTutorialButton = document.querySelector('#show-tutorial')
const tutorialCard = document.querySelector('#tutorial-card')
// functions
console.log('random word is:', randomWord);
const handleKeyPress = (keyValue) => {
    if (gamestate) {
        gameFeedback.textContent = ''
        if (keyValue === 'DELETE') {
            // console.log('Delete');
            deleteLetter()
        } else if (keyValue === 'ENTER') {
            // console.log('Submit');
            submitGuess()
        } else if (currentCol < 5) {
            const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
            gameBoard[currentRow][currentCol] = keyValue
            // console.log(gameBoard[currentRow][currentCol])
            tile.textContent = keyValue
            const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
            tileShadow.style.backgroundColor = 'rgb(110, 110, 110)'
            currentCol++
            // console.log(currentCol);
        } else if (currentCol >= 5) {
            // console.log('what are you trying to add VOID?');
            gameFeedback.textContent = 'Press Enter to make a guess!'
        }
    }
}
const deleteLetter = () => {
    if (currentCol > 0) {
        currentCol--
        const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tile.textContent = ''
        const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tileShadow.style.backgroundColor = 'rgb(167, 167, 167)'
    } else {
        // console.log('what are you trying to delete VOID?');
        gameFeedback.textContent = 'You have nothing to delete!'
    }
}
const validateGuess = (guess) => {
    const guessLetters = guess.split('')
    const randomWordLetters = randomWord.split('')
    const similartyArray = ['absent', 'absent', 'absent', 'absent', 'absent']
    // console.log(guessLetters);
    // console.log(randomWordLetters);
    guessLetters.forEach((letter, index) => {
        const tile = document.querySelector(`#tile-${currentRow}-${index}`)
        if (letter === randomWordLetters[index]) {
            similartyArray[index] = 'correct'
            // console.log(`#tile-${currentRow}-${index}`)
            tile.style.backgroundColor = 'green'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(2, 171, 7)'
                }
            })
        } else if (randomWordLetters.includes(letter)) {
            similartyArray[index] = 'present'
            // console.log(randomWordLetters.includes(letter));
            tile.style.backgroundColor = 'yellow'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(189, 202, 3)'
                }
            })
        } else if (!randomWordLetters.includes(letter)) {
            similartyArray[index] = 'absent'
            tile.style.backgroundColor = 'black'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(167, 167, 167)'
                }
            })
        }
    })
    gameEnd(similartyArray)
}
const submitGuess = () => {
    if (currentCol < 5) {
        gameFeedback.textContent = 'Please enter a five letters word'
        return
    }
    const guess = gameBoard[currentRow].join('')
    if (guessableWords.includes(guess)) {
        console.log("Guess submitted:", guess)
        validateGuess(guess)
        if (currentRow < 5) {
            currentRow++
            currentCol = 0
        }
    } else {
        gameFeedback.textContent = 'Word is not in the game'
    }
}
const gameEnd = (similartyArray) => {
    if (similartyArray.every(similarty => {
        return similarty === 'correct'
    }
    )) {
        console.log('you win');
        gameFeedback.textContent = `Congrats you won in ${currentRow + 1} attempt`;
        gamestate = false;
    } else if (currentRow === 5) {
        console.log('you lose');
        gameFeedback.textContent = `You consumed all your attempts. The correct word is ${randomWord.toLowerCase()}`;
        gamestate = false;
    }
}
const handleKeyboardClick = (event) => {
    if (gamestate) {
        const verfiedKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const pressedKey = event.key.toUpperCase()
        console.log(pressedKey)
        if (verfiedKeys.includes(pressedKey)) {
            handleKeyPress(pressedKey)
        } else if (pressedKey === 'BACKSPACE') {
            deleteLetter()
        } else if (pressedKey === 'ENTER') {
            submitGuess()
        }
    }
}
const showTutorial = () => {
    tutorialCard.style.display = 'block'
}
// eventlisteners
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.innerText
        // console.log(keyValue);
        handleKeyPress(keyValue)
    })
});
showTutorialButton.addEventListener('click', showTutorial)
document.addEventListener('keydown', handleKeyboardClick)