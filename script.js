const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let currentTurn = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index), { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(cell, index) {
    if (!isGameActive || board[index]) return;

    board[index] = currentTurn;
    cell.textContent = currentTurn;

    if (checkWin(currentTurn)) {
        gameStatus.textContent = `${currentTurn} wins!`;
        isGameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        gameStatus.textContent = 'Draw!';
        isGameActive = false;
        return;
    }

    currentTurn = currentTurn === 'X' ? 'O' : 'X';
    gameStatus.textContent = `It's ${currentTurn}'s turn`;
}

function checkWin(currentTurn) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return board[index] === currentTurn;
        });
    });
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    isGameActive = true;
    currentTurn = 'X';
    gameStatus.textContent = `It's ${currentTurn}'s turn`;
}
