let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();

    // Prevent default touch behaviors that might interfere with the game
    document.body.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    }, { passive: false });

    // Restart button event
    document.getElementById("restart-btn").addEventListener("click", restartGame);
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();

        // Add both click and touch event listeners for mobile compatibility
        tile.addEventListener("click", selectTile);
        tile.addEventListener("touchstart", handleTouch, { passive: false });
        
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function handleTouch(e) {
    e.preventDefault();
    e.stopPropagation();
    selectTile.call(this);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.draggable = false;
    mole.style.userSelect = 'none';
    mole.style.pointerEvents = 'none';

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    plant.draggable = false;
    plant.style.userSelect = 'none';
    plant.style.pointerEvents = 'none';

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();

        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => this.style.transform = 'scale(1)', 100);
    } 
    else if (this == currPlantTile) {
        gameOver = true;
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();

        // Show game over modal
        showGameOver();
    }
}

function showGameOver() {
    const modal = document.getElementById("game-over");
    const finalScore = document.getElementById("final-score");
    finalScore.innerText = score;
    modal.style.display = "flex";
}

function restartGame() {
    location.reload(); // simple page reload to reset everything
}
