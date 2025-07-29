import "./styles.css";

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (let row = 7; row >= 0; row--) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((row + col) % 2 === 0 ? "light" : "dark");
      square.dataset.coord = indexToCoord(row, col);
      board.appendChild(square);
    }
  }
}

function coordToIndex(coord) {
  const col = coord.charCodeAt(0) - 97;
  const row = parseInt(coord[1], 10) - 1;
  return [row, col];
}

function indexToCoord(row, col) {
  return String.fromCharCode(97 + col) + (row + 1);
}

const knightMoves = [
  [2, 1],
  [2, -1],
  [-2, -1],
  [-2, 1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function isValid(row, col) {
  return row >= 0 && col >= 0 && row < 8 && col < 8;
}

function knightShortestPath(start, end) {
  const [startRow, startCol] = coordToIndex(start);
  const [endRow, endCol] = coordToIndex(end);
  const queue = [[[startRow, startCol], []]];
  const visited = new Set();

  while (queue.length) {
    const [[r, c], path] = queue.shift();
    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    visited.add(key);

    const newPath = [...path, [r, c]];
    if (r === endRow && c === endCol) {
      return newPath.map(([r, c]) => indexToCoord(r, c));
    }

    for (let [dr, dc] of knightMoves) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc)) {
        queue.push([[nr, nc], newPath]);
      }
    }
  }
  return [];
}

export function showPath() {
  const start = document.getElementById("start").value.toLowerCase();
  const end = document.getElementById("end").value.toLowerCase();
  const path = knightShortestPath(start, end);

  document
    .querySelectorAll(".square")
    .forEach((sq) => sq.classList.remove("path"));

  for (let coord of path) {
    const square = document.querySelector(`[data-coord=${coord}]`);
    if (square) {
      square.classList.add("path");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  window.showPath = showPath;
});
