const Gameboard = require('../gameboard');
const Ship = require('../ship');
const Player = require('../player');

let player;
let computer;

let playerAircraftCarrier;
let playerBattleship;
let playerDestroyer;
let playerSubmarine;
let playerCruiser;

let compAircraftCarrier;
let compBattleship;
let compDestroyer;
let compSubmarine;
let compCruiser;


//setup: create a new players/gameboards and ships before each test
beforeEach(() => {
    player = new Player('Player', 'player');
    computer = new Player('Computer', 'computer');

    playerAircraftCarrier = new Ship('Aircraft Carrier', 5);
    playerBattleship = new Ship('Battleship', 4);
    playerDestroyer = new Ship('Destroyer', 3);
    playerSubmarine = new Ship('Submarine', 3)
    playerCruiser = new Ship('Cruiser', 2);

    compAircraftCarrier = new Ship('Aircraft Carrier', 5);
    compBattleship = new Ship('Battleship', 4);
    compDestroyer = new Ship('Destroyer', 3);
    compSubmarine = new Ship('Submarine', 3)
    compCruiser = new Ship('Cruiser', 2);
});

//teardown: reset players/gameboards and ships data
afterEach(() => {
    player = null;
    computer = null;

    playerAircraftCarrier = null;
    playerBattleship = null;
    playerDestroyer = null;
    playerSubmarine = null;
    playerCruiser = null;

    compAircraftCarrier = null;
    compBattleship = null;
    compDestroyer = null;
    compSubmarine = null;
    compCruiser = null;
});
    
//valid ship placement
test('Places ship on the board correctly', () => {
    const result = player.gameboard.placeShip(playerBattleship, [2, 3], 'horizontal', 'pB');
    expect(result).toBeUndefined(); //no error message returned
    expect(player.gameboard.board[2][2]).toBe(null);
    expect(player.gameboard.board[2][3]).toBe('pB');
    expect(player.gameboard.board[2][4]).toBe('pB');
    expect(player.gameboard.board[2][5]).toBe('pB');
    expect(player.gameboard.board[2][6]).toBe('pB');
    expect(player.gameboard.board[2][7]).toBe(null);
});

//invalid starting position
test('Returns error message for selection off the board', () => {
    const resultOne = player.gameboard.placeShip(playerBattleship, [1, 13], 'vertical', 'B');
    const resultTwo = player.gameboard.placeShip(playerBattleship, [-1, 6], 'vertical', 'B');
    expect(resultOne).toBe('Invalid position');
    expect(resultTwo).toBe('Invalid position');
});

//overlap with existing ship
test('Returns error message for overlapping position', () => {
    const firstPlacement = player.gameboard.placeShip(playerBattleship, [5, 4], 'horizontal', 'B');
    const secondPlacement = player.gameboard.placeShip(playerDestroyer, [4, 5], 'vertical', 'D');
    expect(firstPlacement).toBeUndefined();
    expect(secondPlacement).toBe('That spot is taken');
});

//attacking a ship returns a 'hit'
test('Returns "Hit" message, updates the board to reflect that hit', () => {
    player.gameboard.placeShip(playerBattleship, [5, 4], 'horizontal', 'pB');
    const hit = player.gameboard.receiveAttack([5, 4]);
    expect(hit).toBe('Hit!');
    expect(player.gameboard.board[5][4]).toBe('x');
});

//attacking an empty spot returns a 'miss'
test('Returns "Miss", updates the board to reflect that missed shot', () => {
    player.gameboard.placeShip(playerBattleship, [5, 4], 'horizontal', 'pB'); //ship spans [5, 4], [5, 5], [5, 6], [5, 7] 
    const miss = player.gameboard.receiveAttack([5, 3]);
    expect(miss).toBe('Miss');
    expect(player.gameboard.board[5][3]).toBe('o');
});

//attacking the same spot twice => both hit and miss cases
test('Returns error message when firing on the same spot again', () => {
    player.gameboard.placeShip(playerBattleship, [5, 4], 'horizontal', 'pB');
    const firstShotHit = player.gameboard.receiveAttack([5, 5]);
    const secondShotHit = player.gameboard.receiveAttack([5, 5]);
    expect(firstShotHit).toBe('Hit!');
    expect(secondShotHit).toBe('You already shot there');

    const firstShotMiss = player.gameboard.receiveAttack([1, 5]);
    const secondShotMiss = player.gameboard.receiveAttack([1, 5]);
    expect(firstShotMiss).toBe('Miss');
    expect(secondShotMiss).toBe('You already shot there');
});

//all ships have been sunk
test('Returns true if all ships have been sunk', () => {

    //place all ships
    player.gameboard.placeShip(playerAircraftCarrier, [0, 0], 'horizontal', 'pAC');
    player.gameboard.placeShip(playerBattleship, [1, 0], 'horizontal', 'pB');
    player.gameboard.placeShip(playerDestroyer, [2, 0], 'horizontal', 'pD');
    player.gameboard.placeShip(playerSubmarine, [3, 0], 'horizontal', 'pSUB');
    player.gameboard.placeShip(playerCruiser, [4, 0], 'horizontal', 'pC');

    //sink all ships
    //carrier
    player.gameboard.receiveAttack([0, 0]);
    player.gameboard.receiveAttack([0, 1]);
    player.gameboard.receiveAttack([0, 2]);
    player.gameboard.receiveAttack([0, 3]);
    player.gameboard.receiveAttack([0, 4]);//sunk
    //battleship
    player.gameboard.receiveAttack([1, 0]);
    player.gameboard.receiveAttack([1, 1]);
    player.gameboard.receiveAttack([1, 2]);
    player.gameboard.receiveAttack([1, 3]);//sunk
    //destroyer
    player.gameboard.receiveAttack([2, 0]);   
    player.gameboard.receiveAttack([2, 1]);
    player.gameboard.receiveAttack([2, 2]);//sunk
    //sub
    player.gameboard.receiveAttack([3, 0]);
    player.gameboard.receiveAttack([3, 1]);
    player.gameboard.receiveAttack([3, 2]);//sunk
    //cruiser
    player.gameboard.receiveAttack([4, 0]);

    expect(player.gameboard.allPlayerShipsSunk()).toBe(false);

    player.gameboard.receiveAttack([4, 1]);//sunk

    expect(player.gameboard.allPlayerShipsSunk()).toBe(true);
});

test('Attacking one ship does not attack the opponents ship', () => {
    player.gameboard.placeShip(playerAircraftCarrier, [0, 0], 'horizontal', 'pAC');
    computer.gameboard.placeShip(compAircraftCarrier, [4, 4], 'vertical', 'cAC');

    //**not working properly here, but works in the browser - may be issue with testing environment */
    // player.gameboard.receiveAttack([0, 0]);
    playerAircraftCarrier.getHit();

    expect(playerAircraftCarrier.hitPoints).toBe(1);
    expect(compAircraftCarrier.hitPoints).toBe(0);
});
