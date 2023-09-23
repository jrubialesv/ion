// test

class Connect4 {
    constructor() {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        this.player = 1;
        this.winner = 0;
    }
}

function newGame() {
    let game = new Connect4();
    // Store the object in local storage
    localStorage.setItem('game', JSON.stringify(game));
    printBoard();
}

function changePlayer() {
    let game = JSON.parse(localStorage.getItem('game'));
    if (game.player === 1) {
        game.player = 2;
    }
    else {
        game.player = 1;
    }
    localStorage.setItem('game', JSON.stringify(game));
}

function printBoard(column){
    let data = JSON.parse(localStorage.getItem('game'));
    // Refresh the board
    document.getElementById('board').innerHTML = '';
    // Create one button per colum with class row
    document.getElementById('board').innerHTML += '<div class="row"></div>';
    for (let i = 0; i < 7; i++) {
        let button = document.createElement('button');
        // Set name of the button
        button.innerHTML = i;
        button.setAttribute('class', 'but');
        button.setAttribute('onclick', 'drop(' + i + ');');
        document.getElementById('board').appendChild(button);
    }
    changePlayer();

    // Create one div per row with class row
    for (let i = 0; i < 6; i++) {
        // HTML code to print the board in div board and cell
        document.getElementById('board').innerHTML += '<div class="row" id="row' + i + '"></div>';
        for (let j = 0; j < 7; j++) {
            document.getElementById('row' + i).innerHTML += '<div class="cell" id="cell' + i + j + '"></div>';
            if (data.board[i][j] === 1) {
                document.getElementById('cell' + i + j).style.backgroundColor = 'red';
            }
            else if (data.board[i][j] === 2) {
                document.getElementById('cell' + i + j).style.backgroundColor = 'yellow';
            }
        }
    }
}

function animation(column) {
    let data = JSON.parse(localStorage.getItem('game'));
    // When a column is selected, animate the drop
    // get the first empty row in the column
    let row = 0;
    for (let i = 5; i >= 0 ; i--) {
        if (data.board[i][column] === 0) {
            // Change the color of the cell
            if (data.player === 1) {
                // chane background color of the cell
                document.getElementById('cell' + i + column).style.backgroundColor = 'yellow';
            }
            else if (data.player === 2) {
                // chane background color of the cell
                document.getElementById('cell' + i + column).style.backgroundColor = 'red';
            }
            // wait one second without doing anything
            setTimeout(function() {
                document.getElementById('cell' + i + column).style.backgroundColor = 'white';
                // Print the board
            } ,500 * i);
        }
        // Print the board
        if (data.board[i][column] === 1) {
            // chane background color of the cell
            document.getElementById('cell' + i + column).style.backgroundColor = 'red';
        }
        else if (data.board[i][column] === 2) {
            // chane background color of the cell
            document.getElementById('cell' + i + column).style.backgroundColor = 'yellow';
        }
    }
    // Save the object in local storage
    localStorage.setItem('game', JSON.stringify(data));
    // Check if there is a winner
    checkWinner();
}

function drop(column) {
    // TODO: drop a piece in the given column
    // Find the first empty row in the given column and set it to 1
    // Get the game object from local storage
    let game = JSON.parse(localStorage.getItem('game'));
    // Find the first empty row in the given column
    for (let i = 5; i >= 0 ; i--) {
        if (game.board[i][column] === 0) {
            game.board[i][column] = game.player;
            break;
        }
    }
    // Store the object in local storage
    localStorage.setItem('game', JSON.stringify(game));
    // Print the board
    printBoard();
    animation(column);
}

function checkWinner() {
    let data = JSON.parse(localStorage.getItem('game'));
    // Check if there is a winner in the board 4 in a row
    // Check horizontal
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (data.board[i][j] === data.player && data.board[i][j + 1] === data.player && data.board[i][j + 2] === data.player && data.board[i][j + 3] === data.player) {
                data.winner = data.player;
            }
        }
    }
    // Check vertical
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (data.board[i][j] === data.player && data.board[i + 1][j] === data.player && data.board[i + 2][j] === data.player && data.board[i + 3][j] === data.player) {
                data.winner = data.player;
            }
        }
    }
    // Check diagonal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (data.board[i][j] === data.player && data.board[i + 1][j + 1] === data.player && data.board[i + 2][j + 2] === data.player && data.board[i + 3][j + 3] === data.player) {
                data.winner = data.player;
            }
        }
    }
    // Check diagonal
    for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (data.board[i][j] === data.player && data.board[i - 1][j + 1] === data.player && data.board[i - 2][j + 2] === data.player && data.board[i - 3][j + 3] === data.player) {
                data.winner = data.player;
            }
        }
    }

    // Store the object in local storage
    localStorage.setItem('game', JSON.stringify(data));
}

function checkDraw() {
    let data = JSON.parse(localStorage.getItem('game'));
    // Check if there is a draw
    let draw = true;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (data.board[i][j] === 0) {
                draw = false;
            }
        }
    }
    if (draw) {
        data.winner = 3;
    }
    // Store the object in local storage
    localStorage.setItem('game', JSON.stringify(data));
}

function checkGameOver() {
    let data = JSON.parse(localStorage.getItem('game'));
    // Check if the game is over
    if (data.winner === 0) {
        checkWinner();
        checkDraw();
    }
    if (data.winner === 1) {
        document.getElementById('message').innerHTML = 'Red player wins!';
        // Reset the game
        resetGame();
    }
    else if (data.winner === 2) {
        document.getElementById('message').innerHTML = 'Yellow player wins!';
        // Reset the game
        resetGame();
    }
    else if (data.winner === 3) {
        document.getElementById('message').innerHTML = 'Draw!';
        // Reset the game
        resetGame();
    }
}

function resetGame() {
    // Reset the game
    let data = JSON.parse(localStorage.getItem('game'));
    // Reset the board
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            data.board[i][j] = 0;
        }
    }
    // Reset the player
    data.player = 1;
    // Reset the winner
    data.winner = 0;
    // Store the object in local storage
    localStorage.setItem('game', JSON.stringify(data));
    // Print the board
    printBoard();
}
