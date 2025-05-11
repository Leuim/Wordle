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
const guessWords = [
    "CATCH", "ABOUT", "BRACE", "ARISE", "BRICK", "CLIMB", "BLOOD", "CEASE", "APPLE", "BONUS",
    "BASIC", "BEGIN", "BATCH", "ARISE", "CHEST", "BEARD", "CHECK", "AGENT", "BELLY", "BEAST",
    "CLICK", "BREAD", "CABLE", "CARRY", "BONUS", "CHILD", "CLIMB", "CHECK", "BRUSH", "BROWN",
    "BLOCK", "BRAVE", "CHEST", "BEING", "BRUSH", "CHEST", "ANGER", "CHINA", "CHEAP", "CLIMB",
    "BRING", "BIBLE", "BLOOM", "CHART", "BEGIN", "BUILT", "BREAK", "CHECK", "BLADE", "CANDY",
    "BROAD", "CIVIC", "BENCH", "ADOPT", "BASIC", "AUDIO", "AGENT", "BONUS", "BUILT", "BRING",
    "AGENT", "CHAIN", "CIVIC", "APPLE", "BELLY", "BOAST", "APPLY", "CHEST", "BRAKE", "ALIEN",
    "BLEAK", "BEGAN", "BEING", "ALIVE", "BOARD", "BLOOD", "BOAST", "BOOST", "CLIMB", "BONUS",
    "BREAK", "CATCH", "BELLY", "CHILD", "BEING", "CLICK", "ALIEN", "BOAST", "BLOOD", "ACUTE",
    "CANDY", "CANDY", "BEING", "CHAIN", "CHILD", "BIBLE", "ANGER", "ABOVE", "CATCH", "BRAND",
    "BLOOM", "BRAKE", "AGILE", "AUDIO", "BOARD", "CHALK", "ALTER", "BLEND", "CATCH", "BIRCH",
    "ALERT", "BENCH", "BRIEF", "ADMIT", "BLADE", "BEGAN", "CLEAN", "APPLY", "ALIEN", "AUDIO",
    "CHAIR", "BRIEF", "BATCH", "BREAD", "ANGLE", "BEING", "BRUSH", "BREAK", "BLOOM", "BEARD",
    "CLEAN", "CEASE", "CHILD", "BLAME", "ADOPT", "CIVIC", "BEAST", "CHASE", "BEARD", "BRAKE",
    "CLERK", "BENCH", "CHEEK", "CLEAN", "BLEND", "BATCH", "ALIVE", "BUILD", "BEGUN", "APPLY",
    "BEGUN", "CHASE", "ALTER", "BOAST", "CIVIC", "ALIVE", "ARGUE", "BLEND", "BOAST", "CHINA",
    "CHART", "BOARD", "AUDIO", "BLEND", "ACUTE", "ALIVE", "CANDY", "CHEAP", "AUDIO", "BEAST",
    "APPLY", "BLEAK", "AGENT", "BLEND", "CHEAP", "BOARD", "CHEAP", "ACUTE", "CHAIR", "BRAIN",
    "BLOOD", "ALONG", "ARGUE", "CHAIR", "BREAD", "BROWN", "CLEAR", "CLIFF", "BOAST", "AGENT",
    "CHIEF", "CHINA", "CHART", "CLEAR", "CHINA", "BLEAK", "CATCH", "AGILE", "BLOCK", "BROWN",
    "BIRCH", "CHECK", "CLIFF", "APPLY", "CIVIC", "CHART", "BLOOM", "BOAST", "BEAST", "ARENA",
    "BRING", "BEARD", "CHALK", "CLOAK", "BEACH", "BREAD", "BRAND", "CLOAK", "CHEST", "BLEAK",
    "BLOOM", "CLOAK", "CAUSE", "CLEAR", "CLEAN", "BUILD", "BLOOD", "BRAKE", "ARISE", "BROWN",
    "CHEAP", "BRAVE", "CATCH", "AGILE", "BRAKE", "CHILD", "BLADE", "CHEEK", "ARRAY", "BEARD",
    "CLEAN", "ASIDE", "CHAIR", "CIVIC", "BUILT", "BRIDE", "ARGUE", "BONUS", "BLEAK", "APPLY",
    "CABLE", "ANGER", "CHALK", "CHEAP", "CEASE", "BLEND", "ALIEN", "CHART", "BLADE", "BRUSH",
    "AGILE", "ALIVE", "BRAKE", "BOOST", "ARISE", "ANGLE", "ASIDE", "CHASE", "BRIDE", "BOOST",
    "BROWN", "BEARD", "BROKE", "BEGUN", "CHEEK", "ASIDE", "BLEAK", "BLEAK", "BROWN", "BRIDE",
    "BUILD", "BROKE", "BLANK", "BLEAK", "ALTER", "BUILD", "CEASE", "BOAST", "ABOUT", "CATCH",
    "BRICK", "BRING", "CLIMB", "BUILT", "BEGIN", "BRIEF", "BRACE", "ANGER", "CARRY", "ABOUT",
    "AGENT", "BLOCK", "CHAIN", "ARRAY", "BURST", "AGENT", "BROWN", "CATCH", "BRAVE", "BUILT",
    "ANGLE", "BREAD", "BEGUN", "ALIVE", "BEGUN", "CLIFF", "BEGAN", "CHALK", "CHALK", "ANGER",
    "BRING", "BRAND", "CLICK", "BRICK", "BEARD", "ALTER", "BLADE", "CLERK", "CLOAK", "ARRAY",
    "BOARD", "ABOUT", "ABOVE", "CLERK", "CHASE", "ADOBE", "BEAST", "BLEND", "BEING", "ARRAY",
    "BIBLE", "ALIVE", "BRICK", "CHART", "AGILE", "BRIDE", "BATCH", "BLEND", "AGILE", "ABOUT",
    "ALIEN", "BRING", "BEGUN", "BLAME", "ALONG", "BEGIN", "CANDY", "BLADE", "ADOPT", "BLANK",
    "BRIEF", "CHINA", "CHIEF", "ADMIT", "BLEAK", "ANGLE", "BEACH", "ABOVE", "BOARD", "CLERK",
    "CABLE", "CEASE", "CABLE", "BREAK", "BELLY", "CHEEK", "CLIMB", "CHINA", "BRING", "CHECK",
    "CAUSE", "ALIVE", "BEING", "CATCH", "ASIDE", "BURST", "BATCH", "ARISE", "BELLY", "AVOID",
    "CAUSE", "ADOBE", "BEGAN", "BLAME", "CHECK", "ASIDE", "ADOPT", "ANGEL", "BREAD", "ALTER",
    "BRING", "AGILE", "BUILT", "BURST", "ARRAY", "ALBUM", "CHIEF", "CANDY", "APPLE", "ALERT",
    "ASIDE", "ALERT", "ARRAY", "CHALK", "ALIEN", "CHASE", "CIVIC", "BASIC", "BREAD", "CHECK",
    "CANDY", "BEGUN", "CLERK", "ADOPT", "ALERT", "BRIEF", "BATCH", "APPLE", "ANGLE", "ACUTE",
    "ABOUT", "CLOAK", "CHAIR", "BROWN", "ACUTE", "BRAIN", "AGENT", "BLOOM", "BRUSH", "BEGIN",
    "ANGLE", "BLADE", "CEASE", "BEGIN", "BIBLE", "BLOOD", "CHEAP", "BOOST", "BLOOM", "ALBUM",
    "AUDIO", "BRIEF", "CHAIR", "BELLY", "BLEAK", "ARISE", "BUILT", "BREAK", "CLIFF", "ADMIT",
    "ABOVE", "AWFUL", "BOUND", "ALERT", "BASIC", "CLEAN", "ADMIT", "BLOOM", "BLADE", "AGILE",
    "BOOST", "AWFUL", "CHILD", "BUILT", "CATCH", "BLEAK", "ANGER", "ARISE", "BELLY", "BASIC",
    "ALIEN", "CHART", "BRAND", "BEGIN", "CHALK", "ADOBE", "BLEAK", "AGENT", "ALIEN", "BLOCK",
    "ADMIT", "BRAVE", "BLOCK", "CLERK", "ADMIT", "BROWN", "BLOCK", "BRIEF", "CLEAN", "BEGUN",
    "BOOST", "ALONG", "ARISE", "BRAKE", "BONUS", "CLEAR", "CANDY", "BRIDE", "CHART", "BEGIN",
    "BIBLE", "CLOAK", "ABOUT", "AWFUL", "ARRAY", "BRING", "BENCH", "BRIDE", "CIVIC", "CLIFF",
    "CANDY", "ARGUE", "BONUS", "CLEAN", "CHOIR", "CHART", "APPLE", "BLADE", "ALBUM", "CHOIR",
    "BUILT", "ADMIT", "BROWN", "ARGUE", "BASIC", "BUILD", "ADOBE", "CHILD", "CLICK", "AGENT",
    "ALBUM", "BELLY", "BEARD", "AGILE", "CLEAR", "CLIMB", "ABOVE", "BRIDE", "BOAST", "CHILD",
    "AGENT", "BLACK", "BATCH", "CHART", "AWFUL", "BRING", "AUDIO", "ASIDE", "BEACH", "BIBLE",
    "CHART", "ARISE", "ANGEL", "BEAST", "BRAIN", "BELLY", "ABOVE", "CHECK", "BONUS", "BLANK",
    "CHOIR", "BOAST", "CIVIC", "BLAME", "BENCH", "CLEAR", "BLEAK", "ARGUE", "BRICK", "BRUSH",
    "BRUSH", "CAUSE", "ACTOR", "ALIVE", "CARRY", "BRAND", "BLOOD", "CAUSE", "ADMIT", "CHAIN",
    "BURST", "BLANK", "BATCH", "BURST", "BURST", "CLEAR", "BEGUN", "BONUS", "CHEEK", "BEACH",
    "BLOOM", "CHEEK", "ASIDE", "BRACE", "CHIEF", "BATCH", "BLOOM", "ALIEN", "BLEND", "CABLE",
    "CHEST", "CHOIR", "BRAVE", "CATCH", "CHILD", "CLIFF", "CHAIR", "BRACE", "BURST", "CHALK",
    "BEING", "CHALK", "CHEST", "CHIEF", "BURST", "CLIMB", "ALTER", "CAUSE", "ADOPT", "CHAIR",
    "BRIDE", "ABOUT", "CLOAK", "ADOPT", "BRUSH", "BLOOM", "BLACK", "ADMIT", "ALTER", "BRIDE",
    "CANDY", "BEGAN", "BROKE", "BENCH", "APPLE", "ADOBE", "CIVIC", "BEAST", "BEARD", "ARENA",
    "CHILD", "BURST", "AWFUL", "BLOCK", "AUDIO", "CHART", "BRICK", "CLIMB", "BEGIN", "ABOVE",
    "BRUSH", "ASIDE", "BLOOD", "BLOCK", "CHOIR", "CHINA", "ADOBE", "ACUTE", "CHEST", "BOARD",
    "BEGUN", "BOOST", "BEING", "ALONG", "BOUND", "CHART", "BRAKE", "CHAIN", "BRAND", "ARGUE",
    "CLOAK", "BIRCH", "BLADE", "BLACK", "CHINA", "CHILD", "ARGUE", "APPLY", "ABOUT", "AGENT",
    "CHOIR", "ARGUE", "ARENA", "ABOVE", "BLEAK", "ADMIT", "BROKE", "BRING", "CHASE", "BEGUN",
    "BROWN", "ALIVE", "CATCH", "CANDY", "BLAME", "BEGUN", "BLOCK", "CIVIC", "BRACE", "CARRY",
    "BEGAN", "BROWN", "CIVIC", "CLICK", "CHOIR", "BRAND", "CLICK", "ALONG", "BRIEF", "BROAD",
    "CHEEK", "CATCH", "BLAME", "BLOOD", "BOUND", "BRAIN", "BLOOM", "CAUSE", "CIVIC", "ACUTE",
    "BROKE", "CLICK", "BEACH", "BEGIN", "CHALK", "CATCH", "CANDY", "BRING", "CLICK", "BLOCK",
    "ALIVE", "AGENT", "ALTER", "BREAK", "ALIEN", "ARGUE", "CLIFF", "CHART", "BOARD", "CHEEK",
    "ANGLE", "CEASE", "AGILE", "AWFUL", "ARGUE", "ABOVE", "BOUND", "CLEAN", "BRAVE", "ACTOR",
    "CHAIN", "BRACE", "CABLE", "BROKE", "AUDIO", "BLOOM", "ALIEN", "BROAD", "BUILT", "BRIDE",
    "BIRCH", "BLEND", "AUDIO", "ANGER", "ARGUE", "BROAD", "ABOVE", "ACTOR", "BRAKE", "BLOOM",
    "BOAST", "BEGIN", "CHILD", "BLOOD", "BRAIN", "APPLE", "ADMIT", "APPLE", "ABOUT", "AVOID",
    "ARISE", "BEGAN", "BEGUN", "BELLY", "BASIC", "BRACE", "BRICK", "CHEST", "BASIC", "BROKE",
    "CHILD", "BEAST", "ADOPT", "CLIMB", "BEGUN", "ANGER", "BEACH", "AVOID", "ADMIT", "CHEEK",
    "CLOAK", "CHEAP", "CEASE", "ARRAY", "BREAD", "BONUS", "BUILT", "ANGER", "BROKE", "BREAD",
    "CHECK", "BRUSH", "BROKE", "ADMIT", "AGILE", "CHAIN", "BRIEF", "BRICK", "BLOCK", "BURST",
    "ANGEL", "BASIC", "BROKE", "CEASE", "ANGER", "ARGUE", "BIBLE", "BIBLE", "BRIDE", "BRING",
    "BLACK", "CHALK", "BRAND", "CHIEF", "BRAVE", "CHEST", "BEGUN", "BREAD", "ADMIT", "BOOST",
    "ABOVE", "ALERT", "ARGUE", "BRAVE", "BRICK", "ABOVE", "BONUS", "CLERK", "BATCH", "CHOIR",
    "BUILD", "CHOIR", "BRAND", "BRUSH", "CEASE", "BLEND", "BEGAN", "BEACH", "BEARD", "BATCH",
    "BUILT", "ARGUE", "CLEAN", "ARRAY", "BREAK", "BLANK", "CABLE", "CATCH", "BROWN", "BREAK",
    "ANGLE", "CHILD", "CIVIC", "CHAIR", "CLERK", "BLANK", "BLACK", "AGILE", "CHAIN", "CLEAR",
    "APPLY", "BASIC", "ANGLE", "CHASE", "BLANK", "ARENA", "ARGUE", "BUILD", "BLOOM", "BREAD",
    "CHOIR", "BRAKE", "AGENT", "CHINA", "CHIEF", "CHEEK", "BONUS", "BRAKE", "AGILE", "BROWN",
    "CHALK", "ARRAY", "AGENT", "BLEND", "BENCH", "CHEEK", "APPLE", "CHAIN", "CANDY", "ANGLE",
    "ALONG", "ADOPT", "AGILE", "BROAD", "CEASE", "ANGLE", "ARGUE", "BRIDE", "ALBUM", "ADOBE",
    "BLANK", "ABOUT", "CHILD", "BRAIN", "BLEAK", "CAUSE", "BROAD", "CLICK", "BENCH", "CLEAN",
    "APPLY", "CHAIR", "BEACH", "BELLY", "CABLE", "BURST", "BEARD", "CHILD", "CATCH", "BRAND",
    "BIBLE", "CLIMB", "ADMIT", "BRUSH", "ADMIT", "BLANK", "CHASE", "BRIEF", "CHAIN", "BROKE",
    "BLOOM", "BIBLE", "ACUTE", "BOOST", "ASIDE", "ALIVE", "CLIFF", "BEGIN", "BATCH", "BENCH",
    "CLIFF", "BEGIN", "CHALK", "BEGUN", "CLICK", "BLACK", "BRUSH", "ADOBE", "ABOUT", "CHART",
    "BLOOD", "AUDIO", "BASIC", "BIBLE", "BURST", "BATCH", "BENCH", "BLACK", "BRUSH", "CATCH",
    "BLADE", "BLOCK", "ALONG", "BOAST", "ABOUT", "BOARD", "BLEAK", "CHAIR", "CHAIR", "ARRAY"
];
const wordList = [
    "CHEEK", "CATCH", "BLAME", "BLOOD", "BOUND", "BRAIN", "BLOOM", "CAUSE", "CIVIC", "ACUTE",
    "BROKE", "CLICK", "BEACH", "BEGIN", "CHALK", "CATCH", "CANDY", "BRING", "CLICK", "BLOCK",
    "ALIVE", "AGENT", "ALTER", "BREAK", "ALIEN", "ARGUE", "CLIFF", "CHART", "BOARD", "CHEEK",
    "ANGLE", "CEASE", "AGILE", "AWFUL", "ARGUE", "ABOVE", "BOUND", "CLEAN", "BRAVE", "ACTOR",
    "CHAIN", "BRACE", "CABLE", "BROKE", "AUDIO", "BLOOM", "ALIEN", "BROAD", "BUILT", "BRIDE",
    "ASIDE", "ALERT", "ARRAY", "CHALK", "ALIEN", "CHASE", "CIVIC", "BASIC", "BREAD", "CHECK",
    "CANDY", "BEGUN", "CLERK", "ADOPT", "ALERT", "BRIEF", "BATCH", "APPLE", "ANGLE", "ACUTE",
    "ABOUT", "CLOAK", "CHAIR", "BROWN", "ACUTE", "BRAIN", "AGENT", "BLOOM", "BRUSH", "BEGIN",
    "ANGLE", "BLADE", "CEASE", "BEGIN", "BIBLE", "BLOOD", "CHEAP", "BOOST", "BLOOM", "ALBUM",
    "AUDIO", "BRIEF", "CHAIR", "BELLY", "BLEAK", "ARISE", "BUILT", "BREAK", "CLIFF", "ADMIT",
]
const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
// const randomWord = 'knock'

