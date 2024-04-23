
document.addEventListener("DOMContentLoaded", function () {
    const gridSize = 5;
    let board = [];
    let emptyCell = { x: gridSize - 1, y: gridSize - 1 };

    const gameContainer = document.getElementById("game-container");

    function initializeBoard() {
      board = [];
      for (let i = 0; i < gridSize; i++) {
        board.push([]);
        for (let j = 0; j < gridSize; j++) {
          if (i === emptyCell.x && j === emptyCell.y) {
            board[i][j] = null;
          } else {
            board[i][j] = i * gridSize + j + 1;
          }
        }
      }
    }

    function renderBoard() {
      gameContainer.innerHTML = "";
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.textContent = board[i][j] || "";
          cell.dataset.x = i;
          cell.dataset.y = j;
          gameContainer.appendChild(cell);
        }
      }
    }

    function shuffleBoard() {
      for (let i = 0; i < 1000; i++) {
        const newX = emptyCell.x + Math.floor(Math.random() * 5) - 1;
        const newY = emptyCell.y + Math.floor(Math.random() * 5) - 1;

        if (isValidMove(newX, newY)) {
          swapCells(newX, newY);
        }
      }
    }

    function isValidMove(x, y) {
      return (
        (x >= 0 && x < gridSize) &&
        (y >= 0 && y < gridSize) &&
        ((x === emptyCell.x && Math.abs(y - emptyCell.y) === 1) ||
          (y === emptyCell.y && Math.abs(x - emptyCell.x) === 1))
      );
    }

    function swapCells(x, y) {
      const temp = board[emptyCell.x][emptyCell.y];
      board[emptyCell.x][emptyCell.y] = board[x][y];
      board[x][y] = temp;
      emptyCell = { x, y };
    }

    function handleCellClick(event) {
      const cell = event.target;
      const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);

      if (isValidMove(x, y)) {
        swapCells(x, y);
        renderBoard();
        checkWin();
      }
    }

    function checkWin() {
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize-1; j++) {
          if (board[i][j] !== i * gridSize + j + 1) {
            return;
          }
        }
      }
      Swal.fire({
        title: "YOU WIN!!",
        text: "Congratulations!",
      });
      // alert("Congratulations! You won!");
    }

    initializeBoard();
    renderBoard();
    shuffleBoard();

    gameContainer.addEventListener("click", handleCellClick);

    document.getElementById("start-game").addEventListener("click", function () {
      shuffleBoard();
      renderBoard();
    });

    document.getElementById("reset-game").addEventListener("click", function () {
      initializeBoard();
      renderBoard();
    });
  });
