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

player.gameboard.placeShip(playerAircraftCarrier, [0, 0], 'vertical', 'AC');
player.gameboard.placeShip(playerBattleship, [6, 2], 'horizontal', 'B');
player.gameboard.placeShip(playerDestroyer, [6, 6], 'vertical', 'D');
player.gameboard.placeShip(playerSubmarine, [5, 5], 'horizontal', 'SUB');
player.gameboard.placeShip(playerCruiser, [8, 9], 'vertical', 'C');

computer.gameboard.placeShip(compAircraftCarrier, [4, 3], 'vertical', 'AC');
computer.gameboard.placeShip(compBattleship, [3, 2], 'horizontal', 'B');
computer.gameboard.placeShip(compDestroyer, [3, 6], 'vertical', 'D');
computer.gameboard.placeShip(compSubmarine, [8, 4], 'horizontal', 'SUB');
computer.gameboard.placeShip(compCruiser, [6, 6], 'vertical', 'C');

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
    let gameFinished = handleAttack(player, computer, coordinates, gameFinished);

    console.table(computer.gameboard.board);
    console.log('computer ships', computer.gameboard.shipsObject);
    console.log('player ships', player.gameboard.shipsObject);

    playersTurn = false;
    computerAttack(gameFinished);
});

//computer attacks random spot
function computerAttack(gameFinished) {
    if (playersTurn || gameFinished) return;
    
    const coordinates = generateRandomCoordinates();
    handleAttack(computer, player, coordinates, gameFinished);
    playersTurn = true;
}

//get coordinates when computer board cell clicked
function getCoordinates(e) {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;

    return [x, y];
}

//store for computer attack
let array = [];
for (let i = 0; i <= 99; i++ ) {
    array.push(i);
};

//select random index from array - avoids picking the same one twice
function generateRandomCoordinates() {
    let randomIndex = Math.floor(Math.random() * array.length);

    let number = array.splice(randomIndex, 1)[0];

    let coordinates = number.toString().split('').map(Number);

    if (coordinates.length === 1) coordinates.unshift(0);

    return coordinates;
}