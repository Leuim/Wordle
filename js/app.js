// Varibles
import { guessableWords, wordList } from './wordlist.js';
const gameBoard = [['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', ''],
['', '', '', '', '']]

let randomWord = wordList[Math.floor(Math.random() * wordList.length)]
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
const gameTutorial = document.querySelector('#game-tutorial-container')
const resetButton = document.querySelector('#reset-game')
// functions
const handleKeyPress = (keyValue) => {
    if (gamestate) {
        if (keyValue === 'DELETE') {
            deleteLetter()
        } else if (keyValue === 'ENTER') {
            submitGuess()
        } else if (currentCol < 5) {
            playClickSfx()
            const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
            gameBoard[currentRow][currentCol] = keyValue
            tile.textContent = keyValue
            const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
            tileShadow.style.backgroundColor = 'rgb(66, 66, 66)'
            currentCol++
        } else if (currentCol >= 5) {
            gameFeedback.textContent = 'Press Enter to make a guess!'
            setTimeout(() => {
                gameFeedback.textContent = '';
            }, 3000);
        }
    }
}

const deleteLetter = () => {
    playDeleteSfx()
    if (currentCol > 0) {
        currentCol--
        const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tile.textContent = ''
        const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tileShadow.style.backgroundColor = '#555555'
    } else {
        gameFeedback.textContent = 'You have nothing to delete!';
        setTimeout(() => {
            gameFeedback.textContent = '';
        }, 3000);
    }
}

const validateGuess = (guess) => {
    const guessLetters = guess.split('')
    const randomWordLetters = randomWord.split('')
    const similartyPositions = ['absent', 'absent', 'absent', 'absent', 'absent']
    const letterCount = {};
    for (const char of randomWord) {
        letterCount[char] = (letterCount[char] || 0) + 1;
    }
    guessLetters.forEach((letter, index) => {
        const tile = document.querySelector(`#tile-${currentRow}-${index}`)
        if (letter === randomWordLetters[index]) {
            letterCount[letter]--
            similartyPositions[index] = 'correct'
            tile.style.backgroundColor = 'rgb(83, 141, 78)'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(83, 141, 78)'
                }
            })
        }
    })

    guessLetters.forEach((letter, index) => {
        const tile = document.querySelector(`#tile-${currentRow}-${index}`)
        if (similartyPositions[index] === 'correct' || similartyPositions[index] === 'present') {
            return
        }
        if (randomWordLetters.includes(letter) && letterCount[letter] > 0) {
            letterCount[letter]--
            similartyPositions[index] = 'present'
            tile.style.backgroundColor = 'rgb(181, 159, 59)'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    const currentColor = window.getComputedStyle(key).backgroundColor
                    if (currentColor !== 'rgb(83, 141, 78)' && currentColor !== 'rgb(181, 159, 59)') {
                        key.style.backgroundColor = 'rgb(181, 159, 59)'
                    }
                }
            })
        } else {
            similartyPositions[index] = 'absent'
            tile.style.backgroundColor = 'rgb(37, 37, 38)'
            keys.forEach(key => {
                if (key.textContent === letter) {
                    key.style.backgroundColor = 'rgb(37, 37, 38)'
                }
            })
        }
    })
    gameEnd(similartyPositions)
}

const submitGuess = () => {
    if (currentCol < 5) {
        gameFeedback.textContent = 'Please enter a five letters word'
        setTimeout(() => {
            gameFeedback.textContent = '';
        }, 3000);
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
        setTimeout(() => {
            gameFeedback.textContent = '';
        }, 3000);
    }
}
const gameEnd = (similartyPositions) => {
    if (similartyPositions.every(similartyPosition => {
        return similartyPosition === 'correct'
    }
    )) {
        playWinSfx()
        if (currentRow + 1 === 1) {
            gameOutcome.textContent = `Congrats you won in ${currentRow + 1} attempt`;
            gamestate = false;
            gameInfo.style.display = 'flex'
        }
        else {
            gameOutcome.textContent = `Congrats you won in ${currentRow + 1} attempts`;
            gamestate = false;
            gameInfo.style.display = 'flex'
        }
    } else if (currentRow === 5) {
        gameOutcome.textContent = `You consumed all your attempts. The correct word is ${randomWord.toLowerCase()}`;
        gamestate = false;
        gameInfo.style.display = 'flex'
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
    gameTutorial.style.display = 'flex'
}

const exitTutorial = () => {
    gameTutorial.style.display = 'none'
}

const handleRestart = () => {
    randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    currentRow = 0
    gamestate = true
    currentCol = 0
    const letterCards = document.querySelectorAll('.letter-card')
    letterCards.forEach(card => {
        card.textContent = ''
        card.removeAttribute('style')
    })
    keys.forEach(key => {
        key.removeAttribute('style')
    })
    gameFeedback.textContent = ''
    gameInfo.style.display = 'none'
}

const playClickSfx = () => {
    const audio = new Audio('/Wordle/soundeffects/click.wav')
    audio.play()
}

const playDeleteSfx = () => {
    const audio = new Audio('/Wordle/soundeffects/delete.wav')
    audio.play()
}
const playWinSfx = () => {
    const audio = new Audio('/Wordle/soundeffects/win.wav')
    audio.play()
}
// eventlisteners
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.innerText
        handleKeyPress(keyValue)
    })
});
showTutorialButton.addEventListener('click', showTutorial)
exitTutorialButton.addEventListener('click', exitTutorial)
document.addEventListener('keydown', handleKeyboardClick)
resetButton.addEventListener('click', handleRestart)