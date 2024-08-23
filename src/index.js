const Ship = require('./ship');
const Gameboard = require('./gameboard');
const Player = require('./player');
import { 
    setupBoardUI, setupPlaceShipsUI, 
    disableButton, changeCSS, 
    handleAttack, resetButtons,
    handleHover, showSelected,
    resetOccupiedCoordsArray, resetDesiredCoordsArray
} from './domManager';

//instantiate player's ships
const playerAircraftCarrier = new Ship('Aircraft Carrier', 5);
const playerBattleship = new Ship('Battleship', 4);
const playerDestroyer = new Ship('Destroyer', 3);
const playerSubmarine = new Ship('Submarine', 3)
const playerCruiser = new Ship('Cruiser', 2);

//instantiate computer's ships
const compAircraftCarrier = new Ship('Aircraft Carrier', 5);
const compBattleship = new Ship('Battleship', 4);
const compDestroyer = new Ship('Destroyer', 3);
const compSubmarine = new Ship('Submarine', 3)
const compCruiser = new Ship('Cruiser', 2);

//setup players
const player = new Player('Player', 'player');
const computer = new Player('Computer', 'computer');

player.gameboard.placeShip(playerAircraftCarrier, [0, 0], 'vertical', 'pAC');
player.gameboard.placeShip(playerBattleship, [6, 2], 'horizontal', 'pB');
player.gameboard.placeShip(playerDestroyer, [6, 6], 'vertical', 'pD');
player.gameboard.placeShip(playerSubmarine, [5, 5], 'horizontal', 'pSUB');
player.gameboard.placeShip(playerCruiser, [8, 9], 'vertical', 'pC');

//place comp ships randomly
computer.gameboard.placeRandomShip(compAircraftCarrier, 'cAC');
computer.gameboard.placeRandomShip(compBattleship, 'cB');
computer.gameboard.placeRandomShip(compDestroyer, 'cD');
computer.gameboard.placeRandomShip(compSubmarine, 'cSUB');
computer.gameboard.placeRandomShip(compCruiser, 'cC');

//setup ui to place player's ships
setupPlaceShipsUI();

//setup player and comp boards
setupBoardUI('player');
setupBoardUI('computer');

//instantiate variables for player ship placement ui
const placementBoard = document.getElementById('board');
const buttonDiv = document.getElementById('buttonDiv');
const cells = document.querySelectorAll('#board .cell');

//this array will store the players ships placement details
let playerChoice = [];
let playerOrientation;
let playerShip;

//get player selection ui buttons
const carrier = document.getElementById('carrier');
const battleship = document.getElementById('battleship');
const destroyer = document.getElementById('destroyer');
const submarine = document.getElementById('submarine');
const cruiser = document.getElementById('cruiser');

//ui visual for player ship placement
placementBoard.addEventListener('mouseover', (e) => {
    handleHover(e, playerShip, playerOrientation);
});

placementBoard.addEventListener('mouseout', (e) => {
    cells.forEach(cell => {
        cell.classList.remove('hoverHighlight');
        cell.classList.remove('overboard');
    });
    resetDesiredCoordsArray();
});

//player ship coordinate selection
placementBoard.addEventListener('click', (e) => {
    const coordinates = getCoordinates(e);
    let invalidShip = handleHover(e, playerShip, playerOrientation);
    if (!invalidShip) {
        playerChoice.push([coordinates, playerOrientation, playerShip]);
        // console.log(playerChoice);
        monitorPlayerChoiceArray(playerChoice, placementBoard);
        showSelected(coordinates, playerShip, playerOrientation);
    }
});

//player ship selection
buttonDiv.addEventListener('click', (e) => {
    switch (true) {
        case e.target === carrier:
            playerShip = playerAircraftCarrier;
            changeCSS(placementBoard);
            carrier.classList.add('selectedButton');
            break;
        case e.target === battleship:
            playerShip = playerBattleship;
            changeCSS(placementBoard);
            battleship.classList.add('selectedButton');
            break;
        case e.target === destroyer:
            playerShip = playerDestroyer;
            changeCSS(placementBoard);
            destroyer.classList.add('selectedButton');
            break;
        case e.target === submarine:
            playerShip = playerSubmarine;
            changeCSS(placementBoard);
            submarine.classList.add('selectedButton');
            break;
        case e.target === cruiser:
            playerShip = playerCruiser;
            changeCSS(placementBoard);
            cruiser.classList.add('selectedButton');
            break;
    }
});

//player ship orientation selection
document.getElementById('orientationDiv').addEventListener('click', (e) => {
    const horizontal = document.getElementById('horizontal');
    const vertical = document.getElementById('vertical');

    if (e.target === vertical) {
        playerOrientation = 'vertical';
        vertical.classList.add('selectedButton');
        horizontal.classList.remove('selectedButton');
    } else {
        playerOrientation = 'horizontal';
        vertical.classList.remove('selectedButton');
        horizontal.classList.add('selectedButton');
    }
});

