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
const wordList = [
    "apple", "brave", "cabin", "delta", "eagle", "fancy", "grape", "hover", "input", "joker",
    "knock", "latch", "mango", "noble", "ocean", "piano", "queen", "robin", "scale", "tiger",
    "urban", "vivid", "waltz", "xenon", "yacht", "zebra", "angle", "beach", "candy", "drill",
    "eager", "flood", "glide", "honey", "ideal", "jolly", "kneel", "lemon", "mirth", "nasty",
    "orbit", "paint", "quiet", "raise", "shine", "table", "unite", "voter", "whale", "yield",
    "zesty", "abide", "blaze", "chess", "ditch", "envoy", "feast", "giant", "haste", "image",
    "jumpy", "karma", "lunar", "moist", "nerdy", "olive", "punch", "quilt", "rally", "spear",
    "twist", "udder", "vigor", "worry", "xylem", "young", "zonal", "acorn", "badge", "couch",
    "daisy", "elbow", "frail", "gleam", "haunt", "irony", "jelly", "knife", "latch", "mimic",
    "niece", "oxide", "plaza", "quirk", "risky", "sloop", "tweak", "unzip", "vixen", "witty"
]
// const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
const randomWord = 'knock'

let currentRow = 0
let gamestate = false
let currentCol = 0

// cached event listeners
const keys = document.querySelectorAll('.key-button')
const gameFeedback = document.querySelector('#game-feedback')
// functions
const handleKeyPress = (keyValue) => {
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
        currentCol++
        // console.log(currentCol);
    }
}
const deleteLetter = () => {
    if (currentCol > 0) {
        currentCol--
        const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tile.textContent = ''
    }
}
const validateGuess = (guess) => {
    if (randomWord === guess) {
        console.log('word is correct');
    }
}
const submitGuess = () => {
    if (currentCol < 5) {
        gameFeedback.textContent = 'Please enter a five letters word' 
        return 
    }
    const guess = gameBoard[currentRow].join('')
    console.log("Guess submitted:", guess)
    validateGuess(guess)
    if (currentRow < 5) {
        currentRow++
        currentCol = 0
    } else {
        console.log("Game over")
        gameFeedback.textContent = 'Game over'
    }
};



// eventlisteners
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.innerText
        // console.log(keyValue);
        handleKeyPress(keyValue)
    })
});
