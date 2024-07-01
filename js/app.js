/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const sqrElements = document.querySelectorAll('.sqr');
const messageElement = document.querySelector('#message');
const resetBtn = document.querySelector('.reset');

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    console.log('The app works');
    render();
}
const render = () => {
    sqrElements.forEach((square, index) => {
        square.innerText = board[index];
    });
    if (winner) {
        messageElement.innerText = `${turn === 'X' ? 'O' : 'X'} wins!`;
    } else if (tie) {
        messageElement.innerText = "It's a tie!";
    } else {
        messageElement.innerText = `Turn: ${turn}`;
    }
}
const handleClick = (event) => {
    const index = Number(event.target.id); 
    if (board[index] === '' && !winner) {
        board[index] = turn;
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
        Winner();
        checkTie();
        render();
    }
}


const Winner = () => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 8], [3, 6, 9],
        [0, 4, 8], [2, 4, 6], [1, 4, 7], [2, 5, 8]      
    ];
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            return;
        }
    }
}
const checkTie = () => {
    if (board.every(square => square !== '') && !winner) {
        tie = true;
    }
}
sqrElements.forEach(square => {
    square.addEventListener('click', handleClick);
});
/*-------------------------------- Initialize --------------------------------*/
init();
resetBtn.addEventListener('click', init);

