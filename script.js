const cells = document.querySelectorAll('[data-cell]');//data cells” não tem o “s” no final é apenas cell
const restartButton = document.getElementById('restartButton');
const playerXScoreEl = document.getElementById('playerXScore');
const playerOScoreEl = document.getElementById('playerOScore');
let xTurn = true;
let playerXScore = 0;
let playerOScore = 0;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],//estava 9 era 5 na vdd
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    updateScores();
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function endGame(draw) {
    if (draw) {
        setTimeout(() => {
            alert("Empate!");
            startGame();
        }, 100);
    } else {
        setTimeout(() => {
            alert(`${xTurn ? "Jogador X" : "Jogador O"} Venceu!`);
            if (xTurn) playerXScore++; else playerOScore++;//mudei o playscore de 0 para x noo (xturn)
            updateScores();
            startGame();
        }, 100);
    }
}


function updateScores() {
    playerXScoreEl.textContent = playerXScore;
    playerOScoreEl.innerText = playerOScore;

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o') || false;
    });
}


restartButton.addEventListener('click', startGame); // retirei o the por que ´´e só startGame estava startthegame


const resetScoreButton = document.getElementById('resetScoreButton');

resetScoreButton.addEventListener('click', resetScores);

function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    updateScores();
}


startGame();
