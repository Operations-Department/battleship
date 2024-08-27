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

//attack sound fx
import brrrt from './sounds/brrrt.mp3';
import fireEcho from './sounds/fireEcho.mp3';
import missile from './sounds/missile.mp3';
import mortar from './sounds/mortar.mp3';
import phalanx from './sounds/phalanx.mp3';

const attack1 = new Audio(brrrt);
const attack2 = new Audio(fireEcho);
const attack3 = new Audio(missile);
const attack4 = new Audio(mortar);
const attack5 = new Audio(phalanx);

const attackSounds = {
    1: attack1,
    2: attack2,
    3: attack3,
    4: attack4,
    5: attack5
}

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

const shipMapping = {
    'Aircraft Carrier': [playerAircraftCarrier, 'pAC'],
    'Battleship': [playerBattleship, 'pB'],
    'Destroyer': [playerDestroyer, 'pD'],
    'Submarine': [playerSubmarine, 'pSUB'],
    'Cruiser': [playerCruiser, 'pC']
};

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
placementBoard.addEventListener('mouseup', (e) => {
    const coordinates = getCoordinates(e);
    let invalidShip = handleHover(e, playerShip, playerOrientation);
    if (!invalidShip) {
        playerChoice.push([coordinates, playerOrientation, playerShip]);
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

//set default button selection
//default select orientation and ship
document.addEventListener('DOMContentLoaded', () => {
    horizontal.click();
    carrier.click();
});

//reset button
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
});

//confirmation button
//confirm player ship placement, remove overlay, game begins 
document.getElementById('confirm').addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    if (playerChoice.length === 5) overlay.remove();
    handleShipPlacement(playerChoice);
});

//helper function to the confirmation button func
//take info from player ship placement ui and place ships onto player board
function handleShipPlacement(arr) {
    for (let i = 0; i < arr.length; i++) {

        const coordinates = arr[i][0].map(index => Number(index));
        const orientation = arr[i][1];
        const title = arr[i][2].name;

        const shipInfo = shipMapping[title];

        //place player ships onto player gameboard
        player.gameboard.placeShip(shipInfo[0], coordinates, orientation, shipInfo[1]);
    }
}

// player to start the game
let playersTurn = true;
//click cell to trigger attack on comp
const computerBoard = document.getElementById('computer-board');
computerBoard.addEventListener('click', (e) => {
    
    if (!playersTurn) {
        computerAttack();
        return;
    };

    const coordinates = getCoordinates(e);

    //attack sound effect
    const number = genNum125();
    attackSounds[number].play();

    //bugFix - prevent spam clicking
    computerBoard.classList.add('forbiddenButton');

    setTimeout(() => {
        let gameFinished = handleAttack(player, computer, coordinates, gameFinished);

        setTimeout(() => {
            playersTurn = false;
            computerAttack(gameFinished);    
        }, 2000);

    }, 2000);
});

//computer attacks random spot
function computerAttack(gameFinished) {
    if (playersTurn || gameFinished) return;

    let coordinates;

    const number = genNum125();
    attackSounds[number].play();

    //if ship already hit - attack the rest
    if (directAttacksQ.length) coordinates = directAttacksQ.shift();

    //else attack a random spot
    else coordinates = generateRandomCoordinates();

    setTimeout(() => {
        handleAttack(computer, player, coordinates, gameFinished);
        playersTurn = true;
        computerBoard.classList.remove('forbiddenButton');
    }, 2000);
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

//for comp to attack remaining ship parts after a hit
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

//generates a number 1-5 used for the attack sound effects 
function genNum125() {
    const number = (Math.floor(Math.random() * 5) + 1);

    return number;
}