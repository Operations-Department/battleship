
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
export function handleAttack(player, opponent, coordinates) {
    //send attack to gameboard/ship objects
    const result = opponent.gameboard.receiveAttack(coordinates);
    
    console.table(opponent.gameboard.board);
    console.log(result);

    //update ui to reflect changes
    updateUI(result, coordinates);

    //check gameover
    if (opponent.gameboard.allShipsSunk()) {
        alert(`${player.name} wins`);
    }
};

function updateUI( result, coordinates) {
    const [x, y] = coordinates;
    const cell = document.querySelector(`.computer-board [data-x="${x}"][data-y="${y}"]`);
    
    if (result === 'Miss') cell.textContent = 'o';
    else if (result === 'Hit!') cell.textContent = 'x';
    else console.error('error: something went wrong');
};