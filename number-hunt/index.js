document.addEventListener('DOMContentLoaded', () => {
    const numberGrid = document.getElementById('numberGrid');
    const targetNumberDisplay = document.getElementById('targetNumber');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startGame');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const finalScore = document.getElementById('finalScore');
    const nextRoundMessage = document.getElementById('nextRoundMessage');

    const backgroundMusic = new Audio('sound/back.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;

    // Sound effects
    const successSound = document.getElementById('successSound');
    const wrongSound = document.getElementById('wrongSound');
    const gameOverSound = document.getElementById('gameOverSound');
    const levelWin = document.getElementById('levelWin');

    let timer;
    let timeLeft = 30;
    let score = 0;
    let targetNumber = 0;
    let round = 1;
    let selectedNumbers = [];

    function startGame() {
        backgroundMusic.play(); // Start background music
        resetGame();
        if (round === 1) {
            startRound1();
        } else {
            startRound2();
        }
    }

    function resetGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        gameOverMessage.classList.add('hidden');
        nextRoundMessage.classList.add('hidden');
        startButton.disabled = true;
        selectedNumbers = [];
    }

    function startRound1() {
        generateGridRound1();
        resetAndStartTimer();
    }

    function generateGridRound1() {
        numberGrid.innerHTML = '';
        const numbers = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10));

        // Ensure target exists
        targetNumber = numbers[Math.floor(Math.random() * numbers.length)];
        targetNumberDisplay.textContent = targetNumber;

        numbers.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.addEventListener('click', () => checkNumberRound1(button));
            numberGrid.appendChild(button);
        });
    }

    function checkNumberRound1(button) {
        const clickedNumber = parseInt(button.textContent);
        if (clickedNumber === targetNumber) {
            successSound.play();
            score += 2;
            scoreDisplay.textContent = score;

            // Disable the button to prevent further clicks
            button.disabled = true;

            if (score >= 20) {
                levelWin.play();
                proceedToNextRound();
            } else {
                generateGridRound1();
                resetAndStartTimer();
            }
        } else {
            wrongSound.play();
            endGame();
        }
    }

    function proceedToNextRound() {
        clearInterval(timer);
        round = 2;
        nextRoundMessage.classList.remove('hidden');
        startButton.disabled = false;
        startButton.textContent = "Start Next Round";
    }

    function startRound2() {
        generateGridRound2();
        resetAndStartTimer();
    }

    function generateGridRound2() {
        numberGrid.innerHTML = '';
        const numbers = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10));

        // Ensure at least two numbers sum to target
        const targetOptions = [];
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] <= 20) {
                    targetOptions.push(numbers[i] + numbers[j]);
                }
            }
        }

        if (targetOptions.length > 0) {
            targetNumber = targetOptions[Math.floor(Math.random() * targetOptions.length)];
            targetNumberDisplay.textContent = targetNumber;
        }

        numbers.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.addEventListener('click', () => checkNumberRound2(button));
            numberGrid.appendChild(button);
        });
    }

    function checkNumberRound2(button) {
        const number = parseInt(button.textContent);
        selectedNumbers.push(number);
        button.disabled = true; // Disable button after clicking

        if (selectedNumbers.length === 2) {
            const sum = selectedNumbers[0] + selectedNumbers[1];
            if (sum === targetNumber) {
                successSound.play();
                score += 2;
                scoreDisplay.textContent = score;

                if (score >= 40) {
                    levelWin.play();
                    alert("Next ")
                    endGame(); // End game when score reaches 40
                } else {
                    generateGridRound2();
                    resetAndStartTimer();
                }
            } else {
                wrongSound.play();
                gameOverSound.play();
                endGame();
            }
            selectedNumbers = [];
        }
    }

    function resetAndStartTimer() {
        clearInterval(timer);
        timeLeft = 30;
        timerDisplay.textContent = timeLeft;
        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                gameOverSound.play();
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(timer);
        backgroundMusic.pause(); // Pause the background music
        backgroundMusic.currentTime = 0; // Reset the music to the start
        startButton.disabled = false;
        finalScore.textContent = score;
        gameOverMessage.classList.remove('hidden');
        startButton.textContent = "Restart Game";
        gameOverSound.play();
    }

    startButton.addEventListener('click', startGame);
});
