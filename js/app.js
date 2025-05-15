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

// Varibles
import { guessableWords, wordList } from '/js/wordlist.js';

const gameBoard = [['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', '']]

// let randomWord = wordList[Math.floor(Math.random() * wordList.length)]
let randomWord = 'MONEY'
let currentRow = 0
let gamestate = true
let currentCol = 0

// cached elements
const keys = document.querySelectorAll('.key-button')
const gameFeedback = document.querySelector('#game-feedback')
const gameOutcome = document.querySelector('#game-outcome')
const gameInfo = document.querySelector('#game-info-container')
const showTutorialButton = document.querySelector('#show-tutorial')
const exitTutorialButton = document.querySelector('#exit-tutorial')
const tutorialCard = document.querySelector('#tutorial-card')
const resetButton = document.querySelector('#reset-game')
// functions
console.log('random word is:', randomWord);
const handleKeyPress = (keyValue) => {
    if (gamestate) {
        gameFeedback.textContent = ''
        if (keyValue === 'DELETE') {
            deleteLetter()
        } else if (keyValue === 'ENTER') {
            submitGuess()
        } else if (currentCol < 5) {
            const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
            gameBoard[currentRow][currentCol] = keyValue
            tile.textContent = keyValue
            const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
            tileShadow.style.backgroundColor = 'rgb(121, 121, 121)'
            currentCol++
        } else if (currentCol >= 5) {
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
        tileShadow.style.backgroundColor = '#555555'
    } else {
            gameFeedback.textContent = 'You have nothing to delete!';
    }
}
const validateGuess = (guess) => {
    const guessLetters = guess.split('')
    const randomWordLetters = randomWord.split('')
    const similartyArray = ['absent', 'absent', 'absent', 'absent', 'absent']
    guessLetters.forEach((letter, index) => {
        const tile = document.querySelector(`#tile-${currentRow}-${index}`)
        if (letter === randomWordLetters[index]) {
            similartyArray[index] = 'correct'
            tile.style.backgroundColor = 'rgb(83,141,78)'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(83,141,78)'
                }
            })
        } else if (randomWordLetters.includes(letter)) {
            similartyArray[index] = 'present'
            tile.style.backgroundColor = 'rgb(181, 159, 59)'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    const currentColor = window.getComputedStyle(key).backgroundColor
                    console.log(currentColor);
                    if (currentColor !== 'rgb(83, 141, 78)' && currentColor !== 'rgb(181, 159, 59)') {
                        key.style.backgroundColor = 'rgb(181, 159, 59)'
                    }
                }
            })
        } else if (!randomWordLetters.includes(letter)) {
            similartyArray[index] = 'absent'
            tile.style.backgroundColor = 'rgb(18, 18, 19)'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(18, 18, 19)'
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
        gameOutcome.textContent = `Congrats you won in ${currentRow + 1} attempt`;
        gamestate = false;
        gameInfo.style.display= 'flex'
    } else if (currentRow === 5) {
        gameOutcome.textContent = `You consumed all your attempts. The correct word is ${randomWord.toLowerCase()}`;
        gamestate = false;
        gameInfo.style.display= 'flex'
    }
}
const handleKeyboardClick = (event) => {
    if (gamestate) {
        const verfiedKeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const pressedKey = event.key.toUpperCase()
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
const exitTutorial = () => {
    tutorialCard.style.display = 'none'
}
const handleRestart = () => {
    randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    currentRow = 0
    gamestate = true
    currentCol = 0
    const letterCards = document.querySelectorAll('.letter-card')
    const keyboardKeys = document.querySelectorAll('.key-button')
    // console.log(letterCards);
    letterCards.forEach(card => {
        card.textContent = ''
        card.removeAttribute('style')
    })
    keyboardKeys.forEach(key => {
        key.removeAttribute('style')
    })
    gameFeedback.textContent = ''
    gameInfo.style.display = 'none'
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
exitTutorialButton.addEventListener('click', exitTutorial)
document.addEventListener('keydown', handleKeyboardClick)
resetButton.addEventListener('click', handleRestart)