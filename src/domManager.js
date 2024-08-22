//setup player and comp board ui
export function setupBoardUI(boardID) {
    const board = document.getElementById(`${boardID}-board`);

    //create rows of grid
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        //create cells of each row
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            cell.dataset.x = i;
            cell.dataset.y = j;

            row.appendChild(cell);
        }

        board.appendChild(row);
    }
};

//receive coordinates
export function handleAttack(player, opponent, coordinates, gameFinished) {
    //send attack to gameboard/ship objects
    const result = opponent.gameboard.receiveAttack(coordinates);
    
    // console.table(opponent.gameboard.board);
    // console.log(player, result);

    //update ui to reflect changes
    updateUI(opponent.type, result, coordinates);

    gameFinished = false;

    //check gameover
    if (opponent.gameboard.allPlayerShipsSunk() || opponent.gameboard.allCompShipsSunk()) {
        // console.log(`${player.name}`, player.gameboard);
        // console.log(`${opponent.name}`, opponent.gameboard);
        gameOver(player);
        gameFinished = true;
    }

    return gameFinished;
};

function updateUI(player, result, coordinates) {

    const [x, y] = coordinates;
    const cell = document.querySelector(`.${player}-board [data-x="${x}"][data-y="${y}"]`);
    
    //disable from being clicked again
    cell.style.cursor = 'not-allowed';
    cell.style.pointerEvents = 'none';

    if (result === 'Miss') cell.textContent = 'o';
    else if (result === 'Hit!') {
        cell.textContent = 'x';
        cell.style.color = 'red';
    }
    else console.error(new Error('Something wrong happened'));
};

function gameOver(player) {

    const page = document.getElementById('app');

    //create semi-transparent overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    page.appendChild(overlay);

    //game over text
    const title = document.createElement('h1');
    title.textContent = 'Game Over';

    const subTitle = document.createElement('h2');
    subTitle.textContent = `${player.name} wins!`;

    overlay.appendChild(title);
    overlay.appendChild(subTitle);

    //button to play again
    const restart = document.createElement('button');
    restart.textContent = 'Play Again?';

    overlay.appendChild(restart);

    restart.addEventListener('click', () => {
        window.location.reload(); //reload the page
    });
}