function getHighScore() {
    return localStorage.getItem("highScore") || 0;
}

function setHighScore(score) {
    localStorage.setItem("highScore", score);
}

function checkHighScore() {
    let highScore = getHighScore();
    if (score > highScore) {
        setHighScore(score);
        alert(`🎉 New High Score: ${score}!`);
    }
}
