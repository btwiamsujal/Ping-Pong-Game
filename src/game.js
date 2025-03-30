const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const rodWidth = 150, rodHeight = 15; 
let rodX = (canvas.width - rodWidth) / 2;
const rodSpeed = 20;

const ballSize = 12;
let ballX, ballY, ballSpeedX, ballSpeedY;
let gameStarted = false;

let score = 0, highScore = getHighScore();
let playerName = getPlayerName(); // Get player's Name

// Function to Get Player's Name
function getPlayerName() {
    return localStorage.getItem("playerName") || "Player";
}

// Function to Set Player's Name
function setPlayerName() {
    let newName = prompt("Enter your name:") || "Player";
    localStorage.setItem("playerName", newName);
    playerName = newName;
}

// Get High Score from Storage
function getHighScore() {
    return parseInt(localStorage.getItem("highScore")) || 0;
}

// Check and Update High Score
function checkHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        alert(`🎉 New High Score! ${highScore}`);
    }
}

// Reset High Score
function resetHighScore() {
    localStorage.setItem("highScore", 0);
    highScore = 0;
    alert("🏆 High Score has been reset!");
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = (Math.random() > 0.5 ? 5 : -5);
    ballSpeedY = 5; 
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        resetBall();
        score = 0;
    }
}

// Event Listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && rodX > 0) rodX -= rodSpeed;
    if (e.key === "ArrowRight" && rodX + rodWidth < canvas.width) rodX += rodSpeed;
    if (e.key === "Enter") startGame();
    if (e.key === "r") resetHighScore();
    if (e.key === "n") setPlayerName(); // Change name dynamically
});

function update() {
    if (!gameStarted) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX <= 0 || ballX >= canvas.width - ballSize) ballSpeedX *= -1;

    if ((ballY <= rodHeight && ballX > rodX && ballX < rodX + rodWidth) || 
        (ballY >= canvas.height - rodHeight && ballX > rodX && ballX < rodX + rodWidth)) {
        ballSpeedY *= -1; 
        score++;
    }

    if (ballY < 0 || ballY > canvas.height) {
        checkHighScore();
        resetGame();
    }
}

function resetGame() {
    gameStarted = false;
    alert(`Game Over! ${playerName}, Your Score: ${score}`);
    resetBall();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(rodX, 0, rodWidth, rodHeight);
    ctx.fillRect(rodX, canvas.height - rodHeight, rodWidth, rodHeight);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white"; // Make text visible
    ctx.font = "16px Arial";
    ctx.fillText(`Player: ${playerName}`, 10, 20);
    ctx.fillText(`Score: ${score}`, 10, 40);
    ctx.fillText(`High Score: ${highScore}`, 10, 60);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
