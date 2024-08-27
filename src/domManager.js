//sounds effect for a hit or miss
import { getCoordinates } from "./index";
import bigSplash from './sounds/bigSplash.mp3';
import hitEcho from './sounds/hitEcho.mp3';

const missSound = new Audio(bigSplash);
const hitSound = new Audio(hitEcho);

let occupiedCoords = [];    
let desiredCoords = [];

//setup player and comp board ui
export function setupBoardUI(boardID) {
    const board = document.getElementById(`${boardID}-board`);
    createBoard(board);
};

function createBoard(board) {
   
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
}

export function setupPlaceShipsUI() {
    const page = document.getElementById('app');

    //create semi-transparent overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.id = 'overlay';

    page.appendChild(overlay);

    const title = document.createElement('h1');
    title.textContent = 'Place your formation, Captain';
    overlay.appendChild(title);

    const uiBody = document.createElement('div');
    uiBody.classList.add('uiBody');
    overlay.appendChild(uiBody);

    const orientationDiv = document.createElement('div');
    orientationDiv.classList.add('orientationDiv');
    orientationDiv.id = 'orientationDiv';

    uiBody.appendChild(orientationDiv);

    const horizontalButton = document.createElement('button');
    horizontalButton.id = 'horizontal';
    horizontalButton.textContent = 'Horizontal';
    const verticalButton = document.createElement('button');
    verticalButton.id = 'vertical';
    verticalButton.textContent = 'Vertical';

    orientationDiv.appendChild(horizontalButton);
    orientationDiv.appendChild(verticalButton);

    const board = document.createElement('div');
    createBoard(board);
    board.id = 'board';

    uiBody.appendChild(board);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    buttonDiv.id = 'buttonDiv';

    uiBody.appendChild(buttonDiv);

    const carrierButton = document.createElement('button');
    carrierButton.textContent = 'Carrier';
    const battleshipButton = document.createElement('button');
    battleshipButton.textContent = 'Battleship';
    const destroyerButton = document.createElement('button');
    destroyerButton.textContent = 'Destroyer';
    const submarineButton = document.createElement('button');
    submarineButton.textContent = 'Submarine';
    const cruiserButton = document.createElement('button');
    cruiserButton.textContent = 'Cruiser';

    buttonDiv.appendChild(carrierButton);
    carrierButton.id = 'carrier';
    buttonDiv.appendChild(battleshipButton);
    battleshipButton.id = 'battleship';
    buttonDiv.appendChild(destroyerButton);
    destroyerButton.id = 'destroyer';
    buttonDiv.appendChild(submarineButton);
    submarineButton.id = 'submarine';
    buttonDiv.appendChild(cruiserButton);
    cruiserButton.id = 'cruiser';

    const confirmationDiv = document.createElement('div');
    confirmationDiv.classList.add('confirmationDiv');
    confirmationDiv.id = 'confirmationDiv';
    overlay.appendChild(confirmationDiv);

    const reset = document.createElement('button');
    reset.textContent = 'Reset';
    reset.id = 'reset';
    const confirm = document.createElement('button');
    confirm.textContent = 'Confirm';
    confirm.id = 'confirm';

    confirmationDiv.appendChild(reset);
    confirmationDiv.appendChild(confirm);
}

//ui visualization of where ship will go on playerside board
export function handleHover(e, ship, orientation) {
    let [x, y] = getCoordinates(e);
    const length = ship.length;
    x = Number(x);
    y = Number(y);

    let invalidShipPlacement = false;

    //if we have a would-be overboard placement
    if (
        (orientation === 'vertical' && x + length > 10) || 
        (orientation === 'horizontal' && y + length > 10)
    ) invalidShipPlacement = true;

    //highlight where the ship will go after placement
    if (orientation === 'vertical') {
        for (let i = 0; i < length; i++) {
            const cell = document.querySelector(`#board .cell[data-x="${x + i}"][data-y="${y}"]`);
            
            if (cell && !invalidShipPlacement) {
                cell.classList.add('hoverHighlight');
                cell. classList.remove ('overboard');
                desiredCoords.push([x + i, y]);
                
                let overlap = compareDesiredOccupiedCoords();
                if (overlap) {
                    cell.classList.remove('hoverHighlight');
                    cell. classList.add ('overboard');
                    invalidShipPlacement = true;
                }
            }
            if (cell && invalidShipPlacement) {
                cell.classList.remove('hoverHighlight');
                cell. classList.add ('overboard');
            } 
        }
    } else if (orientation === 'horizontal') {
        for (let j = 0; j < length; j++) {
            const cell = document.querySelector(`#board .cell[data-x="${x}"][data-y="${y + j}"]`);
            
            if (cell && !invalidShipPlacement) {
                cell.classList.add('hoverHighlight');
                cell. classList.remove ('overboard');
                desiredCoords.push([x, y + j]);
                
                let overlap = compareDesiredOccupiedCoords();
                if (overlap) {
                    cell.classList.remove('hoverHighlight');
                    cell. classList.add ('overboard');
                    invalidShipPlacement = true;
                }
            }
            if (cell && invalidShipPlacement) {
                cell.classList.remove('hoverHighlight');
                cell. classList.add ('overboard');
            } 
        }
    }

    return invalidShipPlacement;
};

