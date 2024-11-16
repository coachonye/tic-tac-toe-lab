// ------------------- Variables (state) -------------------
let board;
let turn;
let winner;
let tie;

// ------------------- Cached Element References -------------------
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board');

// ------------------- Functions -------------------
function init() {
board = ['', '', '', '', '', '', '', '', ''];
turn = 'X';
winner = false;
tie = false;
render();
updateMessage();
}

function render() {
board.forEach((mark, index) => {
const square = squareEls[index];
square.textContent = mark;
});
}

function updateMessage() {
if (winner) {
messageEl.textContent = `${turn} Wins!`;
} else if (tie) {
messageEl.textContent = "It's a tie!";
} else {
messageEl.textContent = `Current turn: ${turn}`;
}
}

function handleClick(event) {

const squareIndex = parseInt(event.target.id);

if (board[squareIndex] || winner === true) return;


placePiece(squareIndex);


checkForWinner();
checkForTie();


switchPlayerTurn();

updateMessage();
render();
}

function placePiece(index) {
// Update the board array with the current turn
board[index] = turn;


console.log(board);
}

const winningCombos = [
[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
[0, 4, 8], [2, 4, 6]// Diagonals
];

function checkForWinner() {
for (const combo of winningCombos) {
const [a, b, c] = combo;
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
winner = true;
console.log(`Winner: ${board[a]}`); // 
return;
}
}
}

function checkForTie() {
if (winner) return;
tie = board.includes('') ? false : true;
console.log(`Tie status: ${tie}`); 
}

function switchPlayerTurn() {
if (winner) return;
turn = turn === 'X' ? 'O' : 'X';
console.log(`Current turn: ${turn}`); 
}

// ------------------- Event Listeners -------------------
boardContainer.addEventListener('click', handleClick);

// Initialize the game
init();
