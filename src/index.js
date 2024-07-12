const Ship = require('./ship');
const Gameboard= require('./gameboard');
const Player = require('./player');
import { setupBoardUI } from './domManager';

//instantiate ships
const aircraftCarrier = new Ship('Aircraft Carrier', 5);
const battleship = new Ship('Battleship', 4);
const destroyer = new Ship('Destroyer', 3);
const submarine = new Ship('Submarine', 3)
const cruiser = new Ship('Cruiser', 2);

//setup players
const player = new Player('person');
const computer = new Player('computer');

const playerBoard = player.gameboard;
const computerBoard = computer.gameboard;

// playerBoard.placeShip(aircraftCarrier, [0, 0], 'vertical', 'AC');
// playerBoard.placeShip(battleship, [6, 2], 'horizontal', 'B');
// playerBoard.placeShip(destroyer, [6, 6], 'vertical', 'D');
// playerBoard.placeShip(submarine, [5, 5], 'horizontal', 'SUB');
// playerBoard.placeShip(cruiser, [8, 9], 'vertical', 'C');

// computerBoard.placeShip(aircraftCarrier, [4, 3], 'vertical', 'AC');
// computerBoard.placeShip(battleship, [3, 2], 'horizontal', 'B');
// computerBoard.placeShip(destroyer, [3, 6], 'vertical', 'D');
// computerBoard.placeShip(submarine, [8, 4], 'horizontal', 'SUB');
// computerBoard.placeShip(cruiser, [6, 6], 'vertical', 'C');

setupBoardUI('player');
setupBoardUI('computer');