function compareDesiredOccupiedCoords() {
    let newDesired = desiredCoords.map(index => index.join(''));
    let newOccupied = occupiedCoords.map(index => index.join(''));

    return newDesired.some(element => newOccupied.includes(element));
}

export function showOccupiedSpots() {
    occupiedCoords.forEach(index => {
        let [x, y] = index;
        x = Number(x);
        y = Number(y);

        const cell = document.querySelector(`#player-board .cell[data-x="${x}"][data-y="${y}"]`);
        cell.classList.add('occupiedCell');
    });
}

//show selected position as highlighted on the board permanently
export function showSelected(coordinates, ship, orientation) {
    let [x, y] = coordinates;
    const length = ship.length;
    x = Number(x);
    y = Number(y);

    if (orientation === 'vertical') {
        for (let i = 0; i < length; i++) {
            const cell = document.querySelector(`#board .cell[data-x="${x + i}"][data-y="${y}"]`);
            if (cell) {
                occupiedCoords.push([x + i, y]);
                cell.classList.add('selectedHighlight');
            }
        }
    } else if (orientation === 'horizontal') {
        for (let j = 0; j < length; j++) {
            const cell = document.querySelector(`#board .cell[data-x="${x}"][data-y="${y + j}"]`);
            if (cell) {
                occupiedCoords.push([x, y + j]);
                cell.classList.add('selectedHighlight');
            }
        }
    }
}

//disables player from placing one ship in multiple spots
export function disableButton(button, board) {
    button.classList.add('forbiddenButton');
    board.classList.add('forbiddenButton');
}

export function resetOccupiedCoordsArray() {
    occupiedCoords = [];
}

export function resetDesiredCoordsArray() {
    desiredCoords = [];
}

export function resetButtons(buttonDiv) {
    const buttons = buttonDiv.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('forbiddenButton');
    });
}

//more responsive button selection ui
export function changeCSS(board) {
    board.classList.remove('forbiddenButton');
    const div = document.getElementById('buttonDiv');
    const buttons = div.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.remove('selectedButton');
    });
}

//receive coordinates
export function handleAttack(player, opponent, coordinates, gameFinished) {
    //send attack to gameboard/ship objects
    const result = opponent.gameboard.receiveAttack(coordinates);
    
    //play sound of being hit or missed
    playSound(result);

    //update ui to reflect changes
    //timeout func - ui change and sound plays at the exact same time
    setTimeout(() => {
        updateUI(opponent.type, result, coordinates);
    }, 500);

    gameFinished = false;

    //check gameover
    if (opponent.gameboard.allPlayerShipsSunk() || opponent.gameboard.allCompShipsSunk()) {
        gameOver(player);
        gameFinished = true;
    }

    return gameFinished;
};

function updateUI(player, result, coordinates) {

    const [x, y] = coordinates;
    const cell = document.querySelector(`.${player}-board [data-x="${x}"][data-y="${y}"]`);
    
    //disable from being clicked again
    cell.classList.add('forbiddenButton');

    const marker = document.createElement('div');
    marker.id = 'marker';

    if (result === 'Miss') {
        cell.appendChild(marker);
        marker.classList.add('markerMiss');
    } else if (result === 'Hit!') {
        cell.appendChild(marker);
        marker.classList.add('markerHit');
    }
    else console.error(new Error('Something wrong happened'));
};

//play splash sound if miss, boom if hit
function playSound(result) {
    if (result === 'Miss') missSound.play();
    else hitSound.play();
}

function gameOver(player) {

    const page = document.getElementById('app');

    //create semi-transparent overlay
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    page.appendChild(overlay);

    //game over text
    const title = document.createElement('h1');

    const subTitle = document.createElement('h2');

    if (player.type === 'player') {
        title.textContent = 'Congratulations!';
        subTitle.textContent = 'You Win';
    } else {
        title.textContent = 'Game Over!';
        subTitle.textContent = 'You Lose';
    }

    overlay.appendChild(title);
    overlay.appendChild(subTitle);

    //button to play again
    const restart = document.createElement('button');
    restart.textContent = 'Play Again?';

    overlay.appendChild(restart);

    restart.addEventListener('click', () => {
        window.location.reload(); //reload the page - start a new game
    });
}