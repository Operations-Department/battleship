const Ship = require('./ship');
const Gameboard = require('./gameboard');
const Player = require('./player');
import { setupBoardUI, handleAttack } from './domManager';

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

computer.gameboard.placeShip(compAircraftCarrier, [4, 3], 'vertical', 'cAC');
computer.gameboard.placeShip(compBattleship, [3, 2], 'horizontal', 'cB');
computer.gameboard.placeShip(compDestroyer, [3, 6], 'vertical', 'cD');
computer.gameboard.placeShip(compSubmarine, [8, 4], 'horizontal', 'cSUB');
computer.gameboard.placeShip(compCruiser, [6, 6], 'vertical', 'cC');

setupBoardUI('player');
setupBoardUI('computer');

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
    }, 0);

    // console.table(computer.gameboard.board);
    // console.log('computer ships', computer.gameboard.compShipsObject);
});

//computer attacks random spot
function computerAttack(gameFinished) {
    if (playersTurn || gameFinished) return;

    const coordinates = generateAttackCoordinates();

    setTimeout(() => {
        handleAttack(computer, player, coordinates, gameFinished);
        playersTurn = true;
    }, 0);

    // console.table(player.gameboard.board);
}

//get coordinates when computer board cell clicked
function getCoordinates(e) {
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
function generateAttackCoordinates() {

    let randomIndex = Math.floor(Math.random() * randomAttacksQ.length);

    let number = randomAttacksQ.splice(randomIndex, 1)[0];

    let coordinates = number.toString().split('').map(Number);

    if (coordinates.length === 1) coordinates.unshift(0);

    console.log('Coordinate is: ', coordinates);
    console.log('Direct attack queue', directAttackQ);
    
    //ship found - attack another piece
    if (directAttackQ.length) return directAttackQ.shift();
    else {
        confirmHit(coordinates);
        return coordinates;
    };
}

let directAttackQ = [];

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
                    directAttackQ = allPlayerPositions[i][j];
                    return;
                };
            });
        }
    }
}

//removes directAttack coordinates from randomAttackQ - avoid comp from attempting the same spot twice 
function adjustRandomAttacksArray() {

    //avoid attempting an attack on the same spot
}