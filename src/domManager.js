
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