//monitors what has been added into the playerchoice array
//if a ship has been added to the array, that ship cannot be added again
function monitorPlayerChoiceArray(array, board) {
    array.forEach(index => {
        let shipInfo = index[2];
        if (shipInfo === playerAircraftCarrier) disableButton(carrier, board);
        if (shipInfo === playerBattleship) disableButton(battleship, board);
        if (shipInfo === playerDestroyer) disableButton(destroyer, board);
        if (shipInfo === playerSubmarine) disableButton(submarine, board);
        if (shipInfo === playerCruiser) disableButton(cruiser, board);
    });
}

//default select orientation and ship
document.addEventListener('DOMContentLoaded', () => {
    horizontal.click();
    carrier.click();
});

//resets the board completely
document.getElementById('reset').addEventListener('click', () => {
    playerChoice = [];
    changeCSS(placementBoard);
    resetButtons(buttonDiv);
    cells.forEach(cell => {
        cell.classList.remove('selectedHighlight');
    });
    resetOccupiedCoordsArray();
    carrier.click();
    // console.log(playerChoice);
});

// player to start the game
let playersTurn = true;
//click cell to trigger attack on opponent
document.getElementById('computer-board').addEventListener('click', (e) => {
    if (!playersTurn) {
        computerAttack();
        return;
    };
    const coordinates = getCoordinates(e);

    setTimeout(() => {
        let gameFinished = handleAttack(player, computer, coordinates, gameFinished);
        playersTurn = false;
        computerAttack(gameFinished);    
        console.table(computer.gameboard.board);
        // console.log('computer ships', computer.gameboard.compShipsObject);
    }, 0);
});

//computer attacks random spot
function computerAttack(gameFinished) {
    if (playersTurn || gameFinished) return;

    let coordinates;

    //if ship already hit - attack the rest
    if (directAttacksQ.length) coordinates = directAttacksQ.shift();
    //else attack a random spot
    else coordinates = generateRandomCoordinates();

    setTimeout(() => {
        handleAttack(computer, player, coordinates, gameFinished);
        playersTurn = true;

        // console.table(player.gameboard.board);
        // console.log('Coordinate is: ', coordinates);
        // console.log('Direct attack queue', directAttacksQ);
        // console.log(randomAttacksQ);
    }, 0);
}

//get coordinates when computer board cell clicked
export function getCoordinates(e) {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;

    return [x, y];
}

//store for computer attack
let randomAttacksQ = [];
for (let i = 0; i <= 99; i++ ) {
    randomAttacksQ.push(i);
};

//select random index from randomAttacksQ - avoids picking the same one twice
function generateRandomCoordinates() {

    //generate random coordinates
    let randomIndex = Math.floor(Math.random() * randomAttacksQ.length);
    let number = randomAttacksQ.splice(randomIndex, 1)[0];
    let coordinates = number.toString().split('').map(Number);
    if (coordinates.length === 1) coordinates.unshift(0);
    
    //if shot is a hit, load up attack queue for further bombardment!
    confirmHit(coordinates);

    return coordinates;
}

let directAttacksQ = [];

let allPlayerPositions = [
    [player.gameboard.playerACLocation], 
    [player.gameboard.playerBLocation], 
    [player.gameboard.playerDLocation], 
    [player.gameboard.playerSUBLocation],
    [player.gameboard.playerCLocation]
];

//when comp gets a 'hit' add rest of player's ship to attack queue
//after ship is sunk, back to random attacks
function confirmHit(targetedCoords) {

    targetedCoords = targetedCoords.join('');

    //compare the generated targetedCoords with players chosen coords to determine if it will be a hit
    //if a hit then will start honing in on that ship
    //go into the first array - all player ships
    for (let i = 0; i < allPlayerPositions.length; i++) {

        //go into the second array - a ship
        for (let j = 0; j < allPlayerPositions[i].length; j++) {

            //go into the third array - ships coordinates
            allPlayerPositions[i][j].forEach(part => {

                let current = part.join('');
                if (targetedCoords === current) {
                    //add player positions to the 'to-attack queue'
                    directAttacksQ = [...allPlayerPositions[i][j]];
                    //remove position that was already attack - avoid bug
                    directAttacksQ = directAttacksQ.filter(coord => coord.join('') !== targetedCoords);
                    adjustRandomAttacksArray();
                    return;
                }
            })
        }
    }
}

//removes directAttack coordinates from randomAttacksQ - avoid comp from attempting the same spot twice 
function adjustRandomAttacksArray() {

    //compare directAttacksQ with randomAttacksQ
    //remove duplicates
    let num = directAttacksQ.map(array => array.join('')).map((index) => Number(index));

    randomAttacksQ = randomAttacksQ.filter(index => !num.includes(index));
}