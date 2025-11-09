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
}

function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        
        // Add both click and touch event listeners for mobile compatibility
        tile.addEventListener("click", selectTile);
        tile.addEventListener("touchstart", handleTouch, { passive: false });
        
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); // 1000 miliseconds = 1 second, every 1 second call setMole
    setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant
}

function handleTouch(e) {
    // Prevent default touch behavior and prevent click event from firing
    e.preventDefault();
    e.stopPropagation();
    
    // Call selectTile with the correct context
    selectTile.call(this);
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    
    // Prevent image dragging on mobile
    mole.draggable = false;
    mole.style.userSelect = 'none';
    mole.style.webkitUserSelect = 'none';
    mole.style.pointerEvents = 'none';

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    
    // Prevent image dragging on mobile
    plant.draggable = false;
    plant.style.userSelect = 'none';
    plant.style.webkitUserSelect = 'none';
    plant.style.pointerEvents = 'none';

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
        
        // Add visual feedback for mobile
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
        
        // Add visual feedback for game over
        this.style.transform = 'scale(0.95)';
    }
}