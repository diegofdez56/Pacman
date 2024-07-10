document.addEventListener("DOMContentLoaded", (event) => {
  const pacman = document.getElementById("pacman");
  const gameContainer = document.getElementById("game-container");
  const scoreBoard = document.getElementById("score");
  const gameOverMessage = document.getElementById("game-over");
  
  let score = 0;
  let ghostsEaten = 0;
  let gameOver = false;

  function updateScore(points) {
    if (gameOver) return;
    score += points;
    scoreBoard.innerText = score.toString().padStart(4, "0");
    if (score >= 5000) {
      endGame();
    }
  }

  function endGame() {
    gameOver = true;
    gameOverMessage.style.display = "block";
    document.querySelectorAll(".ghost, .cherry").forEach((element) => {
      element.replaceWith(element.cloneNode(true));
    });
    clearInterval(ghostInterval);
  }

  function createGhost() {
    if (gameOver) return;
    const ghost = document.createElement("div");
    ghost.className = "ghost";
    ghost.style.width = "100px";
    ghost.style.height = "100px";
    ghost.style.position = "absolute";
    ghost.style.top = `${Math.random() * (gameContainer.clientHeight - 100)}px`;
    ghost.style.left = `${Math.random() * (gameContainer.clientWidth - 100)}px`;
    ghost.style.background =
      'url("./../img/fantasmito.png") no-repeat center center';
    ghost.style.backgroundSize = "cover";
    ghost.addEventListener("click", () => {
      if (gameOver) return;
      gameContainer.removeChild(ghost);
      pacman.style.top = ghost.style.top;
      pacman.style.left = ghost.style.left;
      ghostsEaten += 1;
      updateScore(100);
      if (ghostsEaten % 3 === 0) {
        createCherry();
      }
    });
    gameContainer.appendChild(ghost);
  }

  function createCherry() {
    if (gameOver) return;
    const cherry = document.createElement("div");
    cherry.className = "cherry";
    cherry.style.width = "100px";
    cherry.style.height = "100px";
    cherry.style.position = "absolute";
    cherry.style.top = `${
      Math.random() * (gameContainer.clientHeight - 100)
    }px`;
    cherry.style.left = `${
      Math.random() * (gameContainer.clientWidth - 100)
    }px`;
    cherry.style.background =
      'url("./../img/cherry.png") no-repeat center center';
    cherry.style.backgroundSize = "cover";
    cherry.addEventListener("click", () => {
      if (gameOver) return;
      gameContainer.removeChild(cherry);
      pacman.style.top = cherry.style.top;
      pacman.style.left = cherry.style.left;
      updateScore(500);
    });
    gameContainer.appendChild(cherry);
  }

  const ghostInterval = setInterval(createGhost, 2000);
});
