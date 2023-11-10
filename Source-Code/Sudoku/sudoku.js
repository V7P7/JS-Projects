const gridSize = 9;

document.addEventListener("DOMContentLoaded", function () {
    createGrid();
    addEventListeners();
});

function createGrid() {
    const sudokuGrid = document.getElementById("sudoku-grid");
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = createCellInput(row, col);
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
}

function createCellInput(row, col) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "cell";
    input.id = `cell-${row}-${col}`;
    input.maxLength = 1;
    input.pattern = "[1-9]";  // Only allows numbers 1-9
    return input;
}

function addEventListeners() {
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener("click", solveSudoku);
    
    const restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = getCell(row, col);
            cell.value = "";
            cell.classList.remove("user-input", "solved");
        }
    }
}

function getCell(row, col) {
    return document.getElementById(`cell-${row}-${col}`);
}

async function solveSudoku() {
    const sudokuArray = getGridValues();
    markUserInputCells(sudokuArray);

    if (!validateInput(sudokuArray)) {
        alert("Invalid Sudoku puzzle. Please check your input.");
        return;
    }

    if (solveSudokuHelper(sudokuArray)) {
        displaySolution(sudokuArray);
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
    }
}

function getGridValues() {
    const sudokuArray = [];
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellValue = getCell(row, col).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }
    return sudokuArray;
}

function markUserInputCells(sudokuArray) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = getCell(row, col);
            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }
}

function displaySolution(sudokuArray) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = getCell(row, col);
            if (!cell.classList.contains("user-input")) {
                cell.value = sudokuArray[row][col];
                cell.classList.add("solved");
            }
        }
    }
}

function solveSudokuHelper(board) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudokuHelper(board)) {
                            return true;  // Puzzle solved
                        }
                        board[row][col] = 0;  // Backtrack
                    }
                }
                return false;  // No valid number found
            }
        }
    }
    return true;  // All cells filled
}

function isValidMove(board, row, col, num) {
    // Check row and column for conflicts
    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;  // Conflict found
        }
    }
    
    // Check the 3x3 subgrid for conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;  // Conflict found
            }
        }
    }
    return true;  // No conflicts found
}

function validateInput(sudokuArray) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const currentNum = sudokuArray[row][col];
            if (currentNum !== 0) {
                sudokuArray[row][col] = 0;
                if (!isValidMove(sudokuArray, row, col, currentNum)) {
                    sudokuArray[row][col] = currentNum;  // Reset the cell value
                    return false;  // Invalid input
                }
                sudokuArray[row][col] = currentNum;  // Reset the cell value
            }
        }
    }
    return true;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
