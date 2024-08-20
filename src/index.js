const Ship = require('./ship');
const Gameboard= require('./gameboard');
const Player = require('./player');
import { setupBoardUI, handleAttack } from './domManager';

//instantiate ships
const aircraftCarrier = new Ship('Aircraft Carrier', 5);
const battleship = new Ship('Battleship', 4);
const destroyer = new Ship('Destroyer', 3);
const submarine = new Ship('Submarine', 3)
const cruiser = new Ship('Cruiser', 2);

//setup players
const player = new Player('Chris', 'player');
const computer = new Player('Computer', 'computer');

const playerBoard = player.gameboard;
const computerBoard = computer.gameboard;

playerBoard.placeShip(aircraftCarrier, [0, 0], 'vertical', 'AC');
playerBoard.placeShip(battleship, [6, 2], 'horizontal', 'B');
playerBoard.placeShip(destroyer, [6, 6], 'vertical', 'D');
playerBoard.placeShip(submarine, [5, 5], 'horizontal', 'SUB');
playerBoard.placeShip(cruiser, [8, 9], 'vertical', 'C');

computerBoard.placeShip(aircraftCarrier, [4, 3], 'vertical', 'AC');
computerBoard.placeShip(battleship, [3, 2], 'horizontal', 'B');
computerBoard.placeShip(destroyer, [3, 6], 'vertical', 'D');
computerBoard.placeShip(submarine, [8, 4], 'horizontal', 'SUB');
computerBoard.placeShip(cruiser, [6, 6], 'vertical', 'C');

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
    handleAttack(player, computer, coordinates);
    playersTurn = false;
    computerAttack();
});

//computer attacks random spot
function computerAttack() {
    if (playersTurn) return;
    const coordinates = generateRandomCoordinates();
    handleAttack(computer, player, coordinates);
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