let currentRow = 0
let gamestate = false
let currentCol = 0

// cached event listeners
const keys = document.querySelectorAll('.key-button')
const gameFeedback = document.querySelector('#game-feedback')

// functions
console.log('random word is:', randomWord);
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
        const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tileShadow.style.backgroundColor = 'rgb(173, 173, 173)'
        currentCol++
        // console.log(currentCol);
    } else if (currentCol >= 5) {
        // console.log('what are you trying to add VOID?');
        gameFeedback.textContent = 'Press Enter to make a guess!'
    }
}
const deleteLetter = () => {
    if (currentCol > 0) {
        currentCol--
        const tile = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tile.textContent = ''
        const tileShadow = document.querySelector(`#tile-${currentRow}-${currentCol}`)
        tileShadow.style.backgroundColor = 'rgb(110, 110, 110)'
    } else {
        // console.log('what are you trying to delete VOID?');
        gameFeedback.textContent = 'You have nothing to delete!'
    }
}
const validateGuess = (guess) => {
    let guessLetters = null
    let randomWordLetters = null

    guessLetters = guess.split('')
    randomWordLetters = randomWord.split('')
    console.log(guessLetters);
    console.log(randomWordLetters);
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
    if (guessWords.includes(guess)) {
        console.log("Guess submitted:", guess)
        validateGuess(guess)
        if (currentRow < 5) {
            currentRow++
            currentCol = 0
        } else {
            console.log("Game over")
            gameFeedback.textContent = 'Game over'
        }
    } else {
        gameFeedback.textContent = 'Word is not in the game'
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
