const gameBoard = document.querySelector(`#game-board`);
const infoDisplay = document.querySelector(`#info`);
const startCells = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement(`div`);
    cellElement.id = index;
    cellElement.classList.add(`square`);
    cellElement.addEventListener(`click`, addGo);
    gameBoard.append(cellElement);
  });
}

createBoard();

let go = "aplis";
infoDisplay.textContent = "Aplis iet pirmais!";

function addGo(e) {
  const goDisplay = document.createElement(`div`);
  goDisplay.classList.add(go);

  e.target.append(goDisplay);

  go = go === "aplis" ? "krusts" : "aplis";

  infoDisplay.textContent = `Tagad iet ` + go;

  e.target.removeEventListener("click", addGo);

  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let draw = true;

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("aplis")
    );
    if (circleWins) {
      infoDisplay.textContent = "Aplis uzvar!";
      updateScore("aplis-score");
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      draw = false;
      return;
    }
  });

  if (draw) {
    const isBoardFull = [...allSquares].every(
      (square) => square.firstChild !== null
    );
    if (isBoardFull) {
      infoDisplay.textContent = "NEIZŠĶIRTS!";
    }
  }

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("krusts")
    );
    if (crossWins) {
      infoDisplay.textContent = "Krusts uzvar!";
      updateScore("krusts-score");
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      draw = false;
      return;
    }
  });
}

function updateScore(scoreId) {
  const scoreElement = document.getElementById(scoreId);
  let currentScore = parseInt(scoreElement.textContent) || 0;
  currentScore++;
  scoreElement.textContent = currentScore;
}

const newGameButton = document.getElementById("reset-button");
newGameButton.addEventListener("click", newGame);

const resetScoreButton = document.getElementById("reset-score-button");
resetScoreButton.addEventListener("click", resetScore);

function newGame() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square) => {
    square.innerHTML = "";
    square.addEventListener("click", addGo);
  });

  go = "aplis";
  infoDisplay.textContent = "Aplis sāk pirmais!";
}

function resetScore() {
  document.getElementById("aplis-score").textContent = "0";
  document.getElementById("krusts-score").textContent = "0";
}

async function fetchRandomQuote() {
  try {
    const response = await fetch(
      "https://lucifer-quotes.vercel.app/api/quotes"
    );
    if (response.ok) {
      const data = await response.json();
      const randomQuote = data[0].quote;

      const quoteDisplay = document.getElementById("quote-display");
      quoteDisplay.textContent = randomQuote;
    } else {
      console.error("Unable to fetch quote data.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the quote:", error);
  }
}

fetchRandomQuote();

const newQuoteButton = document.getElementById("new-quote");
newQuoteButton.addEventListener("click", fetchRandomQuote);
